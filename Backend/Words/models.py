from django.db import models
from django.conf import settings

# Create your models here.
class Voca(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    content = models.CharField(max_length=20)
    part = models.CharField(max_length=10)
    mean = models.CharField(max_length=50)