from django.contrib import admin
from django.urls import path, include

# Team API Urls
from api.views import TeamCreateView, TeamModifyView, TeamDeleteView, TeamListView

urlpatterns = [
    path('teams/create/', TeamCreateView.as_view(), name='team-create'),
    path('teams/<int:pk>/update/', TeamModifyView.as_view(), name='team-update'),
    path('teams/<int:pk>/delete/', TeamDeleteView.as_view(), name='team-delete'),
    path('teams/', TeamListView.as_view(), name='team-list'),
]
