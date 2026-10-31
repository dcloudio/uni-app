//
//  DTFMutableSetting.h
//  BioAuthEngine
//
//  Created by richard on 24/02/2018.
//  Copyright © 2018  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DTFMutableSetting : NSObject

+ (instancetype)getInstance;

- (NSString *)gatewayURL;

- (NSArray *)backupURL;

- (NSDictionary *)headConfig;

- (NSString *)DTFInitRequestOperationType;

- (NSString *)validateRequestOperationType;

- (NSString *)SMSVerifyRequestOperationType;

- (NSString *)SMSCodeRequestOperationType;

- (NSString *)zimOCRIdentifyRequestOperationType;

- (NSString *)bioAuthEngineVersion;

- (NSString *)onlinePubKey;

- (NSString *)testPubKey;


@end
