import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__))+'/TTS/waveglow/')
sys.path.append(os.path.dirname(os.path.dirname(__file__))+'/TTS/')
import numpy as np
import torch

from model import Tacotron2
from data_utils import TacotronSTFT, STFT
from audio_processing import griffin_lim
from train import load_model
from text import text_to_sequence
from denoiser import Denoiser
from scipy.io.wavfile import write
import yaml

class TTS_Model:
    
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.dirname(__file__))
        with open('C:\\Users\\multicampus\\Desktop\\Projects\\special-subPJT1\\speak_image\\TTS\\config.yaml') as f:
            self.hparams = yaml.load(f)

        self.load_model()
    
    #Req. 4-1 모델 로드
    def load_model(self):
        
        # #### 1.학습된 모델 불러오기
        # 학습된 tacotron 모델 주소를 load하고
        # 모델에 hparam과 statedict를 load한다
        model = load_model(hparams)
        model.load_state_dict(torch.load(checkpoint_path)['state_dict'])
        

        ####TODO####
        _ = self.model.cuda().eval().half()
        
        #waveglow model load
        waveglow_path = "C:\\Users\\multicampus\\assets\\waveglow.pt"
        self.waveglow = torch.load(waveglow_path)['model']        
     
        self.waveglow.cuda().eval().half()
        for k in self.waveglow.convinv:
            k.float()
        self.denoiser = Denoiser(self.waveglow)

    
    
    def inference(self,text,output_path):
        output_path = output_path 
        
        #Req. 4-2 학습을 마친 이후 test할 수 있는 inference 코드 작성하기
        ####TODO#### 2.tacotron 모델로 mel-spectrogram을 생성 후 waveglow 모델로 waveform을 합성
        # text_to_sequence() 함수를 이용하여 text 전처리   => text_to_sequence(text, ['english_cleaners'])로 sequence 출력              
        # model로 mel_spectrogram예측
        
        pass
        
        ####TODO####
        
        #WaveGlow로 음성 합성하고 Waveform 저장하기
        with torch.no_grad():
            audio = self.waveglow.infer(mel_outputs_postnet, sigma=0.666)
        audio_denoised = self.denoiser(audio, strength=0.01)[:, 0]
                       
        write(output_path, rate=self.hparams['sampling_rate'], data=audio_denoised[0].data.cpu().numpy())
        return output_path
            

    
#Req. 4-2 학습을 마친 이후 test할 수 있는 inference 코드 작성하기    
####TODO####        
if __name__ == '__main__':
    pass
####TODO####        
