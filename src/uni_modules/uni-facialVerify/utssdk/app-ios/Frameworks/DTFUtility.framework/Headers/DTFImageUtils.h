//
//  DTFImageUtils.h
//  DTFUtility
//
//  Created by 程佳兵(威琦) on 2025/5/21.
//  Copyright © 2025 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef enum : NSUInteger {
    DTFImageSourceCamera,
    DTFImageSourcePhoto
} DTFImageSource;

@interface DTFImageUtils : NSObject
/// 图片压缩
+ (NSData *)compressImage:(UIImage *)image toByte:(NSUInteger)maxLength;

/// 图片裁剪
+ (UIImage *)cropedImageData:(CGRect)cropRect data:(UIImage *)image;

@end

NS_ASSUME_NONNULL_END
