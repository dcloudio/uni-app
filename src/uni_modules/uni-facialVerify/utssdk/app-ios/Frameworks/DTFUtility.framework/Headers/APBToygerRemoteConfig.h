//
//  APFRemoteConfig.h
//  AppArch
//
//  Created by yukun.tyk on 8/29/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ToygerAlgorithmConfig.h"

@class APBToygerSceneEnv, APBToygerVideo, APFRemoteConfig, APBToygerCollect, APBDragonflyLivenessConfig,APBGeminiLivenessConfig;
@class APBToygerNavigatePage, APBToygerAlgorithm, APBToygerTips, APBToygerUploadConfig;

@interface APBToygerSoluCfg: NSObject

@property(nonatomic, copy) NSArray *order;

@property(nonatomic, strong) APBToygerNavigatePage *navi;


@end

/**
 *  协议配置
 */
@interface APBToygerRemoteConfig : NSObject

@property(nonatomic, strong)APBToygerSceneEnv *sceneEnv;
@property(nonatomic, strong)APBToygerNavigatePage *navi;
@property(nonatomic, copy) NSDictionary *suitable;
@property(nonatomic, strong)APBToygerCollect *coll;
@property(nonatomic, strong) APBToygerUploadConfig *upload;
@property(nonatomic, strong) ToygerAlgorithmConfig *algorithm;
@property(nonatomic, copy) NSArray *scanAlgorithm;
@property(nonatomic, strong)APBToygerTips * faceTips;
@property(nonatomic, copy) NSNumber *env;
@property(nonatomic, assign)NSInteger ui;
@property(nonatomic, copy)NSString *sdkVersion;
@property(nonatomic, strong)APBToygerVideo * video;
@property(nonatomic, copy)NSString *verifyMode;
@property(nonatomic, copy)NSString *token;
@property(nonatomic, copy) NSDictionary *controlConfig;
@property(nonatomic, copy) NSArray *sdkActionList;
@property(nonatomic, copy) NSDictionary *simpleFlags;

+(APBToygerRemoteConfig *)defaultConfig;
+ (void)loadFromJSON:(NSString *)json toObject:(NSObject*) obj;
//是否包含ocrTask
- (BOOL)containOCRTask;

@end

/**
 *  场景配置
 */
@interface APBToygerSceneEnv : NSObject

@property(nonatomic, copy)NSString *sceneCode;
@property(nonatomic, copy)NSString *sceneType;
@property(nonatomic, copy)NSString *sysTime;

+(APBToygerSceneEnv *)defaultConfig;

@end

/**
 *  引导页配置
 */
@interface APBToygerNavigatePage : NSObject

@property(nonatomic, assign)BOOL enable;
@property(nonatomic, copy)NSString *url;
@property(nonatomic, assign)BOOL needRareCharUi;

+ (APBToygerNavigatePage *)defaultConfig;

@end

/**
 *   ocr回填确认页相关
 */
@interface APBToygerFillBack : NSObject

@property(nonatomic, assign)BOOL enable;
@property(nonatomic, assign)BOOL editable;

+ (APBToygerFillBack *)defaultConfig;

@end
/**
 *  采集场景配置
 */
@interface APBToygerCollect : NSObject

@property(nonatomic, assign)NSInteger retry;
@property(nonatomic, assign)CGFloat minangle;
@property(nonatomic, assign)CGFloat maxangle;
@property(nonatomic, assign)CGFloat near;
@property(nonatomic, assign)CGFloat far;
@property(nonatomic, assign)NSInteger minlight;
@property(nonatomic, assign)NSInteger time;
@property(nonatomic, assign)NSInteger light;
@property(nonatomic, assign)NSInteger imageIndex;
@property(nonatomic, assign)BOOL uploadLivePic;
@property(nonatomic, assign)NSInteger uploadMonitorPic;
@property(nonatomic, assign)BOOL progressbar;
@property(nonatomic, assign)BOOL uploadBestPic;
@property(nonatomic, assign)BOOL uploadPoseOkPic;
@property(nonatomic, assign)BOOL uploadBigPic;
@property(nonatomic, assign)BOOL authorization;
@property(nonatomic, assign)NSInteger mineDscore;
@property(nonatomic, assign)NSInteger mineVideo;
@property(nonatomic, strong)NSArray<NSString *> *actionMode;
@property(nonatomic, assign) NSInteger pageNo;
@property(nonatomic, copy) NSString *docType;
@property(nonatomic, assign) NSInteger retryLimit;
@property(nonatomic, assign) NSInteger scanTimeout;
@property(nonatomic, copy) NSString *uiType;
@property(nonatomic, copy) NSString *docInputMode;
@property(nonatomic, assign) CGFloat docUIRatio;
@property(nonatomic, copy) NSString *multiLangVer;
@property(nonatomic, strong) NSMutableDictionary *chameleon;
@property(nonatomic, assign) NSInteger captureFrameLimit;
+ (APBToygerCollect *)defaulConfig;

@end



/**
 *  视频设置
 */
@interface APBToygerVideo : NSObject

@property(nonatomic, assign)NSInteger width;
@property(nonatomic, assign)NSInteger height;
@property(nonatomic, assign)NSInteger duration;
@property(nonatomic, assign)NSInteger bitrate;
@property(nonatomic, assign)NSInteger fps;
@property(nonatomic, assign)BOOL    enable;       ;

+(APBToygerVideo *)defaultConfig;

@end



@interface APBToygerAlertConfig : NSObject

@property(nonatomic, copy)NSString * title;
@property(nonatomic, copy)NSString * message;
@property(nonatomic, copy)NSString * leftButtonText;
@property(nonatomic, copy)NSString * rightButtonText;
@property(nonatomic, assign)NSInteger returnCode;


@end

@interface APBToygerTips : NSObject

//required
@property(nonatomic, strong)APBToygerAlertConfig * timeoutAlert;
@property(nonatomic, strong)APBToygerAlertConfig * failAlert;
@property(nonatomic, strong)APBToygerAlertConfig * limitAlert;
@property(nonatomic, strong)APBToygerAlertConfig * networkErrorAlert;
@property(nonatomic, strong)APBToygerAlertConfig * interruptAlert;

@property (nonatomic, copy) NSString *sceneText;
@property (nonatomic, copy) NSString *bottomText;
@property (nonatomic, copy) NSString *topText_rectwidth;
@property (nonatomic, copy) NSString *topText_noface;
@property (nonatomic, copy) NSString *topText_face_too_more;
@property (nonatomic, copy) NSString *topText_blur;
@property (nonatomic, copy) NSString *topText_light;
@property (nonatomic, copy) NSString *topText_pitch;
@property (nonatomic, copy) NSString *topText_yaw;
@property (nonatomic, copy) NSString *topText_quality;
@property (nonatomic, copy) NSString *topText_integrity;
@property (nonatomic, copy) NSString *topText_max_rectwidth;
@property (nonatomic, copy) NSString *topText_stay;
@property (nonatomic, copy) NSString *topText_openness;
@property (nonatomic, copy) NSString *topText_blink;
@property (nonatomic, copy) NSString *topText_left_yaw;
@property (nonatomic, copy) NSString *topText_right_yaw;
@property (nonatomic, copy) NSString *topText_mouth_open;
@property (nonatomic, copy) NSString *topText_target_too_far;
@property (nonatomic, copy) NSString *topText_target_too_close;
@property (nonatomic, copy) NSString *topText_calibrate_too_far;
@property (nonatomic, copy) NSString *topText_calibrate_too_close;
@property (nonatomic, copy) NSString *topText_nearFar_collect;
@property (nonatomic, copy) NSString *topText_face_not_in_postion;
@property (nonatomic, copy) NSString *brandTip;
@property (nonatomic, copy) NSString *stopScanTip;

@property (nonatomic, copy) NSString *garfield_guideTitle;
@property (nonatomic, copy) NSString *garfield_guideMsg;

//optional

@property(nonatomic, strong)APBToygerAlertConfig * unsurpportAlert;
@property(nonatomic, strong)APBToygerAlertConfig * systemVersionErrorAlert;
@property(nonatomic, strong)APBToygerAlertConfig * systemErrorAlert;
@property(nonatomic, strong)APBToygerAlertConfig * cameraNoPermissionAlert;
@property(nonatomic, strong)APBToygerAlertConfig * exitAlert;
@property(nonatomic, strong)APBToygerAlertConfig * exitAlertForPermission;
@property(nonatomic, strong)APBToygerAlertConfig * authorizationAlert;
@property(nonatomic, strong)APBToygerAlertConfig * failNoRetryAlert;

@end

@interface APBToygerBaseConfig: NSObject

@property(nonatomic, copy) NSDictionary *rawData;

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

- (void)parseProperty;

- (NSString *)stringValueForKey:(NSString *)key;

- (NSNumber *)numberValueForKey:(NSString *)key;

- (NSArray<NSNumber *> *)numberArrayForKey:(NSString *)key;

@end


@interface APBToygerUploadConfig: APBToygerBaseConfig

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

@property(nonatomic, copy) NSDictionary *rawData;

@property(nonatomic, strong) NSNumber *desiredWidth;
@property(nonatomic, strong) NSNumber *minquality;
@property(nonatomic, strong) NSNumber *upload_compress_rate;
@property(nonatomic, strong) NSNumber *log_classifier;
@property(nonatomic, strong) NSNumber *enableSmoothTransition;
@property(nonatomic, strong) NSNumber *photinusType;
@property(nonatomic, assign) BOOL photinusVideo;
@property(nonatomic, strong) NSNumber *chameleonFrameEnable;
@property(nonatomic, strong) NSNumber *chameleonUploadCompressRate;
@property(nonatomic, copy) NSString *chameleonFileNamePrefix;
@property(nonatomic, copy) NSString *bucket;
@property(nonatomic, copy) NSString *securityToken;
@property(nonatomic, copy) NSString *endpoint;
@property(nonatomic, copy) NSString *accessKeyId;
@property(nonatomic, copy) NSString *accessKeySecret;
@property(nonatomic, copy) NSString *fileNamePrefix;
@property(nonatomic, copy) NSString *mode;
@property(nonatomic, copy) NSString *collectFileNamePrefix;
@property(nonatomic, strong) NSArray<NSString *> *collection;

@property(nonatomic, strong) NSArray *captureConfig;
@property(nonatomic, strong) NSDictionary *captureConfigItem;
@property(nonatomic, strong) NSDictionary *blobConfig;

@end


