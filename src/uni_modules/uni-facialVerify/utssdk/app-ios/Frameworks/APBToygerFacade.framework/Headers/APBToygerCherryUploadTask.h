//
//  APFCherryUploadTask.h
//  APFaceDetectBiz
//
//  Created by yukun.tyk on 28/11/2016.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <APBToygerFacade/APBToygerUploadTask.h>
#import <BioAuthEngine/APBToygerDataCenter.h>

typedef NS_ENUM(NSInteger, APBToygerRemoteCommand)
{
    APBToyger_REMOTE_COMMAND_PASS =           1001,   //比对通过
    APBToyger_REMOTE_COMMAND_CONTINUE =       1002,   //需要继续采集
    APBToyger_REMOTE_COMMAND_FAIL =           2001,   //比对失败
    APBToyger_REMOTE_COMMAND_RETRY =          2002,   //需要重试
};


@interface APBToygerCherryUploadTask : APBToygerUploadTask <APBToygerDataCenterDelegate>

- (APBToygerRemoteCommand)remoteCommandFromString:(NSString *)code;

@end
