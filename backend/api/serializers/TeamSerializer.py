from rest_framework import serializers
from api.models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        read_only_fields = ('id',)
        fields = '__all__'