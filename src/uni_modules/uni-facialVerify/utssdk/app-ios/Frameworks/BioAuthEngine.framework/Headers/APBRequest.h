//
//  APBRequest.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/9/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <DTFUtility/APBToygerBioBisConfigManager.h>
@class UIViewController;

extern NSString *const kKeepUploadPageKey;                      //extInfo key: 生物识别产品是否要保持上传界面，默认不保持

@interface APBRequest : NSObject

@property(nonatomic, weak, readonly)UIViewController *vc;       //显示的viewController
@property(nonatomic, strong, readonly)APBToygerBioBisConfigManager *protocolModel;         //服务端下发的配置参数
@property(nonatomic, strong, readonly)NSDictionary *extInfo;    //扩展业务参数

- (instancetype)initWithViewController:(UIViewController *)vc
                         protocolModel:(APBToygerBioBisConfigManager *)protocolModel
                               extInfo:(NSDictionary *)ext;

@end
