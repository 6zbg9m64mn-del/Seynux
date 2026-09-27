import { useEffect } from "react";

const SITE_URL = "https://psyche.onhercules.app";

type SeoProps = {
  /** Page title, ~10-60 characters, shown in the browser tab and search results */
  title: string;
  /** Meta description, ~50-160 characters */
  description: string;
  /** Path (starting with "/") used to build the absolute, self-referencing canonical URL */
  path: string;
  /** Optional JSON-LD structured data describing the visible content of this page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets per-page title, description, canonical URL, Open Graph tags, and
 * optional JSON-LD structured data. Since this app is a client-rendered SPA
 * (no SSR/pre-rendering), this only affects clients that execute JS, but it
 * is the best available technique for per-route metadata in this stack.
 */
export default function Seo({ title, description, path, jsonLd }: SeoProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);

    const canonicalUrl = `${SITE_URL}${path}`;

    let canonicalEl = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    upsertMeta("property", "og:url", canonicalUrl);

    let jsonLdEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      jsonLdEl = document.createElement("script");
      jsonLdEl.type = "application/ld+json";
      jsonLdEl.setAttribute("data-seo-page", "true");
      jsonLdEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdEl);
    }

    return () => {
      document.title = previousTitle;
      if (jsonLdEl) jsonLdEl.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
}
