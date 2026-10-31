//
//  ToygerUploadContent.h
//  ToygerService
//
//  Created by 王伟伟 on 2018/2/1.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import "ToygerMeta.h"
#import "ToygerBlob.h"

#ifndef USE_PB

#import <DTFUtility/ToygerBaseModel.h>

@interface ToygerUploadContent : ToygerBaseModel

@property (nonatomic, strong) ToygerMeta *meta;

@property (nonatomic, strong) ToygerBlob *blob;

- (NSData *)uploadData;

- (NSString *)uploadString;

- (BOOL)loadMap:(NSDictionary *)map;

@end

#else

#import <APProtocolBuffers/ProtocolBuffers.h>

@class ToygerUploadContent;
@class ToygerBlob;
@class ToygerMeta;

@interface ToygerUploadContent : APDPBGeneratedMessage

@property (readonly) BOOL hasMeta;
@property (readonly) BOOL hasBlob;

@property (nonatomic,strong) ToygerMeta* meta ;
@property (nonatomic,strong) ToygerBlob* blob ;
@end

#endif
