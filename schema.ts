import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    // Role-based access: "admin" or "user"
    role: v.optional(v.union(v.literal("admin"), v.literal("user"))),
    // Editable profile fields
    displayName: v.optional(v.string()),
    niveau: v.optional(v.string()),      // 3e | 2nde | 1ere | Tle
    serieCiblee: v.optional(v.string()), // C | D | A | G | F
    objectif: v.optional(v.string()),    // free text goal
    avatarColor: v.optional(v.string()), // hex colour chosen by user
    // Hercules Commerce
    customerId: v.optional(v.string()),  // Hercules Commerce customer ID
  }).index("by_token", ["tokenIdentifier"]),

  assessments: defineTable({
    // Optional: linked to a user account
    userId: v.optional(v.string()),
    // Only a SHA-256 digest is persisted; legacy anonymous reports have no capability.
    accessKeyHash: v.optional(v.string()),
    // Pre-test onboarding data
    age: v.optional(v.number()),
    level: v.optional(v.string()), // "college" | "lycee" | "universite"
    // Raw answers array
    answers: v.array(v.number()),
    // Optional free-text explanations per question (array of 20 strings)
    freeAnswers: v.optional(v.array(v.string())),
    // Dimension scores (out of 15 for new, out of 12 for legacy)
    cognitionScore: v.number(),
    disciplineScore: v.number(),
    emotionScore: v.optional(v.number()),   // new dimension (replaces resilience)
    motivationScore: v.number(),
    resilienceScore: v.optional(v.number()), // legacy dimension
    // Computed profile key
    profile: v.string(),
    // Confidence score percentage
    confidenceScore: v.optional(v.number()),
    // Assessment version: 1 = old (max 15/dim), 2 = V2 A/B/C (max 10/dim)
    version: v.optional(v.number()),
    // Payment: which tier was requested / unlocked
    paidTier: v.optional(v.union(v.literal("analyse"), v.literal("plan"))),
    // Phone number used by the payer (for admin verification)
    payerPhone: v.optional(v.string()),
    // Legacy: payment reference (kept for backward compat)
    paymentRef: v.optional(v.string()),
    // Payment verification status: pending = awaiting auto-approve, approved = paid, rejected = fraud
    paymentStatus: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
    // ISO timestamp when auto-approval is scheduled
    autoApproveAt: v.optional(v.string()),
    // V2 extended orientation data (JSON string)
    extendedData: v.optional(v.string()),
    // V2 extended assessment flag
    isExtended: v.optional(v.boolean()),
  }).index("by_userId", ["userId"]),

  // Scolaire: relevés de notes par élève
  gradeReports: defineTable({
    userId: v.string(),
    // Année scolaire ex: "2024-2025"
    schoolYear: v.string(),
    // Trimestre: 1, 2 or 3
    trimester: v.number(),
    // Niveau: "3e" | "2nde" | "1ere" | "Tle"
    level: v.optional(v.string()),
    // Série visée ex: "S2", "L2", "G"
    targetSerie: v.optional(v.string()),
    // Array of subject grades
    subjects: v.array(
      v.object({
        name: v.string(),         // ex: "Mathématiques"
        grade: v.number(),        // 0-20
        coefficient: v.number(),  // 1-9
        appreciation: v.optional(v.string()), // free text teacher comment
        isMainSubject: v.optional(v.boolean()),
      })
    ),
    // Optional: global attendance percentage 0-100
    attendancePercent: v.optional(v.number()),
    // Optional: student's self-declared discipline level 0-10
    selfDisciplineLevel: v.optional(v.number()),
    // Contradiction notes detected by system
    contradictions: v.optional(v.array(v.string())),
    // Optional student explanation for contradictions
    contradictionExplanation: v.optional(v.string()),
    // ISO timestamp
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_year", ["userId", "schoolYear"]),

  dailyCheckins: defineTable({
    userId: v.string(),
    // ISO date YYYY-MM-DD
    date: v.string(),
    worked: v.boolean(),
    hoursWorked: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_date", ["userId", "date"]),
});
