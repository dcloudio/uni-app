#ifndef BLOBPACKCONTROLLER_H
#define BLOBPACKCONTROLLER_H

#include <vector>
#include <map>
#include "dt_json11.hpp"
#include "BlobManager.h"
#include "BlobTypes.h"
#include "DTEncrypt.h"

using namespace std;

namespace dtf {

    class BlobPackController {
    public:
        BlobPackController();

        ~BlobPackController();

        /**
         * @brief config 配置数据打包控制器
         * @param config 图像压缩率&密钥等数据
         */
        void config(BlobConfig &config);

         /**
          * @brief cacheBlobContent 缓存人脸识别结果数据
          * @param bestImage 最佳人脸图
          * @param extraImages 额外采集人脸图片（动作：图片序列）
          * @param ext 额外的配置（可不传）
          */
        void cacheBlobContent(FaceFrame &bestImage,
                              vector<pair<string, vector<FaceFrame>>> extraImages = vector<pair<string, vector<FaceFrame>>>(),
                              map<string, string> ext = map<string, string>());

        /**
         * @brief encryptExtraImages 加密额外数据图
         * @param quality 图片质量
         * @return 处理后的照片（动作：原始数据&jpeg图片&加密图片）
         */
        vector<pair<string, vector<FaceFrame>>> encryptExtraImages(float quality = 70);

        /**
         * @brief encryptBestImage 加密最佳人脸图
         * @param quality 图片质量
         * @return 原始数据&jpeg图片&加密图片
         */
        FaceFrame encryptBestImage(float quality = 70);

        /**
         * @brief signCollectionInfo 对CollectInfo签名
         * @param param 额外参数 {"multipic_zfaceBlinkLiveness_video":"123123123123","multipic_LeftYawLiveness_video":"123123123123"}
         * @return 签名加密数据
         */
        string signCollectionInfo(string param);

        /**
         * @brief geneateBlob 生成报文blob
         * @return 认证报文
         */
        string geneateBlob();

        /**
         * @brief getContentSignature 获取ContentSig，RSA加密密钥
         * @return 字符串
         */
        string getContentSignature();

        /**
         * @brief release 数据清除
         */
        void release();

    protected:
        /**
         * @brief encryptImage 图像加密
         * @param frame 帧数据
         * @param quality 图片质量
         * @return
         */
        FaceFrame encryptImage(FaceFrame &frame, float quality = 70);

        /**
         * @brief imageRelease 图片释放
         * @param frame 帧
         */
        void imageRelease(FaceFrame &frame);

        /**
         * @brief generateCollectionInfo 生成CollectInfo信息
         * @param param 外部生成生成CollectInfo
         * @return 补充图片MD5数据后的CollectInfo
         */
        string generateCollectionInfo(string param);

    private:
        /**
         * @brief contentEncrypt 图片内容加密
         */
        DTEncrypt contentEncrypt;
        /**
         * @brief behavelogEncrypt behavelog加密
         */
        DTEncrypt behavelogEncrypt;
        /**
         * @brief bestImage 最佳人脸图
         */
        FaceFrame bestImage;
        /**
         * @brief extraImages 额外数据
         */
        vector<pair<string, vector<FaceFrame>>> extraImages;
        /**
         * @brief blobConfig 报文配置
         */
        BlobConfig blobConfig;
        /**
         * @brief blobContentExtra 额外参数
         */
        map<string, string> blobContentExtra;
    };

}

#endif //BLOBPACKCONTROLLER_H
