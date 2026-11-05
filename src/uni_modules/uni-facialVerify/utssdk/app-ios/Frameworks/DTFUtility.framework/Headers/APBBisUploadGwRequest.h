//com..bis.common.service.facade.gw.model.upload.BisJsonUploadGwRequest
/*
 *generation date:Mon Mar 14 10:35:56 CST 2016
 *tool version:5.0.2
 *template version:4.1.1
 */

#ifndef SUPPORT_PB

#import "ToygerData.h"

@interface APBBisUploadGwRequest : NSObject

@property(nonatomic, strong) NSString *bisToken;
@property(nonatomic, strong) ToygerUploadContent *content;
@property(nonatomic, strong) NSString *contentSig;
@property(nonatomic, strong) NSString *behavLog;
@property(nonatomic, strong) NSString *behavLogSig;

@end

#else

#ifdef __cplusplus
extern "C"{
#endif
#import <APProtocolBuffers/ProtocolBuffers.h>
    
#ifdef __cplusplus
}
#endif

@interface APBBisUploadGwRequest : APDPBGeneratedMessage
@property (readonly) BOOL hasBisToken;
@property (readonly) BOOL hasContent;
@property (readonly) BOOL hasContentSig;
@property (readonly) BOOL hasBehavLog;
@property (readonly) BOOL hasBehavLogSig;

@property (nonatomic,strong) NSString* bisToken ;
@property (nonatomic,strong) NSData* content ;
@property (nonatomic,strong) NSData* contentSig ;
@property (nonatomic,strong) NSData* behavLog ;
@property (nonatomic,strong) NSData* behavLogSig ;
@end

#endif
