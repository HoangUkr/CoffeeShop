from rest_framework import serializers
from api.models import Reservation

from django.utils import timezone

class ReservationSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(
        max_length=100,
        help_text="The name of the Customer.",
        required=True
    )
    customer_email = serializers.EmailField(
        max_length=100,
        help_text="The email of the Customer.",
        required=True
    )
    customer_phone = serializers.CharField(
        max_length=100,
        help_text="The phone number of the Customer.",
        required=True
    )
    reservation_date = serializers.DateTimeField(
        required=True,
        help_text="Reservation Date.",
    )
    customer_message = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="The customer message",
    )
    number_of_people = serializers.IntegerField(
        required=True,
        help_text="The number of people for the reservation.",
    )

    class Meta:
        model = Reservation
        read_only_fields = ('id',)
        fields = '__all__'
        
    def validate_reservation_date(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Reservation date must be in the future.")
        return value
    
    # Accept phone and email, but do not present it
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('customer_phone', None)
        data.pop('customer_email', None)
        return data

