from django.conf import settings
from django.contrib.sessions.models import Session

# Import models for cleaning up
from api.models import Cart

# Import shared task celery
from celery import shared_task

# Import loguru (already configured to send to Graylog)
from loguru import logger

@shared_task
def cleanup_expired_carts():
    """
    Periodic task to clean up expired carts
    """
    sessions = set(Session.objects.values_list('session_key', flat=True))
    Cart.objects.exclude(session_key__in=sessions).delete()
    logger.info("🧹 Cleaned up expired carts")