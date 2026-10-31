//
//  APBToygerUploadTask.h
//  APBToygerFacade
//
//  Created by Dan Cong on 29/1/2018.
//  Copyright © 2018 DTF. All rights reserved.
//

#import <APBToygerFacade/APBToygerBaseTask.h>

/**
 上传基类，用于下沉多种UI(樱桃和加菲)下通用的逻辑
 */
@interface APBToygerUploadTask : APBToygerBaseTask

- (void)uploadImage;

- (void)didFinishUploadWithSuccess:(BOOL)success
                           retCode:(NSString *)retCode
                        retMessage:(NSString *)msg
                           extInfo:(NSString *)ext;

- (void)handleFailWithRetCodeSub:(NSString *)retCodeSub retMessageSub:(NSString *)retMessageSub;

- (void)requestAgain;

@end
