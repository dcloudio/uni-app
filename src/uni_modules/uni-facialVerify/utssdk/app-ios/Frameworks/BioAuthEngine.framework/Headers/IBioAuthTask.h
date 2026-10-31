//
//  IBioAuthTask.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/4/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <BioAuthEngine/APBBackwardCommand.h>
#import <BioAuthEngine/APBEvent.h>
#import <BioAuthEngine/APBAuthEngine.h>
#import <BioAuthEngine/APBTaskContext.h>

@class APBTaskContext;
@protocol IBioAuthTask;

/**
 *  pipeInfo key
 *  value为commandBlock，task可以调用并要求框架执行相应APBBackwardCommand命令
 */
extern NSString *const kTaskCommandBlockKey;

/**
 *  taskConfig key
 *  task超时，value为CGFloat，如果task设置了该值，框架将开始task计时器，并在时间到达后，将task超时封装成APBEvent发送给当前task
 */
extern NSString *const kTaskTimeoutKey;

typedef void (^commandBlock)(APBBackwardCommand *command);

@protocol BioAuthTaskDelegate <NSObject>

- (void)task:(id<IBioAuthTask>)task stateChanged:(APBTaskState)state;

@end

@protocol IBioAuthTask <NSObject>

@property(nonatomic, copy, readonly) NSString *taskName;                //任务名称
@property(nonatomic, strong, readonly) APBTaskContext *context;         //任务上下文
@property(nonatomic, weak) id<BioAuthTaskDelegate> delegate;

/**
 *  开始执行任务队列
 */
- (void)invokeWithPipeInfo:(NSMutableDictionary *)pipeInfo;

/**
 *  处理中断事件
 *
 *  @param event    事件
 *  @param callback 事件处理结果回调
 */
- (void)processEvent:(APBEvent *)event
withCompletionCallback:(BioAuthExecCallback)callback;

/**
 *  获取任务配置(超时等)
 */
- (NSDictionary *)getConfig;

/**
 *  重置任务
 */
- (void)reset;

/**
 *  获取当前管道信息，框架负责传递给下一个task
 */
- (NSMutableDictionary *)pipeInfo;

@end
