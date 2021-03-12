


#-*- coding:utf-8 -*-
import urllib3
import json
import base64
 
with open('config.json', 'r') as f:
    config = json.load(f)

openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation"
accessKey = config["PRONUNCIATION_API_KEY"]
audioFilePath = "./output4.mp3"
languageCode = "english"
script = "when shall i pay for it now or at check out time."

file = open(audioFilePath, "rb")
audioContents = base64.b64encode(file.read()).decode("utf8")
file.close()
 
requestJson = {
    "access_key": accessKey,
    "argument": {
        "language_code": languageCode,
        "script": script,
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
print(str(response.data,"utf-8"))                 