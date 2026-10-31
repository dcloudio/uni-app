//
// Created by CandleWen on 2023/7/24.
//

#ifndef VERIFY_DTENCRYPT_H
#define VERIFY_DTENCRYPT_H

#include <string>

using namespace std;

namespace dtf
{
    /**
     * AES & RSA 加密以及秘钥加密
     * 人脸数据加密类
     */
    class DTEncrypt
    {
    public:
        /**
         * RSA加密数据
         * @param mod PK modulus
         * @param exp PK exponent
         * @param content 加密内容
         * @param out 输出内容
         * @param out_len 输出长度
         */
        static void rsa_encrypt_content(const string &mod, const string &exp, const string &content,
                                        unsigned char **out, size_t *out_len);

        /**
         * RSA加密数据，返回base64的字符串
         * @param mod PK modulus
         * @param exp PK exponent
         * @param content 加密内容
         */
        static string base64_rsa_encrypt_content(const string &mod, const string &exp, const string &content);

        /**
         * AES加密
         * @param giv
         * @param in 输入内容
         * @param in_len 输入内容长度
         * @param key key
         * @param out 输出内容
         * @param out_len  输出内容长度
         */
        static void aes_encrypt(const string &giv, const unsigned char *in, size_t in_len, const string &key,
                                unsigned char **out, size_t *out_len, uint8_t *iv = 0);

        /**
         * AES解密
         * @param giv
         * @param in 输入内容
         * @param in_len 输入内容长度
         * @param key key
         * @param out 输出内容
         * @param out_len  输出内容长度
         */
        static void aes_decrypt(const string &giv, const unsigned char *in, size_t in_len, const string &key,
                                unsigned char **out, size_t *out_len, uint8_t *iv = 0);

        /**
         * 初始化
         * @param aes_key_len AES加密秘钥长度
         * @param mod RSA公钥modulus
         * @param exp RSA公钥exponent
         */
        DTEncrypt(int aes_key_len, string mod, string exp);

        DTEncrypt();

        /**
         * @brief init 重新初始化key
         * @param aes_key_len key长度
         * @param mod RSA公钥modulus
         * @param exp RSA公钥exponent
         */
        void init(int aes_key_len, string mod, string exp);

        /**
         * aes 加密 key
         * @return
         */
        string get_encrypt_key();

        /**
         * 对Content进行AES加密并返回Base64之后的加密字符串
         * @param content 待加密内容
         * @param content_len 待加密内容长度
         * @return
         */
        string base64_encrypt_content(const unsigned char *content, size_t content_len);

        /**
         * 对content内容进行AES加密
         * @param content 加密内容
         * @return base64之后的加密字符串
         */
        string base64_encrypt_content(const string &content);

        /**
         * @brief DTEncrypt::encrypt_content 对content内容进行AES加密
         * @param content
         * @param content_len
         * @param output_len
         * @return
         */
        unsigned char *encrypt_content(const unsigned char *content, size_t content_len, size_t &output_len);

        /**
         * 对加密且base64之后的字符串进行解密，并做base64返回
         * @param encrypt_content 待解密字符串
         * @return 解密之后base64内容
         */
        string base64_decrypt_content(const string &encrypt_content);

    private:
        /**
         * AES 加密秘钥
         */
        string aes_key;
        /**
         * RSA 对 AES 加密后数据
         */
        string encrypt_base64_key;
        /**
         * AES IV信息
         */
        string giv;
    };
}

#endif // VERIFY_DTENCRYPT_H
