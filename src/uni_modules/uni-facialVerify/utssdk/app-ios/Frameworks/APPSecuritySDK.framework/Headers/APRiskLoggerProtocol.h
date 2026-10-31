//
//  APRiskLoggerProtocol.h
//  APPSecuritySDK-Common
//
//  Created by eric on 2021/6/25.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol APRiskLoggerProtocol <NSObject>

@required

-(void)print:(NSString *)format, ...NS_REQUIRES_NIL_TERMINATION;

@end

NS_ASSUME_NONNULL_END
