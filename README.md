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
| `appsscript.json` | Manifest (web app, V8, IST) |
| `sample/holdings.csv` | Example Zerodha export |
| `demo/standalone.html` | Local preview without Apps Script |
| `.clasp.json.example` | Optional [clasp](https://github.com/google/clasp) config |

## Deploy with the Apps Script editor

1. Open [script.google.com](https://script.google.com) → **New project**
2. Rename the project (e.g. `Holdings Pulse`)
3. Replace `Code.gs` contents with this repo’s `Code.gs`
4. Create HTML files named exactly: `Index`, `Stylesheet`, `ClientJS` and paste the matching repo files
5. Project Settings → check **Show "appsscript.json" manifest** → paste `appsscript.json`
6. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (or your account only)
7. Open the web app URL → upload `holdings.csv` (or use **Load sample data**)

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
