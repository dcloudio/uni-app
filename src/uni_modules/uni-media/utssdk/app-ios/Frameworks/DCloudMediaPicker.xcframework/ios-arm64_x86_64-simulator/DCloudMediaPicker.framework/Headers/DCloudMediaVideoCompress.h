//
//  DCloudMediaVideoCompress.h
//  DCloudMediaPicker
//
//  Created by wangzhitong on 2024/5/17.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
NS_ASSUME_NONNULL_BEGIN

@interface DCloudMediaVideoCompress : NSObject
+ (NSDictionary * _Nullable)getVideoInfo:(NSURL *)videoUrl;
+ (UIImage *)getFirstFrameFromVideoAsset:(AVURLAsset *)asset;
+ (UIImage *)getFirstFrameFromVideoUrl:(NSURL *)videoURL;
+ (void)compressVideoWithVideoUrl:(NSURL *)videoUrl outputPath:(NSString *)outputPath compressComplete:(void(^)(NSDictionary *responseObjc))compressComplete;
+ (void)compressVideoWithVideoUrl:(NSURL *)videoUrl outputPath:(NSString *)outputPath withBiteRate:(NSNumber * _Nullable)outputBiteRate withFrameRate:(NSNumber * _Nullable)outputFrameRate withVideoWidth:(NSNumber * _Nullable)outputWidth withVideoHeight:(NSNumber * _Nullable)outputHeight compressComplete:(void(^)(NSDictionary *responseObjc))compressComplete;
@end

NS_ASSUME_NONNULL_END
