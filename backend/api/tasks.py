from django.conf import settings
from django.core.mail import send_mail
from coffee_api import celery_app

@celery_app.task
def send_reservation_confirmation(
    subject,
    message,
    recipient_list,
    from_email = settings.EMAIL_HOST_USER,
    fail_silently = False,
    auth_user = None,
    auth_password = None,
    connection = None,
    html_message = None    
    ):
    send_mail(
        subject,
        message,
        from_email,
        recipient_list,
        fail_silently = fail_silently,
        auth_user = auth_user,
        auth_password = auth_password,
        connection = connection,
        html_message = html_message
    )