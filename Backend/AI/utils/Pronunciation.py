#-*- coding:utf-8 -*-
import urllib3
import json
import base64
import librosa
import soundfile
from pprint import pprint

with open('config.json', 'r') as f: # API key 보호
    config = json.load(f)

openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation"
accessKey = config["PRONUNCIATION_API_KEY"] # API key
audioFilePath = "data/mm1.m4a" # audio 파일
languageCode = "english"
# script = "Hello my name is Dho Gyun. what's your name."
# script = "I am applying for a position at Marketing Department of your company."
script = "I would like to contribute in planning and maintaining your homepage"

w, sr = librosa.load(audioFilePath, sr=16000) # w는 데이터 sr은 sampling rate
soundfile.write('data/temp.wav', w, 16000, format='WAV', endian='LITTLE', subtype='PCM_16') # pcm wav 파일저장

file = open("data/temp.wav", "rb")    
audioContents = base64.b64encode(file.read()).decode("utf8")
file.close()

requestJson = {
    "access_key": accessKey,
    "argument": {
        "language_code": languageCode,
        # "script": script, # 참조 스크립트 option임
        "audio": audioContents
    }
}
 
http = urllib3.PoolManager()
response = http.request(
    "POST",
    openApiURL,
    headers={"Content-Type": "application/json; charset=UTF-8"},
    body=json.dumps(requestJson)
)
 
print("[responseCode] " + str(response.status))
print("[responBody]")
print("===== 결과 확인 ====")
data = json.loads(response.data.decode("utf-8", errors='ignore'))
print(data['return_object'])    
print('확인된 음성 :', data['return_object']['recognized'])
print('100점 만점에', round(data['return_object']['score'] * 20, 3), '점')