from django.db.models import fields
from rest_framework import serializers

from .models import Note, Diary, Sentence

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ('user', 'child')
        # depth = 1

class DiarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Diary
        fields = '__all__'
        read_only_fields = ('note',)

class SentenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sentence
        fields = '__all__'
        read_only_fields = ('user', 'child', )

# class WordSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Word
#         fields = '__all__'
#         read_only_fields = ('user',)