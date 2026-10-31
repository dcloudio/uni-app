//
//  APRiskRPCProtocol.h
//  APPSecuritySDKAdapter
//
//  Created by hongren on 2020/9/7.
//  Copyright © 2020 Alipay. All rights reserved.
//

#import "APRiskReportRequest.h"
#import "APRiskReportResponse.h"
#import "APRiskRpcConfiguration.h"
#import "APRiskConfigReportRequest.h"
#import "APRiskConfigReportResponse.h"

@protocol APRiskRPCProtocol <NSObject>
//gateway

@required
- (APRiskReportResponse *)sendStaticRequest:(APRiskReportRequest *)data
                               config:(APRiskRpcConfiguration*)cfg;

@required
- (APRiskConfigReportResponse *)sendConfigReportRequest:(APRiskConfigReportRequest *)data
                               config:(APRiskRpcConfiguration*)cfg;

@required
- (BOOL)updateLog:(NSString*)log
           config:(APRiskRpcConfiguration*)cfg;

@end
