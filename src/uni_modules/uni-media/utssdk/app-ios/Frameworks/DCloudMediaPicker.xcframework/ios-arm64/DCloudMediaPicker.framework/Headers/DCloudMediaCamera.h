//
//  DCloudCameraPhoto.h
//  DCloudMediaPicker
//
//  Created by dcloud on 2023/12/21.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface DCloudMediaCamera : NSObject
- (void)startCamera:(NSDictionary *)option success:(void (^)(NSDictionary *result))successBlock fail:(void (^)(NSNumber *code))failBlock;

@end

NS_ASSUME_NONNULL_END
