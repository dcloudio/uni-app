//
//  NSData+DTFJSON.h
//  DTFUtility
//
//  Created by mengbingchuan on 2024/7/10.
//  Copyright © 2024 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSData (DTFJSON)

- (NSDictionary *)dtf_jsonDictionaryError:(NSError **)error;

- (NSMutableDictionary *)dtf_jsonMutableDictionaryError:(NSError **)error;

@end

NS_ASSUME_NONNULL_END
