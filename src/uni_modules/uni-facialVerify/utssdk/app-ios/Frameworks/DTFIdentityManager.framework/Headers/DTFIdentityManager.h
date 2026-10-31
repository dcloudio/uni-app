//
//  DTFIdentityManager.h
//  DTFIdentityManager
//
//  Created by mengbingchuan on 2022/11/23.
//  Copyright © 2022 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZimRpcManager.h"
#import <DTFUtility/DTFFaceIdentityProtocol.h>

//version 2.3.34.1

NS_ASSUME_NONNULL_BEGIN

typedef void (^ZIMCallback)(ZIMResponse *response);

@interface DTFIdentityManager : NSObject<DTFFaceIdentityProtocol>

+ (DTFIdentityManager *)sharedInstance;

@end

NS_ASSUME_NONNULL_END
