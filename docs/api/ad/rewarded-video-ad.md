### 激励视频广告

- app端的广告源由腾讯广点通、头条穿山甲广告联盟提供，DCloud负责聚合
- 小程序端的广告由小程序平台提供

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.5.11+）|x|√|x|x|x|x|

**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
    * 小程序平台：在各自的小程序管理后台操作。
2. 申请广告位id
在各位后台申请广告位id
3. App端打包后生效，打包时必须选择要集成的广告SDK（穿山甲、广点通）。


激励视频广告组件是由客户端原生的图片、文本、视频控件组成的，层级最高，会覆盖在普通组件上。

### 广告创建

开发者可以调用 uni.createRewardedVideoAd 创建激励视频广告组件。该方法返回的是一个单例，该实例仅对当前页面有效，不允许跨页面使用。

激励视频广告组件默认是隐藏的，因此可以提前创建，以提前初始化组件。开发者可以在页面的 `onReady` 事件回调中创建广告实例，并在该页面的生命周期内重复调用该广告实例。

```
<script>
    let rewardedVideoAd = null;
    export default {
        data() {
            return {
                title: 'createRewardedVideoAd'
            }
        },
        onReady() {
            if(uni.createRewardedVideoAd) {
                rewardedVideoAd = uni.createRewardedVideoAd({ adpid: 'xxxx' })
                rewardedVideoAd.onLoad(() => {
                    console.log('onLoad event')
                })
                rewardedVideoAd.onError((err) => {
                    console.log('onError event', err)
                })
                rewardedVideoAd.onClose((res) => {
                    console.log('onClose event', res)
                })
            }
        },
        methods: {
        }
    }
</script>
```

为避免滥用广告资源，目前每个用户每天可观看激励式视频广告的次数有限，建议展示广告按钮前先判断广告是否拉取成功。

### 显示/隐藏
激励视频广告组件默认是隐藏的，在用户主动触发广告后，开发者需要调用 RewardedVideoAd.show() 进行显示。

```
rewardedVideoAd.show()
```

只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。开发者不可控制激励视频广告组件的隐藏。

### 广告拉取成功与失败

激励视频广告组件是自动拉取广告并进行更新的。在组件创建后会拉取一次广告，用户点击 关闭广告 后会去拉取下一条广告。

如果拉取成功，通过 `RewardedVideoAd.onLoad()` 注册的回调函数会执行，`RewardedVideoAd.show()` 返回的 Promise 也会是一个 resolved Promise。两者的回调函数中都没有参数传递。

```
rewardedVideoAd.onLoad(() => {
  console.log('激励视频 广告加载成功')
})

rewardedVideoAd.show()
.then(() => console.log('激励视频 广告显示'))
```

如果拉取失败，通过 `RewardedVideoAd.onError()` 注册的回调函数会执行，回调函数的参数是一个包含错误信息的对象。常见异常错误参考文档

```
rewardedVideoAd.onError(err => {
  console.log(err)
})
```

`RewardedVideoAd.show()` 返回的 Promise 也会是一个 rejected Promise。

```
rewardedVideoAd.show()
.catch(err => console.log(err))
```

### 拉取失败，重新拉取

如果组件的某次自动拉取失败，那么之后调用的 show() 将会被 reject。此时可以调用 `RewardedVideoAd.load()` 手动重新拉取广告。

```
rewardedVideoAd.show()
.catch(() => {
    rewardedVideoAd.load()
    .then(() => rewardedVideoAd.show())
    .catch(err => {
      console.log('激励视频 广告显示失败')
    })
})
```

如果组件的自动拉取是成功的，那么调用 `load()` 方法会直接返回一个 resolved Promise，而不会去拉取广告。

```
rewardedVideoAd.load()
.then(() => rewardedVideoAd.show())
```

### 监听用户关闭广告

只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。这个事件可以通过 `RewardedVideoAd.onClose()` 监听。

`RewardedVideoAd.onClose()` 的回调函数会传入一个参数 res，res.isEnded 描述广告被关闭时的状态。


|属性|类型|说明|
|:-:|:-:|:-:|
|isEnded|boolean|视频是否是在用户完整观看的情况下被关闭的，true 表示用户是在视频播放完以后关闭的视频，false 表示用户在视频播放过程中关闭了视频


开发者需要根据 res.isEnded 判断是否视频是否播放结束、可以向用户下发奖励。

```
rewardedVideoAd.onClose(res => {
    // 用户点击了【关闭广告】按钮
    if (res && res.isEnded) {
      // 正常播放结束
    } else {
      // 播放中途退出
    }
})
```


### 服务器回调(App平台 HBuilderX 2.6.8，仅穿山甲支持)

激励视频广告可以支持广告服务器到业务服务器的回调，用于业务系统判断是否提供奖励给观看广告的用户。配置服务器回调后，当用户成功看完广告时，广告服务器会访问配置的回调链接，通知用户完成观看激励视频。

相对来讲服务器回调将更加安全，可以依赖广告平台的反作弊机制来避免用户模拟观看广告完成的事件。

如何使用
1. 申请激励视频广告位时开启服务器回调
2. 创建激励视频广告时传入回调参数


urlCallback示例

```
rewardedVideoAd = uni.createRewardedVideoAd({
  adpid: '',
  urlCallback: {
    amount: '6',
    name: 'RewardVideoAD1',
    userId: 'testuser',
    extra: 'testdata'
  }
});
```

### 服务器回调数据说明

当最终用户观看激励视频广告完成后，广告服务器会议GET方式请求业务服务器的回调链接，并拼接以下参数回传：
`user_id=%s&trans_id=%s&reward_name=%s&reward_amount=%d&extra=%s&sign=%s`

|字段名称|说明|字段类型|备注|
:-|:-|:-|:-|
|sign|签名|String|签名信息|
|user_id|用户id|String	|调用API传入的userId|
|trans_id|交易id|String	|广告平台生成的唯一交易ID|
|reward_amount|奖励数量|String	|广告后台配置或调用API传入的amount|
|reward_name|奖励名称|String|广告后台配置或调用API传入的name|
|extra|自定义数据，可以为空|String|透传给回调服务器的数据，调用API传入的extra|

#### 签名信息

在uni-AD广告平台申请激励视频广告位通过后，如果开启服务器回调则会生成appSecurityKey。
appSecurityKey用于签名校验服务器回调请求的合法性（请务必保管好），sign字段值生成规则为：sign=sha256(appSecurityKey,trans_id)
Python示例：

```
import hashlib

if __name__ == "__main__":
    trans_id = "6FEB23ACB0374985A2A52D282EDD5361u6643"
    app_security_key = "7ca31ab0a59d69a42dd8abc7cf2d8fbd"
    check_sign_raw = "%s:%s" % (app_security_key, trans_id)
    sign = hashlib.sha256(check_sign_raw).hexdigest()
```

#### 回调请求返回数据约定

返回json数据，字段如下：

|字段名称|说明|字段类型|备注|
:-|:-|:-|:-|
|isValid|校验结果|Blean|判定结果，是否发放奖励|

示例
```
{
  "isValid": true
}
```



### app平台错误码

code|message|
:-|:-|
-5001|广告位标识adpid为空，请传入有效的adpid
-5002|无效的广告位标识adpid，请使用正确的adpid
-5003|未开通广告，请在广告平台申请并确保已审核通过
-5004|无广告模块，打包时请配置要使用的广告模块
-5005|广告加载失败，请尝试重新加载
-5006|广告未加载完成无法播放，请加载完成后再调show播放
-5007|无法获取广告配置数据，请尝试重试
-5100|其他错误，聚合广告商内部错误


**注意事项**
- 多次调用 `RewardedVideoAd.onLoad()`、`RewardedVideoAd.onError()`、`RewardedVideoAd.onClose()` 等方法监听广告事件会产生多次事件回调，建议在创建广告后监听一次即可，或者先取消原有的监听事件再重新监听。
- 仅 V3 编译支持，参考 manifest.json 配置

**AD组件**
文档地址：[https://uniapp.dcloud.io/component/ad](https://uniapp.dcloud.io/component/ad)
