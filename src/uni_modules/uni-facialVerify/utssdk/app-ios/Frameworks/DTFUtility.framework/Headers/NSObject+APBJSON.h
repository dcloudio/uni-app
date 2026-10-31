//
//  NSObject+APBJSON.h
//  BioAuthEngine
//
//  Created by yukun.tyk on 9/13/16.
//  Copyright © 2016  DTF. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSObject (APBJSON)

/**
 *  JSON encoder
 *
 *  NSarray只支持一级列表，原生类型只支持NSInteger, CGFloat, BOOL
 *
 *  如果编码失败，会抛异常
 *
 *  @return JSON string
 */
- (NSString *)APBToJSON;

- (NSDictionary *)APBToDict;

- (NSDictionary *)APBToDict:(BOOL)valueCanBeNil;
/**
 *  JSON decoder
 *
 *  @param json JSON string
 *
 *  NSarray只支持一级列表，原生类型只支持NSInteger, CGFloat, BOOL
 *
 *  如果解析失败，会抛异常
 *
 *  @return JSON object
 */
+ (instancetype)APBLoadFromJSON:(NSString *)json;
+ (instancetype)APBLoadFrom:(NSDictionary *)dict forObject:(id) obj;

- (void)APBOverrideFromJSON:(NSString *)json;
- (void)APBOverrideFromJSONData:(NSData *)json;

/**
 *  JSON encoder
 *
 *  NSarray只支持一级列表，原生类型只支持NSInteger, CGFloat, BOOL
 *  canTolerateNil为YES ,如果value值不存在，表示该key所对应的字段做序列化是不存在，但其他字段继续做序列化
 *  如果为NO,表示不容忍任何value值为nil，直接返回序列化结果为nil
 *  如果value值为NSData类型，那么在做序列话时，该字段会被删掉，这是为了兼容，而不是直接抛异常
 *  @return JSON string
 */
- (NSString *)classObjectToJSONWithTolerateNilChoice:(BOOL)canTolerateNil;

@end
