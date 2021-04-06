from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# setting import
from django.conf import settings

# image captioning
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials

# text to speech
import azure.cognitiveservices.speech as speechsdk
import xml.etree.ElementTree as ET
import uuid
import requests
import os.path

# TTS docker container connection
import requests
import io
import soundfile as sf

@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def image_caption(request):
    voice_num = int(request.data.get('num'))
    voice_index = [
        {
            'name': 'en-US-AriaRUS',
            'pitch': '-10%',
            'rate': '-10%'
            }, 
        {
            'name': 'en-US-ZiraRUS',
            'pitch': '20%',
            'rate': '-10%'
            },
        {
            'name': 'en-US-GuyRUS',
            'pitch': '10%',
            'rate': '-20%'
            },
        {
            'name': 'en-US-BenjaminRUS',
            'pitch': '20%',
            'rate': '-20%'
            },
    ]
    
    mediaURL = getattr(settings, 'MEDIA_URL', 'MEDIA_URL')
    mediaROOTURL = getattr(settings, 'MEDIA_ROOT', 'MEDIA_ROOT')
    speech_key, service_region = getattr(settings, 'MS_API_KEY', 'MS_API_KEY'), "koreacentral"
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

    speech_config.set_speech_synthesis_output_format(speechsdk.SpeechSynthesisOutputFormat["Riff16Khz16BitMonoPcm"])
    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)
    
    if voice_num != 4:
        speak = ET.Element('speak')
        speak.set('version', '1.0')
        speak.set('xmlns', 'https://www.w3.org/2001/10/synthesis')
        speak.set('xml:lang', 'en-US')
        voice = ET.SubElement(speak, 'voice')
        voice.set('name', voice_index[voice_num]['name'])
        prosody = ET.SubElement(voice, 'prosody')
        prosody.set('rate', voice_index[voice_num]['rate'])
        prosody.set('pitch', voice_index[voice_num]['pitch'])
    
    try:
        img = request.data.get('img')
    except:
        return Response({'error': '이미지 잘못 들어왔어요'}, status=status.HTTP_400_BAD_REQUEST)
        
    MSVS_API_KEY = getattr(settings, 'MSVS_API_KEY', 'MSVS_API_KEY')
    endpoint = "https://jes5918.cognitiveservices.azure.com/"
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(MSVS_API_KEY))
    try:
        tags_result_remote = computervision_client.tag_image_in_stream(img)
    except:
        return Response({'error': '이미지 파일 형식을 확인하세요.'}, status=status.HTTP_400_BAD_REQUEST)

    if (len(tags_result_remote.tags) == 0):
        return Response({'error' : '생성된 태그가 없습니다.'}, status=status.HTTP_400_NOT_FOUND)
    else:
        captiontags = []
        body = []
        for idx, tag in enumerate(tags_result_remote.tags):
            if idx == 8:
                break
            if voice_num == 4:
                dockerUrl = "http://j4b105.p.ssafy.io:5002/api/tts?text=" + tag.name
                responseData = requests.request("GET", dockerUrl)
                data, samplerate = sf.read(io.BytesIO(responseData.content))
                stream_path = mediaROOTURL+ '/tts_basic/' + str(voice_num) + tag.name + '.wav'
                sf.write(stream_path, data, samplerate)
                for i in range(4):
                    if i == voice_num:
                        continue
                    stream_path2 = mediaROOTURL+ '/tts_basic/' + str(i) + tag.name + '.wav'
                    if not os.path.isfile(stream_path2):
                        sf.write(stream_path2, data, samplerate)
            else:
                prosody.text = tag.name
                mydata = ET.tostring(speak).decode("utf-8")
                result = synthesizer.speak_ssml_async(mydata).get()

                stream = speechsdk.AudioDataStream(result)
                stream_path = mediaROOTURL+ '/tts_basic/' + str(voice_num) + tag.name + '.wav'
                
                # Checks result.
                if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
                    stream.save_to_wav_file(stream_path)
                    for i in range(4):
                        if i == voice_num:
                            continue
                        stream_path2 = mediaROOTURL+ '/tts_basic/' + str(i) + tag.name + '.wav'
                        if not os.path.isfile(stream_path2):
                            stream.save_to_wav_file(stream_path2)
                elif result.reason == speechsdk.ResultReason.Canceled:
                    cancellation_details = result.cancellation_details
                    print("Speech synthesis canceled: {}".format(cancellation_details.reason))
                    if cancellation_details.reason == speechsdk.CancellationReason.Error:
                        if cancellation_details.error_details:
                            print("Error details: {}".format(cancellation_details.error_details))
                    print("Did you update the subscription info?")
                    return Response({'error' : 'voice tts error please retry'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

            captiontags.append({
                'content': tag.name, 
                'filepath': mediaURL+'tts_basic/' + str(voice_num) + tag.name + '.wav', 
                'checked': False
            })
            body.append({'text': tag.name})

        endpoint = "https://api.cognitive.microsofttranslator.com/dictionary/lookup"
        params = {
            'api-version': '3.0',
            'from': 'en',
            'to': 'ko'
        }
        headers = {
            'Ocp-Apim-Subscription-Key': getattr(settings, 'MSTR_API_KEY', 'MSTR_API_KEY'),
            'Ocp-Apim-Subscription-Region': "koreacentral",
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }
        try:
            request = requests.post(endpoint, params=params, headers=headers, json=body)
        except:
            return Response({'error' : '번역에 에러가 발생'}, status=status.HTTP_400_BAD_REQUEST)
        response = request.json()
        posIndex = {
            'ADJ': '형용사',
            'ADV': '부사',
            'CONJ': '접속사',
            'DET': '한정사',
            'MODAL': '동사',
            'NOUN': '명사',
            'PREP': '전치사',
            'PRON': '대명사', 
            'VERB': '동사',
            'OTHER': '기타',
        }
        remove_idx = []
        for i in range(len(body)):
            try:
                captiontags[i]["mean"] = response[i]["translations"][0]["displayTarget"]
                captiontags[i]["part"] = posIndex[response[i]["translations"][0]["posTag"]]
                if captiontags[i]["content"] == captiontags[i]["mean"]:
                    remove_idx.append(i)
            except:
                remove_idx.append(i)
                captiontags[i]["mean"] = "nottrans"
                captiontags[i]["part"] = "nottrans"
        captiontags_res = []
        for idx, c in enumerate(captiontags):
            if idx in remove_idx:
                continue
            captiontags_res.append(c)
        
        return Response({'data' : captiontags_res}, status=status.HTTP_200_OK)
