import { describe, expect, it, vi } from "vitest";
import { createEmptyV2Data } from "./assessment-v2.ts";
import { parseOrientationPayload, resolveOrientationPayload } from "./orientation-storage.ts";

const payload = JSON.stringify({ data: { ...createEmptyV2Data(), dreamJob: "Développeur" } });

describe("orientation persisted results", () => {
  it("prioritizes server data and never reads stale cache", () => {
    const cache = vi.fn(() => "stale");
    expect(resolveOrientationPayload({ extendedData: payload }, cache)?.data.dreamJob).toBe("Développeur");
    expect(cache).not.toHaveBeenCalled();
  });
  it("does not show cached results for missing or loading records", () => {
    const cache = vi.fn(() => payload);
    expect(resolveOrientationPayload(null, cache)).toBeNull();
    expect(resolveOrientationPayload(undefined, cache)).toBeNull();
    expect(cache).not.toHaveBeenCalled();
  });
  it("supports legacy records without server payload", () => {
    expect(resolveOrientationPayload({}, () => payload)?.data.dreamJob).toBe("Développeur");
  });
  it("handles blocked storage without crashing", () => {
    expect(resolveOrientationPayload({}, () => { throw new Error("denied"); })).toBeNull();
  });
  it("does not conceal a corrupt server record behind a cache", () => {
    const cache = vi.fn(() => payload);
    expect(resolveOrientationPayload({ extendedData: "broken" }, cache)).toBeNull();
    expect(cache).not.toHaveBeenCalled();
  });
  it.each(["null", "{}", "not-json", JSON.stringify({ data: { ...createEmptyV2Data(), freeTimeInterests: "bad" } })])("rejects invalid stored payload: %s", (raw) => {
    expect(parseOrientationPayload(raw)).toBeNull();
  });
  it("recomputes orientation instead of trusting old serialized conclusions", () => {
    const result = parseOrientationPayload(JSON.stringify({ data: createEmptyV2Data(), orientation: { personalityType: "incorrect" } }));
    expect(result?.orientation.personalityType).toBe("Polyvalent");
  });
});
