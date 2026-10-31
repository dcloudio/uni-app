//
//  DTFUICustomConfig.h
//  DTFUtility
//
//  Created by 汪澌哲 on 2024/1/7.
//  Copyright © 2024 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DTFGuideConfig : NSObject

@property (copy, nonatomic) NSString *titleColor;
@property (copy, nonatomic) NSString *titleBackPath;
@property (copy, nonatomic) NSString *titleBackBase64;
@property (copy, nonatomic) NSString *titleClosePath;
@property (copy, nonatomic) NSString *titleCloseBase64;
@property (copy, nonatomic) NSString *bannerImg;
@property (copy, nonatomic) NSString *agrtTopTipsColor;
@property (copy, nonatomic) NSString *agrtUnSelColor;
@property (copy, nonatomic) NSString *agrtSelBgColor;
@property (copy, nonatomic) NSString *agrtAgreeColor;
@property (copy, nonatomic) NSString *agrtColor;
@property (copy, nonatomic) NSString *startBtnColor;
@property (copy, nonatomic) NSString *agrtBotTipsColor;
@property (copy, nonatomic) NSString *startBtnDisColor;
@property (copy, nonatomic) NSString *startBtnBgColor;
@property (copy, nonatomic) NSString *startBtnDisBgColor;
@property (copy, nonatomic) NSString *elderBtnDisColor;
@property (copy, nonatomic) NSString *elderBtnBgColor;
@property (copy, nonatomic) NSString *elderBtnDisBgColor;
@property (copy, nonatomic) NSString *exitBtnColor;
@property (copy, nonatomic) NSString *exitBtnBgColor;
@property (copy, nonatomic) NSString *rareFormNameColor;
@property (copy, nonatomic) NSString *rareFormIDColor;
@property (copy, nonatomic) NSString *elderBtnColor;
@property (copy, nonatomic) NSString *rareFormEntBtnColor;
@property (copy, nonatomic) NSString *permissionDialogConfirmColor;
@property (copy, nonatomic) NSString *permissionToastTitleColor;
@property (copy, nonatomic) NSString *permissionToastMsgColor;
@property (copy, nonatomic) NSString *permissionToastBgColor;
@property (copy, nonatomic) NSString *dialogExitTitleColor;
@property (copy, nonatomic) NSString *dialogExitMsgColor;
@property (copy, nonatomic) NSString *dialogExitCancelColor;
@property (copy, nonatomic) NSString *dialogExitConfirmColor;
@property (copy, nonatomic) NSString *dialogPermissionFailedTitleColor;
@property (copy, nonatomic) NSString *dialogPermissionFailedMsgColor;
@property (copy, nonatomic) NSString *dialogPermissionFailedConfirmColor;
@property (copy, nonatomic) NSString *dialogPermissionFailedCancelColor;
@property (copy, nonatomic) NSString *dialogSupportFailedTitleColor;
@property (copy, nonatomic) NSString *dialogSupportFailedMsgColor;
@property (copy, nonatomic) NSString *dialogSupportFailedConfirmColor;
@property (copy, nonatomic) NSString *dialogNetworkFailedTitleColor;
@property (copy, nonatomic) NSString *dialogNetworkFailedMsgColor;
@property (copy, nonatomic) NSString *dialogNetworkFailedConfirmColor;
@property (copy, nonatomic) NSString *loadingPageBgColor;// 刷脸VC背景色
@property (copy, nonatomic) NSString *settingFailReason;
@property (copy, nonatomic) NSDictionary *originMap;
@end

@interface DTFFaceConfig : NSObject

@property (copy, nonatomic) NSString *faceBgColor;
@property (copy, nonatomic) NSString *faceTitleColor;
@property (copy, nonatomic) NSString *circleTxtBgAlpha;
@property (copy, nonatomic) NSString *dialogBgAlpha;
@property (copy, nonatomic) NSString *faceProgressStartColor;
@property (copy, nonatomic) NSString *faceProgressEndColor;
@property (copy, nonatomic) NSString *circleTxtColor;
@property (copy, nonatomic) NSString *exitIconPath;
@property (copy, nonatomic) NSString *exitIconBase64;
@property (copy, nonatomic) NSString *submitTextColor;
@property (copy, nonatomic) NSString *submitLoadingIconBase64;
@property (copy, nonatomic) NSString *submitLoadingIconPath;
@property (copy, nonatomic) NSString *dialogExitTitleColor;
@property (copy, nonatomic) NSString *dialogExitMsgColor;
@property (copy, nonatomic) NSString *dialogExitCancelColor;
@property (copy, nonatomic) NSString *dialogExitConfirmColor;
@property (copy, nonatomic) NSString *dialogTimeOutTitleColor;
@property (copy, nonatomic) NSString *dialogTimeOutMsgColor;
@property (copy, nonatomic) NSString *dialogTimeOutConfirmColor;
@property (copy, nonatomic) NSString *dialogNetworkFailedTitleColor;
@property (copy, nonatomic) NSString *dialogNetworkFailedMsgColor;
@property (copy, nonatomic) NSString *dialogNetworkFailedConfirmColor;
@property (copy, nonatomic) NSString *dialogArchSysFailedTitleColor;
@property (copy, nonatomic) NSString *dialogArchSysFailedMsgColor;
@property (copy, nonatomic) NSString *dialogArchSysFailedConfirmColor;
@property (copy, nonatomic) NSString *dialogTooManyRetriesTitleColor;
@property (copy, nonatomic) NSString *dialogTooManyRetriesMsgColor;
@property (copy, nonatomic) NSString *dialogTooManyRetriesConfirmColor;
@property (copy, nonatomic) NSString *dialogInterruptTitleColor;
@property (copy, nonatomic) NSString *dialogInterruptMsgColor;
@property (copy, nonatomic) NSString *dialogInterruptConfirmColor;
@property (copy, nonatomic) NSString *dialogInterruptCancelColor;
@property (copy, nonatomic) NSString *dialogSDKErrTitleColor;
@property (copy, nonatomic) NSString *dialogSDKErrMsgColor;
@property (copy, nonatomic) NSString *dialogSDKErrConfirmColor;
@property (copy, nonatomic) NSString *dialogCamOpenFailedTitleColor;
@property (copy, nonatomic) NSString *dialogCamOpenFailedMsgColor;
@property (copy, nonatomic) NSString *dialogCamOpenFailedConfirmColor;
@property (copy, nonatomic) NSString *dialogCamOpenFailedCancelColor;
@property (copy, nonatomic) NSString *noticeIconPath;
@property (copy, nonatomic) NSString *noticeIconBase64;
@property (copy, nonatomic) NSString *noticeTxtColor;
@property (copy, nonatomic) NSString *noticeBgColor;
@property (copy, nonatomic) NSString *suitableExitBtnColor;
@property (copy, nonatomic) NSString *suitableExitTxtColor;
@property (copy, nonatomic) NSString *audioOnIconBase64;
@property (copy, nonatomic) NSString *audioOnIconPath;
@property (copy, nonatomic) NSString *audioOffIconBase64;
@property (copy, nonatomic) NSString *audioOffIconPath;

@property (copy, nonatomic) NSString *settingFailReason;
@property (copy, nonatomic) NSString *dialogConfirmBgColor;//弹框确认按钮背景颜色
@property (copy, nonatomic) NSString *dialogCancelBgColor;//弹框取消按钮背景颜色
@end

@interface DTFDocConfig : NSObject

//@property (copy, nonatomic) NSString *infoPageBgColor;//ocr识别信息页背景色0
//@property (copy, nonatomic) NSString *infoDeviderColor;//分隔条颜色（默认灰色）0
@property (copy, nonatomic) NSString *exitIconPath;//关闭按钮路径
@property (copy, nonatomic) NSString *exitIconBase64;//关闭按钮base64
@property (copy, nonatomic) NSString *stageSelectedBgPath;//进度条节点选中背景图片
@property (copy, nonatomic) NSString *stageSelectedBgBase64;//进度条节点选中背景图片base64
@property (copy, nonatomic) NSString *stageDefaultBgPath;//进度条节点默认背景图片
@property (copy, nonatomic) NSString *stageDefaultBgBase64;//进度条节点默认背景图片base64
@property (copy, nonatomic) NSString *stageDoneBgPath;//进度条完成节点背景图片路径
@property (copy, nonatomic) NSString *stageDoneBgBase64;//进度条完成节点背景图片base64
@property (copy, nonatomic) NSString *stageLineDefaultColor;//进度条横线默认颜色
@property (copy, nonatomic) NSString *stageLineSelectedColor;//进度条横线颜色
@property (copy, nonatomic) NSString *stageSelectedTxtColor;//进度条文字选中状态颜色
@property (copy, nonatomic) NSString *stageDefaultTxtColor;//进度条文字默认状态颜色
@property (copy, nonatomic) NSString *infoTipsColor;//图片显示框上方提示文案颜色
@property (copy, nonatomic) NSString *bottomTipsColor;//图片显示框下方提示文案颜色
@property (copy, nonatomic) NSString *takeRequestColor;//“拍摄要求”文字颜色
@property (copy, nonatomic) NSString *takeRequestTitleColor;//“拍摄要求”弹框标题颜色
@property (copy, nonatomic) NSString *takeRequestExitIconPath;//拍摄要求弹框关闭按钮图片
@property (copy, nonatomic) NSString *takeRequestExitIconBase64;//拍摄要求弹框关闭按钮图片base64
@property (copy, nonatomic) NSString *takeRequestImgPath;//拍摄要求图片
@property (copy, nonatomic) NSString *takeRequestImgBase64;//拍摄要求图片base64
@property (copy, nonatomic) NSString *takeEnterIconPath;//拍摄图标（拍摄页面入口）
@property (copy, nonatomic) NSString *takeEnterIconBase64;//拍摄图标（拍摄页面入口）base64
@property (copy, nonatomic) NSString *frontDefaultImgPath;//身份证正面（人像面）默认图片
@property (copy, nonatomic) NSString *frontDefaultImgBase64;//身份证正面（人像面）默认图片base64
@property (copy, nonatomic) NSString *backDefaultImgPath;//身份证反面（国徽面）默认图片
@property (copy, nonatomic) NSString *backDefaultImgBase64;//身份证反面（国徽面）默认图片base64
@property (copy, nonatomic) NSString *infoNoticeIconPath;//识别信息确认提示图标
@property (copy, nonatomic) NSString *infoNoticeIconBase64;//识别信息确认提示图标base64
@property (copy, nonatomic) NSString *infoNoticeBgColor;//识别信息确认提示”背景色
@property (copy, nonatomic) NSString *infoNoticeTxtColor;//“识别信息确认提示”文字颜色
@property (copy, nonatomic) NSString *infoCertNameColor;//“姓名”颜色
@property (copy, nonatomic) NSString *infoCertNoColor;//“身份证号”颜色
@property (copy, nonatomic) NSString *resultCertNameColor;//识别结果姓名颜色
@property (copy, nonatomic) NSString *resultCertNoColor;//识别结果身份证号颜色
@property (copy, nonatomic) NSString *infoHintColor;//姓名/身份证号未填写提示颜色
//@property (copy, nonatomic) NSString *cleanIconPath;//删除图标路径🚨iOS不用
//@property (copy, nonatomic) NSString *cleanIconBase64;//删除图标base64🚨iOS不用
@property (copy, nonatomic) NSString *nextBgColor;//页面底部按钮背景色
@property (copy, nonatomic) NSString *nextTxtColor;//页面底部按钮文案背景色
@property (copy, nonatomic) NSString *nextDisableBgColor;//页面底部按钮不可用时背景色
@property (copy, nonatomic) NSString *nextDisableTxtColor;//页面底部按钮不可用时文字颜色
@property (copy, nonatomic) NSString *dialogIdentifyFailTitleColor;//识别失败弹框title颜色
@property (copy, nonatomic) NSString *dialogIdentifyFailExitIconPath;//识别失败弹框关闭按钮图标
@property (copy, nonatomic) NSString *dialogIdentifyFailExitIconBase64;//识别失败弹框关闭按钮图标base64
@property (copy, nonatomic) NSString *dialogIdentifyFailImgPath;//识别失败弹框图片
@property (copy, nonatomic) NSString *dialogIdentifyFailImgBase64;//识别失败弹框图片base64
@property (copy, nonatomic) NSString *dialogIdentifyFailTxtColor;//识别失败弹框中“证件图像未符合要求”文字颜色
@property (copy, nonatomic) NSString *dialogIdentifyFailHintColor;//识别失败弹框中“请按要求拍摄...”文字颜色
@property (copy, nonatomic) NSString *dialogIdentifyFailConfirmColor;//识别失败弹框,"重新拍摄"按钮文字颜色
//@property (copy, nonatomic) NSString *dialogNetworkErrTitleColor;//"网络异常"弹框标题颜色0
//@property (copy, nonatomic) NSString *dialogNetworkErrMsgColor;//dialogNetworkErrMsgColor 0
//@property (copy, nonatomic) NSString *dialogNetworkErrConfirmColor; //0
//@property (copy, nonatomic) NSString *dialogNetworkErrCancelColor; //0
//@property (copy, nonatomic) NSString *dialogExitTitleColor;//退出弹框标题颜色0
//@property (copy, nonatomic) NSString *dialogExitMsgColor;//0
@property (copy, nonatomic) NSString *dialogExitConfirmColor;
//@property (copy, nonatomic) NSString *dialogExitCancelColor;//0
//@property (copy, nonatomic) NSString *dialogFailTooManyTitleColor;//0
//@property (copy, nonatomic) NSString *dialogFailTooManyMsgColor;//0
//@property (copy, nonatomic) NSString *dialogFailTooManyConfirmColor;//0
//@property (copy, nonatomic) NSString *dialogNoPermissionTitleColor;//摄像头🚨0
//@property (copy, nonatomic) NSString *dialogNoPermissionMsgColor;//0
//@property (copy, nonatomic) NSString *dialogNoPermissionCancelColor;//0
//@property (copy, nonatomic) NSString *dialogNoPermissionToSureColor;//0
@property (copy, nonatomic) NSString *livenessTipsColor;
@property (copy, nonatomic) NSString *livenessMsgColor;
@property (copy, nonatomic) NSString *livenessImgPath;//实人认证过渡图片
@property (copy, nonatomic) NSString *livenessImgBase64;//实人认证过渡图片base64
//@property (copy, nonatomic) NSString *livenessLoadingImgPath;//loading图片
//@property (copy, nonatomic) NSString *livenessLoadingImgBase64;//loading图片base64
@property (copy, nonatomic) NSString *livenessLoadingMsgColor;//loading 文字颜色00
@property (copy, nonatomic) NSString *livenessLoadingBgColor;//loading 背景色00
@property (copy, nonatomic) NSString *takePhotoCoverAlpha;//拍照页蒙层透明度
@property (copy, nonatomic) NSString *takePhotoExitIconPath;//关闭拍照页按钮图标
@property (copy, nonatomic) NSString *takePhotoExitIconBase64;//关闭拍照页按钮图标base64
@property (copy, nonatomic) NSString *flashOnIconPath;//闪光灯打开状态图标
@property (copy, nonatomic) NSString *flashOnIconBase64;//闪光灯打开状态图标base64
@property (copy, nonatomic) NSString *flashOffIconPath;//闪光灯关闭状态图标
@property (copy, nonatomic) NSString *flashOffIconBase64;//闪光灯关闭状态图标base64
@property (copy, nonatomic) NSString *takeTipsColor;//拍照提示文案颜色
@property (copy, nonatomic) NSString *takePhotoIconPath;//拍摄按钮图标
@property (copy, nonatomic) NSString *takePhotoIconBase64;//拍摄按钮图标base64
@property (copy, nonatomic) NSString *photoRetakeIconPath;//重拍按钮
@property (copy, nonatomic) NSString *photoRetakeIconBase64;//重拍按钮base64
@property (copy, nonatomic) NSString *photoConfirmIconPath;//确认照片图标
@property (copy, nonatomic) NSString *photoConfirmIconBase64;//确认图标base64
@property (copy, nonatomic) NSString *takePhotoRectPath;//证件框图片
@property (copy, nonatomic) NSString *takePhotoRectBase64;//证件框图片base64
/// 图片来源弹框“取消”字体颜色
@property (copy, nonatomic) NSString *chooseCancelColor;
/// 图片来源弹框“拍照”字体颜色
@property (copy, nonatomic) NSString *chooseTakePhotoColor;
/// 图片来源弹框“从相册中选择”字体颜色
@property (copy, nonatomic) NSString *chooseFromAlbumColor;
/// 弹窗遮罩的颜色
@property (copy, nonatomic) NSString *ocrActionSheetMaskColor;

@property (copy, nonatomic) NSString *settingFailReason;

@end

@interface DTFNFCConfig : NSObject

@property (copy, nonatomic) NSString *settingFailReason;

@property (copy, nonatomic) NSString *configTitleColor;

@property (copy, nonatomic) NSString *passportNoColor;

@property (copy, nonatomic) NSString *passportHintColor;

@property (copy, nonatomic) NSString *passportNoValueColor;

@property (copy, nonatomic) NSString *birthdayColor;

@property (copy, nonatomic) NSString *birthdayHintColor;

@property (copy, nonatomic) NSString *birthdayValueColor;

@property (copy, nonatomic) NSString *validityColor;

@property (copy, nonatomic) NSString *validityHintColor;

@property (copy, nonatomic) NSString *validityValueColor;

@property (copy, nonatomic) NSString *chooseIconPath;

@property (copy, nonatomic) NSString *chooseIconBase64;

@property (copy, nonatomic) NSString *nextBtnDisableBgColor;

@property (copy, nonatomic) NSString *nextBtnDisableTxtColor;

@property (copy, nonatomic) NSString *configExitIconBase64;

@property (copy, nonatomic) NSString *configExitIconPath;

@property (copy, nonatomic) NSString *nextBtnEnableBgColor;

@property (copy, nonatomic) NSString *nextBtnEnableTxtColor;

@property (copy, nonatomic) NSString *datePickerConfirmColor;

@property (copy, nonatomic) NSString *datePickerCancelColor;

@property (copy, nonatomic) NSString *datePickerSelectedColor;

@property (copy, nonatomic) NSString *datePickerBgColor;

@property (copy, nonatomic) NSString *dialogConfigErrTitleColor;

@property (copy, nonatomic) NSString *dialogConfigErrMsgColor;

@property (copy, nonatomic) NSString *dialogConfigErrConfirmColor;

@property (copy, nonatomic) NSString *readTitleColor;

@property (copy, nonatomic) NSString *readExitIconPath;

@property (copy, nonatomic) NSString *readExitIconBase64;

@property (copy, nonatomic) NSString *readBackIconPath;

@property (copy, nonatomic) NSString *readBackIconBase64;

@property (copy, nonatomic) NSString *readHintColor;

@property (copy, nonatomic) NSString *readBtnTxtColor;

@property (copy, nonatomic) NSString *readBtnBgColor;

@property (copy, nonatomic) NSString *readDialogTitleColor;

@property (copy, nonatomic) NSString *readDialogBgColor;

@property (copy, nonatomic) NSString *readDialogBtnTxtColor;

@property (copy, nonatomic) NSString *readDialogBtnBgColor;

@property (copy, nonatomic) NSString *readDialogHintColor;

@property (copy, nonatomic) NSString *readingAnimBgPath;

@property (copy, nonatomic) NSString *readingAnimBgBase64;

@property (copy, nonatomic) NSString *animSignLightColor;

@property (copy, nonatomic) NSString *animSignDarkColor;

@property (copy, nonatomic) NSString *animIDCardPath;

@property (copy, nonatomic) NSString *animIDCardBase64;

@property (copy, nonatomic) NSString *animPassportPath;

@property (copy, nonatomic) NSString *animPassportBase64;

@property (copy, nonatomic) NSString *animFingerPath;

@property (copy, nonatomic) NSString *animFingerBase64;

@property (copy, nonatomic) NSString *phoneFrameColor;

@property (copy, nonatomic) NSString *phoneBgColor;

@property (copy, nonatomic) NSString *dialogReadCardTitleColor;

@property (copy, nonatomic) NSString *dialogReadCardMsgColor;

@property (copy, nonatomic) NSString *dialogReadCardConfirmColor;

@property (copy, nonatomic) NSString *positionHintColor;

@property (copy, nonatomic) NSString *positionCheckHintColor;

@property (copy, nonatomic) NSString *closePositionHintIconPath;

@property (copy, nonatomic) NSString *closePositionHintIconBase64;

@property (copy, nonatomic) NSString *positionEntryPath;

@property (copy, nonatomic) NSString *positionEntryBase64;

@end

@interface DTFUICustomConfig : NSObject
@property (strong, nonatomic) DTFGuideConfig *guideConfig;
@property (strong, nonatomic) DTFFaceConfig *faceConfig;
@property (strong, nonatomic) DTFDocConfig *docConfig;
@property (strong, nonatomic) DTFNFCConfig *nfcConfig;

- (instancetype)initWithString:(NSString *)string type:(NSString *)type error:(NSError **)error;
+ (NSString *)checkValueFailt:(NSString *)value key:(NSString *)key;
+ (void)setDefaultForKey:(NSString *)key object:(NSObject *)object ;
+ (void)checkKeyFaultWithDict:(NSDictionary *)dict propertyName:(NSMutableSet *)propertyName settingFailReason:(NSString *)settingFailReason;
+ (NSString *)setValueForKeyWithClass:(NSObject *)object params:(NSDictionary *)params;
+ (UIImage *)getImageWithBse64:(NSString *)base64Str path:(NSString *)path;
+ (UIImage *)submitLoadingIcon;
+ (UIImage *)noticeIcon;
+ (UIImage *)titleCloseIcon;
+ (UIImage *)titleBackIcon;
+ (UIImage *)exitIcon;
+ (UIImage *)audioOnIcon;
+ (UIImage *)audioOffIcon;

+ (UIImage *)ocrExitIcon;//ocr 退出exitIconPath
+ (UIImage *)ocrStageSelectedBgIcon;// stageSelectedBgPath
+ (UIImage *)ocrStageDefaultBgIcon;//stageDefaultBgPath
+ (UIImage *)ocrStageDoneBgIcon;//stageDoneBgPath
+ (UIImage *)ocrTakeRequestIcon;//takeRequestImgPath
+ (UIImage *)ocrTakeEnterIcon;//takeEnterIconPath
+ (UIImage *)ocrFrontDefaultIcon;//frontDefaultImgPath
+ (UIImage *)ocrBackDefaultIcon;//backDefaultImgPath
+ (UIImage *)ocrInfoNoticeIcon;//infoNoticeIconPath
+ (UIImage *)ocrDialogIdentifyFailExitIcon;//dialogIdentifyFailExitIconPath
+ (UIImage *)ocrDialogIdentifyFailIcon;//dialogIdentifyFailImgPath
+ (UIImage *)ocrLivenessIcon;//livenessImgPath
+ (UIImage *)ocrTakePhotoExitIcon;//takePhotoExitIconPath
+ (UIImage *)ocrFlashOnIcon;//flashOnIconPath
+ (UIImage *)ocrFlashOffIcon;//flashOffIconPath
+ (UIImage *)ocrTakePhotoIcon;//takePhotoIconPath
+ (UIImage *)ocrPhotoRetakeIcon;//photoRetakeIconPath
+ (UIImage *)ocrPhotoConfirmIcon;//photoConfirmIconPath
+ (UIImage *)ocrTakePhotoRectIcon;//takePhotoRectPath
+ (UIImage *)ocrTakeRequestExitIcon;//takeRequestExitIconPath

/// 护照 选择日期
+ (UIImage *)nfcChooseIcon;

/// 护照 退出按钮
+ (UIImage *)nfcConfigExitIcon;

/// 证件识别Vc 退出 （护照）
+ (UIImage *)nfcReadExitIcon;

/// 证件识别Vc 退出 （身份证）
+ (UIImage *)nfcReadBackIcon;

/// nfc 图片
+ (UIImage *)nfcReadingAnimBgIcon;

/// 身份证图片
+ (UIImage *)nfcAnimIDCardIcon;

/// 护照图片
+ (UIImage *)nfcAnimPassportIcon;

/// 手指图片
+ (UIImage *)nfcAnimFingerIcon;

+ (UIImage *)nfcClosePositionHintIcon;

+ (UIImage *)nfcPositionEntryPath;

@end

NS_ASSUME_NONNULL_END
