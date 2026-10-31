//
//  ZimJSApiAdapter.h
//  DTFIdentityManager
//
//  Created by 晗羽 on 25/07/2017.
//  Copyright © 2017  DTF. All rights reserved.
//

#import <UIKit/UIKit.h>
typedef void (^ZIMJSApilCallbackBlock)(id responseData);

@interface ZimJSApiHandler: NSObject
- (void)handler:(NSDictionary *)data contextInfo:(NSDictionary *)context callback:(ZIMJSApilCallbackBlock)callbac;
@end
