//
//  APDID.h
//  APPSecuritySDK
//
//  Created by eric on 2021/2/7.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ASSTokenResult.h"

NS_ASSUME_NONNULL_BEGIN

typedef void(^ASSSecureSdkCallback)(ASSTokenResult* result, NSString* error);

typedef void(^ASSSecureSdkOpenCallback)(NSString* token, int errorCode);

@interface APDID : NSObject

/*
 异步初始化vkeyid，推荐在app启动时和收银台页面加载时调用，SDK内部会根据时间戳和设备信息进行判断是否需要进行网络请求，无线程要求
 @param params      初始化的字典参数，包含三项内容：tid、userid、environment；
                    tid与userid选传，传入可以保证vkeyid与其正确关联，取不到传入空字符串；
                    环境变量请与app设置中的环境相关联，字典中的value包括线上，预发，测试，日常；
 @param callback 初始化完成后的结果回调
 
 Asynchronously initialize vkeyid(apdid), recommend to invoke this API when app launches, and cashier view presents.
 Inside SDK we will decide whether to launch network request or not based on timestamp and device info.
 No thread requirement.
 @param params：     Initialized parameters, includes 3 key-value pairs: tid, userid,environment；
 Tid and userid are optional, they can be associated with vkeyid(apdid) if passed in.
 If the values for tid and userid are not available, pass in empty NSString(@"").
 @param callback：   Callback block when token is available
 */
+ (void) initToken:(NSDictionary*)params callback:(ASSSecureSdkCallback)callback;

/*
 同步获取vkeyid完整信息，包括vkeyid，token，clientkey，无网络请求；
 如果首次安装app，且首次网络请求未完成或失败，将会返回降级措施：vkeyid会返回客户端随机串clientkey，token将会返回空。
 
 Synchronously get full info of vkeyid(apdid), token and clientkey, no network requests.
 If the app is installed for the first time and first network request failed, it would return degradation result: vkeyid would be clientkey which is a client-side generated random string, token would be empty NSString @""
 */
+ (ASSTokenResult*)getToken DEPRECATED_MSG_ATTRIBUTE("use getTokenResult instead");

/*
 同步获取vkeyid完整信息，包括vkeyid，token，clientkey，无网络请求；
 如果首次安装app，且首次网络请求未完成或失败，将会返回降级措施：vkeyid会返回客户端随机串clientkey，token将会返回空。
 
 Synchronously get full info of vkeyid(apdid), token and clientkey, no network requests.
 If the app is installed for the first time and first network request failed, it would return degradation result: vkeyid would be clientkey which is a client-side generated random string, token would be empty NSString @""
 */
+ (ASSTokenResult*)getTokenResult;


+ (ASSTokenResult *)getTokenResult:(NSString*)appName appKeyClient:(NSString*)appKeyClient;


//===================lazada api====================//

/*
 异步初始化vkeyid，推荐在app启动时和收银台页面加载时调用，SDK内部会根据时间戳和设备信息进行判断是否需要进行网络请求，无线程要求
 @param appName      应用名称
 
 @param appKeyClient 应用客户端密钥
 
 @param callback     初始化完成后的结果回调，以Token作为参数
 
 */
+ (void)initToken:(NSString *)appName appKeyClient:(NSString *)appKeyClient callback:(ASSSecureSdkOpenCallback)callback;

/*
 同步接口返回token
 
 @param appName      应用名称
 
 @param appKeyClient 应用客户端密钥
 
 */
+ (NSString *)getResultToken;

/*
 同步接口返回token
 
 @param appName      应用名称
 
 @param appKeyClient 应用客户端密钥
 
 */
+ (NSString *)getResultToken:(NSString*)appName appKeyClient:(NSString*)appKeyClient;

//===================TMN api====================//
/*
 异步初始化vkeyid，推荐在app启动时和收银台页面加载时调用，SDK内部会根据时间戳和设备信息进行判断是否需要进行网络请求，无线程要求
 @param appName      应用名称
 
 @param appKeyClient 应用客户端密钥
 
 @param sessionId    业务方传入自己的id
 
 @param callback     初始化完成后的结果回调，以Token作为参数
 
 */

+ (void)initToken:(NSString *)appName appKeyClient:(NSString *)appKeyClient sessionId:(NSString *)sessionId callback:(ASSSecureSdkOpenCallback)callback;


//===================ae api====================//

/*
 强制上报接口
 @param params      初始化的字典参数，包含四项内容：umid、tid、userid、environment；
 umid必传，tid与userid选传，传入可以保证vkeyid与其正确关联，取不到传入空字符串；
 环境变量请与app设置中的环境相关联，字典中的value包括线上，预发，测试，日常；
 @param callback 初始化完成后的结果回调
 
 */
+ (void) updateToken:(NSDictionary*)params callback:(ASSSecureSdkCallback)callback;

@end

NS_ASSUME_NONNULL_END
