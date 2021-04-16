from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import VocaSerializer
from .models import Voca
from Accounts.models import Child
from Notes.models import Sentence, Word, WordToSentence
from Notes.serializers import WordToSentenceSerializer, SentenceSerializer

from googletrans import Translator
import random
# Create your views here.
trans = Translator()

@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def word_read(request, word):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    if not Voca.objects.filter(user=request.user, child=child, content=word).exists():
        return Response({'error' : '저장되지 않은 단어입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    voca = get_object_or_404(Voca, child=child, content=word)
    serializer = VocaSerializer(voca)
    sentence = '작성된 문장이 없습니다.'
    if Word.objects.filter(child=child, content=word).exists():
        w = get_object_or_404(Word, child=child, content=word)
        n = len(WordToSentence.objects.filter(word=w))
        num = random.randint(0, n-1)
        between = WordToSentence.objects.filter(word=w)[num]
        between_serializer = WordToSentenceSerializer(between)
        sentence_id = between_serializer.data['sentence']
        sentence = Sentence.objects.filter(child=child, id=sentence_id).values('content')[0]['content']
    else:
        result = trans.translate(word, dest='ko').extra_data
        if result['examples'] and result['examples'][0][0][0]:
            sentence = result['examples'][0][0][0]
    context = serializer.data
    context['sentence'] = sentence
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def word_create_read(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    if request.method == 'POST':
        context = []
        for data in request.data['DATA']:
            word = data.get('content')
            if Voca.objects.filter(content=word, child=child).exists():
                continue
            context.append(word)
            serializer = VocaSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user, child=child)
        return Response(context, status=status.HTTP_201_CREATED)
    else:
        if request.GET.get('alphabet'):
            alphabet = request.GET.get('alphabet').lower()
        voca = Voca.objects.filter(content__startswith=alphabet, child=child).order_by('content')
        serializer = VocaSerializer(voca, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
