//
//  ASSSecureInfo.h
//  APPSecuritySDK
//
//  Created by msq on 2018/7/9.
//  Copyright © 2018年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

#define  ASSSecureInfo      ASSSecureInfoCore

@interface ASSSecureInfo : NSObject
/**
 *  重打包检测
 *  返回值：YES表示个人签名；NO表示企业签名
 *
 */
+ (BOOL)hasPersonSign;

/**
 *  越狱检测
 *  返回值：0表示非越狱；大于0其他值表示越狱
 *
 */
+ (uint32_t)checkJB;

@end
