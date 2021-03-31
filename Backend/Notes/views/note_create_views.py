import os

from ..models import Diary, Note, Sentence, Word
from Accounts.models import Child
from ..serializers import DiarySerializer, WordSerializer, WordToSentenceSerializer, SentenceSerializer

from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from googletrans import Translator
trans = Translator()

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stopwords')
n = WordNetLemmatizer()
pos_list = {
    'JJ' : 'a',
    'JJR' : 'a',
    'JJS' : 'a',
    'NN' : 'n',
    'NNS' : 'n',
    'NNP' : 'n',
    'NNPS' : 'n',
    'PRP' : 'n',
    'PRP$' : 'n',
    'RBR' : 'a',
    'RBS' : 'a',
    'VB' : 'v',
    'VBD' : 'v',
    'VBG' : 'v',
    'VBN' : 'v',
    'VBP' : 'v',
    'VBZ' : 'v',
}
stop_word = set(stopwords.words('english'))

@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def diary_create(request):
    child = get_object_or_404(Child, parent=request.user, pk=request.GET.get('child'))
    diary_content = request.data.get('content')
    for content in diary_content:
        if ord('ㄱ') <= ord(content) <= ord('힣'):
            return Response({'error' : '한글은 작성할 수 없습니다'}, status=status.HTTP_400_BAD_REQUEST)
    year = request.data.get('year')
    month = request.data.get('month')
    vol = str(year) + str(month)
    vol = int(vol)
    img = request.data.get('img')
    if Note.objects.filter(vol=vol, child=child).exists():
        note = get_object_or_404(Note, vol=vol, child=child)
        if note.img.path in settings.MEDIA_ROOT:
            print('hello;;')
            os.remove(os.path.join(settings.MEDIA_ROOT, note.img.path))
        note.count += 1
        note.img = img
        note.save()
    else:
        note = Note.objects.create(vol=vol, user=request.user, child=child, img=img, count=1, year=year, month=month)
    serializer = DiarySerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(note=note)
        diary_id = serializer.data['id']
        diary_except_img = get_object_or_404(Diary, id=diary_id)
        diary_except_img.img = img
        diary_except_img.save()

        contents = request.data.get('content')
        content_list = sent_tokenize(contents)
        for content in content_list:
            if Sentence.objects.filter(child=child, content=content).exists():
                sentence = get_object_or_404(Sentence, child=child, content=content)
                sentence_serializer = SentenceSerializer(sentence)
            else:
                context = {
                    'content' : content,
                }
                sentence_serializer = SentenceSerializer(data=context)
                if sentence_serializer.is_valid(raise_exception=True):
                    sentence_serializer.save(user=request.user, child=child)
            words = word_tokenize(content)
            words_list = []
            for word in words:
                if len(word) > 1 and word.isalpha():
                    W = word.lower()
                    words_list.append(W)
            words_list = nltk.pos_tag(words_list)
            for word in words_list:
                if word[1] in pos_list:
                    word_checked = n.lemmatize(word[0], pos_list[word[1]])
                else:
                    word_checked = n.lemmatize(word[0], 'r')
                if word_checked in stop_word:
                    state = True
                else:
                    state = False
                if Word.objects.filter(child=child, content=word_checked).exists():
                    filtered_word = get_object_or_404(Word, child=child, content=word_checked)
                    filtered_word.count += 1
                    filtered_word.save()
                    word_serializer = WordSerializer(filtered_word)
                    word_id = word_serializer.data['id']
                else:
                    context = {
                        'content' : word_checked,
                        'count' : 1,
                        'state' : state
                    }
                    word_serializer = WordSerializer(data=context)
                    if word_serializer.is_valid(raise_exception=True):
                        word_serializer.save(user=request.user, child=child)
                        word_id = word_serializer.data['id']
                sentence_id = sentence_serializer.data['id']
                context = {
                    'sentence' : sentence_id,
                    'word' : word_id
                }
                between_serializer = WordToSentenceSerializer(data=context)
                if between_serializer.is_valid(raise_exception=True):
                    between_serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)