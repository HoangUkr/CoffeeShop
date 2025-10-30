from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from celery import shared_task

# Import loguru (already configured to send to Graylog)
from loguru import logger

@shared_task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_jitter=True,
    max_retries=5
)
def send_email_confirmation(
    self,
    subject,
    message,
    recipient_list,
    from_email=None,
    fail_silently=False,
    auth_user=None,
    auth_password=None,
    connection=None,
    html_message=None    
):
    """
    Send reservation confirmation email asynchronously
    """
    if from_email is None:
        from_email = settings.EMAIL_HOST_USER
    
    try:
        send_mail(
            subject,
            message,
            from_email,
            recipient_list,
            fail_silently=fail_silently,
            auth_user=auth_user,
            auth_password=auth_password,
            connection=connection,
            html_message=html_message
        )
        
        # Only return success message, no logging for successful operations
        return f"Email sent successfully to {', '.join(recipient_list)}"
    except BadHeaderError as bhe:
        error_msg = f"❌ Invalid header found when sending email to {', '.join(recipient_list)}: {str(bhe)}"
        logger.error(error_msg)
        raise self.retry(exc=bhe, countdown=10)
    except Exception as e:
        # Log detailed error information for debugging
        error_msg = f"❌ Failed to send email to {', '.join(recipient_list)}: {str(e)}"
        logger.error(error_msg)
        logger.error(f"❌ Email config - Host: {settings.EMAIL_HOST}, Port: {settings.EMAIL_PORT}, User: {settings.EMAIL_HOST_USER}")
        logger.error(f"❌ Exception type: {type(e).__name__}")
        
        # Log full traceback for debugging
        import traceback
        logger.error(f"❌ Full traceback: {traceback.format_exc()}")
        
        raise self.retry(exc=e, countdown=10)