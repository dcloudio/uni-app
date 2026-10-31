//
//  AFEScanViewDelegate.h
//  FaceEyePrint
//
//  Created by yukun.tyk on 12/28/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <BioAuthEngine/AFEStatusBar.h>

/**
 *  扫描界面接口，可以展示扫描动画和提示错误消息，错误消息内部做了平滑处理，
 *  1s内只会显示一条错误消息，在这期间传入的消息会做缓存处理，最多缓存1条消息
 *  如果同时播放声音，声音会与错误消息做同步处理
 */

typedef NS_ENUM(NSInteger, AFEScanViewStatus) {
    AFE_SCAN_SHOWING_ERROR,     //正在显示错误
    AFE_SCAN_SCANNING,          //正在扫描
    AFE_SCAN_HOLDING,           //等待显示缓存信息
    AFE_SCAN_STOPPED,           //停止中
};


@protocol AFEScanViewProtocol <NSObject>

/**
 *  导航栏回调
 */
- (void)setDelegate:(id<IStatusBarDelegate>)delegate;

/**
 *  设置导航栏透明度
 */
- (void)setNaviBarAlpha:(CGFloat)alpha;

/**
 *  设置扫描进度
 */
- (void)showPercent:(CGFloat)stage;

@end
