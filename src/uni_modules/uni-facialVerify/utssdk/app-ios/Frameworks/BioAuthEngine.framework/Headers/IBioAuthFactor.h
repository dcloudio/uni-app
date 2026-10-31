//
//  IBioAuthFactor.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/9/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
@protocol IBioAuthTask;
@class APBRequest, APBResponse;


/**
 *  globalConfig key
 *  全局超时，值为CGFloat，若设定了该值，则框架可以在相应时间到达后，将全局超时事件封装成APBEvent dispatch给当时运行的task
 *  即使设定了全局超时，全局计时器默认关闭，需要task在globalInfo中将kGlobalTimerSwitchKey开关设置为YES后才开始计时
 */
extern NSString *const kGlobalTimeoutKey;

/**
 *  远程生物认证因子接口
 */
@protocol IBioAuthFactor <NSObject>

/**
 *  生物认证因子名称，框架根据该名称反射调用到具体生物认证因子
 */
@property(nonatomic, copy, readonly)NSString *factorName;

/**
 *  框架调用该方法来实例化认证因子
 *
 *  @param request  调用方的认证请求
 */
- (instancetype)initWithRequest:(APBRequest *)request;

/**
 *  获取远程生物认证task队列
 */
- (NSArray<id<IBioAuthTask>> *)getTasks;

/**
 *  获取生物验证全局配置(全局超时等)
 */
- (NSMutableDictionary *)getGlobalConfig;

/**
 *  框架最终返回response之前，由相应认证因子最终处理repsonse
 */
- (void)finalizeResponse:(APBResponse *)response;

/**
 *  sdk版本号
 */
+ (NSString *)getVersion;

@optional
/**
 *  重启之前调用
 */
- (void)onEngineWillRestart:(NSMutableDictionary *)pipeInfo;

/**
 *  获取生物认证产品元数据
 */
+ (NSDictionary *)getMetaInfo;

@end
