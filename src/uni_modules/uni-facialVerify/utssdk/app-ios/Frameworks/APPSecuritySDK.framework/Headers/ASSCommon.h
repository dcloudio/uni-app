//
//  ASSCommon.h
//  ae-security-sdk
//
//  Created by xingchen on 14/12/30.
//  Copyright (c) 2014年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ASSLogger.h"

//#define IN_DEBUG
#define USED_BY_ALIPAY

static NSErrorDomain APSECURITYSDK_ERROR_DOMAIN  = @"APSecuritySDKErrorDomain";

static NSString* const PRIVATE_KEY_XXXX = @"qqAIhzy)H)ip53<>ugx,sI{#}CE$37L|z5G=IScgO^=aQHaN[b|NM.RWdZpcy.r$";

static NSString* const PRIVATE_KEY_CLIENTKEY = @"EQopzyui)H)ipQW983<ll>uitx,sgI{#}##20110kl==^^woQG,msq.xinjun.$$";

static NSString* const LOG_SWITCH_SETTING_INITIALIZED = @"开关设置从keychain初始化成功";

static NSString* const LOG_LOAD_SETTING_EXCEPTION = @"开关设置在keychain中无存储，读取失败";

static NSString* const LOG_DECRYPT_SETTING_EXCEPTION = @"开关设置从keychain中读取成功，解密失败";

static NSString* const LOG_SWITCH_APPLIST_INITIALIZED = @"applist从keychain初始化成功";

static NSString* const LOG_LOAD_APPLIST_EXCEPTION = @"applist相关信息在keychain中无存储，读取失败";

static NSString* const LOG_DECRYPT_APPLIST_EXCEPTION = @"applist信息从keychain中读取成功，解密失败";

static NSString* const LOG_UMID_TOKEN_REQUEST_BACK = @"UMID TOKEN返回结果为：";

static NSString* const LOG_VKEYINFO_GENERATED = @"本地VKEY开关打开，将生成VKEY信息";

static NSString* const LOG_VKEYINFO_ABORT = @"本地VKEY开关关闭，将放弃生成VKEY信息";

static NSString* const LOG_VKEY_NO_KEYCHAIN_CACHE = @"VKEY缓存信息在keychain中无存储，读取失败";

static NSString* const LOG_VKEY_FOUND_KEYCHAIN_CACHE = @"VKEY缓存信息在keychain中获取缓存值";

static NSString* const LOG_VKEY_INFO_DETAIL = @"KEY信息为：";

static NSString* const LOG_VKEY_GENERATION_EXCEPTION = @"VEr：";

static NSString* const LOG_GID_GENERATED = @"本地GID开关打开，将生成GID信息";

static NSString* const LOG_GID_ABORT = @"本地GID开关关闭，将放弃生成GID信息";

static NSString* const LOG_GID_NO_KEYCHAIN_CACHE = @"GID缓存信息在keychain中无存储，读取失败";

static NSString* const LOG_GID_FOUND_KEYCHAIN_CACHE = @"GID缓存信息在keychain中获取缓存值";

static NSString* const LOG_GID_INFO_DETAIL = @"GID信息为：";

static NSString* const LOG_VOS_RUNNING = @"VKEY任务启动";

static NSString* const LOG_VOS_ASYNC_ABORT = @"放弃异步VOS任务";

static NSString* const LOG_VOS_VKEY_GENERATION = @"VOS VKEY采集中";

static NSString* const LOG_VOS_GID_GENERATION = @"VOS GID采集中";

static NSString* const LOG_GID_GENERATION_EXCEPTION = @"GEr:";

static NSString* const LOG_JB_ERROR_DETECTED = @"JEr";

static NSString* const LOG_STATIC_INFO_DETAIL = @"采集静态信息列表如下：";

static NSString* const LOG_APP_LIST_INFO_COLLECTED = @"APPLIST信息扫描获取中";

static NSString* const LOG_APP_LIST_INFO_ABORT = @"APPLIST信息放弃扫描获取";

static NSString* const LOG_LOAD_MODEL_KEYCHAIN_EXCEPTION = @"VKEYID在keychain无存储，读取失败";

static NSString* const LOG_LOAD_MODEL_FROM_KEYCHAIN = @"VKEYID从keychain中成功读取";

static NSString *const LOG_LOCALMODEL_ABSENT = @"本地未找到VKEYID存储";

static NSString *const LOG_LOCALMODEL_LOADSUCCESS = @"本地成功找到VKEYID存储";

static NSString *const LOG_LOAD_PREAPDID_SUCCESS = @"本地成功在keychain中读取旧版apdid的值:";

static NSString *const LOG_LOAD_PREAPDID_FAILED = @"旧版apdid在keychain中无存储，读取失败";

static NSString* const LOG_STATIC_INFO_CHANGED = @"所采集的静态信息发生改变或者存储中没有记录";

static NSString* const LOG_STATIC_INFO_SAME = @"所采集的静态信息与存储中相同";

static NSString* const LOG_TODAY_FIRST = @"检测为24小时内首次请求";

static NSString* const LOG_NOT_TODAY_FIRST = @"检测24小时内已经发起过请求";

static NSString *const LOG_GETAPDIDTOKEN_RET_LOCAL = @"不发起网络请求，直接返回本地存储";

static NSString* const LOG_CONNECT_TO_SERVER = @"需要访问服务器请求TOKEN";

static NSString* const LOG_REQUEST_INFO_INCLUDED = @"静态请求上传需要携带静态信息";

static NSString* const LOG_REQUEST_INFO_EXCLUDED = @"静态请求上传不需要携带静态信息";

static NSString* const LOG_STATIC_REQUEST_EXCEPTION = @"静态数据请求发送出现异常";

static NSString* const LOG_STATIC_REQUEST_FAILED = @"静态数据请求返回出现错误";

static NSString* const LOG_STATIC_REQUEST_SUCCESS = @"静态数据请求请求返回";

static NSString* const LOG_SERVER_RESPONSE_SUCCESS = @"服务端返回结果通过验证，证明有效：";

static NSString* const LOG_SERVER_RESPONSE_FAILED = @"服务端获取TOKEN失败";

static NSString* const LOG_LOG_REQUEST_RESPONSE = @"日志上传成功返回";

static NSString *const LOG_LOCALMODEL_SAVED_KEYCHAIN = @"成功将VKEY ID保存至keychain";

static NSString *const LOG_UPDATE_SETTING = @"已更新keychain中开关的设置值";

static NSString* const LOG_APP_LIST_NEED_UPDATE = @"经过检测，app list列表需要从服务器更新";

static NSString *const LOG_UPDATE_APPLIST = @"app list列表成功从服务器更新";

static NSString* const LOG_APPLIST_SETTING_SAVED_KEYCHAIN = @"app list列表信息成功更新至keychain保存";

static NSString* const LOG_APP_LIST_REQUEST_EXCEPTION = @"app list请求出现异常";

static NSString* const LOG_APP_LIST_RESPONSE_FAILED = @"app list请求结果失败";

static NSString* const LOG_LOG_UPDATE_EXCEPTION = @"日志信息请求发送出现异常";

static NSString* const LOG_LOG_UPLOAD_ERROR = @"日志信息发送出现错误";

static NSString* const LOG_LOG_UPLOAD_SUCCESS = @"日志信息发送返回成功";

static NSString *const LOG_SETTINGMODEL_SAVEFAILED = @"开关信息保存错误";

static NSString *const LOG_SETTINGMODEL_SUCCESS = @"开关信息成功保存到keychain";

static NSString* const LOG_LOG_UPLOAD_PROCESS = @"上报日志开关打开，开始上报错误日志流程";

static NSString* const LOG_LOG_UPLOAD_ABORT = @"上报日志开关关闭，放弃上报错误日志";

static NSString* const LOG_LOG_FILE_DETAIL = @"检测到错误日志文件：";

static NSString* const LOG_LOG_FILE_REMOVAL = @"已经删除错误日志文件：";

static NSString* const LOG_LOG_UPLOAD_START = @"开始日志上报网络请求";

static NSString* const LOG_LOG_UPLOAD_DETAIL = @"日志上报网络请求具体内容：";



static NSString* const LOG_JSON_PARSE_EXCEPTION = @"JSON解析失败";

static NSString* const ASS_STORAGE_KEY_SUCCESS = @"success";
static NSString* const ASS_STORAGE_KEY_APDID = @"apdid";
static NSString* const ASS_STORAGE_KEY_TOKEN = @"token";
static NSString* const ASS_STORAGE_KEY_TIME = @"time";
static NSString* const ASS_STORAGE_KEY_VKEYSWITCH = @"vkeyon";
static NSString* const ASS_STORAGE_KEY_LOGSWITCH = @"logon";
static NSString* const ASS_STORAGE_KEY_APPLISTVERSION = @"appver";
static NSString* const ASS_STORAGE_KEY_STATICHASH = @"statichash";
static NSString* const ASS_STORAGE_KEY_ERROR = @"error";
static NSString* const ASS_APPKEY_INVALID = @"APPKEY_ERROR";
static NSString* const ASS_STORAGE_KEY_WEBRTCURL = @"webrtcurl";
static NSString* const ASS_STORAGE_KEY_DYNAMICKEY = @"dynamickey";
static NSString* const ASS_STORAGE_KEY_AGENTURL = @"agentcurl";
static NSString* const ASS_STORAGE_KEY_APSE_DEGRADE = @"apse_degrade";
static NSString* const ASS_STORAGE_KEY_TIMEINTERVAL = @"timeInterval";

static NSString* const SECURE_SDK_KEYCHAIN_KEY = @"com.alipay.securesdk.storage";
static NSString* const LAST_LOGIN_TIME_KEY = @"com.alipay.asssecuritySDK.lastlogintime";
static NSString* const SECURE_SDK_RANDOM_STRING = @"com.alipay.securesdk.ranstr";
static NSString* const SECURE_SDK_RANDOM_TOKEN = @"com.alipay.securesdk.tokenid";
static NSString* const ASS_KEYCHAIN_KEY_SETTING = @"com.alipay.asssecuresdk.config";
static NSString* const SECURE_SDK_RANDOM_CLIENTKEY_STRING = @"com.alipay.securesdk.clientkey";
static NSString* const SECURE_SDK_KEYCHAIN_TOKEN = @"maintoken";

static NSString* const ASS_KEYCHAIN_KEY_APPLIST = @"com.alipay.asssecuresdk.list";
static NSString* const ASS_KEYCHAIN_KEY_DFP = @"com.alipay.asssecuresdk.dfp";
static NSString* const ASS_KEYCHAIN_KEY_GID = @"com.alipay.asssecuresdk.gid";
static NSString* const ASS_KEYCHAIN_KEY_JBER = @"com.alipay.asssecuresdk.jber";
static NSString* const ASS_KEYCHAIN_KEY_APDIDC = @"com.alipay.asssecuresdk.apdidc";
static NSString* const ASS_KEYCHAIN_KEY_TMXTIME = @"com.alipay.asssecuresdk.tmxtime";
static NSString* const ASS_KEYCHAIN_KEY_TMXSESSOINID = @"com.alipay.asssecuresdk.tmxsessionid";
static NSString* const ASS_KEYCHAIN_KEY_ARPMAC = @"com.alipay.asssecuresdk.arpmac";
static NSString* const ASS_KEYCHAIN_KEY_DYNAMICKEY = @"com.alipay.asssecuresdk.dynamickey";

static NSString* const ASS_USER_DEFAULT_KEY_DEGRADE_TIME = @"asssecuritysdkdegrade";

static const int overtime = 9;

//CRASHGUARD
static NSString* const CRASH_GUARD_GET_COLOR_INFO = @"05f445";
static NSString* const CRASH_GUARD_PRE_COLOR_INFO = @"f379d2";
static NSString* const CRASH_GUARD_INIT_COLOR_INFO = @"25f523";
static NSString* const CRASH_GUARD_UPDATE_COLOR_CODE = @"8e81ac";
static NSString* const CRASH_GUARD_GET_COLOR_LABEL = @"d785d8";
static NSString* const CRASH_GUARD_UPDATE_COLOR_LABEL = @"dccf1d";
static NSString* const CRASH_GUARD_INIT_TOKEN = @"0780aa";
static NSString* const CRASH_GUARD_INIT = @"e37f013";


@interface ASSCommon : NSObject

+ (int)getCurrentMode;

+ (NSString*)getRPCURL;

+ (NSString*)getServerHost;

+ (void) setRPCHeader:(NSDictionary*)header;

+ (NSDictionary*)getRPCHeader;

+ (void)setupEnvironmentMode:(int)mode;

+ (void)setupRPCAddress:(NSString*)address;

+ (BOOL)useURLWhitelist;

+ (BOOL)checkDeviceSystemVersion;

+ (void)setSecuritySDKConfig:(int)address;

+ (void)setRpcHeaderAppid:(NSString*)apid;

+ (NSString*)getRpcHeaderAppid;

+ (void)setRpcHeaderWorkspaceid:(NSString*)spaceid;

+ (NSString*)getRpcHeaderWorkspaceid;

@end
