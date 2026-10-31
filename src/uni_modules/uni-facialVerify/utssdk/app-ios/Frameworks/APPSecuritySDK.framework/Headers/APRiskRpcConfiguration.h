//
//  APRiskRpcConfiguration.h
//  APPSecuritySDKAdapter
//
//  Created by hongren on 2020/9/8.
//  Copyright © 2020 Alipay. All rights reserved.
//
#import <Foundation/Foundation.h>

@interface APRiskRpcConfiguration : NSObject
// 超时时间
@property(nonatomic, assign) int timeout;

// 网关地址
@property(nonatomic, strong) NSString* gatewayURL;

// workspaceid和appid
@property(nonatomic, strong) NSDictionary *headers;

@end
