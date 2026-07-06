# Outlier Labs

Static marketing site (`index.html`) with a [Convex](https://convex.dev) backend for newsletter subscriptions.

## Convex project

**Project:** [OutlierLabs](https://dashboard.convex.dev/t/omar-y-hedeya/outlierlabs) (`omar-y-hedeya:outlierlabs`)

Already linked to your Convex account. Run `npm run dev` to push function changes to the cloud dev deployment.

```bash
cp config.example.js config.js   # then set convexSiteUrl from CONVEX_SITE_URL in .env.local
```

## Quick start

```bash
npm install
npm run dev          # starts Convex dev deployment (keep running)
```

On first run, log in and create/link a Convex project when prompted.

Then configure the frontend:

```bash
cp config.example.js config.js
```

Edit `config.js` and set `convexSiteUrl` to your deployment's site URL (shown in the `convex dev` output), e.g. `https://happy-animal-123.convex.site`.

Open `index.html` in a browser (or use any static file server). The subscribe form POSTs to `{convexSiteUrl}/subscribe`.

## Project structure

```
index.html          # Static site (no build step)
config.example.js   # Frontend config template → copy to config.js
convex/
  schema.ts         # subscribers table
  subscribers.ts    # subscribe mutation
  http.ts           # POST /subscribe HTTP route (CORS-enabled)
```

## Convex backend

| Endpoint | Method | Body | Description |
|----------|--------|------|-------------|
| `/subscribe` | POST | `{ name, email }` | Add a newsletter subscriber (dedupes by email) |

Subscribers are stored in the `subscribers` table with `name`, `email`, and `createdAt`.

View data in the [Convex dashboard](https://dashboard.convex.dev).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Develop against Convex (`npx convex dev`) |
| `npm run deploy` | Deploy backend to production |
| `npm run typecheck` | Type-check Convex functions |

## TODO

- [ ] **Socials** — add handles to the LinkedIn, X, and Instagram icon links in the footer

## Deploy

**Frontend** — any static host (GitHub Pages, Netlify, Vercel). Include `config.js` with your production `convexSiteUrl`.

**Backend** — `npm run deploy` (production Convex deployment only).

## Environment

Copy `.env.example` to `.env.local` for Convex CLI tooling. The static site uses `config.js`, not `.env` files.
