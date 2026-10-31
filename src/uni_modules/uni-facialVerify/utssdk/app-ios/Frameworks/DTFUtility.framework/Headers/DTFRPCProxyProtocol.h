//
//  DTFRPCProxyProtocol.h
//  DTFUtility
//
//  Created by mengbingchuan on 2023/6/7.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//
#import <Foundation/Foundation.h>

typedef void (^rpcCompletionBlock)(NSError *error, NSObject *result);
typedef void (^DTFRpcCompletionBlock)(NSError *error, NSDictionary *data);

@protocol DTFRPCProxyProtocol <NSObject>

@required
/**
* ZimID初始化协议
* key: data
* value: jsonString
*/
- (void)zimInit:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* 结果认证
* key: data
* value: jsonString
*/
- (void)zimValidate:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

@optional

/**
* NFC结果认证
* key: data
* value: jsonString
*/
- (void)zimNFCValidate:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* 请求发送验证码
*/
- (void)requestSMSVerifyCode:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* 验证码结果验证
*/
- (void)checkSMSCode:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* OCR识别认证
*/
- (void)zimOCRIdentify:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* EKYC OCR识别认证
*/
- (void)zimEKYCOCRIdentify:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* EKYC OCR确认认证
*/
- (void)zimEKYCOCRConfirmIdentify:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;

/**
* oss上传
*/
- (void)zimFileUpload:(NSDictionary *)params completionBlock:(DTFRpcCompletionBlock)blk;



@end
