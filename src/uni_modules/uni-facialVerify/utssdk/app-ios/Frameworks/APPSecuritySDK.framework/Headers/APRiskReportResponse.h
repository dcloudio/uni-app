//
//  APRiskReportResponse.h
//  APPSecuritySDK
//
//  Created by hongren on 2020/9/7.
//  Copyright © 2020 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface APRiskReportResponse : NSObject

/**
 * success or not
 */

        @property(nonatomic, assign) BOOL success;
    /**
 * result code
 */

        @property(nonatomic, strong) NSString *resultCode;

/**
* device id
*/

       @property(nonatomic, strong) NSString *apdid;
           /**
* apdid token
*/

       @property(nonatomic, strong) NSString *token;
           /**
* current apdid time (create time)
*/

       @property(nonatomic, strong) NSString *currentTime;
           /**
* rpc version
*/

       @property(nonatomic, strong) NSString *version;
           /**
* switch for vkey
*/

       @property(nonatomic, strong) NSString *vkeySwitch;
           /**
* switch for BugTrack
*/

       @property(nonatomic, strong) NSString *bugTrackSwitch;
           /**
* version for applist cmd
*/

       @property(nonatomic, strong) NSString *appListVer;

       @property(nonatomic, strong) NSString *dynamicKey;

       @property(nonatomic, strong) NSDictionary *resultData;
                + (Class)resultDataElementClass;
           
@end
