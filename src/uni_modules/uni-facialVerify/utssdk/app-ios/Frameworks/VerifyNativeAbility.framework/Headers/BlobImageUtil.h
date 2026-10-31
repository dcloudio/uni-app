//
// Created on 2024/4/3.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#ifndef HARMONYFACEVERIFY_IMAGEUTILS_H
#define HARMONYFACEVERIFY_IMAGEUTILS_H
#include "BlobTypes.h"
#include "FaceBlobTypes.h"
namespace dtf {
    class ImageUtils {
        public:
            static std::string Rotate(const Image *in, int angle, Image *out);
            static std::string Crop(const Image *in, Rect rect, Image *out);
            static std::string Scale(const Image *in, double x, double y, Image *out);
            static std::string Packing(const Image *in, double compress_rate, Image *out);
            static std::string YUV2RGB(const Image *in, Image *out);
            static std::string BGRA2RGB(const Image *in, Image *out);
            static void Release(Image *image);
    };
}

#endif //HARMONYFACEVERIFY_IMAGEUTILS_H
