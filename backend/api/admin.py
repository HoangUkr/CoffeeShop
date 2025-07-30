from django.contrib import admin

# Models
from api.models import Teammate

# Register your models here.
@admin.register(Teammate)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'teammate_name', 'teammate_role', 'created_at', 'updated_at')
    search_fields = ('teammate_name', 'teammate_role')
    list_filter = ('teammate_role',)
