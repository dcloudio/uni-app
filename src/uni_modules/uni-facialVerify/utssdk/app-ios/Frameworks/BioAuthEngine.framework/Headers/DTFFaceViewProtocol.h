//
//  DTFFaceViewProtocol.h
//  BioAuthEngine
//
//  Created by mengbingchuan on 2022/8/29.
//  Copyright © 2022   DTF. All rights reserved.
//

#import <UIKit/UIkit.h>
#import <AVFoundation/AVFoundation.h>

typedef NS_ENUM(NSInteger, DTFFaceStateMessage) {
    DTF_Message_Image_Perfect = 0,
    DTF_Message_No_Face,
    DTF_Message_Distance_Too_Far,
    DTF_Message_Distance_Too_Close,
    DTF_Message_Face_Not_In_Center,
    DTF_Message_Bad_Pitch,
    DTF_Message_Bad_Yaw,
    DTF_Message_Is_Moving,
    DTF_Message_Bad_Brightness,
    DTF_Message_Bad_Quality,
    DTF_Message_Bad_Eye_Openness,
    DTF_Message_Blink_Openness,
    DTF_Message_Left_Yaw,
    DTF_Message_Right_Yaw,
    DTF_Message_Mouth_Open,
    DTF_Message_Lip_Move,
    DTF_Message_Photinus,
    DTF_Message_Stack_Time,
    DTF_Message_Face_Too_More,
    DTF_Message_Target_Too_Far,
    DTF_Message_Target_Too_Close,
    DTF_Message_Calibrate_Too_Far,
    DTF_Message_Calibrate_Too_Close,
    DTF_Message_NearFar_Collect,
    DTF_Message_Face_Not_In_Postion,
};

typedef NS_ENUM(NSInteger, DTFLivenessActionGuideType) {
    DTF_Liveness_Action_Guide_None = -1,//无
    DTF_Liveness_Action_Guide_BlinkOpenness = 0,//眨眼
    DTF_Liveness_Action_Guide_LeftYAW,//左摇头
    DTF_Liveness_Action_Guide_RightYAW,//右摇头
    DTF_Liveness_Action_Guide_MouthOpen,//张嘴
    DTF_Liveness_Action_Guide_LipMove,//移动嘴唇
    DTF_Liveness_Action_Guide_Photinus,//炫彩
    DTF_Liveness_Action_Guide_NearFar//远近活体
};

@protocol DTFFaceViewProtocol;

@protocol DTFFaceViewDelegate <NSObject>

- (void)viewExit:(id<DTFFaceViewProtocol>)view;

- (void)playBtn:(UIButton *)btn;

- (void)headRegionChanged:(NSDictionary *)region;//头像区域发生改变

@end

@protocol DTFFaceViewProtocol <NSObject>

@property(nonatomic, weak) id<DTFFaceViewDelegate> delegate;

- (void)setPreviewLayer:(AVCaptureVideoPreviewLayer *)previewLayer;

- (void)setScreenRotation:(BOOL)isRotation;

- (void)setPlayBtnIcon;

- (void)faceDectectComplete;

- (void)handleFaceStateChange:(DTFFaceStateMessage)state
                    stateTips:(NSString *)tips
                  actionGuide:(NSString *)guide
              actionGuideType:(DTFLivenessActionGuideType)guideType
                     progress:(CGFloat)progress
                      extInfo:(NSDictionary *)extInfo;

- (UIView *)view;

@optional

/**
 * color 炫彩时，设置View的背景色
 */
- (void)setPhotinusColor:(UIColor *)color;

/**
 * 设置是否开启适老化
 */
- (void)setSuitableType:(BOOL)isSuitable;
/**
 * image 模糊化的人脸图，用于做结束时loading
 */
- (void)showBlurImage:(UIImage *)image;

- (void)reset;

@end

