//
//  APSecRDS.h
//  APSecRDS
//
//  Created by xingchen on 15/4/8.
//  Copyright (c) 2015年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface APSecRDS : NSObject

/*
 appname	当前app的名称
 appver     当前app的版本
 sdkname	当前sdk的名称
 sdkver     当前sdk的版本
 user       淘宝/支付宝身份
 pagesrc	淘宝/支付宝
 page       当前页面标识
 
 */
-(void) onPageWithView:(NSString*)pageName args:(NSDictionary*) inArgs;
-(NSString*) onPageEndWithView:(NSString*) pageName user:(NSString*) userName;
-(NSString*) onPageEndZipDataWithView:(NSString*)pageName user:(NSString*)userName;

-(void) onControlClickWithView:(NSString*) pageName ctrl: (NSString*)ctrlName;

//按键信息
-(void) onKeyDownWithView:(NSString*) pageName ctrl:(NSString*) ctrlName keyCode:(NSString*)keyValue;

//焦点信息
-(void) onGetFocusWithView:(NSString*)pageName ctrl:(NSString*) ctrlName;
-(void) onLostFocusWithView:(NSString*) pageName ctrl:(NSString*) ctrlName;

//触屏信息
-(void) onTouchScreenWithView:(NSString*)pageName ctrl:(NSString*) ctrlName point:(CGPoint) pt;


@end
