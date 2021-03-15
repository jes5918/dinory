# import json
# import requests
# from pprint import pprint 
# #https://textgears.com/api
# with open('config.json', 'r') as f: # API key 보호
#     config = json.load(f)

# baseURL = 'https://api.textgears.com'
# accessKey = config["GRAMMERCHECK_API_KEY"] # API key

# def grammer_check(text):
#   response = requests.get(
#       url='https://api.textgears.com/check.php',
#       params = {
#         'text' : '{}'.format(text),
#         'key': '{}'.format(accessKey)
#       }
#   )
#   print("[responseCode] " + str(response))
#   print("[responBody]")
#   print("===== 결과 확인 ====")
#   pprint(response.json())  

# grammer_check("my apples am engineer")