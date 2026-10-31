//
//  OutConst.h
//  deviceiOS
//
//  Created by Xishui Xu on 2025/2/13.
//  Copyright © 2025 security.net. All rights reserved.
//

#ifndef OutConst_h
#define OutConst_h

enum DataType {
    COLLECT_ALL                         = 0,
    
    COLLECT_NO_UNIQUE_DEVICE_DATA       = 0x1,
    COLLECT_NO_EXTRA_DEVICE_DATA        = 0x8,
    
    COLLECT_NO_ALL                      = (COLLECT_NO_UNIQUE_DEVICE_DATA |
                                           COLLECT_NO_EXTRA_DEVICE_DATA)
};

enum DataSwitch {
    INIT_COLLECT_DATA,
    TOKEN_COLLECT_DATA
};

enum LS {
    THREAD_STACK_START      = 0x76213030,
    THREAD_STACK_END        = 0x96521302
};

#endif /* OutConst_h */
