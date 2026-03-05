
#import <UIKit/UIKit.h>


@interface UIControl (EnlargeTouchArea)

/**
 *  扩大 UIButton 的点击范围
 *  控制上下左右的延长范围
 */
- (void)dc_setEnlargeEdgeWithTop:(CGFloat)top right:(CGFloat)right bottom:(CGFloat)bottom left:(CGFloat)left;

@end
