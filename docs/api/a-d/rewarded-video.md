**激励视频广告**

### 简介

激励视频广告，是cpm收益最高的广告形式。

手机用户观看几十秒视频广告，在广告播放完毕后可获得应用开发商提供的奖励，而应用开发商则可以从广告平台获取不菲的广告收入。

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/23fcff30-441f-11eb-b680-7980c8a877b8.png)

与开屏、信息流等广告变现方式不同，激励视频收益高、但场景设计和编程工作量也较高。

激励视频广告的场景灵活多样：
- 游戏内看广告复活、看广告拿高级道具
- 合成类游戏，看广告获得道具，比如各种养龙、养凤凰、养牛、养蟹......
- 走路赚钱、看短视频赚钱、猜歌赚钱等应用也非常多
- 网赚应用中，做各种任务赚钱，或者想要接赚钱的任务，前提是观看激励视频
- 增值内容消费，比如小说、电影看一半，剩下的需要看广告后才能继续
- 区块链应用融合激励视频，比如看广告提高收益或提高挖矿成功率

激励视频还经常和邀请裂变结合在一起，应用开发者为用户设计邀请好友的奖励，让用户有动力邀请更多用户使用这个应用。

激励视频是造富神器。行业经常出现几个人的团队，月收入百万的奇迹。均是因为良好的设计了激励场景和裂变模型。


**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.5.11+）|x|√|x|x|√（1.57.0+）|√（0.1.26+）|

- app端的广告源由腾讯优量汇、头条穿山甲、快手等广告联盟提供，DCloud负责聚合
- 小程序端的广告由小程序平台提供

**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
    * 小程序平台：在各自的小程序管理后台操作。
2. 申请广告位id
在各位后台申请广告位id
3. App端打包后生效，打包时必须选择要集成的广告SDK（优量汇、穿山甲、快手）。


激励视频广告组件是原生组件，层级最高，会覆盖在普通前端组件上。


### 语法

`uni.createRewardedVideoAd(options)`

### 参数说明
options 为 object 类型，属性如下：

|属性名		|类型		|必填	|描述			|最低支持版本	|
|:-:|:-:|:-:|:-:|:-:|
|adpid	  |string	|	是|广告位 id |App 2.5.11+|
|adUnitId	|string	|	是|广告位 id |微信小程序2.6.0+, QQ0.1.26+， 字节跳动1.57.0+|


### 返回值

返回值为 RewarededVideoAd 类型，属性如下：

|属性名|类型|描述|最低支持版本|
|:-:|:-:|:-:|:-:|
|show|Function|广告创建后默认是隐藏的，可以通过该方法显示广告|App 2.5.11+, 微信小程序2.6.0+, QQ0.1.26+，字节跳动1.57.0+|
|onLoad|Function|绑定广告 load 事件的监听器|App 2.5.11+, 微信小程序2.6.0+, QQ0.1.26+，字节跳动1.57.0+|
|offLoad|Function|解除绑定 load 事件的监听器|QQ0.1.26+，字节跳动1.57.0+|
|load|Function|当广告素材加载出现错误时，可以通过 load 方法手动加载|App 2.5.11+, 微信小程序2.6.0+, QQ0.1.26+，字节跳动1.57.0+|
|onError|Function|绑定 error 事件的监听器	|App 2.5.11+, 微信小程序2.6.0+, QQ0.1.26+，字节跳动1.57.0+|
|offError|Function|解除绑定 error 事件的监听器|QQ0.1.26+，字节跳动1.57.0+|
|onClose|Function|绑定 close 事件的监听器|App 2.5.11+, 微信小程序2.6.0+, QQ0.1.26+，字节跳动1.57.0+|
|offClose|Function|解除绑定 close 事件的监听器|QQ0.1.26+，字节跳动1.57.0+|


### 广告创建

开发者可以调用 `uni.createRewardedVideoAd` 创建激励视频广告组件。

激励视频广告组件默认是隐藏的，因此可以提前创建，以提前初始化组件。开发者可以在页面的 `onReady` 事件回调中创建广告实例，并在该页面的生命周期内重复调用该广告实例。

```html
<script>
    export default {
        data() {
            return {
                title: 'createRewardedVideoAd'
            }
        },
        onReady() {
          this._isLoaded = false
          rewardedVideoAd = this._rewardedVideoAd = uni.createRewardedVideoAd({ adpid: '1507000689' }) // 仅用于HBuilder基座调试 adpid: '1507000689'
          rewardedVideoAd.onLoad(() => {
            this._isLoaded = true
            console.log('onLoad event')
            // 当激励视频被关闭时，默认预载下一条数据，加载完成时仍然触发 `onLoad` 事件
          })
          rewardedVideoAd.onError((err) => {
            console.log('onError event', err)
          })
          rewardedVideoAd.onClose((res) => {
            console.log('onClose event', res)
          })
        },
        methods: {
          show() {
            if (this._isLoaded) {
              this._rewardedVideoAd.show()
            }
          }
        }
    }
</script>
```


### 完整调用示例

支持多页面重复调用，可以传入不同广告位，默认处理了Loading状态、快速点击、数据过期、失败重试1次逻辑

推荐使用此方案

```html
<template>
  <view>
    <button type="primary" class="btn" @click="showRewardedVideoAd">显示激励视频广告</button>
    <button type="primary" class="btn" @click="showFullScreenVideoAd">显示全屏视频广告</button>
  </view>
</template>

<script>
  import AD from "../ad.js"

  export default {
    data() {
      return {
        title: '视频广告'
      }
    },
    onReady() {
      // 可选预载广告数据

      // AD.load({
      //   adpid: 1507000689,
      //   adType: "RewardedVideo"
      // });

      // AD.load({
      //   adpid: 1507000611,
      //   adType: "FullScreenVideo"
      // });
    },
    methods: {
      showRewardedVideoAd() {
        // 调用后会显示 loading 界面
        AD.show({
          adpid: 1507000689, // HBuilder 基座测试广告位
          adType: "RewardedVideo"
        }, (res) => {
          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束
            console.log("onClose " + res.isEnded);
          } else {
            // 播放中途退出
            console.log("onClose " + res.isEnded);
          }
        }, (err) => {
          // 广告加载错误
          console.log(err)
        })
      },
      showFullScreenVideoAd() {
        // 调用后会显示 loading 界面
        AD.show({
          adpid: 1507000611, // HBuilder 基座测试广告位
          adType: "FullScreenVideo"
        }, (res) => {
          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束
            console.log("onClose " + res.isEnded);
          } else {
            // 播放中途退出
            console.log("onClose " + res.isEnded);
          }
        }, (err) => {
          // 广告加载错误
          console.log(err)
        })
      }
    }
  }
</script>

```

```js
// ad.js
const ADType = {
  RewardedVideo: "RewardedVideo",
  FullScreenVideo: "FullScreenVideo"
}

class AdHelper {

  constructor() {
    this._ads = {}
  }

  load(options, onload, onerror) {
    let ops = this._fixOldOptions(options)
    let {
      adpid
    } = ops

    if (!adpid || this.isBusy(adpid)) {
      return
    }

    this.get(ops).load(onload, onerror)
  }

  show(options, onsuccess, onfail) {
    let ops = this._fixOldOptions(options)
    let {
      adpid
    } = ops

    if (!adpid) {
      return
    }

    uni.showLoading({
      mask: true
    })

    var ad = this.get(ops)

    ad.load(() => {
      uni.hideLoading()
      ad.show((e) => {
        onsuccess && onsuccess(e)
      })
    }, (err) => {
      uni.hideLoading()
      onfail && onfail(err)
    })
  }

  isBusy(adpid) {
    return (this._ads[adpid] && this._ads[adpid].isLoading)
  }

  get(options) {
    const {
      adpid
    } = options
    if (!this._ads[adpid]) {
      this._ads[adpid] = this._createAdInstance(options)
    }

    return this._ads[adpid]
  }

  _createAdInstance(options) {
    const adType = options.adType || ADType.RewardedVideo
    delete options.adType

    let ad = null;
    if (adType === ADType.RewardedVideo) {
      ad = new RewardedVideo(options)
    } else if (adType === ADType.FullScreenVideo) {
      ad = new FullScreenVideo(options)
    }

    return ad
  }

  _fixOldOptions(options) {
    return (typeof options === "string") ? {
      adpid: options
    } : options
  }
}

const EXPIRED_TIME = 1000 * 60 * 30
const ProviderType = {
  CSJ: 'csj',
  GDT: 'gdt'
}

const RETRY_COUNT = 1

class AdBase {
  constructor(adInstance, options = {}) {
    this._isLoad = false
    this._isLoading = false
    this._lastLoadTime = 0
    this._lastError = null
    this._retryCount = 0

    this._loadCallback = null
    this._closeCallback = null
    this._errorCallback = null

    const ad = this._ad = adInstance
    ad.onLoad((e) => {
      this._isLoading = false
      this._isLoad = true
      this._lastLoadTime = Date.now()

      this.onLoad()
    })
    ad.onClose((e) => {
      this._isLoad = false
      this.onClose(e)
    })
    ad.onVerify((e) => {
      // e.isValid
    })
    ad.onError(({
      code,
      message
    }) => {
      this._isLoading = false
      const data = {
        code: code,
        errMsg: message
      }

      if (code === -5008) {
        this._loadAd()
        return
      }

      if (this._retryCount < RETRY_COUNT) {
        this._retryCount += 1
        this._loadAd()
        return
      }

      this._lastError = data
      this.onError(data)
    })
  }

  get isExpired() {
    return (this._lastLoadTime !== 0 && (Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME))
  }

  get isLoading() {
    return this._isLoading
  }

  getProvider() {
    return this._ad.getProvider()
  }

  load(onload, onerror) {
    this._loadCallback = onload
    this._errorCallback = onerror

    if (this._isLoading) {
      return
    }

    if (this._isLoad) {
      this.onLoad()
      return
    }

    this._retryCount = 0

    this._loadAd()
  }

  show(onclose) {
    this._closeCallback = onclose

    if (this._isLoading || !this._isLoad) {
      return
    }

    if (this._lastError !== null) {
      this.onError(this._lastError)
      return
    }

    const provider = this.getProvider()
    if (provider === ProviderType.CSJ && this.isExpired) {
      this._loadAd()
      return
    }

    this._ad.show()
  }

  onLoad(e) {
    if (this._loadCallback != null) {
      this._loadCallback()
    }
  }

  onClose(e) {
    if (this._closeCallback != null) {
      this._closeCallback({
        isEnded: e.isEnded
      })
    }
  }

  onError(e) {
    if (this._errorCallback != null) {
      this._errorCallback(e)
    }
  }

  destroy() {
    this._ad.destroy()
  }

  _loadAd() {
    this._isLoad = false
    this._isLoading = true
    this._lastError = null
    this._ad.load()
  }
}

class RewardedVideo extends AdBase {
  constructor(options = {}) {
    super(plus.ad.createRewardedVideoAd(options), options)
  }
}

class FullScreenVideo extends AdBase {
  constructor(options = {}) {
    super(plus.ad.createFullScreenVideoAd(options), options)
  }
}

export default new AdHelper()

```


### 显示/隐藏
激励视频广告组件默认是隐藏的，在用户主动触发广告后，开发者需要调用 RewardedVideoAd.show() 进行显示。

```js
rewardedVideoAd.show()
```

只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。开发者不可控制激励视频广告组件的隐藏。

### 广告拉取成功与失败

激励视频广告组件是自动拉取广告并进行更新的。在组件创建后会拉取一次广告，用户点击 关闭广告 后会去拉取下一条广告。

如果拉取成功，通过 `RewardedVideoAd.onLoad()` 注册的回调函数会执行，`RewardedVideoAd.show()` 返回的 Promise 也会是一个 resolved Promise。两者的回调函数中都没有参数传递。

```js
rewardedVideoAd.onLoad(() => {
  console.log('激励视频 广告加载成功')
})

rewardedVideoAd.show()
.then(() => console.log('激励视频 广告显示'))
```

如果拉取失败，通过 `RewardedVideoAd.onError()` 注册的回调函数会执行，回调函数的参数是一个包含错误信息的对象。常见异常错误参考文档

```js
rewardedVideoAd.onError(err => {
  console.log(err)
})
```

`RewardedVideoAd.show()` 返回的 Promise 也会是一个 rejected Promise。

```js
rewardedVideoAd.show()
.catch(err => console.log(err))
```

### 拉取失败，重新拉取

如果组件的某次自动拉取失败，那么之后调用的 show() 将会被 reject。此时可以调用 `RewardedVideoAd.load()` 手动重新拉取广告。

```js
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

```js
rewardedVideoAd.load()
.then(() => rewardedVideoAd.show())
```

### 监听用户关闭广告

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/24d1db60-441f-11eb-bd01-97bc1429a9ff.png)

只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。这个事件可以通过 `RewardedVideoAd.onClose()` 监听。

`RewardedVideoAd.onClose()` 的回调函数会传入一个参数 res，res.isEnded 描述广告被关闭时的状态。


|属性|类型|说明|
|:-:|:-:|:-:|
|isEnded|boolean|视频是否是在用户完整观看的情况下被关闭的，true 表示用户是在视频播放完以后关闭的视频，false 表示用户在视频播放过程中关闭了视频


开发者需要根据 res.isEnded 判断是否视频是否播放结束，如果成功播放完毕则应该向用户发放奖励。

```js
rewardedVideoAd.onClose(res => {
    // 用户点击了【关闭广告】按钮
    if (res && res.isEnded) {
      // 正常播放结束
	  // 这里应该联网给予用户激励。且这段代码应该做安全保护，详见下文中的“安全注意”
    } else {
      // 播放中途退出
    }
})
```


### 服务器回调@callback

App平台 3.1.15+ 支持穿山甲/优量汇/快手

激励视频广告可以支持广告服务器到业务服务器的回调，用于业务系统判断是否提供奖励给观看广告的用户。配置服务器回调后，当用户成功看完广告时，广告服务器会访问配置的回调链接，通知用户完成观看激励视频。

相对来讲服务器回调将更加安全，可以依赖广告平台的反作弊机制来避免用户模拟观看广告完成的事件。

如何使用
1. 申请激励视频广告位时开启服务器回调
2. 创建激励视频广告时传入回调参数


urlCallback示例

```js
rewardedVideoAd = uni.createRewardedVideoAd({
  adpid: '',
  urlCallback: {
    userId: 'testuser',
    extra: 'testdata'
  }
});
```

### 服务器回调事件
- HBuilderX 2.6.8+

穿山甲
```js
rewardedVideoAd.onVerify(e => {
  console.log('服务器发送验证请求且回调校验完成');
  var provider= e.provider;
  var valid = e.isValid;   //获取校验结果
  //valid为true表示通过了服务器的校验，false表示可能没有通过服务器的校验，或是服务器延迟或失败(此时需增加逻辑：轮询向服务器请求并验证结果)
})
```

优量汇
```js
rewardedVideoAd.onVerify(e => {
  console.log('服务器已发送验证请求');
  var provider= e.provider;
  var transId = e.transId;
  // 需增加逻辑：轮询向服务器请求并验证结果
})
```

快手
```js
rewardedVideoAd.onVerify(e => {
  console.log('服务器已发送验证请求');
  var provider= e.provider;
  // 需增加逻辑：轮询向服务器请求并验证结果
})
```

### 服务器回调说明

服务器回调基于[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/README)，详细流程如下:

1. 登陆 [uniCloud](https://unicloud.dcloud.net.cn/) web控制台，新建服务空间或选择已有服务空间，然后在HBuilderX中新建uni-app项目并关联服务空间，新建云函数上传，用于接收广告的回调
2. 在 [uniAD](https://uniad.dcloud.net.cn/) web控制台开通服务器回调并选择上一步新建的云函数
3. 开通后将在选择的服务空间下自动部署一个加密云函数 `uniAdCallback`
4. `uniAdCallback` 接收广告商服务器回调验证签名并抹平穿山甲/优量汇/快手参数差异，然后以 [callFunction](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=callbyfunction) 方式调用用户云函数
5. 用户在自己的云函数中处理业务

注意：
1. 服务器通信和前端事件是并行的，前端需要轮询向服务器请求并验证结果
2. 不建议在 `uniAD` web控制修改回调的服务空间和云函数名称，因为修改后生效需要一段时间

### Q&A

Q: 回调为什么使用[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/README)，而不是直接配置开发者的服务器
A：
1. 由于多家广告商的回调和签名验证逻辑不同，开发者需要写很多逻辑，`uniCloud` 中的云函数 `uniAdCallback` 已抹平了差异，开发者按照统一的参数处理即可
2. 开发者的服务器有可能响应慢或失去响应造成回调数据丢失, 使用 `uniCloud` 可以帮助开发者保存一份来自广告商服务器的回调数据到开发者的云数据中，以便开发者主动查询
3. `uniCloud` 可以承载大并发、防DDoS攻击，无需运营人员维护，如果选择了 `阿里云` 且是免费的

### 云函数uniAdCallback传递的参数

|字段定义|类型|字段名称|备注|
|:-:|:-:|:-:|:-:|
|adpid|String|DCloud广告位id||
|provider|String|广告服务商|csj、ks、gdt|
|platform|String|平台|iOS、Android|
|trans_id|String|交易id|完成观看的唯一交易ID|
|user_id|String|用户id|调用SDK透传，应用对用户的唯一标识|
|extra|String|自定义数据|调用SDK传入并透传，如无需要则为空|


#### 用户的云函数返回数据约定

返回json数据，字段如下：

字段名称|说明|字段类型|备注|
:-|:-|:-|:-|
isValid|校验结果|Blean|判定结果，是否发放奖励|

示例
```js
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event);

  return {
    "isValid": true
  }
};
```

#### 用户云函数详细说明

如果业务使用了uniCloud，可以直接在云函数内部处理

也可以将结果发送给已有业务服务器

示例代码
```js
'use strict';

const crypto = require('crypto');

const db = uniCloud.database();

const DEFAUTL_TIMEOUT = 30000;
const DEFAUTL_RETRY_COUNT = 3;
const RETRY_TIMEOUT = 3000;

const ProviderType = {
  CSJ: "csj",
  GDT: "gdt",
  KS: "ks"
};

const collectionName = "opendb-uniad-callback-log";

class DB {

  static save(data) {
    return new DB().add(data);
  }

  add(data) {
    const collection = db.collection(collectionName);
    const data2 = Object.assign(data, {
      ad_type: 0,
      create_date: new Date()
    })
    return collection.add(data2);
  }
}

class UserServer {

  static send(url, data) {
    return new UserServer().sendHttpRequest(url, data);
  }

  async sendHttpRequest(url, data) {
    let needRetry = data.provider !== ProviderType.GDT;
    let retryCount = needRetry ? DEFAUTL_RETRY_COUNT : 1;
    let timeout = needRetry ? RETRY_TIMEOUT : DEFAUTL_TIMEOUT;
    let result = null;

    while (retryCount > 0) {
      console.log("sendHttpRequest::count::" + retryCount + "::", url, data);

      try {
        result = await uniCloud.httpclient.request(url, {
          data,
          dataType: 'json',
          contentType: 'json',
          timeout
        });

        if (result.data && result.data.isValid === true) {
          break;
        }
      } catch (e) {
        console.log(e);
      }

      retryCount--;
    }

    return result;
  }
}

exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event);

  const {
    path,
    queryStringParameters
  } = event;

  const data = {
    adpid: event.adpid,
    platform: event.platform,
    provider: event.provider,
    trans_id: event.trans_id,
    sign: event.sign,
    user_id: event.user_id,
    extra: event.extra,
  }

  // 注意::必须验签请求来源
  const secret = "";// uniad 后台开通激励视频回调后生成的 secret
  const trans_id = event.trans_id;
  const sign2 = crypto.createHash('sha256').update(`${secret}:${trans_id}`).digest('hex');
  if (event.sign !== sign2) {
    return null;
  }


  // 可选将回调记录保存到uniCloud，避免用户服务器没有响应时有日志可查，如果选择了保存记录需要做定时清理日志，避免日志过多影响性能
  // try {
  //   await DB.save(data);
  // } catch (e) {
  //   console.log(e);
  // }

  //const url = "https://"; // 用户业务服务器地址，为了避免请求被伪造，必须使用签名的方式请求
  //let reuslt = await UserServer.send(url, data);

  return {
    "isValid": true
  }
};
```


#### 安全注意

由于激励视频对应着用户奖励，可能会遇到恶意刷激励奖励但实际上并不看广告的情况。此时广告平台不给结算，但开发者却可能把激励送出去。

为了提升安全性，建议所有使用激励视频的开发者都要做如下工作来加强保护：
1. 前端代码加密。涉及激励相关的，在manifest中配置好要加密的代码文件，打包后会自动加密相应文件。[详见](https://ask.dcloud.net.cn/article/36437)
2. apk加固。即便前端代码加密，原生层引擎的java代码仍然可能被反编译，需要对apk加固。市面上很多加固服务，比如360加固、爱加密加固均可以自行选择。
3. 使用如下安全类API，防止客户端被篡改
- plus.navigator.getSignature 获取应用签名标识。结合在服务器端存放证书信息，可比对判断App的证书是否被重签 [规范](https://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getSignature)
- plus.navigator.isSimulator 判断App是否运行在模拟器环境 [规范](https://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.isSimulator)
- plus.navigator.isRoot 判断设备是否被root或越狱 [规范](https://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.isRoot)
- plus.networkinfo.isSetProxy 判断设备的网络是否设置了代理 [规范](https://www.html5plus.org/doc/zh_cn/device.html#plus.networkinfo.isSetProxy)
4. 避免使用短信验证码来识别身份，推荐使用可信度更高的 [手机号一键登录](/univerify) 或 [微信登录](/api/plugins/login?id=login)
5. 必要时可使用[生物认证（指纹和faceid）](/api/system/authentication)、[活体检测的sdk](https://ext.dcloud.net.cn/search?q=%E6%B4%BB%E4%BD%93%E6%A3%80%E6%B5%8B&orderBy=Relevance&cat1=5&cat2=51)

#### 获取广告商名称

> HBuilderX 2.6.8+

#### 语法

`RewardedVideoAd.getProvider()`

#### 说明

返回值 为 string 类型

|值|描述|
|:-:|:-:|
|csj|穿山甲|
|gdt|腾讯优量汇（前称广点通）|
|ks|快手|


```js
var rewardedVideoAd = uni.createRewardedVideoAd(Options);
var provider = rewardedVideoAd.getProvider();
```


### app平台错误码

code|message|
:-|:-|
-5001|广告位标识adpid为空，请传入有效的adpid
-5002|无效的广告位标识adpid，请使用正确的adpid
-5003|未开通广告，请在广告平台申请并确保已审核通过
-5004|无广告模块，打包时请配置要使用的广告模块
-5005|广告加载失败，请过段时间重新加载，否则可能触发系统策略导致流量收益下降
-5006|广告未加载完成无法播放，请加载完成后再调show播放
-5007|无法获取广告配置数据，请尝试重试
-5008|广告已过期，请重新加载数据
-5100|其他错误，聚合广告商内部错误


**@error 详细错误码**

- App端聚合的穿山甲(iOS)：[错误码](https://ad.oceanengine.com/union/media/union/download/detail?id=16&docId=5de8d574b1afac00129330d5&osType=ios)
- App端聚合的穿山甲(Android)：[错误码](https://ad.oceanengine.com/union/media/union/download/detail?id=4&docId=5de8d9b925b16b00113af0ed&osType=android)
- App端聚合的广点通(iOS)：[错误码](https://developers.adnet.qq.com/doc/ios/union/union_debug#%E9%94%99%E8%AF%AF%E7%A0%81)
- App端聚合的广点通(Android)：[错误码](https://developers.adnet.qq.com/doc/android/union/union_debug#sdk%20%E9%94%99%E8%AF%AF%E7%A0%81)


### 注意事项
- iOS平台配置应用使用广告标识（IDFA）详见：[https://ask.dcloud.net.cn/article/36107](https://ask.dcloud.net.cn/article/36107)
- 测试期间请使用测试 `adpid`，参考测试代码，如果无法显示换个时间再试
- 多次调用 `RewardedVideoAd.onLoad()`、`RewardedVideoAd.onError()`、`RewardedVideoAd.onClose()` 等方法监听广告事件会产生多次事件回调，建议在创建广告后监听一次即可。
- 为避免滥用广告资源，目前每个用户每天可观看激励式视频广告的次数有限，建议展示广告按钮前先判断广告是否拉取成功。
- App平台，建议每个广告商每个设备每天调用次数不超过`15`，中间要有间隔时间，否则可能触发系统的反作弊策略导致流量收益下降。
- 老版非V3编译项目不支持激励视频。

### 案例参考
- [全民董事长](https://android.myapp.com/myapp/detail.htm?apkName=com.dlt.qmdsz&info=DF3F955B42F0B77FECA41F03E7F77C8D)
- 重要项目源码《养猫合成游戏》，拿走就能用，[https://ext.dcloud.net.cn/plugin?id=4095](https://ext.dcloud.net.cn/plugin?id=4095)
