//
//  APBBisRequestBuilder.h
//  BioAuthEngine
//
//  Created by 晗羽 on 21/04/2018.
//  Copyright © 2018 DTF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <DTFUtility/APBBisUploadGwRequest.h>
#import <BioAuthEngine/APBBehavLogModel.h>
#import <DTFUtility/ToygerData.h>

@interface APBBisRequestBuilder : NSObject

+(APBBisUploadGwRequest *) buildRequestwithpubKey:(NSString *) pubKey
                                            token:(NSString *) bistoken
                                      contentData:(ToygerUploadContent *)content
                                        behaveLog:(BisBehavLog *)behavlog
                                    andCypherData:(NSString *) aesKeyData;

+ (APBBisUploadGwRequest *)buildEKYCRequestWithContentData:(NSString *)content
                                                 behaveLog:(BisBehavLog *)behavlog
                                             andCypherData:(NSString *)aesKeyData;

+ (NSString *)rsaImage:(NSString *) pubKey image:(UIImage *)image;

+ (UIImage *)compressImage:(UIImage *)image;

@end
