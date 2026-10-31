//
//  AntSecurityManager.h
//  APPSecuritySDK
//
//  Created by msq on 2018/8/20.
//  Copyright © 2018年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum: NSInteger {
    //正常
    SEC_STORE_OK = 0,
    //未找到
    SEC_STORE_NOT_FOUND = 10001,
    //拷贝
    SEC_STORE_CP = 10002,
    //内部错误
    SEC_STORE_ERR = 10003,
    
    SEC_STORE_PARAM_ERR = 10004,
    
    SEC_STORE_DEGRADE_ERR = 10005,
    
} SEC_STORE_ERR_CODE;

@interface APSecStoreResult : NSObject

@property (nonatomic, strong) NSString* value;

@property (nonatomic, assign) SEC_STORE_ERR_CODE errCode;

@property (nonatomic, assign) int errCodeDetail;

@end

@interface AntSecurityManager : NSObject

/**
 * brief aes_encrypt
 * ase 加密
 * param data        原始数据
 *
 * return
 * 返回加密后数据
 * nil 表示异常
 */
+ (NSString*)securityEncrypt:(NSString*)data;

/**
 * brief aes_decrypt
 * ase 解密
 * param data        加密原始数据
 *
 * return
 * 返回解密后数据
 * nil 表示异常
 */
+ (NSString*)securityDecrypt:(NSString*)data;

/**
 * brief wbSign
 *
 * param data 签名数据
 *
 * return
 * 签名数据 44B base64文本
 */
+ (NSString*)wbSign:(NSString*)data;

/**
 *防拷贝存储保存数据接口
 *@param key
 *@param value 需要加密的数据
 *@param bizType 业务场景
 *@return 返回错误码，0表示正常，其他非0值都表示异常
 */

+ (int) setSafeStore:(NSString*)key value:(NSString*)value bizType:(NSString*)bizType;

/**
 *防拷贝存储读取数据接口
 *@param key
 *@param bizType 业务场景
 *@return 返回APSecStoreResult对象
 *   SEC_STORE_OK                 0       正常
 *   SEC_STORE_NOT_FOUND        10001     未找到
 *   SEC_STORE_CP               10002     拷贝
 *   SEC_STORE_ERR              10003     内部错误
 */
+ (APSecStoreResult*)getSafeStore:(NSString*)key bizType:(NSString*)bizType;

/**
 *删除保存数据接口
 *@param key
 *@param bizType 业务场景
 *@return 返回错误码，0表示正常，其他非0值都表示异常
 */
+ (int) deleteSafeStore:(NSString*)key bizType:(NSString*)bizType;

@end
