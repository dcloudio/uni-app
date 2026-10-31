//
//  APFaceFacade.h
//  APFaceDetectBiz
//
//  Created by 晗羽 on 8/25/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <BioAuthEngine/IBioAuthFactor.h>

@interface APBToygerFacade : NSObject <IBioAuthFactor>

+(void)setTokenid:(NSString*)info;
+(NSString*)getTokenid;

@end

#import <APBToygerFacade/APBToygerCherryDetectTask.h>
#import <APBToygerFacade/APBToygerBaseTask.h>
#import <APBToygerFacade/APBToygerPresentTask.h>
#import <APBToygerFacade/APBToygerCherryUploadTask.h>
#import <APBToygerFacade/APBToygerUtils.h>
#import <APBToygerFacade/APBToygerUploadTask.h>
#import <APBToygerFacade/APBToygerFacadeDefine.h>
#import <DTFUtility/APBToygerRemoteConfig.h>
#import <BioAuthEngine/APBToygerBehavlogManager.h>
#import <BioAuthEngine/APBToygerDataCenter.h>
#import <APBToygerFacade/APBToygerViewController.h>
#import <UIKit/UIKit.h>

//! Project version number for APBToygerFacade.
FOUNDATION_EXPORT double APBToygerFacadeVersionNumber;

//! Project version string for APBToygerFacade.
FOUNDATION_EXPORT const unsigned char APBToygerFacadeVersionString[];
