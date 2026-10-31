//
//  DTFServerError.h
//  DTFUtility
//
//  Created by mengbingchuan on 2023/7/27.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

static NSString *const DTFServerEmptyDataError = @"DTFServerErrorEmptyData";
static NSString *const DTFServerOSSError = @"DTFServerOSSError";

@interface DTFServerError : NSError

@property(nonatomic, copy) NSString *retCode;
@property(nonatomic, copy) NSString *retcodeSub;
@property(nonatomic, copy) NSString *reason;
@property(nonatomic, copy) NSString *comment;

+ (instancetype)errorWithReason:(NSString *)reason comment:(nullable NSString *)comment;

+ (instancetype)errorWithRetCode:(NSString *)code;

+ (instancetype)errorWithRetCodeSub:(NSString *)code;

@end

NS_ASSUME_NONNULL_END
