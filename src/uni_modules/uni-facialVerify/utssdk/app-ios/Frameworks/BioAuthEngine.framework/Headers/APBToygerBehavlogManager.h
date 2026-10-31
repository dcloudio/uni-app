//
//  APFBehavlogManager.h
//  APFaceDetectBiz
//
//  Created by yukun.tyk on 9/8/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@class BisBehavLog, BisBehavTask;

@interface APBToygerBehavlogManager : NSObject

/**
 *  @param config 配置参数，各种id和token
 */
- (instancetype)initWithConfig:(NSDictionary *)config;

/**
 *  添加行为日志
 *
 *  @param task 任务
 */
- (void)addTask:(BisBehavTask *)task;

/**
 *  clearTask
 *
 *
 */
- (void)clearTask;
/**
 *  创建行为日志
 *
 *  @param invtp 触发类型
 *  @param retry 重试次数
 *
 *  @return 行为日志
 */
- (BisBehavLog *)generateLogWithInvokeType:(NSString *)invtp
                                 withRetry:(NSInteger)retry;

@end
