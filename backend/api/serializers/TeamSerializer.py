from rest_framework import serializers
from api.models import Team

class TeamSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=100,
        help_text="The name of the team member.",
        required=True
    )
    
    class Meta:
        model = Team
        read_only_fields = ('id',)
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }
        
    