//
//  DTFWebView.h
//  DTFUtility
//
//  Created by 程佳兵(威琦) on 2025/11/19.
//  Copyright © 2025 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, DTFWebViewCancelType) {
    DTFWebViewCancelTypeActiveWithdrawal = 0,//主动退出， 导航栏关闭按钮触发
    DTFWebViewCancelTypeNotCertifiedYet, //暂不认证， h5 通过js 桥触发
};


@protocol DTFWebViewDelegate <NSObject>
/// 点击导航栏的关闭按钮
- (void)closeBtnDidClick:(DTFWebViewCancelType)type;

@optional
- (void)onButtonBegin:(BOOL)suitableType query:(NSDictionary *)dict;
- (void)onLoadFinished:(BOOL)success;
- (void)onH5Logger:(NSString *)h5Logger;
- (void)onButtonAgreement;

// 导航栏的关闭按钮图片
- (UIImage *)closeImage;
// 导航栏的返回按钮图片
- (UIImage *)backImage;

@end

/// h5 容器
@interface DTFWebView : UIView <WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate>
@property(strong,nonatomic) WKWebView *wkwebView;

@property(nonatomic, assign)BOOL loaded;
@property(nonatomic, weak)UIViewController *currentViewController;

- (void)setWebGuideViewDelegate:(id<DTFWebViewDelegate>)webGuideViewDeleage;
- (void)setURL:(NSURL *)url;
//清除网页的localstorage,localStorage存储了自定义UI信息
- (void)clearUICustomSettingWebLocalStorage;

@end

NS_ASSUME_NONNULL_END
