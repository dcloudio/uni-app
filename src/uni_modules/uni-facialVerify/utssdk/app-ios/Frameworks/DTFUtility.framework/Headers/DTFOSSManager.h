//
//  DTFOSSManager.h
//  DTFUtility
//
//  Created by mengbingchuan on 2024/6/25.
//  Copyright © 2024 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ToygerData.h"

#define kDTFOSSFileNameKey @"fileName"
#define kDTFOSSFileDataKey @"fileData"

NS_ASSUME_NONNULL_BEGIN

@interface DTFOSSManager : NSObject

+ (NSDictionary * )buildUploadData:(NSData *)data fileName:(NSString *)fileName fileNamePrefix:(NSString *)fileNamePrefix fileType:(NSString *)fileType;

+ (void)uploadWithParams:(NSDictionary *)params completionBlock:(void (^)(NSError *error, NSDictionary *result))blk;

@end

NS_ASSUME_NONNULL_END
