from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# setting import
from django.conf import settings

# 발음평가
import urllib3
import json
import base64
import librosa
import soundfile


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def pronun_check(request):
    id = str(request.data.get('id'))
    # text = ('').join(request.data.get('text').split(' ')).lower()
    audioFilePath = request.data.get('soundfile')
    endpoint = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation"
    # mediaURL = getattr(settings, 'MEDIA_URL', 'MEDIA_URL')
    mediaROOTURL = getattr(settings, 'MEDIA_ROOT', 'MEDIA_ROOT')
    w, sr = librosa.load(audioFilePath, sr=16000) # w는 데이터 sr은 sampling rate
    soundfile.write(mediaROOTURL + '/proundata/'+ id + '.wav', w, 16000, format='WAV', endian='LITTLE', subtype='PCM_16') # pcm wav 파일저장

    file = open(mediaROOTURL + '/proundata/'+ id + '.wav', "rb")    
    audioContents = base64.b64encode(file.read()).decode("utf8")
    file.close()
    requestJson = {
        "access_key": getattr(settings, 'PRONUNCIATION_API_KEY', 'PRONUNCIATION_API_KEY'),
        "argument": {
            "language_code": "english",
            "audio": audioContents
        }
    }
    http = urllib3.PoolManager()
    response = http.request(
        "POST",
        endpoint,
        headers={"Content-Type": "application/json; charset=UTF-8"},
        body=json.dumps(requestJson)
    )
    
    data = json.loads(response.data.decode("utf-8", errors='ignore'))
    res = {
      'score': data['return_object']['score'],
      'recognized': data['return_object']['recognized']
    }
    if response.status == 200:
        return Response(res, status=status.HTTP_200_OK)
