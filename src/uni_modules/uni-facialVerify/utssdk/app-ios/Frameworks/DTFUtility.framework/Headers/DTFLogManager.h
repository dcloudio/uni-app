//
//  APRemoteLogManager.h
//  APRemoteLogging
//
//  Created by tashigaofei on 14-6-23.
//  Copyright (c) 2014年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DTFLogFile.h"
#import "DTFLogFormatter.h"

typedef void (^NetworkUploadCompletion)(BOOL);
typedef void (^NetworkUploadBlock)(NSDictionary *,NetworkUploadCompletion);

@class MPLoggingContext;

@interface DTFLogManager : NSObject

@property(nonatomic, copy) NetworkUploadBlock networkUploadBlock;
typedef void (^LogCallback)(NSDictionary *logData);

+(instancetype)sharedInstance;

+ (void)setLogCallback:(LogCallback)logCallback;

-(void)writeLogWithContext:(MPLoggingContext *) context;
-(void)flushAllLog;
-(void)setupTimeForCheckFileSize;
- (void)startUploadLog;
@end

@interface MPLoggingContext : NSObject
@property (nonatomic, assign) MPLogType logType;
@property (nonatomic, strong) DTFLogFormatter *formatter;
@property (nonatomic, strong) NSMutableDictionary * logDict;
@property (nonatomic, strong) NSString *bizType;

@end

NSString * MPLogPathForFile(NSString * name);
DTFLogFile* DTFLogFileForContext(MPLoggingContext *context);
NSData* MPLogRSAEncrypt(NSData * data);
NSString*MPLogAESEncrypt(NSString *key, NSString *data);
NSString* MPLogBase64EncodedString(NSData *data, int wrapWidth);
NSData*MPLogBase64DecodedString(NSString *string);
NSString* MPLogMD5String(NSString *string);
NSData* MPLogGZipCompress(NSData *data);
NSString* MPLogGetNetworkName();
NSString *MPLogGetCarrierName();

typedef enum : NSInteger {
    MPLogNotReachable = 0,
    MPLogReachableViaWiFi,
    MPLogReachableViaWWAN
} MPLogNetworkStatus;

@interface MPSafeMap : NSObject
- (id)objectForKeyedSubscript:(id <NSCopying>)key;
- (void)setObject:(id)obj forKeyedSubscript:(id <NSCopying>)key;
- (void)removeObjectForKey:(id)aKey;
@end
