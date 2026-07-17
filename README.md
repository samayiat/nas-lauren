# Spot Kick — Three Worlds

A single-file penalty-kick browser game.

## Play

The game is a self-contained HTML file. Open `index.html` in any modern browser,
or play the hosted version on GitHub Pages once it's deployed.

## Deploying to GitHub Pages

This repo deploys automatically via GitHub Actions (`.github/workflows/deploy-pages.yml`).

One-time setup in the repository settings:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.

After that, every push to `main` builds and publishes the site. `index.html`
(a copy of `penalty.html`) is served at the site root, so the game loads at the
Pages URL directly. You can also trigger a deploy manually from the
**Actions** tab (**Deploy to GitHub Pages → Run workflow**).
