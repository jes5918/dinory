# 비밀번호 변경, 핀번호 변경, 유저탈퇴
from ..models import User
from ..serializers import UserPasswordChangeSerializer, UserPincodeChangeSerializer

from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@api_view(['PUT'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def password_setting(request):
    user = get_object_or_404(User, pk=request.user.pk)
    old_password = request.data.get('old_password')
    password = request.data.get('password')
    password_confirmation = request.data.get('password_confirmation')
    if old_password == password:
        return Response({'error' : '기존과 동일한 비밀번호로는 변경할 수 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    if not check_password(old_password, user.password):
        return Response({'error' : '현재 비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    if password != password_confirmation:
        return Response({'error': '새 비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if len(password) < 8:
        return Response({'error' : '비밀번호는 8자리 이상 입력해주세요'}, status=status.HTTP_400_BAD_REQUEST)
    cnt = 0
    digit, upper, lower = False, False, False
    for p in password:
        if cnt < 3:
            if p.isdigit() and not digit:
                cnt += 1
                digit = True
            elif p.isupper() and not upper:
                cnt += 1
                upper = True
            elif p.islower() and not lower:
                cnt += 1
                lower = True
        else:
            break
    if cnt < 3:
        return Response({'error' : '비밀번호는 영어 대/소문자, 숫자로 구성되어있어야합니다.'}, status=status.HTTP_400_BAD_REQUEST)
    context = {
        'password' : make_password(password)
    }
    serializer = UserPasswordChangeSerializer(user, data=context)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response({ 'success' : '비밀번호가 변경되었습니다'}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def pincode_setting(request):
    user = get_object_or_404(User, pk=request.user.pk)
    old_pincode = request.data.get('old_pincode')
    pin_code = request.data.get('pin_code')
    if old_pincode == pin_code:
        return Response({'error' : '기존과 동일한 핀 번호로는 변경할 수 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if not check_password(old_pincode, user.pin_code):
        return Response({'error': '핀 번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if len(pin_code) < 6 or not pin_code.isdigit():
        return Response({'error': 'pin_code는 6자리 숫자만 허용됩니다.'}, status=status.HTTP_400_BAD_REQUEST)
    context = {
        'pin_code' : make_password(pin_code)
    }
    serializer = UserPincodeChangeSerializer(user, data=context)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({'success' : '핀번호가 변경되었습니다.'}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def user_delete(request):
    user = get_object_or_404(User, pk=request.user.pk)
    user.delete()
    return Response({'success' : '유저가 삭제되었습니다.'}, status=status.HTTP_200_OK)
    