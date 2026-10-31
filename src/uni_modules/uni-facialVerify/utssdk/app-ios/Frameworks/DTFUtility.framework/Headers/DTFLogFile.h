//
//  APMmMPLogFile.h
//  MPRemoteLogging
//
//  Created by tashigaofei on 14-6-16.
//  Copyright (c) 2014年 Alpay. All rights reserved.
//

#import <Foundation/Foundation.h>

@class DTFLogIndex;
typedef BOOL (^FileFilter) (CFTimeInterval time);

@interface DTFLogFile : NSObject
@property (nonatomic, assign) BOOL uploadable;
@property (nonatomic, assign) unsigned long triggerCount;
@property (nonatomic, copy)  FileFilter timeFilter;
@property (nonatomic, assign) off_t size;
@property (nonatomic, assign) unsigned long unSyncCount;

+(instancetype) logFileWithName:(NSString *) name;
-(DTFLogIndex*) writeLog:(NSString *)logString;
-(NSData *) dataForIndex:(DTFLogIndex *) index;
-(void) markIndex:(DTFLogIndex *) index;
-(NSArray *) makeUnSyncLogIndex;
-(void) removeWeakCache;
-(NSString *)description;
-(void) markFile;
-(BOOL) isMarked;
+(char*)checkCode;
-(BOOL)shouldFlush;
-(BOOL) isUsing;
-(BOOL)isExist;

@end

@interface DTFLogIndex : NSObject
@property (nonatomic, assign) char flag;
@property (nonatomic, assign) NSUInteger offset;
@property (nonatomic, assign) NSUInteger length;
@property (nonatomic, assign) CFTimeInterval time;
@property (nonatomic, strong) DTFLogFile *file;

- (NSString*)uniqueId;

@end



