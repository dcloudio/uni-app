//
//  DTFConstant.h
//  DTFIdentityManager
//
//  Created by mengbingchuan on 2022/11/24.
//  Copyright © 2022 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

//ext params keys
extern NSString *const kZIMInitOperationTypeKey;        //init operation type
extern NSString *const kZIMValidateOperationTypeKey;    //validate operation type
extern NSString *const kZIMGatewayURLKey;               //rpc gateway url
extern NSString *const kZIMRpcHeaderKey;                //ext rpc header
extern NSString *const kZIMCurrentViewControllerKey;    // current view controller
extern NSString *const kZIMViewProviderKey;
extern NSString *const kZIMFastUploadKey;
extern NSString *const kZIMBisProtocolKey;
extern NSString *const kZIMResponseKey;
extern NSString *const kZIMValidateResponseKey;
extern NSString *const kZIMCertNoKey;
extern NSString *const kZIMCertNameKey;
extern NSString *const kZIMRareCharCertNoKey;
extern NSString *const kZIMRareCharCertNameKey;
extern NSString *const ZIM_EXT_PARAMS_KEY_OCR_BOTTOM_BUTTON_COLOR; //设置颜色的值，值内容为:#FFFFFF 格式，必须为6位
extern NSString *const ZIM_EXT_PARAMS_KEY_OCR_BOTTOM_BUTTON_CLICKED_COLOR; //设置按钮点击颜色的值，值内容为:#FFFFFF 格式 ,必须为6位
extern NSString *const ZIM_EXT_PARAMS_KEY_USE_VIDEO;  //返回本地视频的key
extern NSString *const ZIM_EXT_PARAMS_KEY_OCR_FACE_CIRCLE_COLOR;
extern NSString *const ZIM_EXT_PARAMS_KEY_OCR_FACE_THEME_COLOR;
extern NSString *const ZIM_EXT_PARAMS_KEY_NFC_THEME_COLOR;
extern NSString *const ZIM_EXT_PARAMS_KEY_MODEL_FILE_PATH; //设置文件路径
extern NSString *const ZIM_EXT_PARAMS_KEY_ACTIVITYINDICATOR_COLOR;
extern NSString *const ZIM_EXT_PARAMS_KEY_PRELOAD_MODEL_URL;
extern NSString *const ZIM_EXT_PARAMS_KEY_TIMEOUT_FOR_INIT;
extern NSString *const ZIM_EXT_PARAMS_KEY_TIMEOUT_FOR_VERIFY;
extern NSString *const ZIM_EXT_PARAMS_KEY_RETURN_OCR_IMAGE;
extern NSString *const ZIM_EXT_PARAMS_KEY_LANGUAGE;
extern NSString *const ZIM_EXT_PARAMS_KEY_NEED_PERMISSION_TOAST;
extern NSString *const ZIM_EXT_PARAMS_KEY_NEED_FACE_NOTICE;
extern NSString *const ZIM_EXT_PARAMS_KEY_PERMISSION_TOAST_DURATION;
extern NSString *const ZIM_EXT_PARAMS_KEY_WAVE_ANIMATE_CLOSE;// 是否关闭 水波纹动画

extern NSString *const kDTFOSSErrorDomain;

extern NSString *const kDTFEvidenceVideoName;
extern NSString *const kDTFPhotinusDataName;

extern NSString *const kDTFNOLivenessName;
extern NSString *const kDTFBlinkLivenessName;
extern NSString *const kDTFLeftYawLivenessName;
extern NSString *const kDTFRightYawLivenessName;
extern NSString *const kDTFLipMovementLivenessName;
extern NSString *const kDTFPhotinusLivenessName;
extern NSString *const kDTFNearFarLivenessName;
extern NSString *const kDTFBlinkLivenessName;
extern NSString *const kDTFEquipmentLivenessName;
extern NSString *const kDTFCollectInfoSignBlock;
