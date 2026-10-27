/**
 * Fails if a component contains user-facing text.
 *
 * The page and its README both claim every word comes from
 * src/content/profile.ts. That claim went stale once already: the work
 * section said "Six pieces" while rendering seven cards, because the
 * sentence lived in Work.tsx where an edit to the content file could not
 * reach it. This keeps the claim honest.
 *
 * Symbols without letters (©, /, ↗) are allowed — they are punctuation, not
 * copy. Anything with a run of three or more letters is copy.
 *
 * Run: pnpm check:text
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'src/components'
const WORDLIKE = /[A-Za-z]{3,}/

// JSX text nodes: between a '>' and a '<', with no braces or tags inside.
const TEXT_NODE = />([^<>{}]+)</g

let failures = 0

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.tsx'))) {
  const source = readFileSync(join(DIR, file), 'utf8')
  const lines = source.split('\n')

  lines.forEach((line, i) => {
    // Comments are not rendered.
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return

    for (const match of line.matchAll(TEXT_NODE)) {
      const text = match[1].trim()
      if (!text || !WORDLIKE.test(text)) continue
      console.error(`${DIR}/${file}:${i + 1}  inline text: "${text}"`)
      failures += 1
    }
  })
}

// Multi-line text nodes slip past a line-by-line scan, so check whole files too.
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.tsx'))) {
  const source = readFileSync(join(DIR, file), 'utf8')
  for (const match of source.matchAll(/>\s*\n\s*([A-Za-z][^<>{}]*?)\s*\n\s*</g)) {
    const text = match[1].trim()
    if (!WORDLIKE.test(text)) continue
    console.error(`${DIR}/${file}  inline text (wrapped): "${text.slice(0, 60)}"`)
    failures += 1
  }
}

if (failures > 0) {
  console.error(`\n${failures} inline string(s). Move them to src/content/profile.ts.`)
  process.exit(1)
}
console.log('check:text — no inline UI text in components')
