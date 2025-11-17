#!/bin/sh
set -e
DEFAULT_PORT=8083
RAW_PORT="${PORT:-$DEFAULT_PORT}"
if echo "$RAW_PORT" | grep -Eq '^[0-9]+$' && [ "$RAW_PORT" -ge 1024 ] && [ "$RAW_PORT" -le 65535 ]; then
  APP_PORT="$RAW_PORT"
else
  echo "Invalid PORT: $RAW_PORT. Falling back to $DEFAULT_PORT" >&2
  APP_PORT="$DEFAULT_PORT"
fi
export APP_PORT
if [ -f /usr/share/nginx/html/config.template.js ]; then
  envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
fi
if [ -f /etc/nginx/nginx.conf.template ]; then
  envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
fi
exec "$@"