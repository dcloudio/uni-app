//
//  APRiskConfigServiceProtocol.h
//  APPSecuritySDKAdapter
//
//  Created by hongren on 2020/9/7.
//  Copyright © 2020 Alipay. All rights reserved.
//
#import "APRiskSyncHandlerProtocol.h"

@protocol APRiskConfigServiceProtocol <NSObject>

@required
- (NSString *)stringValueForKey:(NSString *)key;

- (void)addConfigChangeListener:(id<APRiskSyncHandlerProtocol>)handler forKey:(NSString *)key;

- (void)refreshConfig:(NSDictionary *)tConfigMap from:(NSString *)sourceType;

@end

