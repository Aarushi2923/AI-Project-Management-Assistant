# AI Project Management Assistant (React)

A complete, deploy-ready React (Vite) app with:

- Fancy animated UI (gradient + glassmorphism)
- **Bold, clearly separated** headings & subheadings for every PM phase
- **Actionable, precise bullets** to aid decision-making
- **Gantt-style visualization** (Recharts)
- **One-click PDF export** (includes chart) via html2canvas + jsPDF

## Run locally

```bash
cd ai-pm-assistant-react
npm install
npm run dev
```

Open http://localhost:5173

## Build & Deploy to GitHub Pages

1. Push the project to a repo, e.g. `AI-Project-Management-Assistant`.
2. Edit `vite.config.js` and set:

```js
export default defineConfig({ plugins:[react()], base: '/AI-Project-Management-Assistant/' })
```

(Use your repo name. If deploying to `username.github.io`, leave `base: ''`.)
3. Build:

```bash
npm run build
```

4. Deploy the `dist/` folder to Pages (e.g., `gh-pages` branch or a GitHub Action).

## Notes

- The PDF export captures the entire plan including the Recharts Gantt chart.
- Click **Load Example** to pre-fill a sample Healthcare project.