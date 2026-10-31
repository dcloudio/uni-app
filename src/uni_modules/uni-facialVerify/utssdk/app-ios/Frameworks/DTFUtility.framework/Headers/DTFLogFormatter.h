//
//  APLogFormater.h
//  APRemoteLogging
//
//  Created by tashigaofei on 14-6-23.
//  Copyright (c) 2014年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DTFMonitorPointDataDefines.h"
#import "DTFLogSetting.h"

@interface DTFLogFormatter : NSObject

@property (nonatomic, strong) NSString *sdkVersion;

- (NSString *)stringFromLog:(NSDictionary *) logDict;
+ (NSString *)timestampString;
+ (NSString *)getDatetimeString:(NSTimeInterval)time;
+ (NSString *)resolutionString;
+ (NSArray *)keyPaths;

@end
