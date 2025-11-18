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
if [ -f /app/public/config.template.js ]; then
  envsubst < /app/public/config.template.js > /app/public/config.js
fi
exec "$@"