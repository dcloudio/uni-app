//
//  BioAuthCryptoManager.hpp
//  BioAuthEngine
//
//  Created by yukun.tyk on 5/16/16.
//  Copyright © 2016  DTF. All rights reserved.
//

#ifndef BioAuthCryptoManager_hpp
#define BioAuthCryptoManager_hpp

#import <Foundation/Foundation.h>
#include <stdio.h>
#import <functional>
#import <Foundation/NSData.h>
#import <Foundation/NSString.h>

namespace DTF {
    
    /**
     *  业务加密结果回调
     *
     *  @param success: 加密是否成功
     *  @param  cipher: 密文
     *  @param  encryptedKey: RSA公钥加密的AES密钥
     */
    typedef std::function<void(bool, NSData *, NSData *)> completionCallback;
    
    class ToygerCryptoManager{
    public:
        /**
         *  1.  随机生成128位AES私钥
         *  2.  利用ASE私钥加密业务数据
         *  3.  利用RSA公钥加密AES密钥
         *
         *  @param content      代价密数据
         *  @param pubKey       RSA公钥
         *  @param callback     加密成功后callback
         */
        static void mixEncrypt(NSData *content, NSString *pubKey, completionCallback callback);
        
        /**
         *  AES加密
         *
         *  @param content      业务数据
         *  @param aesKey       AES密钥
         *
         *  @return             密文，失败则返回Nil
         */
        static NSData *AESEncrypt(NSData *content, NSString *aesKey ,NSUInteger value=0);
        
        //获取md5值
        static NSString *MD5WithData(NSData *data);
        /**
         *  AES解密
         *
         *  @param content      业务数据
         *  @param aesKey       AES密钥
         *
         *  @return             解密后数据，失败则返回Nil
         */
        static NSData *AESDecrypt(NSData *content, NSString *aesKey);
        
        /**
         *  1024位RSA加密
         *
         *  @param content      待加密数据，不得超过128位
         *  @param pubKey       RSA公钥
         *
         *  @return             密文，失败返回nil
         */
        static NSData *RSAEncrypt(NSData *content, NSString *pubKey);
        
        /**
         *  检查数据签名
         *
         *  @param content   业务数据
         *  @param signature 签名信息
         *  @param pubKey    RSA公钥
         *
         *  @return 签名是够正确
         */
        static BOOL checkSign(NSData *content, NSData *signature, NSString *pubKey);
        
        /**
         *  计算MD5
         *
         *  @param str 业务数据
         *
         *  @return MD5值
         */
        static NSString *calculateMD5(NSString *str);
        
        /**
         *  生成UUID
         */
        static NSString *generateUUID();
        
//        /**
//         * RC4编码
//         */
//        static NSData *RC4Crypt(NSData *data, int code);
    
//    private:
        /**
         *  生成随机字符串
         *
         *  @param len 随机字符串长度，最长32个字节
         *
         *  @return 生成的随机字符串
         */
        static NSString *generateToken(NSInteger len);
        
    private:
        static NSData *stripPublicKeyHeader(NSData *pubKey);
        static SecKeyRef addPublicKey(NSString *pubKey);
    };
}

#endif /* BioAuthCryptoManager_hpp */
