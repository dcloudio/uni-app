//
//  KTVHCDataCacheItemZone.h
//  KTVHTTPCache
//
//  Created by Single on 2017/8/13.
//  Copyright © 2017年 Single. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KTVHCDataCacheItemZone : NSObject

+ (instancetype)new NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;

@property (nonatomic, readonly) long long offset;
@property (nonatomic, readonly) long long length;

@end
