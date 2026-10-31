//
//  APBCommand.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 11/26/15.
//  Copyright © 2015 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  业务方可以执行的任务类型
 */
typedef NS_ENUM(NSInteger, APBCommandType) {
    COMMAND_QUIT = 100,                 //业务方强制退出
    COMMAND_CLOSE_UPLOADPAGE = 101,     //业务方关闭上传界面
    COMMAND_BIS_RETURN = 102,           //业务方传递bis服务器返回结果,或网络错误结果
};

@interface APBCommand : NSObject

@property(nonatomic, assign, readonly)APBCommandType commandType;       //操作类型
@property(nonatomic, strong, readonly)NSDictionary *params;             //操作扩展参数，可以为空

- (instancetype)initWithCommandType:(APBCommandType)commandType
                         withParams:(NSDictionary *)params;

@end
