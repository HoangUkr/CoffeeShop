from django.db import models
import uuid

# Class model for Order
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in process', 'In Process'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled')
    ]
    order_uuid = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
        verbose_name='Order Unique ID',
        help_text='Automatically generated unique ID for the order'
    )
    order_duedate = models.DateTimeField(
        verbose_name='Order Due Date',
        help_text='Enter due date for Order'
    )
    order_total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Order Total Price',
        help_text = 'Enter the total price of the order'
    )
    order_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Order Status',
        help_text='Current status of the order'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Reviews'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated Date of Reviews'
    )
    
    class Meta:
        db_table = 'order'
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
        ordering = ['-created_at']
        
    def __str__(self):
        return f'Order UUID: {self.order_uuid}.'