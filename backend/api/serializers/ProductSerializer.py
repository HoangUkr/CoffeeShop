from rest_framework import serializers
from api.models import Product, Category
from api.serializers import ImageSerializer, CategorySerializer

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
    # Allow setting the category during creation by ID
    category_id = serializers.IntegerField(write_only=True, required=True)
    # For reading, return the full category details
    category = CategorySerializer(read_only=True)
    # Product with image
    images = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        read_only_fields = [
            'id',
            'product_like_count',
            'created_at',
            'updated_at'
        ]
        fields = [
            'id',
            'product_name',
            'thumbnail',
            'product_price',
            'product_like_count',
            'product_description',
            'category_id',  # For writing
            'category',     # For reading
            'images',
            'created_at',
            'updated_at'
        ]
    
    def create(self, validated_data):
        # Extract category_id and get the category instance
        category_id = validated_data.pop('category_id')
        try:
            category = Category.objects.get(id=category_id)
            validated_data['category'] = category
        except Category.DoesNotExist:
            raise serializers.ValidationError({'category_id': 'Category with this ID does not exist.'})
        
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Handle category_id if provided
        if 'category_id' in validated_data:
            category_id = validated_data.pop('category_id')
            try:
                category = Category.objects.get(id=category_id)
                validated_data['category'] = category
            except Category.DoesNotExist:
                raise serializers.ValidationError({'category_id': 'Category with this ID does not exist.'})
        
        return super().update(instance, validated_data)