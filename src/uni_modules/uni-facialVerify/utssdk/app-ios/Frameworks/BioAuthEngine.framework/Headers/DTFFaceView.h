//
//  DTFFaceView.h
//  MultiFactorFacade
//
//  Created by mengbingchuan on 2022/6/22.
//  Copyright © 2022   DTF. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DTFFaceViewProtocol.h"

typedef NS_ENUM(NSInteger, DTFAuthScene) {
    DTFAuthSceneFace =        1,  //刷脸
    DTFAuthSceneMultiFactor = 2,  //意愿
};

@interface DTFFaceView : UIView<DTFFaceViewProtocol>

@property(nonatomic, assign) DTFAuthScene authScene;
@property(nonatomic, strong) NSString *platformInfo;
@property(nonatomic, assign) BOOL isSuitable;

- (instancetype)initWithAuthScene:(DTFAuthScene)authScene platformInfo:(NSString *)platformInfo isSuitable:(BOOL)isSuitable;

- (instancetype)initWithAuthScene:(DTFAuthScene)authScene;

- (void)setScreenRotation:(BOOL)isRotation;

- (void)setPlayBtnIcon;
@end
