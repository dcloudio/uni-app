//
//  UIImage+bioAuth.h
//  BioAuthEngine
//
//  Created by 王伟伟 on 2017/8/23.
//  Copyright © 2017年 DTF. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreMedia/CoreMedia.h>

@interface UIImage (bioAuth)

+ (nullable UIImage *)bioAuth_imageWithColor:(UIColor *_Nullable)color size:(CGSize)size;

#pragma mark - Resize -
- (nullable UIImage *)bioAuth_SubRect:(CGRect)r;
- (nullable UIImage *)bioAuth_GaussiamBlur;
+ (nullable UIImage *)bioAuth_imageWithCVPixelBuffer:(CVPixelBufferRef _Nullable )buffer;
+ (nullable UIImage *)bioAuth_imageWithCMSampleBuffer:(CMSampleBufferRef  _Nullable )samplebuffer;
- (nullable UIImage *)bioAuth_imageByResizeToSize:(CGSize)size contentMode:(UIViewContentMode)contentMode;
@end
