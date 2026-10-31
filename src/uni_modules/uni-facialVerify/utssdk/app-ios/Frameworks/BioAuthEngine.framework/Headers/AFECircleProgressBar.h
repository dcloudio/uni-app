//
//  AFECircleProgressBar.h
//  CircularView
//
//  Created by shouyi.www on 2017/6/26.
//  Copyright © 2017年 shouyi.www. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

@interface AFECircleProgressBar : CALayer

@property (nonatomic, assign) BOOL clockWise;
@property (nonatomic, assign) CGFloat animateTime;
@property (nonatomic, assign) CGFloat endAngle;
@property (nonatomic, assign) CGFloat progressBarWidth;
@property (nonatomic, assign) CGFloat maxValue;
@property (nonatomic, assign) CGFloat minValue;
@property (nonatomic, assign) CGFloat startAngle;
@property (nonatomic, copy) NSArray<NSNumber *> *gradientLocation;
@property (nonatomic, strong) NSMutableArray<UIColor *> *gradientColors;
@property (nonatomic, assign) CGFloat progress;
@property (nonatomic, strong) UIColor *progressBarTrackColor;
@property (nonatomic, assign) BOOL supportCustomUI;

- (void)setProgress:(CGFloat)percent animation:(BOOL)animated;
- (void)_updateCircularPath;
- (void)stopAnimation;

@end

