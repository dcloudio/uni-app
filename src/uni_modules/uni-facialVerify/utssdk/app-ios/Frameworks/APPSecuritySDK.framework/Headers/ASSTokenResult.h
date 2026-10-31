//
//  ASSTokenResult.h
//  APPSecuritySDK
//
//  Created by xingchen on 15/7/31.
//  Copyright (c) 2015年 Alipay. All rights reserved.
//

#import <Foundation/Foundation.h>

#define  ASSTokenResult      ASSTokenResultCore


@interface ASSTokenResult : NSObject

@property (nonatomic, strong) NSString* vkeyidToken;
@property (nonatomic, strong) NSString* clientKey;
@property (nonatomic, strong) NSString* umidToken;
@property (nonatomic, strong) NSString* vkeyid;

@end


@interface ASSTokenResultOpen: NSObject

@property (nonatomic, strong) NSString* vkeyidToken;
@property (nonatomic, strong) NSString* clientKey;
@property (nonatomic, strong) NSString* vkeyid;

@end

/**
* 感知结果类。
*/
@interface APRiskResult: NSObject

@property (nonatomic) int resCode;
@property (nonatomic, strong) NSString* resInfo;

@end
