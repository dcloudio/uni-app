//
//  APBProtocol.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 3/15/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

//若不支持pb
#ifndef SUPPORT_PB

@interface BisClientConfigContent : NSObject
@property (nonatomic,strong) NSString* token;
@property (nonatomic,strong) NSString* type;
@property (nonatomic,strong) NSString* sampleMode;
@property (nonatomic,strong) NSString* androidcfg;
@property (nonatomic,strong) NSString* ioscfg;
@property (nonatomic,strong) NSString* h5cfg;
@end

@interface BisClientConfig : NSObject
@property (nonatomic,strong) BisClientConfigContent* content;
@property (nonatomic,strong) NSString* sign;
@end

//若支持PB
#else

#ifdef __cplusplus
extern "C"{
#endif
#import <APProtocolBuffers/ProtocolBuffers.h>
    
#ifdef __cplusplus
}
#endif

@interface BisClientConfigContent : APDPBGeneratedMessage

@property (readonly) BOOL hasToken;
@property (readonly) BOOL hasType;
@property (readonly) BOOL hasSampleMode;
@property (readonly) BOOL hasAndroidcfg;
@property (readonly) BOOL hasIoscfg;
@property (readonly) BOOL hasH5cfg;

@property (nonatomic,strong) NSString* token ;
@property (nonatomic) SInt32 type ;
@property (nonatomic) SInt32 sampleMode ;
@property (nonatomic,strong) NSString* androidcfg ;
@property (nonatomic,strong) NSString* ioscfg ;
@property (nonatomic,strong) NSString* h5cfg ;
@end

@interface BisClientConfig : APDPBGeneratedMessage

@property (readonly) BOOL hasContent;
@property (readonly) BOOL hasContentBytes;
@property (readonly) BOOL hasSign;

@property (nonatomic,strong) NSString* content ;
@property (nonatomic,strong) BisClientConfigContent* contentBytes ;
@property (nonatomic,strong) NSString* sign ;
@end

#endif

