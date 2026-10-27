# Shreyash Mokashi — Portfolio

Personal portfolio site. Next.js 15, React 19, TypeScript, static export.

Deliberately the same stack as the production work it describes: anyone who looks
at the repo sees the claim and the evidence in one place.

---

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Build & preview the real thing

```bash
pnpm build                       # static export into out/
npx serve out                    # or: cd out && python3 -m http.server 4322
```

`out/` is plain HTML, CSS and JS — no server required.

---

## Deploy

The build output is a static folder, so any of these work with zero config:

| Host | How |
|---|---|
| **Vercel** | Import the repo. It detects Next.js; no settings to change. |
| **Netlify** | Build command `pnpm build`, publish directory `out`. |
| **GitHub Pages** | Push `out/` to the `gh-pages` branch, or use an action. Set `basePath` in `next.config.mjs` if the site lives under `/<repo-name>/`. |
| **Cloudflare Pages** | Build command `pnpm build`, output directory `out`. |

Before going live, set the real domain in `src/content/profile.ts` → `meta.siteUrl`.
It is what resolves the Open Graph image URL for link previews.

---

## Where the content lives

**Every word on the site is in `src/content/profile.ts`.** No UI text is typed
inline in a component — the same rule the production codebases enforce with a
lint guard. To change copy, edit that one file; you never need to touch a
component.

Anything still unfilled is marked `TODO(shreyash)` in that file:

- `contact.email` — a personal address, not the work one
- `contact.github` — public profile URL, if there is one
- `contact.phone` — optional
- `contact.resumeHref` — put the PDF in `public/` and point at `/resume.pdf`
- `education.items` — degree, institution, years

Empty values are **omitted from the page**, not rendered as placeholders. A
missing email means the "Email me" button and the email contact card simply do
not appear — nothing on the page ever reads "TBD" to a recruiter.

---

## Where the numbers come from

The four figures in the metrics strip are counted from real commit history, not
estimated. To re-derive them:

```bash
cd ~/Desktop/Projects

# commits (excluding the duplicate clone of the same repo)
for r in bluesky_frontend corporate-frontend-workspace \
         marketplace-frontend-workspace bluesky_apis; do
  git -C $r log --all --author='shreyash' -i --oneline | wc -l
done

# lines added / removed and files touched
for r in bluesky_frontend corporate-frontend-workspace \
         marketplace-frontend-workspace; do
  git -C $r log --all --author='shreyash' -i --shortstat --format='' \
  | awk '{f+=$1; ins+=$4; del+=$6} END {print FILENAME, f, ins, del}'
done
```

Figures are rounded **down** to the nearest round number. If a reviewer runs the
commands, the real numbers should come out at or above what the page claims.

---

## What is deliberately absent

No company source code, no client names, no internal ticket identifiers, and no
screenshots of internal systems. The project write-ups describe *what was built
and why*, at a level that is defensible in an interview without disclosing
anything the employer owns.

---

## Notes on a few implementation choices

- **Scroll reveal uses `@media (scripting: enabled)`** rather than a JS class on
  `<html>`. Setting an attribute before hydration caused a React hydration
  mismatch; the media query avoids the script entirely. Where scripting is off —
  or the browser is too old to know the feature — the animation never arms and
  the content stays visible, so the page can never fade to something it cannot
  bring back.
- **Colour tokens are checked against WCAG AA**, not eyeballed. `--text-dim`
  started at `#6b7285`, measured 4.14:1 on the canvas, and was lightened to
  `#787f94` (4.99:1). Mobile Lighthouse: accessibility, best practices and SEO
  all 100.
- **The headshot ships at 20 KB** (WebP, 720px) with a JPEG fallback, down from
  the 1.6 MB PNG original.
