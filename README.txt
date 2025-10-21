# AutoShorts.ai 2.0 — Full MVP Website

This is your ready-to-launch folder for a car video AI editing platform MVP.

## Folders / Files
- `index.html` — Landing page with features, pricing, and AI demo.
- `checkout.html` — Stripe integration placeholder.
- `script.js` — Local AI caption generator demo (replace with API later).
- `styles.css` — Design and layout.
- `README.txt` — Setup instructions.

---

## How to Deploy Free (GitHub Pages)
1. Create a new GitHub repo (name it `autoshortsai-2.0`).
2. Upload these 4 files into the root of the repo.
3. Go to **Settings → Pages → Source → Deploy from main branch**.
4. Wait ~1 min — your site will go live at `https://yourusername.github.io/autoshortsai-2.0`.

---

## How to Add Stripe Payments
1. Create a free [Stripe account](https://stripe.com).
2. Go to **Products → Create a Product** and set your plans (Starter, Pro, Creator).
3. Generate **Payment Links** under “Payments → Payment Links.”
4. Replace the checkout buttons in `index.html` to point to your payment links.

---

## How to Add OpenAI for Captions
When you're ready to make the caption generator live:
1. Create an OpenAI account and get an API key.
2. Replace the code in `script.js` with a fetch call to your proxy or OpenAI endpoint.
3. Example (serverless endpoint or API route).

---

## Optional Free Hosting
You can also deploy easily on:
- [Vercel](https://vercel.com) — drag & drop these files.
- [Netlify](https://netlify.com) — drag the folder and publish.

---

## Branding Tips
- Replace text “AutoShorts.ai 2.0” with your brand name.
- Add your car edit portfolio / demo reel link in the hero section.
- Start building your email list using the Formspree form action.
