//
//  ToygerRect.h
//  ToygerService
//
//  Created by 王伟伟 on 2018/3/24.
//  Copyright © 2018年 DTF. All rights reserved.
//

#ifndef USE_PB

#import <DTFUtility/ToygerBaseModel.h>

@interface ToygerRect : ToygerBaseModel

@property (nonatomic, assign) NSInteger left;
@property (nonatomic, assign) NSInteger top;
@property (nonatomic, assign) NSInteger right;
@property (nonatomic, assign) NSInteger bottom;

@end

#else

#import <APProtocolBuffers/ProtocolBuffers.h>

@class ToygerRect;

@interface ToygerRect : APDPBGeneratedMessage

@property (readonly) BOOL hasLeft;
@property (readonly) BOOL hasTop;
@property (readonly) BOOL hasRight;
@property (readonly) BOOL hasBottom;

@property (nonatomic) SInt32 left ;
@property (nonatomic) SInt32 top ;
@property (nonatomic) SInt32 right ;
@property (nonatomic) SInt32 bottom ;
@end

#endif
