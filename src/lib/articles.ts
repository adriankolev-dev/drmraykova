import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";

const ARTICLES_ROOT = path.join(process.cwd(), "content/articles");

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  cover: string;
  content: string;
  html: string;
  readingTime: number;
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

      return {
        slug,
        title: String(data.title ?? "Untitled"),
        excerpt: String(data.excerpt ?? ""),
        category: String(data.category ?? "General"),
        date: String(data.date ?? ""),
        cover: String(data.cover ?? "/blog/cover-profilaktika.webp"),
        content,
        html,
        readingTime: readingTimeMinutes(content),
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
