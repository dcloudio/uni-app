//
//  KTVHCError.h
//  KTVHTTPCache
//
//  Created by Single on 2017/8/17.
//  Copyright © 2017年 Single. All rights reserved.
//

#import <Foundation/Foundation.h>

#if defined(__cplusplus)
#define KTVHTTPCACHE_EXTERN extern "C"
#else
#define KTVHTTPCACHE_EXTERN extern
#endif

KTVHTTPCACHE_EXTERN NSString * const KTVHCErrorUserInfoKeyURL;
KTVHTTPCACHE_EXTERN NSString * const KTVHCErrorUserInfoKeyRequest;
KTVHTTPCACHE_EXTERN NSString * const KTVHCErrorUserInfoKeyResponse;

typedef NS_ENUM(NSInteger, KTVHCErrorCode) {
    KTVHCErrorCodeException             = -192700,
    KTVHCErrorCodeNotEnoughDiskSpace    = -192701,
    KTVHCErrorCodeResponseClass         = -192702,
    KTVHCErrorCodeResponseStatusCode    = -192703,
    KTVHCErrorCodeResponseContentType   = -192704,
    KTVHCErrorCodeResponseContentLength = -192705,
};

@interface KTVHCError : NSObject

+ (NSError *)errorForException:(NSException *)exception;

+ (NSError *)errorForNotEnoughDiskSpace:(long long)totlaContentLength
                                request:(long long)currentContentLength
                       totalCacheLength:(long long)totalCacheLength
                         maxCacheLength:(long long)maxCacheLength;

+ (NSError *)errorForResponseClass:(NSURL *)URL
                           request:(NSURLRequest *)request
                          response:(NSURLResponse *)response;

+ (NSError *)errorForResponseStatusCode:(NSURL *)URL
                                request:(NSURLRequest *)request
                               response:(NSURLResponse *)response;

+ (NSError *)errorForResponseContentType:(NSURL *)URL
                                 request:(NSURLRequest *)request
                                response:(NSURLResponse *)response;

+ (NSError *)errorForResponseContentLength:(NSURL *)URL
                                   request:(NSURLRequest *)request
                                  response:(NSURLResponse *)response;

@end
