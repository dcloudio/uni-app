//
//  ToygerUploadConfig.h
//  ToygerService
//
//  Created by 王伟伟 on 2018/2/2.
//  Copyright © 2018年 DTF. All rights reserved.
//

#import <DTFUtility/ToygerBaseModel.h>

@interface ToygerUploadConfig : ToygerBaseModel
@property (nonatomic, copy) NSString *minquality;               //TODO:delete
@property (nonatomic, copy) NSString *upload_compress_rate;
@property (nonatomic, copy) NSString *mode;
@property (nonatomic, strong) NSNumber *desiredWidth;
@property (nonatomic, copy) NSString *log_classifier;
@property (nonatomic, copy) NSArray *collection;
@end
