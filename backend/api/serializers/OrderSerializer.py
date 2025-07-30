from rest_framework import serializers
from api.models import Order

from django.utils import timezone

class OrderSerializer(serializers.ModelSerializer):
    order_duedate = serializers.DateTimeField(
        help_text="The due date of order.",
        required=True
    )
    order_total_price = serializers.FloatField(
        max_digits=10,
        decimal_places=2,
        help_text='Enter the total price of the order',
        required=True
    )
    class Meta:
        model = Order
        read_only_fields = [
            'id',
            'order_uuid',
            'created_at',
            'updated_at'
        ]
        fields = [
            'id',
            'order_uuid',
            'order_duedate',
            'order_status',
            'order_total_price',
            'created_at',
            'updated_at'
        ]
        
    # Validate the due date
    def validate_order_duedate(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Reservation date must be in the future.")
        return value
    # Validate the total price
    def validate_order_total_price(self, value):
        if value < 0:
            raise serializers.ValidationError("The total price should be positive.")
        return value