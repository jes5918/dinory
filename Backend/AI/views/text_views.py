from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# setting import
from django.conf import settings

# text_to_speech
import xml.etree.ElementTree as ET
import azure.cognitiveservices.speech as speechsdk



@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def text_to_speech(request):
    text = request.data.get('text')
    for content in text:
        if ord('ㄱ') <= ord(content) <= ord('힣'):
            return Response({'error' : '한글은 작성할 수 없습니다'}, status=status.HTTP_400_BAD_REQUEST)
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
        {
            'name': 'en-US-AriaRUS',
            'pitch': '30%',
            'rate': '-30%'
        }
    ]
    
    mediaURL = getattr(settings, 'MEDIA_URL', 'MEDIA_URL')
    mediaROOTURL = getattr(settings, 'MEDIA_ROOT', 'MEDIA_ROOT')
    speech_key, service_region = getattr(settings, 'MS_API_KEY', 'MS_API_KEY'), "koreacentral"
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

    speech_config.set_speech_synthesis_output_format(speechsdk.SpeechSynthesisOutputFormat["Riff16Khz16BitMonoPcm"])
    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)
    
    speak = ET.Element('speak')
    speak.set('version', '1.0')
    speak.set('xmlns', 'https://www.w3.org/2001/10/synthesis')
    speak.set('xml:lang', 'en-US')
    voice = ET.SubElement(speak, 'voice')
    voice.set('name', voice_index[voice_num]['name'])
    prosody = ET.SubElement(voice, 'prosody')
    prosody.set('rate', voice_index[voice_num]['rate'])
    prosody.set('pitch', voice_index[voice_num]['pitch'])
    prosody.text = text

    mydata = ET.tostring(speak).decode("utf-8")
    result = synthesizer.speak_ssml_async(mydata).get()

    stream = speechsdk.AudioDataStream(result)
    temp = ('').join(text.split(' ')).lower()
    temp2 = ('').join(temp.split('.'))
    stream_path = mediaROOTURL+ '/tts_basic/' + temp2 + '.wav'
    
    # Checks result.
    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        stream.save_to_wav_file(stream_path)
        print("complete")
        return Response({'filepath' : mediaURL+'tts_basic/' + temp2 + '.wav'}, status=status.HTTP_200_OK)
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech synthesis canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                print("Error details: {}".format(cancellation_details.error_details))
        print("Did you update the subscription info?")
        return Response({'error' : '서버 에러입니다.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    return Response({'error' : '서버 에러입니다.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)