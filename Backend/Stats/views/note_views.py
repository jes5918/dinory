import datetime

from Accounts.models import Child
from Notes.models import Note, Diary
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_monthly_rate(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))

    year = child.year
    total_child = Child.objects.filter(year=year)
    vol = str(request.GET.get('year')) + str(request.GET.get('month'))
    if Note.objects.filter(vol=vol, child=child).exists():
        note = get_object_or_404(Note, child=child, vol=vol)
        count = len(Diary.objects.filter(note=note))
    else:
        count = 0
    total = 0
    total_children = 0
    for ch in total_child:
        if Note.objects.filter(child=ch, vol=vol).exists():
            note = get_object_or_404(Note, child=ch, vol=vol)
            diary = Diary.objects.filter(note=note)
            total += len(diary)
            total_children += 1

    if total_children == 0:
        total_avg = 0
    else:
        total_avg = total / total_children

    user_child = Child.objects.filter(parent=request.user)
    user_total = 0
    for ch in user_child:
        if Note.objects.filter(child=ch, vol=vol).exists():
            note = get_object_or_404(Note, child=ch, vol=vol)
            diary = Diary.objects.filter(note=note)
            user_total += len(diary)

    context = {
        'count' : count,
        'total_avg' : total_avg,
        'user_avg' : user_total / len(user_child)
    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_yearly_rate(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    now = datetime.datetime.now()
    nowYear = now.strftime('%Y')
    total_day = 0
    if request.GET.get('year') != nowYear:
        if int(request.GET.get('year')) % 4 != 0:
            total_day = 365
        else:
            total_day = 366
    else:
        nowMonth = int(now.strftime('%m'))
        day31 = [1, 3, 5, 7, 8, 10, 12]
        day30 = [4, 6, 9, 11]
        for i in range(int(nowMonth)):
            if i == 2:
                if int(request.GET.get('year')) % 4 != 0: total_day += 28
                else: total_day += 29
            elif i in day31:
                total_day += 31
            elif i in day30:
                total_day += 30
        nowDate = now.strftime('%d')
        total_day += int(nowDate)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_stat(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    year, month = int(request.GET.get('year')), int(request.GET.get('month'))

    child_cnt = []
    total_age_child = []
    user_child_cnt = []

    children = Child.objects.filter(year=child.year)
    for _ in range(12):
        if Note.objects.filter(child=child, year=year, month=month).exists():
            note = get_object_or_404(Note, child=child, year=year, month=month)
            count = note.count
        else:
            count = 0
        child_cnt.append(count)

        data = 0
        cnt = 0
        for ch in children:
            if Note.objects.filter(child=ch, year=year, month=month).exists():
                note = get_object_or_404(Note, child=child, year=year, month=month)
                data += note.count
                cnt += 1
        if cnt == 0:
            ans = 0
        else:
            ans = data/cnt

        total_age_child.append(ans)
            
        data = 0
        cnt = 0
        if Note.objects.filter(user=request.user, year=year, month=month).exists():
            note = get_object_or_404(Note, user=request.user, year=year, month=month)
            data += note.count
            cnt += 1
        if cnt == 0:
            ans = 0
        else:
            ans = data/cnt
        user_child_cnt.append(ans)

        if month > 1:
            month -= 1
        else:
            year -= 1
            month = 12
    context = {
        'child_cnt' : child_cnt,
        'age_child_cnt' : total_age_child,
        'user_child_cnt' : user_child_cnt
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_commit(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    select_year = request.GET.get('year')
    notes = Note.objects.filter(year=select_year, child=child)
    commitsDATA = []
    for note in notes:
        month = note.month
        if len(str(month)) < 2:
            re_month = '0' + str(month)
        else:
            re_month = str(month)
        dates = Diary.objects.filter(note=note).values('date')
        date =  set()
        for d in dates:
            if not d['date'] in date:
                date.add(d['date'])

        for d in date:
            if len(str(d)) < 2:
                re_date = '0' + str(d)
            else:
                re_date = str(d)
            count = len(Diary.objects.filter(note=note, month=month, date=d))
            y_m_d = str(select_year) + '-' + re_month + '-' + re_date
            commit = {
                'date' : y_m_d,
                'count' : count
            }
            commitsDATA.append(commit)
    return Response(commitsDATA, status=status.HTTP_200_OK)