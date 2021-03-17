from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import Child

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'password')

class ChildSerializer(serializers.ModelSerializer):

    class Meta:
        model = Child
        fields = ('name', 'age')