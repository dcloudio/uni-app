//
//  APBAuthEngine.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/9/15.
//  Copyright © 2015 DTF. All rights reserved.
//
//

#import <Foundation/Foundation.h>
#import "BioAuthFacade.h"

/**
 生物认证类型定义
 */
typedef enum {
    BIO_FACE =          100,                //人脸识别
    BIO_VOICE =         101,                //声纹识别
    BIO_HANDWRITING =   103,                //笔迹识别
    BIO_IDPAPERS    =   107,                //重构后的证件宝
    BIO_CARD =          109,                //证件宝
    BIO_DTF_DOC =     110,                //一体化证件宝
    BIO_FACE_VOICE =    202,                //人脸+声纹识别
    BIO_FACE_EYE =      201,                //人脸+眼纹识别
    BIO_CARD_FACE =     200,                //人证合一
    BIO_TOYGER    =     300,                //Toyger产品
}APBBioType;

/**
 操作类型定义
 */
typedef enum {
    ACTION_COLLECT =    300,                //采集操作
    ACTION_VERFIY =     301,                //验证操作
}APBActionType;

@interface APBAuthEngine : NSObject

/**
 *  唤起生物认证之前获取框架meta数据
 */
+ (NSString *)getBioMetaInfo;

/**
 *  触发下载资源文件
 */
+ (void)preLoad;

/**
 *  申请生物认证
 *
 *  @param request  生物认证请求
 *  @param callback 生物认证结果回调处理
 */
- (void)authWithRequest:(APBRequest *)request withCallback:(BioAuthCallback)callback;

/**
 *  让正在进行中的生物认证因子执行某种操作
 *
 *  @param command  操作码
 *  @param callback 执行结果回调
 */
- (void)exec:(APBCommand *)command withCompletionCallback:(BioAuthExecCallback)callback;

/**
 *  当前是否运行任务
 */
- (BOOL)isBusy;
 
/**
 *  生物认证类型版本号
 *
 *  @return 生物认证类型版本号
 */
- (NSString *)version;

/**
 *  当前运行的认证方式
 */
+ (NSString *)getAuthFactorName;

@end
