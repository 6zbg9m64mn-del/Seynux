import type { Doc } from "../_generated/dataModel.d.ts";
import { parseOrientationPayload } from "../../src/lib/orientation-storage.ts";
import { getMaxScore, type ProfileKey, type StudentLevel } from "../../src/lib/assessment.ts";
import { getOrientations, getProfileGuidance, getNextSteps, getLevelAdvice, getSubjectRecommendations } from "../../src/lib/orientation.ts";
import { generateDeepAnalysis } from "../../src/lib/psycho-analysis.ts";
import { reportSummary } from "./access.ts";

function legacyAnalysis(report: Doc<"assessments">, hasAnalyse: boolean, hasPlan: boolean) {
  if (!hasAnalyse || report.isExtended) return null;
  const allowedProfiles: ProfileKey[] = ["analytique", "ambitieux", "instable", "discipline", "perdu"];
  const profile = allowedProfiles.find((key) => key === report.profile) ?? "analytique";
  const level: StudentLevel | undefined = report.level === "college" || report.level === "lycee" || report.level === "universite" ? report.level : undefined;
  const scores = { cognition: report.cognitionScore, discipline: report.disciplineScore, emotion: report.emotionScore ?? 0, motivation: report.motivationScore };
  const orientations = getOrientations(scores, profile, report.version);
  const guidance = getProfileGuidance(profile);
  return {
    orientations,
    guidance: { ...guidance, weeklyPlan: hasPlan ? guidance.weeklyPlan : [] },
    subjectRecs: getSubjectRecommendations(scores, profile, orientations),
    deepAnalysis: generateDeepAnalysis(scores, profile, getMaxScore(report.version), level),
    nextSteps: hasPlan ? getNextSteps(scores, profile, level) : [],
    levelAdvice: hasPlan ? getLevelAdvice(level, profile) : null,
  };
}

export function presentReport(report: Doc<"assessments">, access: "owner" | "admin" | "guest") {
  const hasAnalyse = report.paymentStatus === "approved" && (report.paidTier === "analyse" || report.paidTier === "plan");
  const hasPlan = hasAnalyse && report.paidTier === "plan";
  const parsed = report.isExtended && report.extendedData ? parseOrientationPayload(report.extendedData) : null;
  const orientation = parsed?.orientation;
  return {
    ...reportSummary(report),
    access,
    hasAnalyse,
    hasPlan,
    analysis: legacyAnalysis(report, hasAnalyse, hasPlan),
    preview: parsed && orientation ? {
      data: { level: parsed.data.level, dreamJob: parsed.data.dreamJob },
      orientation: {
        personalityType: orientation.personalityType,
        summary: orientation.summary,
        coherenceScore: orientation.coherenceScore,
        wellbeingAlert: orientation.wellbeingAlert,
        dominantInterests: orientation.dominantInterests,
        dominantValues: orientation.dominantValues,
        lifeProjectAlignment: orientation.lifeProjectAlignment,
      },
    } : null,
    fullOrientation: parsed && hasAnalyse ? {
      data: { level: parsed.data.level, dreamJob: parsed.data.dreamJob, idealLife: parsed.data.idealLife },
      orientation: parsed.orientation,
    } : null,
  };
}
