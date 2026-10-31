//
//  APRiskSyncHandlerProtocol.h
//  APPSecuritySDK
//
//  Created by eric on 2020/10/15.
//  Copyright © 2020 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol APRiskSyncHandlerProtocol <NSObject>

@required

-(void) handleWithBizType: (NSString *) bizType andData: (NSString *) data;

@end

NS_ASSUME_NONNULL_END
