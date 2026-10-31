//
//  APFUploadWaveView.h
//  selfieFaceInfo
//
//  Created by 晗羽 on 11/3/16.
//  Copyright © 2016 com.antworshop7. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

@interface DTFUploadWaveLayer : CALayer

- (void)setMaskImage:(UIImage *)image;
- (void)startWave;
- (void)stopWave;

@end
