#!/bin/sh
set -e

# Run migrations
uv run python manage.py migrate

# (Optional) collect static files
uv run python manage.py collectstatic --noinput

# Start the server
exec "$@"