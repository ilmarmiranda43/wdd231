# MoveWell — WDD 231 Final Project

MoveWell is a responsive personal fitness tracker built with semantic HTML, modern CSS, and vanilla JavaScript. It helps users log workouts, explore exercise routines, and monitor weekly progress. The topic, purpose, and planned functionality follow the submitted **Personal Fitness Tracker Website** project proposal.

## Main pages

- `index.html` — progress dashboard with local workout summaries and a seven-day activity chart
- `routines.html` — 15 dynamically generated exercise routines with search, filters, favorites, grid/list views, and a native dialog
- `log.html` — validated workout form that saves data locally and submits with the GET method
- `thankyou.html` — form-action page that displays submitted values with `URLSearchParams`
- `attributions.html` — content and asset acknowledgements
- `video.html` — checklist and script for the required student video

## Folder structure

```text
finalproject/
├── data/routines.json
├── images/
├── scripts/
├── styles/site.css
├── index.html
├── routines.html
├── log.html
└── thankyou.html
```

## Rubric evidence

| Requirement | Evidence |
| --- | --- |
| Three responsive pages | `index.html`, `routines.html`, `log.html` |
| Responsive navigation | Hamburger menu on small screens, Flexbox navigation on larger screens, current-page wayfinding |
| Advanced layouts | CSS Grid and Flexbox used throughout every main page |
| 15 dynamic items | `data/routines.json` rendered by `scripts/routines.js` |
| 4+ displayed values | Every card shows type, level, duration, focus, equipment, title, and summary |
| Local storage | Saved workouts, favorite routines, catalog view, and visit count |
| Modal dialog | Native `<dialog>` on `routines.html` |
| DOM and array methods | Dynamic cards, filters, dashboard chart, `map`, `filter`, `reduce`, `find`, and `forEach` |
| Template literals | Dynamic cards, chart bars, messages, dialog details, and URLs |
| Async data + error handling | `fetch`, `await`, response validation, and `try...catch` in `routines.js` |
| ES modules | Module scripts and imports from `routine-utils.js` |
| Form action page | GET form on `log.html`; `URLSearchParams` display on `thankyou.html` |

## Run locally

Serve the project through a local web server because the routine library uses `fetch`:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/finalproject/` from the parent folder.

## Final student actions

1. Publish the `finalproject` folder in your WDD 231 GitHub repository.
2. Run HTML/CSS validation, page audits, CSS Overview contrast checks, and mobile Lighthouse tests on the final GitHub Pages URL.
3. Record the required 3–5 minute video showing your face and screen.
4. Replace the footer `video.html` links with the public video URL.
