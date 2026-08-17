//
//  KTVHCDataReader.h
//  KTVHTTPCache
//
//  Created by Single on 2017/8/11.
//  Copyright © 2017年 Single. All rights reserved.
//

#import <Foundation/Foundation.h>

@class KTVHCDataReader;
@class KTVHCDataRequest;
@class KTVHCDataResponse;

@protocol KTVHCDataReaderDelegate <NSObject>

- (void)ktv_readerDidPrepare:(KTVHCDataReader *)reader;
- (void)ktv_readerHasAvailableData:(KTVHCDataReader *)reader;
- (void)ktv_reader:(KTVHCDataReader *)reader didFailWithError:(NSError *)error;

@end

@interface KTVHCDataReader : NSObject <NSLocking>

+ (instancetype)new NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;

@property (nonatomic, weak) id <KTVHCDataReaderDelegate> delegate;
@property (nonatomic, strong) id object;

@property (nonatomic, strong, readonly) KTVHCDataRequest *request;
@property (nonatomic, strong, readonly) KTVHCDataResponse *response;

@property (nonatomic, copy, readonly) NSError *error;

@property (nonatomic, readonly, getter=isPrepared) BOOL prepared;
@property (nonatomic, readonly, getter=isFinished) BOOL finished;
@property (nonatomic, readonly, getter=isClosed) BOOL closed;

@property (nonatomic, readonly) long long readedLength;
@property (nonatomic, readonly) double progress;

- (void)prepare;
- (void)close;

- (NSData *)readDataOfLength:(NSUInteger)length;

@end
