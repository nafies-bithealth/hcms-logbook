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

## Port Configuration

- The application port reads from `.env` variable `PORT` with a default of `8083`.
- Valid range: numeric value between `1024` and `65535`. Invalid values fall back to `8083`.
- Usage:
  - Local dev server (Vite): uses `PORT` for both `server.port` and `preview.port`.
  - Docker Compose:
    - Dev profile: maps `${PORT:-8083}:${PORT:-8083}` and passes `PORT` into the container.
    - Prod profile: maps `${PORT:-8083}:${PORT:-8083}` and passes `PORT` into the container; Nginx listens on the validated `PORT` via runtime templating.
- The validated port is also exposed to the client at `window.__APP_CONFIG__.APP_PORT`.

### Examples

- `.env` contents:
  - `PORT=8085`
  - `PUBLIC_API_BASE_URL=https://api.example.com`
  - `APP_ENV=production`

- Commands:
  - `docker compose --profile dev up`
  - `docker compose --profile prod up -d`

## Dockerfile Notes

- The image sets a default `EXPOSE 8083` for documentation purposes; the actual port used at runtime is derived from `.env` `PORT` and injected into Nginx via `/etc/nginx/nginx.conf.template` in the entrypoint.
- Healthcheck targets `http://localhost:$PORT/` so it adheres to the configured port.

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
  