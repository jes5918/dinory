# 전체 노트 조회 기능, 월간 작성 일기 조회, 특정 일기 조회, 월별 일자 대표 일기 조회
from ..models import Note, Diary
from Accounts.models import Child
from ..serializers import NoteSerializer, MonthlyDiarySerializer, DailyDiarySerializer, DiaryFooterSerializer

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_read_total(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    notes = Note.objects.filter(child=child).order_by('-vol')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_read_total_monthly(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    year = request.GET.get('year')
    month = request.GET.get('month')
    if Note.objects.filter(child=child, year=year, month=month).exists():
        note = get_object_or_404(Note, child=child, year=year, month=month)
        diary = Diary.objects.filter(note=note).order_by('-date', '-id')
        serializer = MonthlyDiarySerializer(diary, many=True)
        ans = serializer.data
    else:
        ans = []
    return Response(ans, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_read_total_daily(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    year = request.GET.get('year')
    month = request.GET.get('month')
    date = request.GET.get('date')
    notes = get_object_or_404(Note, child=child, year=year, month=month)
    diary = Diary.objects.filter(note=notes, date=date).order_by('-id')
    serializer = DailyDiarySerializer(diary, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_read_only_pk(request, pk):
    diary = get_object_or_404(Diary, pk=pk)
    if diary.note.user == request.user:
        serializer = DailyDiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error' : '접근 권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_read_monthly(request):
    child = get_object_or_404(Child, parent=request.user,  pk=request.GET.get('child'))
    year = request.GET.get('year')
    month = request.GET.get('month')
    note = get_object_or_404(Note, child=child, year=year, month=month)
    diaries = Diary.objects.filter(note=note).order_by('-date')
    days = []
    diary_data = []
    for diary in diaries:
        if diary.date not in days:
            serializer = DiaryFooterSerializer(diary)
            diary_data.append(serializer.data)
            days.append(diary.date)
    return Response(diary_data, status=status.HTTP_200_OK)