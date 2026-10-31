//
//  APRiskFileUploadProtocol.h
//  APPSecuritySDKAdapter
//
//  Created by hongren on 2020/9/7.
//  Copyright © 2020 Alipay. All rights reserved.
//

@protocol APRiskFileUploadProtocol <NSObject>

@required
- (NSString *)uploadCustomFile:(NSString *)path;

@end
