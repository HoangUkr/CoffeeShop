from django.db import models

# Class model for Order Item
class OrderItem(models.Model):
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='order_items'
    )
    order = models.ForeignKey(
        'Order',
        on_delete=models.CASCADE,
        related_name='items'
    )
    quantity = models.IntegerField(
        verbose_name='Enter the quantity of product in the order',
        help_text='Enter the quantity'
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
        db_table = 'orderitem'
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'
        ordering = ['-created_at']
        
    def __str__(self):
        return f'Order UUID: {self.order.order_uuid}.'