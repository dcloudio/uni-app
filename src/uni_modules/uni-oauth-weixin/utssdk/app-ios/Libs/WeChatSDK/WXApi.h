//
//  WXApi.h
//  所有Api接口
//
//  Created by Wechat on 12-2-28.
//  Copyright (c) 2012年 Tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WXApiObject.h"

NS_ASSUME_NONNULL_BEGIN


typedef BOOL(^WXGrantReadPasteBoardPermissionCompletion)(void);


#pragma mark - WXApiDelegate
/*! @brief 接收并处理来自微信终端程序的事件消息
 *
 * 接收并处理来自微信终端程序的事件消息，期间微信界面会切换到第三方应用程序。
 * WXApiDelegate 会在handleOpenURL:delegate:中使用并触发。
 */
@protocol WXApiDelegate <NSObject>
@optional

/*! @brief 收到一个来自微信的请求，第三方应用程序处理完后调用sendResp向微信发送结果
 *
 * 收到一个来自微信的请求，异步处理完成后必须调用sendResp发送处理结果给微信。
 * 可能收到的请求有GetMessageFromWXReq、ShowMessageFromWXReq等。
 * @param req 具体请求内容，是自动释放的
 */
- (void)onReq:(BaseReq*)req;



/*! @brief 发送一个sendReq后，收到微信的回应
 *
 * 收到一个来自微信的处理结果。调用一次sendReq后会收到onResp。
 * 可能收到的处理结果有SendMessageToWXResp、SendAuthResp等。
 * @param resp具体的回应内容，是自动释放的
 */
- (void)onResp:(BaseResp*)resp;

/* ! @brief 用于在iOS16以及以上系统上，控制OpenSDK是否读取剪切板中微信传递的数据以及读取的时机
 * 在iOS16以及以上系统，在SDK需要读取剪切板中微信写入的数据时，会回调该方法。没有实现默认会直接读取微信通过剪切板传递过来的数据
 * 注意：
 *      1. 只在iOS16以及以上的系统版本上回调;
 *      2. 不实现时，OpenSDK会直接调用读取剪切板接口，读取微信传递过来的数据;
 *      3. 若实现该方法：开发者需要通过调用completion(), 支持异步，通知SDK允许读取剪切板中微信传递的数据,
 *                    不调用completion()则代表不授权OpenSDK读取剪切板，会导致收不到onReq:, onResp:回调，无法后续业务流程。请谨慎使用
 *      4. 不要长时间持有completion不释放，可能会导致内存泄漏。
 */
- (void)onNeedGrantReadPasteBoardPermissionWithURL:(nonnull NSURL *)openURL completion:(nonnull WXGrantReadPasteBoardPermissionCompletion)completion;

@end

#pragma mark - WXApiLogDelegate

@protocol WXApiLogDelegate <NSObject>

- (void)onLog:(NSString*)log logLevel:(WXLogLevel)level;

@end


#pragma mark - WXApi

/*! @brief 微信Api接口函数类
 *
 * 该类封装了微信终端SDK的所有接口
 */
@interface WXApi : NSObject

/*! @brief WXApi的成员函数，向微信终端程序注册第三方应用。
 *
 * 需要在每次启动第三方应用程序时调用。
 * @attention 请保证在主线程中调用此函数
 * @param appid 微信开发者ID
 * @param universalLink 微信开发者Universal Link
 * @return 成功返回YES，失败返回NO。
 */
+ (BOOL)registerApp:(NSString *)appid universalLink:(NSString *)universalLink;


/*! @brief 处理旧版微信通过URL启动App时传递的数据
 *
 * 需要在 application:openURL:sourceApplication:annotation:或者application:handleOpenURL中调用。
 * @param url 微信启动第三方应用时传递过来的URL
 * @param delegate  WXApiDelegate对象，用来接收微信触发的消息。
 * @return 成功返回YES，失败返回NO。
 */
+ (BOOL)handleOpenURL:(NSURL *)url delegate:(nullable id<WXApiDelegate>)delegate;


/*! @brief 处理微信通过Universal Link启动App时传递的数据
 *
 * 需要在 application:continueUserActivity:restorationHandler:中调用。
 * @param userActivity 微信启动第三方应用时系统API传递过来的userActivity
 * @param delegate  WXApiDelegate对象，用来接收微信触发的消息。
 * @return 成功返回YES，失败返回NO。
 */
+ (BOOL)handleOpenUniversalLink:(NSUserActivity *)userActivity delegate:(nullable id<WXApiDelegate>)delegate;


/*! @brief 检查微信是否已被用户安装
 *
 * @return 微信已安装返回YES，未安装返回NO。
 */
+ (BOOL)isWXAppInstalled;



/*! @brief 判断当前微信的版本是否支持OpenApi
 *
 * @return 支持返回YES，不支持返回NO。
 */
+ (BOOL)isWXAppSupportApi;


/*! @brief 判断当前微信的版本是否支持分享微信状态功能
 *
 * @attention 需在工程LSApplicationQueriesSchemes配置中添加weixinStateAPI
 * @return 支持返回YES，不支持返回NO。
 */
+ (BOOL)isWXAppSupportStateAPI;


#ifndef BUILD_WITHOUT_PAY
/*! @brief 判断当前微信的版本是否支持二维码拉起微信支付
 *
 * @attention 需在工程LSApplicationQueriesSchemes配置中添加weixinQRCodePayAPI
 * @return 支持返回YES，不支持返回NO。
 */
+ (BOOL)isWXAppSupportQRCodePayAPI;

#endif


/*! @brief 获取微信的itunes安装地址
 *
 * @return 微信的安装地址字符串。
 */
+ (NSString *)getWXAppInstallUrl;



/*! @brief 获取当前微信SDK的版本号
 *
 * @return 返回当前微信SDK的版本号
 */
+ (NSString *)getApiVersion;



/*! @brief 打开微信
 *
 * @return 成功返回YES，失败返回NO。
 */
+ (BOOL)openWXApp;



/*! @brief 发送请求到微信，等待微信返回onResp
 *
 * 函数调用后，会切换到微信的界面。第三方应用程序等待微信返回onResp。微信在异步处理完成后一定会调用onResp。支持以下类型
 * SendAuthReq、SendMessageToWXReq、PayReq等。
 * @param req 具体的发送请求。
 * @param completion 调用结果回调block
 */
+ (void)sendReq:(BaseReq *)req completion:(void (^ __nullable)(BOOL success))completion;

/*! @brief 收到微信onReq的请求，发送对应的应答给微信，并切换到微信界面
 *
 * 函数调用后，会切换到微信的界面。第三方应用程序收到微信onReq的请求，异步处理该请求，完成后必须调用该函数。可能发送的相应有
 * GetMessageFromWXResp、ShowMessageFromWXResp等。
 * @param resp 具体的应答内容
 * @param completion 调用结果回调block
 */
+ (void)sendResp:(BaseResp*)resp completion:(void (^ __nullable)(BOOL success))completion;


/*! @brief 发送Auth请求到微信，支持用户没安装微信，等待微信返回onResp
 *
 * 函数调用后，会切换到微信的界面。第三方应用程序等待微信返回onResp。微信在异步处理完成后一定会调用onResp。支持SendAuthReq类型。
 * @param req 具体的发送请求。
 * @param viewController 当前界面对象。
 * @param delegate  WXApiDelegate对象，用来接收微信触发的消息。
 * @param completion 调用结果回调block
 */
+ (void)sendAuthReq:(SendAuthReq *)req viewController:(UIViewController*)viewController delegate:(nullable id<WXApiDelegate>)delegate completion:(void (^ __nullable)(BOOL success))completion;


/*! @brief 测试函数，用于排查当前App通过Universal Link方式分享到微信的流程
    注意1:  调用自检函数之前必须要先调用registerApp:universalLink接口, 并确认调用成功
    注意2:  自检过程中会有Log产生，可以先调用startLogByLevel函数，根据Log排查问题
    注意3:  会多次回调block
    注意4:  仅用于新接入SDK时调试使用，请勿在正式环境的调用
 *
 *  当completion回调的step为WXULCheckStepFinal时，表示检测通过，Universal Link接入成功
 *  @param completion 回调Block
 */
+ (void)checkUniversalLinkReady:(nonnull WXCheckULCompletion)completion;


/*! @brief WXApi的成员函数，接受微信的log信息。byBlock
    注意1:SDK会强引用这个block,注意不要导致内存泄漏,注意不要导致内存泄漏
    注意2:调用过一次startLog by block之后，如果再调用一次任意方式的startLoad,会释放上一次logBlock，不再回调上一个logBlock
 *
 *  @param level 打印log的级别
 *  @param logBlock 打印log的回调block
 */

+ (void)startLogByLevel:(WXLogLevel)level logBlock:(WXLogBolock)logBlock;

/*! @brief WXApi的成员函数，接受微信的log信息。byDelegate 
    注意1:sdk会弱引用这个delegate，这里可加任意对象为代理，不需要与WXApiDelegate同一个对象
    注意2:调用过一次startLog by delegate之后，再调用一次任意方式的startLoad,不会再回调上一个logDelegate对象
 *  @param level 打印log的级别
 *  @param logDelegate 打印log的回调代理，
 */
+ (void)startLogByLevel:(WXLogLevel)level logDelegate:(id<WXApiLogDelegate>)logDelegate;

/*! @brief 停止打印log，会清理block或者delegate为空，释放block
 *  @param 
 */
+ (void)stopLog;

@end

NS_ASSUME_NONNULL_END
