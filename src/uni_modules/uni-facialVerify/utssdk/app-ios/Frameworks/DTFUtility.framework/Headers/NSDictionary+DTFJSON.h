//
//  NSDictionary+DTFJSON.h
//  DTFUtility
//
//  Created by mengbingchuan on 2024/7/15.
//  Copyright © 2024 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSDictionary (DTFJSON)

- (NSString *)dtf_jsonStringError:(NSError **)error;
- (NSData *)dtf_jsonDataError:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
