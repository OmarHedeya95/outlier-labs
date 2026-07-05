# Outlier Labs

Single-file site: `index.html`. No build tools needed — open directly in a browser or deploy to any static host.

## TODO

- [ ] **Database** — wire up the subscribe form to a backend (see below)
- [ ] **Socials** — add handles to the LinkedIn, X, and Instagram icon links in the footer

---

## Connect database backend

The subscribe form POSTs `{ name, email }` to `/api/subscribe` (stubbed in `index.html` — search for `TODO: replace with your backend endpoint`).

To wire it up:
1. Create a backend endpoint (e.g. Supabase, PlanetScale, or any REST API) that accepts `POST /api/subscribe` with a `{ name, email }` JSON body and writes to your database.
2. Uncomment the `fetch` block in the `form submit` handler and replace `/api/subscribe` with your actual endpoint URL.
3. Add any auth headers your backend requires.

---

## Add social links

In `index.html`, find the three `<a href="#">` links in the footer and replace `#` with your actual profile URLs:

```html
<!-- LinkedIn -->
<a href="https://linkedin.com/company/YOUR-HANDLE" ...>

<!-- X -->
<a href="https://x.com/YOUR-HANDLE" ...>

<!-- Instagram -->
<a href="https://instagram.com/YOUR-HANDLE" ...>
```

---

## Deploy

**GitHub Pages** — go to Settings → Pages, set source to `main` / `root`.

**Netlify Drop** — drag the folder into [app.netlify.com/drop](https://app.netlify.com/drop).

**Vercel** — `npx vercel` in this directory, or import at [vercel.com/new](https://vercel.com/new).
