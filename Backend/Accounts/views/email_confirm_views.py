from threading import Thread
import time
import random

from ..models import Authenticatecode, User
from ..serializers import AuthenticatecodeSerializer

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
def email_code(request):
    address = request.data.get('email')
    if User.objects.filter(email=address).exists():
        return Response({'error' : '이미 가입된 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    code = ''
    for _ in range(6):
        num = random.randint(0, 9)
        code += str(num)
    context = {
        "code" : code
    }
    email_content = render_to_string('email.html', context)
    title = '[Dinory] 이메일 인증 안내'
    email = EmailMessage(title, email_content, to=[address])
    email.content_subtype = 'html'
    email.send()
    code = make_password(code)
    context["code"] = code
    serializer = AuthenticatecodeSerializer(data=context)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        pk = serializer.data['id']
        t1 = Thread(target=data_delete, args=(pk,))
        t1.start()
        return Response({'id' : pk}, status=status.HTTP_201_CREATED)
    
    return Response({'error' : '잘못된 데이터입니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def email_code_confirm(request):
    code = request.data.get('code')
    pk = request.data.get('id')
    Authenticate = get_object_or_404(Authenticatecode, pk=pk)
    if check_password(code, Authenticate.code):
        Authenticate.delete()
        return Response({'success' : '인증이 완료되었습니다.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error' : '인증코드가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
