from django.db import models

class Cart(models.Model):
    session_key = models.CharField(max_length=40, db_index=True)
    customer_name = models.CharField(max_length=100, blank=True, null=True)
    customer_phone = models.CharField(max_length=20, blank=True, null=True)
    customer_email = models.EmailField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def total_price(self):
        total = sum(item.total_price for item in self.items.all())
        return total
    
    def __str__(self):
        return f'Cart ID: {self.id} - Session Key: {self.session_key}'