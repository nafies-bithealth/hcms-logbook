#!/bin/sh
set -e
if [ -f /usr/share/nginx/html/config.template.js ]; then
  envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
fi
exec "$@"