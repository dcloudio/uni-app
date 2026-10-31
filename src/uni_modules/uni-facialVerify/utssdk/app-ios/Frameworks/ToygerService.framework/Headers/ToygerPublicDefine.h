//
//  ToygerAlgorithmPublicDefine.h
//  ToygerAlgorithm
//
//  Created by 王伟伟 on 2018/1/22.
//  Copyright © 2018年 DTF. All rights reserved.
//

#ifndef ToygerAlgorithmPublicDefine_h
#define ToygerAlgorithmPublicDefine_h

//#define USE_PB
//#define USE_FPP
#define LOCALVERIFY
//#define USE_SENSOR
#define HUMMINGBIRD
#define ZDOC

#import <Foundation/Foundation.h>

#if defined(__cplusplus)
#define TOYGER_EXPORT extern "C"
#else
#define TOYGER_EXPORT extern
#endif

typedef NSString* const ToygerServiceEventKey;
typedef NSNumber* const ToygerServiceSerializeType;
typedef NSString* const ToygerFaceFrameTypeKey;

typedef NS_ENUM(NSUInteger, ToygerFrameFormat) {
    ToygerFrameFormat_NV21,
    ToygerFrameFormat_BGRA,
    ToygerFrameFormat_BGR,
};

typedef NS_ENUM(NSUInteger, ToygerFrameType) {
    ToygerFrameType_Light,
    ToygerFrameType_Unknown,
    ToygerFrameType_Dark,
};

typedef NS_ENUM(NSUInteger, ToygerServiceType) {
    ToygerServiceType_Face = 0,
    ToygerServiceType_Card,
    ToygerServiceType_Face_LocalRegist,
    ToygerServiceType_Face_LocalMatch,
};

typedef NS_ENUM(NSUInteger, ToygerServiceModelType) {
    ToygerServiceModelTypeFace = 0,
    ToygerServiceModelTypeMouth,
};

typedef NS_ENUM(NSUInteger, TSToygerInitFailType) {
    TSToygerInitFailTypeInvalidAlgorithm,
    TSToygerInitFailTypeToygerFileError
};

TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEventDarkScreen;
TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEventLivenessDone;
TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEventLivenessBlinkDone;
TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEventReset;
TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEventHighQualityImage;
TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEventUserInfo;
TOYGER_EXPORT ToygerServiceEventKey ToygerServiceEvent;
TOYGER_EXPORT ToygerFaceFrameTypeKey ToygerServiceFrameTypeLight;
TOYGER_EXPORT ToygerFaceFrameTypeKey ToygerServiceFrameTypeDark;
TOYGER_EXPORT ToygerFaceFrameTypeKey ToygerServiceEventPhotinusRGBChanged;

#endif /* ToygerAlgorithmPublicDefine_h */
