# 중복조회, 일치 조회 
from ..models import User

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def pin_check(request):
    pin_code = User.objects.filter(username=request.user).values('pin_code')[0]['pin_code']
    input_pin = request.data.get('pin_code')
    if pin_code == input_pin:
        return Response({'success' : '핀 번호가 일치합니다.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error' : '핀 번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def email_check(request):
    # data_delete()
    address = request.data.get('email')
    if User.objects.filter(email=address).exists():
        return Response({'error' : '이미 가입된 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'success': '사용가능한 이메일입니다.'})

@api_view(['POST'])
def user_check(request):
    username = request.data.get('username')
    if User.objects.filter(username=username).exists():
        return Response({'error' : '존재하는 아이디입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'success' : '사용가능한 아이디입니다.'}, status=status.HTTP_200_OK)
