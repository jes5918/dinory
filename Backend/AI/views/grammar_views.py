from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# setting import
from django.conf import settings

# 문법체크
import requests

GRAMMAR_API_KEY= getattr(settings, 'GRAMMAR_API_KEY', 'GRAMMAR_API_KEY')

class GingerIt(object):
    def __init__(self):
        self.url = "https://services.gingersoftware.com/Ginger/correct/jsonSecured/GingerTheTextFull"
        self.api_key = GRAMMAR_API_KEY
        self.api_version = "2.0"
        self.lang = "US"

    def parse(self, text, verify=True):
        session = requests.Session()
        request = session.get(
            self.url,
            params={
                "lang": self.lang,
                "apiKey": self.api_key,
                "clientVersion": self.api_version,
                "text": text,
            },
            verify=verify,
        )
        data = request.json()
        return self._process_data(text, data)

    @staticmethod
    def _change_char(original_text, from_position, to_position, change_with):
        return "{}{}{}".format(
            original_text[:from_position], change_with, original_text[to_position + 1 :]
        )

    def _process_data(self, text, data):
        result = text
        corrections = []

        for suggestion in reversed(data["Corrections"]):
            start = suggestion["From"]
            end = suggestion["To"]

            if suggestion["Suggestions"]:
                suggest = suggestion["Suggestions"][0]
                result = self._change_char(result, start, end, suggest["Text"])

                corrections.append(
                    {
                        "start": start,
                        "text": text[start : end + 1],
                        "correct": suggest.get("Text", None),
                        "definition": suggest.get("Definition", None),
                    }
                )

        return {"text": text, "result": result, "corrections": corrections}


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def gramar_check_v1(request):
    text = request.data.get('text')
    for content in text:
        if ord('ㄱ') <= ord(content) <= ord('힣'):
            return Response({'error': '한글은 작성할 수 없습니다'}, status=status.HTTP_400_BAD_REQUEST)
    if text:
        url = "https://grammarbot.p.rapidapi.com/check"
        payload = {
          'text': text,
          'language':'en-US'
        }
        headers = {
          'content-type': "application/x-www-form-urlencoded",
          'x-rapidapi-key': getattr(settings, 'GRAMMARBOT_API_KEY', 'GRAMMARBOT_API_KEY'),
          'x-rapidapi-host': "grammarbot.p.rapidapi.com"
        }
        result = requests.request("POST", url, data=payload, headers=headers)
        j = result.json()
        new_text = ''
        cursor = 0
        res = []
        for match in j["matches"]:
            offset = match["offset"]
            length = match["length"]
            if cursor > offset:
                continue
            new_text += text[cursor:offset]
            repls = match["replacements"]
            if repls and len(repls) > 0:
                new_text += repls[0]["value"]
                temp = {
                    "offset": match["offset"],
                    "length": match["length"],
                    'replacements': match["replacements"][0]["value"],
                    'message': match["message"],
                    'shortMessage': match["shortMessage"]
                }
            cursor = offset + length
            res.append(temp)
            
        if cursor < len(text):
            new_text += text[cursor:]
        context = {
            'result':new_text, 
            'data':res,
            'all':j
        }

        return Response(context, status=status.HTTP_200_OK)
    else:
        return Response({'error': '텍스트를 보내시지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def gramar_check_v2(request):
    text = request.data.get('text')
    for content in text:
        if ord('ㄱ') <= ord(content) <= ord('힣'):
            return Response({'error' : '한글은 작성할 수 없습니다'}, status=status.HTTP_400_BAD_REQUEST)
    parser = GingerIt()
    try:
        result = parser.parse(text)
    except:
        return Response({'error': 'parser error'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(result, status=status.HTTP_200_OK)
    