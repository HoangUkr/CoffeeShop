from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLES = [
        ('staff', 'Staff'),
        ('admin', 'Admin')
    ]
    email = models.EmailField(
        max_length=100,
        verbose_name='Email of admin',
        help_text='Enter email for user',
        default=None
    )
    role = models.CharField(
        choices=ROLES,
        verbose_name='Role of user',
        help_text='Select user role',
        default='staff'
    )
    
    class Meta:
        db_table = 'customuser'
        verbose_name = 'Custom User'
        verbose_name_plural = 'Custom Users'
        ordering = ['id']