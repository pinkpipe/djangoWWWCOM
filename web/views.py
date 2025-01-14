from lib2to3.fixes.fix_input import context

from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.shortcuts import render, redirect

from web.models import UsersAll


# Create your views here.

def login_user(request):
    if request.method == 'POST':
        login = request.POST.get('login')
        password = request.POST.get('password')

        try:
            user = UsersAll.objects.get(username=login)
            if check_password(password, user.password):
                request.session['user'] =  {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
                return redirect('main_base')
            else:
                return JsonResponse({'error': 'Неверный пароль'}, status=400)
        except UsersAll.DoesNotExist:
            return JsonResponse({'error': 'Пользователь не найден'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return render(request, 'auth/login.html')


def log_in_main(request):
    user_data = request.session.get('user', None)
    if user_data:
        context = {
            'user': user_data,
        }
    else:
        context = {}
    return render(request, 'index.html', context)


def register_user(request):
    if request.method == "POST":
        login = request.POST.get('login')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        email = request.POST.get('email')

        try:
            if login and password and email:
                if UsersAll.objects.filter(username=login).exists():
                    return JsonResponse({'error': 'Пользователь с таким именем уже существует'}, status=400)
                if UsersAll.objects.filter(email=email).exists():
                    return JsonResponse({'error': 'Email уже используется'}, status=400)

                UsersAll.objects.create(
                    username=login,
                    password=password,
                    email=email,
                )
                return redirect('login')
            else:
                return JsonResponse({'error': 'Все поля должны быть заполнены'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return render(request, 'auth/register.html')


def logout_user(request):
    if 'user' in request.session:
        del request.session['user']
    else:
        pass
    return redirect('login')


