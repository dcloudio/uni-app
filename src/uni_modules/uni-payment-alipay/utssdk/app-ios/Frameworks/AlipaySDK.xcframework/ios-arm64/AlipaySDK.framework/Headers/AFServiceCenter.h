//
//  AFServiceCenter.h
//  AFServiceSDK
//
//  Created by jiajunchen on 02/01/2018.
//  Copyright © 2018 antfin. All rights reserved.
//

#import <Foundation/Foundation.h>

@class AFServiceResponse;

/**
 SDK支持的业务枚举值

 - AFServiceEInvoice: 电子发票
 - AFServiceAuth: 账户授权
 */
typedef NS_ENUM(NSUInteger, AFService) {
    AFServiceEInvoice,
    AFServiceAuth,
    AFServiceDeduct
};


extern NSString * const kAFServiceOptionBizParams;      // 钱包服务调用入参
extern NSString * const kAFServiceOptionCallbackScheme; // 业务回跳当前app的scheme
extern NSString * const kAFServiceOptionCallbackUlink;  // 业务回跳当前app的ulink
extern NSString * const kAFServiceOptionNotUseLanding;  // 不使用支付宝提示下载页做补偿,为true时需要商户自己处理用户未安装支付宝的情况
extern NSString * const kAFServiceBizParamsKeyUrl;      // 独立签约入参url

typedef void(^AFServiceResultBlock)(AFServiceResponse *response);

@interface AFServiceCenter : NSObject

/**
 调用钱包服务

 @param service 业务service, 见AFService枚举值
 @param params  参数Dictionary, key值详情参见kAFServiceOptionBizParams、kAFServiceOptionCallbackScheme注释
 @param block   业务结果回调的block, block参数是AFServiceResponse类型，业务结果通过result属性获取,如果未用户未安装支付宝并且kAFServiceOptionNotUseLanding未设置为true,会使用H5landing页做补偿,这种情况下不会有block回调结果。
 */
+ (void)callService:(AFService)service
         withParams:(NSDictionary *)params
      andCompletion:(AFServiceResultBlock)block;


/**
 处理钱包服务回跳APP的URL

 @param url 回跳URL
 @param block 业务结果回掉的block，详情见调用接口入参上的block。注意此接口上的block只有在跳转钱包后,当前APP被系统回收的情况下回跳才生效
 */
+ (void)handleResponseURL:(NSURL *)url
           withCompletion:(AFServiceResultBlock)block;


/**
 *  处理支付宝app支付后通过universalLink跳回商户app携带的支付结果处理
 *
 *  @param userActivity            系统接口传入的userActivity
 *  @param block     支付结果回调 为nil时默认使用支付接口的completionBlock
 *  @return       YES表示能处理，NO表示不能处理
 */
+ (BOOL)handleOpenUniversalLink:(NSUserActivity *)userActivity
                 withCompletion:(AFServiceResultBlock)block;

@end
