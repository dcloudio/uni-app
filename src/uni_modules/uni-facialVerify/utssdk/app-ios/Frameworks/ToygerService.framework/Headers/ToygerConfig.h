//
//  ToygerConfig.h
//  ToygerAlgorithm
//
//  Created by 王伟伟 on 2018/1/22.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ToygerConfig : NSObject

- (instancetype)initWithConfig:(NSDictionary *)configDict;

@end

@interface ToygerDocConfig : NSObject

@property(nonatomic, assign) int thickness;

@property(nonatomic, assign) CGRect frame;

@property(nonatomic, assign) float boundaryThreshold;

@property(nonatomic, assign) int stackTime;

@end
