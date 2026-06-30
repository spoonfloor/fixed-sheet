# Agent guide: plugging relationships into fixed-sheet

This document is for the **relationships agent** integrating the game into the fixed-sheet shell.

**Rule:** Edit **fixed-sheet** only. Do not modify the relationships repo unless the user explicitly asks.

## Your job

Replace placeholder slot content with the relationships game:

| Slot | File to edit | Source in relationships repo |
|------|--------------|------------------------------|
| Scroll content | `partials/scroll-content.html` | Inner HTML of `<main class="app">` in `public/index.html` |
| Fixed footer | `partials/fixed-footer.html` | Inner HTML of `<footer class="bottom-sheet">` in `public/index.html` |

Also copy over game styles, scripts, puzzles, and assets as needed (see below).

## Slot rules

### Scroll content (`partials/scroll-content.html`)

- Provide **inner HTML only** — no `<main>` wrapper (the shell provides `#scroll-content`).
- Must include at minimum: `#vignette`, `#board`
- Debug UI markup can be included; hide it with `.debug-ui { display: none }` in content CSS if desired

### Fixed footer (`partials/fixed-footer.html`)

- Provide **inner HTML only** — no `<footer>` wrapper (the shell provides `#fixed-footer`).
- Preserve the `.cta-stack` structure from relationships
- **Required button IDs** (game JS depends on these):
  - `submitBtn`
  - `shuffleBtn`
  - `clearBtn`

Example footer shape (from relationships):

```html
<div class="cta-stack">
  <button id="submitBtn" class="btn btn-primary btn-block" type="button">Submit</button>
  <div class="cta-row">
    <button id="shuffleBtn" class="btn btn-block-half" type="button">Shuffle</button>
    <button id="clearBtn" class="btn btn-secondary btn-block-half" type="button">Clear</button>
  </div>
</div>
```

If you add `.cta-row` / `.btn-block-half`, add matching rules to `styles/content.css` (relationships has these in its `styles.css`).

## Files you will also need to copy from relationships

| From relationships | To fixed-sheet |
|--------------------|----------------|
| `public/src/*.js` | `src/` (adjust import paths if needed) |
| `public/puzzles/` | `puzzles/` |
| `public/witty_responses.json` | `witty_responses.json` |
| Game styles from `public/styles.css` | Merge into `styles/content.css` |
| Font link in `index.html` | Add to fixed-sheet `index.html` `<head>` |
| `public/icons/` | `icons/` (if replacing) |

## Wire up game bootstrap

After slots are replaced with game markup:

1. Add a game entry script, e.g. `src/main.js` (copy from relationships).
2. Export `bootstrap()` from `main.js` instead of self-executing.
3. Update `src/shell/bootstrap.js` to call game bootstrap after mounting slots:

```js
await mountSlots([...]);
watchFixedFooter();
const { bootstrap } = await import("../main.js");
await bootstrap();
syncFooterReserve(); // re-measure after game renders
```

4. Remove placeholder-only styles from `content.css` if no longer needed.

## Do not modify (unless fixing shell bugs)

These are owned by the shell:

- `index.html` shell structure (`#app-shell`, `#scroll-content`, `#fixed-footer`)
- `styles/shell.css`
- `src/shell/mountSlots.js`
- `src/shell/sheetLayout.js`

## DOM contract

See relationships `public/src/dom.js` for the full list of element IDs the game expects. Any ID referenced there must exist in your slot partials after integration.

## Styling

| Concern | File |
|---------|------|
| Footer position, safe areas, scroll padding | `styles/shell.css` — do not edit |
| Board, tiles, buttons, modals, vignette | `styles/content.css` — extend/replace |

Link order in `index.html`: `shell.css` first, then `content.css`.

## Run and test

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

### Checklist after integration

1. No console errors on load
2. Vignette and 4×4 word grid render
3. Submit, Shuffle, Clear work
4. Main content scrolls; footer stays fixed
5. Last board row is not hidden under footer
6. Test on phone / home-screen shortcut

## Reference

Relationships repo (read-only reference): `/Users/erichenry/Desktop/relationships`

Key source files:

- `public/index.html` — markup to extract into partials
- `public/styles.css` — game styles to merge into `content.css`
- `public/src/main.js` — game bootstrap and event wiring
