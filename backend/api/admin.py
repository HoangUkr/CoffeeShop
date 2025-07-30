from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from api.models import Teammate, CustomUser

# Serializer
from api.serializers import CustomUserSerializer

# Register your models here.
@admin.register(Teammate)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'teammate_name', 'teammate_role', 'created_at', 'updated_at')
    search_fields = ('teammate_name', 'teammate_role')
    list_filter = ('teammate_role',)
    
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('id', 'email', 'username', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'username')
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)

