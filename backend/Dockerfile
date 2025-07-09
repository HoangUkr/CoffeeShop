FROM python:3.11-slim-bookworm

# Install uv (Python package manager from Astral)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_VENV=disabled

# Install dependencies
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --no-install-project --frozen

# Copy Django project files after dependencies
COPY . .
RUN rm -rf /app/.venv

# Run migrations and collectstatic if needed
EXPOSE 8000
CMD ["uv", "run", "gunicorn", "coffee_api.wsgi:application", "--bind", "0.0.0.0:8000"]
