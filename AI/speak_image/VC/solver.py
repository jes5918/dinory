import torch
import numpy as np
import sys
import os
import torch.nn as nn
import torch.nn.functional as F
import yaml
import pickle
from model import AE
from data_utils import get_data_loader
from data_utils import PickleDataset
from utils import *
from functools import reduce
from collections import defaultdict

#Req. 3-1 모델 트레이닝 클래스 정의
class Solver(object):

    def __init__(self, config, args):
        # config 정의
        self.config = config
        print(config)

        # args 정의
        self.args = args
        print(self.args)

        # dataloader 준비
        self.get_data_loaders()
        # config 저장
        
        ####TODO#### init the model with config
        self.build_model()
        ####TODO####
        
    # 학습을 위한 데이터 준비
    def get_data_loaders(self):
        data_dir = self.args.data_dir
        self.train_dataset = PickleDataset(os.path.join(data_dir, f'{self.args.train_set}.pkl'), 
                os.path.join(data_dir, self.args.train_index_file), 
                segment_size=self.config['data_loader']['segment_size'])
        self.train_loader = get_data_loader(self.train_dataset,
                frame_size=self.config['data_loader']['frame_size'],
                batch_size=self.config['data_loader']['batch_size'], 
                shuffle=self.config['data_loader']['shuffle'], 
                num_workers=4, drop_last=False)
        self.train_iter = infinite_iter(self.train_loader)
        return 
    
    #Req. 3-2 build_model() 함수 작성
    ####TODO#### 1. 학습을 위해 모델을 준비하는 build_model() 함수 작성
    def build_model(self): 
        pass
        # self.config 모델에 load한뒤 gpu에 올려서 self.model 변수 생성 
        
        #self.config을 참고하여 self.opt에 optimizer

        return
    ####TODO####
    
    #Req. 3-3 save_model() 함수 작성
    ####TODO#### 2.학습 중 checkpoint를 저장하는 save_model() 함수 작성
    def save_model(self, iteration,cnt):
        pass
        # 모델의 weight을 .ckpt형식으로, 모델의 optimizer을 .opt형식으로

    ####TODO####

    #Req. 3-4 ae_step() 함수 작성
    ####TODO#### 3. 학습 시 backpropagation을 진행하는 ae_step() 함수 작성
    def ae_step(self, data, lambda_kl):
        
        # 입력 데이터를 gpu에 위치

        # self.model의 forward 함수로 데이터를 전달하고, mu, log_sigma, emb, dec 값 반환
        
        
        #loss값 계산
        criterion = nn.L1Loss()
        loss_rec = criterion(dec, x)               
        loss_kl = 0.5 * torch.mean(torch.exp(log_sigma) + mu ** 2 - 1 - log_sigma)        
        loss = self.config['lambda']['lambda_rec'] * loss_rec + \
                lambda_kl * loss_kl

        
        #backpropagation을 진행 한 뒤 
        
        
        
        
        #grad_norm 계산 후 loss 값 딕셔너리 형태로 반환
        grad_norm = torch.nn.utils.clip_grad_norm_(self.model.parameters(), 
                max_norm=self.config['optimizer']['grad_norm'])
        
        meta = {'loss_rec': loss_rec.item(),
                'loss_kl': loss_kl.item(),
                'grad_norm': grad_norm}
        return meta
    ####TODO####
    
    #Req. 3-5 train() 함수 작성
    #### TODO#### 4. 학습 iteration을 반복하는 train() 함수 작성
    def train(self, n_iterations):
        
        #for문 작성
        for iteration in range(n_iterations):            
            #lambda_kl 파라미터 정의
            if iteration >= self.config['annealing_iters']:
                lambda_kl = self.config['lambda']['lambda_kl']
            else:
                lambda_kl = self.config['lambda']['lambda_kl'] * (iteration + 1) / self.config['annealing_iters'] 
                        
            # next 함수로 self.train_iter에서 batch 반환

            
            #self.ae_step() 함수를 호출하여 데이터와 lambda_kl 인자를 전달, loss 값 반환

            
            #반환받은 loss 값 출력

            
            #일정 주기로 self.save_model() 함수를 호출하여 checkpoint 저장 및 로그 기록

        return
    ####TODO####
    


