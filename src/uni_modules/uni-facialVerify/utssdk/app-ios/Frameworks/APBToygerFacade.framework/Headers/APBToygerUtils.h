//
//  APFUtils.h
//  APFaceDetectBiz
//
//  Created by 晗羽 on 8/25/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <APBToygerFacade/APBToygerFacadeDefine.h>

//#import "APFaceDetectBizFacade.h"

//主线程同步操作
#define SYNC_MAINTHREAD_BEGIN_APBT           [APBToygerUtils APBToygerMainThread:^{
#define SYNC_MAINTHREAD_END_APBT             }];

#define LOCK(locker, ...) dispatch_semaphore_wait(locker, DISPATCH_TIME_FOREVER); \
__VA_ARGS__; \
dispatch_semaphore_signal(locker);

@class MGLivenessDetectionFrameEncodedData;

@interface APBToygerUtils : NSObject

+ (void)APBToygerMainThread:(dispatch_block_t)block;

+ (NSString *)getTextContentforKey:(NSString*)keyName;
+ (NSString *)localizedTextForKey:(NSString *)key;
+ (NSBundle *)getBundle;

+ (int)getCodefrom:(NSString *)bisToken withLength:(int)codeLen;
//+ (NSString *)getActionNoticeByActionType:(APFLiveActionType) actionType;

//检查文件是否存在
+ (BOOL) checkFileunderPath:(NSString *) filePath;

//写入文件
//如果文件存在，不重写，返回失败。
//如果文件不再在，写入，返回写入结果
+ (BOOL) writeFileunderPath:(NSString *) filePath;

//删除文件
+ (BOOL) removeFileunderPath:(NSString *) filePath;

//随机文件名
+ (NSString *)randomString:(NSInteger)len;

+ (NSString *)localizedStringForKey:(NSString *)key;

+ (UIImage *)loadImageFromBundleNamed:(NSString *)imageName;

+ (UIWindow *)lastWindow;

+ (APBToygerTips *)toygerTipsConfig;

+ (BOOL)useElemeEquipmentUI:(APBToygerRemoteConfig *)config;

+ (BOOL)useNearFarLiveness:(APBToygerRemoteConfig *)config;

@end




