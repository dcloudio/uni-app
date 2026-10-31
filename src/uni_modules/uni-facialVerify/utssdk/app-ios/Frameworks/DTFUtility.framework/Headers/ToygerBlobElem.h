//
//  ToygerBlobElem.h
//  ToygerAlgorithm
//
//  Created by 王伟伟 on 2018/1/23.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import "ToygerFaceInfo.h"

#ifndef USE_PB

#import <Foundation/Foundation.h>

@interface ToygerBlobElemCapture: ToygerBaseModel

@property(nonatomic, copy) NSString *action;
@property(nonatomic, strong) NSData *video;
@property(nonatomic, copy) NSString *videoMD5;
@property(nonatomic, strong) NSData *videoMeta;
@property(nonatomic, copy) NSArray *picture;
@property(nonatomic, copy) NSArray *pictureToApp;
@property(nonatomic, strong) NSNumber *isVideoEvidence;

@end


@interface ToygerBlobElem : ToygerBaseModel


/**
 类型：face | doc
 */
@property (nonatomic, copy) NSString *type;


/**
 子类型：pano | live | dark | depth | facefeature | surveillance | facefeature | gongan | docface
 */
@property (nonatomic, copy) NSString *subType;


///**
// 当前数据在Type中的索引
// */
//@property (nonatomic, assign) int32_t idx;
/**
 当前数据在Type中的索引
 */
@property (nonatomic, strong) NSNumber *idx;

/**
 数据版本，图片要求是正向的
 */
@property (nonatomic, copy) NSString *version;


/**
 数据Buffer，大部分是jpeg
 */
//@property (nonatomic, strong) NSData *content;
@property (nonatomic, copy) NSString *content;

/**
 多图数据
 */
@property (nonatomic, copy) NSArray<NSString *> *optionalContent;

/**
 人脸信息，与content对应
 */
@property (nonatomic, strong) NSArray<ToygerFaceInfo *> *faceInfos;

@property (nonatomic, strong) NSArray<ToygerBlobElemCapture *> *capture;

/**
 证件信息
 */

+ (ToygerBlobElem *)blobElemFrom:(NSString *)imageContent type:(NSString *)type subType:(NSString *)subType idx:(NSString *)idx faceInfo:(NSArray *)faceInfo;
@end

#else

#import <APProtocolBuffers/ProtocolBuffers.h>

@class ToygerBlobElem;
@class ToygerDocInfo;
@class ToygerFaceInfo;

@interface ToygerBlobElem : APDPBGeneratedMessage

@property (readonly) BOOL hasType;
@property (readonly) BOOL hasSubType;
@property (readonly) BOOL hasIdx;
@property (readonly) BOOL hasVersion;
@property (readonly) BOOL hasContent;
@property (readonly) BOOL hasDocInfo;

@property (nonatomic,strong) NSString* type ;
@property (nonatomic,strong) NSString* subType ;
@property (nonatomic) SInt32 idx ;
@property (nonatomic,strong) NSString* version ;
@property (nonatomic,strong) NSData* content ;
@property (nonatomic,strong) NSArray<ToygerFaceInfo*>* faceInfos ;
@property (nonatomic,strong) ToygerDocInfo* docInfo ;

+ (ToygerBlobElem *)blobElemFrom:(NSData *)imageContent type:(NSString *)type subType:(NSString *)subType idx:(NSString *)idx faceInfo:(NSArray *)faceInfo docInfo:(ToygerDocInfo *)docInfo;


@end

#endif
