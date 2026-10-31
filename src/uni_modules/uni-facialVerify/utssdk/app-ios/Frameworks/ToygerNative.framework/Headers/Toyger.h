#pragma once
#include <string>
#include <vector>
#include <map>
#include <numeric>
#include <VerifyNativeAbility/dt_json11.hpp>

//#if  (defined HUMMINGBIRD) || (defined JASMINE)
//#include "zface_common.h"
//#endif
//10.1.90新增，给xmedia提供的算法服务会读取这个变量，如果在运行中，算法启动失败
static bool tg_algorithm_is_running;

enum ProductCode {
    // 默认原子产品
    Default = 0,
    // 瓢虫
    Ladybird = 1,
};

enum ToygerAlgorithm{
    Toyger_Algorithm_None = 0,
    Toyger_Algorithm_Face = 1 << 0,
    Toyger_Algorithm_Doc = 1 << 1
};


/**
 * sdk算法能力
 */
enum Capacity {
    /**
     * 无效能力
     */
    CAPACITY_INVALID = 0,
    /**
     * 检测，可与其它能力结合使用
     */
    CAPACITY_DETECTION = 1 << 0,
    /**
     * 活体，可与其它能力结合使用
     */
    CAPACITY_LIVENESS = 1 << 1,
    /**
     * 抽特征，可与其它能力结合使用
     */
    CAPACITY_FEATURE = 1 << 2,
    /**
     * 比对，可与其它能力结合使用
     */
    CAPACITY_VERIFY = 1 << 3,
    /**
     * 本地MTee环境比对
     * 不可与其他类型结合使用
     */
    CAPACITY_VERIFY_TEE = 1 << 4,
    
    /**
     * 嘴部模型
     */
    CAPACITY_MOUTH = 1 << 5
};

/**
 * 人脸库加载失败的原因
 */
enum FEATURE_STORE_ERROR_CODE {
    /**
     * 成功
     */
    STORE_SUCCESS = 0,
    /**
     * 失败：未知原因
     */
    STORE_FAILED_UNKNOWN = 1,
    /**
     * 失败：feature版本错误
     */
    STORE_FAILED_VERSION_ERROR = 2,
    /**
     * 失败：无效的feautre
     */
    STORE_FAILED_INVALID_FEATURE = 3,
    /**
     * 失败：人脸库过大
     */
    STORE_FAILED_OVERSIZE = 4
};

enum ToygerLog{
    Toyger_Log_VERBOSE = 2,
    Toyger_Log_DEBUG = 3,
    Toyger_Log_INFO = 4,
    Toyger_Log_WARN = 5,
    Toyger_Log_ERROR = 6,
    Toyger_Log_ASSERT = 7,
    Toyger_Log_Performance = 8,
};

enum TGMessage{
    TG_Message_Image_Perfect = 0,
    TG_Message_No_Face,
    TG_Message_Distance_Too_Far,
    TG_Message_Distance_Too_Close,
    TG_Message_Face_Not_In_Center,
    TG_Message_Bad_Pitch,
    TG_Message_Bad_Yaw,
    TG_Message_Is_Moving,
    TG_Message_Bad_Brightness,
    TG_Message_Bad_Quality,
    TG_Message_Bad_Eye_Openness,
    TG_Message_Blink_Openness,
    TG_Message_Stack_Time,
    TG_Message_Depth_Damage,
    TG_Message_Left_Yaw_Guide,
    TG_Message_Right_Yaw_Guide,
    TG_Message_Mouth_Open_Guide,
    TG_Message_Lip_Move_Guide,
    TG_Message_Photinus_Guide,
    TG_Message_Face_Too_More,
    TG_Message_Target_Too_Far,         // 离目标区域太远
    TG_Message_Target_Too_Close,       // 离目标区域太近
    TG_Message_Calibrate_Too_Far,      // 离校准区域太远
    TG_Message_Calibrate_Too_Close,    // 离校准区域太近
    TG_Message_NearFar_Collect,        // 远近人脸采集中
    TG_Message_Face_Not_In_Postion     // 人脸位置不在要求区域中

};

enum TGStaticMessage{
    TGStaticMessage_NoLiveness = 0,
    TGStaticMessage_BlinkLiveness,
    TGStaticMessage_LeftYawLiveness,
    TGStaticMessage_RightYawLiveness,
    TGStaticMessage_MouthOpenLiveness,
    TGStaticMessage_LipMoveLiveness,
    TGStaticMessage_PhotinusLiveness,
    TGStaticMessage_NearFarLiveness
};

enum TGActionLiveness{
    TG_Action_None = 0,
    TG_Action_Blink,
    TG_Action_Left_YAW,
    TG_Action_Right_YAW,
    TG_Action_Mouth_Open,
    TG_Action_Lip_Move,
    TG_Action_Photinus,
    TG_Action_NearFarLiveness,
    TG_Action_EquipmentLiveness
};

enum TGSDKMessageCode {
    /**
     * 炫彩模块炫彩动作结束
     */
    TG_Action_Photinus_Finish = 99,
    /**
     * 额外采集信息签名
     */
    TG_Action_Sign_Collect_Infos = 100,
    /**
     * 采集密钥签名
     */
    TG_Action_Sign_Infos = 101,
    /**
     * 人脸采集区域更新
     */
    TG_Action_Face_Region_Update = 102,
};

struct TGIRect{
    int left;
    int top;
    int right;
    int bottom;
};

struct TGFRect
{
    float left;
    float top;
    float right;
    float bottom;
};

struct TGPoint
{
    float x;
    float y;
};

struct TGDetectState
{
    /**
     * 重试次数
     */
    int retryTimes = 0;

    /**
     * UI层展示的多做类型
     */
//    TGActionLiveness _ui_show_action = TG_Action_None;
    /**
     * 是否可以选取高清图
     */
//    bool _can_choose_high_quality_image = true;

    /**
     * 高清图获取成功是否可以结束流程
     */
//    bool _can_complete_when_capture_done = true;

    /**
     * 是否可以连续检测动作
     */
//    bool _can_continue_detect_action = true;
    /**
     * 炫彩是否完成
     */
    bool _is_photinus_finish = false;
};

struct TGQualityConfig
{
    int max_face_num = 3;
    int detect_face_num = 1;
#ifdef LADYBIRD_SELECTOR
    int face_distance_threshold = 80;
#endif
#ifdef DRAGONFLY_SELECTOR
     int face_distance_threshold = 150;
#endif
    int max_face_distance = 700;
    float min_brightness = 0.3;
    float min_face_width = 0.25;
    float min_integrity = 0.9;
    float min_pitch = -0.2;
    float max_pitch = 0.2;
    float min_yaw = -0.2;
    float max_yaw = 0.2;
    float max_gaussian = 0.15;
    float max_motion = 0;
    float min_quality = 20;
    float min_iod = 0.18;
    float max_iod = 0.45;
    float stack_time = 2.f;
    float blink_openness = 0.1;
    float eye_openness = 0.25;
    float eye_occlusion = 0.8;
    float lip_motion = 0.15;
    float quality_depth_min_quality = 0.5;
    int depth_cache_num = 2;
    int detectImageFormat;//BGRA = 2, BGR= 4，GRAY = 0,
    int detectMode = 0;//0是全检测模式，1是分阶段检测模式
    bool detectImageLight = false; // 是否启用人脸亮度检查，打开后[img_light, 208]范围内的人脸才能够通过
    int img_light = 82; //detectImageLight打开时有效，注意修改的只是人脸合法亮度范围的下限
    int max_image_light = 208; //启用人脸亮度检查时，人脸合法亮度的上限
    bool uploadMultiFace = false; //90版本需求，是否上传多人脸信息
    bool enableAttrDetect = false; //是否检测人脸属性
    
    // 远近活体采集要求
    std::vector<float> calibrationMinRegion;
    std::vector<float> calibrationMaxRegion;
    std::vector<float> targetRegion;
    std::vector<float> targetRegionTolerance;
    float nearFarStackTime = 0.2f;
    float nearFarMaxStackTime = 0.2f;
    float calibrationStackTime = 0.0f;
    float targetStackTime = 0.0f;

};

struct TGCaptureConfig {
    bool pictureSameAsVerify = false; // 采集的图片按照最佳图效果
    bool videoCapture = false;        // 是否开启视频采集
    bool videoMeta = true;        //
    int videoFrameCount = 30;         // 视频采集帧数
    bool recordAllFrame = false;
    std::vector<int> pictureSequence; // 采集帧序列
    std::vector<int> pictureToApp;    // 是否返客
    TGFRect faceRegion = {0, 0, 0, 0};            // 人脸区域采集要求
    TGFRect faceRegionTolerance = {0, 0, 0, 0};   // 人脸区域采集可浮动值

    std::string toString() {
        std::string toString = "{\"videoCapture\":" + std::to_string(videoCapture);
        toString += ",";
        toString += "\"videoFrameCount\":" + std::to_string(videoFrameCount);
        toString += ",";
        toString += "\"pictureSequence\":" + std::to_string(pictureSequence.size());
        toString += ",";
        toString += "\"pictureToApp\":" + std::to_string(pictureToApp.size());
#ifdef DEBUG
        if (pictureSequence.size() > 0) {
            toString += ",";
            toString += "\"pictureSequenceContent\":" + std::accumulate(std::next(pictureSequence.begin()), pictureSequence.end(),
                                                                        std::to_string(pictureSequence[0]),
                                                                        [](const std::string& a, int b) {
                                                                            return a + " " + std::to_string(b);
                                                                        });
        }

        if (pictureToApp.size() > 0) {
            toString += ",";
            toString += "\"pictureToAppContent\":" + std::accumulate(std::next(pictureToApp.begin()), pictureToApp.end(),
                                                                     std::to_string(pictureToApp[0]),
                                                                     [](const std::string& a, int b) {
                                                                         return a + " " + std::to_string(b);
                                                                     });
        }
        
        toString += "\"faceRegion\":[" + std::to_string(faceRegion.left) + "," + std::to_string(faceRegion.top) + "," + std::to_string(faceRegion.right) + "," + std::to_string(faceRegion.bottom) + "," + "]";

        toString += "\"faceRegionTolerance\":[" + std::to_string(faceRegionTolerance.left) + "," + std::to_string(faceRegionTolerance.top) + "," + std::to_string(faceRegionTolerance.right) + "," + std::to_string(faceRegionTolerance.bottom) + "," + "]";
#endif
        toString += "}";
        return toString;
    }
};

struct TGCommonConfig{
    int optional_face_count = 0;      // 备选人脸图数量
    int each_action_pick_count = 0;   // 每个动作需要备选人脸图数量
    int log_level = 0;                    //0 - None, 1 - light, 2 - heavy
    int product_code;
    int useXNN = 0;
    int speed = 100;
    bool auto_complete = true;
    std::string xnn_engine_config = "common:cpunum=2,xnnnextgen=1|xNNSec:enginenames=xInt8$";// xnn init config for wallet
    std::map<std::string, TGCaptureConfig> captureConfigs;  // 额外数据采集配置
    bool canContinueDetectAction = true;
    bool hasBlobConfig = true;
    bool videoEvidenceFromApp = false;
    std::string extraConfig = "";
    int retry = 0;
    std::string deviceName = "";
};
#ifdef ZDOC
struct TGDocConfig{
    int algoType;
    int exposure;
    int blur;
    int card_detect_score;
    
    int rotate_times;
    int top_left_x;
    int top_left_y;
    int bottom_right_x;
    int bottom_right_y;
    int face_side_sharpness;
    int verso_side_sharpness;
    int papers_sharpness;

    int face_side_exposure;
    int verso_side_exposure;
    int papers_stability;
    
    float corners[8] = {0.};    //frame四个角点坐标，tl.x tl.y, tr.x, tr.y, br.x br.y bl.x bl.y
    int thickness;              //算法阈值
    float boundaryThreshold;
    int stackTime;
};
#endif
struct TGLivenessConfig
{
    std::string liveness_combinations = "NoLiveness"; //`#` seperated liveness methods<fpp_blink#yunqi_blink#dragonfly#gemini>
    std::string collection; //`#` seperated liveness methods<fpp_blink#yunqi_blink#dragonfly#gemini>
    float bat_min_score;
    float dragonfly_min;
    float dragonfly_max = 0.5;
    float gemini_min;
    float gemini_max;
    float eye_occlusion_threshold = 0.8;
    float eye_blink_threshold = 0.2;
    float lip_motion_threshold = 0.15;
    bool fpp_pre_processed = false;
    int faceActionType;
    bool detect_before_nano;
    unsigned int dragonfly_retry_limit = 0;
    std::vector<std::string> photinus_color;
};

struct TGCameraConfig
{
    float color_intrin[3 * 3];
    float depth_intrin[3 * 3];
    float color2depth_extrin[4 * 4];
    TGIRect roiRect;
    bool isAligned;
    bool isMirror;
};

struct TGConfig
{
    TGQualityConfig quality_config;
    TGLivenessConfig liveness_config;
    TGCameraConfig camera_config;
    TGCommonConfig common_config;
};

#ifdef ZDOC
enum TGDocType{
    TG_Doc_Type_Common = 0,
    TG_Doc_Type_ID_Card,
    TG_Doc_Type_Driver_License,
    TG_Doc_Type_Vehicle_License,
};

enum TGDocPageNo{
    TG_Doc_Page_NO_ONE = 1,
    TG_Doc_Page_NO_TWO = 2,
};
#endif


enum TGFrameFormat
{
    TG_Frame_Format_YUV = 0,
    TG_Frame_Format_BGRA = 1,
    TG_Frame_Format_BGR = 2,
    TG_Frame_Format_RGBA = 3,
    TG_Frame_Format_RGB = 4,
    TG_Frame_Format_Gray_8 = 5,
    TG_Frame_Format_Gray_16 = 6,
    TG_Frame_Format_DEPTH = 1024,
    TG_Frame_Formate_Unknown = 9999,
};

enum TGFrameType
{
    TG_Frame_Light = 0,
    TG_Frame_Dark,
    TG_Frame_Depth,
    TG_Frame_IR,
    TG_Frame_Nano,
    TG_Frame_Gray_Nano,
    TG_Frame_Unknown = 9999,
};

class TGFrame
{
public:
    TGFrame();
    TGFrame(int w, int h, int angle, TGFrameFormat color_space, TGFrameType brightness);
    TGFrame(unsigned char *data, int w, int h, int angle, TGFrameFormat color_space, TGFrameType brightness, std::string rgb, bool copy = true, std::string md5 = "", std::string metaData = "");
    ~TGFrame();
    TGFrame(const TGFrame &src);
    TGFrame& operator=(const TGFrame &src);
    TGFrame clone() const;
    bool empty() const;
    unsigned char *image_data;
    long data_len;
    int width;
    int height;
    int bytesPerRow;
    int rotation;
    std::string md5 = "";
    TGFrameFormat format;
    TGFrameType frame_type;
    std::string rgb;
    std::string meta_data = "";
private:
    int getDataLen() const;
    void Ref();
    int UnRef();
    bool _own;
    int *_use = nullptr; // todo: not thread safe
};

struct TGLivenessVideoMetadata {
    
    std::string deviceName = "";     // 设备名称
    std::string lightSensorConfig = ""; // 传感器信息
    std::string sdkVersion = "1.0.0";      // SDK版本
    
    std::string dataSource = "antfincloud-production-ios-2";

    std::vector<std::string> frameMetadataList;  // 采集的帧数据
    std::vector<std::tuple<int,int,int>> rgbList;
    int videoWidth = 0;    // 视频宽度
    int videoHeight = 0;   // 视频高度
    int rotateAngle;        // 帧旋转角度
    float totalTime = 0;   // 开始到结束耗时 ms
    float videoTime = 0;   // 视频生成的耗时 ms
};

#pragma mark - Face

struct TGFaceAttr
{
    int face_id = -1;
    bool has_face;
    bool eye_blink;
    TGFRect face_region;
    float quality;
    float yaw;
    float pitch;
    float gaussian;
    float motion;
    float brightness;
    float integrity;
    // 左眼分数、最大最小值
    float left_eye_blink_ratio;
    float left_eye_blink_ratio_min;
    float left_eye_blink_ratio_max;
    // 右眼分数、最大最小值
    float right_eye_blink_ratio;
    float right_eye_blink_ratio_min;
    float right_eye_blink_ratio_max;
    short distance;
    float keypts[10];

    //2018年03月31日 新增属性 - 守逸
    bool eye_open;
    float confidence;
    float deepLiveness;
    float iodRatio;
    float roll;
    float depthQuality;
    
    float left_eye_occlusion_score;
    float right_eye_occlusion_score;

    int gender;
    float age;

    //人脸亮度 [82,208]区间内是可通过人脸，下限亮度可以通过ToygerQualityConfig.img_light参数控制
    float light;

    /* 在执行detect阶段时，同一张图片上发现的总的人脸个数，上传服务端供风控环节使用*/ 
    int faceCount;
    /* 上传多人脸位置信息时，最多上传3张人脸的位置，首选的人脸在face_region中已存，这里再存最多2张人脸。
    [left, top, right, bottom], [left, top, right, bottom]。如果四个位置都为0，说明该张人脸没有检出，不能上传
    */
    float otherFacePos[8];
    /*
    保存到otherFacePos中的人脸个数。可取值范围为[0,2]
    */
    int otherFaceCount;
    
    bool yaw_left;
    
    bool yaw_right;
    
    bool mouth_open;
    
    bool lip_movement;
    // 当前展示的Action
    TGActionLiveness ui_show_action = TG_Action_None;
    
    bool photinus_finish;
    // 当前动作索引
    long action_index;
    // 属性记录的时间
    long record_time;
    // 最佳图选择完成是否可结束当前动作
    bool canCompleteWhenCaptureDone;
    // 人脸区域占比
    float faceAreaRegionRatio = 0.;
};

struct TGFaceState
{
    TGMessage tip_message = TG_Message_No_Face;
    TGStaticMessage static_message;
    bool has_face;
    int brightness;
    int distance;
    bool face_in_center;
    bool is_moving;
    bool good_quality;
    int good_pitch;
    int good_yaw;
    /**
     * 人脸图片的亮度是否在TGQualityConfig的配置范围内. 0表示当前人脸图片亮度合法，非0代表不合法。这种与一般习惯不同的用法是为了和其他good_xxx的判断方法保持一致！
     */
    int good_img_light;
    bool eye_openness;
    bool blink_openness;
    float current_progress;
    
    // 目标人脸
    float targetFaceRegion = 0;
};


enum TGEventCode{
    TG_Event_Code_Monitor = 2,
    TG_Event_Code_Log = 1,
    TG_Event_Code_Dark_Screen = -1,
    TG_Event_Code_RGB_Frame_Corrupted = -2,
    TG_Event_Code_Depth_Frame_Corrupted = -3,
    TG_Event_Code_Nano_Generate_Failed = -13,
    TG_Event_Code_Nano_Generate_Success = -14,
    TG_Event_Code_Dragonfly_Liveness_Failed = -15,
    TG_Event_Code_Dragonfly_Liveness_Success = -16,
    TG_Event_Code_Select_Face_End = -17,
    TG_Event_Code_ReDetect_Face_Start = -30,
    TG_Event_Code_ReDetect_Face_End = -31,
    TG_Event_Code_Pegasus_Liveness_End = -32,
    TG_Event_Code_Action_Liveness_blink_End = -42,
    TG_Event_Code_Action_Liveness_Reset = -43,
    TG_Event_Code_Action_Liveness_End = -45,
    TG_Event_Code_Photinus_RGBChanged = -46,
};

struct TGFaceInfo
{
    TGFrame frame;
    TGFaceAttr attr;
    TGFrame jpegFrame;     // jpeg数据
    TGFrame encryptFrame;  // 帧加密数据
    std::vector<std::pair<std::string, std::vector<struct TGFaceInfo>>> pictures;     // 图片jpeg序列（已加密）
    std::vector<std::pair<std::string, std::vector<struct TGFaceInfo>>> videoFrames;  // 视频帧序列
    std::map<std::string, std::string> videoMeta;  // 视频帧序列
};

struct TGDepthFaceInfo
{
    TGFrame frame;
    TGFaceAttr rgb_attr;
    TGFaceAttr depth_attr;
};

enum TGDataType{
    TG_DATA_TYPE_GYRO = 0,
    TG_DATA_TYPE_PEGASUS = 1,
};

struct TGDataInfo
{
    std::vector<unsigned char> rawData;
    TGDataType dataType;
};

#ifdef ZDOC

#pragma mark - Doc

struct TGDocAttr
{   

};


struct TGDocState
{
    float top_score;
    float bottom_score;
    float left_score;
    float right_score;
    
    bool top_ok;
    bool bottom_ok;
    bool left_ok;
    bool right_ok;
};

struct TGDocInfo{
    TGFrame frame;
    TGDocAttr attr;
};
#endif

struct TGSDKInfo {
    std::string code_version;
    std::string model_version;
    int max_face_count;
};

struct TGFeatureStoreResult {
    int error_code;
    std::vector<std::string> failed_face_id;
};
struct ToygerCallback{
    void *cb_receiver;
    void (*handleCaptureCompleted)(void *cb_receiver, int result,const std::vector<TGFaceInfo>&info,const std::map<std::string, float> &ext);
    void (*handleBestImageUpdate)(void *cb_receiver, int result,const std::vector<TGFaceInfo>&info,const std::map<std::string, float> &ext);
    void (*handleFaceInfoReady)(void *cb_receiver, const std::vector<TGFaceInfo> &infos, const TGFaceAttr &attr);
    void (*handleFaceStateUpdated)(void *cb_receiver,const TGFaceState &state, const TGFaceAttr &attr);
    void (*handleEventTriggered)(void *cb_receiver, int event_code, const char *log, const unsigned char *buffer, int buffer_length);
    void (*handleLog)(void *cb_receiver,int logLevel, const std::map<std::string, std::string> &logInfo);
    bool (*handleModelLoad)(void *cb_receiver, Capacity capacity_mask);
#if  (defined IR) || (defined BAT)
    void (*handleDepthInfoReady)(void *cb_receiver, const std::vector<uint8_t> &depthBlobInfo);
    void (*handleInfraRedInfoReady)(void *cb_receiver, const TGFrame &infraRedFrame);
    TGPoint (*handleAlignDepthPoint)(void *cb_receiver, TGPoint pt);
#endif

#if  (defined HUMMINGBIRD) || (defined JASMINE)
    void (*handleFeatureGenerated)(void *cb_receiver,int status,std::vector<float> &featureData);
    void (*handleFeatureSave)(void *cb_receiver,int status,std::vector<float> &featureData);
#endif
    
#ifdef ZDOC
    void (*handleScanCompleted)(void *cb_receiver, const TGDocState &state,const TGFrame &frame);
    void (*handleDocStateUpdated)(void *cb_receiver, const TGDocState &state, const TGDocAttr &attr);
#endif
};

struct DetectedFaceInfo{
    TGFaceAttr face_attr;
    TGIRect rgb_face_rect;
    TGIRect depth_face_rect;
};


/**
 Toyger C++ 初始化接口

 @param model 传入的模型
 @param license 传入的license
 @param bundleid 传入的bundle id
 @param tg_instance 传入的需要被赋值的 tg_instance
 @param algorithm_mask 需要运行的算法
 @param capacity_mask 启动的人脸算法能力
 @return 初始化是否成功
 */
bool tg_init(const std::vector<uint8_t> &model, std::vector<uint8_t> &moutModel, const std::string &license, const std::string &bundleid,
             void **tg_instance, ToygerAlgorithm algorithm_mask, int capacity_mask);

bool tg_load_model(void *tg_instance,const std::vector<uint8_t> &faceModel, std::vector<uint8_t> &moutModel, Capacity modelCapacity);

/**
 配置Toyger算法

 @param tg_instance 传入的算法实例
 @param callback 回调
 @param cb_receiver 接受回调的对象
 @param config 传入的配置
 */
void tg_config(void *tg_instance, ToygerCallback *callback, void *cb_receiver, const TGConfig &config);


#ifdef ZDOC
/**
 配置Toyger 证件算法

 @param tg_instance 传入的算法实例
 @param callback 回调
 @param cb_receiver 接受回调的对象
 @param config 传入的配置
 @return 配置是否成功
 */
bool tg_config(void *tg_instance, ToygerCallback *callback, void *cb_receiver, const TGDocConfig &config);
#endif
/**
 处理每一帧数据

 @param tg_instance 传入的算法对象
 @param frames 需要处理的RGB 帧
 @param depthFrame 需要处理的深度帧
 @param fpp_attr 经过fpp算法检测后的人脸属性
 @return 是否数据完整
 */
bool tg_process_image(void *tg_instance, const std::vector<TGFrame> &frames, const TGFrame &depthFrame, const TGFaceAttr &fpp_attr);

#if defined JASMINE
/**
 * 1:N 人脸比对
 * @param tg_instance 传入的算法对象
 * @param topN 取前N个满足阈值的人脸库
 * @param threshold 比对阈值
 * @param faceSearchResult
 * @return 成功或失败
 */
bool tg_verify_feature(void *tg_instance,
                       int topN,
                       float threshold,
                       std::vector<FaceSearchResult> &faceSearchResult);
/**
 * @param tg_instance 传入的算法对象
 * @param faceDatabase 人脸库
 * @return 成功或失败
 */
bool tg_load_feature_database(void *tg_instance,
                              const std::vector<FaceItem> &faceDatabase);
/**
 * @param tg_instance 传入的算法对象
 * @return 成功或失败
 */
bool tg_release_feature_database(void *tg_instance);

#endif
#ifdef HUMMINGBIRD

std::vector<float> tg_extract_feature(void *tg_instance);

std::vector<float> tg_detect_extra_feature(void *tg_instance);

void tg_verify_score(void *tg_instance, std::vector<float> tempFeature,  float &score, double &far);
#endif
/**
 Toyger算法重置

 @param tg_instance 传入的算法对象
 */
void tg_reset(void *tg_instance);

/**
 释放Toyger算法

 @param tg_instance 传入的算法实例
 */
void tg_release(void *tg_instance);

/**
 * 获取sdk版本号
 * @return TGSDKVersion
 */
TGSDKInfo tg_get_sdk_info();

std::map<std::string, std::string> tg_get_runtime_info(void *tg_instance);


void tg_set_xnn_handle(void *handle);

std::vector<TGDataInfo> tg_get_collection_data(void *tg_instance);

std::string tg_update_native_status(void *instance, int action_code, const std::string &message);
