//
//  WechatAuthSDK.h
//  WechatAuthSDK
//
//  Created by 李凯 on 13-11-29.
//  Copyright (c) 2013年 Tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

enum  AuthErrCode {
    WechatAuth_Err_Ok = 0,  //Auth成功
    WechatAuth_Err_NormalErr = -1,  //普通错误
    WechatAuth_Err_NetworkErr = -2, //网络错误
    WechatAuth_Err_GetQrcodeFailed = -3,    //获取二维码失败
    WechatAuth_Err_Cancel = -4,     //用户取消授权
    WechatAuth_Err_Timeout = -5,    //超时
};

@protocol WechatAuthAPIDelegate<NSObject>
@optional

- (void)onAuthGotQrcode:(UIImage *)image;  //得到二维码
- (void)onQrcodeScanned;    //二维码被扫描
- (void)onAuthFinish:(int)errCode AuthCode:(nullable NSString *)authCode;    //成功登录

@end

@interface WechatAuthSDK : NSObject{
    NSString *_sdkVersion;
    __weak id<WechatAuthAPIDelegate> _delegate;
}

@property(nonatomic, weak, nullable) id<WechatAuthAPIDelegate> delegate;
@property(nonatomic, readonly) NSString *sdkVersion;   //authSDK版本号

/*! @brief 发送登录请求，等待WechatAuthAPIDelegate回调
 *
 * @param appId 微信开发者ID
 * @param nonceStr 一个随机的尽量不重复的字符串，用来使得每次的signature不同
 * @param timeStamp 时间戳
 * @param scope 应用授权作用域，拥有多个作用域用逗号（,）分隔
 * @param signature 签名
 * @param schemeData 会在扫码后拼在scheme后
 * @return 成功返回YES，失败返回NO
    注:该实现只保证同时只有一个Auth在运行，Auth未完成或未Stop再次调用Auth接口时会返回NO。
 */

- (BOOL)Auth:(NSString *)appId
    nonceStr:(NSString *)nonceStr
   timeStamp:(NSString *)timeStamp
       scope:(NSString *)scope
   signature:(NSString *)signature
  schemeData:(nullable NSString *)schemeData;


/*! @brief 暂停登录请求
 *
 * @return 成功返回YES，失败返回NO。
 */
- (BOOL)StopAuth;

@end

NS_ASSUME_NONNULL_END
