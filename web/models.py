from django.contrib.auth.hashers import make_password
from django.db import models

#----------------#

# from django.contrib.auth.hashers import check_password
# # Проверка правильности пароля
# is_correct = check_password('введенный_пароль', 'хэшированный_пароль_из_базы')

#----------------#

class UsersAll(models.Model):
    PRIVATE_CHOICES = (
        ('default', 'Default'),
        ('admin', 'Admin'),
    )

    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True, null=True)
    password = models.CharField(max_length=100)

    private_status = models.CharField(max_length=20, choices=PRIVATE_CHOICES, default='default')

    def save(self, *args, **kwargs):
        if self._state.adding or self.password.startswith('pbkdf2_sha256$') is False:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username