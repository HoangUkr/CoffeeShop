from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from api.models import Teammate, CustomUser
from api.models import Product, Category, Cart, CartItem

# Register your models here.
@admin.register(Teammate)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'teammate_name', 'teammate_role', 'created_at', 'updated_at')
    search_fields = ('teammate_name', 'teammate_role')
    list_filter = ('teammate_role',)
    
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('id', 'email', 'username', 'is_staff', 'role', 'is_active')
    list_filter = ('is_staff', 'is_active', 'role')
    search_fields = ('email', 'username')
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_staff', 'is_active')}
        ),
    )

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product
    list_display = ('id', 'product_name', 'category', 'product_price', 'created_at', 'updated_at')
    search_fields = ('product_name', 'category__category_name')
    list_filter = ('category', 'created_at')
    ordering = ('-created_at',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    model = Category
    list_display = ('id', 'category_name', 'created_at', 'updated_at')
    search_fields = ('category_name',)
    ordering = ('-created_at',)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    model = Cart
    list_display = ('id', 'session_key', 'customer_name', 'customer_email', 'total_price', 'created_at', 'updated_at')
    search_fields = ('session_key', 'customer_name', 'customer_email')
    list_filter = ('created_at', 'updated_at')
    readonly_fields = ('total_price',)
    ordering = ('-created_at',)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    model = CartItem
    list_display = ('id', 'cart', 'product', 'quantity', 'total_price')
    search_fields = ('cart__session_key', 'product__product_name')
    list_filter = ('cart', 'product')
    readonly_fields = ('total_price',)
    
    def total_price(self, obj):
        return obj.total_price

