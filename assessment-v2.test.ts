import { describe, expect, it } from "vitest";
import {
  FINANCIAL_INFLUENCE_OPTIONS,
  FREE_TIME_INTERESTS,
  GROUP_ROLES,
  PROBLEM_TYPES,
  computeV2DimensionScores,
  computeV2Orientation,
  createEmptyV2Data,
  type V2ExtendedData,
} from "./assessment-v2.ts";

function createAssessmentData(overrides: Partial<V2ExtendedData> = {}): V2ExtendedData {
  return {
    ...createEmptyV2Data(),
    ...overrides,
  };
}

describe("assessment v2", () => {
  it("scores the exact accented scientific and discipline options within the valid range", () => {
    const data = createAssessmentData({
      freeTimeInterests: ["Mathématiques"],
      problemTypeInterest: "Résoudre un problème scientifique",
      groupRole: "Celui qui exécute",
      financialInfluence: "Très peu",
    });

    expect(FREE_TIME_INTERESTS).toContain(data.freeTimeInterests[0]);
    expect(PROBLEM_TYPES).toContain(data.problemTypeInterest);
    expect(GROUP_ROLES).toContain(data.groupRole);
    expect(FINANCIAL_INFLUENCE_OPTIONS).toContain(data.financialInfluence);

    const scores = computeV2DimensionScores(data);

    expect(scores.cognitionScore).toBe(9);
    expect(scores.disciplineScore).toBe(8);
    expect(Object.values(scores).every((score) => score >= 0 && score <= 15)).toBe(true);
  });

  it("includes the creative strength and cognitive style for a Créatif profile", () => {
    const result = computeV2Orientation(createAssessmentData({
      groupRole: "Celui qui crée",
    }));

    expect(result.personalityType).toBe("Créatif");
    expect(result.strengths).toContainEqual(expect.objectContaining({ title: "Créativité et originalité" }));
    expect(result.psychologicalProfile.cognitiveStyle).toBe("Pensée divergente et associative");
  });

  it("gives students university guidance without lycée series", () => {
    const result = computeV2Orientation(createAssessmentData({
      level: "etudiant",
      freeTimeInterests: ["Mathématiques", "Informatique"],
      adultLifeAttraction: "Construire des technologies",
      conferenceChoice: "Intelligence artificielle",
    }));

    expect(result.primarySeries).toEqual([]);
    expect(result.alternativeSeries).toEqual([]);
    expect(result.economicSeries).toEqual([]);
    expect(result.summary).toContain("formations universitaires");
    expect(result.summary).not.toContain("série");
    expect(result.monthlyPlan.map((goal) => goal.goal).join(" ")).toContain("formations universitaires");
    expect(result.monthlyPlan.map((goal) => goal.goal).join(" ")).toContain("méthodes académiques");
    expect(result.monthlyPlan.map((goal) => goal.goal).join(" ")).not.toContain("lycées");
    expect(result.monthlyPlan.map((goal) => goal.goal).join(" ")).not.toContain("série");
  });

  it("keeps lycée series recommendations for collège learners", () => {
    const result = computeV2Orientation(createAssessmentData({
      level: "college",
      freeTimeInterests: ["Mathématiques", "Informatique"],
      adultLifeAttraction: "Construire des technologies",
      conferenceChoice: "Intelligence artificielle",
    }));

    expect(result.primarySeries).toEqual(["S2", "S1"]);
    expect(result.alternativeSeries).toEqual(["S3", "S4"]);
    expect(result.economicSeries).toEqual(["S2A"]);
    expect(result.summary).toContain("La série S2");
    expect(result.monthlyPlan[0]?.goal).toContain("la série S2");
  });
});
