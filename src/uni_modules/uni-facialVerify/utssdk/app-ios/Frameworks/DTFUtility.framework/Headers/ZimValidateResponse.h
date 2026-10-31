//
//  ZimValidateResponse.h
//  DTFIdentityManager
//
//  Created by richard on 27/08/2017.
//  Copyright © 2017  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@class ZimValidateResponse;
@class PBMapStringString;

#ifndef SUPPORT_PB
@interface ZimValidateResponse:NSObject
@property (nonatomic) SInt32 validationRetCode ;
@property (nonatomic) SInt32 productRetCode ;
@property (nonatomic) BOOL pb_hasNext ;
@property (nonatomic,strong) NSString* nextProtocol ;
@property (nonatomic,strong) NSDictionary* extParams ;
@property (nonatomic,strong) NSString* retCodeSub ;
@property (nonatomic,strong) NSString* retMessageSub ;
+ (Class)extParamsElementClass;
@end

#else
#import <APProtocolBuffers/ProtocolBuffers.h>

@interface ZimValidateResponse : APDPBGeneratedMessage

@property (readonly) BOOL hasValidationRetCode;
@property (readonly) BOOL hasProductRetCode;
@property (readonly) BOOL hasPb_hasNext;
@property (readonly) BOOL hasNextProtocol;
@property (readonly) BOOL hasExtParams;

@property (nonatomic) SInt32 validationRetCode ;
@property (nonatomic) SInt32 productRetCode ;
@property (nonatomic) BOOL pb_hasNext ;
@property (nonatomic,strong) NSString* nextProtocol ;
@property (nonatomic,strong) PBMapStringString* extParams ;
@property (nonatomic,strong) NSString* retCodeSub ;
@property (nonatomic,strong) NSString* retMessageSub;
@end
#endif


