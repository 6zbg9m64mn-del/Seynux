import { z } from "zod";
import { computeV2Orientation, type V2ExtendedData } from "./assessment-v2.ts";

const text = z.string().max(5000).default("");
const choices = z.array(z.string().max(500)).max(30);
const payloadSchema = z.object({
  data: z.object({
    age: z.number().int().min(10).max(100).optional(),
    level: z.string().optional(),
    freeTimeInterests: choices,
    problemTypeInterest: text,
    frequentThoughts: text,
    coreValues: choices,
    valuesJustification: text,
    groupRole: text,
    workStyle: text,
    inspiringPeople: choices,
    inspiringExplanation: text,
    proudMoment: text,
    subjectExcited: text,
    discouragingSubject: text,
    influentialEvent: text,
    dreamJob: text,
    adultLifeAttraction: text,
    conferenceChoice: text,
    idealLife: text,
    parentInfluence: text,
    familyProfession: text,
    familySupport: text,
    valuedProfessions: text,
    culturalInfluence: text,
    socialExpectations: text,
    financialInfluence: text,
    studyDuration: text,
    wellbeingIssues: choices,
  }),
});

export function parseOrientationPayload(raw: string) {
  try {
    const parsed = payloadSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;
    const data: V2ExtendedData = parsed.data.data;
    return { data, orientation: computeV2Orientation(data) };
  } catch {
    return null;
  }
}

// Only old records without server payloads may use the legacy browser copy.
// A missing record or corrupt server payload must never reveal an unrelated cache.
export function resolveOrientationPayload(
  record: { extendedData?: string } | null | undefined,
  readLegacyCache: () => string | null,
) {
  if (!record) return null;
  if (record.extendedData !== undefined) return parseOrientationPayload(record.extendedData);
  try {
    const cached = readLegacyCache();
    return cached ? parseOrientationPayload(cached) : null;
  } catch {
    return null;
  }
}
