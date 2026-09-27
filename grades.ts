import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

const subjectValidator = v.object({
  name: v.string(),
  grade: v.number(),
  coefficient: v.number(),
  appreciation: v.optional(v.string()),
  isMainSubject: v.optional(v.boolean()),
});

// ── Contradiction detection ───────────────────────────────────────────────

type Subject = {
  name: string;
  grade: number;
  coefficient: number;
  appreciation?: string;
  isMainSubject?: boolean;
};

function detectContradictions(
  subjects: Subject[],
  selfDisciplineLevel: number | undefined,
  attendancePercent: number | undefined,
): string[] {
  const contradictions: string[] = [];

  // Average grade (weighted)
  const totalWeight = subjects.reduce((s, sub) => s + sub.coefficient, 0);
  const weightedSum = subjects.reduce((s, sub) => s + sub.grade * sub.coefficient, 0);
  const avg = totalWeight > 0 ? weightedSum / totalWeight : 0;

  // High self-discipline but low grades
  if (
    selfDisciplineLevel !== undefined &&
    selfDisciplineLevel >= 7 &&
    avg < 10
  ) {
    contradictions.push(
      `Tu te déclares très discipliné(e) (${selfDisciplineLevel}/10) mais ta moyenne pondérée est de ${avg.toFixed(1)}/20. Est-ce que les méthodes de travail sont adaptées ?`,
    );
  }

  // Low self-discipline but high grades
  if (
    selfDisciplineLevel !== undefined &&
    selfDisciplineLevel <= 3 &&
    avg >= 14
  ) {
    contradictions.push(
      `Tu estimes avoir peu de discipline (${selfDisciplineLevel}/10) mais tes résultats sont excellents (${avg.toFixed(1)}/20). Tu as peut-être plus de méthode que tu ne le penses !`,
    );
  }

  // High attendance but very low grades
  if (
    attendancePercent !== undefined &&
    attendancePercent >= 90 &&
    avg < 8
  ) {
    contradictions.push(
      `Tu es très assidu(e) (${attendancePercent}% de présence) mais ta moyenne reste faible (${avg.toFixed(1)}/20). La présence seule ne suffit peut-être pas — il faudrait revoir les méthodes d'apprentissage.`,
    );
  }

  // Low attendance but passing
  if (
    attendancePercent !== undefined &&
    attendancePercent < 70 &&
    avg >= 12
  ) {
    contradictions.push(
      `Malgré une assiduité limitée (${attendancePercent}%), tu obtiens de bons résultats (${avg.toFixed(1)}/20). Imagine ce que tu pourrais atteindre avec plus de régularité !`,
    );
  }

  // Strong in maths/science but low overall
  const scienceSubjects = subjects.filter((s) =>
    ["mathématiques", "physique", "svt", "physique-chimie", "sciences"].some((k) =>
      s.name.toLowerCase().includes(k),
    ),
  );
  const scienceAvg =
    scienceSubjects.length > 0
      ? scienceSubjects.reduce((s, sub) => s + sub.grade, 0) / scienceSubjects.length
      : null;

  if (scienceAvg !== null && scienceAvg >= 14 && avg < 10) {
    contradictions.push(
      `Tu excelles en sciences (${scienceAvg.toFixed(1)}/20 en moyenne) mais ta moyenne générale est faible (${avg.toFixed(1)}/20). Ton profil scientifique est fort mais les autres matières tirent la moyenne vers le bas.`,
    );
  }

  // Appreciate comments mention "excellent" but grade is below 12
  for (const sub of subjects) {
    const appr = (sub.appreciation ?? "").toLowerCase();
    const isPositive =
      appr.includes("excellent") || appr.includes("très bien") || appr.includes("remarquable");
    if (isPositive && sub.grade < 12) {
      contradictions.push(
        `En ${sub.name}, l'appréciation est positive ("${sub.appreciation}") mais la note est ${sub.grade}/20. Il y a peut-être un écart entre le potentiel et les résultats.`,
      );
      break; // Limit to one appreciation contradiction
    }
  }

  return contradictions;
}

// ── Mutations ─────────────────────────────────────────────────────────────

export const saveReport = mutation({
  args: {
    schoolYear: v.string(),
    trimester: v.number(),
    level: v.optional(v.string()),
    targetSerie: v.optional(v.string()),
    subjects: v.array(subjectValidator),
    attendancePercent: v.optional(v.number()),
    selfDisciplineLevel: v.optional(v.number()),
    contradictionExplanation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ message: "Non authentifié", code: "UNAUTHENTICATED" });
    }
    const userId = identity.tokenIdentifier;
    const now = new Date().toISOString();

    // Detect contradictions
    const contradictions = detectContradictions(
      args.subjects,
      args.selfDisciplineLevel,
      args.attendancePercent,
    );

    // Check if a report already exists for this year+trimester
    const existing = await ctx.db
      .query("gradeReports")
      .withIndex("by_userId_and_year", (q) =>
        q.eq("userId", userId).eq("schoolYear", args.schoolYear),
      )
      .filter((q) => q.eq(q.field("trimester"), args.trimester))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        level: args.level,
        targetSerie: args.targetSerie,
        subjects: args.subjects,
        attendancePercent: args.attendancePercent,
        selfDisciplineLevel: args.selfDisciplineLevel,
        contradictions,
        contradictionExplanation: args.contradictionExplanation,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("gradeReports", {
      userId,
      schoolYear: args.schoolYear,
      trimester: args.trimester,
      level: args.level,
      targetSerie: args.targetSerie,
      subjects: args.subjects,
      attendancePercent: args.attendancePercent,
      selfDisciplineLevel: args.selfDisciplineLevel,
      contradictions,
      contradictionExplanation: args.contradictionExplanation,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const saveContradictionExplanation = mutation({
  args: {
    reportId: v.id("gradeReports"),
    explanation: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ message: "Non authentifié", code: "UNAUTHENTICATED" });
    }
    const report = await ctx.db.get(args.reportId);
    if (!report || report.userId !== identity.tokenIdentifier) {
      throw new ConvexError({ message: "Rapport introuvable", code: "NOT_FOUND" });
    }
    await ctx.db.patch(args.reportId, {
      contradictionExplanation: args.explanation,
      updatedAt: new Date().toISOString(),
    });
  },
});

// ── Queries ───────────────────────────────────────────────────────────────

export const getMyReports = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db
      .query("gradeReports")
      .withIndex("by_userId", (q) => q.eq("userId", identity.tokenIdentifier))
      .order("desc")
      .take(20);
  },
});

export const getReportById = query({
  args: { id: v.id("gradeReports") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const report = await ctx.db.get(args.id);
    return report?.userId === identity.tokenIdentifier ? report : null;
  },
});
