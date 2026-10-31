//
//  DTFLanguageManager.h
//  DTFUtility
//
//  Created by 汪澌哲 on 2023/8/3.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef void (^DTFLanguageDownloadCompletionBlock)(NSError * _Nullable error);

NS_ASSUME_NONNULL_BEGIN

@interface DTFLanguageManager : NSObject

@property (nonatomic, strong)NSString *ocrResultStr;
@property (nonatomic, strong)NSString *languageType;

+ (instancetype)sharedInstance;

- (BOOL)checkNeedPreload;
- (BOOL)checkUpdateDocWithVersion:(NSString *)version;
- (BOOL)checkUpdateFaceWithVersion:(NSString *)version;
- (BOOL)checkUpdateGuideWithVersion:(NSString *)version;
- (void)startFaceDownloadWithCompletion:(DTFLanguageDownloadCompletionBlock)completion;
- (void)startDocDownloadWithCompletion:(DTFLanguageDownloadCompletionBlock)completion;
- (void)startGuideDownloadWithCompletion:(DTFLanguageDownloadCompletionBlock)completion;
- (NSString *)getCurrentLanguage;
- (NSString *)getCurrentFullLanguage;
- (NSString *)getFileWithPath:(NSString *)path fileName:(NSString *)fileName;

- (void)initializeLanguageDictionary;

- (NSString *)faceStringWithKey:(NSString *)key;
- (NSString *)docStringWithKey:(NSString *)key;
- (NSString *)guideStringWithKey:(NSString *)key;

@end

NS_ASSUME_NONNULL_END
