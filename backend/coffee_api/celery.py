import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 
    'coffee_api.settings'
)

app = Celery('coffee_api')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

# Add periodic task schedule
app.conf.beat_schedule = {
    "cleanup-expired-carts-every-day": {
        "task": "api.tasks.cleanup_expired_carts",
        # Runs once per day at midnight
        "schedule": crontab(hour=0, minute=0),
        # "args": (),
    },
}