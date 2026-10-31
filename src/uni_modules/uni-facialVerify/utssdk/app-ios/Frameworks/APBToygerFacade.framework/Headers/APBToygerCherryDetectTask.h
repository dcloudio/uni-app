//
//  APFCherryDetectTask.h
//  APBToygerFacade
//
//  Created by richard on 01/02/2018.
//  Copyright © 2018 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <BioAuthEngine/AFEStatusBar.h>
#import <APBToygerFacade/APBToygerBaseTask.h>
#import <BioAuthEngine/BioAuthEngine.h>
#import <DTFUtility/CameraService.h>

#define kFaceCameraPreviewWidth 480
#define kFaceCameraPreviewHeight 640
#define kFaceAVCaptureSessionPreset AVCaptureSessionPreset640x480

@interface APBToygerCherryDetectTask : APBToygerBaseTask <DTFCameraServiceDelegate, DTFFaceViewDelegate, ToygerServiceInstanceDelegate>

@property (nonatomic, assign) BOOL photinusFlags;
@property (nonatomic, strong) DTFCameraService *cameraService;
@property (nonatomic, strong) id instance;   //Toyger对象
@property (nonatomic, assign) BOOL useNativePhotinus;

- (void)onButtonCancel;

@end
