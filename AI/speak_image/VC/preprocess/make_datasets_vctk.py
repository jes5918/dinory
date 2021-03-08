#Req. 1-1 제공된 코드에 대한 이해
import pickle 
import librosa 
import sys
import glob 
import random
import os
from collections import defaultdict
import re
import numpy as np
import json
from audio2mel import Audio2Mel
import torch

#Req. 1-2 Convert_file 함수 구현
####TODO#### waveform을 mel-spectrogram으로 변환하는 convert_file() 함수 구현  
def convert_file(path):
    pass
    #librosa로 samplerate-22050 waveform load    
    
    # librosa 라이브러리 내장 함수를 활용하여 일정 데시벨(ex. 15dB) 이하의 값 제거
    
    # load한 waveform을 torch tensor로 변환, [1,1,x] shape으로 변환
    
    # Audio2Mel 클래스를 활용하여 mel spectrogram 생성하고 [x,80] shape로 만들어 준 뒤 np.float32 값으로 변환 후 반환
    
####TODO####  


#학습을 위한 데이터셋의 스피커 정보 
def read_speaker_info(speaker_info_path):
    speaker_ids = []
    with open(speaker_info_path, 'r') as f:
        for i, line in enumerate(f):
            if i == 0:
                continue
            speaker_id = line.strip().split()[0]
            speaker_ids.append(speaker_id)
    return speaker_ids

# 데이터셋의 파일 이름 저장
def read_filenames(root_dir):
    speaker2filenames = defaultdict(lambda : [])
    for path in sorted(glob.glob(os.path.join(root_dir, '*/*'))):
        filename = path.strip().split('/')[-1]
        speaker_id, utt_id = re.match(r'p(\d+)_(\d+)\.wav', filename).groups()
        speaker2filenames[speaker_id].append(path)
    return speaker2filenames

# gpu혹은 cpu 선택
def get_default_device():
    if torch.cuda.is_available():
        return "cuda"
    else:
        return "cpu"
     

if __name__ == '__main__':
    #parser값 저장
    data_dir = sys.argv[1]
    speaker_info_path = sys.argv[2]
    output_dir = sys.argv[3]
    test_speakers = int(sys.argv[4])
    test_proportion = float(sys.argv[5])
    sample_rate = int(sys.argv[6])
    n_utts_attr = int(sys.argv[7])
    
    #Audio2Mel 클래스 인스턴스 정의
    fft = Audio2Mel().to(get_default_device())
    
    # 학습시킬 데이터셋의 정보 준비
    speaker_ids = read_speaker_info(speaker_info_path)
    random.shuffle(speaker_ids)
    
    train_speaker_ids = speaker_ids[:-test_speakers]
    test_speaker_ids = speaker_ids[-test_speakers:]

    speaker2filenames = read_filenames(data_dir)

    train_path_list, in_test_path_list, out_test_path_list = [], [], []

    # train, test 데이터셋으로 분할
    for speaker in train_speaker_ids:
        path_list = speaker2filenames[speaker]
        random.shuffle(path_list)
        test_data_size = int(len(path_list) * test_proportion)
        train_path_list += path_list[:-test_data_size]
        in_test_path_list += path_list[-test_data_size:]

    with open(os.path.join(output_dir, 'in_test_files.txt'), 'w') as f:
        for path in in_test_path_list:
            f.write(f'{path}\n')

    for speaker in test_speaker_ids:
        path_list = speaker2filenames[speaker]
        out_test_path_list += path_list

    with open(os.path.join(output_dir, 'out_test_files.txt'), 'w') as f:
        for path in out_test_path_list:
            f.write(f'{path}\n')
    
    #전처리 시작
    #-----------MainLoop-----------
    for dset, path_list in zip(['train', 'in_test', 'out_test'], \
            [train_path_list, in_test_path_list, out_test_path_list]):
        print(f'processing {dset} set, {len(path_list)} files')
        data = {}
        output_path = os.path.join(output_dir, f'{dset}.pkl')
        all_train_data = []
        for i, path in enumerate(sorted(path_list)):
            if i % 500 == 0 or i == len(path_list) - 1:
                print(f'processing {i} files')
            filename = path.strip().split('/')[-1]
            
            #Req. 1-2 Convert_file 함수 구현
            ####TODO#### mel-spectrogram으로 변환
            mel = convert_file(path)
            ####TODO####
            
            data[filename] = mel            
            if dset == 'train' and i < n_utts_attr:
                all_train_data.append(mel)
        
        #학습데이터의 모든 mel-spectrogram에 대하여 평균과 분산 구함
        if dset == 'train':
            all_train_data = np.concatenate(all_train_data)
            mean = np.mean(all_train_data, axis=0)
            std = np.std(all_train_data, axis=0)
            attr = {'mean': mean, 'std': std}
            with open(os.path.join(output_dir, 'attr.pkl'), 'wb') as f:
                pickle.dump(attr, f)
                
        #앞서 구한 평균과 분산에 대하여 normalize한 뒤 저장      
        for key, val in data.items():
            val = (val - mean) / std
            data[key] = val
        with open(output_path, 'wb') as f:
            pickle.dump(data, f) 

