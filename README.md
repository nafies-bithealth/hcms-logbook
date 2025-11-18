# HCMS Logbook App

This project has been upgraded to Next.js and React latest stable versions to improve performance, SSR support and developer experience.

## Prerequisites
- Node.js LTS (≥ 18)
- Docker ≥ 24.x and Docker Compose v2

## Development
- Install deps: `npm i`
- Start dev server with HMR: `npm run dev` (or `docker compose --profile dev up`)

## Build & Run
- Build: `npm run build`
- Start: `npm run start` (uses Next standalone server)

## Docker
- Build: `docker build -t hcms-logbook:prod .`
- Production run: `docker compose --profile prod up -d`
- Test run: `docker compose --profile test up`

## Environment Configuration
- Client-side env vars should be prefixed with `NEXT_PUBLIC_*`:
  - `NEXT_PUBLIC_APP_ENV`
  - `NEXT_PUBLIC_PUBLIC_API_BASE_URL`
- The application reads `PORT` (default `8083`) for container port mapping.

## Testing
- Install browsers: `npx playwright install --with-deps`
- E2E/Accessibility: `npm run test:e2e`
- Lighthouse: `npm run build && npm run test:lighthouse`

## Migration Notes
- Framework moved from Vite to Next.js (pages router)
- Dockerfile now uses Next standalone multi-stage; nginx removed
- Upgraded to Next.js 16 and React 19; `react-day-picker` updated to v9
- Vite files and scripts removed; use `dev`, `build`, `start`
- Routing and URLs preserved; SSR added via `getServerSideProps` where needed

## Notes
- No CSS changes were made
- Business logic and UI components preserved
  