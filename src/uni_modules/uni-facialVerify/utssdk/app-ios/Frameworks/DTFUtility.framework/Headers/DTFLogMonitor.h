//
//  DTFLogMonitor.h
//  BioAuthEngine
//
//  Created by richard on 22/03/2018.
//  Copyright © 2018  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>


static NSString *kPrivateUCID = @"UC-YWRLSB-160425-02";
static NSString *kPrivateSeedId = @"techSeed";


@interface DTFLogMonitor : NSObject

+(instancetype)getInstance;

+ (void)setSDKVersion:(NSString *)version;

+ (void)setUploadBlock:(void (^) (NSDictionary *,void (^)(BOOL)))block;

- (void)addPublicLog:(NSDictionary *)logDic;
- (void)setupBaseExtInfo;

- (void)addDebugMonitorLogWithSeedId:(NSString *)seedId
                            extParam:(NSDictionary *)extParam;

- (void)addMonitorLogWithSeedId:(NSString *)seedId
                       extParam:(NSDictionary *)extParam;

- (void)addMonitorLogWithSeedId:(NSString *)seedId
                           ucId:(NSString *)ucId
                       extParam:(NSDictionary *)extParam;

- (void)addMonitorLogWithSeedId:(NSString *)seedId
                          param:(NSString *)param
                       extParam:(NSDictionary *)extParam;
// param: 可搜索
- (void)addMonitorLogWithSeedId:(NSString *)seedId
                           ucId:(NSString *)ucId
                          param:(NSString *)param
                       extParam:(NSDictionary *)extParam;


+(NSDictionary *)getPublicLogDic:(NSDictionary *)publicParam;

+(NSDictionary *)getExtLogDic:(NSDictionary *)p4;

+ (void)distantUploadlog;

@end
