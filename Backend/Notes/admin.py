from django.contrib import admin
from .models import Diary, Note, Word, Sentence, WordToSentence
# Register your models here.
admin.site.register(Diary)
admin.site.register(Note)
admin.site.register(Word)
admin.site.register(Sentence)
admin.site.register(WordToSentence)