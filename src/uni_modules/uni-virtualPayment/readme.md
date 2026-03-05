# uni-virtualPayment
实现苹果应用内支付功能，仅iOS平台支持。  
[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/virtual-payment.html)  


## uts 语言介绍  
uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

Android平台：编译为Kotlin  
iOS平台：编译Swift  
鸿蒙OS平台：编译为ArkTS  
web平台/小程序：编译为JavaScript  

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。

但为了跨端，uts进行了一些约束和特定平台的增补。

过去在js引擎下运行支持的语法，大部分在uts的处理下也可以平滑的在kotlin和swift中使用。但有一些无法抹平，需要使用条件编译。

和uni-app的条件编译类似，uts也支持条件编译。写在条件编译里的，可以调用平台特有的扩展语法。


## uts 插件介绍
UTS 插件是一种特定的 uni_modules 插件，其核心目的是允许 uni-app/uni-app x 开发者使用 UTS 语法来调用扩展 API（封装原生系统的API或三方SDK）。  

UTS 插件的实现代码主要位于 utssdk 目录下，并按平台进行分离和组织：  
| 目录/文件 | 目标平台 | 实现语言 | 作用描述 |
| -- | -- | -- | -- |
|utssdk/app-android|Android|UTS, Kotlin, Java|存放 UTS 插件在 Android 平台上的具体实现源码|
|utssdk/app-ios|iOS|UTS, Swift|存放 UTS 插件在 iOS 平台上的具体实现源码|
|utssdk/app-harmony|HarmonyOS (鸿蒙)|UTS, ArkTS|存放 UTS 插件在 HarmonyOS 平台上的具体实现源码|
|utssdk/*.uts|多平台共用|UTS|存放使用 UTS 语言编写的、可供 所有平台 共用的实现源码|


## 参考文档  
- [uts 语言介绍](https://doc.dcloud.net.cn/uni-app-x/uts/)
- [uts 和 ts 的差异](https://doc.dcloud.net.cn/uni-app-x/uts/uts_diff_ts.html)
- [uts 插件开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html)
- [uts 插件原生语言混编开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html)
- [uts 插件 Android 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html)
- [uts 插件 iOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
- [uts 插件 HarmonyOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)


# 苹果虚拟支付（IAP）详细文档

## 概述

以下文档详细介绍了uni-app、uni-app-x 项目中苹果IAP（In-App Purchase）内购功能的实现方法，包括API使用、产品类型、错误处理等完整内容。
[详见：uni-app-x IAP 文档](https://doc.dcloud.net.cn/uni-app-x/api/virtual-payment.html)

## 重要说明

### 系统要求
- **iOS版本要求**：仅支持iOS 15.0及以上版本
- **框架说明**：采用Apple的StoreKit2框架实现
- **审核建议**：为避免App Store审核问题，建议在iOS 15.0以下版本隐藏购买入口

## 产品类型详解

### 1. 消耗性产品（Consumable）
- **特点**：可重复购买，购买后消耗使用
- **数量设置**：支持设置购买数量（1-10个）
- **示例**：游戏金币、道具、会员天数等
- **恢复机制**：无法通过`restoreTransactions`恢复，只能通过`getUnfinishedTransactions`获取未完成的交易

### 2. 非消耗性产品（Non-Consumable）
- **特点**：一次购买，永久拥有
- **数量限制**：同一Apple ID只能购买一次
- **跨设备**：可在登录同一Apple ID的任何设备上恢复
- **示例**：去广告功能、永久VIP、解锁功能等


### 3. 自动续期订阅产品（Auto-Renewable Subscription）
- **特点**：自动续费的订阅服务
- **续费机制**：到期前自动续费
- **沙盒限制**：沙盒环境最多自动续订12次
- **示例**：月度会员、年度订阅等

### 4. 非自动续期订阅产品（Non-Renewable Subscription）
- **特点**：不自动续费的订阅服务
- **续费方式**：需要用户手动续费
- **时效管理**：开发者需要自己管理订阅过期时间
- **示例**：月卡、季卡等

## 核心API详解

### 1. 获取支付管理器

```javascript
const virtualPaymentManager = uni.getVirtualPaymentManager();
```

### 2. 发起购买请求

#### 基本用法
```javascript
uni.requestVirtualPayment({
    apple: {
        productId: "your_product_id",           // 产品ID（必填，需要替换为您app在Apple Developer Center配置的实际内购产品ID
        appAccountToken: "UUID_FORMAT_STRING",  // 用户标识（可选，需UUID格式,如："123eaaaa-e89b-12d3-a456-42661417400b"）
        quantity: 1,                            // 购买数量（可选，默认1）
        promotionalOffer: {                     // 促销优惠（可选）
            offerIdentifier: "offer_id",
            keyIdentifier: "key_id", 
            nonce: "nonce_string",
            signature: "signature_string",
            timestamp: 1234567890
        }
    },
    success: (res) => {
        console.log("购买成功", res.apple);
        // TODO: 服务器验证逻辑
        
        // 验证成功后必须关闭交易
        virtualPaymentManager.finishTransaction({
            transaction: res.apple,
            success: () => console.log("关单成功"),
            fail: (e) => console.log("关单失败", e)
        });
    },
    fail: (e) => {
        console.log("购买失败", e.errCode, e.errMsg);
    }
});
```

#### 参数说明
- **productId**: app在Apple Developer Center配置的对应内购产品ID
- **appAccountToken**: 用户标识，用于关联用户账户和购买记录，必须是符合uuid规则的字符串，如："123eaaaa-e89b-12d3-a456-42661417400b"
- **quantity**: 购买数量，仅对消耗性产品有效，范围1-10
- **promotionalOffer**: 促销优惠参数，用于订阅产品的优惠活动

### 3. 恢复购买记录

```javascript
virtualPaymentManager.restoreTransactions({
    success: (res) => {
        console.log(`恢复成功，共${res.transactions.length}个交易`);
        res.transactions.forEach(transaction => {
            console.log("产品ID:", transaction.productId);
            // TODO: 服务器验证逻辑
        });
    },
    fail: (e) => {
        console.log("恢复失败", e.errCode, e.errMsg);
    }
});
```

#### 适用产品类型
- ✅ 非消耗性产品：返回所有已购买的产品
- ✅ 自动续期订阅：返回最新的购买记录
- ✅ 非自动续期订阅：返回最新的购买记录
- ❌ 消耗性产品：无法恢复

### 4. 获取未完成交易

```javascript
virtualPaymentManager.getUnfinishedTransactions({
    success: (res) => {
        console.log(`未完成交易数量：${res.transactions.length}`);
        res.transactions.forEach(transaction => {
            console.log("未完成产品ID:", transaction.productId);
            // TODO: 服务器验证逻辑
            
            // 验证成功后关闭交易
            virtualPaymentManager.finishTransaction({
                transaction: transaction,
                success: () => console.log("关单成功"),
                fail: (e) => console.log("关单失败", e)
            });
        });
    },
    fail: (e) => {
        console.log("获取失败", e.errCode, e.errMsg);
    }
});
```

#### 使用场景
- 防止丢单：用户付款成功但因网络问题未收到确认
- 消耗性产品：唯一的恢复方式
- 应用启动时：检查是否有未处理的交易

### 5. 完成后关闭交易

```javascript
virtualPaymentManager.finishTransaction({
    transaction: transactionObject,  // 交易对象
    success: (res) => {
        console.log("交易关闭成功", res.state);
    },
    fail: (e) => {
        console.log("关单失败", e.errCode, e.errMsg);
    }
});
```

## 交易对象结构

```javascript
{
    productId: "产品ID（必填，需要替换为您app在Apple Developer Center配置的实际内购产品ID)"
    appAccountToken: "用户标识（可选，需UUID格式,如：123eaaaa-e89b-12d3-a456-42661417400b)",
    quantity: 1,  // 购买数量
    transactionDate: "2023-01-01 08:00:00",  // 交易时间
    transactionIdentifier: "交易唯一标识",
    originalTransactionDate: "2023-01-01 08:00:00",  // 原始交易时间
    originalTransactionIdentifier: "原始交易标识",
    jsonRepresentation: "支付票据JSON字符串"  // 用于服务器验证
}
```

## 错误码对照表

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 700600 | 正在处理中，结果未知 | 等待处理完成或重试 |
| 700601 | 用户取消支付 | 提示用户重新尝试 |
| 700602 | 网络连接错误 | 检查网络连接 |
| 700604 | 不允许App内购买 | 引导用户开启内购权限 |
| 700605 | 产品无效 | 检查产品ID配置 |
| 700606 | 促销信息错误 | 检查促销参数配置 |
| 700607 | 缺少支付参数 | 检查必填参数 |
| 700800 | 系统版本过低 | 提示用户升级iOS |
| 700000 | 其他未知错误 | 联系技术支持 |

## 最佳实践

### 1. 服务器验证流程
```javascript
// 购买成功后的处理流程
success: (res) => {
    // 1. 获取交易信息
    const transaction = res.apple;
    const transactionId = transaction.transactionIdentifier;
    
    // 2. 发送交易ID到自己的服务器进行验证
    // 注意：实际的Apple API验证应该在服务器端完成，不应在客户端直接调用
    uni.request({
        url: 'https://your-server.com/verify-transaction',
        method: 'POST',
        data: {
            transactionId: transactionId,
            productId: transaction.productId,
            userId: getCurrentUserId(),
            transactionData: transaction
        },
        success: (verifyRes) => {
            if (verifyRes.data.success) {
                // 3. 验证成功，发放商品
                deliverProduct(transaction.productId);
                
                // 4. 关闭交易
                this.virtualPaymentManager.finishTransaction({
                    transaction: transaction,
                    success: () => console.log("关单成功"),
                    fail: (e) => console.log("关单失败", e)
                });
            } else {
                console.error("服务器验证失败");
            }
        },
        fail: (error) => {
            console.error("验证请求失败", error);
        }
    });
}
```

### 2. 应用启动时检查
```javascript
onLoad() {
    // 检查未完成的交易
    this.checkUnfinishedTransactions();
}

checkUnfinishedTransactions() {
    this.virtualPaymentManager.getUnfinishedTransactions({
        success: (res) => {
            if (res.transactions.length > 0) {
                console.log(`发现${res.transactions.length}个未完成交易`);
                // 处理未完成的交易，处理每笔transaction后，需要关闭，调用this.virtualPaymentManager.finishTransaction()
                this.processUnfinishedTransactions(res.transactions);
            }
        }
    });
}
```

### 3. 错误处理
```javascript
handlePaymentError(error) {
    switch(error.errCode) {
        case 700601:
            uni.showToast({ title: "支付已取消", icon: "none" });
            break;
        case 700602:
            uni.showToast({ title: "网络错误，请重试", icon: "none" });
            break;
        case 700604:
            uni.showModal({
                title: "提示",
                content: "请在设置中开启App内购买权限",
                confirmText: "去设置"
            });
            break;
        case 700605:
            uni.showToast({ title: "商品暂时无法购买", icon: "none" });
            break;
        case 700800:
            uni.showModal({
                title: "系统要求",
                content: "需要iOS 15.0以上版本才能使用内购功能",
                showCancel: false
            });
            break;
        default:
            uni.showToast({ title: "支付失败，请重试", icon: "none" });
    }
}
```

### 4. 产品信息本地化
```javascript
const productList = [
    {
        id: "com.yourapp.consumable.coins100",
        name: "100金币",
        description: "购买100个游戏金币",
        price: "¥6.00",
        type: "consumable",
        quantity: 1
    },
    {
        id: "com.yourapp.nonconsumable.vip",
        name: "永久VIP",
        description: "解锁所有VIP功能",
        price: "¥30.00",
        type: "nonconsumable"
    }
];
```

## 注意事项

1. **版本兼容性**：仅支持iOS 15.0+，低版本需要隐藏购买功能
2. **产品ID配置**：必须与Apple Developer Center中的配置完全一致
3. **交易完成**：每次成功购买后必须调用`finishTransaction`
4. **服务器验证**：生产环境必须进行服务器端验证
5. **错误处理**：提供友好的错误提示和处理方案
6. **沙盒测试**：开发阶段使用沙盒账户进行测试
7. **用户体验**：提供恢复购买功能，特别是对非消耗性产品

## 开发者验单逻辑说明

### 验单说明

开发者服务器的验单流程完全由开发者自己实现，该流程不受框架影响。

与IAP相关的服务器逻辑比较复杂，Uni封装了相关的插件[**uni-pay**](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app-x.html#appleiap)，不但减少开发者服务器相关开发的工作量，而且可以高效接入IAP功能，推荐使用uni-pay插件。uni-pay是一个云端一体的开源组件，下载这个插件，客户端和服务器代码都已封装好，开发者填入参数即可使用。

注意： 
1. uni-app 1.0上的内购逻辑不是 uni-virtualPayment 插件，是基于 Apple StoreKit1.0 框架封装的；uni-app-x 上的内购逻辑是基于uni-virtualPayment 插件；
2. uni-app 1.0上如果使用uni-virtualPayment 插件功能，不可以直接使用 uni-pay 插件。

### 验单涉及到的API

#### 1. uni.requestVirtualPayment()
购买成功并且获取到对应的交易信息后，需要先验单成功，再通过`uni.getVirtualPaymentManager().finishTransaction`关单。

```javascript
uni.requestVirtualPayment({
    apple: { productId: "your_product_id" },
    success: (res) => {
        // 1. 获取交易信息
        const transaction = res.apple;
        
        // 2. 发送到服务器验证
        verifyTransactionOnServer(transaction).then(() => {
            // 3. 验证成功后关单
            uni.getVirtualPaymentManager().finishTransaction({
                transaction: transaction,
                success: () => console.log("关单成功"),
                fail: (e) => console.log("关单失败", e)
            });
        });
    }
});
```

#### 2. uni.getVirtualPaymentManager().getUnfinishedTransactions()
获取苹果服务器已支付且未关闭的交易列表后，每笔交易都需要先验单成功，再通过`uni.getVirtualPaymentManager().finishTransaction`关单。

```javascript
uni.getVirtualPaymentManager().getUnfinishedTransactions({
    success: (res) => {
        res.transactions.forEach(transaction => {
            // 对每笔未完成交易进行验证
            verifyTransactionOnServer(transaction).then(() => {
                // 验证成功后关单
                uni.getVirtualPaymentManager().finishTransaction({
                    transaction: transaction,
                    success: () => console.log("关单成功"),
                    fail: (e) => console.log("关单失败", e)
                });
            });
        });
    }
});
```

### 服务器验单机制

服务器调用Apple提供的验单API，具体参考Apple文档：

#### StoreKit 2.0 验单API（推荐）
由于当前采用Apple最新的StoreKit 2.0版本，验单API不同于StoreKit 1.0版本。

- **正式环境**：`https://api.storekit.itunes.apple.com/inApps/v1/transactions/{transactionId}`
- **Sandbox环境**：`https://api.storekit-sandbox.itunes.apple.com/inApps/v1/transactions/{transactionId}`

#### 服务器端验单流程示例
```javascript
// 服务器端验单逻辑示例（Node.js/Express）
app.post('/verify-transaction', async (req, res) => {
    const { transactionId, productId, userId } = req.body;
    
    try {
        // 调用Apple的StoreKit 2.0 API验证交易
        const verificationResult = await verifyTransactionWithApple(transactionId);
        
        if (verificationResult.isValid) {
            // 验证成功，记录到数据库并发放商品
            await recordTransaction(userId, productId, transactionId);
            await deliverProduct(userId, productId);
            
            res.json({ success: true, message: '验证成功' });
        } else {
            res.json({ success: false, message: '验证失败' });
        }
    } catch (error) {
        console.error('验单失败:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 调用Apple API验证交易
async function verifyTransactionWithApple(transactionId, environment = 'production') {
    const baseUrl = environment === 'sandbox' 
        ? 'https://api.storekit-sandbox.itunes.apple.com'
        : 'https://api.storekit.itunes.apple.com';
    
    try {
        const response = await fetch(`${baseUrl}/inApps/v1/transactions/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${yourJWTToken}`,  // 需要使用Apple的JWT Token
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            return { isValid: true, data: result };
        } else {
            return { isValid: false, error: `HTTP ${response.status}` };
        }
    } catch (error) {
        console.error('Apple API调用失败:', error);
        throw error;
    }
}
```

#### StoreKit 1.0 验单API（已废弃）
**注意**：StoreKit 1.0版本的验单API已被Apple废弃，不推荐使用。

### 使用App Store Server Notifications V2机制

该通知机制是当发生有效购买后Apple服务器主动通知开发者自己服务器具体交易信息的机制，需要开发者自己的服务器按照Apple相关要求进行正确配置后才能生效。

#### 配置步骤
1. 在Apple Developer Center配置服务器通知URL
2. 设置服务器端点接收Apple的通知
3. 验证通知的真实性和完整性
4. 处理不同类型的通知事件

#### 相关文档参考
- [App Store Server API](https://developer.apple.com/documentation/appstoreserverapi)
- [Enabling App Store Server Notifications](https://developer.apple.com/documentation/storekit/in-app_purchase/enabling_app_store_server_notifications)
- [Enter server URLs for App Store Server Notifications](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/enter-server-urls-for-app-store-server-notifications)

#### 通知处理示例
```javascript
// 服务器端处理App Store通知的示例
app.post('/app-store-notifications', (req, res) => {
    const notification = req.body;
    
    // 1. 验证通知签名
    if (!verifyNotificationSignature(notification)) {
        return res.status(400).send('Invalid signature');
    }
    
    // 2. 处理不同类型的通知
    switch (notification.notificationType) {
        case 'INITIAL_BUY':
        case 'RENEWAL':
            // 处理购买和续费
            handlePurchase(notification.data);
            break;
        case 'REFUND':
            // 处理退款
            handleRefund(notification.data);
            break;
        // 其他通知类型...
    }
    
    res.status(200).send('OK');
});
```

### 验单最佳实践

1. **双重验证**：同时使用客户端验单和服务器通知机制
2. **重试机制**：网络失败时实现重试逻辑
3. **幂等性**：确保重复验单不会造成重复发货
4. **日志记录**：详细记录验单过程用于排查问题
5. **安全性**：妥善保护JWT密钥和其他敏感信息
