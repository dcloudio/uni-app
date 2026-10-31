//
//  DTFConfiguration.h
//  DTFSensorServices
//
//  Created by sanyuan.he on 2020/2/25.
//  Copyright © 2020  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIDevice.h>
#import <UIKit/UIKit.h>
#import "ZimModelDownloader.h"
#import "DTFSDKConfiguration.h"
#import "DTFUICustomConfig.h"
#import "DTFLanguageCustomConfig.h"
NS_ASSUME_NONNULL_BEGIN
#define ZIM_PLATFORM_SETTING_INFO_ALIYUN @"aliyun"
#define ZIM_PLATFORM_SETTING_INFO_ALITECH @"alitech"

@interface DTFConfiguration : NSObject

@property(nonatomic, strong, nullable) NSString *forceDirection;
@property(nonatomic, strong ,nullable) NSData *imageContent;
@property(nonatomic, strong ,nullable) NSString *platformInfo;
@property(nonatomic, strong ,nullable) NSURL *photinusPath;
@property(nonatomic, strong ,nullable) NSURL *photinusInfo;
@property(nonatomic, strong, nullable) UIColor *buttonColor;
@property(nonatomic, strong, nullable) UIColor *clickedColor;
@property(nonatomic, strong, nullable) NSString *ocrInfo;
@property(nonatomic, strong, nullable) NSData *faceData; // add for OCR
@property(nonatomic, strong, nullable) NSData *countryData;  // add for OCR
/// 埋点的额外信息
@property(nonatomic, copy, nullable) NSDictionary *flowCodeInfo;
@property(nonatomic, strong, nullable) NSString *imageCount;
@property(nonatomic, strong, nullable) UIColor *themeColor;
@property(nonatomic, strong, nullable) UIColor *circleColor;
@property(nonatomic, strong, nullable) NSString *languageURL;
@property(nonatomic, strong, nullable) NSString *languageDocPath;
@property(nonatomic, strong, nullable) NSString *languageFacePath;
@property(nonatomic, strong, nullable) NSString *languageGuidePath;
@property(nonatomic, strong, nullable) NSString *languageFromApp; //宿主App设置的语言
@property(nonatomic, strong, nullable) NSString *logUploadServerURL;
@property(nonatomic, strong, nullable) NSString *facadeBundlePath;
@property(nonatomic, assign) BOOL replayPermission;
@property(nonatomic, assign) BOOL isReadLocal;
@property(nonatomic, strong, nullable) DTFUICustomConfig *uiCustomConfig;
@property(nonatomic, strong, nullable) DTFLanguageCustomConfig *languageCustomConfig;
@property(nonatomic, assign) BOOL isShowTipView;

@property(nonatomic, assign) UIDeviceOrientation orientation;
@property(nonatomic, assign) BOOL returnContent;
@property(nonatomic, strong, nullable) NSMutableArray *EKYCImageArray;
/// 返客图片
@property(nonatomic, strong, nullable) NSMutableArray *faceImageArray;
@property(nonatomic, assign) BOOL simpleFlags; //安全SDK的Flags
@property(nonatomic, assign) BOOL tempddsFlags;//是否需要做安全加密
@property(nonatomic, assign) BOOL iPv6Flags;
@property(nonatomic, assign) BOOL needPermissionToast;//是否需要弹出权限toast
@property(nonatomic, assign) double permissionToastDuration;//弹出权限toast时间
/// 是否关闭水波纹动画，默认开启
@property(nonatomic, assign) BOOL closeWaveAnimate;

@property(nonatomic, copy, nullable) NSDictionary *responseExtInfo;

@property(nonatomic, strong) DTFSDKConfiguration *remoteConfig;

/// 加载中至认证结束时间
@property(nonatomic, assign) NSTimeInterval loadingTimeStamp;

+ (DTFConfiguration *)sharedInstance;


@end

NS_ASSUME_NONNULL_END
