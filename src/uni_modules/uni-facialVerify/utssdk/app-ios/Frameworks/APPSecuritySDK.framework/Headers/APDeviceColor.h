//
//  APDeviceColor.h
//  APPSecuritySDK
//
//  Created by eric on 2021/2/25.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface APDeviceColor : NSObject

/*
*  getColorLabel 设备染色接口
*
*  @param bizToken 业务场景
*  @param extParams 扩展参数
*  @param errInfo 错误信息
*
*  @return 设备染色数据
*/
+ (NSString*) getColorLabel: (NSString*) bizToken
                        ext: (NSDictionary *) extParams
                      error: (NSError **) errInfo;

/*
*  getColorLabel 设备染色接口
*
*  @param extParams 扩展参数
*  @param errInfo 错误信息
*
*  @return 设备染色数据
*/
+ (NSString*) getColorLabel: (NSDictionary *) extParams
                      error: (NSError **) errInfo;

@end

NS_ASSUME_NONNULL_END
