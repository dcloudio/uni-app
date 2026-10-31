//
//  APBEvent.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/26/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@class APBCommand;

extern NSString *const kKeepUploadPageKey;                      //extInfo key: 生物识别产品是否要保持上传界面，默认不保持

/**
 *  task可以响应的事件类型
 */
typedef NS_ENUM(NSInteger, APBEventType) {
    EVENT_QUIT =                    100,        //退出
    EVENT_CLOSE_UPLOADPAGE =        101,        //业务方关闭上传界面
    EVENT_BIS_RETURN =              102,        //bis服务器返回
    EVENT_SYSTEM_INTERRUPT =        200,        //系统中断
    EVENT_SYSTEM_INTERRUPT_RESUME = 201,        //系统中断恢复
    EVENT_GLOBAL_TIMEOUT =          202,        //全局超时
    EVENT_TASK_TIMEOUT =            203,        //task超时
    EVENT_ALERT_APPEAR =            204,        //alert框显示
    EVENT_ALERT_DISAPPEAR =         205,        //alert框退出
    EVENT_ABNORMAL_CLOSE =          206,        //异常退出
    EVENT_SYSTEM_ENTER_FOREGROUND = 207,        //后台返回前台
};


@interface APBEvent : NSObject

@property(nonatomic, assign, readonly) APBEventType eventType;
@property(nonatomic, strong, readonly) NSDictionary *params;

- (instancetype)initWithEventType:(APBEventType)eventType
                        withParam:(NSDictionary *)params;

+ (instancetype)eventWithCommand:(APBCommand *)command;

@end
