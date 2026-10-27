# How to change this site and get it live

A practical runbook. Keep it open the first few times; after that the three
commands at the top are all you need.

- **Live site:** https://shreyash-mokashi.github.io/
- **Repo:** https://github.com/shreyash-mokashi/shreyash-mokashi.github.io

---

## The short version

```bash
cd ~/Desktop/Projects/shreyash-portfolio

pnpm dev        # 1. see it locally at http://localhost:4321
                # 2. edit src/content/profile.ts — the browser reloads itself
pnpm verify     # 3. typecheck + guards + build, all in one
git add -A && git commit -m "what changed" && git push
                # 4. live in about 90 seconds
```

That is the whole loop. Everything below explains one part of it in more detail.

---

## 1. Run it locally

```bash
cd ~/Desktop/Projects/shreyash-portfolio
pnpm install    # first time only, or after pulling changes
pnpm dev
```

Open **http://localhost:4321**. Leave it running while you edit — save a file
and the browser updates on its own. Stop it with `Ctrl+C`.

If port 4321 is already taken:

```bash
pnpm dev --port 4322
```

---

## 2. Make a change

### The one rule

**All text lives in `src/content/profile.ts`.** Not one word of what a visitor
reads is typed into a component. To change wording, you only ever open that one
file.

This is enforced: `pnpm check:text` fails the build if a string finds its way
into a component, and CI runs it on every push. The guard exists because this
broke once — the work section said "Six pieces" while showing seven cards,
because that sentence was stuck inside `Work.tsx` where edits to the content
file could not reach it.

### Where each thing lives

`src/content/profile.ts`, top to bottom:

| Block | Controls |
|---|---|
| `meta` | Your name, job title, tagline, location, the intro paragraph, the availability pill, the site URL |
| `nav` | The menu items across the top |
| `metrics` | The four-tile strip under the hero |
| `about` | The "How I work" paragraphs |
| `roles` | The Experience timeline |
| `projects` | The Selected Work cards |
| `skills` | The three skill tiers |
| `education` | The Education card |
| `contact` | Email, phone, LinkedIn, GitHub, résumé link |
| `sections` | Section headings, ledes and button labels |
| `footer` | The colophon line at the very bottom |

### Common edits

**Change any wording.** Find it in `profile.ts`, change the text between the
quotes, save. That is all.

**Add a project.** Copy an existing block inside `projects` and edit it. `id`
must be unique; `scale` is optional. The numbering (01, 02, …) and the
"Seven pieces" count both update by themselves — they are derived from the
array, so they can never disagree with it.

```ts
{
  id: 'something-unique',
  title: 'What you built',
  context: 'Where and when · 2026',
  summary: 'One or two sentences on what the thing is.',
  contributions: [
    'What you specifically did.',
    'Another thing you specifically did.',
  ],
  stack: ['React', 'TypeScript'],
  scale: 'Optional line, bottom right of the card',
},
```

**Remove a project.** Delete its block. Nothing else needs touching.

**Move a skill between tiers.** Cut the string from one `items` array and paste
it into another. Keep this honest — a skill listed above its real depth gets
found out in the first technical interview.

**Show the "open to roles" pill again.** In `meta`, put the sentence back:

```ts
availability: 'Open to frontend and full-stack engineering roles',
```

An empty string renders no pill at all. You may also want to change
`contact.blurb` to match, since it carries a similar line.

**Hide your phone number.** In `contact`, set `phone: ''`. Any empty contact
field is left off the page entirely — it never shows a blank or a dead link.
Remember the old value stays in git history; see *Removing something already
pushed* below.

**Change a colour.** `src/app/globals.css`, the `:root` block at the top. Every
colour on the site comes from those tokens, so changing one changes everywhere
it is used. If you change a text colour, check the contrast still passes — the
site currently scores 100 on accessibility and dim grey text is the easiest way
to lose that.

**Replace the photo.** Drop a square image in `public/` as `shreyash.webp` (and
`shreyash.jpg` as the fallback). Keep it under about 100 KB; the current one is
20 KB. The originals came from a 1.6 MB PNG — do not ship anything near that.

---

## 3. Update the résumé

Two files are generated from source, so the PDF and the Word version can never
drift apart:

| Output | Source | Rebuild with |
|---|---|---|
| `public/Shreyash-Mokashi-Resume.pdf` | `resume/resume.html` | `pnpm resume:pdf` |
| `public/Shreyash-Mokashi-Resume.docx` | `resume/build-docx.mjs` | `pnpm resume:docx` |

**Edit the wording in both source files, then run both commands.** They are
separate files, so a change to one does not reach the other. After rebuilding,
open the PDF and confirm it is still **one page**.

Both are written for applicant tracking systems: single column, no tables, no
text boxes, no images, standard headings, contact details as body text. If you
restyle them, keep all of that — a two-column résumé with a sidebar parses to
nonsense in most ATS software.

`pnpm resume:pdf` needs Google Chrome installed, which it is on this machine.

---

## 4. Check before you push

```bash
pnpm verify
```

That runs three things in order, and stops at the first failure:

1. `pnpm typecheck` — TypeScript errors
2. `pnpm check:text` — UI text that has leaked into a component
3. `pnpm build` — the real production build

If it passes, CI will pass, because CI runs the same checks.

To look at the actual production build rather than the dev server:

```bash
pnpm build
cd out && python3 -m http.server 4322
```

Then open http://127.0.0.1:4322. Worth doing after a big change — the dev
server is more forgiving than the real thing.

---

## 5. Deploy

### How it works

There is nothing to click. Pushing to `main` deploys.

```
git push  →  GitHub Actions  →  install → typecheck → check:text → build
          →  upload out/  →  GitHub Pages  →  live
```

The workflow is `.github/workflows/deploy.yml`. It takes roughly 60–90 seconds.

### Doing it

```bash
git add -A
git commit -m "short description of what changed"
git push
```

### Watching it

- **In the browser:** https://github.com/shreyash-mokashi/shreyash-mokashi.github.io/actions
  — green tick means live, red cross means it failed and the old version is
  still up.
- **In the terminal:**

```bash
curl -s "https://api.github.com/repos/shreyash-mokashi/shreyash-mokashi.github.io/actions/runs?per_page=1" \
  | python3 -c "import json,sys; r=json.load(sys.stdin)['workflow_runs'][0]; print(r['status'], r['conclusion'])"
```

### Confirming it is actually live

A green tick means the build succeeded, not that the page says what you think.
Check the real thing:

```bash
curl -s https://shreyash-mokashi.github.io/ | grep -c "some text you just added"
```

`1` or more means your change is live. `0` means it is not — usually browser or
CDN caching. Wait a minute and retry, or open the site with a hard refresh
(`Ctrl+Shift+R`).

### If a deploy fails

Open the failed run in the Actions tab and read the first red step.

| Step that failed | What it means | Fix |
|---|---|---|
| `pnpm install` | `pnpm-lock.yaml` out of step with `package.json` | Run `pnpm install` locally, commit the lockfile |
| `pnpm typecheck` | TypeScript error | Run `pnpm typecheck` locally; the message names the file and line |
| `check:text` | Text ended up in a component | The output names the file, line and string. Move it to `profile.ts` |
| `pnpm build` | Build error | Run `pnpm build` locally to see the same error |
| `deploy` | Pages permissions | Settings → Pages → Source must be **GitHub Actions** |

The live site is unaffected by a failed deploy. The previous version stays up
until a build succeeds, so a broken push never takes the site down.

---

## 6. Things that will bite you

**The site unstyled, everything plain text.** `public/.nojekyll` is missing.
GitHub Pages treats directories starting with `_` as private and silently drops
`_next/`, which is where all the CSS and JavaScript live. That empty file is the
only thing stopping it — do not delete it.

**Link previews show no image.** `meta.siteUrl` in `profile.ts` must match the
real domain. It builds the Open Graph image URL that LinkedIn and WhatsApp
fetch. If you move to a custom domain, change it there.

**Changes not showing after a successful deploy.** Browser cache. Hard refresh
with `Ctrl+Shift+R`, or check with `curl` as above, which does not cache.

**Removing something already pushed.** Deleting a phone number from
`profile.ts` removes it from the site, but it stays in git history, which is
public. Scrubbing history means a force-push and rewritten commits. If it
matters, say so — it is doable but worth doing deliberately.

---

## 7. Moving to a custom domain later

1. Buy the domain.
2. Point DNS at GitHub Pages (four `A` records, in GitHub's Pages docs).
3. Repo → Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS**.
4. Add a `public/CNAME` file containing just the domain.
5. Change `meta.siteUrl` in `profile.ts` to the new address.
6. Commit and push.

Vercel is the alternative: import the repo at vercel.com/new, it detects Next.js
with no configuration, and you get a preview URL for every branch. If you go
that way the GitHub Actions workflow becomes redundant and can be deleted.

---

## Quick reference

| I want to… | Do this |
|---|---|
| See it locally | `pnpm dev` → http://localhost:4321 |
| Change any wording | Edit `src/content/profile.ts` |
| Change a colour | Edit `:root` in `src/app/globals.css` |
| Rebuild the résumé | `pnpm resume:pdf && pnpm resume:docx` |
| Check before pushing | `pnpm verify` |
| Deploy | `git push` — that is the deploy |
| Watch the deploy | The repo's Actions tab |
| Confirm it is live | `curl -s https://shreyash-mokashi.github.io/ \| grep "your text"` |
