//
//  APFViewController.h
//  APFaceDetectBiz
//
//  Created by 晗羽 on 8/25/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <ToygerService/ToygerService.h>
#import <BioAuthEngine/DTFFaceViewProtocol.h>
#import <BioAuthEngine/DTFBaseViewController.h>

@interface APBToygerViewController : DTFBaseViewController

@property(nonatomic, strong) id<DTFFaceViewProtocol> faceView;

- (void)startFaceRecognition:(AVCaptureVideoPreviewLayer *)layer;

- (void)handleFaceStateChange:(ToygerMessage)state
                    stateTips:(NSString *)tips
              actionGuideType:(ToygerStaticMessage)guideType
                  actionGuide:(NSString *)guide
                     progress:(CGFloat)progress
                      extInfo:(NSDictionary *)extInfo;

- (void)faceDectectComplete;
- (void)setPhotinusColor:(UIColor *)color;
- (void)showBlur:(UIImage *)image;

@end
