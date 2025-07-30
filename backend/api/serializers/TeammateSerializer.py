from rest_framework import serializers
from api.models import Teammate

class TeammateSerializer(serializers.ModelSerializer):
    teammate_name = serializers.CharField(
        max_length=100,
        help_text="The name of the team member.",
        required=True
    )
    
    class Meta:
        model = Teammate
        read_only_fields = ('id',)
        fields = '__all__'
        
    