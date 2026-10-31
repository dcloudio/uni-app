//
//  ASSLogger.h
//  ae-security-sdk
//
//  Created by xingchen on 14/12/22.
//  Copyright (c) 2014年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ASSProtocolCenter.h"

#define ASSLog(...)    do { \
    if ([ASSProtocolCenter sharedCenter].logDelegate) { \
        [[ASSProtocolCenter sharedCenter].logDelegate print:__VA_ARGS__, nil]; \
    }} while(0)
#define ASSDtl(params, detail)    [[ASSProtocolCenter sharedCenter].logDelegate print:[NSString stringWithFormat:@"%@%@",params,detail], nil]
#define ASSLogError(erroInfo)    do { [[ASSLogger sharedInstance] addLogWithMessage: erroInfo]; } while(0)

@interface ASSLogger : NSObject

@property (nonatomic, strong) NSString* loggerInfo;

+(id)sharedInstance;

-(void)initializeWithArgs:(NSDictionary*)inArgs;

-(void)addLogWithMessage:(NSString*)message;

-(void)uploadLog;

//---------for test
-(NSData*)generateMessage:(NSString*)msg;
-(void)addLogWithMessage:(NSString *)message withFileName:(NSString*)fileName;
-(NSString*)getCurrentFileName:(NSDate*)date;
-(void)internal_addLog:(NSString*)message;
-(void)uploadLogCertified;


@end
