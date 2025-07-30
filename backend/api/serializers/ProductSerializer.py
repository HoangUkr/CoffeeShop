from rest_framework import serializers
from api.models import Product, Category
from api.serializers import ImageSerializer

class ProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        max_length=100,
        help_text="The name of the product.",
        required=True
    )
    product_price = serializers.FloatField(
        help_text="The price of the product.",
        required=True
    )
    # Allow set the category during creation
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=True
    )
    # Product with image
    images = ImageSerializer(many=True, read_only=True)
    # category_id = serializers.IntegerField(source='category.id', read_only=True)
    class Meta:
        model = Product
        read_only_fields = [
            'id',
            # 'category',
            'product_like_count',
            'created_at',
            'updated_at'
        ]
        fields = [
            'id',
            'product_name',
            'product_price',
            'product_like_count',
            'category',
            'images',
            'created_at',
            'updated_at'
        ]