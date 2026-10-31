//
//  ASSSecureOpenSdk.h
//  APPSecuritySDK
//
//  Created by msq on 16/6/1.
//  Copyright © 2016年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APSecureSdk.h"
#import "ASSTokenResult.h"

typedef void(^ASSSecureSdkCallbackOpen)(NSString* token, int errorCode);

@interface ASSSecureOpenSdk : NSObject

/*
 异步初始化vkeyid，推荐在app启动时和收银台页面加载时调用，SDK内部会根据时间戳和设备信息进行判断是否需要进行网络请求，无线程要求
 @param appName      应用名称
 @param appKeyClient 应用客户端密钥
 @param callback     初始化完成后的结果回调，以Token作为参数
 */
+ (void)initToken:(NSString *)appName appKeyClient:(NSString *)appKeyClient callback:(ASSSecureSdkCallbackOpen)callback;


/*
 异步初始化vkeyid，推荐在app启动时和收银台页面加载时调用，SDK内部会根据时间戳和设备信息进行判断是否需要进行网络请求，无线程要求
 @param appName         应用名称
 @param appKeyClient    应用客户端密钥
 @param parameters      业务方按约定的自定义参数
 @param callback        初始化完成后的结果回调，以Token作为参数
 */
+ (void)initToken:(NSString *)appName appKeyClient:(NSString *)appKeyClient parameters:(NSDictionary*)inArgs callback:(ASSSecureSdkCallbackOpen)callback;

/*
 异步强制更新vkeyid，推荐在app启动时和收银台页面加载时调用，无线程要求
 @param appName         应用名称
 @param appKeyClient    应用客户端密钥
 @param parameters      业务方按约定的自定义参数
 @param callback        初始化完成后的结果回调，以Token作为参数
 */
+ (void)updateToken:(NSString *)appName appKeyClient:(NSString *)appKeyClient parameters:(NSDictionary*)inArgs callback:(ASSSecureSdkCallbackOpen)callback;

/*
 VKEYID和VKEYID token的接口，无网络请求。
 同步调用前应当先调用过异步初始化接口
 
 如果异步初始化由于网络等原因失败，同步接口将返回降级方案：
 1）VKEYID将在旧版apdid存在的情况下返回旧版apdid，否则返回随机串
 2）VKEYID token将返回空字符串:@""
 */
+ (ASSTokenResultOpen*)getTokenResult;

/*
 *获取exactID
 */
+ (NSString*)getExactID;

/*
 *设置自定义的网关地址
 */
+ (void)setGatewayAddress:(NSString*)addr;

+ (void)setRpcConfiguration:(NSDictionary *) config;


/**
* 感知埋点。
* appName - 应用名 （智科人脸：“zorro”）
* appKeyClient - 应用key （智科人脸：“elBwppCSr9nB1LIQ”）
* action - 感知行为编号
* extParams - 可选扩展参数，以map方式传参
*/
//+(APRiskResult*)APPerceptRisk:(NSString*)appName appKeyClient:(NSString*)appKeyClient userAction:(NSInteger)action extParams:(NSDictionary *)args;


@end
