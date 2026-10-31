//
//  ModelDownloader.h
//  DTFIdentityManager
//
//  Created by mengbingchuan on 2022/9/7.
//  Copyright © 2022 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DTFLogMonitor.h"

NS_ASSUME_NONNULL_BEGIN

@interface ZimModelDownloader : NSObject

@property(nonatomic, assign) BOOL preload; //preload, fallback

@property(nonatomic, copy) NSString *hostModelURL; //宿主传入的模型链接

+ (ZimModelDownloader *)sharedInstance;

- (void)setModelDownloadURL:(NSArray *)array;

- (NSString *)modelPath;

- (BOOL)needDownload;

- (void)processForceDownload:(NSString *)downloadId;

- (void)startDownloadCompletion:(void (^)(BOOL success))completion;

@end

NS_ASSUME_NONNULL_END
