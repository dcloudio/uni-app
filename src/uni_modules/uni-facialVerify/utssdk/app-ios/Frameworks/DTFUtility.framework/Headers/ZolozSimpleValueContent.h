//
//  ZolozSimpleValueContent.h
//  DTFUtility
//
//  Created by 053508 on 2021/6/9.
//  Copyright © 2021 com. .iphoneclient.DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ZolozSimpleValueContent : NSObject

@property(nonatomic,strong,nullable)NSString * simpleValue;//用于存放Md5值。
@property(nonatomic,assign)NSUInteger length;//用于存放Md5值。
@property(nonatomic,strong,nullable)NSString * simpleOutValue;//用于存放Md5值。
@property(nonatomic,strong,nullable)NSString * simpleEnValue;//用于存放加密后的Md5值。

+ (ZolozSimpleValueContent *)sharedInstance;

@end

NS_ASSUME_NONNULL_END
