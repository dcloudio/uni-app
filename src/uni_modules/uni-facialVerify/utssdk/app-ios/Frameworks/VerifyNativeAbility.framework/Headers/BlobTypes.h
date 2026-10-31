//
// Created on 2024/4/2.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#ifndef HARMONYFACEVERIFY_BLOBMODEL_H
#define HARMONYFACEVERIFY_BLOBMODEL_H

#include "dt_json11.hpp"
#include <string>

namespace dtf {

    struct ImageTypeConstant {
        static const int YUV;
        static const int RGB;
        static const int BGRA;
        static const int RGBA;
        static const int BGR;
    };

    struct BlobConstant {
        static const std::string BLOB_VERSION;
        static const std::string SUB_TYPE_PANO;
        static const std::string BLOB_ELEM_TYPE_FACE;
        static const std::string SUB_TYPE_VERSION;
        static const std::string PUB_KEY_N;
        static const std::string PUB_KEY_E;
    };

    struct BlobPackConstant {
        static const std::string EXT_NAME;
    };

#ifdef DT_REQUEST_BLOB

    struct MetaConstant {

        static const std::string VAL_TYPE_FACE;

        static const std::string KEY_INVTP_TYPE;
        static const std::string KEY_BIS_TOKEN;
        static const std::string KEY_EXTRA_RETRY;
        static const std::string KEY_EXTRA;
        static const std::string KEY_DRAGONFLY;
        static const std::string KEY_DRAGONFLY_PASS;
        static const std::string KEY_PHOTINUS_VIDEO_OSS_NAME;
        static const std::string KEY_PHOTINUS_METADATA_OSS_NAME;

        static const std::string VAL_INVTP_TYPE_NORMAL;

        //         static constexpr int VAL_DRAGONFLY_PASS_SUCCESS = 1;

        static constexpr int VAL_SERIALIZER_JSON = 1;
        static constexpr int VAL_SERIALIZER_PB = 2;
        
        //TS层传入的参数key
        static const std::string PARAM_PHOTINUS_VIDEO_OSS_NAME;
        static const std::string PARAM_PHOTINUS_METADATA_OSS_NAME;
        static const std::string PARAM_BLOB_USE_NATIVE_SWITCH;
    };

#endif

    struct Point {
        double x;
        double y;
    };

    struct Rect {
        double left;
        double right;
        double top;
        double bottom;
        Rect() {}
        Rect(double left, double right, double top, double bottom) {
            this->left = left;
            this->right = right;
            this->top = top;
            this->bottom = bottom;
        }
    };

    struct Image {
        uint8_t *data = nullptr;
        int rotation;
        double width;
        double height;
        long len = 0;
        int format;
        bool encrypted = false;
        std::string base64 = "";
        std::string md5 = "";
    };

#ifdef DT_REQUEST_BLOB

    struct BlobMeta {
        std::string type;
        std::map<std::string,std::string> collectInfo;
        std::map<std::string, int> score;
        int serialize;
        std::string invtp_type; 
        std::string bistoken; 
        std::map<std::string,std::string> extInfo;
    };

    struct BlobElem {
        BlobElem(){}
        std::string type;
        std::string subType;
        int idx;
        std::string version;
        std::string content;
    };

#endif

} // namespace dtf

#endif //HARMONYFACEVERIFY_BLOBMODEL_H
