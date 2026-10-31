//
//  Code.h
//  deviceiOS
//
//  Created by Lingxuan on 2022/7/26.
//  Copyright © 2022 security.net. All rights reserved.
//

#ifndef Code_h
#define Code_h

#define SC_CODE_BASE                10000

/**
 * 成功，无错误发生
 */
#define SC_SUCCESS                  (SC_CODE_BASE)

/**
 * SDK未调用初始化
 */
#define SC_NOT_INIT                 (SC_CODE_BASE + 1)

/**
 * SDK需要的Android基础权限未完全授权
 */
#define SC_NOT_PERMISSION           (SC_CODE_BASE + 2)

/**
 * 未知错误
 */
#define SC_UNKNOWN_ERROR            (SC_CODE_BASE + 3)

/**
 * 网络错误
 */
#define SC_NETWORK_ERROR            (SC_CODE_BASE + 4)

/**
 * 网络错误，返回内容为空串
 */
#define SC_NETWORK_ERROR_EMPTY      (SC_CODE_BASE + 5)

/**
 * 网络返回的格式非法
 */
#define SC_NETWORK_ERROR_INVALID    (SC_CODE_BASE + 6)

/**
 * 服务端配置解析失败
 */
#define SC_PARSE_SRV_CFG_ERROR      (SC_CODE_BASE + 7)

/**
 * 内部初始化未完成
 */
#define SC_BUSY                     (SC_CODE_BASE + 8)

/**
 * 用户传进来的appkey是空的
 */
#define SC_APPKEY_EMPTY             (SC_CODE_BASE + 9)

/**
 *  参数错误
 */
#define SC_PARAMS_ERROR             (SC_CODE_BASE + 10)

#endif /* Code_h */
