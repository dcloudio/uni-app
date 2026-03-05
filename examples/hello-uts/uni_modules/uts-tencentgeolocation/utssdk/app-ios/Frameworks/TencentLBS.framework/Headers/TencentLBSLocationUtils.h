//
//  TencentLBSLocationUtils.h
//  TencentLBS
//
//  Created by mirantslu on 16/8/11.
//  Copyright © 2016年 Tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@class TencentLBSLocation;

NS_ASSUME_NONNULL_BEGIN

@interface TencentLBSLocationUtils : NSObject
/**
 *  计算两个坐标点的距离
 */
+ (double)distanceBetweenTwoCoordinate2D:(const CLLocationCoordinate2D *)coordinate coordinateTwo:(const CLLocationCoordinate2D *)coordinate2;
/**
 *  计算两个location的距离
 */
+ (double)distanceBetweenTwoCLLocations:(const CLLocation *)location locationTwo:(const CLLocation *)location2;

/**
 *  计算两个TencentLBSLocation的距离
 */
+ (double)distanceBetweenTwoTencentLBSLocations:(const TencentLBSLocation *)location locationTwo:(const TencentLBSLocation *)location2;

/**
 *  判断经纬度是否在国内
 *  
 */
+ (BOOL) isInRegionWithLatitude:(double)latitude longitude:(double)longitude;

/**
 *  wgs84坐标转成gcj02坐标
 */
+ (CLLocationCoordinate2D)WGS84TOGCJ02:(CLLocationCoordinate2D)coordinate;

@end

@interface TencentLBSServiceManager : NSObject

/**
 *  设置ID，如QQ号，微信号或是其他的登录账号，可用在发布前联调使用
 */
@property (atomic, copy) NSString *deviceID;

+ (instancetype)sharedInsance;

@end

NS_ASSUME_NONNULL_END
