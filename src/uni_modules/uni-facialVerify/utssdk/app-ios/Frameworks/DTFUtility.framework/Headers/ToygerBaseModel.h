//
//  ToygerBaseObject.h
//  Toyger
//
//  Created by 王伟伟 on 2018/1/25.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ToygerBaseModel : NSObject

+ (instancetype)defaultModel;

+ (instancetype)model:(id)dict;

- (NSMutableDictionary *)dictionary;

- (void)copyFromModel:(ToygerBaseModel *)model;

@end
