//
//  ASSSecureSdk.h
//  APSecSecuritySDK
//
//  Created by xingchen on 15/2/26.
//  Copyright (c) 2015年 Alipay. All rights reserved.
//
#import <Foundation/Foundation.h>

//初始化API的字典参数中,TID的key
//key for TID in the NSDictionary parameter for initToken:callback: API
extern NSString * const ASS_TID;

//初始化API的字典参数中，userid的key
//key for USERID in the NSDictionary parameter for initToken:callback: API
extern NSString * const ASS_USERID;

//初始化API的字典参数中,环境变量的key
//key for server environment configuration in the NSDictionary parameter for initToken:callback: API
extern NSString * const ASS_ENVIRONMENT;

//初始化API的字典参数中，环境变量的value，代表线上环境
//value for server configuration in the NSDictionary parameter for initToken:callback: API, stands for online environment
extern NSString * const ASS_ENVIRONMENT_ONLINE;

//初始化API的字典参数中，环境变量的value，代表测试环境
//value for server configuration in the NSDictionary parameter for initToken:callback: API, stands for test environment
extern NSString * const ASS_ENVIRONMENT_SIT;

//初始化API的字典参数中，环境变量的value，代表开发环境
//value for server configuration in the NSDictionary parameter for initToken:callback: API, stands for daily environment
extern NSString * const ASS_ENVIRONMENT_DAILY;

//初始化API的字典参数中，环境变量的value，代表预发环境
//value for server configuration in the NSDictionary parameter for initToken:callback: API, stands for pre online environment
extern NSString * const ASS_ENVIRONMENT_PRE;

//初始化API的字典参数中,设置RPC网关地址的key。
//key for RPC server gateway address in the NSDictionary parameter for initToken:callback: API.
//If value for this key is specified, the value for ASS_ENVIRONMENT will be ignored.
extern NSString* const ASS_RPC_GATEWAY_ADDR;

//rpc header workspaceid key
extern NSString* const ASS_RPC_WORKSPACEID;

//rpc header appid key
extern NSString* const ASS_RPC_APPID;

//初始化API的字典参数中,设置UMID网关host地址的key。
//host 要设置的线上地址，如ynuf.alipay.com，不要带协议头，不要带后面的参数，只能传纯host地址
//key for UMID server host in the NSDictionary parameter for initToken:callback: API.
//host should only contain online address such as ynuf.alipay.com, without protocol or parameters.
extern NSString* const ASS_UMID_HOST;

//初始化API的字典参数中,设置加密的umid。
extern NSString * const ASS_ENCODE_UMID;

/*!
 @typedef ASSStatusCode
 
 Possible return codes
 @constant ASSStatusCodeOk                       Completed, No errors
 @constant ASSStatusCodeInvalidParam             input param invalid
 @constant ASSStatusCodeAppNameNil               appName is nil
 @constant ASSStatusCodeAppKeyNil                appKeyClient is nil
 @constant ASSStatusCodeConnectionError          network connection failure
 */
typedef NS_ENUM(NSInteger, ASSStatusCode)
{
    ASSStatusCodeOk = 0,
    ASSStatusCodeInvalidParam,
    ASSStatusCodeAppNameNil,
    ASSStatusCodeAppKeyNil,
    ASSStatusCodeConnectionError,
    
};

typedef NS_ENUM(NSInteger, ASSAddressFlag)
{
    ASSAddressFlagIndonesia = 1,
    ASSAddressFlagMalaysia  = 2,
    ASSAddressFlagPilipinas = 3,
    ASSAddressFlagSingapore = 4,
    ASSAddressFlagIpayVn    = 11,
    ASSAddressFlagIpayId    = 12,
    ASSAddressFlagIpayMy    = 13,
    ASSAddressFlagIpaySg    = 14,
    ASSAddressFlagIpayTh    = 15,
    ASSAddressFlagIpayPh    = 16,
    ASSAddressFlagIpayDefault = 17,
};

@interface APSecureSdk : NSObject

/**
 获取单例
 */
+ (id)sharedInstance;

/*
 *网关设置
 */
- (void)setSecuritySDKConfig:(ASSAddressFlag)address;

/**
 初始化
 */
- (void)initWithRpcConfiguration:(NSDictionary *) config;

//===================测试联调 api====================//
- (void)setRpcConfiguration:(NSDictionary *) config;

+(BOOL) isSupportFaceShield;

+(BOOL) isTrackingAuthorization;

@end
