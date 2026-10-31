//
//  DTFBeanService.h
//  DTFUtility
//
//  Created by mengbingchuan on 2023/6/8.
//  Copyright © 2023 com.alipay.iphoneclient.zoloz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DTFFaceIdentityProtocol.h"
#import "DTFNFCIdentityProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface DTFBeanService : NSObject

@property(nonatomic, strong) id<DTFFaceIdentityProtocol> faceIdentity;
@property(nonatomic, strong) id<DTFNFCIdentityProtocol> nfcIdentity;

+ (DTFBeanService *)sharedInstance;

- (void)setup;

@end

NS_ASSUME_NONNULL_END
