//
//  MPLogAdditions.h
//  MPRemoteLogging
//
//  Created by tashigaofei on 15/10/13.
//  Copyright © 2015年. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DTFLogAdditions : NSObject

/**
 *  UUID、UTDID、clientID、deviceModel，language，接入方无须重写，由mPaaS自动获取。
 */
@property (nonatomic, strong, readonly) NSString *UUID;
@property (nonatomic, strong, readonly) NSString *UTDID;
@property (nonatomic, strong, readonly) NSString *clientID;
@property (nonatomic, strong) NSString *deviceModel;
@property (nonatomic, strong) NSString *language;           // 默认实现为读取NSUserDefaults中kAPLanguageSettingKey。如果使用钱包或mPaaS多语言模块，该方法不需要重写

/**
 *  userID为可选参数，当前登录的用户，接入方在Category中覆盖实现。
 */
@property (nonatomic, strong) NSString *userID;

/**
 *  log日志服务器地址，默认返回@""，需要接入方在Category中覆盖。格式为https://mdap.xxxlog.com/loggw/log.do
 */
@property (nonatomic, strong) NSString *logServerURL;

/**
 *  log日志服务器配置地址，默认返回@""，需要接入方在Category中覆盖。格式为https://mdap.xxxlog.com/loggw/config.do
 *  一般只需要重写logServerURL即可，configServerURL系统会自动根据logServerURL进行修改。
 */
@property (nonatomic, strong) NSString *configServerURL;

/**
 *  客户端日志产品ID，默认返回[[NSBundle mainBundle] objectForInfoDictionaryKey:@"Product ID"]，如果不同需要接入方在Category中覆盖。
 */
@property (nonatomic, strong) NSString *platformID;

+ (instancetype)sharedInstance;

/**
 *  默认进行上传的日志类型。哪些类型的日志在什么网络下进行上传，是由服务端下发配置来设置。
 *  但当服务端配置不存在时，可以覆盖这个方法返回一定进行上传的日志类型。
 *  默认实现为返回 @[@(MPLogTypeBehavior), @(MPLogTypeCrash), @(MPLogTypeAuto), @(MPLogTypeMonitor), @(MPLogTypeKeyBizTrace)]
 *
 *  @return @[@(MPLogTypeXXX), @(MPLogTypeYYY)]数组。数组元素为NSNumber类型
 */
- (NSArray*)defaultUploadLogTypes;

/**
 *  输出诊断日志到本地日志文件，方便定位问题。
 *  该方法默认实现为空，由外部覆盖实现为指定日志方法。
 */
- (void)logToFile:(NSString*)logStr;

/**
 *  触发本地日志上传的最小条数，默认为40。
 *  即默认本地未上传的日志到达40条时，会自动触发上传，业务可根据需求修改
 */
- (NSInteger )numberOfSyncLogs;

@end
