import { mutation, query, internalMutation } from "./_generated/server";
import { hashReportKey, validReportKey, reportAccess, reportSummary, paymentSummary } from "./reports/access.ts";
import { presentReport } from "./reports/presentation.ts";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { requireAdmin } from "./helpers.ts";

// Batch approve all pending payments
export const approveAllPending = mutation({
  args: {},
  handler: async (ctx, _args): Promise<number> => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("assessments").order("desc").collect();
    const pending = all.filter((a) => a.paymentStatus === "pending");
    for (const assessment of pending) {
      await ctx.db.patch(assessment._id, { paymentStatus: "approved" });
    }
    return pending.length;
  },
});

export const save = mutation({
  args: {
    accessKey: v.optional(v.string()),
    age: v.optional(v.number()),
    level: v.optional(v.string()),
    answers: v.array(v.number()),
    freeAnswers: v.optional(v.array(v.string())),
    cognitionScore: v.number(),
    disciplineScore: v.number(),
    emotionScore: v.optional(v.number()),
    motivationScore: v.number(),
    profile: v.string(),
    confidenceScore: v.number(),
    version: v.optional(v.number()),
    extendedData: v.optional(v.string()),
    isExtended: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.tokenIdentifier ?? undefined;
    if (!identity && !validReportKey(args.accessKey)) {
      throw new ConvexError({ code: "BAD_REQUEST", message: "Une clé privée est nécessaire pour enregistrer ce bilan sans compte." });
    }
    const accessKeyHash = !identity && args.accessKey ? await hashReportKey(args.accessKey) : undefined;

    const id = await ctx.db.insert("assessments", {
      userId,
      accessKeyHash,
      age: args.age,
      level: args.level,
      answers: args.answers,
      freeAnswers: args.freeAnswers,
      cognitionScore: args.cognitionScore,
      disciplineScore: args.disciplineScore,
      emotionScore: args.emotionScore ?? 0,
      motivationScore: args.motivationScore,
      profile: args.profile,
      confidenceScore: args.confidenceScore,
      version: args.version ?? 2,
      extendedData: args.extendedData,
      isExtended: args.isExtended,
    });
    return id;
  },
});

export const getById = query({
  args: { id: v.string(), accessKey: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const id = ctx.db.normalizeId("assessments", args.id);
    const report = id ? await ctx.db.get(id) : null;
    if (!report) return null;
    const access = await reportAccess(ctx, report, args.accessKey);
    return access ? presentReport(report, access) : null;
  },
});

export const claim = mutation({
  args: { id: v.id("assessments"), accessKey: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ code: "UNAUTHENTICATED", message: "Connecte-toi pour rattacher ton bilan." });
    const report = await ctx.db.get(args.id);
    if (!report) throw new ConvexError({ code: "NOT_FOUND", message: "Bilan inaccessible." });
    if (report.userId === identity.tokenIdentifier) return;
    // Claim always requires the capability; administrator status is not ownership proof.
    if (report.userId || !report.accessKeyHash || !validReportKey(args.accessKey) || await hashReportKey(args.accessKey) !== report.accessKeyHash) {
      throw new ConvexError({ code: "FORBIDDEN", message: "Bilan inaccessible." });
    }
    await ctx.db.patch(args.id, { userId: identity.tokenIdentifier, accessKeyHash: undefined });
  },
});

export const getLatestForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const report = await ctx.db
      .query("assessments")
      .withIndex("by_userId", (q) => q.eq("userId", identity.tokenIdentifier))
      .order("desc")
      .first();
    return report ? reportSummary(report) : null;
  },
});

export const getAllForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const reports = await ctx.db
      .query("assessments")
      .withIndex("by_userId", (q) => q.eq("userId", identity.tokenIdentifier))
      .order("desc")
      .take(20);
    return reports.map(reportSummary);
  },
});

// A declaration of payment is never proof of payment.

export const unlockAssessment = mutation({
  args: {
    id: v.id("assessments"),
    tier: v.union(v.literal("analyse"), v.literal("plan")),
    payerPhone: v.string(),
    accessKey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const assessment = await ctx.db.get(args.id);
    if (!assessment) {
      throw new ConvexError({ message: "Assessment introuvable", code: "NOT_FOUND" });
    }
    if (!await reportAccess(ctx, assessment, args.accessKey)) {
      throw new ConvexError({ code: "FORBIDDEN", message: "Bilan inaccessible." });
    }
    if (!/^[+\d\s()-]{7,25}$/.test(args.payerPhone)) {
      throw new ConvexError({ code: "BAD_REQUEST", message: "Vérifie le numéro de téléphone." });
    }
    // Already approved at same or higher tier — no action needed
    if (assessment.paymentStatus === "approved") {
      if (assessment.paidTier === "plan") return;
      if (assessment.paidTier === args.tier) return;
    }
    // Prevent duplicate pending submissions for the same tier
    if (assessment.paymentStatus === "pending" && assessment.paidTier === args.tier) {
      throw new ConvexError({
        message: "Un paiement est déjà en attente pour cette offre",
        code: "CONFLICT",
      });
    }

    await ctx.db.patch(args.id, {
      paidTier: args.tier,
      payerPhone: args.payerPhone,
      paymentStatus: "pending",
      autoApproveAt: undefined,
    });
  },
});

// Retained as a no-op so previously queued jobs cannot grant access after deployment.
export const autoApprove = internalMutation({
  args: { id: v.id("assessments") },
  handler: async () => null,
});

// Admin: approve a payment (unlocks results immediately)
export const approvePayment = mutation({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const assessment = await ctx.db.get(args.id);
    if (!assessment) {
      throw new ConvexError({ message: "Assessment introuvable", code: "NOT_FOUND" });
    }
    await ctx.db.patch(args.id, { paymentStatus: "approved" });
  },
});

// Admin: reject a payment (blocks access, removes auto-approve)
export const rejectPayment = mutation({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const assessment = await ctx.db.get(args.id);
    if (!assessment) {
      throw new ConvexError({ message: "Assessment introuvable", code: "NOT_FOUND" });
    }
    await ctx.db.patch(args.id, {
      paymentStatus: "rejected",
      paidTier: undefined,
      payerPhone: undefined,
      paymentRef: undefined,
      autoApproveAt: undefined,
    });
  },
});

// Admin: list all pending payment requests
export const getPendingPayments = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("assessments").order("desc").collect();
    return all.filter((a) => a.paymentStatus === "pending").map(paymentSummary);
  },
});

// Admin: list all payments (pending, approved, rejected)
export const getAllPayments = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("assessments").order("desc").collect();
    return all.filter((a) => a.paymentStatus !== undefined).map(paymentSummary);
  },
});
