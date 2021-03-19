from IC.image_captioning import CaptionModel
from TTS.tacotron import TTS_Model
from VC.voice_conversion import VC_Model
import cv2

class speak_image():
    def __init__(self):
        
        #initialize models
        self.caption_model = CaptionModel()
        self.tts_model = TTS_Model()        
        # self.vc_model = VC_Model()
        
        #setting path
        self.__img_path = None
        self.__captions_list = None
        self.__captions_selected = None

    # 이미지 불러오기
    def load_image(self):
        img = cv2.imread(self.__img_path, cv2.IMREAD_COLOR)
        cv2.imshow('result', img) 
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # 이미지로 부터 캡션 생성    
    def caption_image(self):
        result = self.caption_model.inference(self.__img_path)
        self.__captions_list = result
        del self.caption_model
        

    # 한가지 캡션 선택
    def select_caption(self):
        if self.__captions_list:
            self.__captions_selected = self.__captions_list[0]
            return
        

    # 선택한 캡션 음성으로 변환
    def text_to_speech(self,output_path):
        return self.tts_model.inference(self.__captions_selected, output_path)
        
    
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

    @property
    def caption(self):
        return self.__captions_selected
