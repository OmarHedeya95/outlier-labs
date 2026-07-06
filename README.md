# Outlier Labs

React + Vite frontend with a [Convex](https://convex.dev) backend for newsletter subscriptions.

## Convex project

**Project:** [OutlierLabs](https://dashboard.convex.dev/t/omar-y-hedeya/outlierlabs) (`omar-y-hedeya:outlierlabs`)

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in URLs from dashboard or `npm run dev` output
npm run dev                  # Convex backend + Vite at http://localhost:5173
```

Add `VITE_CONVEX_URL` to `.env.local` (same value as `CONVEX_URL`):

```bash
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

## Project structure

```
index.html              # Vite entry
src/
  main.tsx              # ConvexProvider + React root
  App.tsx               # Page layout
  index.css             # Site styles
  components/           # UI sections + subscribe modal
  hooks/                # Intro animation, typewriter, tilt, cursor glow
convex/
  schema.ts             # subscribers table
  subscribers.ts        # subscribe mutation
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Convex dev + Vite frontend |
| `npm run build` | Production frontend build |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy Convex backend to production |
| `npm run typecheck` | Type-check frontend + Convex |

## TODO

- [ ] **Socials** — add handles to the LinkedIn, X, and Instagram icon links in the footer

## Deploy

**Frontend** — build with `npm run build`, deploy `dist/` to Vercel/Netlify. Set `VITE_CONVEX_URL` to your production Convex URL.

**Backend** — `npm run deploy` (production Convex deployment only).
