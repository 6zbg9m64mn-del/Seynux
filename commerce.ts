"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { Hercules } from "@usehercules/sdk";
import { api } from "./_generated/api.js";
import { FEAT_PREMIUM, FEAT_PRO } from "../src/lib/commerce-constants.ts";

const herculesClient = new Hercules({
  apiKey: process.env.HERCULES_API_KEY,
  apiVersion: "2025-12-09",
});

// ---- Create checkout session ----
export const createCheckout = action({
  args: {
    variantId: v.string(),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, args): Promise<{ url: string | null }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ code: "UNAUTHENTICATED", message: "Connexion requise" });
    }

    const user = await ctx.runQuery(api.users.getCurrentUser, {});
    if (!user) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Utilisateur introuvable" });
    }

    // Create Commerce customer on first checkout
    let customerId = user.customerId;
    if (!customerId) {
      const customer = await herculesClient.commerce.customers.create({
        name: user.displayName ?? user.name ?? "Utilisateur",
        email: user.email ?? undefined,
      });
      customerId = customer.id;
      await ctx.runMutation(api.users.setCustomerId, { customerId });
    }

    const session = await herculesClient.commerce.checkout({
      customer_id: customerId,
      line_items: [{ variant_id: args.variantId, quantity: 1 }],
      success_url: args.successUrl,
      cancel_url: args.cancelUrl,
    });

    return { url: session.url ?? null };
  },
});

// ---- Get billing portal URL ----
export const getBillingPortal = action({
  args: { returnUrl: v.string() },
  handler: async (ctx, args): Promise<{ url: string | null }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ code: "UNAUTHENTICATED", message: "Connexion requise" });
    }

    const user = await ctx.runQuery(api.users.getCurrentUser, {});
    if (!user?.customerId) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Aucun abonnement actif" });
    }

    const portal = await herculesClient.commerce.customers.billingPortal(
      user.customerId,
      { return_url: args.returnUrl },
    );

    return { url: portal.url ?? null };
  },
});

// ---- Check Premium / Pro access for current authenticated user ----
export const checkAccess = action({
  args: {},
  handler: async (ctx): Promise<{ hasPremium: boolean; hasPro: boolean }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { hasPremium: false, hasPro: false };

    const user = await ctx.runQuery(api.users.getCurrentUser, {});
    if (!user?.customerId) return { hasPremium: false, hasPro: false };

    const [premiumResult, proResult] = await Promise.all([
      herculesClient.commerce.check({
        customer_id: user.customerId,
        resource_id: FEAT_PREMIUM,
      }),
      herculesClient.commerce.check({
        customer_id: user.customerId,
        resource_id: FEAT_PRO,
      }),
    ]);

    return {
      hasPremium: premiumResult.has_access,
      hasPro: proResult.has_access,
    };
  },
});
