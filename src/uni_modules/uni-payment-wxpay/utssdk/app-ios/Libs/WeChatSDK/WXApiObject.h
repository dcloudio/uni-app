//
//  MMApiObject.h
//  Api对象，包含所有接口和对象数据定义
//
//  Created by Wechat on 12-2-28.
//  Copyright (c) 2012年 Tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/*! @brief 错误码
 *
 */
enum  WXErrCode {
    WXSuccess           = 0,    /**< 成功    */
    WXErrCodeCommon     = -1,   /**< 普通错误类型    */
    WXErrCodeUserCancel = -2,   /**< 用户点击取消并返回    */
    WXErrCodeSentFail   = -3,   /**< 发送失败    */
    WXErrCodeAuthDeny   = -4,   /**< 授权失败    */
    WXErrCodeUnsupport  = -5,   /**< 微信不支持    */
};



/*! @brief 请求发送场景
 *
 */
enum WXScene {
    WXSceneSession          = 0,   /**< 聊天界面    */
    WXSceneTimeline         = 1,   /**< 朋友圈     */
    WXSceneFavorite         = 2,   /**< 收藏       */
    WXSceneSpecifiedSession = 3,   /**< 指定联系人  */
    WXSceneState            = 4,   /**< 状态  */
};


enum WXAPISupport {
    WXAPISupportSession = 0,
};



/*! @brief 跳转profile类型
 *
 */
enum WXBizProfileType {
    WXBizProfileType_Normal = 0,    //**< 普通公众号  */
    WXBizProfileType_Device = 1,    //**< 硬件公众号  */
};

/*! @brief 分享小程序类型
 *
 */
typedef NS_ENUM(NSUInteger, WXMiniProgramType) {
    WXMiniProgramTypeRelease = 0,       //**< 正式版  */
    WXMiniProgramTypeTest = 1,        //**< 开发版  */
    WXMiniProgramTypePreview = 2,         //**< 体验版  */
};

/*! @brief 跳转mp网页类型
 *
 */
enum WXMPWebviewType {
    WXMPWebviewType_Ad = 0,        /**< 广告网页 **/
};

/*! @brief log的级别
 *
 */
typedef NS_ENUM(NSInteger,WXLogLevel) {
    WXLogLevelNormal = 0,      // 打印日常的日志
    WXLogLevelDetail = 1,      // 打印详细的日志
};


/*! @brief 打印回调的block
 *
 */
typedef void(^WXLogBolock)(NSString *log);

/*! @brief 微信Universal Link检查函数 (WXApi#checkUniversalLinkReady:)，检查步骤枚举值
 *
 * WXULCheckStepParams 参数检测
 * WXULCheckStepSystemVersion 当前系统版本检测
 * WXULCheckStepWechatVersion 微信客户端版本检测
 * WXULCheckStepSDKInnerOperation 微信SDK内部操作检测
 * WXULCheckStepLaunchWechat  App拉起微信检测
 * WXULCheckStepBackToCurrentApp 由微信返回当前App检测
 * WXULCheckStepFinal 最终结果
 */
typedef NS_ENUM(NSInteger, WXULCheckStep)
{
    WXULCheckStepParams,
    WXULCheckStepSystemVersion,
    WXULCheckStepWechatVersion,
    WXULCheckStepSDKInnerOperation,
    WXULCheckStepLaunchWechat,
    WXULCheckStepBackToCurrentApp,
    WXULCheckStepFinal,
};


#pragma mark - WXCheckULStepResult

/*! @brief 该类为微信Universal Link检测函数结果类
*
*/
@interface WXCheckULStepResult : NSObject

/** 是否成功 */
@property(nonatomic, assign) BOOL success;
/** 当前错误信息 */
@property(nonatomic, strong) NSString* errorInfo;
/** 修正建议 */
@property(nonatomic, strong) NSString* suggestion;

- (instancetype)initWithCheckResult:(BOOL)success errorInfo:(nullable NSString*)errorInfo suggestion:(nullable NSString*)suggestion;

@end


/*! @brief 微信Universal Link检查函数 (WXApi#checkUniversalLinkReady:)，回调Block
 *
 * @param step 当前检测步骤
 * @param result 检测结果
 */
typedef void(^WXCheckULCompletion)(WXULCheckStep step, WXCheckULStepResult* result);


#pragma mark - BaseReq
/*! @brief 该类为微信终端SDK所有请求类的基类
 *
 */
@interface BaseReq : NSObject

/** 请求类型 */
@property (nonatomic, assign) int type;
/** 由用户微信号和AppID组成的唯一标识，需要校验微信用户是否换号登录时填写*/
@property (nonatomic, copy) NSString *openID;

@end



#pragma mark - BaseResp
/*! @brief 该类为微信终端SDK所有响应类的基类
 *
 */
@interface BaseResp : NSObject
/** 错误码 */
@property (nonatomic, assign) int errCode;
/** 错误提示字符串 */
@property (nonatomic, copy) NSString *errStr;
/** 响应类型 */
@property (nonatomic, assign) int type;

@end



#pragma mark - WXMediaMessage
@class WXMediaMessage;

#ifndef BUILD_WITHOUT_PAY

#pragma mark - PayReq
/*! @brief 第三方向微信终端发起支付的消息结构体
 *
 *  第三方向微信终端发起支付的消息结构体，微信终端处理后会向第三方返回处理结果
 * @see PayResp
 */
@interface PayReq : BaseReq

/** 商家向财付通申请的商家id */
@property (nonatomic, copy) NSString *partnerId;
/** 预支付订单 */
@property (nonatomic, copy) NSString *prepayId;
/** 随机串，防重发 */
@property (nonatomic, copy) NSString *nonceStr;
/** 时间戳，防重发 */
@property (nonatomic, assign) UInt32 timeStamp;
/** 商家根据财付通文档填写的数据和签名 */
@property (nonatomic, copy) NSString *package;
/** 商家根据微信开放平台文档对数据做的签名 */
@property (nonatomic, copy) NSString *sign;

@end


#pragma mark - PayResp
/*! @brief 微信终端返回给第三方的关于支付结果的结构体
 *
 *  微信终端返回给第三方的关于支付结果的结构体
 */
@interface PayResp : BaseResp

/** 财付通返回给商家的信息 */
@property (nonatomic, copy) NSString *returnKey;

@end

#pragma mark - WXOfflinePay
/*! @brief 第三方向微信终端发起离线支付
 *
 *  第三方向微信终端发起离线支付的消息结构体
 */
@interface WXOfflinePayReq : BaseReq

@end

/*! @brief 第三方向微信终端发起离线支付返回
 *
 *  第三方向微信终端发起离线支付返回的消息结构体
 */
@interface WXOfflinePayResp : BaseResp

@end


#pragma mark - WXNontaxPayReq
@interface WXNontaxPayReq:BaseReq

@property (nonatomic, copy) NSString *urlString;

@end

#pragma mark - WXNontaxPayResp
@interface WXNontaxPayResp : BaseResp

@property (nonatomic, copy) NSString *wxOrderId;

@end

#pragma mark - WXPayInsuranceReq
@interface WXPayInsuranceReq : BaseReq

@property (nonatomic, copy) NSString *urlString;

@end

#pragma mark - WXPayInsuranceResp
@interface WXPayInsuranceResp : BaseResp

@property (nonatomic, copy) NSString *wxOrderId;

@end


#pragma mark - WXQRCodePayReq
@interface WXQRCodePayReq : BaseReq
/** 码内容
 * @note 必填，码长度必须大于0且小于10K
 */
@property (nonatomic, copy) NSString *codeContent;
/** 额外信息
 * @note 长度必须大于0且小于10K
 */
@property (nonatomic, copy) NSString *extraMsg;

@end

@interface WXQRCodePayResp : BaseResp
@end

#endif


#pragma mark - SendAuthReq
/*! @brief 第三方程序向微信终端请求认证的消息结构
 *
 * 第三方程序要向微信申请认证，并请求某些权限，需要调用WXApi的sendReq成员函数，
 * 向微信终端发送一个SendAuthReq消息结构。微信终端处理完后会向第三方程序发送一个处理结果。
 * @see SendAuthResp
 */
@interface SendAuthReq : BaseReq
/** 第三方程序要向微信申请认证，并请求某些权限，需要调用WXApi的sendReq成员函数，向微信终端发送一个SendAuthReq消息结构。微信终端处理完后会向第三方程序发送一个处理结果。
 * @see SendAuthResp
 * @note scope字符串长度不能超过1K
 */
@property (nonatomic, copy) NSString *scope;
/** 第三方程序本身用来标识其请求的唯一性，最后跳转回第三方程序时，由微信终端回传。
 * @note state字符串长度不能超过1K
 */
@property (nonatomic, copy) NSString *state;

@property (nonatomic, assign) BOOL isOption1;

/** 是否关闭自动授权
 * @note YES为关闭自动授权，每次登陆都需要用户手动授权；NO为允许自动授权
 */
@property (nonatomic, assign) BOOL nonautomatic;

@property (nonatomic, copy) NSString *extData;

@end

#pragma mark - SendAuthResp
/*! @brief 微信处理完第三方程序的认证和权限申请后向第三方程序回送的处理结果。
 *
 * 第三方程序要向微信申请认证，并请求某些权限，需要调用WXApi的sendReq成员函数，向微信终端发送一个SendAuthReq消息结构。
 * 微信终端处理完后会向第三方程序发送一个SendAuthResp。
 * @see onResp
 */
@interface SendAuthResp : BaseResp
@property (nonatomic, copy, nullable) NSString *code;
/** 第三方程序发送时用来标识其请求的唯一性的标志，由第三方程序调用sendReq时传入，由微信终端回传
 * @note state字符串长度不能超过1K
 * @note 在复杂度较高的应用程序中，可能会出现其他模块请求的响应对象被错误地回调到当前模块。
 * 为了避免影响其他模块，建议当前模块的开发者根据SendAuthResp的内容，采用白名单的方式进行处理。
 * 例如，SendAuthResp.state符合预期时，才对其进行处理。
 */
@property (nonatomic, copy, nullable) NSString *state;
@property (nonatomic, copy, nullable) NSString *lang;
@property (nonatomic, copy, nullable) NSString *country;
@end

#pragma mark - WXStateJumpInfo
/*! @brief 状态发表时的小尾巴跳转信息
 */
@interface WXStateJumpInfo : NSObject

@end

#pragma mark - WXStateJumpUrlInfo
/*! @brief 状态小尾巴跳转指定url的信息
 */
@interface WXStateJumpUrlInfo : WXStateJumpInfo
/** 跳转到指定的url
 * @note 必填，url长度必须大于0且小于10K
 */
@property (nonatomic, copy) NSString *url;

@end

#pragma mark - WXStateJumpWXMiniProgramInfo
/*! @brief 状态小尾巴跳转指定小程序的信息
 */
@interface WXStateJumpMiniProgramInfo : WXStateJumpInfo
/** 小程序username
 * @note 必填
 */
@property (nonatomic, copy) NSString *username;

/** 小程序页面的路径
 * @attention 不填默认拉起小程序首页
 */
@property (nonatomic, copy, nullable) NSString *path;

/** 分享小程序的版本
 * @attention （正式，开发，体验）
 */
@property (nonatomic, assign) WXMiniProgramType miniProgramType;

@end



#pragma mark - WXStateJumpWXMiniProgramInfo
/*! @brief 状态小尾巴跳转指定视频号主页信息
 */
@interface WXStateJumpChannelProfileInfo : WXStateJumpInfo
/** 视频号username
 * @note 必填，username长度必须大于0且小于1K
 */
@property (nonatomic, copy) NSString *username;


@end

#pragma mark - WXStateSceneDataObject
/*! @brief 场景类型额外参数基类
 */
@interface WXSceneDataObject : NSObject

@end

#pragma mark - WXStateSceneDataObject
/*! @brief 状态场景类型
 * 用户填写WXStateSceneDataObject参数后，可以跳转到微信状态发表页
 */
@interface WXStateSceneDataObject : WXSceneDataObject

/** 状态标志的ID
 * @note 选填，文本长度必须小于10K
 */
@property (nonatomic, copy) NSString *stateId;
/** 状态发表时附带的文本描述
 * @note 选填，文本长度必须小于10K
 */
@property (nonatomic, copy) NSString *stateTitle;
/** 后台校验token
 * @note 选填，文本长度必须小于10K
 */
@property (nonatomic, copy) NSString *token;
/** 小尾巴跳转所需的信息
 * @note 必填，目前仅支持url跳转
 */
@property (nonatomic, strong) WXStateJumpInfo *stateJumpDataInfo;

@end

#pragma mark - SendMessageToWXReq
/*! @brief 第三方程序发送消息至微信终端程序的消息结构体
 *
 * 第三方程序向微信发送信息需要传入SendMessageToWXReq结构体，信息类型包括文本消息和多媒体消息，
 * 分别对应于text和message成员。调用该方法后，微信处理完信息会向第三方程序发送一个处理结果。
 * @see SendMessageToWXResp
 */
@interface SendMessageToWXReq : BaseReq
/** 发送消息的文本内容
 * @note 文本长度必须大于0且小于10K
 */
@property (nonatomic, copy) NSString *text;
/** 发送消息的多媒体内容
 * @see WXMediaMessage
 */
@property (nonatomic, strong) WXMediaMessage *message;
/** 发送消息的类型，包括文本消息和多媒体消息两种，两者只能选择其一，不能同时发送文本和多媒体消息 */
@property (nonatomic, assign) BOOL bText;
/** 发送的目标场景，可以选择发送到会话(WXSceneSession)或者朋友圈(WXSceneTimeline)。 默认发送到会话。
 * @see WXScene
 */
@property (nonatomic, assign) int scene;
/** 指定发送消息的人
 * @note WXSceneSpecifiedSession时有效
 */
@property (nonatomic, copy, nullable) NSString *toUserOpenId;
/** 目标场景附带信息
 * @note 目前只针对状态场景
 */
@property (nonatomic, strong) WXSceneDataObject *sceneDataObject;

@end

#pragma mark - SendMessageToWXResp
/*! @brief 微信终端向第三方程序返回的SendMessageToWXReq处理结果。
 *
 * 第三方程序向微信终端发送SendMessageToWXReq后，微信发送回来的处理结果，该结果用SendMessageToWXResp表示。
 */
@interface SendMessageToWXResp : BaseResp
@property(nonatomic, copy) NSString *lang;
@property(nonatomic, copy) NSString *country;
@end

#pragma mark - GetMessageFromWXReq
/*! @brief 微信终端向第三方程序请求提供内容的消息结构体。
 *
 * 微信终端向第三方程序请求提供内容，微信终端会向第三方程序发送GetMessageFromWXReq消息结构体，
 * 需要第三方程序调用sendResp返回一个GetMessageFromWXResp消息结构体。
 */
@interface GetMessageFromWXReq : BaseReq
@property (nonatomic, strong) NSString *lang;
@property (nonatomic, strong) NSString *country;
@end



#pragma mark - GetMessageFromWXResp
/*! @brief 微信终端向第三方程序请求提供内容，第三方程序向微信终端返回的消息结构体。
 *
 * 微信终端向第三方程序请求提供内容，第三方程序调用sendResp向微信终端返回一个GetMessageFromWXResp消息结构体。
 */
@interface GetMessageFromWXResp : BaseResp
/** 向微信终端提供的文本内容
 @note 文本长度必须大于0且小于10K
 */
@property (nonatomic, strong) NSString *text;
/** 向微信终端提供的多媒体内容。
 * @see WXMediaMessage
 */
@property (nonatomic, strong) WXMediaMessage *message;
/** 向微信终端提供内容的消息类型，包括文本消息和多媒体消息两种，两者只能选择其一，不能同时发送文本和多媒体消息 */
@property (nonatomic, assign) BOOL bText;
@end



#pragma mark - ShowMessageFromWXReq
/*! @brief 微信通知第三方程序，要求第三方程序显示的消息结构体。
 *
 * 微信需要通知第三方程序显示或处理某些内容时，会向第三方程序发送ShowMessageFromWXReq消息结构体。
 * 第三方程序处理完内容后调用sendResp向微信终端发送ShowMessageFromWXResp。
 */
@interface ShowMessageFromWXReq : BaseReq
/** 微信终端向第三方程序发送的要求第三方程序处理的多媒体内容
 * @see WXMediaMessage
 */
@property (nonatomic, strong) WXMediaMessage *message;
@property (nonatomic, copy) NSString *lang;
@property (nonatomic, copy) NSString *country;
@end



#pragma mark - ShowMessageFromWXResp
/*! @brief 微信通知第三方程序，要求第三方程序显示或处理某些消息，第三方程序处理完后向微信终端发送的处理结果。
 *
 * 微信需要通知第三方程序显示或处理某些内容时，会向第三方程序发送ShowMessageFromWXReq消息结构体。
 * 第三方程序处理完内容后调用sendResp向微信终端发送ShowMessageFromWXResp。
 */
@interface ShowMessageFromWXResp : BaseResp
@end


#pragma mark - LaunchFromWXReq
/*! @brief 微信终端打开第三方程序携带的消息结构体
 *
 *  微信向第三方发送的结构体，第三方不需要返回
 */
@interface LaunchFromWXReq : BaseReq
@property (nonatomic, strong) WXMediaMessage *message;
@property (nonatomic, copy) NSString *lang;
@property (nonatomic, copy) NSString *country;
@end


#pragma mark - OpenWebviewReq
/* ! @brief 第三方通知微信启动内部浏览器，打开指定网页
 *
 *  第三方通知微信启动内部浏览器，打开指定Url对应的网页
 */
@interface OpenWebviewReq : BaseReq
/** 需要打开的网页对应的Url
 * @attention 长度不能超过1024
 */
@property(nonatomic, copy) NSString *url;

@end

#pragma mark - OpenWebviewResp
/*! @brief 微信终端向第三方程序返回的OpenWebviewReq处理结果
 *
 * 第三方程序向微信终端发送OpenWebviewReq后，微信发送回来的处理结果，该结果用OpenWebviewResp表示
 */
@interface OpenWebviewResp : BaseResp

@end



#pragma mark - WXOpenBusinessWebViewReq
/*! @brief 第三方通知微信启动内部浏览器，打开指定业务的网页
 *
 *
 */
@interface WXOpenBusinessWebViewReq : BaseReq

/** 网页业务类型
 * @attention
 */
@property (nonatomic, assign) UInt32 businessType;

/** 网页业务参数
 * @attention
 */
@property (nonatomic, strong, nullable) NSDictionary *queryInfoDic;

@end

#pragma mark - WXOpenBusinessWebViewResp
/*! @brief 微信终端向第三方程序返回的WXOpenBusinessWebViewResp处理结果。
 *
 * 第三方程序向微信终端发送WXOpenBusinessWebViewReq后，微信发送回来的处理结果，该结果用WXOpenBusinessWebViewResp表示。
 */
@interface WXOpenBusinessWebViewResp : BaseResp
/** 第三方程序自定义简单数据，微信终端会回传给第三方程序处理
 * @attention 长度不能超过2k
 */
@property (nonatomic, copy) NSString *result;

/** 网页业务类型
 * @attention
 */
@property (nonatomic, assign) UInt32 businessType;

@end


#pragma mark - OpenRankListReq
/* ! @brief 第三方通知微信，打开硬件排行榜
 *
 * 第三方通知微信，打开硬件排行榜
 */
@interface OpenRankListReq : BaseReq

@end

#pragma mark - OpenRanklistResp
/*! @brief 微信终端向第三方程序返回的OpenRankListReq处理结果。
 *
 * 第三方程序向微信终端发送OpenRankListReq后，微信发送回来的处理结果，该结果用OpenRankListResp表示。
 */
@interface OpenRankListResp : BaseResp

@end


#pragma mark - WXCardItem

@interface WXCardItem : NSObject
/** 卡id
 * @attention 长度不能超过1024字节
 */
@property (nonatomic, copy) NSString *cardId;
/** ext信息
 * @attention 长度不能超过2024字节
 */
@property (nonatomic, copy, nullable) NSString *extMsg;
/**
 * @attention 卡的状态,req不需要填。resp:0为未添加，1为已添加。
 */
@property (nonatomic, assign) UInt32 cardState;
/**
 * @attention req不需要填，chooseCard返回的。
 */
@property (nonatomic, copy) NSString *encryptCode;
/**
 * @attention req不需要填，chooseCard返回的。
 */
@property (nonatomic, copy) NSString *appID;
@end;

#pragma mark - WXInvoiceItem

@interface WXInvoiceItem : NSObject
/** 卡id
 * @attention 长度不能超过1024字节
 */
@property (nonatomic, copy) NSString *cardId;
/** ext信息
 * @attention 长度不能超过2024字节
 */
@property (nonatomic, copy, nullable) NSString *extMsg;
/**
 * @attention 卡的状态,req不需要填。resp:0为未添加，1为已添加。
 */
@property (nonatomic, assign) UInt32 cardState;
/**
 * @attention req不需要填，chooseCard返回的。
 */
@property (nonatomic, copy) NSString *encryptCode;
/**
 * @attention req不需要填，chooseCard返回的。
 */
@property (nonatomic, copy) NSString *appID;

@end

#pragma mark - AddCardToWXCardPackageReq
/* ! @brief 请求添加卡券至微信卡包
 *
 */

@interface AddCardToWXCardPackageReq : BaseReq
/** 卡列表
 * @attention 个数不能超过40个 类型WXCardItem
 */
@property (nonatomic, strong) NSArray *cardAry;

@end


#pragma mark - AddCardToWXCardPackageResp
/** ! @brief 微信返回第三方添加卡券结果
 *
 */

@interface AddCardToWXCardPackageResp : BaseResp
/** 卡列表
 * @attention 个数不能超过40个 类型WXCardItem
 */
@property (nonatomic, strong) NSArray *cardAry;
@end

#pragma mark - WXChooseCardReq
/* ! @brief 请求从微信选取卡券
 *
 */

@interface WXChooseCardReq : BaseReq
@property (nonatomic, copy) NSString *appID;
@property (nonatomic, assign) UInt32 shopID;
@property (nonatomic, assign) UInt32 canMultiSelect;
@property (nonatomic, copy) NSString *cardType;
@property (nonatomic, copy) NSString *cardTpID;
@property (nonatomic, copy) NSString *signType;
@property (nonatomic, copy) NSString *cardSign;
@property (nonatomic, assign) UInt32 timeStamp;
@property (nonatomic, copy) NSString *nonceStr;
@end


#pragma mark - WXChooseCardResp
/** ! @brief 微信返回第三方请求选择卡券结果
 *
 */

@interface WXChooseCardResp : BaseResp
@property (nonatomic, strong ) NSArray* cardAry;
@end


#pragma mark - WXChooseInvoiceReq
/* ! @brief 请求从微信选取发票
 *
 */
@interface WXChooseInvoiceReq : BaseReq
@property (nonatomic, copy) NSString *appID;
@property (nonatomic, assign) UInt32 shopID;
@property (nonatomic, copy) NSString *signType;
@property (nonatomic, copy) NSString *cardSign;
@property (nonatomic, assign) UInt32 timeStamp;
@property (nonatomic, copy) NSString *nonceStr;
@end

#pragma mark - WXChooseInvoiceResp
/** ! @brief 微信返回第三方请求选择发票结果
 *
 */
@interface WXChooseInvoiceResp : BaseResp
@property (nonatomic, strong) NSArray* cardAry;
@end

#pragma mark - WXSubscriptionReq
@interface WXSubscribeMsgReq : BaseReq
@property (nonatomic, assign) UInt32 scene;
@property (nonatomic, copy) NSString *templateId;
@property (nonatomic, copy, nullable) NSString *reserved;
@end

#pragma mark - WXSubscriptionReq
@interface WXSubscribeMsgResp : BaseResp

@property (nonatomic, copy) NSString *templateId;
@property (nonatomic, assign) UInt32 scene;
@property (nonatomic, copy) NSString *action;
@property (nonatomic, copy) NSString *reserved;
@property (nonatomic, copy, nullable) NSString *openId;

@end

#pragma mark - WXSubscribeMiniProgramMsg
/** ! @brief 第三方请求订阅小程序消息
 *
 */
@interface WXSubscribeMiniProgramMsgReq : BaseReq
@property (nonatomic, copy) NSString *miniProgramAppid;
@end

#pragma mark - WXSubscriptionReq
@interface WXSubscribeMiniProgramMsgResp : BaseResp

@property(nonatomic, copy) NSString *openId;   // 小程序openid
@property(nonatomic, copy) NSString *unionId;  // unionId
@property(nonatomic, copy) NSString *nickName; // 用户昵称

@end

#pragma mark - WXinvoiceAuthInsertReq
@interface WXInvoiceAuthInsertReq : BaseReq

@property (nonatomic, copy) NSString *urlString;

@end

#pragma mark - WXinvoiceAuthInsertResp

@interface WXInvoiceAuthInsertResp : BaseResp

@property (nonatomic, copy) NSString *wxOrderId;

@end

#pragma mark - WXMediaMessage

/*! @brief 多媒体消息结构体
 *
 * 用于微信终端和第三方程序之间传递消息的多媒体消息内容
 */
@interface WXMediaMessage : NSObject

+ (WXMediaMessage *)message;

/** 标题
 * @note 长度不能超过512字节
 */
@property (nonatomic, copy) NSString *title;
/** 描述内容
 * @note 长度不能超过1K
 */
@property (nonatomic, copy) NSString *description;
/** 缩略图数据
 * @note 大小不能超过64K
 */
@property (nonatomic, strong, nullable) NSData *thumbData;
/**
 * @note 长度不能超过64字节
 */
@property (nonatomic, copy, nullable) NSString *mediaTagName;
/**
 *
 */
@property (nonatomic, copy, nullable) NSString *messageExt;
@property (nonatomic, copy, nullable) NSString *messageAction;
/**
 * 多媒体数据对象，可以为WXImageObject，WXMusicObject，WXVideoObject，WXWebpageObject等。
 */
@property (nonatomic, strong) id mediaObject;

/** 缩略图的hash值
 * @note 使用sha256得到，用于计算签名
 */
@property (nonatomic, copy, nullable) NSString *thumbDataHash;

/** 消息签名
 * @note 用于校验消息体是否被篡改过
 */
@property (nonatomic, copy, nullable) NSString *msgSignature;


/*! @brief 设置消息缩略图的方法
 *
 * @param image 缩略图
 * @note 大小不能超过256K
 */
- (void)setThumbImage:(UIImage *)image;

@end



#pragma mark - WXImageObject
/*! @brief 多媒体消息中包含的图片数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的图片数据对象。
 * @note imageData成员不能为空
 * @see WXMediaMessage
 */
@interface WXImageObject : NSObject
/*! @brief 返回一个WXImageObject对象
 *
 * @note 返回的WXImageObject对象是自动释放的
 */
+ (WXImageObject *)object;

/** 图片真实数据内容
 * @note 大小不能超过25M
 */
@property (nonatomic, strong) NSData *imageData;

/** 图片数据的hash值
 * @note 使用sha256得到，用于计算签名
 */
@property (nonatomic, copy, nullable) NSString *imgDataHash;

/** 分享的图片消息是否要带小程序入口，若 'entranceMiniProgramUsername' 非空则显示
 *  仅部分小程序类目可用
 * @note 本字段为空则发送普通app图片消息
 */
@property (nonatomic, copy, nullable) NSString *entranceMiniProgramUsername;

/** 分享的图片消息显示的小程序入口可以跳转的小程序路径
 * 仅当 'entranceMiniProgramUsername' 非空时生效
 */
@property (nonatomic, copy, nullable) NSString *entranceMiniProgramPath;

@end


#pragma mark - WXMusicObject
/*! @brief 多媒体消息中包含的音乐数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的音乐数据对象。
 * @note musicUrl和musicLowBandUrl成员不能同时为空。
 * @see WXMediaMessage
 */
@interface WXMusicObject : NSObject
/*! @brief 返回一个WXMusicObject对象
 *
 * @note 返回的WXMusicObject对象是自动释放的
 */
+ (WXMusicObject *)object;

/** 音乐网页的url地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *musicUrl;
/** 音乐lowband网页的url地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *musicLowBandUrl;
/** 音乐数据url地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *musicDataUrl;

/**音乐lowband数据url地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *musicLowBandDataUrl;

/**音乐封面图Url
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *songAlbumUrl;

/**歌词信息 LRC格式
 * @note 长度不能超过32K
 */
@property (nonatomic, copy, nullable) NSString *songLyric;
@end



#pragma mark - WXMusicVideoObject

@interface WXMusicVipInfo : NSObject

/**付费歌曲的id
 * @note 长度不能超过32K
 */
@property (nonatomic, copy) NSString *musicId;

@end


@interface WXMusicVideoObject : NSObject

/*! @brief 返回一个WXMusicVideoObject对象
 *
 * @note 返回的WXMusicVideoObject对象是自动释放的
 */
+ (WXMusicVideoObject *)object;

/** 音乐网页的url地址
 * @note 长度不能超过10K，不能为空
 */
@property (nonatomic, copy) NSString *musicUrl;

/** 音乐数据url地址
 * @note 长度不能超过10K，不能为空
 */
@property (nonatomic, copy) NSString *musicDataUrl;

/**歌手名
 * @note 长度不能超过1k，不能为空
 */
@property (nonatomic, copy) NSString *singerName;

/**
 * @note 音乐时长, 单位毫秒
 */
@property (nonatomic, assign) UInt32 duration;

/**歌词信息 LRC格式
 * @note 长度不能超过32K
 */
@property (nonatomic, copy) NSString *songLyric;

/**高清封面图
 * @note 大小不能超过1M
 */
@property (nonatomic, strong) NSData *hdAlbumThumbData;

/** 高清封面图数据的hash值
 * @note 使用sha256得到，用于计算签名
 */
@property (nonatomic, copy, nullable) NSString *hdAlbumThumbFileHash;

/**音乐专辑名称
 * @note 长度不能超过1k
 */
@property (nonatomic, copy, nullable) NSString *albumName;

/**音乐流派
 * @note 长度不能超过1k
 */
@property (nonatomic, copy, nullable) NSString *musicGenre;

/**发行时间
 * @note Unix时间戳，单位为秒
 */
@property (nonatomic, assign) UInt64 issueDate;

/**音乐标识符
 * @note 长度不能超过1K，从微信跳回应用时会带上
 */
@property (nonatomic, copy, nullable) NSString *identification;

/**运营H5地址
 * @note 选填，建议填写，用户进入歌曲详情页将展示内嵌的运营H5，可展示该歌曲的相关评论、歌曲推荐等内容，不可诱导下载、分享等。
 */
@property (nonatomic, copy, nullable) NSString *musicOperationUrl;

/** 付费歌曲相关信息
 * @note 选填，如果歌曲是需要付费的，那么将付费歌曲id等信息封装在内。
 */
@property (nonatomic, strong) WXMusicVipInfo *musicVipInfo;

@end



#pragma mark - WXVideoObject
/*! @brief 多媒体消息中包含的视频数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的视频数据对象。
 * @note videoUrl和videoLowBandUrl不能同时为空。
 * @see WXMediaMessage
 */
@interface WXVideoObject : NSObject
/*! @brief 返回一个WXVideoObject对象
 *
 * @note 返回的WXVideoObject对象是自动释放的
 */
+ (WXVideoObject *)object;

/** 视频网页的url地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *videoUrl;
/** 视频lowband网页的url地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *videoLowBandUrl;

@end



#pragma mark - WXWebpageObject
/*! @brief 多媒体消息中包含的网页数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的网页数据对象。
 * @see WXMediaMessage
 */
@interface WXWebpageObject : NSObject
/*! @brief 返回一个WXWebpageObject对象
 *
 * @note 返回的WXWebpageObject对象是自动释放的
 */
+ (WXWebpageObject *)object;

/** 网页的url地址
 * @note 不能为空且长度不能超过10K
 */
@property (nonatomic, copy) NSString *webpageUrl;

/**是否是私密消息
 */
@property (nonatomic, assign) BOOL isSecretMessage;

/** 业务所需的额外信息 */
@property (nonatomic, strong, nullable) NSDictionary *extraInfoDic;

@end



#pragma mark - WXAppExtendObject
/*! @brief 多媒体消息中包含的App扩展数据对象
 *
 * 第三方程序向微信终端发送包含WXAppExtendObject的多媒体消息，
 * 微信需要处理该消息时，会调用该第三方程序来处理多媒体消息内容。
 * @note url，extInfo和fileData不能同时为空
 * @see WXMediaMessage
 */
@interface WXAppExtendObject : NSObject
/*! @brief 返回一个WXAppExtendObject对象
 *
 * @note 返回的WXAppExtendObject对象是自动释放的
 */
+ (WXAppExtendObject *)object;

/** 若第三方程序不存在，微信终端会打开该url所指的App下载地址
 * @note 长度不能超过10K
 */
@property (nonatomic, copy) NSString *url;
/** 第三方程序自定义简单数据，微信终端会回传给第三方程序处理
 * @note 长度不能超过2K
 */
@property (nonatomic, copy, nullable) NSString *extInfo;
/** App文件数据，该数据发送给微信好友，微信好友需要点击后下载数据，微信终端会回传给第三方程序处理
 * @note 大小不能超过10M
 */
@property (nonatomic, strong, nullable) NSData *fileData;

@end



#pragma mark - WXEmoticonObject
/*! @brief 多媒体消息中包含的表情数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的表情数据对象。
 * @see WXMediaMessage
 */
@interface WXEmoticonObject : NSObject

/*! @brief 返回一个WXEmoticonObject对象
 *
 * @note 返回的WXEmoticonObject对象是自动释放的
 */
+ (WXEmoticonObject *)object;

/** 表情真实数据内容
 * @note 大小不能超过10M
 */
@property (nonatomic, strong) NSData *emoticonData;

@end



#pragma mark - WXFileObject
/*! @brief 多媒体消息中包含的文件数据对象
 *
 * @see WXMediaMessage
 */
@interface WXFileObject : NSObject

/*! @brief 返回一个WXFileObject对象
 *
 * @note 返回的WXFileObject对象是自动释放的
 */
+ (WXFileObject *)object;

/** 文件后缀名
 * @note 长度不超过64字节
 */
@property (nonatomic, copy) NSString *fileExtension;

/** 文件真实数据内容
 * @note 大小不能超过10M
 */
@property (nonatomic, strong) NSData *fileData;

@end


#pragma mark - WXLocationObject
/*! @brief 多媒体消息中包含的地理位置数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的地理位置数据对象。
 * @see WXMediaMessage
 */
@interface WXLocationObject : NSObject

/*! @brief 返回一个WXLocationObject对象
 *
 * @note 返回的WXLocationObject对象是自动释放的
 */
+ (WXLocationObject *)object;

/** 地理位置信息
 * @note 经纬度
 */
@property (nonatomic, assign) double lng; //经度
@property (nonatomic, assign) double lat; //纬度

@end

#pragma mark - WXTextObject
/*! @brief 多媒体消息中包含的文本数据对象
 *
 * 微信终端和第三方程序之间传递消息中包含的文本数据对象。
 * @see WXMediaMessage
 */
@interface WXTextObject : NSObject

/*! @brief 返回一个WXTextObject对象
 *
 * @note 返回的WXTextObject对象是自动释放的
 */
+ (WXTextObject *)object;

/** 地理位置信息
 * @note 文本内容
 */
@property (nonatomic, copy) NSString *contentText;

@end

#pragma mark - WXMiniProgramObject

@interface WXMiniProgramObject : NSObject

/*! @brief WXMiniProgramObject对象
 *
 * @note 返回的WXMiniProgramObject对象是自动释放的
 */
+ (WXMiniProgramObject *)object;

/** 低版本网页链接
 * @attention 长度不能超过1024字节
 */
@property (nonatomic, copy) NSString *webpageUrl;

/** 小程序username */
@property (nonatomic, copy) NSString *userName;

/** 小程序页面的路径
 * @attention 不填默认拉起小程序首页
 */
@property (nonatomic, copy, nullable) NSString *path;

/** 小程序新版本的预览图
 * @attention 大小不能超过128k
 */
@property (nonatomic, strong, nullable) NSData *hdImageData;

/** 是否使用带 shareTicket 的转发 */
@property (nonatomic, assign) BOOL withShareTicket;

/** 分享小程序的版本
 * @attention （正式，开发，体验）
 */
@property (nonatomic, assign) WXMiniProgramType miniProgramType;

/** 是否禁用转发 */
@property (nonatomic, assign) BOOL disableForward;

@property (nonatomic, assign) BOOL isUpdatableMessage;

@property (nonatomic, assign) BOOL isSecretMessage;


/** 业务所需的额外信息 */
@property (nonatomic, strong, nullable) NSDictionary *extraInfoDic;

@end

#pragma mark - WXGameLiveObject

/*! @brief WXGameLiveObject对象
 *
 * @note 游戏直播消息类型
 */

@interface WXGameLiveObject : NSObject

+ (WXGameLiveObject *)object;

/** 业务所需的额外信息 */
@property (nonatomic, strong, nullable) NSDictionary *extraInfoDic;

@end

@interface WXNativeGamePageObject : NSObject

/** 是否为视频类型
 */
@property (nonatomic, assign) BOOL isVideo;

/** 视频时长
 @note 当为视频类型时，必填；单位为秒
 */
@property (nonatomic, assign) UInt32 videoDuration;

/** 透传字段
 @note 长度限制为100K
 */
@property (nonatomic, copy) NSString *shareData;

/** 缩略图
 @note 大小限制为256K
 */
@property (nonatomic, strong) NSData *gameThumbData;

+ (WXNativeGamePageObject *)object;

@end

#pragma mark - WXLaunchMiniProgramReq

/*! @brief WXLaunchMiniProgramReq对象, 可实现通过sdk拉起微信小程序
 *
 * @note 返回的WXLaunchMiniProgramReq对象是自动释放的
 */
@interface WXLaunchMiniProgramReq : BaseReq

+ (WXLaunchMiniProgramReq *)object;

/** 小程序username */
@property (nonatomic, copy) NSString *userName;

/** 小程序页面的路径
 * @attention 不填默认拉起小程序首页
 */
@property (nonatomic, copy, nullable) NSString *path;

/** 分享小程序的版本
 * @attention （正式，开发，体验）
 */
@property (nonatomic, assign) WXMiniProgramType miniProgramType;

/** ext信息
 * @attention json格式
 */
@property (nonatomic, copy, nullable) NSString *extMsg;

/** extDic
 * @attention 字典，可存放图片等比较大的数据
 */
@property (nonatomic, copy, nullable) NSDictionary *extDic;

@end

#pragma mark - WXLaunchMiniProgramResp
/*! @brief 微信终端向第三方程序返回的WXLaunchMiniProgramReq处理结果。
 *
 * 第三方程序向微信终端发送WXLaunchMiniProgramReq后，微信发送回来的处理结果，该结果用WXLaunchMiniProgramResp表示。
 */
@interface WXLaunchMiniProgramResp : BaseResp

@property (nonatomic, copy, nullable) NSString *extMsg;

@end


#pragma mark - WXOpenBusinessViewReq
/*! @brief WXOpenBusinessViewReq对象, 可实现第三方通知微信启动，打开业务页面
 *
 * @note 返回的WXOpenBusinessViewReq对象是自动释放的
 */

@interface WXOpenBusinessViewReq : BaseReq

+ (WXOpenBusinessViewReq *)object;

/** 业务类型
 */
@property (nonatomic, copy) NSString *businessType;

/** 业务参数
 */
@property (nonatomic, copy, nullable) NSString *query;

/** ext信息
 * @note 选填，json格式
 */
@property (nonatomic, copy, nullable) NSString *extInfo;

/** extData数据
 * @note
 */
@property (nonatomic, strong, nullable) NSData *extData;
@end


@interface WXOpenBusinessViewResp : BaseResp

/** 业务类型
 */
@property (nonatomic, copy) NSString *businessType;

/** 业务返回数据
 */
@property (nonatomic, copy, nullable) NSString *extMsg;

@end

#pragma mark - WXOpenCustomerServiceReq
@interface WXOpenCustomerServiceReq : BaseReq

+ (WXOpenCustomerServiceReq *)object;

/**企微客服发起流程 url
 */
@property (nonatomic, copy, nullable) NSString *url;

/**企业 id
 */
@property (nonatomic, copy, nullable) NSString *corpid;

@end

@interface WXOpenCustomerServiceResp : BaseResp

/** 业务返回数据
 */
@property (nonatomic, copy, nullable) NSString *extMsg;

@end


#pragma mark - WXChannelStartLiveReq

@interface WXChannelStartLiveReq : BaseReq

+ (WXChannelStartLiveReq *)object;

/** 必填，直播业务数据（json格式）
 */
@property (nonatomic, copy) NSString *liveJsonInfo;

@end

@interface WXChannelStartLiveResp : BaseResp

/** 业务返回数据
 */
@property (nonatomic, copy, nullable) NSString *extMsg;

@end

NS_ASSUME_NONNULL_END
