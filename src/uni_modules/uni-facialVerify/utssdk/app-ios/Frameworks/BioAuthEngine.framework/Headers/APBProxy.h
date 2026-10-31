//
//  APBProxy.h
//  BioAuthEngine
//
//  Created by shouyi.www on 2017/3/29.
//  Copyright © 2017年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface APBProxy : NSProxy

/**
 The proxy target.
 */
@property (nonatomic, weak, readonly) id target;

/**
 Creates a new weak proxy for target.

 @param target Target object.

 @return A new proxy object.
 */
- (instancetype)initWithTarget:(id)target;

/**
 Creates a new weak proxy for target.

 @param target Target object.

 @return A new proxy object.
 */
+ (instancetype)proxyWithTarget:(id)target;

@end
