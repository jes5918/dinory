from wordcloud import WordCloud
import matplotlib.pyplot as plt
import io
import urllib, base64

from Accounts.models import Child
from Notes.models import Word
from Notes.serializers import WordStateSerializer

from django.shortcuts import get_object_or_404
from django.db.models import Avg, Sum

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication



@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def word_used_rate(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    total = Word.objects.filter(child=child, state=False).aggregate(Sum('count'))
    average = Word.objects.filter(child=child, state=False).aggregate(Avg('count'))
    words = Word.objects.filter(child=child, state=False).order_by('-count')[:3]
    serializer = WordStateSerializer(words, many=True)
    for s in serializer.data:
        rate = (s['count'] / total['count__sum']) * 100
        s['rate'] = rate
    context = {
        'words' : serializer.data,
        'total' : total['count__sum'],
        'average' : average['count__avg']
    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def word_used_cloud(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    words = Word.objects.filter(child=child, state=False)
    serializer = WordStateSerializer(words, many=True)
    text = ""
    for s in serializer.data:
        text += (s['content'] + ' ') * s['count']
    wordcloud = WordCloud(background_color='white').generate(text)
    plt.imshow(wordcloud, interpolation='lanczos') #이미지의 부드럽기 정도
    plt.axis('off') #x y 축 숫자 제거
    image = io.BytesIO()
    plt.savefig(image, format='png')
    image.seek(0)
    string = base64.b64encode(image.read())
    image_64 = 'data:image/png;base64,' + urllib.parse.quote(string)
    context = {
        'img' : image_64
    }
    return Response(context, status=status.HTTP_200_OK)
