# 이메일 인증코드 발송, 인증코드 확인
from threading import Thread
import time
import random

from ..models import Authenticatecode, User
from ..serializers import AuthenticatecodeSerializer, UserPasswordChangeSerializer

from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.core.mail import EmailMessage

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


def data_delete(pk):
    time.sleep(300)
    code = get_object_or_404(Authenticatecode, pk=pk)
    code.delete()


@api_view(['POST'])
def password_find(request):
    address = request.data.get('email')
    username = request.data.get('username')
    if not User.objects.filter(username=username, email=address).exists():
        return Response({'error' : '유효하지 않은 회원정보입니다.'})
    code = ''
    for _ in range(6):
        num = random.randint(0, 9)
        code += str(num)
    email_content = render_to_string('email_password.html', {
        "code" : code
    })
    title = '[Dinory] 비밀번호 찾기'
    email = EmailMessage(title, email_content, to=[address])
    email.content_subtype = 'html'
    email.send()
    code = make_password(code)
    context = {"code" : code}
    serializer = AuthenticatecodeSerializer(data=context)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        pk = serializer.data['id']
        t1 = Thread(target=data_delete, args=(pk,))
        t1.start()
        return Response({'id' : pk}, status=status.HTTP_201_CREATED)
    return Response({'error' : '잘못된 데이터입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def password_find_confirm(request):
    code = request.data.get('code')
    pk = request.data.get('id')
    Authenticate = get_object_or_404(Authenticatecode, pk=pk)
    if check_password(code, Authenticate.code):
        Authenticate.delete()
        email = request.data.get('email')
        user = get_object_or_404(User, email=email)
        return Response({'user': user.pk}, status=status.HTTP_200_OK)
    return Response({'error' : '인증코드가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def password_find_setting(request, pk):
    user = get_object_or_404(User, pk=pk)
    password = request.data.get('password')
    password_confirmation = request.data.get('password_confirmation')
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
    return Response({'success' : '비밀번호가 변경되었습니다'}, status=status.HTTP_201_CREATED)
