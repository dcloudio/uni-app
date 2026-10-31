//
//  DTFMonitorCommonData.h
//  BioAuthEngine
//
//  Created by richard on 19/03/2018.
//  Copyright © 2018  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DTFMonitorCommonData : NSObject

@property (nonatomic,strong) NSString* serviceLevel;

// 端侧上报UUID: init、verify、OCR
@property (nonatomic,strong) NSString* beginTraceIDValue;
@property (nonatomic,strong) NSString* verifyTraceIDValue;
@property (nonatomic,strong) NSString* ocrTraceIDValue;

@property (nonatomic,strong) NSString* beginTraceIDKey;
@property (nonatomic,strong) NSString* verifyTraceIDKey;
@property (nonatomic,strong) NSString* ocrTraceIDKey;



+ (instancetype)getInstance;

- (NSString *)getToken;

- (NSInteger)getIndex;

- (void)resetValue;

- (NSDictionary *)getCommonMonitorData;

- (NSDictionary *)getBase64CommonMonitorData;

@end
