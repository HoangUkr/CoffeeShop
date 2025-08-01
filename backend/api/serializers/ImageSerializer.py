from rest_framework import serializers
from api.models import Images, Product

class ImageSerializer(serializers.ModelSerializer):
    # product_id = serializers.IntegerField(
    #     source='product.id',
    #     required=True
    # )
    # product_name = serializers.CharField(source='product.name', read_only=True)
    
    # Allow set the category during creation
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        required = True
    )

    image = serializers.ImageField(
        required=True
    )
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Images
        read_only_fields = [
            'id',
            'product',
            # 'product_name',
            'created_at',
            'updated_at'
        ]
        fields = [
            'id',
            'image_url',
            'image',
            'product',
            # 'product_name',
            'created_at',
            'updated_at'
        ]
    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            return obj.image.url
        return None
    