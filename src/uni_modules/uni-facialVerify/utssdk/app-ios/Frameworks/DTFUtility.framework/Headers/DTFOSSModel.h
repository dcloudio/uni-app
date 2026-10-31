//
//  DTFOSSModel.h
//  DTFUtility
//
//  Created by 汪澌哲 on 2023/10/22.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DTFOSSModel : NSObject
@property (nonatomic, copy) NSString *accessKeyId;
@property (nonatomic, copy) NSString *accessKeySecret;
@property (nonatomic, copy) NSString *securityToken;
@property (nonatomic, copy) NSString *endpoint;
@property (nonatomic, copy) NSString *bucket;
@property (nonatomic, copy) NSString *fileNamePrefix;

@property (nonatomic, strong) NSNumber *useBackup;
@property (nonatomic, copy) NSString *backupOssEndPoint;
@property (nonatomic, copy) NSString *backupBucketName;

+ (instancetype)defaultModel;

- initWithId:(NSString *)keyId keySecret:(NSString *)keySecret token:(NSString *)token endpoint:(NSString *)endpoint bucket:(NSString *)bucket prefix:(NSString *)prefix backupEndpoint:(NSString *)backupEndpoint backupBucket:(NSString *)backupBucket;

- initWithDictionary:(NSDictionary *)dictionary;

- (NSDictionary *)dictionary;

- (BOOL)supportedBackup;

@end
