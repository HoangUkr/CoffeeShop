from django.contrib import admin

# Models
from api.models import Team

# Register your models here.
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    search_fields = ('name', 'role')
    list_filter = ('role',)
