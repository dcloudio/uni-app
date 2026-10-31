//
//  AFEAlertView.h
//  BioAuthEngine
//
//  Created by shuhong.xsh on 16/8/3.
//  Copyright © 2016年 DTF. All rights reserved.
//  弹出框管理类

#import <UIKit/UIKit.h>

typedef void (^AFEAlertClickBlock) ();

@interface AFEAlertView : NSObject

@property(atomic, assign) BOOL isAlertViewShow;

+(AFEAlertView*) sharedInstance;

/**
 *  当前alert是否显示
 */
- (BOOL)isAlertViewShow;

/**
 *  显示alert
 *
 *  @param title       标题
 *  @param msg         提示信息
 *  @param firstTitle  第一个按钮提示文案(不可为空)
 *  @param secondTitle 第二课提示文案(可为空)
 *  @param fblk        第一个按钮点击事件callback(不可为空)
 *  @param sblk        第二个按钮点击事件callback(可为空)
 */
- (void)displayAlertViewWithTitle:(NSString *)title
                          message:(NSString*)msg
                 firstButtonTitle:(NSString *)firstTitle
                secondBittonTitle:(NSString *)secondTitle
                    firstCallBack:(AFEAlertClickBlock)fblk
                   secondCallBack:(AFEAlertClickBlock)sblk
                    withVC:(UIViewController*)parentViewController;


/**
 * 活体失败
 *
 */
- (void)displayLivnessFailAlertView:(NSString *)title
                               tips:(NSString*)tip
                          cancleTip:(NSString *)cancelTips
                           retryTip:(NSString *)retryTips
                 withCancelCallBack:(AFEAlertClickBlock)cancel
                      retryCallBack:(AFEAlertClickBlock)retry
                    withVC:(UIViewController*)parentViewController;

/**
 *  展示浮层提示框
 *  @param superview   父view
 *  @param title       主文案，只能显示一行
 *  @param detailTitle 副文案，最多显示两行
 *  @param cancelTips  取消按钮文本
 *  @param retryTips   再试一次按钮文本
 */
- (void)displayCameraPermissionAlert:(UIViewController *)parentViewController
                               title:(NSString *)title
                         detailTitle:(NSString *)detailTitle
                           cancleTip:(NSString *)cancelTips
                            retryTip:(NSString *)retryTips
                      cancelCallBack:(AFEAlertClickBlock)cancelCall
                         setCallBack:(AFEAlertClickBlock)setCall;

// 判断最顶层视图是否是 APBAlertViewController
- (BOOL)isAPBAlertViewController;

- (UIViewController *)currentViewController;

@end
