const REPORT_KEY_STORAGE_PREFIX = "psyche_report_key_";
const REPORT_KEY_PATTERN = /^[0-9a-f]{64}$/;

function storageKey(id: string): string {
  return `${REPORT_KEY_STORAGE_PREFIX}${id}`;
}

export function createReportKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function rememberReportKey(id: string, key: string): boolean {
  try {
    localStorage.setItem(storageKey(id), key);
    return true;
  } catch {
    return false;
  }
}

export function readReportKey(id: string): string | undefined {
  try {
    const key = localStorage.getItem(storageKey(id));
    return key !== null && REPORT_KEY_PATTERN.test(key) ? key : undefined;
  } catch {
    return undefined;
  }
}

export function reportPath(base: string, id: string, key?: string): string {
  const path = `${base}/${id}`;
  return key ? `${path}#key=${key}` : path;
}
