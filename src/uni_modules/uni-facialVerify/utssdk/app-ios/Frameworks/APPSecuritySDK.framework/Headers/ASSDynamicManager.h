//
//  ASSDynamicManager.h
//  APSecSecuritySDK
//
//  Created by msq on 2019/1/5.
//  Copyright © 2019 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APDynamicProtocol.h"

@interface ASSDynamicManager : NSObject<APDynamicProtocol>

+ (instancetype)sharedInstance;

- (void)dynamicCheckDispatch:(NSDictionary *)dict;

- (void)dynamicCheckDispatch:(NSDictionary *)dict withCallBack: (void(^)(Boolean, NSString *))callback;

- (void)dynamicCheckCustomLocal:(int)delay;

+ (NSData *)sendDynamicSynchronousRequest:(NSString *)url;

+ (void)uploadTimerCheckResult:(NSString *)data
                  dynamicTrace:(NSString*)trace
                    dynamicCmd:(int)cmd
                    dynamicNum:(int)num;

+ (NSString *)uploadCustomFile:(NSString *)path;

+ (void)recordError:(const char *)pos
         withAction:(const char *)action
            errCode:(int)code;

//+ (NSString *)processFeature;

@end
