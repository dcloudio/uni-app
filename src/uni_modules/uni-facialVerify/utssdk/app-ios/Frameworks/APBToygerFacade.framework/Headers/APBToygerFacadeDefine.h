//
//  APFCherryDefine.h
//  APBToygerFacade
//
//  Created by shouyi.www on 27/02/2017.
//  Copyright © 2017 DTF. All rights reserved.
//

#ifndef APBToygerFacadeDefine_h
#define APBToygerFacadeDefine_h


static float normalized_distance(float current_value, float best_value, float range) {
    return fabsf((current_value - best_value) / range);
}

//typedef struct toyger_status_evaluator_t {
//    float pitch;
//    float yaw;
//    float width;
//
//    float best_pitch;
//    float best_yaw;
//    float best_width;
//    float pitch_range;
//    float yaw_range;
//    float width_range;
//    float pitch_weight;
//    float yaw_weight;
//    float width_weight;
//
//    toyger_status_evaluator_t(float pitch_ = -0.3, float pitch_range_ = 0.7, float best_pitch_ = 0, float pitch_weight_ = 1,
//                              float yaw_ = -0.6, float yaw_range_ = 0.6, float best_yaw_ = 0, float yaw_weight_ = 1,
//                              float width_ = 0.2, float width_range_ = 1.2, float best_width_ = 0.7, float width_weight_ = 1){
//        pitch = pitch_;
//        yaw = yaw_;
//        width = width_;
//        pitch_range = pitch_range_;
//        yaw_range = yaw_range_;
//        width_range = width_range_;
//        best_pitch = best_pitch_;
//        best_yaw = best_yaw_;
//        best_width = best_width_;
//        pitch_weight = pitch_weight_;
//        yaw_weight = yaw_weight_;
//        width_weight = width_weight_;
//    }
//
//    void reset(){
//        pitch = -0.3;
//        yaw = -0.6;
//        width = 0.2;
//    }
//
//    void update(float pitch_, float yaw_, float width_) {
//        pitch = pitch_;
//        yaw = yaw_;
//        width = width_;
//    }
//
//    float evaluateProgress(float pitch_, float yaw_, float width_){
//        return
//        (normalized_distance(pitch_, best_pitch, pitch_range) * pitch_weight +
//         normalized_distance(yaw_, best_yaw, yaw_range) * yaw_weight +
//         normalized_distance(width_, best_width, width_range) * width_weight) /
//        (pitch_weight + yaw_weight + width_weight);
//    }
//
//    float evaluate(){
//        return 1 -
//        (normalized_distance(pitch, best_pitch, pitch_range) * pitch_weight +
//         normalized_distance(yaw, best_yaw, yaw_range) * yaw_weight +
//         normalized_distance(width, best_width, width_range) * width_weight) /
//        (pitch_weight + yaw_weight + width_weight);
//    }
//
//}ToygerStatusEvaluator;


typedef struct apbtoyger_tip_evaluator_t {
    bool pose_end;
    bool has_face;
    bool did_blink;
    bool pos_okay;
    bool quality_okay;
    bool under_exposure;
    bool face_width_too_small;
    bool face_width_too_big;
    bool integrity_fail;
    bool yaw_fail;
    bool pitch_fail;
    bool tremble_fail;
    bool did_checkSeven;
    int tip_timer_wait_cnt;
    bool tip_show_switch;
    int tip_message;

    apbtoyger_tip_evaluator_t(){
        reset();
    }

    void reset(){
        has_face = false;
        did_blink = false;
        pos_okay = false;
        under_exposure = false;
        face_width_too_small = false;
        integrity_fail = false;
        pitch_fail = false;
        face_width_too_big = false;
        yaw_fail = false;
        tremble_fail = false;
        tip_timer_wait_cnt = 0;
        tip_show_switch = true;
        did_checkSeven = false;
        quality_okay = false;
        pose_end = false;
        tip_message =0;
    }
}APBToygerTipEvaluator;


//UI样式
typedef enum : NSUInteger {
    APBToygerUIStyleFPPCherry = 991,       //991 FPP樱桃（废弃）
    APBToygerUIStyleCherry,                //992 zFace樱桃
    APBToygerUIStyleGarfield,              //993 加菲
} APBToygerUIStyle;

#endif
