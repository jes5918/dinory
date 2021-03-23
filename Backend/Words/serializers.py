from django.db.models import fields
from rest_framework import serializers

from .models import Voca

# class SentenceSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Sentence
#         fields = '__all__'
#         read_only_fields = ('user', 'child', )

class VocaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Voca
        fields = '__all__'
        read_only_fields = ('user', 'child',)