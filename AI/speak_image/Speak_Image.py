from IC.image_captioning import CaptionModel
from TTS.tacotron import TTS_Model
from VC.voice_conversion import VC_Model


class speak_image():
    def __init__(self):
        
        #initialize models
        self.caption_model = CaptionModel()
        self.tts_model = TTS_Model()        
        self.vc_model = VC_Model()
        
    # 이미지 불러오기
    def load_image(self):
        pass
    # 이미지로 부터 캡션 생성    
    def caption_image(self):
        pass
    # 한가지 캡션 선택
    def select_caption(self):
        pass
    # 선택한 캡션 음성으로 변환
    def text_to_speech(self,output_path):
        pass
    
    # 변활할 목소리 불러오기
    def load_voice(self):
        pass
    
    # 목소리 변환하기
    def convert_voice(self,src_path, tar_voice_path, output_path):
        pass
    
    @property
    def img_path(self):
        return self.__img_path
    
    @img_path.setter
    def img_path(self, img_path):
        self.__img_path = img_path

    @property
    def captions_list(self):
        return self.__captions_list
