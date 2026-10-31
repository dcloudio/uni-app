//
//  APBDTFUploadTostView.h
//  APBToygerFacade
//
//  Created by richard on 28/02/2018.
//  Copyright © 2018 DTF. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "DTFCustomActivityIndicator.h"
@interface APBDTFUploadToastView : UIView

@property(nonatomic,strong)UIActivityIndicatorView *indicator;

@property(nonatomic,strong)DTFCustomActivityIndicator *customActivityIndicator;

- (instancetype)initWithFrame:(CGRect)frame;

- (void)andSubViewWithFrame:(CGRect)frame AndText:(NSString *)text andStartY:(float)startY;
@end
