
## 信息流广告

### 简介

应用内展示的广告组件，可用于banner或信息流。

### 适用场景

banner或信息流广告展现场景非常灵活，常见的展现场景为：文章页末尾，详情页面底部，信息流顶部等

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/b613df50-4420-11eb-bc56-c9cea619f663.png)


- app端的广告源由腾讯广点通、头条穿山甲、快手广告联盟、360广告联盟以及部分DCloud直投广告聚合提供，在DCloud的uni-AD后台注册：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
- 小程序端的广告由小程序平台提供

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.5.2+）|x|√|x|√|√|√|x|x|√|


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
|data|Object|可选|广告数据，通过 plus.ad.getAds (参考示例代码)，设置后adpid将无效|App|
|adpid|String||uni-AD App广告位id，在[uni-AD官网](https://uniad.dcloud.net.cn/)申请广告位|App|
|unit-id|String||广告单元id，可在小程序管理后台的流量主模块新建|微信小程序、字节跳动小程序(最低版本1.19.0+)、QQ小程序、快手小程序|
|ad-intervals|number||广告自动刷新的间隔时间，单位为秒，参数值必须大于等于30（该参数不传入时 Banner 广告不会自动刷新）|微信小程序(基础库2.3.1+)|
|appid|String||小程序应用 ID|百度小程序|
|apid|String||小程序广告位 ID|百度小程序|
|ad-left|Number||type为feeds时广告左边距（px），必须大于0|QQ小程序|
|ad-top|Number||type为feeds时广告上边距（px），必须大于0|QQ小程序|
|ad-width|Number||type为feeds时广告宽度（px），默认100%，最大值为屏幕宽度，最小值为265|QQ小程序|
|ad-height|Number||type为feeds时广告高度（px），最小85，最大160|QQ小程序|
|type|String|feed||QQ小程序、百度小程序、字节跳动小程序、快手小程序|
|@load|EventHandle||广告加载成功的回调||
|@error|EventHandle||广告加载失败的回调，event.detail = {errCode: }||
|@close|EventHandle||广告关闭的回调||


**type属性 百度**

广告类型：banner/feed，需和百青藤平台上的代码位类型相匹配。

**type属性 头条**

广告的类型，默认 banner，具体类型有：banner、video（视频）、large（大图）、lImg（左图右文）、rImg（右图左文），默认值为 banner

**type属性 QQ**

|值|说明|
|:-|:-|
|banner|banner广告 分 1 图和 3 图 1 文。3 图 1 文广告的背景色、文字颜色会根据祖先节点的背景色调整，分三种情况深色背景、浅色背景和白色背景|
|swip|翻页广告，1 图 1 文，会覆盖整个小程序，显示、隐藏逻辑需开发者自行控制|
|card|卡片广告，1 图，可关闭|
|feeds|自定义广告，可灵活控制广告上、左边距和宽高，以适应界面其他内容。可监听size事件获取实际宽高|

App和微信小程序的ad组件没有type属性，可以用于banner，也可以用于信息流。


**注意**
- `<ad>` 组件是原生组件，在webview页面会有层级问题，同时无法在`<swiper>` 、`<scroll-view>` 组件中使用。但app-nvue、微信小程序新版和头条小程序新版支持同层渲染，所以没有层级问题。而app-vue、QQ小程序等平台则有层级问题。详见：[原生组件](https://uniapp.dcloud.io/component/native-component)
- 无广告时没有高度，关闭广告时释放高度，宽度由父容器决定
- App 平台，因广告组件内部获得广告数据计算后设置组件大小，会出现界面抖动问题，可以提前通过 plus.ad.getAds 获得广告数据，设置 data 后 adpid 将无效
- 微信小程序 `<ad>` 组件不支持触发 tap 等触摸相关事件
- Android 平台 nvue的 `<list>` 组件中使用 `<ad>` 时，必须指定宽度属性`<ad width="750rpx" />`，因为 `<list>` 有自动的内存回收机制，不在屏幕范围的组件不被创建，组件内部无法获取大小
- app-nvue 的 `<recycle-list>` 组件内不支持嵌套 `<ad>`
- 广点通概率出现重复广告，可根据需求请求广告数据，推荐单次大于1条(plus.ad.getAds) 来降低重复率
- HBuilderX2.8+版本Android平台更新穿山甲（今日头条）广告SDK后不再支持x86类型CPU，无法运行到x86类型cpu的模拟器。
- app-vue 页面使用 `<ad>` 必须使用v3编译器。如果使用HBuilderX 2.7以下版本，需注意开启v3编译模式。2.7以上版本已经淘汰了其他模式，无需关心本条。
- `<ad>` 组件测试广告位是上图下文，uniAD后台申请的广告位默认左图右文
- HBuilderX标准基座真机运行测试信息流广告位标识（adpid）为：1111111111

**@error 错误码**
- App端聚合的穿山甲(iOS)：[错误码](https://ad.oceanengine.com/union/media/union/download/detail?id=16&docId=5de8d574b1afac00129330d5&osType=ios)
- App端聚合的穿山甲(Android)：[错误码](https://ad.oceanengine.com/union/media/union/download/detail?id=4&docId=5de8d9b925b16b00113af0ed&osType=android)
- App端聚合的广点通(iOS)：[错误码](https://developers.adnet.qq.com/doc/ios/union/union_debug#%E9%94%99%E8%AF%AF%E7%A0%81)
- App端聚合的广点通(Android)：[错误码](https://developers.adnet.qq.com/doc/android/union/union_debug#sdk%20%E9%94%99%E8%AF%AF%E7%A0%81)


**示例：**

```html
<template>
  <view class="content">

    <!-- App平台 -->
    <!-- adpid="1111111111" 此广告位标识仅在HBuilderX标准基座中有效，仅用于测试 -->
    <!-- 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效 -->
    <!-- 需要时可自定义属性，监听到 error 回调后(e.target可以取到)，开发者可以针对性的处理，比如隐藏广告组件的父容器，以保证用户体验 -->
    <view class="ad-view">
      <ad adpid="1111111111" :data-xx="adItem.id" @load="onload" @close="onclose" @error="onerror"></ad>
    </view>

    <!-- 微信小程序 -->
    <view class="ad-view">
      <ad unit-id="" ad-intervals="100"></ad>
    </view>

    <!-- 百度小程序 -->
    <view class="ad-view">
      <ad appid="" apid="" type="feed"></ad>
    </view>

    <!-- 多平台兼容 -->
    <view class="ad-view">
      <ad adpid="1111111111" unit-id="" appid="" apid="" type="feed"></ad>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'ad'
    }
  },
  methods: {
    onload(e) {
      console.log("onload");
    },
    onclose(e) {
      console.log("onclose: " + e.detail);
    },
    onerror(e) {
      console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
    }
  }
}
</script>

<style>
  .content {
    background-color: #DBDBDB;
    padding: 10px;
  }

  .ad-view {
    background-color: #FFFFFF;
    margin-bottom: 10px;
  }
</style>
```


api的方式(仅app平台支持)，不推荐使用这种调用方式，调用比较复杂，且不跨平台，开发者还需要手动处理缓存逻辑

``` html
<template>
  <view class="content">
    <view class="ad-view">
      <ad :data="adData"></ad>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'ad',
      adData: {}
    }
  },
  onReady: function (e) {
    this.getAdData()
  },
  methods: {
    getAdData: function (e) {
      // 仅APP平台支持
      plus.ad.getAds({
          adpid: '1111111111',  // 替换为自己申请获取的广告位标识，此广告位标识仅在HBuilderX标准基座中有效，仅用于测试
          count: 1,   // 广告数量，默认 3
          width: 300  // 根据宽度获取合适的广告(单位px)
        },
        (res) => {
					// 注意: 广告数据只能使用一次
          this.adData = res.ads[0];
          console.log(this.adData);
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }
}
</script>

<style>
  .content {
    background-color: #DBDBDB;
    padding: 10px;
  }

  .ad-view {
    background-color: #FFFFFF;
    margin-bottom: 10px;
  }
</style>
```


使用 ad/ad-draw 模拟插屏广告效果@Interstitial

```html
<template>
  <view>
    <!-- 使用 ad/ad-draw 模拟插屏广告效果 -->
    <view>
      <button @click="showInterstitialAd">显示插屏广告</button>
    </view>
    <view class="ad-interstitial" v-if="isShowInterstitialAd">
      <view class="ad-view">
        <ad class="ad" adpid="1111111111" @error="onerror"></ad>

        <!-- ad-draw 仅在nvue页面生效 -->
        <!-- <ad-draw class="ad-draw" adpid="1507000690"></ad-draw> -->
      </view>
      <view class="close-area">
        <!-- 根据z自己页面风格设置关闭按钮的样式 -->
        <button @click="hideInterstitialAd">X</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isShowInterstitialAd: false
      }
    },
    methods: {
      showInterstitialAd() {
        this.isShowInterstitialAd = true
      },
      hideInterstitialAd() {
        this.isShowInterstitialAd = false
      },
      onerror(e) {
        console.log(e);
      }
    }
  }
</script>

<style>
  .ad-interstitial {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    /* #ifndef APP-NVUE */
    display: flex;
    z-index: 1000;
    /* #endif */
    flex-direction: column;
    justify-content: center;
  }

  .ad-draw {
    width: 700rpx;
    height: 400px;
  }
</style>

```


**激励视频广告**
文档地址：[https://uniapp.dcloud.io/api/a-d/rewarded-video](https://uniapp.dcloud.io/api/a-d/rewarded-video)

**注意**
- iOS平台配置应用使用广告标识（IDFA）详见：[https://ask.dcloud.net.cn/article/36107](https://ask.dcloud.net.cn/article/36107)
- App端广告开通指南和收益相关问题：[https://ask.dcloud.net.cn/article/36769](https://ask.dcloud.net.cn/article/36769)
- App端除了ad组件，还支持开屏、激励视频等多种广告形式。详见[uni-AD官网](https://uniad.dcloud.net.cn/)
- App端uni-AD聚合了腾讯广点通、头条穿山甲、360广告联盟等服务，打包时必须勾选相应的sdk，详见：[https://ask.dcloud.net.cn/article/36718](https://ask.dcloud.net.cn/article/36718)
![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/f21eb570-4f32-11eb-b680-7980c8a877b8.jpg)
