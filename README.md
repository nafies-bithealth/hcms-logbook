# HCMS Logbook App

  This is a code bundle for HCMS Logbook App. The original project is available at https://www.figma.com/design/yXZaL8AV71CTVogr2OvjQH/Nurse-Logbook-Mobile-App.

## Prerequisites

- Docker ≥ 24.x and Docker Compose v2
- Node.js LTS for local development

## Development

- Install deps: `npm i`
- Start dev server with HMR: `npm run dev` (or `docker compose --profile dev up`)

## Build & Run with Docker

- Build: `docker build -t hcms-logbook:prod .`
- Production run: `docker compose --profile prod up -d`
- Test run: `docker compose --profile test up`

## Runtime Configuration

- Build-time variables: `VITE_*` environment variables used by Vite.
- Runtime config: set `PUBLIC_API_BASE_URL` and `APP_ENV` to generate `/config.js` via entrypoint.
- Example: `PUBLIC_API_BASE_URL=https://api.example.com APP_ENV=production`

## docker-compose Profiles

- `dev`: live reload on port `3000`, mock API available.
- `test`: runs Playwright tests with Axe.
- `prod`: builds optimized image served by Nginx on port `8080`.

## .env Structure

- Create `.env` for compose if needed:
  - `PUBLIC_API_BASE_URL=...`
  - `APP_ENV=development|testing|production`

## Operational Procedures

- Logs: `docker logs -f <service>` (Nginx logs to stdout/stderr).
- Health: container exposes a `HEALTHCHECK` on `/`.
- Monitoring: integrate Traefik/Caddy if using reverse proxy; export metrics per proxy docs.
- Backup: front-end is stateless; persist any mock fixtures via volumes if required.

## Testing & Quality Gates

- E2E/Accessibility: `npm run test:e2e` (Playwright + Axe). Starts dev server automatically.
- Performance: `npm run build && npm run test:lighthouse` (Lighthouse CI, asserts scores ≥ 90).

## Troubleshooting

- Port conflicts: adjust `vite.config.ts` `server.port` or compose port mappings.
- Permissions: runtime uses a non-root user; ensure bind mounts are readable.
- Build caching: Docker uses layer caching; clear with `--no-cache` if necessary.
- Performance tuning: enable gzip/brotli in Nginx, tweak Vite code splitting.
  