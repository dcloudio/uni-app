//
//  FaceViewProviderProtocol.h
//  BioAuthEngine
//
//  Created by mengbingchuan on 2022/8/29.
//  Copyright © 2022   DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DTFFaceViewProtocol.h"
#import "DTFOCRViewProtocol.h"

@protocol DTFViewProviderProtocol <NSObject>

- (id<DTFFaceViewProtocol>)viewForFace;
//遵守该协议的对象必须要实现方法，方法返回一个遵守DTFOCRViewProtocol协议的id类型。返回对象可以理解为一个view的提供者
- (id<DTFOCRViewProtocol>)viewForOCR;

@end
