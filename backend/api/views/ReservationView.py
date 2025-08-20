from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.serializers import ReservationSerializer
from api.models import Reservation
from api.permissions import IsAdminUserRole

from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.conf import settings

# Import task
from api.tasks import send_reservation_confirmation

# Import loguru (already configured to send to Graylog)
from loguru import logger

# Create reservation view
class ReservationCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            # Save the reservation
            reservation = serializer.save()
            
            # Prepare email data
            try:
                # Render HTML email template
                html_message = render_to_string('reservation_confirmation.html', {
                    'customer_name': reservation.customer_name,
                    'customer_email': reservation.customer_email,
                    'reservation_date': reservation.reservation_date.strftime("%B %d, %Y at %I:%M %p"),
                    'customer_phone': reservation.customer_phone,
                    'customer_message': reservation.customer_message,
                    'reservation_id': reservation.id,
                    'number_of_people': reservation.number_of_people,
                })
                
                # Prepare email subject
                subject = f"✅ Reservation Confirmation - {reservation.reservation_date.strftime('%B %d, %Y at %I:%M %p')}"

                # Send email asynchronously using Celery
                task = send_reservation_confirmation.delay(
                    subject=subject,
                    message="",  # Empty plain text since we're using HTML
                    recipient_list=[reservation.customer_email],
                    html_message=html_message
                )
                
                # Return success response
                return Response({
                    'reservation': serializer.data,
                    'message': 'Reservation created successfully! Confirmation email has been sent.',
                    'task_id': str(task.id)
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                logger.error(f"❌ Email sending failed for reservation {reservation.id}: {str(e)}")
                logger.error(f"❌ Exception type: {type(e).__name__}")
                import traceback
                logger.error(f"❌ Full traceback: {traceback.format_exc()}")
                
                # If email fails, still return the reservation but with a warning
                return Response({
                    'reservation': serializer.data,
                    'message': 'Reservation created successfully, but email confirmation failed to send.',
                    'email_error': str(e)
                }, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"❌ Reservation validation failed: {serializer.errors}")
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# List all categories
class ReservationListView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Delete reservation view
class ReservationDeleteView(APIView):
    # permission_classes = [IsAuthenticated, IsAdminUserRole]
    def delete(self, request, pk, *args, **kwargs):
        reservation = get_object_or_404(Reservation, pk=pk)
        reservation.delete()
        return Response({'detail': 'Successfully deleted.'},status=status.HTTP_204_NO_CONTENT)

# Update reservation view
class ReservationModifyView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticated, IsAdminUserRole]
    
    def put(self, request, pk, *args, **kwargs):
        reservation = get_object_or_404(Reservation, pk=pk)
        serializer = ReservationSerializer(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, *args, **kwargs):
        reservation = get_object_or_404(Reservation, pk=pk)
        serializer = ReservationSerializer(reservation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)