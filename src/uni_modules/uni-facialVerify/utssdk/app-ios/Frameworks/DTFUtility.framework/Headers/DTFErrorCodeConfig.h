//
//  DTFErrorCodeConfig.h
//  DTFUtility
//
//  Created by 汪澌哲 on 2023/2/1.
//  Copyright © 2023 com.DTF.iphoneclient.zoloz. All rights reserved.
//

#ifndef DTFErrorCodeConfig_h
#define DTFErrorCodeConfig_h


#endif /* DTFErrorCodeConfig_h */

static NSString *const  kDTFSystemFailedErrorCode = @"Z1000";
static NSString *const  kDTFSystemFailedErrorMessage = @"";
static NSString *const  kBioAuthEngineSystemFailedErrorMessage = @"抱歉，系统出错了，请您稍后再试(Z1000)";
static NSString *const  kBioAuthEngineSystemFailedErrorReason = @"协议base64解析失败";

static NSString *const  kDTFDenyCameraPermissionErrorCode = @"Z1001";
static NSString *const  kDTFDenyCameraPermissionErrorMessage = @"";
static NSString *const  kAPBDenyCameraPermissionErrorMessage = @"拒绝开通授权";
static NSString *const  kDTFUnableStartCameraErrorCode = @"Z1002";
static NSString *const  kDTFUnableStartCameraErrorMessage = @"无法启动相机(Z1002)";
static NSString *const  kDTFUnableStartCameraErrorReason = @"无法启动相机";
static NSString *const  kDTFOldVersionErrorCode = @"Z1004";
static NSString *const  kDTFOldVersionErrorMessage = @"iOS系统版本过低(Z1004)";
static NSString *const  kDTFOldVersionErrorReason = @"iOS系统版本过低";
static NSString *const  kDTFOperationTimeoutErrorCode = @"Z1005";
static NSString *const  kDTFOperationTimeoutErrorMessage = @"操作超时(Z1005)";
static NSString *const  kDTFOperationFailedErrorCode = @"Z1006";
static NSString *const  kDTFOperationFailedErrorMessage = @"本次操作失败(Z1006)";
static NSString *const  kDTFLocalAuthenticationFailedErrorCode = @"Z1007";
static NSString *const  kDTFLocalAuthenticationFailedErrorMessage = @"";
static NSString *const  kDTFActivelyExitErrorCode = @"Z1008";
static NSString *const  kDTFActivelyExitErrorMessage = @"用户主动退出(Z1008)";
static NSString *const  kDTFActivelyExitErrorReason = @"用户主动退出";
static NSString *const  kDTFVerificationInterruptErrorCode = @"Z1009";
static NSString *const  kDTFVerificationInterruptErrorMessage = @"验证中断(Z1009)";
static NSString *const  kDTFNotVerifyTemporarilyErrorCode = @"Z1009";
static NSString *const  kDTFNotVerifyTemporarilyErrorMessage = @"用户暂不认证(Z1009)";
static NSString *const  kNotVerifyTemporarilyReason = @"用户暂不认证";
static NSString *const  kGuideViewLoadFailedErrorCode = @"2002";
static NSString *const  kGuideViewLoadFailedErrorMessage = @"引导页加载失败";
static NSString *const  kGuideViewLoadFailedReason = @"网络错误";
static NSString *const  kDTFParameterFailedErrorCode = @"Z1010";
static NSString *const  kDTFParameterFailedErrorMessage = @"业务参数错误(Z1010)";
static NSString *const  kDTFParameterFailedErrorReason = @"currentCtr isEmpty";
static NSString *const  kDTFInitFailedErrorCode = @"Z1012";
static NSString *const  kDTFInitFailedErrorMessage = @"";
static NSString *const  kDTFAlgorithmInitFailedErrorCode = @"Z1014";
static NSString *const  kDTFAlgorithmInitFailedErrorMessage = @"(Z1014)";
static NSString *const  kDTFOpenCameraFailedErrorCode = @"Z1020";
static NSString *const  kDTFOpenCameraFailedErrorMessage= @"(Z1020)";
static NSString *const  kDTFModelFileErrorCode = @"Z1023";
static NSString *const  kDTFModelFileErrorMessage = @"(Z1023)";
static NSString *const  kDTFZimBusyErrorCode = @"Z1024";
static NSString *const  kDTFZimBusyErrorMessage = @"(Z1024)";
static NSString *const  kDTFZimBusyErrorReason = @"认证进行中重复调用认证";
static NSString *const  kDTFProcessInterruptionErrorCode = @"Z1055";
static NSString *const  kDTFProcessInterruptionErrorMessage = @"流程被中断(Z1055)";
static NSString *const  kDTUploadImageFailedErrorCode = @"Z1026";
static NSString *const  kDTFUploadImageFailedErrorMessage = @"";
static NSString *const  kDTFVerifyFailedErrorCode = @"Z1027";
static NSString *const  kDTFVerifyFailedErrorMessage = @"网络不给力(Z1027)";
static NSString *const  kDTFVerifyLimitFailedErrorCode = @"Z1028";
static NSString *const  kDTFVerifyLimitFailedErrorMessage = @"网络错误(network error)(2002)";
static NSString *const  kDTFMultiFactorFacadeVersionNotSupportedErrorCode = @"Z1029";
static NSString *const  kDTFMultiFactorFacadeVersionNotSupportedErrorMessage = @"网络错误(network error)(2002)";
static NSString *const  kDTFRecordingPermissionErrorCode = @"Z1030";
static NSString *const  kDTFRecordingPermissionErrorMessage = @"录音权限未赋予(Z1030)";
static NSString *const  kDTFRecordingPermissionErrorReason = @"录音权限未赋予";
static NSString *const  kDTFReplayKitPermissionErrorCode = @"Z1031";
static NSString *const  kDTFReplayKitPermissionErrorMessage = @"录屏权限未赋予(Z1031)";
static NSString *const  kDTFReplayKitPermissionErrorReason = @"录屏权限未赋予";
static NSString *const  kDTFMicPermissionErrorCode = @"Z1032";
static NSString *const  kDTFMicPermissionErrorMessage = @"麦克风打开失败(Z1032)";
static NSString *const  kDTFMicPermissionErrorReason = @"麦克风打开失败";
static NSString *const  kDTFReplayKitOpenFailedErrorCode = @"Z1033";
static NSString *const  kDTFReplayKitOpenFailedErrorMessage = @"录屏打开失败(Z1033)";
static NSString *const  kDTFReplayKitOpenFailedErrorReason = @"录屏打开失败";
static NSString *const  kDTFInsufficientDiskErrorCode = @"Z1034";
static NSString *const  kDTFInsufficientDiskErrorMessage = @"本地存储空间过小(Z1034)";
static NSString *const  kDTFInsufficientDiskErrorReason = @"本地存储空间过小";
static NSString *const  kDTFMultiFactorFacadeRotationErrorCode = @"Z1035";
static NSString *const  kDTFMultiFactorFacadeRotationErrorMessage = @"";
static NSString *const  kDTFZimidIsEmptyErrorCode = @"Z1037";
static NSString *const  kDTFZimidIsEmptyErrorMessage = @"业务参数错误(Z1037)";
static NSString *const  kDTFZimidIsEmptyErrorReason = @"ZimID isEmpty";
static NSString *const  kDTFProtocolIsEmptyErrorCode = @"Z1038";
static NSString *const  kDTFProtocolIsEmptyErrorMessage = @"";
static NSString *const  kDTFMaxRetryErrorCode = @"Z1041";
static NSString *const  kDTFMaxRetryErrorMessage = @"";
static NSString *const  kDTFOCRConfirmationResultsErrorCode = @"Z1042";
static NSString *const  kDTFOCRConfirmationResultsErrorMessage = @"";
static NSString *const  kDTFOcrUserQuitInAuthenticationCompletedErrorCode = @"Z2000";
static NSString *const  kDTFOcrOcrUserQuitInAuthenticationCompletedErrorReason = @"身份证认证完成，未进入刷脸，用户点击了退出";
static NSString *const  kDTFOcrOcrUserQuitInAuthenticationCompletedErrorMessage = @"用户OCR主动退出(Z2000)";
static NSString *const  kDTFOcrActivelyExitErrorCode = @"Z2001";
static NSString *const  kDTFOcrActivelyExitErrorReason = @"用户未认证,直接点击了退出";
static NSString *const  kDTFOcrActivelyExitErrorMessage = @"用户OCR主动退出(Z2001)";
static NSString *const  kDTFOcrUserQuitInPortraitAuthenticationErrorCode = @"Z2002";
static NSString *const  kDTFOcrUserQuitInPortraitAuthenticationErrorReason = @"人像面证面认证后退出";
static NSString *const  kDTFOcrUserQuitInPortraitAuthenticationErrorMessage = @"用户OCR主动退出(Z2002)";
static NSString *const  kDTFOcrUserQuitInEmblemAuthenticationErrorCode = @"Z2003";
static NSString *const  kDTFOcrUserQuitInEmblemAuthenticationErrorReason = @"国徽面证面认证后退出";
static NSString *const  kDTFOcrUserQuitInEmblemAuthenticationErrorMessage = @"用户OCR主动退出(Z2003)";
static NSString *const  kDTFOcrInterruptionErrorCode = @"Z2004";
static NSString *const  kDTFOcrInterruptionErrorReason = @"OCR过程被中断";
static NSString *const  kDTFOcrInterruptionErrorMessage = @"OCR过程被中断(Z2004))";

static NSString *const  kDTFFaceDetectNotImportErrorCode = @"I4001";
static NSString *const  kDTFFaceDetectNotImportErrorMessage = @"刷脸模块接入异常";
static NSString *const  kDTFOcrNotImportErrorCode = @"I4003";
static NSString *const  kDTFOcrNotImportErrorMessage = @"OCR模块接入异常";
static NSString *const  kDTFNFCNotImportErrorCode = @"I4004";
static NSString *const  kDTFNFCNotImportErrorMessage = @"NFC模块接入异常";
static NSString *const  kDTFMultiFactorNotImportErrorCode = @"I4005";
static NSString *const  kDTFMultiFactorNotImportErrorMessage = @"意愿模块接入异常";
static NSString *const  kDTFAudioIsEmptyErrorCode = @"Z5116";
static NSString *const  kDTFAudioIsEmptyErrorMessage = @"Z5116 - 音频文件上传失败";
static NSString *const  kDTFOcrNetworkFailedErrorCode = @"Z6002";
static NSString *const  kDTFOcrNetworkFailedErrorMessage = @"";
static NSString *const  kDTFFaceImageIsEmptyErrorCode = @"Z6004";
static NSString *const  kDTFFaceImageIsEmptyErrorMessage = @"(Z6004)";
static NSString *const  kProtocolErrorCode = @"Z7001";
static NSString *const  kProtocolErrorErrorMessage = @"内部错误(Z7001)";
static NSString *const  kProtocolErrorReason = @"ZIMInternalError";
static NSString *const  kNetworkErrorCode = @"2002";
static NSString *const  kNetworkErrorMessage = @"网络错误(network error)(2002)";
static NSString *const  kNetworkErrorReason = @"ZIMNetworkfail";
static NSString *const  kTimeExpiredNetworkErrorCode = @"2003";
static NSString *const  kTimeExpiredNetworkErrorMessage = @"设备时间不对，请确认时间。";
static NSString *const  kTimeExpiredNetworkErrorReason = @"ZIMTIMEError";
static NSString *const  kLimitTrafficErrorCode = @"1006";
static NSString *const  kColorParamErrorCode = @"2006";
static NSString *const  kColorParamErrorMessage = @"业务参数错误(2006)";
static NSString *const  kColorParamErrorReason = @"颜色值位数不是6位";
static NSString *const  kModelFileErrorCode = @"2006";
static NSString *const  kModelFileErrorMessage = @"模型文件不存在(2006)";
static NSString *const  kModelFileErrorReason = @"传入的模型文件路径不正确";
static NSString *const  kModelFileDownloadErrorCode = @"Z1040";
static NSString *const  kInitFailErrorReason = @"InitFail";
static NSString *const  kZIMValidationSuccessReason = @"ZIMValidationSuccess";
static NSString *const  kZIMValidationRetryReason = @"ZIMValidationRetry";
static NSString *const  kZIMValidationFailReason = @"ZIMValidationFail";
static NSString *const  kZIMInternalErrorReason = @"ZIMInternalError";
static NSString *const  kInvalidValidateCodeReason = @"InvalidValidateCode";
static NSString *const  kSystemErrorMessage = @"系统错误，请稍候再试。";

static NSString *const  kSkippingPhotinusReason = @"skippingPhotinus";
static NSString *const  kSkippingPhotinusMessage = @"initializationFailure";
static NSString *const  kCameraGivesNoInputMessage = @"cameraGivesNoInput";
static NSString *const  kInterruptedMessage = @"interrupted";


