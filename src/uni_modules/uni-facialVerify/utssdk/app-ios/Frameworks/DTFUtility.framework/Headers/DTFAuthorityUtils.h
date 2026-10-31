//
//  DTFAuthorityUtils.h
//  DTFUtility
//
//  Created by 程佳兵(威琦) on 2025/5/21.
//  Copyright © 2025 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <Photos/PHPhotoLibrary.h>

NS_ASSUME_NONNULL_BEGIN

@interface DTFAuthorityUtils : NSObject

/// 请求相册权限
+ (void)checkAlbumAuthorityGranted:(void (^)(void))grantedBlock notPermission:(void (^)(void))notPermissionBlock;

///获取当前相册权限
+ (PHAuthorizationStatus)getCurrenAlbmAuthorityStatus;

///获取当前拍摄权限
+ (AVAuthorizationStatus)getCurrentVideoMediaTypeoStatus;

/// 请求 拍摄权限
+ (void)requestAccessForVideoMediaType:(void (^)(void))grantedBlock notPermission:(void (^)(void))notPermissionBlock;

@end

NS_ASSUME_NONNULL_END
