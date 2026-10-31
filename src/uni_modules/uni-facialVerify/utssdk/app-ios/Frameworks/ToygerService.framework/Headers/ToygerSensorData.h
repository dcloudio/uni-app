//
//  ToygerSensorData.h
//  ToygerService
//
//  Created by 晗羽 on 2018/5/17.
//  Copyright © 2018 DTF. All rights reserved.
//

#ifdef USE_SENSOR


#import <Foundation/Foundation.h>

@interface ToygerSensorData : NSObject
@property (nonatomic)float pitch;
@property (nonatomic)float roll;
@property (nonatomic)float yaw;
@property (nonatomic)float gyro_x;
@property (nonatomic)float gyro_y;
@property (nonatomic)float gyro_z;
@property (nonatomic)unsigned long timestamp;
@end

#endif
