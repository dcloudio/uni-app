//
//  DTFStringsManager.h
//  DTFUtility
//
//  Created by mengbingchuan on 2024/1/23.
//  Copyright © 2024 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

static NSString *const kBioAuthEngineBundleName = @"BioAuthEngine.bundle";

@interface DTFStringsUtils : NSObject

+ (NSString *)faceStringWithKey:(NSString *)key;
+ (NSString *)docStringWithKey:(NSString *)key;
+ (NSString *)guideStringWithKey:(NSString *)key;
+ (NSString *)getAbsolutePathWithBundle:(NSString *)bundleName class:(Class)cls fileName:(NSString *)fileName;

@end

NS_ASSUME_NONNULL_END
