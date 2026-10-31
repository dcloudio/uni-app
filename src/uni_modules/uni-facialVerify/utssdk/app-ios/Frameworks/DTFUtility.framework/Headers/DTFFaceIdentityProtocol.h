//
//  DTFIdentityProtocol.h
//  DTFUtility
//
//  Created by mengbingchuan on 2023/6/7.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "ZIMResponse.h"
#import "DTFRPCProxyProtocol.h"

@protocol DTFFaceIdentityProtocol <NSObject>

- (void)initSDK;

- (void)initIPv6;

- (NSString *)getVersion;

- (void)setDataProtocolVersion:(NSString *)version;

- (void)setRpcProxy:(id<DTFRPCProxyProtocol>)proxy;

- (NSDictionary *)getMetaInfo;

- (void)preload:(NSDictionary *)param completion:(void (^)(BOOL success))completion;

- (void)verifyWith:(NSString *)zimId
         extParams:(NSDictionary *)params
      onCompletion:(void (^)(ZIMResponse *response))callback;
-(BOOL)isBusyWithVerifing:(NSString *)newZimId;

@end
