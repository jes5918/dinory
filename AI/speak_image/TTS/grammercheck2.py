import requests
import json
from pprint import pprint

with open('config.json', 'r') as f: # API key 보호
    config = json.load(f)
accessKey = config["GRAMMARBOT_API_KET"] # API key

def grammarbot(text):
  url = "https://grammarbot.p.rapidapi.com/check"

  payload = {
    'text': text,
    'language':'en-US'
  }
  headers = {
    'content-type': "application/x-www-form-urlencoded",
    'x-rapidapi-key': accessKey,
    'x-rapidapi-host': "grammarbot.p.rapidapi.com"
  }

  response = requests.request("POST", url, data=payload, headers=headers)

  pprint(response.json()['matches'])
