//
//  DCloudMediaImageCompress.h
//  DCloudMediaPicker
//
//  Created by wangzhitong on 2024/6/4.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DCloudMediaImageCompress : NSObject
- (void)compressImage:(NSDictionary *)options success:(void (^)(NSDictionary *result))successBlock fail:(void (^)(NSNumber *code))failBlock;
@end

NS_ASSUME_NONNULL_END
