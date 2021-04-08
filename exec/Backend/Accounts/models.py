from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.fields import CharField

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=255)
    pin_code = models.CharField(max_length=255)


class Child(models.Model):
    parent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='child')
    name = models.CharField(max_length=20)
    img = models.IntegerField()
    year = models.IntegerField()
    voice = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Authenticatecode(models.Model):
    code = CharField(max_length=255)