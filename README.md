# Final Travel Blogs — Netlify-ready

This project was prepared for easy deployment to Netlify.

## What I changed / added
- Added `booking.html` (Netlify Forms enabled).
- Added a "Book Now" button on `index.html`.
- Created/updated `thank-you.html` for post-submit feedback.
- Added `netlify.toml` and `_redirects` for Netlify hosting.

## How to deploy to Netlify

**Option A — GitHub repo (recommended)**
1. Create a new GitHub repository and push the project files.
2. On Netlify, click "Add new site" → "Import from Git" and connect your GitHub repo.
3. Set build command: *leave empty* (site is static). Set publish directory to `/` (root).
4. Deploy — Netlify will publish the site and handle Netlify Forms automatically.

**Option B — Drag & drop**
1. Zip the project (or use the ZIP provided with this message).
2. On Netlify, go to Sites → New site from Git → "Deploy manually (drag & drop)" and upload the ZIP.
3. Netlify will publish the static site.

## Netlify Forms
The booking form is configured like this:

```html
<form name="booking" method="POST" data-netlify="true" action="/thank-you.html">
  <input type="hidden" name="form-name" value="booking">
  <!-- your fields -->
</form>
```

After the first successful submission, the form will appear in the Netlify site dashboard under **Forms**.

## Next steps I can help with
- Connect to Google Sheets (via Zapier/Netlify Functions) to collect entries.
- Add validation or reCAPTCHA for the form.
- Create an automated deploy workflow that triggers on pushes.


## Netlify Functions (server-side processing)

A serverless function `booking-handler` was added at `netlify/functions/booking-handler.js`.

What it does:
- Accepts POST requests (form-encoded or JSON) and returns `{ ok: true }`.
- If you set the environment variable `WEBHOOK_URL` in Netlify site settings, the function will forward the booking payload to that webhook as JSON.

How submissions are handled on the client:
- The booking form now sends the submission to the function and also programmatically submits an invisible Netlify form so submissions appear in Netlify's Forms dashboard.

Deploy notes:
1. Push the repository to GitHub and connect to Netlify, or use drag & drop.
2. In Netlify site settings, set `WEBHOOK_URL` (optional) if you want bookings forwarded to a webhook (e.g., Zapier/Make/custom endpoint).
3. After deployment, test the booking form at `/booking.html`. You should see function logs in Netlify's Functions tab and form entries in Forms tab.
