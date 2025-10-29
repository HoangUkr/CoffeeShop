from django.db import models
from .Cart import Cart
from .Product import Product

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    @property
    def total_price(self):
        return self.product.product_price * self.quantity
    
    class Meta:
        unique_together = ('cart', 'product')
    
    def __str__(self):
        return f'CartItem: {self.product.product_name} (Quantity: {self.quantity}) in Cart ID: {self.cart.session_key}'