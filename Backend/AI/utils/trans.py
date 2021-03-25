import requests, uuid, json

with open('config.json', 'r') as f: # API key 보호
    config = json.load(f)
accessKey = config["MSTR_API_KEY"] # API key

subscription_key = accessKey
endpoint = "https://api.cognitive.microsofttranslator.com"

location = "koreacentral"

path = '/dictionary/lookup'
constructed_url = endpoint + path

params = {
    'api-version': '3.0',
    'from': 'en',
    'to': 'ko'
}
constructed_url = endpoint + path

headers = {
    'Ocp-Apim-Subscription-Key': subscription_key,
    'Ocp-Apim-Subscription-Region': location,
    'Content-type': 'application/json',
    'X-ClientTraceId': str(uuid.uuid4())
}

# You can pass more than one object in body.
body = [{
    'text': 'shrimp'
},{
    'text': 'apple'
}]
request = requests.post(constructed_url, params=params, headers=headers, json=body)
response = request.json()

print(json.dumps(response, sort_keys=True, ensure_ascii=False, indent=4, separators=(',', ': ')))
print(response[0]["translations"][0]["confidence"])
print(response[0]["translations"][0]["displayTarget"])
print(response[0]["translations"][0]["posTag"])