from rest_framework import serializers
from api.models import Cart
from .CartItemSerializer import CartItemSerializer

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = [
            'session_key',
            'customer_name',
            'customer_phone',
            'customer_email',
            'items',
            'total_price',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_total_price(self, obj):
        return float(sum(item.total_price for item in obj.items.all()))