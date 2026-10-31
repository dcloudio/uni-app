//
//  DTFNearFarFaceView.h
//  BioAuthEngine
//
//  Created by mengbingchuan on 2024/9/4.
//  Copyright © 2024 Alipay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DTFFaceViewProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface DTFNearFarFaceView : UIView<DTFFaceViewProtocol>

- (instancetype)initWithFrame:(CGRect)frame cameraPreviewSize:(CGSize)cameraPreviewSize;

@end

NS_ASSUME_NONNULL_END
