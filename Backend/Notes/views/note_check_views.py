# 튜토리얼 여부 확인, 노트 도장
from ..models import Diary, Note
from Accounts.models import Child
from ..serializers import CheckSerializer

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@api_view(['GET', 'PUT'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_check(request):
    if request.method == 'GET':
        notes = Note.objects.filter(user=request.user)
        context = []
        for note in notes:
            diary = Diary.objects.filter(note=note, check=False)
            serializer = CheckSerializer(diary, many=True)
            context += serializer.data
        # child = get_object_or_404(Child, parent=request.user, pk=request.GET['child']
        return Response(context, status=status.HTTP_200_OK)
    else:
        diary_id = request.GET.get('id')
        diary = get_object_or_404(Diary, pk=diary_id)
        diary.check = True
        diary.save()
        serializer = CheckSerializer(diary)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_tutorial_check(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    if Note.objects.filter(child=child).exists():
        return Response({'tutorial' : False}, status=status.HTTP_200_OK)
    else:
        return Response({'tutorial' : True}, status=status.HTTP_200_OK)

