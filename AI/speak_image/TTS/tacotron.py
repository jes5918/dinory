import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__))+'/TTS/waveglow/')
sys.path.append(os.path.dirname(os.path.dirname(__file__))+'/TTS/')
import numpy as np
import torch

# from model import Tacotron2
# from data_utils import TacotronSTFT, STFT
# from audio_processing import griffin_lim
# from train import load_model
from text import text_to_sequence
from denoiser import Denoiser
from scipy.io.wavfile import write
import yaml

class TTS_Model:
    
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.dirname(__file__))
        with open('./config.yaml') as f:
            self.hparams = yaml.safe_load(f)

    
    #Req. 4-1 모델 로드
    def load_model(self):
        # #### 1.학습된 모델 불러오기
        # 학습된 tacotron 모델 주소를 load하고
        # 모델에 hparam과 statedict를 load한다
        # checkpoint_path = './checkpoints/tts_checkpoints/checkpoint_4500'
        # self.model = load_model(self.hparams)
        # self.model.load_state_dict(torch.load(checkpoint_path)['state_dict'])
        # _ = self.model.cuda().eval()

        self.model = torch.hub.load('nvidia/DeepLearningExamples:torchhub', 'nvidia_tacotron2')
        self.model.cuda().eval()

        #waveglow model load
        # self.waveglow = torch.load('C:\\Users\\multicampus\\assets\\waveglow.pt')
        self.waveglow = torch.hub.load('nvidia/DeepLearningExamples:torchhub', 'nvidia_waveglow')
        self.waveglow = self.waveglow.remove_weightnorm(self.waveglow)
        self.waveglow.cuda().eval()
        for k in self.waveglow.convinv:
            k.float()
        self.denoiser = Denoiser(self.waveglow)

    
    
    def inference(self,text,output_path):
        sequence = np.array(text_to_sequence(text, ['english_cleaners']))[None, :]
        sequence = torch.from_numpy(sequence).to(device='cuda', dtype=torch.int64)
        with torch.no_grad():
            _, mel, _, _ = self.model.infer(sequence)
            audio = self.waveglow.infer(mel, sigma=0.666)
        audio_denoised = self.denoiser(audio, strength=0.01)[:, 0]
                       
        write(output_path, rate=self.hparams['sampling_rate'], data=audio_denoised[0].data.cpu().numpy())
        return output_path
            

    
   
if __name__ == '__main__':
    tts = TTS_Model()
    print("0")
    tts.load_model()
    print("1")
    text = 'apple'
    output = tts.inference(text, "output1.wav")
    print("222")
    text = 'indoor'
    output = tts.inference(text, "output2.wav")
    print("3333333")
    text = 'It is better to fail in originality'
    output = tts.inference(text, "output3.wav")
    print("44444444444")
    text = 'It is better to fail in originality than to succeed in imitation.'
    output = tts.inference(text, "output4.wav")
