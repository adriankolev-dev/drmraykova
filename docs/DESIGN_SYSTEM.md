# Design System — Д-р Мария Райкова

Премиум частна медицинска марка. Спокойна, съвременна, доверителна — близо до качеството на модерен технологичен бранд, адаптирана за здравеопазване.

---

## 1. Brand positioning

**Feeling:** спокойна компетентност, топлина без сантименталност, ясна структура.

**Not:** болничен шаблон, WordPress doctor theme, розови „женски“ клишета, тъмен tech glow, лилави AI градиенти.

**Primary job of the UI:** да изгради доверие и да доведе до „Запази час“.

---

## 2. Visual direction

### Atmosphere

- Светъл, дишащ фон с лека топло-студена неутралност (не чисто бяло, не крем #F4F1EA).
- Пълнокръвен визуален план в hero (фотография / атмосфера), не inset карти.
- Една композиция на viewport — бранд, едно заглавие, едно изречение, CTA група.

### Color philosophy

Дълбоко мастилено мастило (текст/авторитет) + мек клиничен фон + един сдържан акцент в **мек baby pink** (топлина, женско здраве — без „бонбонено“ розово).

| Token | Role | Value (approx) |
|-------|------|----------------|
| `--background` | Page canvas | `#F6F4F1` soft stone-warm neutral |
| `--foreground` | Primary text | `#1A2332` deep ink |
| `--muted` | Soft surfaces | `#EDEAE5` |
| `--muted-foreground` | Secondary text | `#5C6570` |
| `--primary` | Accent / CTA | `#E8A4B0` baby pink |
| `--primary-foreground` | On accent | `#2B1A20` deep rose-ink |
| `--secondary` | Soft pink wash | `#F5D6DC` |
| `--accent` | Highlight wash | `#FAE8EC` |
| `--border` | Hairlines | `#D9D4CC` |
| `--ring` | Focus | `#E8A4B0` |
| `--destructive` | Errors only | `#B42318` |
| `--surface-ink` | Dark band sections | `#15202B` |
| `--surface-ink-foreground` | Text on ink | `#F3F1ED` |

**Rules**
- Един акцент. Не градиенти „за красота“.
- CTA = solid primary, не pill с glow.
- Dark sections само за контрастни CTA/footer ленти — сайтът по подразбиране е светъл.

### Typography

Cyrillic-capable, expressive, not Inter/Roboto/Arial.

| Role | Family | Usage |
|------|--------|--------|
| Display | **Literata** (soft editorial serif, Cyrillic) | Brand name, hero H1, section titles |
| Sans | **Onest** (modern grotesque, Cyrillic) | Body, UI, nav, buttons |
| Mono (rare) | **IBM Plex Mono** (Cyrillic) | Meta labels, section indexes (`01`, `02`) |

> Fonts chosen for reliable Bulgarian/Cyrillic coverage via `next/font/google`.

**Scale (mobile → desktop)**

| Token | Mobile | Desktop | Weight |
|-------|--------|---------|--------|
| `display` | 2.25rem | 3.75rem | 500–600 |
| `h1` | 2rem | 3rem | 500 |
| `h2` | 1.5rem | 2.25rem | 500 |
| `h3` | 1.25rem | 1.5rem | 550 |
| `body` | 1rem | 1.125rem | 400 |
| `small` | 0.875rem | 0.875rem | 400 |
| `label` | 0.75rem | 0.75rem | 500, tracking wide |

**Rules**
- Брандът в hero е display-level сигнал — не само nav текст.
- Заглавията не трябва да засенчват името на лекаря в първия екран.
- Line-length: ~60–70 characters for body.

### Spacing

Base unit: **4px**. Section rhythm: **96–128px** desktop, **64–80px** mobile.

| Token | Value |
|-------|-------|
| `space-section` | clamp(4rem, 8vw, 8rem) |
| `space-block` | clamp(2rem, 4vw, 3.5rem) |
| `container` | max 1120–1200px |
| `gutter` | 1.25rem mobile / 2rem desktop |

Generous whitespace = premium. Prefer empty space over cards.

### Radius & elevation

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Inputs, small controls |
| `--radius-md` | 12px | Buttons, interactive surfaces |
| `--radius-lg` | 20px | Large media frames only when needed |
| Shadows | Almost none | Prefer border / tonal shift |

**Cards:** default = no cards. Cards only when they wrap a real interaction (FAQ accordion, form, booking prompt).

### Imagery

- Real doctor / clinic atmosphere when available.
- Full-bleed hero plane.
- No floating badges, stickers, or promo chips on hero media.
- Soft photographic grade; avoid stock “smiling nurse” clichés.

---

## 3. Motion principles

Library: **Framer Motion**. Optional Lenis later if scroll feel needs it.

| Motion | Spec | Purpose |
|--------|------|---------|
| Page enter | opacity 0→1, y 12→0, 400ms ease-out | Continuity |
| Section reveal | once-in-view, y 24→0, 500–700ms, stagger 80ms | Hierarchy |
| Hover (buttons) | slight y -1 / bg shift, 150ms | Affordances |
| FAQ / accordion | height + fade | Clarity |
| Booking CTA | subtle scale 1→1.02 on hover | Conversion |

**Constraints**
- Respect `prefers-reduced-motion: reduce` → instant or opacity-only.
- No continuous glow/blob animations on medical pages.
- Mobile: lighter transforms, avoid heavy parallax.
- Motion supports trust; never distracts from clinical content.

---

## 4. UI patterns

### Navigation
- Sticky, translucent light bar.
- Links: Начало, За лекаря, Услуги, Наръчник, Контакти.
- Primary button: **Запази час** (always visible).
- Mobile: full-screen or sheet menu, large touch targets (≥44px).

### Buttons
- `primary` — baby pink fill → Superdoc booking
- `secondary` — outline / ghost → „Научете повече“
- `ink` — dark fill for contrast bands
- No pill-full rounded; use `--radius-md`.

### Sections (homepage vocabulary)
1. Hero — brand + specialty + CTA  
2. Doctor intro  
3. Trust indicators (rating, НЗОК, languages — factual only)  
4. Main services  
5. Why this doctor  
6. Testimonials (permissioned / anonymized)  
7. Clinic / location  
8. Final CTA  

One purpose, one headline, one supporting line per section.

### Booking CTA
All „Запази час“ go through `lib/booking.ts` → Superdoc URL (v1). Architecture ready for widget/API later.

---

## 5. Accessibility

- Contrast AA minimum on text/CTA.
- Visible focus rings (`--ring`).
- Semantic landmarks, heading order.
- Reduced motion support.
- Touch-friendly spacing on mobile.

---

## 6. What we deliberately avoid

- Purple / indigo AI gradients  
- Terracotta-on-cream startup cliché  
- Broadsheet / newspaper layouts  
- Card grids in the hero  
- Hospital blue + white chrome templates  
- Emoji decoration  
- Multi-layer neon shadows  
- Overclaiming seniority or pregnancy services  

---

## 7. Implementation mapping

| Doc concept | Code |
|-------------|------|
| Color tokens | `src/app/globals.css` `:root` |
| Type / spacing | Tailwind theme in `globals.css` `@theme` |
| Motion primitives | `src/components/motion/` |
| Buttons | `src/components/ui/button.tsx` |
| Booking | `src/lib/booking.ts` |

---

## 8. Review checkpoint

Approve this direction before building full page compositions. Adjustments welcome on:
- pink intensity (lighter/darker baby pink),
- serif vs sans for display,
- darker vs lighter canvas.

**Stage 1 status:** Tokens, fonts, booking abstraction, SEO stubs and Netlify config are in the codebase. Preview at `/` shows palette + type only — not the final homepage. Primary accent updated to baby pink `#E8A4B0`.
