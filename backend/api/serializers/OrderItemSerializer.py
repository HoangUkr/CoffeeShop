from rest_framework import serializers
from api.models import Order, Product, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(),
        required = True
    )
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        required = True
    )
    quantity = serializers.IntegerField(
        required=True
    )
    class Meta:
        model = OrderItem
        read_only_fields = [
            'id',
            'product',
            'order',
            'created_at',
            'updated_at'
        ]
        fields = [
            'id',
            'order',
            'quantity',
            'product',
            # 'product_name',
            'created_at',
            'updated_at'
        ]