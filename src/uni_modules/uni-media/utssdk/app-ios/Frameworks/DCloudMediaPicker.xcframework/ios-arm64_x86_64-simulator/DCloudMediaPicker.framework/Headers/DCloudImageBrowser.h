//
//  DCloudImageSliderView.h
//  DCloudMediaPicker
//
//  Created by dcloud on 2024/2/23.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef enum
{
    DCloudSliderViewState_Preview,
    DCloudSliderViewState_Browse,
    DCloudSliderViewState_Animation
}DCloudSliderViewState;

typedef enum {
    DCloudImageBrowserIndicator_none,
    DCloudImageBrowserIndicator_default,
    DCloudImageBrowserIndicator_number
}DCloudImageBrowserIndicator;

typedef enum{
    DCloudImageAlignType_left,
    DCloudImageAlignType_right,
    DCloudImageAlignType_top,
    DCloudImageAlignType_bottom,
    DCloudImageAlignType_center
}DCloudImageAlignType;

@protocol DCloudImageBrowserLoadImageDelegate <NSObject>

- (void)dispatchLoadImage:(NSString *)url completion:(void (^)(UIImage *image))completion;

@end

@protocol DCloudImageBrowserItemDelegate <NSObject>
- (void)handleSingleTap;
- (void)longPressForIndex:(NSNumber *_Nullable)index url:(NSString*_Nonnull)url path:(NSString*_Nonnull)path;
- (void)loadImage:(NSString *)url completion:(void (^)(UIImage *image))completion;
-(void)touchesBegan:(NSSet<UITouch *> *_Nonnull)touches withEvent:(UIEvent *_Nullable)event;
-(void)touchesMoved:(NSSet<UITouch *> *_Nonnull)touches withEvent:(UIEvent *_Nonnull)event;
-(void)touchesEnded:(NSSet<UITouch *> *_Nullable)touches withEvent:(UIEvent *_Nonnull)event;

@end

@interface DCloudImageBrowser : UIView
- (id)initWithFrame:(CGRect)frame;
- (void)exitBroswerMode;
- (void)setupOptions:(NSDictionary *)options;
@property(nonatomic, weak)id<DCloudImageBrowserLoadImageDelegate> loadImageDelegate;
@end

NS_ASSUME_NONNULL_END
