//
//  DTFColorModel.h
//  BioAuthEngine
//
//  Created by 汪澌哲 on 2024/1/23.
//  Copyright © 2024 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DTFColorModel : NSObject
@property (nonatomic, strong) UIColor *titleColor;
@property (nonatomic, strong) UIColor *msgColor;
@property (nonatomic, strong) UIColor *cancelColor;
@property (nonatomic, strong) UIColor *confirmColor;
@property (nonatomic, strong) UIColor *cancelBGColor;
@property (nonatomic, strong) UIColor *confirmBGColor;

@end

NS_ASSUME_NONNULL_END
