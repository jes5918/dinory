from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=255)
    pin_code = models.CharField(max_length=6, default="000000")

class Child(models.Model):
    parent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='child')
    name = models.CharField(max_length=20)
    img = models.IntegerField()
    age = models.IntegerField()
    voice = models.IntegerField(default=0)