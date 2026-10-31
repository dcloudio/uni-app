//
//  ZimInitRequest.h
//  DTFIdentityManager
//
//  Created by richard on 27/08/2017.
//  Copyright © 2017  All rights reserved.
//

#import <Foundation/Foundation.h>

#ifndef SUPPORT_PB

@interface ZimInitRequest:NSObject

@property (nonatomic,strong) NSString* zimId ;
@property (nonatomic,strong) NSString* channel ;
@property (nonatomic,strong) NSString* merchant ;
@property (nonatomic,strong) NSString* productName ;
@property (nonatomic,strong) NSString* produceNode ;
@property (nonatomic,strong) NSString* bizData ;
@property (nonatomic,strong) NSString* metaInfo ;
@property (nonatomic,strong) NSString* originAliyunEncToken ;

@end


#else
#import <APProtocolBuffers/ProtocolBuffers.h>

@interface ZimInitRequest : APDPBGeneratedMessage

@property (readonly) BOOL hasZimId;
@property (readonly) BOOL hasChannel;
@property (readonly) BOOL hasMerchant;
@property (readonly) BOOL hasProductName;
@property (readonly) BOOL hasProduceNode;
@property (readonly) BOOL hasBizData;
@property (readonly) BOOL hasMetaInfo;

@property (nonatomic,strong) NSString* zimId ;
@property (nonatomic,strong) NSString* channel ;
@property (nonatomic,strong) NSString* merchant ;
@property (nonatomic,strong) NSString* productName ;
@property (nonatomic,strong) NSString* produceNode ;
@property (nonatomic,strong) NSString* bizData ;
@property (nonatomic,strong) NSString* metaInfo ;
@end

#endif
