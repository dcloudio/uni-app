//
//  AlipaySDK.h
//  AlipaySDK
//
//  Created by antfin on 17-10-24.
//  Copyright (c) 2017年 AntFin. All rights reserved.
//


////////////////////////////////////////////////////////
///////////////// 支付宝标准版本支付SDK ///////////////////
///////// version:15.8.30  modify:2024.12.18///////////
////////////////////////////////////////////////////////

#import <UIKit/UIKit.h>
#import "APayAuthInfo.h"
#import "AFServiceCenter.h"
#import "AFServiceResponse.h"

typedef void(^CompletionBlock)(NSDictionary *resultDic);

typedef enum {
    ALIPAY_TIDFACTOR_IMEI,
    ALIPAY_TIDFACTOR_IMSI,
    ALIPAY_TIDFACTOR_TID,
    ALIPAY_TIDFACTOR_CLIENTKEY,
    ALIPAY_TIDFACTOR_VIMEI,
    ALIPAY_TIDFACTOR_VIMSI,
    ALIPAY_TIDFACTOR_CLIENTID,
    ALIPAY_TIDFACTOR_APDID,
    ALIPAY_TIDFACTOR_MAX
} AlipayTidFactor;

@interface AlipaySDK : NSObject

/**
 *  创建支付单例服务
 *
 *  @return 返回单例对象
 */
+ (AlipaySDK *)defaultService;

/**
 *  用于设置SDK使用的window，如果没有自行创建window无需设置此接口
 */
@property (nonatomic, weak) UIWindow *targetWindow;

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////支付宝支付相关接口/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  支付接口
 *
 *  @param orderStr                支付订单信息字串
 *  @param schemeStr              调用支付的app注册在info.plist中的scheme
 *  @param completionBlock 支付结果回调Block，用于wap支付结果回调,跳转支付宝支付时只有当processOrderWithPaymentResult接口的completionBlock为nil时会使用这个bolock
 */
- (void)payOrder:(NSString *)orderStr
      fromScheme:(NSString *)schemeStr
        callback:(CompletionBlock)completionBlock;

/**
 *  支付接口 v2
 *
 *  @param orderStr        支付订单信息字串
 *  @param dynamicLaunch   是否使用动态配置策略跳转支付宝支付
 *  @param schemeStr       调用支付的app注册在info.plist中的scheme
 *  @param completionBlock 支付结果回调Block，用于wap支付结果回调
 跳转支付宝支付时只有当processOrderWithPaymentResult接口的completionBlock为nil时会使用这个bolock
 */
- (void)payOrder:(NSString *)orderStr
   dynamicLaunch:(BOOL)dynamicLaunch
      fromScheme:(NSString *)schemeStr
        callback:(CompletionBlock)completionBlock;

/**
 *  处理支付宝app支付后跳回商户app携带的支付结果Url
 *
 *  @param resultUrl        支付宝app返回的支付结果url
 *  @param completionBlock  支付结果回调 为nil时默认使用支付接口的completionBlock
 */
- (void)processOrderWithPaymentResult:(NSURL *)resultUrl
                      standbyCallback:(CompletionBlock)completionBlock;


/**
 *  商户接入UniversalLink支付接口使用该接口
 *
 *  @param orderStr                  支付订单信息字串
 *  @param schemeStr                调用支付的app注册在info.plist中的scheme
 *  @param universalLink       调用支付的app关联的universalLink,如'https://render.alipay.com/'
 *  @param completionBlock   支付结果回调Block，用于wap支付结果回调,跳转支付宝支付时只有当processOrderWithPaymentResult接口的completionBlock为nil时会使用这个bolock
 */
- (void) payOrder:(NSString *)orderStr
       fromScheme:(NSString *)schemeStr
fromUniversalLink:(NSString *)universalLink
         callback:(CompletionBlock)completionBlock;


/**
 *  处理支付宝app支付后通过universalLink跳回商户app携带的支付结果处理
 *
 *  @param userActivity            系统接口传入的userActivity
 *  @param completionBlock     支付结果回调 为nil时默认使用支付接口的completionBlock
 */
- (void)handleOpenUniversalLink:(NSUserActivity *)userActivity standbyCallback:(CompletionBlock)completionBlock;


/**
 *  获取交易token。
 *
 *  @return 交易token，若无则为空。
 */
- (NSString *)fetchTradeToken;


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////支付宝授权 2.0 相关接口////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  快登授权2.0
 *
 *  @param infoStr          授权请求信息字串
 *  @param schemeStr        调用授权的app注册在info.plist中的scheme
 *  @param completionBlock  授权结果回调，需要调用方在appDelegate中调用processAuth_V2Result:standbyCallback:方法获取授权结果
 *                          若在授权过程中,调用方应用被系统终止则此block无效(此时会调用'processAuth_V2Result:standbyCallback:'传入的standbyCallback)
 */
- (void)auth_V2WithInfo:(NSString *)infoStr
             fromScheme:(NSString *)schemeStr
               callback:(CompletionBlock)completionBlock;

/**
 *  处理支付宝app授权后跳回商户app携带的授权结果Url
 *
 *  @param resultUrl        支付宝app返回的授权结果url
 *  @param completionBlock  授权结果回调,用于处理跳转支付宝授权过程中商户APP被系统终止的情况
 */
- (void)processAuth_V2Result:(NSURL *)resultUrl
             standbyCallback:(CompletionBlock)completionBlock;


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////支付宝授权 1.0 相关接口////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


/**
 *  快登授权
 *  @param authInfo         授权相关信息
 *  @param completionBlock  授权结果回调，若在授权过程中，调用方应用被系统终止，则此block无效，
                            需要调用方在appDelegate中调用processAuth_V2Result:standbyCallback:方法获取授权结果
 */
- (void)authWithInfo:(APayAuthInfo *)authInfo
            callback:(CompletionBlock)completionBlock;

/**
 *  处理支付宝app授权后跳回商户app携带的授权结果Url
 *
 *  @param resultUrl        支付宝app返回的授权结果url
 *  @param completionBlock  授权结果回调
 */
- (void)processAuthResult:(NSURL *)resultUrl
          standbyCallback:(CompletionBlock)completionBlock;


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////支付宝 h5 支付转 native 支付接口////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 *  从h5链接中获取订单串并支付接口（自版本15.4.0起，推荐使用该接口）
 *
 *  @param urlStr     拦截的 url string
 *
 *  @return YES为成功获取订单信息并发起支付流程；NO为无法获取订单信息，输入url是普通url
 */
- (BOOL)payInterceptorWithUrl:(NSString *)urlStr
                   fromScheme:(NSString *)schemeStr
                     callback:(CompletionBlock)completionBlock;



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////支付宝 tid 相关信息获取接口/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  获取当前tid相关信息
 *
 *  @return tid相关信息
 */
- (NSString*)queryTidFactor:(AlipayTidFactor)factor;



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////支付宝支付环境相关信息接口//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  是否已经使用过
 *
 *  @return YES为已经使用过，NO反之
 */
- (BOOL)isLogined;

/**
 *  获取当前版本号
 *
 *  @return 当前版本字符串
 */
- (NSString *)currentVersion;

/**
 *  測試所用，realse包无效
 *
 *  @param url  测试环境
 */
- (void)setUrl:(NSString *)url;

/**
 *  支付前主动更新本地配置
 *
 *  @param block 更新请求结果回调
 */
- (void)fetchSdkConfigWithBlock:(void(^)(BOOL success))block;


typedef void(^APLogBlock)(NSString *log);

/**
*   接收AlipaySDK的log信息
*
*  @param logBlock 打印log的回调block
*/
+ (void)startLogWithBlock:(APLogBlock)logBlock;

/**
*   停止输出log,会释放logBlock
*
*
*/
+ (void)stopLog;

@end
