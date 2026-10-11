# Design — Teo Wen Long portfolio

Locked design system. Hallmark runs read this file first and pages defer to it.
Amend it on purpose; it is the rule. Token values live in `src/app/[locale]/globals.css`
(the single source of truth): this file names the decisions, not the numbers.

## System
- Genre · modern-minimal
- Macrostructure · Feature Stack: pinned tile rail left, bento content right (stacks below `lg`)
- Theme · custom (vibe: "warm workshop, amber signal, engineer's notebook")
- Axes · light paper (dark theme too) / grotesk-sans / warm amber

## Colour
- Paper is warm cream (light) or warm near-black (dark); cards sit one step off it.
- `--primary` is amber for **fills** only (dots, pills, badges, CTA tiles). Text in amber uses
  `--primary-strong` (AA on paper). Focus rings use `--ring`, the deeper amber (3:1 on paper).
- Amber is the signal, not the surface: at most one solid amber tile per screen.

## Type
- Display: Bricolage Grotesque 600/700, roman, tight tracking. Body: Manrope 400–600.
- Mono: JetBrains Mono for years, counts and the two tile labels in the top section. No more.

## Components
- Tile: `tile` + `tileLift` in `src/components/ui/tile.ts` (rounded-2xl, hairline border).
- Not everything is a tile: Experience on home is a hairline timeline, on purpose.
- Arrows: Lucide `ArrowUpRight` leaves the site, `ArrowRight` stays in it (`arrowOut` / `arrowNext`).
- Project origin: `OriginBadge` (amber "twlworks" vs muted "Work") over a dark scrim.

## Motion
- Easing `cubic-bezier(0.16, 1, 0.3, 1)`; transform and opacity only.
- Sections cascade in once; link tiles lift on hover; the nav pill slides (`layoutId`).
- No cursor-following or ambient glows. Reduced motion honoured via `MotionConfig`.

## Responsive
- Below `lg`: rail stacks above content, status folds into the profile tile, nav is a fixed
  bottom tab bar. Verified at 320 / 375 / 414 / 768.

## Social
- OG cards (`src/utils/og.tsx`) are miniatures of the home page in the dark theme; posts get
  their own card with the title.
