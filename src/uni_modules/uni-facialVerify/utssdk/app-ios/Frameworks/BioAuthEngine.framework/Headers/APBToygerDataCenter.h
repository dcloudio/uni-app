//
//  APFDataCenter.h
//  APFaceDetectBiz
//
//  Created by yukun.tyk on 9/8/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <BioAuthEngine/BioAuthEngine.h>
#import <DTFUtility/ToygerData.h>

@class BisBehavTask;

@protocol APBToygerDataCenterDelegate <NSObject>

/**
 *  收到response的回调
 *  @param success rpc是否成功
 *  @param retCode 结果码
 *  @param msg     结果信息
 *  @param ext     扩展信息
 */
- (void)didFinishUploadWithSuccess:(BOOL)success
                           retCode:(NSString *)retCode
                        retMessage:(NSString *)msg
                           extInfo:(NSString *)ext;
@end


@interface APBToygerDataCenter : NSObject

@property (nonatomic, copy) NSString *pubkey;
/**
 *  初始化
 *
 *  @param config 配置参数
 */
- (instancetype)initWithConfig:(NSDictionary *)config;



#ifdef SUPPORT_PB

/**
 *  添加采集数据
 *
 *  @param monitorImage 监控照片
 *  @param panoImage    全景图，若该参数指定，将替换之前的全景图
 */
- (void)addMonitorImage:(UIImage *)monitorImage
       replacePanoImage:(NSData *)panoImage
       andCypherKeyData:(NSData *)cypherKey;

#else

/**
 *  添加采集数据
 *
 *  @param monitorImage 监控照片
 *  @param panoImage    全景图，若该参数指定，将替换之前的全景图
 */
- (void)addMonitorImage:(UIImage *)monitorImage
       replacePanoImage:(ToygerUploadContent *)panoImage
       andCypherKeyData:(NSString *)cypherKey;

#endif

/**
 *  清除采集数据
 *
 *  @param monitorImage 监控照片
 *  @param panoImage    全景图，
 */
- (void)clearMonitorImage:(BOOL)monitor
                panoImage:(BOOL)pano;

/**
 *  添加行为日志
 *
 *  @param task 任务
 */
- (void)addBehavTask:(BisBehavTask *)task;

/**
 *  clearTask
 *
 *
 */
- (void)clearTask;
/**
 *  clear
 *
 *
 */
- (void)clear;

- (BOOL)hasFaceData;

/**
 *  建立上传数据request
 *
 *  @param monitor 是否上传监控照片
 *  @param behav   是否上传行为日志
 *  @param pano    是否上传全景图
 *  @param type    触发类型
 *  @param retry   重试次数
 */
- (APBBisUploadGwRequest *)buildUploadRequestWithMonitorImage:(BOOL)monitor
                                                     behavLog:(BOOL)behav
                                                    panoImage:(BOOL)pano
                                                   invokeType:(NSString *)type
                                                     retryCnt:(NSInteger)retry;

- (APBBisUploadGwRequest *)buildUploadRequestWithRetryCnt:(NSInteger)retry;

- (NSString *)rsaImage:(NSString *)pubkey image:(UIImage *)image ;


/**
 *  设置delegate
 */
- (void)setDelegate:(id<APBToygerDataCenterDelegate>)delegate;

@end
