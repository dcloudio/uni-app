//
//  KTVHCDataResponse.h
//  KTVHTTPCache
//
//  Created by Single on 2017/8/24.
//  Copyright © 2017年 Single. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <KTVHTTPCache/KTVHCRange.h>

@interface KTVHCDataResponse : NSObject

+ (instancetype)new NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;

@property (nonatomic, copy, readonly) NSURL *URL;
@property (nonatomic, copy, readonly) NSDictionary *headers;
@property (nonatomic, copy, readonly) NSString *contentType;
@property (nonatomic, copy, readonly) NSString *contentRangeString;
@property (nonatomic, readonly) KTVHCRange contentRange;
@property (nonatomic, readonly) long long contentLength;
@property (nonatomic, readonly) long long totalLength;

@end
