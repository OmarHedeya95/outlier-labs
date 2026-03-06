# Research Club — Setup

Single-file site: `index.html`. No build tools needed — open directly in a browser or drop the folder into any static host.

---

## 1. Add your Substack URL

In `index.html`, find the comment `TODO: Replace href with your actual Substack subscribe URL` and update the `href`:

```html
<a href="https://YOUR-PUBLICATION.substack.com/subscribe" ...>
```

---

## 2. Add the Luma calendar embed

1. Go to [lu.ma](https://lu.ma) and create a calendar for your events.
2. In your calendar settings, find the **Embed** option and copy the calendar ID (looks like `cal-XXXXXXXXXX`).
3. In `index.html`, delete the `<div class="events-placeholder">...</div>` block.
4. Uncomment the iframe block in the `<!-- TO ADD LUMA CALENDAR -->` comment section and replace `YOUR_CALENDAR_ID`:

```html
<iframe
  src="https://lu.ma/embed/calendar/cal-XXXXXXXXXX/events"
  width="100%"
  height="450"
  frameborder="0"
  style="border: 1px solid var(--border);"
  allowfullscreen
  aria-hidden="false"
  tabindex="0"
></iframe>
```

5. Also update the footer link and the events-placeholder Luma link with your calendar URL:
   `https://lu.ma/YOUR-CALENDAR-SLUG`

---

## 3. Update the manifesto

In `index.html`, find the comment `TODO: Replace placeholder text below with your own copy` and rewrite the five paragraphs inside `.manifesto-body` with your own words.

---

## 4. Deploy

**GitHub Pages** — push to a repo, go to Settings → Pages, set source to `main` / `root`. Done.

**Netlify Drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop), drag the `research_club/` folder in. Live in seconds.

**Vercel** — `npx vercel` in this directory, or import the repo at [vercel.com/new](https://vercel.com/new).

No configuration needed for any of these — it's a single HTML file.
