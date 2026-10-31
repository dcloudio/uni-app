//
//  APBBehavLogModel.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 3/15/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <BioAuthEngine/APBConfig.h>

//JSON
#ifndef SUPPORT_PB

@interface BisClientInfo : NSObject
@property (nonatomic,strong) NSString* model;
@property (nonatomic,strong) NSString* os;
@property (nonatomic,strong) NSString* osVer;
@property (nonatomic,strong) NSString* clientVer;
@end

@interface BisBehavToken : NSObject
@property (nonatomic,strong) NSString* token;
@property (nonatomic,strong) NSString* type;
@property (nonatomic,strong) NSString* sampleMode;
@property (nonatomic,strong) NSString* uid;
@property (nonatomic,strong) NSString* apdid;
@property (nonatomic,strong) NSString* appid;
@property (nonatomic,strong) NSString* behid;
@property (nonatomic,strong) NSString* bizid;
@property (nonatomic,strong) NSString* verifyid;
@property (nonatomic,strong) NSString* vtoken;
@property (nonatomic,strong) NSString* apdidToken;
@end

@interface BisBehavCommon : NSObject
@property (nonatomic,strong) NSString* invtp;
@property (nonatomic,strong) NSString* tm;
@property (nonatomic,strong) NSString* retry;
@end

@interface BisBehavTask : NSObject
@property (nonatomic,strong) NSString* name;
@property (nonatomic,strong) NSString* idx;
@property (nonatomic,strong) NSString* dur;
@property (nonatomic,strong) NSString* quality;
@property (nonatomic,strong) NSString* extInfo;
@end

@interface BisBehavLog : NSObject
@property (nonatomic,strong) BisClientInfo* clientInfo;
@property (nonatomic,strong) BisBehavToken* behavToken;
@property (nonatomic,strong) BisBehavCommon* behavCommon;
@property (nonatomic,strong) NSMutableArray * behavTask;
@end

//PB
#else

#ifdef __cplusplus
extern "C"{
#endif
#import <APProtocolBuffers/ProtocolBuffers.h>
    
#ifdef __cplusplus
}
#endif
@class BisBehavCommon;
@class BisBehavLog;
@class BisBehavTask;
@class BisBehavToken;
@class BisClientInfo;

@interface BisClientInfo : APDPBGeneratedMessage
@property (readonly) BOOL hasModel;
@property (readonly) BOOL hasOs;
@property (readonly) BOOL hasOsVer;
@property (readonly) BOOL hasClientVer;
@property (nonatomic,strong) NSString* model;
@property (nonatomic,strong) NSString* os;
@property (nonatomic,strong) NSString* osVer;
@property (nonatomic,strong) NSString* clientVer;
@end

@interface BisBehavToken : APDPBGeneratedMessage
@property (readonly) BOOL hasToken;
@property (readonly) BOOL hasType;
@property (readonly) BOOL hasSampleMode;
@property (readonly) BOOL hasUid;
@property (readonly) BOOL hasApdid;
@property (readonly) BOOL hasAppid;
@property (readonly) BOOL hasBehid;
@property (readonly) BOOL hasBizid;
@property (readonly) BOOL hasVerifyid;
@property (readonly) BOOL hasVtoken;
@property (readonly) BOOL hasApdidToken;
@property (nonatomic,strong) NSString* token;
@property (nonatomic) SInt32 type;
@property (nonatomic) SInt32 sampleMode;
@property (nonatomic,strong) NSString* uid;
@property (nonatomic,strong) NSString* apdid;
@property (nonatomic,strong) NSString* appid;
@property (nonatomic,strong) NSString* behid;
@property (nonatomic,strong) NSString* bizid;
@property (nonatomic,strong) NSString* verifyid;
@property (nonatomic,strong) NSString* vtoken;
@property (nonatomic,strong) NSString* apdidToken;
@end

@interface BisBehavCommon : APDPBGeneratedMessage
@property (readonly) BOOL hasInvtp;
@property (readonly) BOOL hasTm;
@property (readonly) BOOL hasRetry;
@property (nonatomic,strong) NSString* invtp;
@property (nonatomic,strong) NSString* tm;
@property (nonatomic,strong) NSString* retry;
@end

@interface BisBehavTask : APDPBGeneratedMessage
@property (readonly) BOOL hasName;
@property (readonly) BOOL hasIdx;
@property (readonly) BOOL hasDur;
@property (readonly) BOOL hasQuality;
@property (readonly) BOOL hasExtInfo;
@property (nonatomic,strong) NSString* name;
@property (nonatomic,strong) NSString* idx;
@property (nonatomic)SInt32 dur;
@property (nonatomic)SInt32 quality;
@property (nonatomic,strong) NSString* extInfo;
@end

@interface BisBehavLog : APDPBGeneratedMessage
@property (readonly) BOOL hasClientInfo;
@property (readonly) BOOL hasBehavToken;
@property (readonly) BOOL hasBehavCommon;
@property (readonly) BOOL hasExtAttr;
@property (nonatomic,strong) BisClientInfo* clientInfo ;
@property (nonatomic,strong) BisBehavToken* behavToken ;
@property (nonatomic,strong) BisBehavCommon* behavCommon ;
@property (nonatomic,strong) NSMutableArray<BisBehavTask*>* behavTask ;
@property (nonatomic,strong) PBMapStringString* extAttr ;
@end

#endif

