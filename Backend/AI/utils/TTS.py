# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE.md file in the project root for full license information.

import azure.cognitiveservices.speech as speechsdk
import json


with open('config.json', 'r') as f: # API key 보호
    config = json.load(f)

openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation"
accessKey = config["MS_API_KEY"] # API key

speech_key, service_region = accessKey, "koreacentral"
speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

speech_config.set_speech_synthesis_output_format(speechsdk.SpeechSynthesisOutputFormat["Riff24Khz16BitMonoPcm"])
synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)

ssml_string = open("ssml.xml", "r").read()
result = synthesizer.speak_ssml_async(ssml_string).get()

stream = speechsdk.AudioDataStream(result)
stream.save_to_wav_file("./file.wav")

# Checks result.
if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("complete")
    # print("Speech synthesized to speaker for text [{}]".format(ssml_string))
elif result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print("Speech synthesis canceled: {}".format(cancellation_details.reason))
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        if cancellation_details.error_details:
            print("Error details: {}".format(cancellation_details.error_details))
    print("Did you update the subscription info?")
