//
//  APDeductSDK.h
//  APDeductSDK
//
//  Created by mingsheng on 2024/9/26.
//

#import <Foundation/Foundation.h>
#import "AFServiceCenter.h"

NS_ASSUME_NONNULL_BEGIN
// 代扣SDK版本
extern NSString *const kDeductSDKVersion;

@interface APDeductSDK : NSObject
/**
 *  独立签约
 *
 *  @param signParams            签约字符串
 *  @param schemeStr              调用签约的app注册在info.plist中的scheme
 *  @param universalLink     调用签约的app注册的universalLink
 *  @param block                       签约结果回调Block
 */
+ (void)callDeduct:(NSString *)signParams fromScheme:(NSString *)schemeStr fromUniversalLink:(NSString *)universalLink andCompletion:(AFServiceResultBlock)block;
@end

NS_ASSUME_NONNULL_END
