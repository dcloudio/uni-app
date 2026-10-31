//
//  APSign.h
//  APPSecuritySDK-Sign
//
//  Created by eric on 2021/2/25.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const APSE_SIGN_MODE_NORMAL;
extern NSString * const APSE_SIGN_MODE_ENHANCE;
extern NSString * const APSE_SIGN_MODE_NORMAL_ASYNC;
extern NSString * const APSE_SIGN_MODE_ENHANCE_ASYNC;

@interface APSign : NSObject

/*
*  getColorInfo 请求可信接口，获取数字签名
*
*  @param bizToken 业务场景
*  @param bizParam 业务参数
*  @param extParams 扩展参数
*  @param errInfo 错误信息
*
*  @return 数字签名数据
*/
+ (NSString*) getColorInfo: (NSString*) bizToken
                     param: (NSString*) bizParam
                       ext: (NSDictionary*) extParams
                     error: (NSError **) errInfo;

/*
*  preColorInfo 签名数据预处理接口，用于不同业务定制签名携带数据
*
*  @param userAction 当前动作,由业务定制的行为事件
*  @param extParams 业务参数，格式需要与内部对齐
*
*  @return 预处理数据
*/
+ (NSString*) preColorInfo: (int) userAction
                       ext: (NSDictionary*) extParams
                     error: (NSError **) errInfo;

/*
*  preColorInfo 签名数据预处理接口，用于不同业务定制签名携带数据
*
*  @param userAction 当前动作,由业务定制的行为事件
*  @param extParams 业务参数，格式需要与内部对齐
*
*  @return 预处理数据
*/
+ (NSString*) preColorInfoForString: (int) userAction
                                ext: (NSString*) extParams
                              error: (NSError **) errInfo;

@end

NS_ASSUME_NONNULL_END
