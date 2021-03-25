from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials

from array import array
import os
from PIL import Image
import sys
import time
import json

with open('config.json', 'r') as f:
    config = json.load(f)

subscription_key = config["MSVS_API_KEY"]
endpoint = "https://jes5918.cognitiveservices.azure.com/"
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

remote_image_url = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/landmark.jpg"
local_image = open('./test4.jpg',"rb")

# print("===== Describe an image - remote =====")
# # description_results = computervision_client.describe_image(remote_image_url)
# description_results = computervision_client.describe_image_in_stream(local_image)
# print(description_results)
# print("Description of remote image: ")
# if (len(description_results.captions) == 0):
#     print("No description detected.")
# else:
#     for caption in description_results.captions:
#         print("'{}' with confidence {:.2f}%".format(caption.text, caption.confidence * 100))

'''
Tag an Image - remote
This example returns a tag (key word) for each thing in the image.
'''
print("===== Tag an image - remote =====")
# Call API with remote image
tags_result_remote = computervision_client.tag_image_in_stream(local_image)

# Print results with confidence score
print("Tags in the remote image: ")
if (len(tags_result_remote.tags) == 0):
    print("No tags detected.")
else:
    for tag in tags_result_remote.tags:
        print("'{}' with confidence {:.2f}%".format(tag.name, tag.confidence * 100))