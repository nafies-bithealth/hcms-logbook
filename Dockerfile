# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=lts-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
COPY --from=builder /app .
COPY public/config.template.js /app/public/config.template.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
  && addgroup -S app \
  && adduser -S app -G app \
  && chown app:app /entrypoint.sh \
  && chown app:app /app/public/config.template.js
USER app
ENV PORT=8083
EXPOSE 8083
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 CMD wget -q --spider http://localhost:${PORT}/ || exit 1
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]