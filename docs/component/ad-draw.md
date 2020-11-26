
#### ad
应用内展示的广告组件，可用于banner或全屏视频。

- app端的广告源由腾讯广点通、头条穿山甲、快手广告联盟、360广告联盟以及部分DCloud直投广告聚合提供，在DCloud的uni-AD后台注册：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
- 小程序端的广告由小程序平台提供

**平台差异说明**

|App-nvue|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.9.10+）|x|x|x|x|x|x|x|x|


**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
    * 小程序平台：在各自的小程序管理后台操作。
2. 申请广告位id
在各位后台申请广告位id
3. 在页面合适位置编写代码，放置ad组件，配上广告位id（app是adpid，微信、头条、qq小程序是unit-id，百度小程序是apid）
4. App端打包后生效，打包时必须选择要集成的广告SDK（穿山甲、广点通、360联盟、快手）。

**属性说明**

|属性名|类型|默认值|说明|平台差异|
|:-|:-|:-|:-|:-|
|data|Object|可选|广告数据，通过 plus.ad.getDrawAds (参考示例代码)，设置后adpid将无效|App|
|adpid|String||uni-AD App广告位id，在[uni-AD官网](https://uniad.dcloud.net.cn/)申请广告位|App|
|@load|EventHandle||广告加载成功的回调||
|@error|EventHandle||广告加载失败的回调，event.detail = {errCode: }||


**注意**
- HBuilderX2.8+版本Android平台更新穿山甲（今日头条）广告SDK后不再支持x86类型CPU，无法运行到x86类型cpu的模拟器。
- HBuilderX标准基座真机运行测试信息流广告位标识（adpid）为：1111111111
- uniAd广告平台申请的adpid需要自定义基座生效

**@error 错误码**
- App端聚合的穿山甲(iOS)：[错误码](https://ad.oceanengine.com/union/media/union/download/detail?id=16&docId=5de8d574b1afac00129330d5&osType=ios)
- App端聚合的穿山甲(Android)：[错误码](https://ad.oceanengine.com/union/media/union/download/detail?id=4&docId=5de8d9b925b16b00113af0ed&osType=android)
- App端聚合的广点通(iOS)：[错误码](https://developers.adnet.qq.com/doc/ios/union/union_debug#%E9%94%99%E8%AF%AF%E7%A0%81)
- App端聚合的广点通(Android)：[错误码](https://developers.adnet.qq.com/doc/android/union/union_debug#sdk%20%E9%94%99%E8%AF%AF%E7%A0%81)


**示例：**

```html
<template>
  <view class="content">
    <!-- App nvue页面 -->
    <!-- adpid="1111111111" 此广告位标识仅在HBuilderX标准基座中有效，仅用于测试 -->
    <view class="ad-draw">
      <ad-draw adpid="1111111111" @load="onload" @error="onerror"></ad-draw>
    </view>
  </view>
</template>
```

```javascript
export default {
  data() {
    return {
      title: 'ad-draw',
      adData: {}
    }
  },
  onReady: function (e) {
  },
  methods: {
    // 可选
    getAdData: function (e) {
      // 仅APP平台支持
      plus.ad.getDrawAds({
          adpid: '1111111111',  // 此广告位标识仅在HBuilderX标准基座中有效，仅用于测试
          count: 1,   // 广告数量，默认 1-3
          width: 300,  // 根据宽度获取合适的广告(单位px)
          height: 300  // 根据高度获取合适的广告(单位px)
        },
        (res) => {
          this.adData = res.ads[0];
          console.log(this.adData);
        },
        (err) => {
          console.log(err);
        }
      )
    },
    onload(e) {
      console.log("onload");
    },
    onerror(e) {
      console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
    }
  }
}
```

**激励视频广告**
文档地址：[https://uniapp.dcloud.io/api/a-d/rewarded-video](https://uniapp.dcloud.io/api/a-d/rewarded-video)

**注意**
- App端广告开通指南和收益相关问题：[https://ask.dcloud.net.cn/article/36769](https://ask.dcloud.net.cn/article/36769)
- App端除了ad组件，ad-draw组件，还支持开屏、激励视频、全屏广告等多种广告形式。详见[uni-AD官网](https://uniad.dcloud.net.cn/)
- App端uni-AD聚合了腾讯广点通、头条穿山甲、360广告联盟等服务，打包时必须勾选相应的sdk，详见：[https://ask.dcloud.net.cn/article/36718](https://ask.dcloud.net.cn/article/36718)
![](https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200115/10b714ce030ce2032a9d9b0bdd0ae03a.jpg)
