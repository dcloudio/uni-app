//
//  ToygerFaceInfo.h
//  ToygerAlgorithm
//
//  Created by 王伟伟 on 2018/1/23.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import "ToygerPoint.h"
#import "ToygerRect.h"
//#include "Toyger.h"

#ifndef USE_PB

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface ToygerFaceInfo : ToygerBaseModel


/**
 人脸框，绝对坐标：左上右下
 */
@property (nonatomic, copy) ToygerRect *rect;


/**
 人脸关键点信息，绝对坐标
 */
@property (nonatomic, copy) NSArray<ToygerPoint *> *points;


/**
 置信度
 */
@property (nonatomic, copy) NSString *confidence;


/**
 质量分
 */
@property (nonatomic, copy) NSString *quality;


/**
 <#Description#>
 */
@property (nonatomic, copy) NSString *feature;


/**
 <#Description#>
 */
@property (nonatomic, copy) NSString *feaVersion;

//- (instancetype)initWithFaceAttr:(TGFaceAttr)attr image:(UIImage *)image;

@end

#else
#import <APProtocolBuffers/ProtocolBuffers.h>

@class ToygerPoint;
@class ToygerFaceInfo;
@class ToygerRect;

@interface ToygerFaceInfo : APDPBGeneratedMessage

@property (readonly) BOOL hasRect;
@property (readonly) BOOL hasConfidence;
@property (readonly) BOOL hasQuality;
@property (readonly) BOOL hasFeature;
@property (readonly) BOOL hasFeaVersion;

@property (nonatomic,strong) ToygerRect* rect ;
@property (nonatomic,strong) NSArray<ToygerPoint*>* points ;
@property (nonatomic) Float32 confidence ;
@property (nonatomic) Float32 quality ;
@property (nonatomic,strong) NSString* feature ;
@property (nonatomic,strong) NSString* feaVersion ;

//- (instancetype)initWithFaceAttr:(TGFaceAttr)attr image:(UIImage *)image;

@end
#endif
