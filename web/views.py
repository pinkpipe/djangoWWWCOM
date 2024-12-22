from django.shortcuts import render

# Create your views here.

def login_user(request):
    return render(request, 'auth/login.html')

def register_user(request):
    return render(request, 'auth/register.html')