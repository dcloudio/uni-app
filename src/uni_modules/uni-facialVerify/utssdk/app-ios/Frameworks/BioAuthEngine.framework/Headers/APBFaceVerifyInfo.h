//
//  APBFaceVerifyInfo.h
//  BioAuthEngine
//
//  Created by 晗羽 on 28/02/2018.
//  Copyright © 2018 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface APBFaceVerifyInfo : NSObject

@property(nonatomic,strong)NSString* dtfDeviceToken;

+ (instancetype)getInstance;

//获取语言类型
- (NSInteger)languageCode;

- (NSString *)languageName;

//在某些未初始化设备指纹的地方提供初始化接口
- (void)initDeviceInfo;

//获取apdidtoken
- (NSString *)getApdidToken;


- (BOOL)loadDylib;

- (UIViewController *)currentVC;

@end
