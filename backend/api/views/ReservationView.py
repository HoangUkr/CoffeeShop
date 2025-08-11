from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated

from api.serializers import ReservationSerializer
from api.models import Reservation
from api.permissions import IsAdminUserRole

from django.shortcuts import get_object_or_404

# Import task
from api.tasks import send_reservation_confirmation

# Create reservation view
class ReservationCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    # permission_classes = [IsAuthenticated, IsAdminUserRole]
    
    def post(self, request, *args, **kwargs):
        # Retrieve data for sending email
        
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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