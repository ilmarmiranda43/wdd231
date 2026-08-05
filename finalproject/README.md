# Automation Atlas — WDD 231 Final Project

Automation Atlas is a responsive three-page website built with semantic HTML, modern CSS, and vanilla JavaScript. It uses no third-party templates, frameworks, libraries, or external fonts.

## Run locally

Because the catalog uses `fetch()`, open the project through a web server instead of double-clicking `index.html`.

In VS Code, use Live Server. Alternatively, from the `finalproject` folder run:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500/`.

## Final student steps

1. Copy the entire `finalproject` folder into the root of your `wdd231` repository.
2. Update the `Final` link on your course home page to `finalproject/index.html`.
3. Publish the repository with GitHub Pages.
4. Record the required 3–5 minute video with your face and screen, following `video.html`.
5. Replace every footer link whose `href` is `video.html` with the public video URL.
6. Run the official WDD 231 Week 6 page audit against the full GitHub Pages URL.
7. Run Lighthouse in mobile mode on the three main pages for Accessibility, Best Practices, and SEO.

## Rubric coverage

| Requirement | Implementation |
| --- | --- |
| Three responsive pages | `index.html`, `automations.html`, `contact.html` |
| Metadata | Unique titles, descriptions, authors, Open Graph tags, favicon |
| Responsive menu | Hamburger on small screens; horizontal Flex navigation on larger screens |
| Dynamic data | 15 JSON records, each showing at least six values |
| Asynchronous JavaScript | `fetch`, `await`, response checking, and `try...catch` |
| DOM and events | Cards, filters, menu, favorites, modal, and form counter |
| Array methods | `map`, `filter`, `reduce`, `forEach`, and `find` |
| Template literals | Cards, summaries, URLs, and modal values |
| ES modules | Module scripts and an import from `catalog-utils.js` |
| Local storage | Saved favorites, catalog view, and visit count |
| Modal dialog | Native accessible `<dialog>` with keyboard support |
| Form action | GET form to `thankyou.html`, which displays URL parameters |

The video itself must be recorded by the student because the rubric requires the student's face and screen.
