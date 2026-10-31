//
//  APBConfig.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 3/8/16.
//  Copyright © 2016 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

//是否支持protobuffer
//#define SUPPORT_PB
//#define USE_FPP


#ifdef SUPPORT_PB
static const int kRPCFormat = 1;
#else
static const int kRPCFormat = 0;
#endif


