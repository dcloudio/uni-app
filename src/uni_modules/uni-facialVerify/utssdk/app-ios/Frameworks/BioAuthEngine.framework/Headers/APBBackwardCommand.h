//
//  APBBackwardCommand.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/26/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>


/**
 *  任务队列可要求框架执行的命令
 */
typedef NS_ENUM(NSInteger, APBBackwardCommandType) {
    BACKWARD_COMMAND_RESTART =              300,        //重新开始任务队列，task可以设置params来指定冲新开始的任务下标
    BACKWARD_COMMAND_ADD_PARALLEL_TASK =    302,        //添加并行任务
    BACKWARD_COMMNAD_GLOBAL_TIMER =         305,        //全局timer操作
    BACKWARD_COMMNAD_UPLOAD_DATA =          400,        //合并上传
    BACKWARD_COMMNAD_STOP_SCANCE =          401,        //关闭扫描
    BACKWARD_COMMNAD_OCRUPLOAD_DATA =       402,        //EKYC OCR上传
    BACKWARD_COMMNAD_OCRUPLOADCONFIRM_DATA =       403,        //EKYC OCR确认
};

typedef NS_ENUM(NSInteger, APBTimerCommandType) {
    TIMER_COMMAND_START,                                //开始全局计时
    TIMER_COMMAND_CANCEL,                               //取消全局计时
    TIMER_COMMAND_PAUSE,                                //暂停全局计时
    TIMER_COMMAND_RESUME,                               //恢复全局计时
};

/**
 *  param key {BACKWARD_COMMAND_RESTART}
 *  重新开始命令，指定从第几个任务开始
 */
extern NSString *const kCommandRestartTaskIndexKey;

/**
 *  param key {BACKWARD_COMMAND_ADD_PARALLEL_TASK}
 *  添加并行任务，value为id<IBioAuthTask>，新任务会在新线程中并行运行
 */
extern NSString *const kAddParallelTaskInstanceKey;

/**
 *  全局计时器操作命令
 *  value为NSNumber{APBTimerCommandType}
 */
extern NSString *const kGlobalTimerCommandKey;


@interface APBBackwardCommand : NSObject

@property(nonatomic, assign, readonly)APBBackwardCommandType commandType;
@property(nonatomic, strong, readonly)NSDictionary *params;

- (instancetype)initWithCommandType:(APBBackwardCommandType)commandType
                         withParams:(NSDictionary *)params;

@end
