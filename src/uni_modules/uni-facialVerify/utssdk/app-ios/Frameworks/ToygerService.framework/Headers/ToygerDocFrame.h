//
//  ToygerDocFrame.h
//  Toyger
//
//  Created by 王伟伟 on 2018/1/25.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <ToygerService/ToygerFrame.h>

@interface ToygerDocFrame : ToygerFrame

/**
 是否有证件
 */
@property (nonatomic, assign) BOOL hasDoc;

/**
 证件是否完整
 */
@property (nonatomic, assign) BOOL isCompleted;

/**
 证件是否反光
 */
@property (nonatomic, assign) BOOL isReflected;

/**
 图像是否模糊
 */
@property (nonatomic, assign) BOOL isBlur;

/**
 是否为复印件
 */
@property (nonatomic, assign) BOOL isCopy;

@property(nonatomic, assign) float topScore;
@property(nonatomic, assign) float bottomScore;
@property(nonatomic, assign) float leftScore;
@property(nonatomic, assign) float rightScore;

@property(nonatomic, assign) BOOL topOK;
@property(nonatomic, assign) BOOL bottomOK;
@property(nonatomic, assign) BOOL leftOK;
@property(nonatomic, assign) BOOL rightOK;

@end
