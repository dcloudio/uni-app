//
//  DTFCustomActivityIndicator.h
//  BioAuthEngine
//
//  Created by 汪澌哲 on 2024/1/16.
//  Copyright © 2024 Alipay. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface DTFCustomActivityIndicator : UIImageView
- (instancetype)initWithImage:(UIImage *)image frame:(CGRect)frame;
- (void)startAnimating;
- (void)stopAnimating;
- (BOOL)isAnimating;

@end

NS_ASSUME_NONNULL_END
