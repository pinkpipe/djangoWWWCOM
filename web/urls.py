from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.login_user, name='login'),
    path('register/', views.register_user, name='register'),
    path('main/', views.log_in_main, name='main_base'),
    path('logout/', views.logout_user, name='logout'),
]