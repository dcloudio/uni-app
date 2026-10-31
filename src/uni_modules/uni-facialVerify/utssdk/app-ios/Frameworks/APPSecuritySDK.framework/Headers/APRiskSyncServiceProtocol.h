//
//  APRiskSyncServiceProtocol.h
//  APPSecuritySDK
//
//  Created by eric on 2020/10/15.
//  Copyright © 2020 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APRiskSyncHandlerProtocol.h"

NS_ASSUME_NONNULL_BEGIN

static NSString* const kEdgeBizTypeGlobal = @"EDGE-GLOBAL";
static NSString* const kEdgeBizTypeSingle = @"EDGE-SINGLE";
static NSString* const kEdgeBizTypeUid = @"EDGE-SINGLE-USER";
static NSString* const kEdgeBizTypeSyncDegradeToConfig = @"EDGE-SYNC-DEGRADE-TO-CONFIG";

@protocol APRiskSyncServiceProtocol <NSObject>

@required

-(void) registerHandler:(id<APRiskSyncHandlerProtocol>)handler;
-(void) registerSyncBiz;

@end

NS_ASSUME_NONNULL_END
