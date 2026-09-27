import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createReportKey,
  readReportKey,
  rememberReportKey,
  reportPath,
} from "./report-key.ts";

const REPORT_ID = "report-123";
const VALID_KEY = "a".repeat(64);

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("report key helpers", () => {
  it("creates a 32-byte lowercase hexadecimal key", () => {
    expect(createReportKey()).toMatch(/^[0-9a-f]{64}$/);
  });

  it("returns false when report key storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage unavailable");
    });

    expect(rememberReportKey(REPORT_ID, VALID_KEY)).toBe(false);
  });

  it("returns undefined for malformed or inaccessible stored keys", () => {
    localStorage.setItem("psyche_report_key_report-123", "not-a-report-key");
    expect(readReportKey(REPORT_ID)).toBeUndefined();

    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    expect(readReportKey(REPORT_ID)).toBeUndefined();
  });

  it("returns the stored valid key", () => {
    expect(rememberReportKey(REPORT_ID, VALID_KEY)).toBe(true);
    expect(readReportKey(REPORT_ID)).toBe(VALID_KEY);
  });

  it("builds keyed and keyless report paths", () => {
    expect(reportPath("/results", REPORT_ID, VALID_KEY)).toBe(
      `/results/${REPORT_ID}#key=${VALID_KEY}`,
    );
    expect(reportPath("/orientation/results", REPORT_ID)).toBe(
      `/orientation/results/${REPORT_ID}`,
    );
  });
});
