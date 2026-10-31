//
//  SecuritySession.h
//  deviceiOS
//
//  Created by Lingxuan on 2023/6/27.
//  Copyright © 2023 security.net. All rights reserved.
//

#ifndef FaceGuardSession_h
#define FaceGuardSession_h

/**
 * 设备指纹deviceToken
 */

@interface FaceGuardSession : NSObject

/**
 * 获取Session操作的结果
 */
@property(atomic) int code;

/**
 * 包含Session结果的字符串
 */
@property(copy, atomic) NSString *session;

@end

@interface FaceGuardToken : NSObject

/**
 * 获取Session操作的结果
 */
@property(atomic) int code;

/**
 * 包含token结果的字符串
 */
@property(copy, atomic) NSString *token;

@end

@interface FaceGuardSessionId : NSObject

/**
 * 获取SessionID操作的结果
 */
@property(atomic) int code;

/**
 * 包含Session结果的字符串
 */
@property(copy, atomic) NSString *sessionId;

@end
#endif /* FaceGuardSession_h */
