//
//  AFEUploadView.h
//  FaceEyePrint
//
//  Created by yukun.tyk on 12/14/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <UIKit/UIKit.h>
//


@interface AFEUploadView : UIView


@property (strong, nonatomic) UILabel *label;
@property (strong, nonatomic) UIView *backgroundView;
@property (strong, nonatomic) UIImageView *backgroundImageView;


- (void)beginUploading;
- (void)stopUploading;
- (void)setBackgroundImage:(UIImage *)img;

@end
