//
//  MPLogSetting.h
//  APRemoteLogging
//
//  Created by tashigaofei on 15/3/16.
//  Copyright (c) 2015年 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

NSString * MPLogGetUUID();
NSString * MPLogGetUTDID();
NSString * MPLogGetClientID();
NSString * MPLogGetSystemType();
NSString * MPLogGetSystemVersion();
NSString * MPLogGetDeviceMode();
NSString * MPLogGetUserID();
NSString * MPLogGetPlatformID();
NSString * MPLogGetConfigServerURL();
NSString * MPLogGetLogServerURL();
NSString * MPLogGetNetwork();
NSString * MPLogGetLanguage();
NSString * MPLogGetVoiceOver();
NSString * MPLogGetCarrier();


void MPLogSetClientVersion(NSString * clientVersion);
void MPLogSetPlatformID(NSString * platformID);
void MPLogSetConfigServerURL(NSString * url);
void MPLogSetLogServerURL(NSString * url);
void MPLogSetClientID(NSString * clientID);
void MPLogSetLanguage(NSString * language);
