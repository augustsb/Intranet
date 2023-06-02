#!/usr/bin/env sh
set -eu

envsubst '${PORT} ${API_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"