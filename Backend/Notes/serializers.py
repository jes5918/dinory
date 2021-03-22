from django.db.models import fields
from rest_framework import serializers

from .models import Diary, Sentence, Word

class DiarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Diary
        fields = '__all__'
        read_only_fields = ('user',)

class SentenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sentence
        fields = '__all__'
        read_only_fields = ('diary', 'user',)

class WordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Word
        fields = '__all__'
        read_only_fields = ('user',)