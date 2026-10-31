//
//  DTFUICustomProtocol.h
//  BioAuthEngine
//
//  Created by mengbingchuan on 2022/8/29.
//  Copyright © 2022   DTF. All rights reserved.
//

#import <UIKit/UIkit.h>
#import <AVFoundation/AVFoundation.h>
#import "DTFCustomAlertView.h"
typedef NS_ENUM(NSInteger, DTFServiceType) {
    FACE,
    OCR,
    WISH
};
typedef NSString * DTFPermission NS_EXTENSIBLE_STRING_ENUM;

extern DTFPermission const DTFPermissionTypeVideo;
extern DTFPermission const DTFPermissionTypeAudio;
extern DTFPermission const DTFPermissionTypeReplay;
extern DTFPermission const DTFPermissionTypeAlbum;

@protocol DTFUICustomProtocol <NSObject>
@optional

/**
 * Show Permission
 */
- (BOOL)showPermissionViewWithPermission:(NSArray *)permission serviceType:(DTFServiceType)serviceType;

@end

