# Fixed Sheet

A static app shell with two swappable regions:

1. **Scroll content** — the main page (grows with content, page scrolls)
2. **Fixed footer** — a button stack pinned to the bottom of the viewport

This repo is the **layout shell**. The [relationships](https://github.com/spoonfloor/relationships) game content gets plugged in later by the relationships agent. See [AGENTS.md](./AGENTS.md) for integration instructions.

## What you'll see today

Placeholder content only:

- A long column of paragraphs you can scroll through
- Three full-width buttons fixed at the bottom (Primary / Secondary / Tertiary)

The footer stays put while you scroll. The last paragraph should remain visible above the buttons, not hidden underneath them.

## Run locally

Slot content is loaded with `fetch()`, so you need a static server — opening `index.html` directly from the filesystem will not work.

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

```
fixed-sheet/
├── index.html              # Shell wrappers only — do not put page content here
├── partials/
│   ├── scroll-content.html # ← scroll slot (replace this)
│   └── fixed-footer.html   # ← footer slot (replace this)
├── styles/
│   ├── shell.css           # Layout: scroll + fixed footer (shell agent owns this)
│   └── content.css         # Page/button styles (content agent extends this)
├── src/shell/
│   ├── bootstrap.js        # Loads partials, starts layout watch
│   ├── mountSlots.js       # Fetches partial HTML into slots
│   └── sheetLayout.js      # Measures footer height, reserves scroll padding
├── AGENTS.md               # Integration guide for the relationships agent
└── README.md               # This file
```

## How the shell works

1. `index.html` defines empty `#scroll-content` and `#fixed-footer` wrappers.
2. `bootstrap.js` fetches HTML from `partials/` and injects it into those wrappers.
3. `sheetLayout.js` measures the footer height and sets `--bottom-sheet-reserved` so scroll content clears the footer.
4. The footer uses `position: fixed`; the main area scrolls normally.

## Who edits what

| Role | Repo | Edits |
|------|------|-------|
| Shell agent | **fixed-sheet** (this repo) | `styles/shell.css`, shell JS, slot boundaries |
| Content agent | **relationships** → copies into fixed-sheet | `partials/scroll-content.html`, `partials/fixed-footer.html`, `styles/content.css`, game JS/assets |

## Deploy

This repo deploys to GitHub Pages from `main`. After pushing, add the site to your home screen to test standalone mode with safe-area insets.

## Verification checklist

- [ ] Page scrolls on a narrow viewport
- [ ] Footer stays fixed at the bottom
- [ ] Last scroll paragraph is not covered by footer buttons
- [ ] Buttons are tappable (not blocked by an overlay)
- [ ] Works from a home-screen shortcut (standalone mode)
