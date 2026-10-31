//
//  ToygerMeta.h
//  ToygerService
//
//  Created by 王伟伟 on 2018/2/1.
//  Copyright © 2018年 DTF. All rights reserved.
//

#ifndef USE_PB

#import <DTFUtility/ToygerBaseModel.h>

@interface ToygerMeta : ToygerBaseModel

/**
 比对算法类型：fpp|zface|zdoc
 */
@property (nonatomic, copy) NSString *type;

/**
 客户端比对模式中，客户端比对分数和活体分数
 */
@property (nonatomic, copy) NSDictionary *score;

/**
 客户端采集数据的信息：主要是证件宝使用：
  @{
     @"docType": @"00860001",
     @"pageNo": @"1"
  }
 */
@property (nonatomic, copy) NSDictionary *collectInfo;

// collectInfoSig 的原始数据
@property (nonatomic, copy) NSDictionary *collectInfoSigDict;

@property (nonatomic, copy) NSString *collectInfoSig;

/**
 blob数据序列化类型
 */
@property (nonatomic, strong) NSNumber *serialize;
@end

#else

#import <APProtocolBuffers/ProtocolBuffers.h>



@class ToygerMeta;

@interface ToygerMeta : APDPBGeneratedMessage

@property (readonly) BOOL hasVersion;
@property (readonly) BOOL hasType;
@property (readonly) BOOL hasScoreStr;
@property (readonly) BOOL hasCollectInfoStr;
@property (readonly) BOOL hasSerialize;

@property (nonatomic,strong) NSString* version ;
@property (nonatomic,strong) NSString* type ;
@property (nonatomic,strong) NSString* scoreStr ;
@property (nonatomic,strong) NSString* collectInfoStr ;
@property (nonatomic) SInt32 serialize ;
@end

#endif
