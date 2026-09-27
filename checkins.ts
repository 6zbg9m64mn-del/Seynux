import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Returns today's date string in YYYY-MM-DD format (UTC)
function todayUTC(): string {
  return new Date().toISOString().split("T")[0];
}

// Returns a date string N days ago in YYYY-MM-DD (UTC)
function daysAgoUTC(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().split("T")[0];
}

export const logCheckin = mutation({
  args: {
    worked: v.boolean(),
    hoursWorked: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Connexion requise pour enregistrer le suivi",
      });
    }

    const userId = identity.tokenIdentifier;
    const today = todayUTC();

    const existing = await ctx.db
      .query("dailyCheckins")
      .withIndex("by_userId_and_date", (q) =>
        q.eq("userId", userId).eq("date", today),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        worked: args.worked,
        hoursWorked: args.hoursWorked,
      });
      return existing._id;
    }

    return await ctx.db.insert("dailyCheckins", {
      userId,
      date: today,
      worked: args.worked,
      hoursWorked: args.hoursWorked,
    });
  },
});

export const getTodayCheckin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.tokenIdentifier;
    const today = todayUTC();

    return await ctx.db
      .query("dailyCheckins")
      .withIndex("by_userId_and_date", (q) =>
        q.eq("userId", userId).eq("date", today),
      )
      .unique();
  },
});

export const getRecentCheckins = query({
  args: { days: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.tokenIdentifier;
    const lookback = args.days ?? 35;
    const from = daysAgoUTC(lookback);

    return await ctx.db
      .query("dailyCheckins")
      .withIndex("by_userId_and_date", (q) =>
        q.eq("userId", userId).gte("date", from),
      )
      .order("asc")
      .collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.tokenIdentifier;
    const from = daysAgoUTC(60);

    const checkins = await ctx.db
      .query("dailyCheckins")
      .withIndex("by_userId_and_date", (q) =>
        q.eq("userId", userId).gte("date", from),
      )
      .order("desc")
      .collect();

    const workedSet = new Set(
      checkins.filter((c) => c.worked).map((c) => c.date),
    );

    // Current streak: consecutive worked days ending today or yesterday
    let streak = 0;
    const today = todayUTC();
    let cursor = today;
    // If today is not checked in yet, check from yesterday
    if (!workedSet.has(today)) {
      const yesterday = daysAgoUTC(1);
      cursor = yesterday;
    }
    for (let i = 0; i <= 60; i++) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      if (cursor === today) {
        // start from today
        const dateStr =
          i === 0 ? today : new Date(new Date().setUTCDate(new Date().getUTCDate() - i)).toISOString().split("T")[0];
        if (workedSet.has(dateStr)) {
          streak++;
        } else {
          break;
        }
      } else {
        // start from yesterday
        const dateStr = new Date(
          new Date().setUTCDate(new Date().getUTCDate() - (i + 1)),
        )
          .toISOString()
          .split("T")[0];
        if (workedSet.has(dateStr)) {
          streak++;
        } else {
          break;
        }
      }
    }

    const totalWorked = workedSet.size;

    // This week (last 7 days)
    const weekFrom = daysAgoUTC(6);
    const thisWeekCount = checkins.filter(
      (c) => c.worked && c.date >= weekFrom,
    ).length;

    // Average hours per worked day
    const workedWithHours = checkins.filter(
      (c) => c.worked && c.hoursWorked !== undefined,
    );
    const avgHours =
      workedWithHours.length > 0
        ? workedWithHours.reduce((sum, c) => sum + (c.hoursWorked ?? 0), 0) /
          workedWithHours.length
        : 0;

    return {
      streak,
      totalWorked,
      thisWeekCount,
      avgHours: Math.round(avgHours * 10) / 10,
    };
  },
});
