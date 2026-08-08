import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";

const ARTICLES_ROOT = path.join(process.cwd(), "content/articles");

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticleSource = {
  org: string;
  title: string;
  url: string;
};

export type ArticleScientificSource = {
  title: string;
  journal: string;
  year: string;
  url: string;
  /** Optional override; falls back to handbook.scientificSourceIntro */
  intro?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  /** ISO date when the article was last substantively updated */
  updated?: string;
  cover: string;
  coverAlt: string;
  content: string;
  html: string;
  readingTime: number;
  faq: ArticleFaq[];
  sources: ArticleSource[];
  /** Thematic scientific references — only when the article topic warrants them */
  scientificSources: ArticleScientificSource[];
  closing?: string;
  ctaLabel?: string;
  ctaLead?: string;
};

function readingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function articlesDir(locale: Locale) {
  const localized = path.join(ARTICLES_ROOT, locale);
  if (fs.existsSync(localized)) return localized;
  return path.join(ARTICLES_ROOT, "bg");
}

function loadArticles(locale: Locale): Article[] {
  const dir = articlesDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const html = marked.parse(content, { async: false }) as string;
      const faqRaw = Array.isArray(data.faq) ? data.faq : [];
      const faq = faqRaw
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const row = item as { question?: unknown; answer?: unknown };
          const question = String(row.question ?? "").trim();
          const answer = String(row.answer ?? "").trim();
          if (!question || !answer) return null;
          return { question, answer };
        })
        .filter((item): item is ArticleFaq => item !== null);

      const sourcesRaw = Array.isArray(data.sources) ? data.sources : [];
      const sources = sourcesRaw
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const row = item as {
            org?: unknown;
            title?: unknown;
            url?: unknown;
          };
          const org = String(row.org ?? "").trim();
          const title = String(row.title ?? "").trim();
          const url = String(row.url ?? "").trim();
          if (!org || !title || !url) return null;
          return { org, title, url };
        })
        .filter((item): item is ArticleSource => item !== null);

      const scientificRaw = Array.isArray(data.scientificSources)
        ? data.scientificSources
        : [];
      const scientificSources = scientificRaw
        .map((item): ArticleScientificSource | null => {
          if (!item || typeof item !== "object") return null;
          const row = item as {
            title?: unknown;
            journal?: unknown;
            year?: unknown;
            url?: unknown;
            intro?: unknown;
          };
          const title = String(row.title ?? "").trim();
          const journal = String(row.journal ?? "").trim();
          const year = String(row.year ?? "").trim();
          const url = String(row.url ?? "").trim();
          if (!title || !journal || !year || !url) return null;
          const intro = row.intro ? String(row.intro).trim() : undefined;
          return intro ? { title, journal, year, url, intro } : { title, journal, year, url };
        })
        .filter((item): item is ArticleScientificSource => item !== null);

      return {
        slug,
        title: String(data.title ?? "Untitled"),
        excerpt: String(data.excerpt ?? ""),
        category: String(data.category ?? "General"),
        date: String(data.date ?? ""),
        updated: data.updated ? String(data.updated) : undefined,
        cover: String(data.cover ?? "/blog/cover-profilaktika.webp"),
        coverAlt: String(data.coverAlt ?? data.title ?? ""),
        content,
        html,
        readingTime: readingTimeMinutes(content),
        faq,
        sources,
        scientificSources,
        closing: data.closing ? String(data.closing) : undefined,
        ctaLabel: data.ctaLabel ? String(data.ctaLabel) : undefined,
        ctaLead: data.ctaLead ? String(data.ctaLead) : undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

const cache = new Map<Locale, Article[]>();

function articlesFor(locale: Locale) {
  if (!cache.has(locale)) cache.set(locale, loadArticles(locale));
  return cache.get(locale)!;
}

export function getAllArticles(locale: Locale = "bg") {
  return articlesFor(locale);
}

export function getArticleBySlug(slug: string, locale: Locale = "bg") {
  return articlesFor(locale).find((article) => article.slug === slug);
}

export function getArticleCategories(locale: Locale = "bg") {
  const articles = articlesFor(locale);
  const allLabel =
    locale === "en" ? "All" : locale === "es" ? "Todas" : "Всички";
  return [
    allLabel,
    ...Array.from(new Set(articles.map((article) => article.category))),
  ];
}

export function getArticlesByCategory(category: string, locale: Locale = "bg") {
  const articles = articlesFor(locale);
  const allLabel =
    locale === "en" ? "All" : locale === "es" ? "Todas" : "Всички";
  if (category === allLabel || category === "Всички") return articles;
  return articles.filter((article) => article.category === category);
}

export function formatArticleDate(date: string, locale: string = "bg") {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  const localeTag =
    locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "bg-BG";
  return new Intl.DateTimeFormat(localeTag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}
