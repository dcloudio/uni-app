//
//  APRiskReportRequest.h
//  APPSecuritySDK
//
//  Created by hongren on 2020/9/7.
//  Copyright © 2020 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface APRiskReportRequest : NSObject

/**
* os type: android|ios"
*/

       @property(nonatomic, strong) NSString *os;
           /**
* device id for ios for static report, or device id for dynamic report both for ios and android
*/

       @property(nonatomic, strong) NSString *apdid;
           /**
* public region device id for android for static report
*/

       @property(nonatomic, strong) NSString *pubApdid;
           /**
* private region device id for android for static report
*/

       @property(nonatomic, strong) NSString *priApdid;
           /**
* apdid token
*/

       @property(nonatomic, strong) NSString *token;
           /**
* umid token
*/

       @property(nonatomic, strong) NSString *umidToken;
           /**
* rpc version
*/

       @property(nonatomic, strong) NSString *version;
           /**
* last apdid time (create time)
*/

       @property(nonatomic, strong) NSString *lastTime;

       /**
        * dynamicKey
        */
       @property(nonatomic,strong) NSString* dynamicKey;
           /**
* device info map
*/

       @property(nonatomic, strong) NSDictionary *dataMap;
               + (Class)dataMapElementClass;

       @property(nonatomic,strong) NSDictionary *bizData;
               + (Class)bizDataElementClass;

@end
