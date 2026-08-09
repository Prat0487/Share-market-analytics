# Holdings Pulse — Zerodha Analytics (Google Apps Script)

Web app that reads a Zerodha **holdings.csv** export and builds a portfolio analytics dashboard with prioritized, actionable insights.

## What you get

- **Upload / drag-drop** Zerodha `holdings.csv` (Console → Holdings → Download)
- **KPIs**: invested, current value, unrealized P&L, estimated day P&L, win rate, health score
- **Actionable insights**: over-diversification, tax-loss harvest candidates, dead-weight small positions, top drags, concentration / thin-spread capital, drawdown recovery cues
- **Charts**: P&L split, allocation, day movers, position-size buckets
- **Holdings table**: search, filter, sortable columns
- **Privacy**: CSV is parsed entirely in the browser; Apps Script only serves the UI (optional lightweight upload log)

## Project files

| File | Role |
|------|------|
| `Code.gs` | `doGet()` web app entry + `include()` helper |
| `Index.html` | Dashboard shell |
| `Stylesheet.html` | Styles (Apps Script partial) |
| `ClientJS.html` | CSV parse, analytics, charts, insights |
| `appsscript.json` | Optional manifest (for clasp / advanced); editor deploy can skip it |
| `sample/holdings.csv` | Example Zerodha export |
| `docs/` | GitHub Pages site (short URL) |
| `demo/standalone.html` | Local preview without Apps Script |
| `.clasp.json.example` | Optional [clasp](https://github.com/google/clasp) config |

## Short URL (recommended)

Apps Script cannot customize `/macros/s/…/exec` URLs. Use **GitHub Pages** for a short link that serves the same dashboard:

1. On GitHub: **Settings → Pages**
2. **Source**: Deploy from a branch
3. Branch: `main` (or this PR branch after merge) → folder **`/docs`** → Save
4. Open: **https://prat0487.github.io/Share-market-analytics/**

Optional: `https://prat0487.github.io/Share-market-analytics/gas.html` redirects to your Apps Script deployment.

Other options: a free shortener (bit.ly / t.co), or a custom domain CNAME pointed at GitHub Pages.

## Deploy with the Apps Script editor


1. Open [script.google.com](https://script.google.com) → **New project**
2. Rename the project (e.g. `Holdings Pulse`)
3. Replace the default `Code.gs` with this repo’s `Code.gs`
4. Click **+** next to Files → **HTML**, and create three files named exactly:
   - `Index` ← paste `Index.html`
   - `Stylesheet` ← paste `Stylesheet.html`
   - `ClientJS` ← paste `ClientJS.html`  
   (Apps Script drops the `.html` suffix in the file name.)
5. **Optional — timezone only (Project Settings is key/value, not JSON):**
   - Open the gear **Project Settings**
   - Set **Time zone** to `Asia/Kolkata` (or your zone)
   - Do **not** paste `appsscript.json` into Project Settings
6. **Optional — edit the manifest file (not Project Settings):**
   - In **Project Settings**, check **Show "appsscript.json" manifest file in editor**
   - Go back to the **Editor**; `appsscript.json` now appears in the **left file list**
   - Open that file and replace its contents with this repo’s `appsscript.json`
7. **Deploy → New deployment → Select type → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (or **Only myself**)
   - Click **Deploy**, authorize if prompted, copy the **Web app URL**
8. Open the URL → upload `holdings.csv` (or **Load sample data**)

The web app access settings are chosen in the Deploy dialog. You do not need `appsscript.json` for a working dashboard if you set timezone + deploy options in the UI.

## Deploy with clasp (optional)

```bash
npm i -g @google/clasp
clasp login
clasp create --type webapp --title "Holdings Pulse"
# copy scriptId into .clasp.json (see .clasp.json.example)
clasp push
clasp deploy --description "Holdings Pulse dashboard"
```

## Local demo

Open `demo/standalone.html` in a browser (or serve the folder). Same UI; no Google login required.

## Expected CSV columns

Zerodha holdings export headers (flexible matching for minor renames):

`Instrument`, `Qty.`, `Avg. cost`, `LTP`, `Invested`, `Cur. val`, `P&L`, `Net chg.`, `Day chg.`

## Notes

- Insights are heuristics for review, **not investment advice**.
- Day P&L is estimated from each row’s day % and current value.
- Health score blends diversification, drawdown, win rate, concentration, and small/deep-loser counts.
