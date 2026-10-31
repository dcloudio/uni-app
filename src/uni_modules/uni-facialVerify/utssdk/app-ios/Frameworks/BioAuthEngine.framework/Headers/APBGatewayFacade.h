//
//  APBGatewayFacade.h
//  BioAuthEngine
//
//  Created by richard on 26/02/2018.
//  Copyright © 2018 com..iphoneclient.DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^apRpcCompletionBlock)(BOOL success, NSObject *result);

@interface APBGatewayFacade : NSObject


/**
 *  rpc结果回调
 *
 *  @param success 网络交互是否成功(不代表服务端返回的结果)
 *  @param result  服务端返回的结果
 */
-(void)request:(id)bisUploadGwRequest
    withConfig:(NSDictionary *)configDict
completionBlock:(apRpcCompletionBlock)blk;

@end

