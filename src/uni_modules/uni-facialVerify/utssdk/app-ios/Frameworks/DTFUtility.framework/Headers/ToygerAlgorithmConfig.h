//
//  ToygerAlgorithmConfig.h
//  ToygerService
//
//  Created by 王伟伟 on 2018/2/2.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import <DTFUtility/ToygerBaseModel.h>

@interface ToygerAlgorithmConfig : ToygerBaseModel

@property (nonatomic, copy) NSString *stack_time;
@property (nonatomic, copy) NSString *blink_openness;
@property (nonatomic, copy) NSString *eye_openness;
@property (nonatomic, copy) NSString *eye_occlusion;
@property (nonatomic, copy) NSString *pose_pitch;
@property (nonatomic, copy) NSString *pose_yaw;
@property (nonatomic, copy) NSString *pose_gaussian;
@property (nonatomic, copy) NSString *pose_motion;
@property (nonatomic, copy) NSString *pose_pitchMin;
@property (nonatomic, copy) NSString *pose_rectwidth;
@property (nonatomic, copy) NSString *pose_integrity;
@property (nonatomic, copy) NSString *pose_light;
@property (nonatomic, copy) NSString *pose_yawMin;
@property (nonatomic, copy) NSString *lip_motion;
@property (nonatomic, copy) NSString *log_level;
@property (nonatomic, copy) NSString *min_iod;
@property (nonatomic, copy) NSString *max_iod;
@property (nonatomic, copy) NSString *quality_min_quality;
@property (nonatomic, copy) NSArray<NSString *> *liveness_combination;
@property (nonatomic, copy) NSArray *liveness_combination_retries;
@property (nonatomic, copy) NSArray *photinus_colour;
@property (nonatomic, copy) NSDictionary *threshold;
@property (nonatomic, copy) NSString *max_face_num;
@property (nonatomic, copy) NSString *detect_face_num;
@property (nonatomic, copy) NSString *speed;
@property (nonatomic, copy) NSDictionary *near_far;
@property (nonatomic, strong) NSArray <NSArray *>* photinus_colours;//随机炫彩下发序列
@property (nonatomic, assign) NSInteger algoType;
@property (nonatomic, copy) NSString * docType;
@property (nonatomic, assign) NSInteger pageNo;
@property (nonatomic, assign) CGRect rectInPic;
@property (nonatomic, assign) NSInteger rotateTimes;
@property (nonatomic, assign) NSInteger blur;
@property (nonatomic, assign) NSInteger exposure;

@property (nonatomic, copy) NSString  *secProtocol;

-(void)addDragonflyDefaultConfig;

-(void)addLocalVerifyDefaultConfig;

@end
