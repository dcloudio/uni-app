//
//  DTFSDKConfiguration.h
//  DTFUtility
//
//  Created by 汪澌哲 on 2023/5/22.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DTFSDKConfiguration : NSObject

//原数据
@property (nonatomic, copy) NSString *NEED_BACKUP_URL;
@property (nonatomic, copy) NSString *LOG_UPLOAD;
@property (nonatomic, copy) NSString *LOG_DEBUG_UPLOAD;
@property (nonatomic, copy) NSString *FORCE_MODEL_DOWNLOAD;
@property (nonatomic, copy) NSString *URLSESSION_DEGRADE;
@property (nonatomic, copy) NSString *MULTI_PICTURE_COLLECT;
@property (nonatomic, copy) NSString *EQUIPMENT_LIVENESS_THRESHOLD;
@property (nonatomic, copy) NSString *GEN_VIDEO_DEGRADE;
@property (nonatomic, copy) NSArray *MODEL_FILES;
@property (nonatomic, copy) NSString *PRESENT_VC_USE_COMPLETION;
@property (nonatomic, copy) NSString *BIO_USE_DELEGATE_REPLACE_KVO;
@property (nonatomic, copy) NSString *USE_BACKUP_DOMAIN_WHEN_TIMEOUT;//为@"1"时打开
@property (nonatomic, copy) NSString *NEED_OBSERVER_CAPTURE_SESSION;//是否需要监听session错误
/// 关闭重签名
@property (nonatomic, copy) NSString *DISABLE_RESIGN_ON_UPLOAD_FAILED;
@property (nonatomic, copy) NSString *SESSION_INTERRUPT_PROMPT;//摄像头无法录制提示信息
@property (nonatomic, copy) NSString *ROTATION_OLD_STYLE;//是否使用老代码处理旋转
@property (nonatomic, copy) NSString *CLIENT_NATIVE_PHOTINUS;
@property (nonatomic, copy) NSString *LOG_UPLOAD_TIMER;
@property (nonatomic, copy) NSString *GEN_VIDEO_WITH_IMAGE;
/// 是否支持从相册选择
@property (nonatomic, copy) NSString *OCR_SOURCE_ALBUM;
/// iOS 改变屏幕亮度的方式是否为突变 （默认为渐变）
@property (nonatomic, copy) NSString *SET_BRIGHTNESS_DIRECTLY;
//处理后数据
@property (nonatomic, assign) BOOL urlSessionDegrade;
- (void)setConfigString:(NSString *)string;

- (void)updateConfig;

@end

