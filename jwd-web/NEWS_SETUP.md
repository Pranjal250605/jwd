# Market News — Google Sheet setup (free, no code)

The homepage news rails and the `/news` page read from a **Google Sheet**. The
JWD team edits the sheet; the site refreshes itself automatically (hourly). No
API key, no account beyond Google, no cost. Until a sheet is connected, the site
shows the built-in curated list as a fallback.

## 1. Create the sheet

Create a new Google Sheet. Put these **exact headers in row 1**:

| date | market | tag_en | tag_ja | title_en | title_ja | href |
|------|--------|--------|--------|----------|----------|------|

- **date** — `YYYY.MM.DD` (e.g. `2026.05.20`). Newest sorts to the top.
- **market** — `dubai` or `japan`.
- **tag_en / tag_ja** — short label (e.g. `Market` / `市場動向`).
- **title_en / title_ja** — the headline in each language.
- **href** — where the row links to (e.g. `/why-dubai/golden-visa`, or a full
  `https://…` URL).

Add one row per news item. (Japanese columns can be left blank — English will be
used as a fallback, and vice-versa.)

## 2. Publish it as CSV

In the sheet: **File → Share → Publish to web** →
- choose the news tab,
- format **Comma-separated values (.csv)**,
- click **Publish**, and copy the URL it gives you
  (looks like `https://docs.google.com/spreadsheets/d/e/…/pub?output=csv`).

## 3. Tell the site where it is

Set an environment variable named **`NEWS_SHEET_CSV_URL`** to that URL.

- **Local dev:** add to `jwd-web/.env.local`:
  ```
  NEWS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/…/pub?output=csv
  ```
- **Vercel (production):** Project → Settings → Environment Variables → add
  `NEWS_SHEET_CSV_URL` with the same value → redeploy once.

That's it. Edits to the sheet appear on the site within an hour (the cache
window). To change how often it refreshes, edit `REVALIDATE` in
`src/lib/news.ts`.
