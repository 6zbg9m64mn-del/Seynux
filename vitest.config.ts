import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@/convex": path.resolve(__dirname, "./convex"), "@": path.resolve(__dirname, "./src") } },
  test: {
    restoreMocks: true,
    projects: [
      { extends: true, test: { name: "frontend", environment: "jsdom", include: ["src/**/*.test.{ts,tsx}"] } },
      { extends: true, test: { name: "convex", environment: "edge-runtime", include: ["convex/**/*.test.ts"] } },
    ],
  },
});
