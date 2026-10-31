//
//  DTFUIElementManager.h
//  BioAuthEngine
//
//  Created by richard on 08/08/2017.
//  Copyright © 2017 DTF. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface DTFUIElementManager : NSObject

+ (UIView *)generateUIViewWithFrame:(CGRect)frame andBackGroundColor:(UIColor *)backGroundColor andAlpha:(float)alpha;

+ (UILabel *)generateUIlabelWithFrame:(CGRect)frame andColor:(UIColor *)color andFont:(UIFont*)font andAlpha:(float)alpha andBackGroundColor:(UIColor *)backGroundColor andLineBreakMode:(NSLineBreakMode)breakMode andAlignment:(NSTextAlignment) alignment;

+ (UIImageView *)generateUIImageViewWithFrame:(CGRect)frame andImageName:(NSString *)imageName andContentMode:(UIViewContentMode)contentMode;

+ (UIImage *)generateUIImageWithName:(NSString *)imageName;

@end
