//
//  APBUtils.h
//  BioAuthEngine
//
//  Created by richard on 27/08/2017.
//  Copyright © 2017  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#include <sys/param.h>
#include <sys/mount.h>

#define SCREEN_WIDTH                [[UIScreen mainScreen]bounds].size.width                                    //屏幕宽度
#define SCREEN_HEIGHT               [[UIScreen mainScreen]bounds].size.height                                   //屏幕高度

//获取document目录
#define DOCUMENT_PATH               [NSHomeDirectory() stringByAppendingPathComponent:@"Documents"]

//资源文件目录
#define ASSET_PATH                  [DOCUMENT_PATH stringByAppendingPathComponent:@"BioAuth"]

//返回不为nil的string
#define NONE_NIL_STRING(str)        (str ? str : @"")


#define SafeRelease(obj) if(obj){obj=nil;}

//主线程同步操作
#define SYNC_MAINTHREAD_BEGIN           [APBUtils APBMainThread:^{
#define SYNC_MAINTHREAD_END             }];

//pipeInfo线程安全操作
static NSString *const kAPBPipeInfoMutexToken = @"";
static id __apb_thread_safe_object_for_key(NSMutableDictionary *pipeInfo, NSString *key){
    id ret;
    @synchronized(kAPBPipeInfoMutexToken){
        if ([pipeInfo isKindOfClass:[NSMutableDictionary class]] && [pipeInfo objectForKey: key]) {
            ret = [pipeInfo objectForKey:key];
        }
    }
    return ret;
}

//从pipeInfo中获取Object，线程安全
#define THREAD_SAFE_OBJECT_FOR_KEY(pipeInfo, key)   __apb_thread_safe_object_for_key(pipeInfo, key)

//向pipeInfo中添加或修改Object,线程安全
#define THREAD_SAFE_SET_OBJECT_FOR_KEY(pipeInfo, key, value)                                            \
    @synchronized(kAPBPipeInfoMutexToken){                                                                 \
        if ([pipeInfo isKindOfClass:[NSMutableDictionary class]] && key && value) {                     \
            [pipeInfo setObject:value forKey:key];}}

//删除PipeInfo中某个Object，线程安全
#define THREAD_SAFE_REMOVE_OBJECT_FOR_KEY(pipeInfo, key)                                                \
    @synchronized(kAPBPipeInfoMutexToken){                                                                 \
        if ([pipeInfo isKindOfClass:[NSMutableDictionary class]] && [pipeInfo objectForKey: key]) {     \
            [pipeInfo removeObjectForKey: key];}}

//将dict中对应value增加1
#define INCREASE_BY_ONE(pipeInfo, key){                                                                 \
    NSInteger num = [[pipeInfo objectForKey:key]integerValue]+1;                                        \
THREAD_SAFE_SET_OBJECT_FOR_KEY(pipeInfo, key, [NSNumber numberWithInteger:num]);}

//将dict中对应value减1
#define DECREASE_BY_ONE(pipeInfo, key){                                                                 \
    NSInteger num = [[pipeInfo objectForKey:key]integerValue]-1;                                        \
THREAD_SAFE_SET_OBJECT_FOR_KEY(pipeInfo, key, [NSNumber numberWithInteger:--num]);}

#define LOCK(locker, ...) dispatch_semaphore_wait(locker, DISPATCH_TIME_FOREVER); \
__VA_ARGS__; \
dispatch_semaphore_signal(locker);

@interface DTFAlertTextModel : NSObject
@property(nonatomic, copy) NSString *title;
@property(nonatomic, strong) UIColor *titleColor;

@property(nonatomic, copy) NSString *msg;
@property(nonatomic, strong) UIColor *msgColor;

@property(nonatomic, copy) NSString *confirm;
@property(nonatomic, strong) UIColor *confirmColor;

@property(nonatomic, copy) NSString *cancel;
@property(nonatomic, strong) NSString *cancelColor;

@end

NS_ASSUME_NONNULL_BEGIN
@interface APBUtils : NSObject

+ (NSString *)MD5WithData:(NSData *)data;

+ (NSString *)randomString:(NSInteger)len;

+ (BOOL)isWifi;

+ (UIColor*)getColorFromNSString:(NSString*) cString;

+ (NSArray<NSNumber *> *)getRGBFromHexColor:(NSString *)cString;

+ (NSString *)getColorStrFromUIColor:(UIColor *)color;

/**
 *  主线程同步操作，请调用宏版本
 */
+ (void)APBMainThread:(dispatch_block_t)block;

+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString;

+ (NSString*)convertToJSONString:(NSDictionary *)infoDict;

+ (NSString *)currentLanguage;

+ (NSString *)localizedStringForKey:(NSString *)key inBundle:(NSString *)bundle;

+ (NSString *)localizedStringForKey:(NSString *)key;

+ (NSString *)localizedStringForKeyNew:(NSString *)key;

/// h5协议界面拼接语言环境的value
+ (NSString *)getLanguageForUrl;

+ (long long)getTotalDiskSize;

+ (long long)getAvailableDiskSize;

+ (NSString*)deviceVersion;

+ (NSString *)osVersion;

+ (NSString *)appName;

+ (NSString *)appVersion;

+ (NSURL *)returnContentDir;

+ (NSURL *)cacheFileDir;

+ (CGRect)setX:(CGFloat)x forFrame:(CGRect)frame;
+ (CGRect)setY:(CGFloat)y forFrame:(CGRect)frame;
+ (CGRect)setW:(CGFloat)w forFrame:(CGRect)frame;
+ (CGRect)setH:(CGFloat)h forFrame:(CGRect)frame;

+ (UIImage *)flipImage:(UIImage *)image;

+ (NSArray<NSString *> *)supportedActionLivenessArray;

+ (NSArray *)removePairInDictionary:(NSMutableDictionary *)dictionary withCheck:(BOOL(^)(NSString *, NSObject*))checker;

+ (CMVideoDimensions)maxResolution:(AVCaptureDevicePosition) position;

+ (NSDictionary *)evidenceVideoCompressionProperties;

/// 创建支持修改颜色的 alertVc
+ (UIAlertController *)buildAlertWithAlertModel:(DTFAlertTextModel *)model
                                 confirmHandler:(void (^ __nullable)(UIAlertAction * _Nonnull action))confirmHandler
                                  cancelHandler:(void (^ __nullable)(UIAlertAction * _Nonnull action))cancelHandler;


+ (void)alertWithAlertModel:(DTFAlertTextModel *)model
             confirmHandler:(void (^ __nullable)(UIAlertAction * _Nonnull action))confirmHandler
              cancelHandler:(void (^ __nullable)(UIAlertAction * _Nonnull action))cancelHandler
             presentHandler:(void (^ __nullable)(UIAlertController * _Nonnull alertController))presentHandler;

+ (NSString *)retSubMessageForKey:(NSString *)key;

+ (NSString *)codeForKey:(NSString *)key;

+ (NSString *)getAppDisplayName;

+ (void)generateVideoFileWithFileName:(NSString *)fileName
                           imageArray:(NSArray *)imageArr
                             filePath:(NSURL *)filePath
                           outputSize:(CGSize)outputSize
                compressionProperties:(NSDictionary *)compressionProperties
                              handler:(void (^)(NSURL *))handler;

+ (void)genVideoWithFileURL:(NSURL *)url
                 imageArray:(NSArray *)imageArray
                       size:(CGSize)size
      compressionProperties:(NSDictionary *)compressionProperties
                    handler:(void (^)(void))handler;

+ (void)genVideoWithFileURL:(NSURL *)url
                pixcelArray:(NSArray *)pixcelArray
                       size:(CGSize)size
      compressionProperties:(NSDictionary *)compressionProperties
                    handler:(void (^)(void))handler;

+ (void)createWorkingDirectoryWithPath:(NSURL *)filePath error:(NSError **)error;

+ (CVPixelBufferRef)pixelBufferFromCGImage:(UIImage *)image size:(CGSize)size;

+ (NSError *)errorWithErrorDomian:(NSString *)errorDomian extInfo:(NSDictionary *)extInfo errMsgWithFormat:(NSString *)format, ... NS_FORMAT_FUNCTION(3,4);

/// 是否是合法的颜色字符串
/// - Parameter hexString: 16进制数据6位颜色数据，以#号开头
+ (BOOL)validColorHex:(nullable NSString *)hexString;

+ (NSString *)getFaceGuardToken:(NSString *)certifyID;

/// 计算文字宽度
+ (CGFloat)widthForText:(NSString *)text
                withFont:(UIFont *)font
        containerHeight:(CGFloat)containerHeight;

/// 计算文字高度
+ (CGFloat)HeightForText:(NSString *)text
                withFont:(UIFont *)font
          containerWidth:(CGFloat)containerWidth;

/// 是否是中文环境（简体，繁体）
+ (BOOL)isChineseLanguage;

/// 根据语言环境 调整字体大小
+ (CGFloat)fixFontByLanguage:(CGFloat)fontSize;

+ (NSString *)getFaceGuardVersion;

@end

NS_ASSUME_NONNULL_END
