//
//  StorageManager.h
//  storage
//
//  Created by DCloud on 2018/6/13.
//  Copyright © 2018年 DCloud. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^StorageManagerCallback)(id result);

@class Storage;
@interface StorageManager : NSObject
+ (Storage*)currentStorage;
+ (Storage*)activeStorageWithDomain:(NSString*)domain;
+ (void)serializeStorageWithDomain:(NSString*)domain;
+ (Storage*)storageWithDomain:(NSString*)domain;
@end

@interface Storage : NSObject
@property(nonatomic, strong)NSString* domain;
@property(nonatomic, strong)NSString* rootPath;
- (NSUInteger)length;

- (NSArray*)getAllKeys;

- (void)setItem:(NSString *)key value:(NSString *)value callback:(StorageManagerCallback)callback;

- (void)setItemPersistent:(NSString *)key value:(NSString *)value callback:(StorageManagerCallback)callback;

- (NSString*)getItem:(NSString *)key  callback:(StorageManagerCallback)callback;

- (void)removeItem:(NSString *)key callback:(StorageManagerCallback)callback;
- (void)clear;
@end

