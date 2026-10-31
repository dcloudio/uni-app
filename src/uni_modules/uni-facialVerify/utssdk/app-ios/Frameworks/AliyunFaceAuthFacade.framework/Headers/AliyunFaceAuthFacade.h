//
//  AliyunFaaceAuthFacade.h
//  AliyunFaceAuthFacade
//
//  Created by 汪澌哲 on 2022/11/21.
//  Copyright © 2022 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <DTFUtility/ZIMResponse.h>
#import <DTFUtility/DTFConstant.h>

NS_ASSUME_NONNULL_BEGIN

@interface AliyunFaceAuthFacade : NSObject

+ (void)init;

+ (void)initSDK;

/* IPV6的初始化接口 只有你的网络环境强制要求是IPV6的时候，才调用initIPv6。
 */
+ (void)initIPv6;

+ (NSString *)getVersion;

+ (NSString *)getNFCVersion;

+ (void)preload:(NSDictionary *)param completion:(void (^)(BOOL success))completion;

+ (NSDictionary *)getMetaInfo;

+ (NSDictionary *)getNFCMetaInfo;

+ (void)verifyWith:(NSString *)zimId
         extParams:(NSDictionary *)params
      onCompletion:(void (^)(ZIMResponse *response))callback;

+ (void)nfcVerifyWith:(NSString *)zimId
         extParams:(NSDictionary *)params
      onCompletion:(void (^)(ZIMResponse *response))callback;

+ (void)setCustomUI:(nonnull NSString *)configuration type:(nonnull NSString *)type completion:(void(^)(BOOL success, NSError *error))completion;

+ (void)setCustomLanguage:(nonnull NSString *)configuration type:(nonnull NSString *)type completion:(void(^)(BOOL success, NSError *error))completion;

@end

NS_ASSUME_NONNULL_END
