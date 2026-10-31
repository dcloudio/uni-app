//
//  APRiskRemoteLoggerProtocol.h
//  APPSecuritySDKAdapter
//
//  Created by hongren on 2020/9/7.
//  Copyright © 2020 Alipay. All rights reserved.
//

@protocol APRiskRemoteLoggerProtocol <NSObject>

@required
- (void)writeLogWithActionId:(NSString *)event
                   extParams:(NSArray *)args
                       appId:(NSString *)appId
                        seed:(NSString *)seed
                        ucId:(NSString *)ucId;

@required
- (void)writeLogWithActionId:(NSString *)event
                   extParams:(NSArray *)args
                       appId:(NSString *)appId
                        seed:(NSString *)seed
                        ucId:(NSString *)ucId
                     bizType:(NSString *)bizType;

@required
- (void)writeEventLog:(NSDictionary *)dict;

@end
