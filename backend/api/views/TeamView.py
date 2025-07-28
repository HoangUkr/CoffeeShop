from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from api.serializers import TeamSerializer
from api.models import Team

from django.shortcuts import get_object_or_404

# Create team member
class TeamCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update or partially update team member
class TeamModifyView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def put(self, request, pk, *args, **kwargs):
        team_member = get_object_or_404(Team, pk=pk)
        serializer = TeamSerializer(team_member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, *args, **kwargs):
        team_member = get_object_or_404(Team, pk=pk)
        serializer = TeamSerializer(team_member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete team member
class TeamDeleteView(APIView):
    def delete(self, request, pk, *args, **kwargs):
        team_member = get_object_or_404(Team, pk=pk)
        team_member.delete()
        return Response({'detail': 'Successfully deleted.'},status=status.HTTP_204_NO_CONTENT)

# List all team members
class TeamListView(APIView):
    def get(self, request, *args, **kwargs):
        team_members = Team.objects.all()
        serializer = TeamSerializer(team_members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
