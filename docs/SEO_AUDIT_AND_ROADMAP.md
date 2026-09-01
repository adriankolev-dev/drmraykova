# SEO + GEO Audit & Roadmap — drmariaraykova.com

**Date:** 2026-09-01  
**Scope:** Phase 0 audit + Phase 1–12 implementation (preserve existing structure)

---

## Phase 0 — Audit Summary

### What was already strong
- Next.js App Router + next-intl (bg/en/es), locale-aware canonicals & hreflang
- Comprehensive JSON-LD: Physician, LocalBusiness, MedicalProcedure, Article, FAQ, BreadcrumbList
- 8 service pages with FAQ, pricing blocks, related services, Superdoc CTAs
- Article system with author box, sources, FAQ, E-E-A-T patterns (menstrual pillar article)
- robots.txt, dynamic sitemap, GA4 with cookie consent
- Existing organic traction — URL structure preserved

### Gaps identified (pre-implementation)
- No visible breadcrumb UI (JSON-LD only)
- Handbook hub flat list — no topical clusters
- Related articles by date, not category
- Limited article → service internal linking
- Home meta not optimized for “гинеколог София” money keyword
- Sitemap missing `x-default` in alternates
- No custom 404 page
- No GA4 conversion events on BookCta clicks
- Only 6 BG articles; high-priority cluster content missing
- Some blog cover images referenced but not in `/public/blog/` (TODO)

---

## Implementation Completed (2026-09-01)

### 1. SEO foundation
- **Home meta (BG):** title → “Гинеколог в София – д-р Мария Райкова | Прегледи и консултации”
- **Handbook meta (BG):** “Наръчник за женското здраве” + expanded description
- Visible **breadcrumbs** on article, handbook, and service pages
- **404 page** with nav + BookCta

### 2. Topical architecture
- `src/lib/article-clusters.ts` — cluster definitions + article→service mapping
- Handbook hub reorganized by cluster (HPV/cytology, colposcopy, hysteroscopy, menstrual, prevention)
- `getRelatedArticles()` — same category first

### 3. New BG articles (6 high-priority)
| Slug | Topic |
|------|-------|
| `pozitiven-hpv-test` | Положителен HPV тест |
| `kakvo-pokazva-citonamazkata` | Какво показва цитонамазката |
| `kakvo-sledva-sled-abnormalna-citonamazka` | След абнормна цитонамазка |
| `boli-li-kolposkopiyata` | Боли ли колпоскопията |
| `boli-li-histeroskopiyata` | Боли ли хистероскопията |
| `neredoven-cikul-koga-e-problem` | Нередовен цикъл |

### 4. Improved existing content
- `kakvo-e-kolposkopiya.md` — GEO direct answer, FAQ, sources, internal links, updated date

### 5. Internal linking
- Contextual links in all new articles → service pages + cluster articles
- `ArticleRelatedServices` component on every article page
- Handbook cluster sections link to primary service pages

### 6. Structured data
- Existing JSON-LD preserved; breadcrumbs now match visible UI
- FAQ schema on articles with visible FAQ sections

### 7. Technical SEO
- Sitemap `alternates.languages["x-default"]` → BG URLs
- Build verified: 79 static pages (12 articles × 3 locales for BG-only content falls back to BG)

### 8. Analytics
- `src/lib/analytics.ts` — `trackBookCta()` → GA4 event `book_appointment_click`
- Wired into `BookCta.tsx` on click

### 9. Redirects
- None added (no URL changes)

---

## Remaining Issues / TODOs

| Issue | Priority |
|-------|----------|
| EN/ES translations for 6 new articles | Medium |
| Blog cover images missing (`cover-menstrualni.webp`, etc.) | Medium |
| Phone/email click tracking not wired | Medium |
| GSC position-based title/meta iteration | Ongoing |
| Remaining cluster articles (ASC-US/LSIL/HSIL, hysteroscopy subtopics, menstrual symptoms) | High (30–90d) |
| Article markdown links use locale-agnostic `/uslugi/` paths (works via default locale) | Low |

---

## SEO Roadmap

### Next 30 days
1. Monitor GSC for new article impressions (HPV, colposcopy, cytology queries)
2. Optimize titles/meta for pages with high impressions + low CTR (positions 4–10)
3. Add 3–4 supporting articles: ASC-US/LSIL/HSIL, подготовка за колпоскопия, кървене между цикли
4. Add missing blog cover WebP assets
5. Wire `trackOutboundLink` for tel: and mailto: clicks
6. Submit updated sitemap in GSC

### Next 60 days
1. Hysteroscopy cluster: 4–5 supporting articles (офис vs оперативна, полип, миома, възстановяване)
2. Menstrual cluster: обилна менструация, болезнена менструация, липса на менструация
3. EN translations for top 6 articles (if EN traffic warrants)
4. Review Core Web Vitals in GSC; optimize any LCP images on article pages

### Next 90 days
1. Complete symptom cluster (10 menstrual/symptom articles from plan)
2. Local SEO: ensure NAP consistency in GBP matches site footer
3. Build internal link report — orphan check for new pages
4. A/B test home hero H1 for “гинеколог София” vs current brand-first headline (careful — preserve what works)
5. Evaluate AI Overview citations for question-based queries

---

## Keyword / Topic Map

| Topic | Primary Page | Supporting Pages | Search Intent | Priority | Internal Links |
|-------|--------------|------------------|---------------|----------|----------------|
| Гинеколог София | `/` (home) | `/uslugi`, `/za-lekarya`, `/kontakti` | Local + booking | HIGH | All service pages, footer |
| Гинекologичен преглед | `/uslugi/akushero-ginekologichni-pregledi` | `podgotovka-za-ginekologichen-pregled` | Service + how-to | HIGH | Prevention cluster |
| Профилактика | `/uslugi/profilaktichen-ginekologichen-pregled` | `kakvo-vklyuchva-...`, `kolko-chesto-...` | Prevention | HIGH | citonamazka, hpv-test |
| HPV | `/uslugi/hpv-test` | `pozitiven-hpv-test`, `hpv-test-vs-citonamazka`, `kakvo-sledva-...` | Diagnostic fear | HIGH | kolposkopiya, citonamazka |
| Цитонамазка | `/uslugi/citonamazka` | `kakvo-pokazva-citonamazkata`, `kakvo-sledva-...` | Results interpretation | HIGH | hpv-test, kolposkopiya |
| Колпоскопия | `/uslugi/kolposkopiya` | `kakvo-e-kolposkopiya`, `boli-li-kolposkopiyata` | Procedure anxiety | HIGH | citonamazka, hpv-test |
| Хистероскопия | `/uslugi/histeroskopiya` | `boli-li-histeroskopiyata` (+ planned subtopics) | Procedure info | HIGH | ultrazvuk, zhensko-zdrave |
| Менструални нарушения | `menstrualni-narusheniya-...` | `neredoven-cikul-koga-e-problem` (+ planned) | Symptom evaluation | HIGH | zhensko-zdrave, pregledi |
| Цени София | `/tseni` | Service price blocks | Commercial | HIGH | All services |
| Женско здраве | `/uslugi/zhensko-zdrave` | Menstrual cluster | Consultation | MEDIUM | ultrazvuk, pregledi |

---

## Self-Audit Checklist

- [x] No URL structure changes / no broken redirects
- [x] No invented medical facts, prices, credentials
- [x] Unique titles/descriptions per indexable page (existing + new)
- [x] Visible FAQ matches FAQ schema where present
- [x] Breadcrumbs visible + BreadcrumbList JSON-LD aligned
- [x] Build passes (`npm run build`)
- [ ] All blog cover images present (TODO)
- [ ] EN/ES article translations (TODO)
