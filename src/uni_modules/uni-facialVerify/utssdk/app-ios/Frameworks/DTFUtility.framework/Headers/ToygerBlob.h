//
//  ToygerBlob.h
//  ToygerAlgorithm
//
//  Created by 王伟伟 on 2018/1/23.
//  Copyright © 2018年 DTF. All rights reserved.
//

#ifndef USE_PB

#import <Foundation/Foundation.h>
#import "ToygerBlobElem.h"

@interface ToygerBlob : ToygerBaseModel

@property (nonatomic, copy) NSString *blobVersion;

@property (nonatomic, strong) NSMutableArray<ToygerBlobElem *> *blobElem;

@end

#else

#import <APProtocolBuffers/ProtocolBuffers.h>

@class ToygerBlobElem;
@class ToygerBlob;

@interface ToygerBlob : APDPBGeneratedMessage

@property (readonly) BOOL hasBlobVersion;

@property (nonatomic,strong) NSString* blobVersion ;
@property (nonatomic,strong) NSMutableArray<ToygerBlobElem*>* blobElem ;
@end

#endif
