//
//  KTVHCDataLoader.h
//  KTVHTTPCache
//
//  Created by Single on 2018/6/7.
//  Copyright © 2018 Single. All rights reserved.
//

#import <Foundation/Foundation.h>

@class KTVHCDataLoader;
@class KTVHCDataRequest;
@class KTVHCDataResponse;

@protocol KTVHCDataLoaderDelegate <NSObject>

- (void)ktv_loaderDidFinish:(KTVHCDataLoader *)loader;
- (void)ktv_loader:(KTVHCDataLoader *)loader didFailWithError:(NSError *)error;
- (void)ktv_loader:(KTVHCDataLoader *)loader didChangeProgress:(double)progress;

@end

@interface KTVHCDataLoader : NSObject

+ (instancetype)new NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;

@property (nonatomic, weak) id <KTVHCDataLoaderDelegate> delegate;
@property (nonatomic, strong) id object;

@property (nonatomic, strong, readonly) KTVHCDataRequest *request;
@property (nonatomic, strong, readonly) KTVHCDataResponse *response;

@property (nonatomic, copy, readonly) NSError *error;

@property (nonatomic, readonly, getter=isFinished) BOOL finished;
@property (nonatomic, readonly, getter=isClosed) BOOL closed;

@property (nonatomic, readonly) long long loadedLength;
@property (nonatomic, readonly) double progress;

- (void)prepare;
- (void)close;

@end
