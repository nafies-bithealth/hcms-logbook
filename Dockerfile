# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=lts-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT=8083
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER node
EXPOSE 8083
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 CMD wget -q --spider http://localhost:${PORT}/ || exit 1
CMD ["node", "server.js"]