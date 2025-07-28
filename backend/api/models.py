from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
# Model for team
class Team(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Team Member Role',
        help_text='Enter the name of the team member'
    )
    role = models.CharField(
        max_length=50,
        verbose_name='Team Member Name',
        help_text='Enter the role of the team member'
    )
    image = CloudinaryField(
        'image', 
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
        db_table = 'team'
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
        ordering = ['id']
    
    def __str__(self):
        return f'Name: {self.name}. Role: {self.role}'

# Model for order
# class Order(models):
#     pass

# # Model for product
# class Product(models):
#     pass

# # Model for item in order (M)
# class OrderItem():
#     pass

# # Model for table
# class Table():
#     pass