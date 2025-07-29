from rest_framework import serializers
from api.models import Review, Product

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(
        max_length=100,
        help_text="The name of the reviewer.",
        required=True
    )
    reviewer_email = serializers.CharField(
        max_length=100,
        help_text="The email of the reviewer.",
        required=True
    )
    reviewer_comment = serializers.CharField(
        max_length=2000,
        help_text="The comment of the reviewer.",
        required=True
    )
    # Allow set the product during creation
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        required = True
    )
    # product_id = serializers.IntegerField(source='product.id', read_only=True)
    # product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = Review
        read_only_fields = [
            'id',
            'product',
            # 'product_name',
            'created_at',
            'updated_at'
        ]
        fields = [
            'id',
            'reviewer_name',
            'reviewer_email',
            'reviewer_comment',
            'product',
            # 'product_name',
            'created_at',
            'updated_at'
        ]
    # Accept the email in input, but do not represent it
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('reviewer_email', None)
        return data
