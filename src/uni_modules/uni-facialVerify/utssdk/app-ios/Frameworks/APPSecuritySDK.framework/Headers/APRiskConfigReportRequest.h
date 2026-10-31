//
//  APRiskConfigReportRequest.h
//  APPSecuritySDK-Common
//
//  Created by eric on 2021/8/16.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface APRiskConfigReportRequest : NSObject

@property(nonatomic, strong) NSString* os;
@property(nonatomic, strong) NSString* apdid;
@property(nonatomic, strong) NSDictionary* deviceDataMap;

@end

NS_ASSUME_NONNULL_END
