//
// Created on 2024/4/2.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#ifndef HARMONYFACEVERIFY_BLOBMANAGER_H
#define HARMONYFACEVERIFY_BLOBMANAGER_H

#include "FaceBlobTypes.h"
#include "BlobImageUtil.h"
#include "BlobTypes.h"

namespace dtf {

    struct BlobConfig {
        double compress_rate;
        double desired_width;
        bool need_enc_content;
        bool need_enc_image;
        int retry_count;
        std::string upload_image_type;
        std::string bis_token;
        std::vector<std::string> collection;

        // 加密配置
        int aesKeyLen = 0;
        std::string rsaMod = "";
        std::string rsaExp = "";
        
        void SetDefault();
        void ParseConfig(Json config_json);
    };

#ifdef DT_REQUEST_BLOB

    class BlobManager {

    public:
        BlobConfig config;
        std::string aes_key_cipher;
        std::string aes_key;
        int metaSerializer;
        BlobManager(BlobConfig config);
        ~BlobManager(); 
        virtual FaceBlobContentResult GenerateBlob(std::vector<FaceFrame> &frames, const std::map<std::string, std::string> &ext);
        virtual BlobMeta GenerateMeta(const std::map<std::string, std::string> &ext);
        virtual std::string ToString(FaceBlobContentResult &result);
        std::string ProcessImage(Image &image, Image *out, Image *out_encrypted);
        std::string ProcessImage(Image &image, double compress_rate, Rect roi);
    };

#endif

}

#endif //HARMONYFACEVERIFY_BLOBMANAGER_H
