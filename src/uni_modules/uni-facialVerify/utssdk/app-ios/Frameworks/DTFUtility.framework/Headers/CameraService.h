//
//  CameraService.h
//  DTFCameraService
//
//  Created by Tommy Li on 2017/8/23.
//  Copyright © 2017年 EyeVerify. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "DTFChameleonUtilsModel.h"
#if defined(__cplusplus)
    #define DTF_EXPORT extern "C"
#else
    #define DTF_EXPORT extern
#endif


/// NSString keys that are used to specify configuration in DTFCameraService initialization.
typedef NSString* const DTFCameraInitKey;

/// NSString keys that are used to change configurations of DTFCameraService;
typedef NSString* const DTFCameraConfigKey;

/**
 Funtion type signature that is used for -takePicture: callbacks after a still image is captured.
 
 @param imageDataSampleBuffer The sample buffer of the still image. It is nil if any error occurred.
 @param error NSError that indicates any error during the capture process. It is nil if no error occurred.
 */
typedef void(^DTFCameraTakePhotoCompletion)(CMSampleBufferRef imageDataSampleBuffer, NSError *error);

/// Initialization Key for specifying device position during initialization. Associated value must be a AVCaptureDevicePosition.
DTF_EXPORT DTFCameraInitKey DTFCameraInitKeyCaptureDevicePosition;

/// Initialization Key for specifying quality preset during initialization. Associated value must be a AVCaptureSessionPreset.
DTF_EXPORT DTFCameraInitKey DTFCameraInitKeySessionPreset;

/// Initialization Key for specifying video orientation during initialization. Associated value must be a AVCaptureVideoOrientation.
DTF_EXPORT DTFCameraInitKey DTFCameraInitKeyVideoOutputOrientation;

/// Initialization Key for specifying video mode during initialization. Associated value must be a DTFCameraMode
DTF_EXPORT DTFCameraInitKey DTFCameraInitKeyMode;

/**
 Configuration Key for specifying focus point of interest. Associated value must be a CGPoint (converted to an NSString).
 
 Note that the associated value will be directly applied to camera without transformations, so regarding valid inputs please review focusPointOfInterest of AVCaptureDevice;
 */
DTF_EXPORT DTFCameraConfigKey DTFCameraConfigKeyFocusPointOfInterest;

/// Error domain name for DTFCameraService
DTF_EXPORT NSString *const kDTFCameraErrorDomain;


/// Error codes used by DTFCameraService to indicate the type of errors occured.
typedef NS_ENUM(NSInteger, DTFCameraErrorCode) {
    
    /// Error code indicates that an invalid preset string is given during initialization.
    DTFCameraUnsupportedPreset,
    
    /// Error code indicates that no devices are available with the specified configuration.
    DTFCameraNotAvailable,
    
    /// Error code indicates that the capture session has failed.
    DTFCameraSessionFailure,
};

/// Modes that DTFCameraService supports
typedef NS_ENUM(NSInteger, DTFCameraMode) {
    
    /// Video
    DTFCameraModeVideo,
    
    /// Still Image
    DTFCameraModeStillImage
    
};


/**
 A structure that stores camera configuration for associated camera service
 */
typedef struct camera_configuration_t{
    /// Focus Point of Interest
    CGPoint focusPointOfInterest;
}camera_configuration;


/**
 Delegate to comply in order to receive camera output.
 */
@protocol DTFCameraServiceDelegate <NSObject>

@optional
/**
 This function will be called by DTFCameraService to pass capture device output to the delegate.
 
 Implement this optional function and call -setDelegate: if you have set DTFCameraModeVideo and wish to receive output.

 @param captureOutput Output source that triggered this delegation.
 @param sampleBuffer A CMSampleBuffer output from said output source.
 @param connection The AVCaptureConnection related to the output.
 */
- (void)cameraControllerCaptureOutput:(AVCaptureOutput *)captureOutput
                didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
                       fromConnection:(AVCaptureConnection *)connection;

@end

/**
 Main interface of DTFCameraService.
 */
@interface DTFCameraService : NSObject <AVCaptureVideoDataOutputSampleBufferDelegate>

/// Property that allows inspections the current configuration of DTFCameraService
@property(nonatomic, assign, readonly)camera_configuration configuration;

/// Preview layer of the capture session. Add this layer as a sublayer to a view to inspect the device output. 
@property(nonatomic, strong) AVCaptureVideoPreviewLayer *previewLayer;

/// Get current video output size
@property (nonatomic, assign, readonly) CGSize videoOutputSize;

@property (nonatomic, assign) BOOL isCameraStop;

/**
 Do not use default NSObject initializer. Use initWithConfig:error: instead.
 */
- (instancetype)init NS_UNAVAILABLE;

/**
 Initialize the camera service. 
 
 If DTFCameraInitKeyCaptureDevicePosition is not specified in config, AVCaptureDevicePositionFront will be used as camera position.
 
 If DTFCameraInitKeySessionPreset is not specified in config, AVCaptureSessionPresetHigh will be used as quality preset.
 
 If DTFCameraInitKeyVideoOutputOrientation is not specified in config, output orientation will not be set. Video will be AVCaptureVideoOrientationLandscapeRight, and StillImage will be AVCaptureVideoOrientationPortrait.
 
 If DTFCameraInitKeyMode is not specified in config, DTFCameraModeVideo will be used as video output.

 @param config An NSDictionary that contains configuration keys and associated values to specify initialization requirements.
 @param errPtr An optional error receiver for initialization failures. Use nil if error information is not needed.
 @return If initialization is successful, a instance of DTFCameraService is returned. Anything failture during initialization would cause this initialzer to return nil.
 */
- (instancetype)initWithConfig:(NSDictionary *)config error:(NSError **)errPtr;

/**
 Set delegate that DTFCameraService can service

 @param delegate An instance of class that implements DTFCameraServiceDelegate
 */
- (void)setDelegate:(id<DTFCameraServiceDelegate>) delegate;

/**
 Change one configuration value in camera_configuration.

 @param key Configuration key
 @param value Properly formatted in-range value as a string
 @return YES if configuration was successfully changed. NO otherwise.
 */
- (BOOL)changeConfiguration:(NSString *)key
               desiredValue:(NSString *)value;

- (BOOL)setWhiteBalanceMode:(AVCaptureWhiteBalanceMode)mode;

- (BOOL)setExposureMode:(AVCaptureExposureMode)mode;

- (void)setWhiteBalanceParam:(DTFChameleonUtilsModel *)cameraParam completionHandler:(void (^ _Nullable)(NSError *error))handler;

- (void)resetVideoZoom;

/**
 Start the capture session.
 
 The capture session needs to be started manually. This is a synchronous operation.
 */
- (void)startCameraCompletion:(void (^)(void))completionBlock;

/**
 Stop the capture session.
 
 This is a synchronous operation.
 */
- (void)stopCamera;

/**
 Capture a still image asynchronously.
 
 @param completion Completion delegate when the capture process finishes. For required parameters see DTFCameraTakePhotoCompletion.
 */
- (void)takePicture:(DTFCameraTakePhotoCompletion)completion;

//切换闪光灯状态
- (void)flashOff;

- (void)flashOn;
@end
