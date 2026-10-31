//
//  APBioBisConfigManager.h
//  APFaceDetectBiz
//
//  Created by 晗羽 on 1/7/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "APBToygerRemoteConfig.h"

@interface APBToygerBioBisConfigManager : NSObject
/**
 *  初始化biscfg
 *
 *  @param biscfg pb／json格式
 *
 *  @return 生成一个配置对象
 */
- (instancetype)initWithBisConfig:(NSString *)biscfg;

@property(nonatomic, copy) NSString *protocol;

/**
 *  bisToken
 *
 *  @return 服务端下放的bistoken，每次人脸识别服务端的ID
 */
- (NSString * )bisToken;

- (NSString * )iosvoicecfg;

- (APBToygerSoluCfg *)solucfg;

- (APBToygerRemoteConfig *)bisConfig;

- (int) sampleMode;

- (NSString *) apBioSecPublicKey;

+ (NSDictionary *)getDictfrom:(NSString *) jsonStr;
@end
