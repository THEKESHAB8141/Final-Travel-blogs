# Northeast Explorer — Full Website (Static)

This package contains a full static single-page website for a boutique travel company focusing on Northeast India.

## What's included
- `index.html`
- `css/styles.css`
- `js/script.js`
- `assets/images/` — placeholder images (SVG)
- `.github/workflows/deploy-netlify.yml` — GitHub Actions workflow to deploy to Netlify
- `netlify.toml` — Netlify config
- `README.md`

## How to use
1. Unzip and open `index.html` or run a local server:
   ```bash
   python -m http.server 8000
   # open http://localhost:8000
   ```

2. Replace placeholder images in `assets/images/` with your photos (recommended sizes: 1200–1600px wide; optimized JPGs).

3. To publish:
   - Option A: Netlify — create a site and drag-drop folder, or use Netlify CLI.
   - Option B: GitHub Pages — push to a repository and enable Pages.

## Deployment with Netlify CLI
```bash
npm i -g netlify-cli
netlify deploy --dir=. --auth $NETLIFY_AUTH_TOKEN
# copy draft URL, then:
netlify deploy --dir=. --prod --auth $NETLIFY_AUTH_TOKEN --site $NETLIFY_SITE_ID
```

## GitHub Actions (Netlify) setup
Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` to your repository secrets to enable automatic deploys by the included workflow.

