//
//  NSTimer+bioAuth.h
//  BioAuthEngine
//
//  Created by 王伟伟 on 2017/8/23.
//  Copyright © 2017年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSTimer (bioAuth)

@property(nonatomic, strong)NSNumber *remained;
@property(nonatomic, strong)NSNumber *paused;

- (void)pause;
- (void)resume;

@end
