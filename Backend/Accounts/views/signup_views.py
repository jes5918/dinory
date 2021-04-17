# 회원가입
from ..models import User
from ..serializers import UserSerializer

from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.views import obtain_jwt_token

@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    if User.objects.filter(email=email).exists():
        return Response({'error' : '이미 가입된 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    password = request.data.get('password')
    password_confirmation = request.data.get('password_confirmation')
    if password != password_confirmation:
        return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

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

    pin_code = request.data.get('pin_code')
    pin_code_confirmation = request.data.get('pin_code_confirmation')

    if pin_code != pin_code_confirmation:
        return Response({'error' : 'pincode 가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if len(pin_code) < 6 or not pin_code.isdigit():
        return Response({'error': 'pin_code는 6자리 숫자만 허용됩니다.'}, status=status.HTTP_400_BAD_REQUEST)

    pin_code = make_password(pin_code)
    context = {
        'username' : request.data.get('username'),
        'email' : request.data.get('email'),
        'password' : request.data.get('password'),
        'pin_code' : pin_code
    }

    serializer = UserSerializer(data=context)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(context['password'])
        user.save()
        token = obtain_jwt_token(request._request).data['token']
        response_context = {
            'username' : request.data.get('username'),
            'token' : token
        }
        return Response(response_context, status=status.HTTP_201_CREATED)
    else:
        return Response({'error' : '유효하지 않습니다.'}, status=status.HTTP_409_CONFLICT)

