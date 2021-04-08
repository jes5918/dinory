from django.db import models
from django.conf import settings


class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    vol = models.IntegerField()
    img = models.ImageField(upload_to='images/%Y/%m/%d', null=True, blank=True)
    year = models.IntegerField(default=2021)
    month = models.IntegerField(default=3)
    count = models.IntegerField(default=1)

    def __str__(self):
        return '{}의 일기장 - {}'.format(self.child.name, self.vol)

class Diary(models.Model):
    note = models.ForeignKey('Note', on_delete=models.CASCADE, related_name='diary')
    title = models.CharField(max_length=50)
    content = models.TextField()
    img = models.ImageField(upload_to='images/%Y/%m/%d', null=True, blank=True)
    year = models.IntegerField()
    month = models.IntegerField()
    date = models.IntegerField()
    check = models.BooleanField(default=False)

    def __str__(self):
        return '{} 의 일기 - {}'.format(self.note.child.name, self.title)


class Word(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    content = models.CharField(max_length=20)
    count = models.IntegerField(default=0)
    state = models.BooleanField()

    def __str__(self):
        return '{} 의 사용한 단어 - {}'.format(self.child.name, self.content)


class Sentence(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    child = models.ForeignKey('Accounts.Child', on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    def __str__(self):
        return '{} 의 사용한 문장 - {}'.format(self.child.name, self.content)


class WordToSentence(models.Model):
    sentence = models.ForeignKey('Sentence', on_delete=models.CASCADE)
    word = models.ForeignKey('Word', on_delete=models.CASCADE)
    