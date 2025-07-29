from rest_framework import serializers
from api.models import Team

class TeammateSerializer(serializers.ModelSerializer):
    teammate_name = serializers.CharField(
        max_length=100,
        help_text="The name of the team member.",
        required=True
    )
    
    class Meta:
        model = Team
        read_only_fields = ('id',)
        fields = '__all__'
        
    