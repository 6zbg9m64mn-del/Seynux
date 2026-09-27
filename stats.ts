import { query } from "./_generated/server";
import { requireAdmin } from "./helpers.ts";

// ── Admin Statistics ─────────────────────────────────────────────────────────

export const getAdminStats = query({
  args: {},
  handler: async (ctx): Promise<{
    totalTests: number;
    testsToday: number;
    testsThisWeek: number;
    totalRevenue: number;
    revenueToday: number;
    profileDistribution: { key: string; count: number }[];
    levelDistribution: { key: string; count: number }[];
    avgScoreByDimension: { cognition: number; discipline: number; emotion: number; motivation: number };
    paymentFunnel: { started: number; pending: number; approved: number; rejected: number };
    dailyTests: { date: string; count: number }[];
    topProfiles: { profile: string; count: number; pct: number }[];
    conversionRate: number;
  }> => {
    await requireAdmin(ctx);

    const all = await ctx.db.query("assessments").order("desc").collect();
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const todayMs = startOfToday.getTime();
    const weekMs = startOfWeek.getTime();

    // Counts
    const totalTests = all.length;
    const testsToday = all.filter((a) => a._creationTime >= todayMs).length;
    const testsThisWeek = all.filter((a) => a._creationTime >= weekMs).length;

    // Revenue (approved payments only)
    const approved = all.filter((a) => a.paymentStatus === "approved");
    const totalRevenue = approved.reduce((sum, a) => sum + (a.paidTier === "plan" ? 2000 : 1000), 0);
    const revenueToday = approved
      .filter((a) => a._creationTime >= todayMs)
      .reduce((sum, a) => sum + (a.paidTier === "plan" ? 2000 : 1000), 0);

    // Profile distribution
    const profileMap: Record<string, number> = {};
    for (const a of all) {
      const p = a.profile ?? "inconnu";
      profileMap[p] = (profileMap[p] ?? 0) + 1;
    }
    const profileDistribution = Object.entries(profileMap).map(([key, count]) => ({ key, count }));

    // Level distribution
    const levelMap: Record<string, number> = {};
    for (const a of all) {
      const l = a.level ?? "inconnu";
      levelMap[l] = (levelMap[l] ?? 0) + 1;
    }
    const levelDistribution = Object.entries(levelMap).map(([key, count]) => ({ key, count }));

    // Average scores by dimension
    const v2 = all.filter((a) => (a.version ?? 1) >= 2);
    const avgScoreByDimension = {
      cognition: v2.length > 0 ? Math.round(v2.reduce((s, a) => s + a.cognitionScore, 0) / v2.length * 10) / 10 : 0,
      discipline: v2.length > 0 ? Math.round(v2.reduce((s, a) => s + a.disciplineScore, 0) / v2.length * 10) / 10 : 0,
      emotion: v2.length > 0 ? Math.round(v2.reduce((s, a) => s + (a.emotionScore ?? 0), 0) / v2.length * 10) / 10 : 0,
      motivation: v2.length > 0 ? Math.round(v2.reduce((s, a) => s + a.motivationScore, 0) / v2.length * 10) / 10 : 0,
    };

    // Payment funnel
    const paymentFunnel = {
      started: totalTests,
      pending: all.filter((a) => a.paymentStatus === "pending").length,
      approved: approved.length,
      rejected: all.filter((a) => a.paymentStatus === "rejected").length,
    };

    // Daily tests for last 14 days
    const dailyMap: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      const key = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
      dailyMap[key] = 0;
    }
    for (const a of all) {
      const d = new Date(a._creationTime);
      const key = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (key in dailyMap) {
        dailyMap[key]++;
      }
    }
    const dailyTests = Object.entries(dailyMap).map(([date, count]) => ({ date, count }));

    // Top profiles
    const topProfiles = profileDistribution
      .sort((a, b) => b.count - a.count)
      .map(({ key, count }) => ({
        profile: key,
        count,
        pct: totalTests > 0 ? Math.round((count / totalTests) * 100) : 0,
      }));

    // Conversion rate: approved / total tests
    const conversionRate = totalTests > 0 ? Math.round((approved.length / totalTests) * 100) : 0;

    return {
      totalTests,
      testsToday,
      testsThisWeek,
      totalRevenue,
      revenueToday,
      profileDistribution,
      levelDistribution,
      avgScoreByDimension,
      paymentFunnel,
      dailyTests,
      topProfiles,
      conversionRate,
    };
  },
});
