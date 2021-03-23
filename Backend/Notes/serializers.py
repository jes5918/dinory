from django.db.models import fields
from rest_framework import serializers

from .models import Note, Diary, Sentence, Word, WordToSentence

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ('user', 'child')
        # depth = 1

class MonthlyDiarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Diary
        fields = ('title', 'img', 'year', 'month', 'date')


class DailyDiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('title', 'img', 'year', 'month', 'date', 'content', 'check')


class DiarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Diary
        fields = '__all__'
        read_only_fields = ('note',)


class SentenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sentence
        fields = '__all__'
        read_only_fields = ('user', 'child',)


class WordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Word
        fields = '__all__'
        read_only_fields = ('user', 'child',)


class WordToSentenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = WordToSentence
        fields = '__all__'


class CheckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diary
        fields = ('note', 'check', 'title', 'img', 'content', 'year', 'month', 'date')
        depth = 1