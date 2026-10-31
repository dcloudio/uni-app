//
//  ZIMRpcManager.h
//  DTFIdentityManager
//
//  Created by richard on 26/02/2018.
//  Copyright © 2018 com. DTF.iphoneclient.DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <DTFUtility/DTFUtility.h>
#import <DTFUtility/DTFRPCProxyProtocol.h>

/**
 *  rpc结果回调
 *
 *  @param success 网络交互是否成功(不代表服务端返回的结果)
 *  @param result  服务端返回的结果
 */

typedef NSString * _Nullable (^CollectInfoSignBlock)(NSDictionary * _Nonnull collectInfoSigDict);

@interface ZimRpcManager : NSObject

@property(nonatomic, strong) APBToygerBioBisConfigManager *protoclModel;
@property(nonatomic, copy) NSString *zimId;
@property(nonatomic, copy) NSDictionary *ossConfig;
@property(nonatomic, copy) CollectInfoSignBlock signBlock;

@property(nonatomic, weak) id<DTFRPCProxyProtocol> rpcDelegate;

//代理模式
//- (void)doValidateRequetViaDelegate:(ZimValidateRequest * )request withcompletionBlock:(rpcCompletionBlock)blk;

/**
 *  zim init request
 *
 *  @param request 初始化请求
 *  @param blk     网络请求结果回调处理，result为ZimInitResponse
 */
- (void)doFastUploadInitRequest:(NSDictionary * )request withcompletionBlock:(DTFRpcCompletionBlock)blk;
/**
 *  zim validate request
 *
 *  @param request validate请求
 *  @param blk     网络请求结果回调处理，result为ZimValidateResponse
 */
- (void)doFastUploadValidateRequest:(ZimValidateRequest * )request withcompletionBlock:(DTFRpcCompletionBlock)blk;


//OCR接口
- (void)doSendOCRContent:(NSString*)certifyId idSide:(NSString*)side withImage:(NSData*)imageData imageSource:(NSInteger)imageSource withcompletionBlock:(rpcCompletionBlock)blk;

//EKYC OCR接口
- (void)doSendEKYCOCRContent:(NSDictionary*)params withcompletionBlock:(DTFRpcCompletionBlock)blk ;

//EKYC OCR确认接口
- (void)doSendEKYCOCRContentConfrim:(NSDictionary*)params withcompletionBlock:(DTFRpcCompletionBlock)blk ;

//侧信道oss上传
- (void)doUploadOSSContent:(NSDictionary*)params withcompletionBlock:(DTFRpcCompletionBlock)blk;

// SMS 请求接口
- (void)getSMSCode:(NSDictionary*)serviceParameters completionBlock:(DTFRpcCompletionBlock)blk;

// SMS 验证接口
- (void)verifySMSCode:(NSDictionary*)serviceParameters completionBlock:(DTFRpcCompletionBlock)blk;

@end
