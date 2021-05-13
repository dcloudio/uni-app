# 互动广告

## 简介

互动广告是DCloud为开发者提供新的广告场景增值服务。开发者在App中放置入口，用户点击入口参与权益化、趣味性的活动。通过观看激励视频广告加速获取权益。沉浸的游戏体验能够降低对广告的抵触心理，增加广告（激励视频广告和图文广告）展示的同时有效提高广告收益。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a90b5f95-90ba-4d30-a6a7-cd4d057327db/5f199d26-0dab-4bbd-9b84-96bb4abee8f8.jpg)


## 活动场景类型：

共抽奖类、游戏类、养成类3种场景类型，开发者可根据自身情况选择活动类型：

1. 抽奖类活动：通过转盘、扭蛋、摇骰子等抽奖玩法获得奖品碎片或红包奖励
2. 游戏类活动：通过合成游戏、成语答题、捕鱼等游戏玩法获得金币或红包奖励
3. 养成类活动：果园、农场、养牛等长期活动，用户通过连续签到、道具收集、任务体系等玩法提升养成对象的等级，升级后可获得红包奖励或兑换奖品

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a90b5f95-90ba-4d30-a6a7-cd4d057327db/994e3f54-d498-4642-8e61-3177dcfef63a.jpg)

## 关于线上或线下奖励发放服务：

DCloud联合服务商为开发者提供用户奖励线下代发放服务，具体说明如下：

1. 用户参与以上活动达到一定资产时（奖品碎片或金币到达兑换门槛，红包金额到达提现门槛），可发起兑奖申请。如用户申请提现，需要填写收款的支付宝或微信账号；如用户申请兑换虚拟或者实物奖品，需要填写联系人联系方式和收货地址等；具体以兑奖弹窗为准。
2. 用户提交兑奖申请后，客服将在5个工作日内确认，确认后将尽快为您进行发货，如实物奖品有发货时间较长等问题请联系客服。
3. 如实物奖品（水果生鲜等）因为时令问题、疫情区域或者新疆、西藏等偏远地区暂时无法寄送，客服将联系用户赠送奖品价值相等的现金奖励。
4. 实物奖品发放后,快递配送请在24小时内收货,如有质量问题,请于签收后48小时内进行售后申请,超出时间不予赔付。
5. 用户不得使用任何外挂、插件以及其他破坏破坏活动规则、违背活动公平原则的方式参加本次活动，否则服务商有权取消用户参与活动的资格以及清空获得的奖励。


**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|App 3.1.15+|x|x|x|x|x|x|

**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
2. 申请广告位id
在各位后台申请广告位id
3. App端打包后生效，打包时必须选择要集成的广告SDK（优量汇、穿山甲、快手）。


### 语法

`uni.createInteractiveAd(options)`

### 参数说明

`options` 为 object 类型，属性如下：

|属性名		|类型		|必填	|描述			|
|:-:|:-:|:-:|:-:|
|adpid	  |string	|	是 |广告位 id |
|provider	|string	|	是 |服务商标识，即插件id |
|userData	|object	|	否 |绑定用户积分 |


### 广告创建

广告组件默认是隐藏的，因此可以提前创建，以提前初始化组件。开发者可以在页面的 onReady 事件回调中创建广告实例，并在该页面的生命周期内重复调用该广告实例。


### 显示/隐藏

广告组件默认是隐藏的，开发者需要调用 CreateInteractiveAd.show() 进行显示。如果广告拉取失败或触发频率限制，CreateInteractiveAd.show() 方法会返回一个rejected Promise，开发者可自行监听错误信息

```js
CreateInteractiveAd.show().catch((err) => {
  console.error(err)
})
```

用户可以主动关闭广告。开发者不可控制广告组件的隐藏。


### 监听广告加载成功事件

如果广告加载成功，通过 CreateInteractiveAd.onLoad() 注册的回调函数会执行，回调函数返回广告素材参数。


|属性名		|类型		|描述			|
|:-:|:-:|:-:|
|imgUrl	  |string	|	广告素材图片的url地址 |


```js
CreateInteractiveAd.onLoad(res => {
    console.log('图片素材地址', res.imgUrl);
    console.log('广告加载成功')
})
```


示例代码

```html
<template>
  <view>
    <button :loading="loading" :disabled="loading" type="primary" @click="showInteractiveAd">显示广告</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '场景广告',
        loading: false
      }
    },
    onReady() {
      this.adOption = {
        adpid: '1111111113' // HBuilder基座的测试广告位
        provider: ""
      };

      // 创建广告实例
      this.createInteractiveAd();
    },
    methods: {
      createInteractiveAd() {
        var interactiveAd = this.interactiveAd = uni.createInteractiveAd(this.adOption);
        interactiveAd.onLoad((e) => {
          this.loading = false;
          console.log("广告加载成功");
          // 如果有广告图片素材, 通过 e.imgUrl 获取
        });
        interactiveAd.onClose(() => {
          // 用户点击了关闭或返回键(仅Android有返回键)
          console.log("广告关闭");
        });
        interactiveAd.onError((err) => {
          this.loading = false;
          console.log("广告加载失败");
        });

        // 广告实例创建成功后默认会执行一次 load，加载广告数据
        // 如果界面有 "显示广告" 按钮，需要先禁用掉，防止用户点击，等待广告数据加载成功后在放开
        this.loading = true;
      },
      showInteractiveAd() {
        // 调用 interactiveAd.show()，如果数据正在加载中不会显示广告，加载成功后才显示
        // 在数据没有加载成功时，需要防止用户频繁点击显示广告
        if (this.loading == true) {
          return
        }
        this.loading = true;
        this.interactiveAd.show().then(() => {
          this.loading = false;
        });
      }
    },
    onUnload() {
      // 页面关闭后销毁实例
      this.sceneAd.destroy()
    }
  }
</script>
```


#### 方法

`Promise CreateInteractiveAd.load()`

加载广告。

`Promise CreateInteractiveAd.show()`

显示广告。

`CreateInteractiveAd.reportExposure()`

场景入口曝光打点。

`CreateInteractiveAd.destroy()`

销毁广告实例。

`CreateInteractiveAd.onLoad(function callback)`

监听广告加载事件。

`CreateInteractiveAd.offLoad(function callback)`

取消监听广告加载事件

`CreateInteractiveAd.onError(function callback)`

监听错误事件。

`CreateInteractiveAd.offError(function callback)`

取消监听错误事件

`CreateInteractiveAd.onClose(function callback)`

监听广告关闭事件。

`CreateInteractiveAd.offClose(function callback)`

取消监听广告关闭事件

