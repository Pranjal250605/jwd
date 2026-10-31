# JWD — working notes

Last updated 2026-08-17.

## Read this first: which JWD?

This folder holds several JWD projects. **Almost all recent work is on the
Family Office site**, and the code that is actually live is **not in this
folder**.

| | |
|---|---|
| Live site | <https://new-jwd-office.vercel.app> |
| Deploy repo | `git@github.com:Pranjal250605/new-jwd-office-.git` (trailing hyphen) |
| Stack | Vite + React 19 SPA, app at the **repo root**, one Vercel edge function |
| Local clone | **none — you must clone it** (see below) |

### The trap that has already cost a day

`Pranjal250605/jwd` (this folder) contains `jwd-family-office-react/`, which is
a **copy of the same app** — same files, parallel history, **identical commit
messages but different SHAs**. It is stale (last touched 2026-08-02, 18
commits behind) and **nothing you change there will ever reach the live site**.

Pushing to it looks completely successful. The tell is the SHA: if
`git cat-file -t <sha>` fails for the commit the Vercel dashboard shows, you
are in the wrong repo.

**Always work from a fresh clone of `new-jwd-office-`.**

```bash
git clone --filter=blob:none git@github.com:Pranjal250605/new-jwd-office-.git
```

`--filter=blob:none` is not optional: the repo carries ~190 MB of video blobs
in `public/videos/`, and a plain `git clone` has failed mid-transfer. Those
videos are the standing argument for Git LFS.

## Deploying — verify, never assume

Push to `master`; Vercel builds automatically. **A clean `git push` does not
mean a successful deploy.** On 2026-08-11 a push succeeded, the build failed
seconds later, and the site quietly served the old bundle for half an hour.

```bash
gh api repos/Pranjal250605/new-jwd-office-/deployments \
  --jq '.[0:3] | .[] | "\(.created_at)  \(.sha[0:7])  \(.environment)"'
gh api repos/Pranjal250605/new-jwd-office-/deployments/<id>/statuses --jq '.[0].state'
```

Wait for `success` on the environment named **`Production – new-jwd-office`**,
then confirm the live bundle hash matches your local `dist/`. Two Vercel
projects build from this one repo (`new-jwd-office` and `new-jwd-office-lv6k`),
so a push races both; on a Hobby plan one can fail. An empty commit
re-triggers a failed build.

## How work arrives

The client sends **`Revision Points_<date>.pdf`** to `~/Downloads`, usually
with screenshots and Japanese copy, sometimes with images referenced only by
timestamp. Each sheet is split by site: pages marked `<Japan Worldlink DWC
LLC>` are this site, pages marked `<Investment>` belong to a separate JWD
Investment site that a different Claude session handles. **Read the whole PDF
and do only the pages for your site.**

### Never eye-transcribe the Japanese

The PDFs have a real text layer. Use it:

```bash
pdftotext -layout "~/Downloads/Revision Points_08.16.pdf" out.txt
```

Reading Japanese off a screenshot has produced real errors — a `ー` (U+30FC
prolonged sound mark) where the source had `―` (U+2015 em dash) went live
before a diff caught it. When a `.docx` is supplied it is authoritative over
the PDF; unzip it and read `word/document.xml`, stripping `<w:pPr>` and
`<w:rPr>` first or the tags leak into the text.

**Then diff what you wrote against the source, sentence by sentence.** That
check is what catches the errors.

Watch for sheets that reprint unchanged sections — normalise whitespace before
concluding something changed. In the 08.16 sheet four of eight answers looked
edited but differed only in the PDF's line wrapping.

## The site

Single page, bilingual JA/EN via `src/i18n.jsx` (`t('English', '日本語')`).
Section order lives in `src/App.jsx`:

```
Hero · VideoPromo · Concerns · QuickTiles · Simulator · StatBand · Question
President · License · NextGeneration · Ecosystem · EcosystemFlower
GenerationalWealth · WhoWeServe · Services · Journey · Strategies · Compare
Cases · HeartOfEurope · Insights · Jewelry · ContactForm
```

| File | Holds |
|---|---|
| `src/components/Chrome.jsx` | utility bar, header/nav, contact form, footer |
| `src/components/Hero.jsx` | hero, **Concerns tiles + answer panel**, stat band |
| `src/components/Sections.jsx` | President, License, NextGeneration, services |
| `src/components/Proof.jsx` | Ecosystem, group flower, Insights, **Jewelry** |
| `src/concernAnswers.js` | the eight authored tile answers |
| `src/components/advisor/` | AI advisor chat (Groq via `api/advisor.js`) |
| `src/styles.css` | everything; plain CSS, custom properties in `:root` |

### Concern tiles

The eight 貴方のお悩みは何ですか？ tiles serve **answers the business wrote**,
verbatim, from `concernAnswers.js` — no model call. This is deliberate: they
are tax and interest-rate figures that must be the approved ones. Clicking a
tile opens its own panel (`.cmodal`) showing that one answer, scrolled to the
top. `**text**` in an answer marks a section title and renders bold.

Tile 05 repeats tile 01's inheritance table under a property-sale question.
This looks wrong but is **intentional** — the 08.16 sheet says "Same revision
as the page ①". Leave it.

### Palette

The site was converted from graphite to off-white in August. Token names still
say `--navy` but hold neutral greys; `--tint`/`--tint-2` are the off-whites,
`--gold` (#b8912f) and `--gold-bright` (#d4af37) the accent.

**Check contrast when touching colour.** The CTA band was converted to
off-white but its form kept white-on-dark styling, leaving every field
invisible for twelve days on the site's only conversion point. White on
`--gold` is 2.96:1 — under the minimum; dark on `--gold-bright` is 8.5:1.
Colour is the one thing that cannot be verified from the terminal, so ask for
a screenshot when it matters.

## House style

- **Reproduce client copy verbatim and flag anything that looks wrong** rather
  than silently correcting it. Obvious duplication artifacts are the exception;
  say so in the commit message.
- English is usually **ours** — the sheets supply Japanese only. Treat any
  English you write as a draft needing approval, and say so.
- Build (`npx vite build`) and grep the bundle for the new strings before
  pushing. `npm install` first in a fresh clone.

## Open, needing the client

- **Showroom branding** — the Jewelry section is headed "JWD Jewelry" per the
  client, but the signage in the photos reads **AL MUMAYYAZ JEWELLERS**.
- **`public/img/jewelry-hall-3.jpg` is 714×402** beside 2364×1773 neighbours,
  so it renders soft. A full-size copy was requested.
- **Jewelry video** — the 08.14 sheet asks for one; never supplied.
- **Card payments** — asked about, scoped, not built. Stripe would be ~2.9% +
  AED 1 and 7–10 days for a deposit flow. Advice given: cards for deposits,
  bank transfer for large sales; confirm Stripe will even accept the category
  before building.

## Other projects here (not the live Family Office site)

| Folder | What |
|---|---|
| `jwd-family-office-react/` | **stale copy of the live app — see the trap above** |
| `jwd-web/` | Next.js site, separate; has its own `CLAUDE.md`/`AGENTS.md` |
| `jwd-family-office/` | old static HTML version |
| `foj-app/` | separate Vite app |
| `assets/`, `jwd-images/` | loose image sets |

A `Pranjal250605/jwd-insurance` repo exists on GitHub but has not been touched
in these sessions, and no revision sheet so far has contained any insurance
content.
