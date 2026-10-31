//
//  APBTaskContext.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/27/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APBResponse.h"

/**
 任务状态定义
 */
typedef enum {
    STATE_NOT_RUNNING,                      //未运行
    STATE_RUNNING,                          //运行态
    STATE_FINISHED,                         //任务结束
}APBTaskState;

@interface APBTaskContext : NSObject

@property(nonatomic, assign)APBTaskState state;                   //任务状态
@property(nonatomic, assign)APBResultType resultCode;             //任务结果码
@property(nonatomic, copy)NSString *failReason;                   //任务失败原因
@property(nonatomic, strong)NSMutableDictionary *successResult;   //任务成功结果

@property (nonatomic,strong) NSString* retCodeSub ;     //产品结果明细，不影响决策
@property (nonatomic,strong) NSString* retMessageSub ; //retMessageSub对应的文案

@end
