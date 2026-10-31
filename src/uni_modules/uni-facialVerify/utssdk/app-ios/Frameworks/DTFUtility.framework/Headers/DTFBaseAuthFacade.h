//
//  DTFBaseAuthFacade.h
//  DTFUtility
//
//  Created by mengbingchuan on 2024/1/19.
//  Copyright © 2024 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZIMResponse.h"

@interface DTFBaseAuthFacade : NSObject

+ (void)initSDK;

/* IPV6的初始化接口 只有你的网络环境强制要求是IPV6的时候，才调用initIPv6。
 */
+ (void)initIPv6;

+ (NSString *)getVersion;

+ (NSDictionary *)getMetaInfo;

+ (void)preloadWithCompletion:(void (^)(BOOL))completion;

+ (void)preloadWithExtParams:(NSDictionary *)params
                onCompletion:(void (^)(BOOL))completion;

+ (void)setCustomUI:(nonnull NSString *)configuration 
               type:(nonnull NSString *)type
         completion:(void(^)(BOOL success, NSError *error))completion;

+ (void)setCustomLanguage:(nonnull NSString *)configuration 
                     type:(nonnull NSString *)type
               completion:(void(^)(BOOL success, NSError *error))completion;

+ (void)verifyWith:(NSString *)certifyId
         extParams:(NSDictionary *)params
      onCompletion:(void (^)(ZIMResponse *response))callback;

@end
