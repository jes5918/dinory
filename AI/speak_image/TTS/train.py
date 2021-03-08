import os
import time
import argparse
import math
from numpy import finfo

import torch
import torch.distributed as dist
from torch.utils.data.distributed import DistributedSampler
from torch.utils.data import DataLoader

from model import Tacotron2
from data_utils import TextMelLoader, TextMelCollate
from loss_function import Tacotron2Loss
#from hparams import create_hparams
from tqdm import tqdm
import yaml
import logging

#Req. 3-3 학습 로그 기록
####TODO#### logging을 생성하고 학습 로그를 기록한다.


####TODO####


# dataloader
def prepare_dataloaders(hparams):
    # Get data, data loaders and collate function ready
    trainset = TextMelLoader(hparams['training_files'], hparams)
    valset = TextMelLoader(hparams['validation_files'], hparams)
    collate_fn = TextMelCollate(hparams['n_frames_per_step'])

    train_loader = DataLoader(trainset, num_workers=1, shuffle=True,
                              sampler=None,
                              batch_size=hparams['batch_size'], pin_memory=False,
                              drop_last=True, collate_fn=collate_fn)
    return train_loader, valset, collate_fn

# load model
def load_model(hparams):
    model = Tacotron2(hparams).cuda()  
    return model

# load checkpoint
def load_checkpoint(checkpoint_path, model, optimizer):
    print("load check")
    assert os.path.isfile(checkpoint_path)
    print("Loading checkpoint '{}'".format(checkpoint_path))
    
    checkpoint_dict = torch.load(checkpoint_path, map_location='cpu')
    model.load_state_dict(checkpoint_dict['state_dict'])
    optimizer.load_state_dict(checkpoint_dict['optimizer'])
    learning_rate = checkpoint_dict['learning_rate']
    iteration = checkpoint_dict['iteration']
    print("Loaded checkpoint '{}' from iteration {}" .format(
        checkpoint_path, iteration))
    return model, optimizer, learning_rate, iteration



####TODO#### 3. pre-trained model을 load하여 이어서 학습 진행을 위한 warm_start_model() 함수 구현
# load_state_dict()로 pre-trained weight을 model에 load
# optimizer, scheduler등을 load
def warm_start_model(checkpoint_path, model, ignore_layers):
    assert os.path.isfile(checkpoint_path)
    
    print("Warm starting model from checkpoint '{}'".format(checkpoint_path))
    checkpoint_dict = torch.load(checkpoint_path, map_location='cpu')
    model_dict = checkpoint_dict['state_dict']
    if len(ignore_layers) > 0:
        model_dict = {k: v for k, v in model_dict.items()
                      if k not in ignore_layers}
        dummy_dict = model.state_dict()
        dummy_dict.update(model_dict)
        model_dict = dummy_dict
    model.load_state_dict(model_dict)
    return model
####TODO####

#Req. 3-2 Save_checkpoint() 함수 구현
####TODO#### 7. validation 이후 model checkpoint 저장
# checkpoint path에 iteration,그리고 model, optimizer, scheduler의 statedict를 저장
# torch.save() 함수 이용하여 딕셔너리 형태로 저장
def save_checkpoint(model, optimizer, scheduler, learning_rate, iteration, filepath): 
    pass

####TODO####

#Req. 3-1 Validate() 함수 구현
####TODO#### 6. 주기적으로 validation dataset으로 모델 성능 확인 후 log 기록
def validate(model, criterion, valset, iteration, batch_size,collate_fn, epoch, dur):
    # model을 evalutation mode로 전환
    
    # with torch.no_grad로 전체 연산을 묶음
    with torch.no_grad():
        # validation dataset 준비
        val_loader = DataLoader(valset, sampler=None, num_workers=1,
                                shuffle=False, batch_size=batch_size,
                                pin_memory=False, collate_fn=collate_fn)

        # validation loss 계산 (train() 코드와 동일하게 작성하지만 backpropagation을 하면 안된다)
       
    #Req. 3-3 학습 로그 기록
    # validation 결과 출력 및 log 기록 
    
    
    # model을 training mode로 전환
        
####TODO####
    
#Req. 2-1 모델 트레이닝    
####TODO####
def train(output_directory, checkpoint_path, warm_start, hparams):

    #  pytorch random seed 고정
    torch.manual_seed(hparams['seed'])
    torch.cuda.manual_seed(hparams['seed'])

    ####TODO####   1. hyperparameter를 참고하여 model, optimizer, scheduler, loss function 정의
    # optimizer : hparams에서 learning rate, weight decay 참고
    # scheduler : hparams에서 scheduler_step, gamma 참고
    model = load_model(hparams)
    
    optimizer = ''
    scheduler = ''
    
    criterion = Tacotron2Loss() # define loss function 
    ####TODO####
    
    
    ####TODO#### 2. prepare_dataloaders 함수를 이용하여 dataset 준비
    # input : hparams
    # output : train_loader, valset, collate_fn 반환
    
    ####TODO####
    
    
    ####TODO#### 3. scratch부터 학습할 것인지, pre-trained model을 load하여 warm start를 할 것인지 결정
    iteration = 0
    epoch_offset = 0
 
    if checkpoint_path is not None:
        # train from pretrained model
        if warm_start:
            # warm_start함수로 이동
            pass

        #train from scratch
        ##제공##
        else:
            model, optimizer, _learning_rate, iteration = load_checkpoint(
                checkpoint_path, model, optimizer)
            if hparams['use_saved_learning_rate']:
                learning_rate = _learning_rate
            iteration += 1  # next iteration is iteration + 1
            epoch_offset = max(0, int(iteration / len(train_loader)))
        ##제공##        
    ####TODO####
    
    is_overflow = False
    ####TODO#### 4. model을 training mode로 전환 후 main loop 작성
    # hparams에서 epoch을 참고하여 mainloop 구성   
        
    # training time 측정, 최초 시작 시간
    init_start = time.perf_counter()
    
    #----------MainLoop----------
    for epoch in range(epoch_offset, hparams['epochs']):        
        for i, batch in enumerate(train_loader):    
            
            # iteration start time
            start = time.perf_counter()
            
            # set gradients to zero
           

            # loss 계산 후 backpropagation
            
           
            ####TODO####
            
            grad_norm = torch.nn.utils.clip_grad_norm_(model.parameters(), hparams['grad_clip_thresh'])
    
            optimizer.step()
            scheduler.step()
            
            #iteration 별 loss, grad_norm, duration 결과 출력
            if not is_overflow:
                duration = time.perf_counter() - start
                print("Train loss {} {:.6f} Grad Norm {:.6f} {:.2f}s/it".format(
                    iteration, reduced_loss, grad_norm, duration),end='\r')              
                       
            # validation을 한 뒤 checkpoint model 저장
            if not is_overflow and (iteration % hparams['iters_per_checkpoint'] == 0):
                dur = time.perf_counter() - init_start
                
                # validation 진행
                validate(model, criterion, valset, iteration,hparams['batch_size'], collate_fn, epoch, dur)
                
                # checkpoint model 저장
                checkpoint_path = os.path.join(output_directory, "checkpoint_{}".format(iteration))
                save_checkpoint(model, optimizer, scheduler, learning_rate, iteration, checkpoint_path)
                      
            iteration += 1
    
     
        
##제공##            
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-o', '--output_directory', type=str,
                        help='directory to save checkpoints',default = "/home/multicam/checkpoints/tts_checkpoints")
    parser.add_argument('-c', '--checkpoint_path', type=str, default=None,
                        required=False, help='checkpoint path')
    parser.add_argument('--warm_start', action='store_true',
                        help='load model weights only, ignore specified layers')
    parser.add_argument('--hparams', type=str,
                        required=False, help='comma separated name=value pairs')
    
 
    #parser 생성 및 hyperparameter 생성
    args = parser.parse_args()
    print(args.hparams)
    
    with open('/home/multicam/samsung_multicam/speak_image/TTS/config.yaml') as f:
            hparams = yaml.load(f)
    
    #pytorch random seed 고정
    torch.backends.cudnn.enabled = hparams['cudnn_enabled']
    torch.backends.cudnn.benchmark = hparams['cudnn_benchmark']

    print("cuDNN Enabled:", hparams['cudnn_enabled'])
    print("cuDNN Benchmark:", hparams['cudnn_benchmark'])
    
    
    train(args.output_directory, args.checkpoint_path, args.warm_start, hparams)
##제공##
