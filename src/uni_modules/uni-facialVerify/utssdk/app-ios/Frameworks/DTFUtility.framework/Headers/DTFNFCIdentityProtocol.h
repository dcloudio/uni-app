//
//  DTFNFCIdentityProtocol.h
//  DTFUtility
//
//  Created by mengbingchuan on 2023/6/8.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DTFRPCProxyProtocol.h"
#import "ZIMResponse.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DTFNFCIdentityProtocol <NSObject>

- (void)initSDK;

- (NSString *)getVersion;

- (void)setDataProtocolVersion:(NSString *)version;

- (void)setRpcProxy:(id<DTFRPCProxyProtocol>)proxy;

- (NSDictionary *)getMetaInfo;

- (void)verifyWith:(NSString *)zimId
         extParams:(NSDictionary *)params
      onCompletion:(void (^)(ZIMResponse *response))callback;


@end

NS_ASSUME_NONNULL_END
