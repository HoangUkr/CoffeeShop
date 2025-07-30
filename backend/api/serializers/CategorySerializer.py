from rest_framework import serializers
from api.models import Category

class CategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        max_length=100,
        help_text="The name of category.",
        required=True
    )
    
    class Meta:
        model = Category
        read_only_fields = ('id',)
        fields = '__all__'
        
    