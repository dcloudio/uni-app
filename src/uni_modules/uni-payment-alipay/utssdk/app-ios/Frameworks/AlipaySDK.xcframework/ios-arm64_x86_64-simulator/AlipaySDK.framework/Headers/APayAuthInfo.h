//
//  APAuthInfo.h
//  APAuth
//
//  Created by antfin on 17-10-24.
//  Copyright (c) 2017年 AntFin. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface APayAuthInfo : NSObject

@property(nonatomic, copy)NSString *appID;
@property(nonatomic, copy)NSString *pid;
@property(nonatomic, copy)NSString *redirectUri;

/**
 *  初始化AuthInfo
 *
 *  @param appIDStr     应用ID
 *  @param pidStr       商户ID   可不填
 *  @param uriStr       授权的应用回调地址  比如：alidemo://auth
 *
 *  @return authinfo实例
 */
- (id)initWithAppID:(NSString *)appIDStr
                pid:(NSString *)pidStr
        redirectUri:(NSString *)uriStr;

- (NSString *)description;
- (NSString *)wapDescription;

@end
