#Если сессия неактивна перенаправляет на login

from django.shortcuts import redirect


class SessionExpiryMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Проверяем, активна ли сессия
        if request.path not in ['/login/', '/register/'] and not request.session.get('user', None):
            return redirect('login')  # Перенаправление на страницу авторизации
        response = self.get_response(request)
        return response