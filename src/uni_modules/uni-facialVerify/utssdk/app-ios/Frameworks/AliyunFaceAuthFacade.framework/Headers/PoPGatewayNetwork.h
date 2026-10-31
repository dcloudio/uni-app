//
//  PoPGatewayNetwork.h
//  ZimDemo
//
//  Created by sanyuan.he on 2020/1/20.
//  Copyright © 2020 com.. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PoPGatewayNetwork : NSObject

@property(nonatomic, assign) NSTimeInterval timeoutForInit;

@property(nonatomic, assign) NSTimeInterval timeoutForVerify;

-(void)bizSendContent:(NSDictionary*)serviceParameters completionBlock:(void (^) (NSError *error, NSURLResponse *response, NSData *data))completionBlock;

-(void)verifySendContent:(NSDictionary*)serviceParameters completionBlock:(void (^) (NSError *error, NSURLResponse *response, NSData *data))completionBlock;


-(void)sendInitFaceVerifyContent:(NSDictionary*)serviceParameters keyName:(NSString*)name initKey:(NSString *)initKey initSimpleValue:(NSString *)initSimpleValue completionBlock:(void (^) (NSError *error, NSURLResponse *response, NSData *data))completionBlock;

-(void)sendOCRContent:(NSDictionary*)serviceParameters completionBlock:(void (^) (NSError *error, NSURLResponse *response, NSData *data))completionBlock;

-(void)sendLogContent:(NSDictionary*)serviceParameters extraHeader:(NSDictionary *)header completionBlock:(void (^) (NSError *error, NSURLResponse *response, NSData *data))completionBlock;

@end

NS_ASSUME_NONNULL_END
