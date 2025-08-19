#!/bin/sh
set -e

# Make migrations
uv run python manage.py makemigrations

# Run migrations
uv run python manage.py migrate

# (Optional) collect static files
uv run python manage.py collectstatic --noinput

# Check if the command starts with celery and prefix with uv run
if echo "$1" | grep -q "^celery"; then
    exec uv run "$@"
else
    # Start the server
    exec "$@"
fi