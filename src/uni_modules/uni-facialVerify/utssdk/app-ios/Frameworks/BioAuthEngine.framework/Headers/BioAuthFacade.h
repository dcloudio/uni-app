//
//  BioAuthFacade.h
//  BioAuthAPI
//
//  Created by yukun.tyk on 12/7/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APBRequest.h"
#import "APBResponse.h"
#import "APBCommand.h"

/**
 *  生物认证结果回调处理
 *
 *  @param response 生物认证结果
 */
typedef void (^BioAuthCallback) (APBResponse *response);

/**
 *  执行命令结束回调
 *
 *  @param success 命令执行是否成功
 *  @param reason  保留参数
 */
typedef void (^BioAuthExecCallback) (BOOL success, NSDictionary *reason);

@interface BioAuthFacade : NSObject

/**
 *  唤起生物认证之前获取框架meta数据
 */
+ (NSString *)getBioMetaInfo;

/**
 *  触发下载资源文件
 */
+ (void)preLoad;

/**
 *  申请生物认证
 *
 *  @param request  生物认证请求
 *  @param callback 生物认证结果回调处理
 */
- (void)authWithRequest:(APBRequest *)request withCallback:(BioAuthCallback)callback;

/**
 *  让正在进行中的生物认证因子执行某种操作
 *
 *  @param command 操作码
 *  @param callback 命令执行回调
 */
- (void)exec:(APBCommand *)command withCompletionCallback:(BioAuthExecCallback)callback;

/**
 *  当前是否正在执行认证任务
 */
- (BOOL)isBusy;

/**
 *  生物认证类型版本号
 */
- (NSString *)version;

@end
