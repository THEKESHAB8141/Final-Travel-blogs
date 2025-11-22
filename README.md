Northeast Explorer — Ready-to-deploy static site (approximation)

Contents:
- index.html
- css/style.css
- js/main.js
- assets/*.jpg (placeholder images)
- netlify.toml
- netlify/functions/submit.js

How to deploy to Netlify (quick):
1. Create a new GitHub repository and push these files (or drag & drop the zip into Netlify).
2. In Netlify, choose "New site from Git" and connect your GitHub repo.
3. Ensure "Build command" is empty (or leave as default) and "Publish directory" is '/' for plain static.
   - If using the included netlify.toml, Netlify will detect functions at netlify/functions.
4. Netlify Forms:
   - The form in index.html uses native Netlify Forms (data-netlify="true") and also posts to a Netlify Function at /.netlify/functions/submit.
   - After deploying, test the form and check Site settings > Forms in Netlify admin to see submissions.
5. If you want to connect this to your GitHub repo:
   - Repo name (example): Final-Travel-blogs
   - In Netlify, authorize GitHub and select that repo.
6. To use the serverless function locally: use Netlify CLI (`netlify dev`) which serves functions from netlify/functions.

Notes:
- Placeholder images are included in the assets folder; replace them with your own images (hero.jpg, placeholder1.jpg, etc.)
- This is an approximation of the provided site design. Tweak CSS and content to suit exact visuals.
