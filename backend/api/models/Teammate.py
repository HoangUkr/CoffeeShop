from django.db import models

# Import custom Cloudinary field
from api.fields import CustomCloudinaryField
from cloudinary_storage.storage import MediaCloudinaryStorage

# Create your models here.
# Model for team
class Teammate(models.Model):
    teammate_name = models.CharField(
        max_length=100,
        verbose_name='Team Member Name',
        help_text='Enter the name of the team member'
    )
    teammate_role = models.CharField(
        max_length=50,
        verbose_name='Team Member Role',
        help_text='Enter the role of the team member'
    )
    teammate_image = models.ImageField(
        upload_to='team/',
        storage=MediaCloudinaryStorage(),
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Team Member'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated Date of Team Member'
    )
    class Meta:
        db_table = 'teammate'
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
        ordering = ['id']
    
    def __str__(self):
        return f'Name: {self.teammate_name}. Role: {self.teammate_role}.'