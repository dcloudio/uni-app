//
//  ZimInitResponse.h
//  DTFIdentityManager
//
//  Created by richard on 27/08/2017.
//  Copyright © 2017 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@class ZimInitResponse;
@class PBMapStringString;

#ifndef SUPPORT_PB

@interface ZimInitResponse:NSObject
@property (nonatomic) SInt32 retCode ;
@property (nonatomic,strong) NSString *message ;
@property (nonatomic,strong) NSString *zimId ;
@property (nonatomic,strong) NSString *protocol ;
@property (nonatomic,strong) NSDictionary *extParams ;
@property (nonatomic,strong) NSString *retCodeSub ;
@property (nonatomic,strong) NSString *retMessageSub ;
@property (nonatomic,strong) NSString *WishContent;//retMessageSub ;
@property (nonatomic,strong) NSString *ControlConfig;//retMessageSub ;
@property (nonatomic,strong) NSString *ImageCount;
@property (nonatomic,strong) NSDictionary *ossConfig;

+ (Class)extParamsElementClass;
@end

#else
#import <APProtocolBuffers/ProtocolBuffers.h>

@interface ZimInitResponse : APDPBGeneratedMessage

@property (readonly) BOOL hasRetCode;
@property (readonly) BOOL hasMessage;
@property (readonly) BOOL hasZimId;
@property (readonly) BOOL hasProtocol;
@property (readonly) BOOL hasExtParams;

@property (nonatomic) SInt32 retCode ;
@property (nonatomic,strong) NSString* message ;
@property (nonatomic,strong) NSString* zimId ;
@property (nonatomic,strong) NSString* protocol ;
@property (nonatomic,strong) PBMapStringString* extParams ;
@property (nonatomic,strong) NSString* retCodeSub ;
@property (nonatomic,strong) NSString* retMessageSub ;
@end
#endif
