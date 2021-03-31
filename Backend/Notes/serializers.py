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
        fields = ('title', 'img', 'year', 'month', 'date', 'id')


class DailyDiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('title', 'img', 'year', 'month', 'date', 'content', 'check', 'id')


class DiarySerializer(serializers.ModelSerializer):
    # img = serializers.ImageField(use_url=True)
    class Meta:
        model = Diary
        fields = ('title', 'year', 'month', 'date', 'content', 'note', 'id')
        read_only_fields = ('note',)

class ImageSerializer(serializers.ModelSerializer):
    # img = serializers.ImageField(use_url=True)
    class Meta:
        model = Diary
        fields = ('img',)

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
        fields = ('note', 'check', 'title', 'img', 'content', 'year', 'month', 'date', 'id')
        depth = 1

class WordStateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Word
        fields = ('content', 'count')

class DiaryFooterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diary
        fields = ('date', 'id', 'img')