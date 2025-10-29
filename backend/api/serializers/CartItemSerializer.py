from rest_framework import serializers
from api.models import CartItem, Product
from . import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )
    quantity = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',
            'product_id',
            'quantity',
            'total_price'
        ]
    
    def get_total_price(self, obj):
        return float(obj.total_price)