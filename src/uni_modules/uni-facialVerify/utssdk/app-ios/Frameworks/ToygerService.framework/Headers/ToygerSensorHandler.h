//
//  ToygerSensorHandler.h
//  ToygerService
//
//  Created by 晗羽 on 2018/5/17.
//  Copyright © 2018 DTF. All rights reserved.
//

#ifdef USE_SENSOR


#import <Foundation/Foundation.h>
#import <ToygerService/ToygerSensorData.h>

struct ToygerSensorResult {
    bool highRisk = false;
    bool isStatic = false;
    float maxRotationAngle = 0.f;
};


@interface ToygerSensorConfig: NSObject

@property (nonatomic)float static_threshold;
@property (nonatomic)float rotation_threshold;
@property (nonatomic)float offset;

@end


@interface ToygerSensorHandler : NSObject

-(instancetype)initWithConfig:(ToygerSensorConfig *) config;

-(void)processSensorData:(ToygerSensorData *) dataSlice;

-(NSData *)getSampleData;

-(ToygerSensorResult)getSensorResult;

@property (nonatomic)float offset;

@end

#endif
