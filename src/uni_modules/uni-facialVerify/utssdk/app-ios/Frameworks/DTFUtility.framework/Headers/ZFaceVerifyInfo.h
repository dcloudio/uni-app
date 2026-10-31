//
//  ZFaceVerifyInfo.h
//  DTFOpenPlatformBuild
//
//  Created by richard on 26/02/2018.
//  Copyright © 2018 com. .iphoneclient.DTF. All rights reserved.
//
#import <Foundation/Foundation.h>

@interface ZFaceVerifyInfo : NSObject

@property(nonatomic, strong) NSString *secretToken;
@property(nonatomic, strong) NSString *wWORKSPACEID;
@property(nonatomic, assign) NSNumber *isSecuritySDKNumber;
+(instancetype)getInstance;

- (NSString *)getTokenContent;

- (NSString *)securityVersion;

- (void)ActivityToken;

- (void)ActivityTokenWithParam:(NSDictionary*)param;

- (NSString *)ApperceptRiskwith:(NSInteger)action extParams:(NSDictionary *)args;

- (NSString *)getSecurityChannel;
//是否支持deepSec
- (BOOL)securitySDKSupportDeepSec;

@end
