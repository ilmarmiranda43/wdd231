# MoveWell Site Plan

## Site Name

**MoveWell — Personal Fitness Tracker**

## Purpose

MoveWell is a dynamic website that helps users stay consistent with fitness goals by logging workouts, exploring exercise routines, and monitoring performance over time. It is a practical front-end application that demonstrates data handling, local persistence, accessibility, responsive design, and interactive user experience.

## Audience and Scenarios

The primary audience is adults who want a lightweight, private way to follow everyday fitness activity without creating an account.

- What beginner-friendly workout can I complete with the time and equipment I have?
- How many active minutes have I completed during the last seven days?
- Can I save a routine and return to it later?
- How do I record a completed workout and see it included in my progress?

## Color Schema

- Deep green `#0e4931`: headings, calls to action, active navigation, and emphasis
- Charcoal `#17231c`: primary text, dark panels, and footer
- Soft mint `#dff4e8`: selected states, chips, and supporting surfaces
- Warm coral `#e86a45`: focus indicators and activity-chart bars
- Off-white `#f1f8f4`: section and control backgrounds

All foreground/background combinations are designed to meet WCAG AA contrast for normal text.

## Typography

The site uses an accessible system sans-serif stack. Large, tightly spaced headings create a confident fitness identity, while regular body copy preserves readability and performance without third-party font requests.

## Pages

- `index.html`: dashboard, weekly chart, metrics, goals, and calls to action
- `routines.html`: JSON-powered exercise catalog, favorites, filters, view controls, and modal
- `log.html`: workout form saved to local storage
- `thankyou.html`: submitted workout values displayed through URL parameters

## Data and Interactions

- 15 exercise routines stored in `data/routines.json`
- Asynchronous Fetch API request with `try...catch`
- Workout entries, favorites, view choice, and visit count stored in `localStorage`
- DOM-created cards and dashboard chart using array methods and template literals
- Native `<dialog>` for exercise details
- GET form and `URLSearchParams` confirmation page

## Responsive Layout

Mobile layouts use a hamburger menu and single-column content where space requires it. Larger views use Flexbox navigation, multi-column CSS Grid dashboards, catalogs, and form layouts. Every page provides current-page wayfinding and avoids horizontal scrolling.
