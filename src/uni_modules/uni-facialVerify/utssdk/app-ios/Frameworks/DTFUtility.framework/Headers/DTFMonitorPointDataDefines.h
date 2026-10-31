//
//  MPMonitorPointDataDefines.h
//
//
//  Created by  tudou on 12-1-5.
//  Copyright (c) 2012年 DTF. All rights reserved.
//
/**
 *  埋点预定义的可用actionID，只可以用预设的，否则服务器不识别
 */
static NSString * const kValue_CrashLogFlag = @"MonitorPoint_Crash";


//static NSString * const kActionID_Manual_perf = @"monitorPerf"; //性能监控标志
//static NSString * const kActionID_Clicked = @"clicked";
//static NSString * const kActionID_LongClicked = @"longClicked";
//static NSString * const kActionID_Submtted = @"submited";
//static NSString * const kActionID_BizLaunched = @"bizLaunched";
//static NSString * const kActionID_SetGesture = @"setGesture";
//static NSString * const kActionID_CheckGesture = @"checkGesture";
//static NSString * const kActionID_NetBroken = @"netBroken";
//static NSString * const kActionID_Monitor = @"monitor";
//static NSString * const KActionID_Slided = @"slided";
//static NSString * const KActionID_None = @"none";
//static NSString * const kActionID_OPENPAGE = @"openPage";
//static NSString * const KActionID_AutoClicked = @"auto_clicked";
//static NSString * const KActionID_AutoClick = @"auto_click";
//static NSString * const KActionID_AutoOpenPage = @"auto_openPage";
//static NSString * const KActionID_AutoEvent = @"auto_event";
//static NSString * const KActionID_Event = @"event";
//static NSString * const KActionID_FingerIdenty = @"fingerIdenty";
//static NSString * const KActionID_MonitorReport = @"MonitorReport";
//static NSString * const KActionID_Exposure = @"exposure";
//static NSString * const KActionID_Page_monitor = @"page_monitor";
//
//
//static NSString * const kActionID_Exception = @"exception";
//static NSString * const KActionID_Error = @"error";
//static NSString * const kActionID_FlashBroken = @"flashBroken";



//性能埋点的actionID
static NSString * const KActionID_PerformanceNetwork = @"network";
static NSString * const KActionID_PerformanceMobSDK = @"mobsdk";
static NSString * const KActionID_PerformanceWebApp = @"webapp";
static NSString * const KActionID_PerformancePackage = @"package";
static NSString * const KActionID_PerformancePage = @"page";
static NSString * const KActionID_PerformanceInterface = @"interface";
static NSString * const KActionID_PerformanceMemory = @"memory";
static NSString * const KActionID_PerformanceSdkMonitor = @"sdkmonitor";

#pragma mark -
#pragma mark 埋点id
#pragma mark -

static NSString * const kRecordTime = @"timestamp";
static NSString * const kPlatformID = @"platformID"; //客户端ID
static NSString * const kClientVersion = @"clientVersion";//客户端版本
static NSString * const kInternalVersion = @"InternalVersion";//内部版本
static NSString * const kLogModleVersion = @"logModelVersion";//日志版本
static NSString * const kClientId = @"clientId"; //设备ID
static NSString * const kUUID = @"UUID";     //会话ID
static NSString * const kUserID = @"userID";
static NSString * const kActionID = @"actionID";//行为id (clicked,submited,bizLaunched)
static NSString * const kActionStatus = @"actionStatus";
static NSString * const kStatusMsg = @"statusMsg";
static NSString * const kBizID = @"bizID";
static NSString * const kBizVersion = @"bizVersion";
static NSString * const kCurrentViewID = @"currentViewID";
static NSString * const kLastViewID = @"lastViewID";
static NSString * const kActionSeed = @"logID"; //埋点ID
static NSString * const kWapURL = @"wapURL";
static NSString * const kActionOwnerType = @"actionType";
static NSString * const kLogOwnerType = @"logType";
static NSString * const kExArg1 = @"stayDuration";
static NSString * const kExArg2 = @"arg2";
static NSString * const kExArg3 = @"renderConsume";
static NSString * const kExArg4 = @"arg4";
static NSString * const kExArg5 = @"sourceID";
static NSString * const kRequestid = @"unitID"; //流水号
static NSString * const UTDID = @"utdID"; //cookie
static NSString * const ucID = @"ucID";
static NSString * const kIndex = @"index";
static NSString * const kLogLastViewID = @"logLastViewID";
static NSString * const kLogCurrentViewID = @"logCurrentViewID";
static NSString * const kExceptionType = @"ExceptionType";
static NSString * const kAppStack = @"AppStack";
static NSString * const kVcStack = @"VcStack";
static NSString * const kAppPackageType = @"AppPackageType";
static NSString * const kAttachment = @"Attachment"; //附加信息
static NSString * const kHeader = @"header";
static NSString * const kExtension = @"extension";
static NSString * const kResolution = @"resolution";
static NSString * const kSessionid = @"session_id";
static NSString * const kHotpatchVersion = @"HotpatchVersion";

#pragma mark -
#pragma mark Performance Log Key

static NSString * const kActionControlID = @"ActionControlID";
static NSString * const kActionToken = @"ActionToken";
static NSString * const kActionDescription = @"ActionDescription";
static NSString * const kMonitorType = @"MonitorType";
static NSString * const kMonitorSubType = @"MonitorSubType";
static NSString * const kSystemType = @"SystemType";
static NSString * const kMPSystemVersion = @"MPSystemVersion";
static NSString * const kNetworkType = @"NetworkType";
static NSString * const kDeviceModel = @"kDeviceModel";
static NSString * const kInnerVersion = @"InnerVersion";
static NSString * const kDistributionChannel = @"DistributionChannel";
static NSString * const kLanguage = @"Language";

#pragma mark -
#pragma mark other keys
// android only 仅仅是为了和安卓保持日志模型一致，此字段留空
static NSString * const kCPUCoreNum = @"CPUCoreNum";
static NSString * const kCPUMaxFreq = @"CPUMaxFreq";
static NSString * const kTotalMem = @"TotalMem";
static NSString * const kAPK = @"apk";
static NSString * const kExtendedArg = @"extendedArgument";// for server @尚清
//9.6.6之后行为埋点的基础扩展字段，字典类型，后续其它日志模型也可以用这个key
static NSString * const kFoundationExtended = @"FoundationExtended";
static NSString * const kFoundationExtendedVoiceOver = @"VoiceOver";

#pragma mark -
#pragma mark Diagnose Log Key
static NSString * const kChannelID = @"ChannelID";
static NSString * const kDiagnoseType = @"DiagnoseType";
static NSString * const kDiagnoseMessage = @"DiagnoseMessage";

//日志级别
static NSString * const kLoggerLevel = @"loggerLevel";
//关键业务日志级别
static NSString * const LoggerLevelHigh  = @"loggerLevelHigh";
//普通业务日志级别
static NSString * const LoggerLevelMedium  = @"loggerLevelMedium";
//诊断业务日志级别
static NSString * const LoggerLevelLow  = @"loggerLevelLow";

typedef NS_ENUM(int, MPLogType){
    MPLogTypeNone = 0,
    MPLogTypeBehavior,
    MPLogTypeCount
};








