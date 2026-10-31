//
//  DTFOCRViewProtocol.h
//  BioAuthEngine
//
//  Created by jiangzhipeng on 2025/1/3.
//  Copyright © 2025 Alipay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import "DTFUICustom.h"


//当前认证进度
NS_ASSUME_NONNULL_BEGIN

@class DTFOCRVerifyResultDetailModel;
@protocol DTFOCRViewProtocol;

@protocol DTFOCRViewDelegate <NSObject>

@required
/// 进入拍照,准备拍照环境，开启session,handler回调会返回session的预览图层
/// - Parameters:
///   - ocrView: 调用view
///   - handler: 回调
- (void)ocrView:(UIView *)ocrView prepareCaptureWithHandler:(void(^)(AVCaptureVideoPreviewLayer *previewLayer))handler;

/// 退出拍摄
/// - Parameter ocrView: 调用View
- (void)ocrViewStopCapture:(UIView *)ocrView;

/// 拍照
/// - Parameters:
///   - ocrView: 调用view
///   - handler: 回调
- (void)ocrView:(UIView *)ocrView captureWithHandler:(void(^)(BOOL success, NSData *imageData))handler;

/// 选中采集到的照片进行OCR认证,info为认证结果
/// - Parameters:
///   - ocrView: 调用view
///   - isFront: 是否是正面认证
///   - rect: 裁剪区域
///   - handler: 回调。errorType：错误类型；errorMsg：错误信息，result：认证结果；captureImage：裁剪后的图片
- (void)ocrView:(UIView *)ocrView isFront:(BOOL)isFront cropRect:(CGRect)rect confirmImageWithHandler:(void(^)(NSString *verifyCode, DTFOCRVerifyResultDetailModel *result, UIImage *captureImage))handler;

/// - Parameters:
///   - ocrView: 调用view
///   - isFront: 是否是正面认证
///   - imageData:选择的图片
///   - handler: 回调。errorType：错误类型；errorMsg：错误信息，result：认证结果；captureImage：裁剪后的图片
- (void)ocrView:(UIView *)ocrView isFront:(BOOL)isFront data:(NSData*)imageData confirmImageWithHandler:(void (^)(NSString * , DTFOCRVerifyResultDetailModel * , UIImage * ))handler;

/// 切换闪光灯状态,回调为当前状态
/// - Parameters:
///   - ocrView: 调用View
///   - handler: 回调。newMode：闪光灯新状态
- (void)ocrView:(UIView *)ocrView switchFlashModeWithHandler:(void(^)(AVCaptureFlashMode newMode))handler;

/// 获取当前闪光灯状态,返回值：开关状态
/// - Parameter ocrView: 调用view
- (AVCaptureFlashMode)ocrViewCurrentFlashMode:(UIView *)ocrView;

/// 同步验证信息,用户可以修改身份证认证信息，返回值error:如果有错误，那么表示认证不通过
/// - Parameters:
///   - ocrView: 调用view
///   - name: 修改后的名字
///   - cerNO: 修改后的身份证号码
- (NSError *)ocrView:(UIView *)ocrView updateVerifyName:(NSString *)name cerNO:(NSString *)cerNO;

/// 结束认证
/// - Parameters:
///   - ocrView: 调用view
///   - isComplete: 是否完成，如手动退出则传NO
- (void)ocrView:(UIView *)ocrView verifyComplete:(BOOL)isComplete;

@end

@protocol DTFOCRViewProtocol <NSObject>

//delegate对象，这里在sdk内部会引用特定工具类
@property (nonatomic, weak) id<DTFOCRViewDelegate>delegate;
//弹窗管理对象
@property (nonatomic, strong) id<DTFUICustomProtocol> customProtocol;

@required
//返回提供给sdk的view对象
- (UIView *)view;

@end

NS_ASSUME_NONNULL_END
