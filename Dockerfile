# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=lts-alpine
ARG NGINX_VERSION=alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:${NGINX_VERSION} AS runtime
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build ./
COPY nginx.conf /etc/nginx/nginx.conf
COPY public/config.template.js /usr/share/nginx/html/config.template.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
  && addgroup -S app \
  && adduser -S app -G app \
  && chown app:app /entrypoint.sh \
  && mkdir -p /run \
  && chown -R app:app /usr/share/nginx /var/cache/nginx /var/run /run
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD wget -q --spider http://localhost:8080/ || exit 1
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]