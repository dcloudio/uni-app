//
//  ZIMResponse.h
//  DTFIdentityManager
//
//  Created by yukun.tyk on 28/06/2017.
//  Copyright © 2017 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSUInteger, ZIMResponseCode) {
    ZIMResponseSuccess  = 1000,     //采集成功并且服务端成功(人脸比对成功，或者证件宝服务端OCR/质量检测成功)[zim不会弹框处理]
    ZIMInternalError    = 1001,     //用户被动退出(极简核身没有取到协议、toyger启动失败、协议解析失败)[zim不会弹框处理]
    ZIMInterrupt        = 1003,     //用户主动退出(无相机权限、超时、用户取消)[zim会弹框处理]
    ZIMNetworkfail      = 2002,     //网络失败(标准zim流程，请求协议错误，oss上传失败)[zim不会弹框处理]
    ZIMTIMEError        = 2003,    //设备时间设置不对
    ZIMResponseFail     = 2006     //服务端validate失败(人脸比对失败或者证件宝OCR/质量检测失败)[zim不会弹框处理]
};

@interface ZIMResponse : NSObject

@property(nonatomic, assign, readonly)ZIMResponseCode code;
@property(nonatomic, assign, readonly)ZIMResponseCode retCode;
@property(nonatomic, copy, readonly)NSString * _Nullable reason;
@property(nonatomic, copy, readonly)NSString * _Nullable retCodeSub;
@property(nonatomic, copy, readonly)NSString * _Nullable retMessageSub;
@property(nonatomic, strong)NSDictionary * _Nullable extInfo;
@property(nonatomic, strong, readonly)NSString * _Nullable bizData;
@property(nonatomic, strong) NSString* _Nullable deviceToken; //设备token
@property(nonatomic, strong, nullable) NSString *videoFilePath;  //如果采用视频返照，这个字段返回视频的路径
@property(nonatomic, strong, nullable) NSString *photinusVideoFilePath;  // 炫彩视频的本地路径
@property(nonatomic, strong ,nullable) NSData *imageContent;  //这个字段返回采集照片
@property(nonatomic, strong ,nullable) NSMutableArray *cardImageContent;  //ekyc返回证件array
@property(nonatomic, strong ,nullable) NSMutableArray *faceImageContent;
@property(nonatomic , strong ,nullable)NSData *faceData; //OCR身份证人像面照片 ，只有在OCR模式下，才有值
@property(nonatomic , strong ,nullable)NSData *countryData; //OCR身份证国徽面照片，只有在OCR模式下，才有值



-(instancetype _Nullable )initWithResponseCode:(ZIMResponseCode) code
                            retCode:(ZIMResponseCode) retCode
                                    retCodeSub:(NSString *_Nullable) retCodeSub
                                 retMessageSub:(NSString *_Nullable) retMessageSub
                                        reason:(NSString *_Nullable) reason
                                      extParam:(NSDictionary *_Nullable) extInfo
                                       bizData:(NSString *_Nullable) bizData;

@end
