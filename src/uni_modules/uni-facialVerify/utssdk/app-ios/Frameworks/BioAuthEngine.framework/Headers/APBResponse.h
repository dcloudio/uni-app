//
//  APBResponse.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/9/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 结果码定义
 */
typedef enum {
    APB_RESULT_SUCCESS                      = 500,      //操作成功(不弹框)
    APB_RESULT_SUCCESS_VALIDATE_UPLOAD      = 501,      //操作成功(不弹框)，合并上传
    APB_RESULT_SUCCESS_VALIDATE_OCRUPLOAD   = 502,      //EKYC OCR识别
    APB_RESULT_SUCCESS_VALIDATE_OCRUPLOAD_CONFIRM   = 503,      //EKYC OCR确认

    APB_RESULT_CAMERA_PERMISSION_DENIED     = 100,      //无摄像头权限(弹框)
    APB_RESULT_CAMERA_DEVICE_UNSUPPORTED    = 101,      //摄像头不支持(弹框)
    APB_RESULT_CAMERA_CPU_UNSUPPORTED       = 102,      //CPU不支持(弹框)
    APB_RESULT_DEVICE_UNSUPPORTED           = 103,      //设备不支持(弹框)
    APB_RESULT_UNDEFINED_ERROR              = 104,      //其他异常(不弹框)
    
    APB_RESULT_CAMERA_INIT_FAILED           = 200,      //摄像头初始化失败(不弹框)
    APB_RESULT_INVALID_ARGUMENT             = 201,      //无效的业务参数(不弹框)
    APB_RESULT_INTERRUPT                    = 202,      //操作中断(弹框)
    APB_RESULT_TIMEOUT                      = 203,      //操作超时(弹框)
    APB_RESULT_RESOURCE_ABSENCE             = 204,      //缺少资源文件(不弹框)
    APB_RESULT_SYSTEM_EXCEPT                = 205,      //系统异常(不弹框)
    APB_RESULT_ENGINE_EXCEPT                = 206,      //框架内部错误(不弹框)
    APB_RESULT_NETWORK_TIMEOUT              = 207,      //网络超时(弹框)
    APB_RESULT_SERVER_FAIL                  = 208,      //服务端错误(弹框)
    APB_RESULT_RETRY_LIMIT                  = 209,      //重试次数达到上限(弹框)
    APB_RESULT_AUTH_REJECT                  = 210,      //用户拒绝人脸授权(弹框)
    APB_RESULT_NETWORK_FAIL                 = 211,      //网络出错
    
    APB_RESULT_USE_PASSWORD                 = 300,      //用户选择账密登录(弹框)
    APB_RESULT_OTHER_VERIFICATION           = 303,      //其他核身方式
    APB_RESULT_LOCALVERIFY_FAIL             = 304,      //本地比对失败
    APB_RESULT_TOYGERSERVICE_FAILED         = 305,      //toyer 模型异常
    APB_RESULT_UPLOAD_IMAGE_NIL             = 306,      //上传的图片为空
}APBResultType;

@interface APBResponse : NSObject

@property(nonatomic, assign)APBResultType resultType;           //结果码
@property(nonatomic, copy)NSString *failReason;                 //失败原因
@property(nonatomic, copy)NSString *token;                      //bis token
@property(nonatomic, strong)NSMutableDictionary *successResult; //成功结果
@property (nonatomic,copy) NSString* retCodeSub ;
@property (nonatomic,copy) NSString* retMessageSub ;

- (instancetype)initWithResultType:(APBResultType)type
                        failReason:(NSString *)reason
                             token:(NSString *)token
                        retCodeSub:(NSString *)retCodeSub
                     retMessageSub:(NSString *)retMessageSub
                     successResult:(NSMutableDictionary *)result;

- (instancetype)initWithResultType:(APBResultType)type
                        failReason:(NSString *)reason
                             token:(NSString *)token
                     successResult:(NSMutableDictionary *)result;

@end
