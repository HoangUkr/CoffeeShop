from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from django.template.loader import render_to_string
from api.tasks import send_custom_email
from loguru import logger

class SendEmailView(APIView):
    parser_classes = [JSONParser]
    permission_classes = [AllowAny]  # Or IsAuthenticated for protected access
    
    def post(self, request):
        try:
            # Extract data from request
            recipient_email = request.data.get('email')
            message = request.data.get('message', '')
            sender_name = request.data.get('name', 'Anonymous')
            subject = "Comment from customer"
            
            # Validation
            if not recipient_email:
                return Response({
                    'error': 'Email address is required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            
            # Generic email template
            html_message = render_to_string('email_template/generic_email.html', {
                'subject': subject,
                'message': message,
                'sender_name': sender_name,
            })
            
            # Send email asynchronously
            task = send_custom_email.delay(
                subject=subject,
                message=message,  # Plain text fallback
                recipient_list=[recipient_email],
                html_message=html_message
            )
            
            logger.info(f"✅ Email queued for {recipient_email} with task ID: {task.id}")
            
            return Response({
                'success': True,
                'message': 'Email sent successfully!',
                'task_id': str(task.id),
                'recipient': recipient_email
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"❌ Email sending failed: {str(e)}")
            return Response({
                'error': 'Failed to send email',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)