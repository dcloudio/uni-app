//
//  BioAuthCommonSetting.h
//  BioAuthEngine
//
//  Created by shouyi.www on 2017/5/19.
//  Copyright © 2017年 DTF. All rights reserved.
//

#ifndef BioAuthCommonSetting_h
#define BioAuthCommonSetting_h

typedef NS_ENUM(NSUInteger, BioAuthAlertType) {
    BioAuthALert_Unknown,
    BioAuthAlert_Unsupport,
    BioAuthAlert_WrongSystemVersion,
    BioAuthAlert_SystemError,
    BioAuthAlert_NoCameraPermission,
    BioAuthAlert_Exit,
    BioAuthAlert_TimeOut,
    BioAuthAlert_Fail,
    BioAuthAlert_Limit,
    BioAuthAlert_NetworkError,
    BioAuthAlert_Interrupt,
};

static NSString *const kBioAuthTipMoveClose = @"请离近一点";
static NSString *const kBioAuthTipAdjustGesture = @"请调整姿势";
static NSString *const kBioAuthTipMoveAway = @"请离远一点";
static NSString *const kBioAuthTipKeepStill = @"请保持不动";
static NSString *const kBioAuthStatusOk = @"Okay";
static NSString *const kBioAuthStatusTooFar = @"too far";
static NSString *const kBioAuthStatusTooClose = @"too close";
static NSString *const kBioAuthStatusNoEye = @"no eye";

static NSString *const kBioAuthEyeStatus = @"eyestatus";
static NSString *const kBioAuthGyroStatus = @"gyrostatus";
static NSString *const kBioAuthEVVer = @"evVer";
static NSString *const kBioAuthBVer = @"bEva";
static NSString *const kBioAuthFEVer = @"feVer";
static NSString *const kBioAuthEyeVerify = @"eyeverify";
static NSString *const kBioAuthBisAction = @"bis_action";
static NSString *const kBioAuthDetectEndTimeCost = @"kBioAuthDetectEndTimeCost";
static NSString *const kBioAuthLiveBodyStartTime = @"kBioAuthLiveBodyStartTime";
static NSString *const kBioAuthMonitorLoadDefaultConfig = @"loadDefaultConfig";

static NSString *const kBioAuthParamNetworkSuccess = @"networkSuccess";
static NSString *const kBioAuthParamServerReturnCode = @"serverReturnCode";
static NSString *const kBioAuthParamNetworkResult = @"networkResult";
static NSString *const kBioAuthParamSceneCode = @"scenecode";
static NSString *const kBioAuthParamLivenessLevel = @"livenesslevel";
static NSString *const kBioAuthParamFail = @"failed";
static NSString *const kBioAuthParamDiagnosticLogging = @"DiagnosticLogging";
static NSString *const kBioAuthParamEyeScore = @"eyescore";
static NSString *const kBioAuthParamHasFace = @"hasface";
static NSString *const kBioAuthParamPicsScore = @"picscore";
static NSString *const kBioAuthParamFaceScore = @"facescore";
static NSString *const kBioAuthParamIKnown = @"我知道了";
static NSString *const kBioAuthParamDeviceModelError = @"errorDeviceModel";
static NSString *const kBioAuthParamLightDetection = @"lightdetection";
static NSString *const kBioAuthParamLight = @"light";
static NSString *const kBioAuthParamFace = @"face";
static NSString *const kBioAuthParamQuality = @"quality";
static NSString *const kBioAuthParamEyeDistance = @"eyedistance";
static NSString *const kBioAuthParamFaceFarOrNear = @"faceFarorNear";
static NSString *const kBioAuthParamFGROAngle = @"fgyroangle";
static NSString *const kBioAuthParamOpenPage = @"openPage";
static NSString *const kBioAuthParamServerFail = @"serverFail";
static NSString *const kBioAuthParamNetworkFail = @"networkFail";
static NSString *const kBioAuthParamNetworkError1006 = @"NetworkError1006";
static NSString *const kBioAuthParamFaceFail = @"faceFail";
static NSString *const kBioAuthParamUploadImageDataNil = @"uploadImageDataNil";
static NSString *const kBioAuthParamAlertViewTitle = @"kBioAuthParamAlertViewTitle";
static NSString *const kBioAuthParamAlertViewMessage = @"kBioAuthParamAlertViewMessage";
static NSString *const kBioAuthParamAlertViewFirstButtonTitle = @"kBioAuthParamAlertViewFirstButtonTitle";
static NSString *const kBioAuthParamAlertViewSecondButtonTitle = @"kBioAuthParamAlertViewSecondButtonTitle";
static NSString *const kBioAuthParamAlertViewFirstCallback = @"kBioAuthParamAlertViewFirstCallback";
static NSString *const kBioAuthParamAlertViewSecondCallback = @"kBioAuthParamAlertViewSecondCallback";
static NSString *const kBioAuthParamAlertViewLogReason = @"kBioAuthParamAlertViewLogReason";
static NSString *const kBioAuthParamAlertType = @"kBioAuthParamAlertType";

static NSString *const kBioAuthParamInterrupt = @"interrupt";
static NSString *const kBioAuthParamCancel = @"cancel";
static NSString *const kBioAuthParamLoadAlgorithmErr = @"loadAlgorithmErr";
static NSString *const kBioAuthParamErrorMicriphone = @"errorMicrophone";
static NSString *const kBioAuthParamVidCnt = @"vidcnt";
static NSString *const kBioAuthParamFQuality = @"fquality";
static NSString *const kBioAuthParamFCToken = @"fcToken";
static NSString *const kBioAuthParamF = @"f";
static NSString *const kBioAuthParamFC = @"fc";
//static NSString *const kBioAuthFaceUrlPrefix = @"prefs://";

static NSString *const kBioAuthEVAssetsBundle = @"EyePrintAssets.bundle";

static NSString *const kBioAuthDirDocuments = @"Documents";
static NSString *const kBioAuthDirBioAuth = @"BioAuth";
static NSString *const kBioAuthDirAssetsFile = @"EyeVerify_Asset_Files";
static NSString *const kBioAuthFailReasonEyeDetector = @"初始化eyeDetector失败";

static NSString *const kBioAuthFailReasonCreateTaskFail = @"创建眼纹检测任务失败";
static NSString *const kBioAuthFailReasonCreateGyroTaskFail = @"创建陀螺仪检测任务失败";
static NSString *const kBioAuthFailReasonFailToGetScanTask = @"扫脸任务无法获取scanTask";
static NSString *const kBioAuthFailReasonViewControllerFail = @"无法获取viewController";
static NSString *const kBioAuthFailReasonNoCameraPermission = @"没有摄像头权限";
static NSString *const kBioAuthFailReasonWrongSystemVersion = @"操作系统版本太低";
static NSString *const kBioAuthFailReasonUnsupportedDevice = @"不支持的设备";

static NSString *const kBioAuthTipSystemNotSupport = @"当前系统不支持刷脸";
static NSString *const kBioAuthTipWrongSysVersion = @"刷脸仅在iOS8及以上版本可用";
static NSString *const kBioAuthTipCameraNoPermission = @"无法启用相机";
static NSString *const kBioAuthTipOpenCameraPermissionPath = @"请到“设置-隐私-相机”开启权限";
static NSString *const kBioAuthTipCameraPermissionOpenNow = @"立即开启";
static NSString *const kBioAuthTipQuit = @"退出";
static NSString *const kBioAuthTipOk = @"确定";
static NSString *const kBioAuthTipCancel = @"取消";
static NSString *const kBioAuthTipOneMoreTime = @"再试一次";
static NSString *const kBioAuthTipMakeSureToQuit = @"确定退出么?";
static NSString *const kBioAuthTipOneFaceToPass = @"露个脸就能通过";
static NSString *const kBioAuthTipTimeOut = @"操作超时";
static NSString *const kBioAuthTipFaceFrontMakePassMoreEasier = @"提示：正对手机，更容易成功";
static NSString *const kBioAuthTipFaceScanFail =  @"刷脸失败";
static NSString *const kBioAuthTipOperationFail = @"本次操作失败";
static NSString *const kBioAuthTipNetworkFail = @"网络不给力";
static NSString *const kBioAuthTipInterrupt = @"验证中断";


static NSString *const kAFETimeoutMessage = @"kTimeoutMessage";

static NSString *const kBioAuthUnsupportedMedelMessage = @"kUnsupportedMedelMessage";
static NSString *const kAFEUnsupportedSystemMessage = @"kUnsupportedSystemMessage";

static NSString *const kAFENoCameraPermissionOpen = @"kNoCameraPermissionOpen";
static NSString *const kAFENoCameraPermissionCancel = @"kNoCameraPermissionCancel";
static NSString *const kAEFNoCameraPermissionTitle = @"kNoCameraPermissionTitle";
static NSString *const kAFENoCameraPermissionDetail = @"kNoCameraPermissionDetail";

static NSString *const kAFELocalizedNetworkError = @"kNetworkErrorMessage";



static NSString *const kAFELocalizedFaceFailTitle = @"kFaceFailTitle";
static NSString *const kAFELocalizedFaceFailMsg = @"kFaceFailMessage";
static NSString *const kAFELocalizedCancelTitle = @"kCancelTitle";
static NSString *const kAFELocalizedCancelLoginMsg = @"kCancelLoginMessage";
static NSString *const kAFELocalizedCancelSampleMsg = @"kCancelSampleMessage";

static NSString *const kCherryAglErrorTips = @"kCherryAglErrorTips";
static NSString *const kCherryOtherLoginButton = @"kCherryOtherLoginButton";
static NSString *const kCherryLoginHomeEvent = @"kCherryLoginHomeEvent";
static NSString *const kCherrySampleHomeEvent = @"kCherrySampleHomeEvent";
static NSString *const kCherryExitButton = @"kCherryExitButton";
static NSString *const kCherryOpenButton = @"kCherryOpenButton";
static NSString *const kCherryRetryButton = @"kCherryRetryButton";
static NSString *const kContextRetryLimit = @"kRetryLimit";
static NSString *const kCherryTimeout = @"kCherryTimeout";
static NSString *const kCherryTipMessage = @"kCherryTipMessage";
static NSString *const kCherryDetectTask = @"cherryDetectTask";
static NSString *const kCherryAdjustPosTip = @"kcherryAdjustPosTip";
static NSString *const kCherryNofaceTip = @"kCherryNofaceTip";
static NSString *const kCherryCancelLogin = @"kCherryCancelLogin";
static NSString *const kCherryCancelSample = @"kCherryCancelSample";
static NSString *const kCherryCancelSampleMessage = @"kCherryCancelSampleMessage";

static NSString *const kAFEStatusUpdate = @"statusupdate";

static NSString *const kSceneRetryLimit = @"retryLimit";
static NSString *const kAFERetryLimit = @"retryLimit";

static NSString *const kCherryUnderExposure = @"kCherryUnderExposure";
static NSString *const kCherryFaceTooSmall = @"kCherryFaceTooSmall";
static NSString *const kCherryFaceIncomplete = @"kCherryFaceIncomplete";
static NSString *const kCherryYawFail = @"kCherryYawFail";
static NSString *const kCherryTremble = @"kCherryTremble";

static NSString *const kCherryCancleButton = @"kCherryCancleButton";
static NSString *const kCherryEnterButton = @"kCherryEnterButton";
static NSString *const kIKnowButton = @"kIKnowButton";
static NSString *const kNoMicPermissionTitle = @"kNoMicPermissionTitle";
static NSString *const kNoMicPermissionMsg = @"kNoMicPermissionMsg";

static NSString *const kSceneCircularViewFail = @"AFECircularViewFail";

static NSString *const kCherryDetectFlagBlink = @"kCherryDetectFlagBlink";
static NSString *const kCherryDetectFlagPosQuality = @"kCherryDetectFlagPosQuality";
static NSString *const kCherryDetectFlagPosCond = @"kCherryDetectFlagPosCond";

static NSString *const kAFENetworkType = @"networkType";
static NSString *const kBioAuthParamSensor = @"sensor";
static NSString *const kBioAuthParamTotalSteps = @"tsteps";
static NSString *const kBioAuthNotifiUploadTaskBeginNotiName = @"afeuploadtaskbegin";
static NSString *const kBioAuthParamAlertShowKey = @"alert";
static NSString *const kBioAuthParamCaptureView = @"captureView";
static NSString *const kBioAuthParamScanView = @"scanview";
static NSString *const kBioAuthPramBizInfoForKey = @"biz";
static NSString *const kBioAuthParamStepsUploaded = @"upsteps";
static NSString *const kBioAuthParamEnvStatus = @"envstatus";
static NSString *const kBioAuthParamRetryNum = @"retry";
static NSString *const kBioAuthParamCurrentTransactionSteps = @"transactionSteps";
static NSString *const kBioAuthParamSound = @"sound";
static NSString *const kBioAuthParamUID = @"UID";
static NSString *const kBioAuthParamAction = @"SCENE_ID";
static NSString *const kBioAuthParamCurrentView = @"currentView";

static NSString * const kAPFParentViewControllerKey = @"parentViewController";
static NSString * const kAPFCurrentViewControllerKey = @"currentViewController";

static NSString * const kAPFCurrentRetryCntKey = @"currentRetryCnt";
static NSString * const kAPFSoundStatusKey = @"soundStatus";
static NSString * const kAPFIsLoginModeKey = @"isLoginMode";
static NSString * const kAPFBisConfigModelKey = @"APFBisConfigModel";
static NSString * const kAPFBisTokenKey = @"bis_token";
static NSString * const kAPFUploadViewPic = @"kUploadViewPic";
static NSString * const kAPFAcionListKey = @"kActionList";
static NSString * const kAPFPresentTimeKey = @"kPresentTime";

static NSString *const kBioAuthApdidKey = @"APDID";
static NSString *const kBioAuthTokenidKey = @"TOKEN_ID";
static NSString *const kBioAuthSceneIdKey = @"sceneId";
static NSString *const kBioAuthSceneNameKey = @"SCENE_NAME";
static NSString *const kBioAuthAppidKey = @"appID";
static NSString *const kBioAuthExtInfo = @"extInfo";
static NSString *const kBioAuthParamType = @"type";
static NSString *const kBioAuthParamSampleMode = @"samplemode";
static NSString *const kBioAuthParamPubKey = @"pubkey";
static NSString *const kBioAuthParamPermissionKey = @"audioPermissionKey";
static NSString *const kBioAuthParamBizInfoKey = @"bizinfo";
static NSString *const kBioAuthParamBestImage = @"bestimage";
static NSString *const kBioAuthParamImageQuality = @"bestimagequality";
static NSString *const kBioAuthParamMineCount = @"minecount";
static NSString *const kBioAuthParamLoggingLevel = @"LoggerLevel";
static NSString *const kBioAuthParamLevelHigh = @"level1";
static NSString *const kBioAuthParamLevelMedium = @"level2";
static NSString *const kBioAuthParamLevelLow = @"level3";

static NSString *const kBioAuthParamNLSAppKey = @"121312323a123-ios";
static NSString *const kBioAuthParamAsrRequest = @"asr_usr_id";
static NSString *const kBioAuthParamNLSSVCUrl = @"ws://speechapi.m.taobao.com";
static NSString *const kBioAuthParamFppVer = @"fppVer";
static NSString *const kBioAuthParamFVer = @"fVer";
static NSString *const kBioAuthParamFaceDetect = @"facedetect";
static NSString *const kBioAuthParamProduct = @"product";
static NSString *const kBioAuthParamCherry = @"cherry";
static NSString *const kBioAuthParamStock = @"stock";
static NSString *const kBioAuthEngine = @"BioAuthEngine";
static NSString *const kBioAuthFaceNavigation = @"faceNavigation";
static NSString *const kBioAuthTypeHTML = @"htm";
static NSString *const kBioAuthTypeBundle = @"bundle";

static NSString *const kAPFWaveUploadKey = @"waveUploadKey";
static NSString *const kAPFCameraViewKey = @"cameraViewKey";

static NSString *const kAFELocalizedLoginFailTooManyTimes = @"kLoginFailTooManyTimesMessage";
static NSString *const kAFELoginFailTooManyTimesMessage = @"kLoginFailTooManyTimesMessage";

static NSString *const kAFELocalizedLock = @"kLockMessage";
static NSString *const kAFELockMessage = @"kLockMessage";

static NSString *const kAFELocalizedRetryTitle = @"kRetryTitle";
static NSString *const kAFERetryTitle = @"kRetryTitle";

static NSString *const kAFELocalizedPassWdTitle = @"kUsePasswordTitle";
static NSString *const kAFEUsePasswordTitle = @"kUsePasswordTitle";

static NSString *const kAFELocalizedExitTitle = @"kExitTitle";
static NSString *const kAFEExitTitle = @"kExitTitle";

static NSString *const kAFELocalizedIKnowTitle = @"kIKnowTitle";
static NSString *const kAFEIKnowTitle = @"kIKnowTitle";

static NSString *const kBioAuthParamTimeout = @"timeout";
static NSString *const kBioAuthParamClickXBack = @"clickXback";
static NSString *const kBioAuthParamSystemInterrupt = @"systemInterrupt";
static NSString *const kBioAuthParamProcessInterrupt = @"processInterrupt";
static NSString *const kBioAuthParamCameraPermission = @"cameraPermission";
static NSString *const kBioAuthParamCameraOpenFail = @"cameraOpenFail";
static NSString *const kBioAuthParamErrorSystemVersion = @"errorSystemVersion";
static NSString *const kBioAuthParamReason = @"reason";
static NSString *const kBioAuthParamMoniton = @"motion";
static NSString *const kBioAuthParamFrameMoniton = @"frameMotion";
static NSString *const kBioAuthParamChoose = @"choose";
static NSString *const kBioAuthParamTimeCost = @"timecost";
static NSString *const kBioAuthParamReturnCode = @"returnCode";
static NSString *const kBioAuthParamFrontCamera = @"frontCamera";
static NSString *const kBioAuthParamBackCamera = @"backCamera";
static NSString *const kBioAuthParamMemory = @"memory";
static NSString *const kBioAuthParamProcessorNum = @"processorNum";
static NSString *const kBioAuthParamTotalStorage = @"totalStorage";
static NSString *const kBioAuthParamAvailableStorage = @"availableStorage";
static NSString *const kBioAuthParamBisToken = @"bistoken";
static NSString *const kBioAuthParamAlgorithmIntTime = @"inttime";
static NSString *const kBioAuthParamAlgorithmName = @"name";
static NSString *const kBioAuthParamUploadRequest = @"uploadrequest";
static NSString *const kBioAuthParamBisCfg = @"biscfg";
static NSString *const kBioAuthParamUserId = @"USER_ID";
static NSString *const kBioAuthParamBioType = @"bioType";
static NSString *const kBioAuthParamLogType = @"logType";
static NSString *const kBioAuthParamUIVersion = @"ui_version";
static NSString *const kBioAuthFailReasonUserQuit = @"用户主动退出";
static NSString *const kBioAuthVerifyId = @"verifyId";
static NSString *const kBioAuthParamToygerInit = @"toygerInit";
static NSString *const kBioAuthParamToygerFileState = @"toygerFileState";
static NSString *const kBioAuthFailInsufficientDisk = @"手机存储空间不足";
static NSString *const kBioAuthFailNoPermissionRecording = @"没有录音权限";

#pragma mark - 埋点相关 -

static NSString *const kBioAuthMonitorAlertAppear = @"AlertAppear";
static NSString *const kBioAuthMonitorAlertAppearUCID = @"UC-YWRLSB-161114-21";

static NSString *const kBioAuthMonitorAlertClose = @"AlertChoose";
static NSString *const kBioAuthMonitorAlertCloseUCID = @"UC-YWRLSB-161114-22";

static NSString *const kBioAuthMonitorDetectionStart = @"EnterDetectionStart";
static NSString *const kBioAuthMonitorDetectionStartUCID = @"UC-YWRLSB-161114-07";

static NSString *const kBioAuthMonitorDetectionEnd = @"EnterDetectionEnd";
static NSString *const kBioAuthMonitorDetectionEndUCID = @"UC-YWRLSB-161114-08";

static NSString *const kBioAuthMonitorDetectionCondStart = @"detectCondStart";
static NSString *const kBioAuthMonitorDetectionCondStartUCID = @"UC-YWRLSB-161114-09";

static NSString *const kBioAuthMonitorSensorSlice = @"sensorSlice";
static NSString *const kBioAuthMonitorSensorSliceUCID = @"UC-YWRLSB-161114-20";

static NSString *const kBioAuthMonitorPoseStart = @"poseStart";
static NSString *const kBioAuthMonitorPoseStartUCID = @"UC-YWRLSB-161114-11";

static NSString *const kBioAuthMonitorLiveBodyStart = @"livebodyStart";
static NSString *const kBioAuthMonitorLiveBodyStartUCID = @"UC-YWRLSB-161114-13";

static NSString *const kBioAuthMonitorLiveBodyEnd = @"livebodyEnd";
static NSString *const kBioAuthMonitorLiveBodyEndUCID = @"UC-YWRLSB-161114-14";

static NSString *const kBioAuthMonitorPromptCopyPoint = @"promptCopyPoint";
static NSString *const kBioAuthMonitorPromptCopyPointUCID = @"UC-YWRLSB-161114-17";

static NSString *const kBioAuthParamEvent = @"event";

static NSString *const kBioAuthMonitorPoseCheckEnd = @"poseCheckEnd";
static NSString *const kBioAuthMonitorPoseCheckEndUCID = @"UC-YWRLSB-161114-28";

static NSString *const kBioAuthMonitorAlgorithm = @"Algorithm";
static NSString *const kBioAuthMonitorAlgorithmUCID = @"UC-YWRLSB-161114-27";

static NSString *const kBioAuthMonitorFromH5 = @"fromH5";

static NSString *const kBioAuthMonitorEnterGuidePage = @"enterGuidePage";
static NSString *const kBioAuthMonitorEnterGuidePageUCID = @"UC-YWRLSB-161114-02";

static NSString *const kBioAuthMonitorExitGuidePage = @"exitGuidePage";
static NSString *const kBioAuthMonitorExitGuidePageUCID = @"UC-YWRLSB-161114-03";

static NSString *const kBioAuthMonitorClickStartCapture = @"clickStartCapture";
static NSString *const kBioAuthMonitorClickStartCaptureForSuitable = @"suitable";
static NSString *const kBioAuthMonitorClickStartCaptureForSuitableError = @"suitableError";
static NSString *const kBioAuthMonitorClickStartCaptureUCID = @"UC-YWRLSB-161114-04";

static NSString *const kBioAuthMonitorEntrySDK = @"entrySDK";
static NSString *const kBioAuthMonitorEntrySDKUCID = @"UC-YWRLSB-161114-01";

static NSString *const kBioAuthMonitorCallbackVerifySystem = @"callbackVerifySystem";
static NSString *const kBioAuthMonitorCallbackVerifySystemUCID = @"UC-YWRLSB-161114-23";

static NSString *const kBioAuthMonitorExitSDK = @"exitSDK";
static NSString *const kBioAuthMonitorExitSDKUCID = @"UC-YWRLSB-161114-24";

static NSString *const kBioAuthMonitorFaceMine = @"facemine";
static NSString *const kBioAuthMonitorFaceMineUCID = @"UC-DXSPRLSB-161206-10";

static NSString *const kBioAuthMonitorBrightness = @"brightness";
static NSString *const kBioAuthMonitorBrightnessUCID = @"UC-YWRLSB-161207-01";

static NSString *const kBioAuthLoadLocalGuidePage = @"loadLocalGuidePage";
static NSString *const kBioAuthLoadLocalGuidePageUCID = @"UC-YWRLSB-160422-02";

static NSString *const kBioAuthUploadEnd = @"uploadEnd";
static NSString *const kBioAuthUploadEndUCID = @"UC-YWRLSB-161114-16";

static NSString *const kBioAuthuploadAvarriable = @"uploadAvarriable";
static NSString *const kBioAuthuploadAvarriableUCID = @"UC-YWRLSB-161114-25";

static NSString *const kBioAuthUploadStart = @"uploadStart";
static NSString *const kBioAuthUploadStartUCID = @"UC-YWRLSB-161114-15";

static NSString *const kBioAuthDetectCondEnd = @"detectCondEnd";
static NSString *const kBioAuthDetectCondEndUCID = @"UC-YWRLSB-161114-10";

static NSString *const kBioAuthDetectFaceSuccess = @"detectFaceSuccess";
static NSString *const kBioAuthDetectFaceSuccessUCID = @"UC-YWRLSB-161114-28";

static NSString *const kBioAuthDetectEyeSuccess = @"detectEyeSuccess";
static NSString *const kBioAuthDetectEyeSuccessUCID = @"UC-YWRLSB-161114-29";

static NSString *const kBioAuthMonitorEyeLivebodyDetectStart = @"eyeLivebodyDetectStart";
static NSString *const kBioAuthMonitorEyeLivebodyDetectStartUCID = @"UC-YWRLSB-161114-30";

static NSString *const kBioAuthMonitorEyeLivebodyDetectEnd = @"eyeLivebodyDetectEnd";
static NSString *const kBioAuthMonitorEyeLivebodyDetectEndUCID = @"UC-YWRLSB-161114-31";

static NSString *const kBioAuthMonitorEyeSlice = @"eyeSlice";
static NSString *const kBioAuthMonitorEyeSliceUCID = @"UC-YWRLSB-161114-19";
static NSString *const kBioAuthCardFace = @"cardface";

#pragma mark - 埋点相关 -

static NSString *const kBioAuthMonitorFcEntrySDK = @"fcEntrySDK";
static NSString *const kBioAuthMonitorFcEntrySDKUCID = @"UC-RZHY-170118-01";

static NSString *const kBioAuthMonitorFcGetParameter = @"fcGetParameters";
static NSString *const kBioAuthMonitorFcGetParameterUCID = @"UC-RZHY-170118-02";

static NSString *const kBioAuthMonitorFcFaceCallbackBisSystem = @"fcFaceCallbackBisSystem";
static NSString *const kBioAuthMonitorFcFaceCallbackBisSystemUCID = @"UC-RZHY-170118-27";

static NSString *const kBioAuthMonitorFcFaceGetServerResult = @"fcFaceGetServerResult";
static NSString *const kBioAuthMonitorFcFaceGetServerResultUCID = @"UC-RZHY-170118-28";

static NSString *const kBioAuthMonitorFcCallbackVerifySystem = @"fcCallbackVeritySystem";
static NSString *const kBioAuthMonitorFcCallbackVerifySystemUCID = @"UC-RZHY-170118-29";

static NSString *const kBioAuthFcExitSDK = @"fcExitSDK";
static NSString *const kBioAuthFcExitSDKUCID = @"UC-RZHY-170118-30";

static NSString *const kBioAuthValidateRequestKey = @"validateRequest";
static NSString *const kBioAuthMergeValidateKey = @"mergeValidate";

#pragma mark - 网络相关 -
static NSString *const kAPBGWOperationType = @"oprationType";             //NSString, oprationType
static NSString *const kAPBGWReturnType = @"returnType";                //NSString, returnType
static NSString *const kAPBGWGatewayURL = @"gatewayURL";               //NSString, gatewayURL
static NSString *const kAPBGWBackupURL = @"backupURL";               //NSString, backupUrl
static NSString *const kAPBGWHeadConfig = @"headConfig";
#endif /* BioAuthCommonSetting_h */

