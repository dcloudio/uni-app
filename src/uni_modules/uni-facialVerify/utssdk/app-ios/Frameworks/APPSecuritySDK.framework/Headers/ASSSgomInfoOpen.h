//
//  ASSSgomInfoOpen.h
//  APPSecuritySDK
//
//  Created by hongren on 2021/8/16.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
* 感知结果类。
*/
@interface ASSSgomResult: NSObject

@property (nonatomic) NSInteger resCode;
@property (nonatomic, strong) NSString* resInfo;

@end


@interface ASSSgomInfoOpen : NSObject

+ (instancetype)sharedInstance;

- (ASSSgomResult*)updateSgomInfo:(int) userAction
                            ext:(NSDictionary*) extParams;

@end
