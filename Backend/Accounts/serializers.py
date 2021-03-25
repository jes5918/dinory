from rest_framework import serializers
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

from .models import Child
# from rest_framework_jwt.settings import api_settings
# JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
# JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'pin_code')


class UserPasswordChangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('password', )


class UserPincodeChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pin_code', )

class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'
        read_only_fields = ('parent', 'voice')