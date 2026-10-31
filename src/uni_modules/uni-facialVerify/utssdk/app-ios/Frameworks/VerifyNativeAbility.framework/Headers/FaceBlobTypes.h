//
// Created on 2024/4/7.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#ifndef HARMONYFACEVERIFY_FACEBLOBTYPES_H
#define HARMONYFACEVERIFY_FACEBLOBTYPES_H

#include "BlobTypes.h"

namespace dtf {

    struct FaceAttr {
        Rect face_region;
        float quality;
        float confidence;
    };

    struct FaceInfo {
        Rect rect;
        std::vector<Point> points;
        float confidence;
        float quality;
        std::string feature;
        std::string feaVersion;
    };

    struct FaceFrame {
        Image image;
        Image jpegImage;
        Image encryptImage;
        FaceAttr attr;
        std::map<std::string, std::string> extras;
    };

#ifdef DT_REQUEST_BLOB

    struct FaceBlobElem : public BlobElem {
        std::vector<FaceInfo> face_infos;
        std::string return_image; //不加密的返照图
    };

    struct FaceBlob {
        std::string blob_version;
        std::vector<FaceBlobElem> blob_elem;
    };

    struct FaceBlobContent {
        FaceBlob blob;
        BlobMeta meta;
    };

    struct FaceBlobContentResult {
        FaceBlobContent blob;
        std::vector<std::string> blob_content;
        std::vector<std::string> return_image;
    };

#endif
}

class FaceBlobTypes {

};

#endif //HARMONYFACEVERIFY_FACEBLOBTYPES_H
