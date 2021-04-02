# 아이 생성, 수정, 삭제
import re

from ..models import Child
from ..serializers import ChildSerializer

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


def isHangul(text):
    encText = text
    hanCount = len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', encText))
    return hanCount == len(text)


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def child_create_read(request):
    if request.method == 'GET':
        child = Child.objects.filter(parent=request.user)
        serializer = ChildSerializer(child, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        name = request.data.get('name')
        if not name.isalpha() and not isHangul(name):
            return Response({'error' : '이름은 한글이나 영어만 입력 가능합니다.'}, status=status.HTTP_400_BAD_REQUEST)
        if Child.objects.filter(parent=request.user, name=name).exists():
            return Response({'error' : '중복된 이름입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        img = request.data.get('img')
        if not img.isdigit() or int(img) < 0 or int(img) > 4:
            return Response({'error' : '잘못된 이미지입니다. 이미지번호 0~4 사이의 숫자로 입력해주세요'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ChildSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(parent=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def child_update(request):
    child = get_object_or_404(Child, parent=request.user, id=request.GET.get('child'))
    name = request.data.get('name')
    if not name.isalpha() and not isHangul(name):
        return Response({'error' : '이름은 한글이나 영어만 입력 가능합니다.'}, status=status.HTTP_400_BAD_REQUEST)
    if name != child.name and Child.objects.filter(parent=request.user, name=name).exists():
        return Response({'error' : '중복된 이름입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    img = request.data.get('img')
    if not img.isdigit() or int(img) < 0 or int(img) > 4:
        return Response({'error' : '잘못된 이미지입니다. 이미지번호 0~4 사이의 숫자로 입력해주세요'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = ChildSerializer(child, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def child_delete(request):
    child = get_object_or_404(Child, parent=request.user, id=request.GET.get('child'))
    if request.user == child.parent:
        child.delete()
        return Response({'success' : '아이 계정이 삭제되었습니다.'}, status=status.HTTP_200_OK)
    return Response({'error' : '삭제할 권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def child_change_voice(request):
    voice = request.data.get('voice')
    if not voice.isdigit() or int(voice) < 0 or int(voice) > 4:
        return Response({'error' : '잘못된 음성입니다. 음성 번호 0~4 사이의 숫자로 입력해주세요'}, status=status.HTTP_400_BAD_REQUEST)
    child = get_object_or_404(Child, parent=request.user, id=request.GET.get('child'))
    child.voice = voice
    child.save()
    return Response({'success' : '목소리가 변경되었습니다.'}, status=status.HTTP_200_OK)