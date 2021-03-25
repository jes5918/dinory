from django.db import models
from django.conf import settings


class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    vol = models.IntegerField()
    img = models.ImageField(upload_to='images/%Y/%m/%d')
    # img = models.CharField(max_length=255)


class Diary(models.Model):
    note = models.ForeignKey('Note', on_delete=models.CASCADE, related_name='diary')
    title = models.CharField(max_length=50)
    content = models.TextField()
    # img = models.CharField(max_length=255)
    img = models.ImageField(upload_to='images/%Y/%m/%d')
    year = models.IntegerField()
    month = models.IntegerField()
    date = models.IntegerField()
    check = models.BooleanField(default=False)


class Word(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    content = models.CharField(max_length=20)
    count = models.IntegerField(default=0)
    state = models.BooleanField()


class Sentence(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    content = models.CharField(max_length=255)


class WordToSentence(models.Model):
    sentence = models.ForeignKey('Sentence', on_delete=models.CASCADE)
    word = models.ForeignKey('Word', on_delete=models.CASCADE)
    