//
//  DTFCustomAlertView.h
//  BioAuthEngine
//
//  Created by 汪澌哲 on 2024/1/10.
//  Copyright © 2024 Alipay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DTFColorModel.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, DTFAlertActionType) {
    DTFAlertActionTypeConfirm,
    DTFAlertActionTypeCancel
};

@interface DTFCustomAlertAction : NSObject

@property (nonatomic, copy) NSString *title;
@property (nonatomic, assign) DTFAlertActionType type;
@property (nonatomic, copy) void (^handler)(void);

- (instancetype)initWithTitle:(NSString *)title type:(DTFAlertActionType)type handler:(void (^)(void))handler;

@end

@interface DTFCustomAlertView : UIView
@property (nonatomic, copy) NSString *titleText;
@property (nonatomic, copy) NSString *messageText;
@property (nonatomic, copy) NSString *cancelText;
@property (nonatomic, copy) NSString *sureText;
@property (nonatomic, assign) CGRect infoRect;
@property (nonatomic, strong) NSMutableArray<DTFCustomAlertAction *> *actions;
@property (nonatomic, copy) void(^cancelButtonAction)(void);
@property (nonatomic, copy) void(^sureButtonAction)(void);
@property (nonatomic, strong) UIViewController *vc;

@property (strong, nonatomic) UIView *bgView;
@property (strong, nonatomic) UIView *bgMaskView;
@property (strong, nonatomic) UIView *lineView;
@property (strong, nonatomic) UIView *linesView;
@property (strong, nonatomic) UILabel *titleLabel;
@property (strong, nonatomic) UILabel *messageLabel;
@property (assign, nonatomic) BOOL isPermission;
@property (strong, nonatomic) DTFColorModel *colorModel;
@property (strong, nonatomic) NSMutableArray *alertBtnArray;
@property (strong, nonatomic) UIFont *font;


- (instancetype)initWithTitle:(NSString *)title message:(NSString *)message;
- (void)addAction:(DTFCustomAlertAction *)action;
- (void)show;
// 隐藏
- (void)hide;

+(void)showCustomAlertWithTitle:(NSString *)title message:(NSString *)message colorModel:(DTFColorModel *)colorModel actions:(NSArray <DTFCustomAlertAction *>*)actions fromeVC:(UIViewController *)vc;

+(void)showPermissionAlertWithTitle:(NSString *)title message:(NSString *)message fromeVC:(UIViewController *)vc;
@end

NS_ASSUME_NONNULL_END


