/**
 * Fails if a component references a CSS module class that does not exist.
 *
 * `styles.whatever` for a class the stylesheet never defines evaluates to
 * undefined, React renders no class attribute, and nothing complains. The
 * element simply goes unstyled — which looks identical to "this element was
 * never meant to be styled", so it survives review.
 *
 * Three of these were already in the tree before this guard existed.
 *
 * Run: pnpm check:css
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'src/components'
const CLASS_DEF = /^\.([A-Za-z_][\w-]*)/gm
const STYLES_USE = /styles\.([A-Za-z_]\w*)/g

let failures = 0

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.tsx'))) {
  const source = readFileSync(join(DIR, file), 'utf8')

  // Component.tsx pairs with component.module.css.
  const base = file.replace(/\.tsx$/, '')
  const cssName = base.charAt(0).toLowerCase() + base.slice(1) + '.module.css'
  const cssPath = join(DIR, cssName)
  if (!existsSync(cssPath)) continue

  const css = readFileSync(cssPath, 'utf8')
  const defined = new Set([...css.matchAll(CLASS_DEF)].map((m) => m[1]))
  const used = new Set([...source.matchAll(STYLES_USE)].map((m) => m[1]))

  for (const name of used) {
    if (defined.has(name)) continue
    console.error(`${DIR}/${file}  styles.${name} is not defined in ${cssName}`)
    failures += 1
  }
}

if (failures > 0) {
  console.error(`\n${failures} undefined CSS module reference(s).`)
  process.exit(1)
}
console.log('check:css — every styles.* reference resolves')
