//
//  ToygerPoint.h
//  ToygerService
//
//  Created by 王伟伟 on 2018/3/24.
//  Copyright © 2018年 DTF. All rights reserved.
//

#ifndef USE_PB

#import <DTFUtility/ToygerBaseModel.h>

@interface ToygerPoint : ToygerBaseModel
@property (nonatomic, assign) NSInteger x;
@property (nonatomic, assign) NSInteger y;

@end

#else

#import <APProtocolBuffers/ProtocolBuffers.h>

@class ToygerPoint;

@interface ToygerPoint : APDPBGeneratedMessage

@property (readonly) BOOL hasX;
@property (readonly) BOOL hasY;

@property (nonatomic) Float32 x ;
@property (nonatomic) Float32 y ;
@end

#endif
