import type { Doc } from "../_generated/dataModel.d.ts";
import type { MutationCtx, QueryCtx } from "../_generated/server.js";

export async function hashReportKey(key: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function validReportKey(key: string | undefined): key is string {
  return typeof key === "string" && /^[a-f0-9]{64}$/.test(key);
}

export async function reportAccess(ctx: QueryCtx | MutationCtx, report: Doc<"assessments">, key?: string) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity && report.userId === identity.tokenIdentifier) return "owner";
  if (identity) {
    const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
    if (user?.role === "admin") return "admin";
  }
  // Account-owned reports never accept a bearer key, including after a claim.
  if (!report.userId && report.accessKeyHash && validReportKey(key)) {
    if (await hashReportKey(key) === report.accessKeyHash) return "guest";
  }
  return null;
}

// Allowlist: raw responses, phone numbers, ownership identifiers and key hashes never leave this projection.
export function reportSummary(report: Doc<"assessments">) {
  return {
    _id: report._id,
    _creationTime: report._creationTime,
    age: report.age,
    level: report.level,
    cognitionScore: report.cognitionScore,
    disciplineScore: report.disciplineScore,
    emotionScore: report.emotionScore,
    resilienceScore: report.resilienceScore,
    motivationScore: report.motivationScore,
    profile: report.profile,
    confidenceScore: report.confidenceScore,
    version: report.version,
    isExtended: report.isExtended,
    paidTier: report.paidTier,
    paymentStatus: report.paymentStatus,
    autoApproveAt: report.autoApproveAt,
  };
}

export function paymentSummary(report: Doc<"assessments">) {
  return { ...reportSummary(report), payerPhone: report.payerPhone, paymentRef: report.paymentRef, userId: report.userId };
}
