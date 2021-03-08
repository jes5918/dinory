#Req. 4-1 Test용 inference 코드 구조 이해
import torch
import numpy as np
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__))+'/VC/')
import torch.nn as nn
import torch.nn.functional as F
import yaml
import pickle

from VC.utils import *
from functools import reduce
import json
from collections import defaultdict
from torch.utils.data import Dataset
from torch.utils.data import TensorDataset
from torch.utils.data import DataLoader
from argparse import ArgumentParser, Namespace
from scipy.io.wavfile import write
import random
import librosa 
from VC.model import AE
from VC.preprocess.audio2mel import Audio2Mel

#Req. 4-2 VC_Model() 클래스 구현
class VC_Model(object):
    
    #Req. 4-3 VC_Model() 클래스 초기화
    ####TODO#### 1.Inferencer() 클래스를 초기화하는 __init__() 함수 구현
    def __init__(self):
        # config.yaml 불러오고 정의
        
        # build_model()함수 호출하여 모델 정의
        
        # Audio2Mel 인스턴스 정의
        
        # MelGAN 보코더 인스턴스 정의
        
        # mel-spectrogram의 평균과 분산 load
        attr_path = '/home/multicam/multicam_project/speak_image/VC/preprocessed/attr.pkl'
        with open(attr_path, 'rb') as f:
            self.attr = pickle.load(f)    
    ####TODO#### 
      

    def get_default_device(self):
        if torch.cuda.is_available():
            return "cuda"
        else:
            return "cpu"
        
    def utt_make_frames(self, x):

        frame_size = self.config['data_loader']['frame_size']
        remains = x.size(0) % frame_size 

        if remains != 0:
            x = F.pad(x, (0, remains))
        out = x.view(1, x.size(0) // frame_size, frame_size * x.size(1)).transpose(1, 2)

        return out
    
    def denormalize(self, x):
        m, s = self.attr['mean'], self.attr['std']
        ret = x * s + m
        return ret

    def normalize(self, x):
        m, s = self.attr['mean'], self.attr['std']
        ret = (x - m) / s
        return ret
        
    #Req. 4-4 build_model() 함수 구현
    ####TODO#### 2.학습된 모델을 불러오는 build_model() 함수 구현
    def build_model(self, model): 
        pass
        # 모델 생성하고 config 파일을 load, gpu에 올림
        
        # 모델을 evaluation 모드로 전환
        
        # load_state_dict를 이용하여 학습된 VC 모델의 checkpoint load
        
        return
    ####TODO####
    
    #Req. 4-5 convert_file() 함수 구현
    ####TODO#### 3. waveform을 mel-spectrogram으로 변환하는 convert_file() 함수 구현
    def convert_file(self,path):
        pass
    ####TODO####
    
    
    #Req. 4-6 melgan() 함수 구현
    ####TODO#### 4. mel-spectrogram을 waveform으로 변환하는 melgan() 함수 구현
    def melgan(self,mel, output_path):                
       pass
    ####TODO####
    
    #Req. 4-7 inference_one_utterance() 함수 구현
    ####TODO#### 5. 두 음성의 mel-spectrogram을 바탕으로 변환된 목소리를 생성하는 inference_one_utterance() 함수 구현
    def inference_one_utterance(self, x, x_cond, output_path):
        pass
        # self.utt_make_frames() 함수로 두개의 mel-spectrogram을 VC 모델 입력에 맞게 변경
        
        # VC 모델의 inference() 함수로 변환된 음성의 mel-spectrogram 생성
       
        
        # 생성된 mel-spectrogram을 [x,80] shape의 numpy ndarray로 변환한 뒤 denormalize() 함수로 전달       
        
        #denormalize된 값을 다시 [1,80,x] shape의 torch tensor로 변환한 뒤 melgan() 함수에 값 전달

    ####TODO####
        

    
    #Req. 4-8 inference() 함수 구현
    ####TODO#### 6. 두 음성의 주소를 받아 inference를 준비하는  inference_from_path() 함수 구현
    def inference(self, src_path, tar_path, output_path):
        pass
        # self.convert_file() 함수로 두가지 입력 음성을 mel-spectrogram으로 변환


        # self.normalize() 함수로 두 mel-spectrogram을 normalize 한 뒤 torch tensor로 변환

        # self.inference_one_utterance() 함수 호출
        
        return output_path
    ####TODO####

    
##제공##    
if __name__ == '__main__':
    src_path = './source_audio.wav'
    tar_path = './target_audio.wav'
    output = './output.wav'
    
    inferencer = VC_Model()
    output=inferencer.inference(src_path,tar_path,output)
##제공##
