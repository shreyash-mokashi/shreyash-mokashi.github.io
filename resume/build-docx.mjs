/**
 * Generates the ATS-friendly .docx resume.
 *
 * Mirrors resume/resume.html exactly — same wording, same order. Kept as a
 * script so the Word and PDF versions can never drift apart silently.
 *
 * Needs the `docx` package:  npm install docx
 * Run:                       node resume/build-docx.mjs
 *
 * ATS constraints deliberately observed: one column, no tables, no text
 * boxes, no images, standard headings, contact details as body text.
 */
import { writeFileSync } from 'node:fs'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
} from 'docx'

const FONT = 'Arial'
const BODY_PT = 10
const half = (pt) => pt * 2 // docx sizes are in half-points

const text = (content, opts = {}) =>
  new TextRun({ text: content, font: FONT, size: half(opts.size ?? BODY_PT), bold: opts.bold })

const body = (runs, opts = {}) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [runs],
    spacing: { after: opts.after ?? 60, line: 264 },
  })

/** Section heading with the rule under it, as in the PDF. */
const heading = (label) =>
  new Paragraph({
    children: [text(label.toUpperCase(), { bold: true, size: 10.5 })],
    spacing: { before: 200, after: 70 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 2 },
    },
  })

const bullet = (content) =>
  new Paragraph({
    children: [text(content)],
    bullet: { level: 0 },
    spacing: { after: 50, line: 264 },
    indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.17) },
  })

/** "Label: value" line used in the skills block. */
const skill = (label, value) =>
  body([text(`${label}: `, { bold: true }), text(value)])

const doc = new Document({
  creator: 'Shreyash Mokashi',
  title: 'Shreyash Mokashi — Software Engineer — Resume',
  description: 'Resume',
  styles: {
    default: {
      document: { run: { font: FONT, size: half(BODY_PT) } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.5),
            bottom: convertInchesToTwip(0.5),
            left: convertInchesToTwip(0.6),
            right: convertInchesToTwip(0.6),
          },
        },
      },
      children: [
        new Paragraph({
          children: [text('Shreyash Mokashi', { bold: true, size: 19 })],
          spacing: { after: 20 },
          alignment: AlignmentType.LEFT,
        }),
        body(text('Software Engineer', { bold: true, size: 11 }), { after: 40 }),
        body(
          text(
            'Pune, Maharashtra, India  |  +91 93703 14430  |  shreyashmokashi0268@gmail.com',
            { size: 9.2 },
          ),
          { after: 20 },
        ),
        body(
          text('linkedin.com/in/shreyash-mokashi-425163224', { size: 9.2 }),
          { after: 120 },
        ),

        heading('Summary'),
        body(
          text(
            'Full-stack Software Engineer with 1.5 years of experience building production travel booking web applications. Works across the stack: React, Next.js and TypeScript on the client, and Node.js API modules on the server that call upstream REST services, map supplier payloads and handle auth, timeouts and errors. Experience spans the hotel, flight, holiday, insurance and activities verticals, covering search, results, property details, booking forms, fare breakdowns and checkout, in both a mature Next.js 12 / React 18 JavaScript application and a modern Next.js 15 / React 19 TypeScript monorepo with unit and DOM test coverage.',
          ),
        ),

        heading('Technical Skills'),
        skill('Languages', 'JavaScript (ES2022), TypeScript, HTML5, CSS3'),
        skill(
          'Frontend',
          'React 18/19, Next.js 12-15, Tailwind CSS, Material UI, Bootstrap, CSS Modules',
        ),
        skill(
          'Backend and Data',
          'Node.js, Express.js, REST API design and integration, MongoDB, SQL',
        ),
        skill('Testing', 'Vitest, React Testing Library, Playwright'),
        skill(
          'Tools and Platforms',
          'Git, Bitbucket, Jira, pnpm, Turborepo, Docker, Google Maps Platform, SonarQube',
        ),
        skill(
          'Practices',
          'REST API integration, responsive and mobile-first UI, CSS Modules and design tokens, code review, Agile / Scrum',
        ),

        heading('Professional Experience'),
        body(
          text('Software Engineer — Vernost Tech Ventures Pvt. Ltd., Pune, India', {
            bold: true,
          }),
          { after: 20 },
        ),
        body(text('June 2025 – Present'), { after: 70 }),
        bullet(
          'Delivered 1,000+ merged commits across four production repositories, adding over 60,000 lines across approximately 2,300 file changes.',
        ),
        bullet(
          'Wrote the server-side API modules behind the booking screens in Node.js and TypeScript, covering upstream REST calls, supplier payload mapping, per-route authentication, request timeouts and error handling, each with its own tests.',
        ),
        bullet(
          'Built the hotel search map view and the property nearby-places panel on the Google Maps JavaScript API, including a viewport-bounds utility covered by unit and DOM tests.',
        ),
        bullet(
          'Developed the hotel booking page: guest and contact forms with validation, cancellation policy banner and timeline, and the pay-at-hotel price breakdown.',
        ),
        bullet(
          'Maintained and extended shared fare and price-breakdown components reused across the hotel, flight, holiday and insurance verticals.',
        ),
        bullet(
          'Integrated checkout mechanics including payment gateway charge handling, coupon validation, price recheck before payment and booking status polling.',
        ),
        bullet(
          'Built corporate travel policy compliance screens with dynamic in-policy and out-of-policy evaluation, multi-level approver binding, and an email approve and discard flow.',
        ),
        bullet(
          'Built the My Trips booking history page and the account profile section spanning all travel verticals.',
        ),
        bullet(
          'Improved perceived image load time on hotel search results by removing a hard-coded one second placeholder delay and making the behaviour configurable per caller.',
        ),
        bullet(
          'Worked in a TypeScript monorepo (Next.js 15, React 19, pnpm, Turborepo), writing typed view models with Vitest and Testing Library coverage alongside each feature.',
        ),
        bullet(
          'Performed root cause analysis on production defects across UI, API integration and data flow, and verified fixes through functional and regression testing.',
        ),

        heading('Education'),
        body(
          text('Bachelor of Engineering, Computer Science — August 2020 to January 2024', {
            bold: true,
          }),
          { after: 20 },
        ),
        body(
          text(
            'Rajgad Dnyanpeeth’s Shri Chhatrapati Shivajiraje College of Engineering, Bhor, Pune',
          ),
          { after: 20 },
        ),
        body(text('Affiliated to Savitribai Phule Pune University (SPPU)')),
      ],
    },
  ],
})

const out = process.argv[2] ?? 'public/Shreyash-Mokashi-Resume.docx'
Packer.toBuffer(doc).then((buf) => {
  writeFileSync(out, buf)
  console.log(`wrote ${out} (${buf.length} bytes)`)
})
