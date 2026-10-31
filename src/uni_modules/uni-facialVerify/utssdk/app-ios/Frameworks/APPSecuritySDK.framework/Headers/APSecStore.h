//
//  APSecStore.h
//  APPSecuritySDK
//
//  Created by eric on 2021/3/10.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface APSecStore : NSObject

/*
 *功能:     从keychain中载入字符串
 *线程安全: 是
 *可重入:   是
 *@return: 成功返回key对应字符串,失败返回nil
 *@param key:不能为nil
 *@param error:失败时保存错误信息
 */
+(NSString*) loadKey:(NSString*) key error:(NSError **)error;

/*
 *功能:     将字符串(键－值对)存入keychain
 *线程安全: 是
 *可重入:   是
 *@return: 成功返回yes,失败返回no
 *@param key:不能为nil
 *@param value:不能为nil
 *@param error:失败时保存错误信息
 */
+(BOOL) saveKey:(NSString*) key Value:(NSString*)value error:(NSError **)error;

/*
 *功能:     从keychain中删除字符串（键－值对）
 *线程安全: 是
 *可重入:   是
 *@return: 成功返回yes,失败返回no
 *@param key:不能为nil
 *@param error:失败时保存错误信息
 */
+(BOOL) deleteKey:(NSString*) key error:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
