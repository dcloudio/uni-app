//
//  APDynamic.h
//  APPSecuritySDK-Sign
//
//  Created by eric on 2021/2/25.
//  Copyright © 2021 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface APDynamic : NSObject

/*
*  dynamicCheckDispatch 动态攻防脚本运行
*
*  @param dict 动态攻防脚本
*/
+ (void)dynamicCheckDispatch:(NSDictionary *)dict;

/*
*  dynamicCheckDispatch 动态攻防脚本运行，动态攻防脚本运行后会自动上传， 无特殊需求不建议
*
*  @param dict 动态攻防脚本
*  @param callback 运行结果回调
*/
+ (void)dynamicCheckDispatch:(NSDictionary *)dict withCallBack: (void(^)(Boolean, NSString *))callback;

@end

NS_ASSUME_NONNULL_END
