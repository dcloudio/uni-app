//
//  DCloudAlbum.h
//  DCloudMediaPicker
//
//  Created by dcloud on 2023/12/29.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DCloudMediaAlbum : NSObject
- (void)startAlbum:(NSDictionary *)option success:(void (^)(NSDictionary *result))successBlock fail:(void (^)(NSNumber *code))failBlock;
@end

NS_ASSUME_NONNULL_END
