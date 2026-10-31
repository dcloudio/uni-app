//
//  NSString+DTFBase64.h
//  DTFUtility
//
//  Created by 汪澌哲 on 2023/1/3.
//  Copyright © 2023 com.DTF.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSString (DTFBase64)
/**
 *  转换为Base64编码
 */
 - (NSString *)dtf_base64EncodedString;

 /**
 *  将Base64解码
 */
 - (NSString *)dtf_base64DecodedString;

@end

NS_ASSUME_NONNULL_END
