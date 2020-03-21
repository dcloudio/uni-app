
#### ad
应用内展示的广告组件，可用于banner或信息流。

- app端的广告源由腾讯广点通、头条穿山甲、360广告联盟提供，DCloud负责聚合
- 小程序端的广告由小程序平台提供

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.5.2+）|x|√|x|√|√|√|


**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
    * 小程序平台：在各自的小程序管理后台操作。
2. 申请广告位id
在各位后台申请广告位id
3. 在页面合适位置编写代码，放置ad组件，配上广告位id（app是adpid，微信、头条、qq小程序是unit-id，百度小程序是apid）
4. App端打包后生效，打包时必须选择要集成的广告SDK（穿山甲、广点通、360联盟）。

**属性说明**

|属性名|类型|默认值|说明|平台差异|
|:-|:-|:-|:-|:-|
|data|Object|可选|广告数据，通过 plus.ad.getAds (参考示例代码)，设置后adpid将无效|App|
|adpid|String||uni-AD App广告位id，在[uni-AD官网](https://uniad.dcloud.net.cn/)申请广告位|App|
|unit-id|String||广告单元id，可在小程序管理后台的流量主模块新建|微信小程序、字节跳动小程序(最低版本1.19.0+)、QQ小程序|
|ad-intervals|number||广告自动刷新的间隔时间，单位为秒，参数值必须大于等于30（该参数不传入时 Banner 广告不会自动刷新）|微信小程序(基础库2.3.1+)|
|appid|String||小程序应用 ID|百度小程序|
|apid|String||小程序广告位 ID|百度小程序|
|ad-left|Number||type为feeds时广告左边距（px），必须大于0|QQ小程序|
|ad-top|Number||type为feeds时广告上边距（px），必须大于0|QQ小程序|
|ad-width|Number||type为feeds时广告宽度（px），默认100%，最大值为屏幕宽度，最小值为265|QQ小程序|
|ad-height|Number||type为feeds时广告高度（px），最小85，最大160|QQ小程序|
|type|String|feed||QQ小程序、百度小程序、字节跳动小程序|
|@load|EventHandle||广告加载成功的回调||
|@error|EventHandle||广告加载失败的回调，event.detail = {errCode: }||
|@close|EventHandle||广告关闭的回调||
|@downloadchange|EventHandle||下载类广告的状态, event.detail = {status: }|仅App Android 支持|

**type属性 百度**

广告类型：banner/feed，需和百青藤平台上的代码位类型相匹配。

**type属性 头条**

广告的类型，默认 bannner，具体类型有：banner、video（视频）、large（大图）、lImg（左图右文）、rImg（右图左文），默认值为 banner

**type属性 QQ**

|值|说明|
|:-|:-|
|banner|banner广告 分 1 图和 3 图 1 文。3 图 1 文广告的背景色、文字颜色会根据祖先节点的背景色调整，分三种情况深色背景、浅色背景和白色背景|
|swip|翻页广告，1 图 1 文，会覆盖整个小程序，显示、隐藏逻辑需开发者自行控制|
|card|卡片广告，1 图，可关闭|
|feeds|自定义广告，可灵活控制广告上、左边距和宽高，以适应界面其他内容。可监听size事件获取实际宽高|

App和微信小程序的ad组件没有type属性，可以用于banner，也可以用于信息流。


**注意**
- 无广告时没有高度，关闭广告时释放高度，宽度由父容器决定
- App 平台，因广告组件内部获得广告数据计算后设置组件大小，会出现界面抖动问题，可以提前通过 plus.ad.getAds 获得广告数据，设置 data 后 adpid 将无效
- 微信小程序 `<ad>` 组件不支持触发 tap 等触摸相关事件
- Android 平台 nvue的 `<list>` 组件中使用 `<ad>` 时，必须指定宽度属性`<ad width="750rpx" />`，因为 `<list>` 有自动的内存回收机制，不在屏幕范围的组件不被创建，组件内部无法获取大小
- 广点通概率出现重复广告，可根据需求请求广告数据，推荐单次大于1条(plus.ad.getAds) 来降低重复率
- vue 页面使用 `<ad>` 暂不支持非 V3 编译，manifest.json 可配置
- `<recycle-list>` 暂不支持 `<ad>`
- app-vue|QQ是客户端原生组件，层级最高无法被覆盖，app-nvue|微信|头条没有层级覆盖问题

**@error 错误码**
- App端聚合的穿山甲：[错误码](https://ad.oceanengine.com/union/media/doc?id=5de4cc6d78c8690012a90aa5)
- App端聚合的广点通：[错误码](https://developers.adnet.qq.com/doc/ios/union/union_debug#%E9%94%99%E8%AF%AF%E7%A0%81)


**@downloadchange status**

|代码|说明|
|:-|:-|
|-1| 非下载|
|0|未开始下载|
|1|下载中|
|2|下载暂停|
|3|下载完成后|
|4|下载失败|
|5| 下载取消|
|6|已安装|


**示例：**

```html
<template>
  <view class="content">

    <!-- App平台 示例 1 -->
    <view class="ad-view">
      <ad adpid="1111111111" @load="onload" @close="onclose" @error="onerror" @downloadchange="ondownloadchange"></ad>
    </view>

    <!-- App平台 示例 2 -->
    <!-- 需要时可自定义属性，监听到 error 回调后(e.target可以取到)，开发者可以针对性的处理，比如隐藏广告组件的父容器，以保证用户体验 -->
    <view class="ad-view" v-for="adItem in adList" :key="adItem.id">
      <ad :adpid="adItem.adpid" :data-xx="adItem.id"></ad>
    </view>

    <!-- App平台 示例 3 (手动请求广告数据 仅App平台支持) -->
    <view>
      <button @click="getAdData">Get ad data</button>
    </view>
    <view class="ad-view">
      <ad :data="adData"></ad>
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
```

```javascript
export default {
  data() {
    return {
      title: 'uni-app ad',
      adList: [],
      adData: {}
    }
  },
  onReady: function (e) {
    // 显示 4 个广告
    for (let i = 0; i < 4; i++) {
      this.adList.push({
        id: i,
        adpid: "1111111111"
      })
    }
  },
  methods: {
    getAdData: function (e) {
      // 仅APP平台支持
      plus.ad.getAds({
          adpid: '',  // dcloud 后台创建
          count: 1,   // 广告数量，默认 3
          width: 300  // 根据宽度获取合适的广告(单位px)
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
    onclose(e) {
      console.log("onclose: " + e.detail);
    },
    onerror(e) {
      console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
    },
    ondownloadchange(e) {
      console.log("downloadchanged: " + JSON.stringify(e.detail));
    }
  }
}
```

``` css
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

**激励视频广告**
文档地址：[https://uniapp.dcloud.io/api/ad/rewarded-video-ad](https://uniapp.dcloud.io/api/ad/rewarded-video-ad)

**注意**
- App端广告开通指南和收益相关问题：[https://ask.dcloud.net.cn/article/36769](https://ask.dcloud.net.cn/article/36769)
- App端除了ad组件，还支持开屏。详见[uni-AD官网](https://uniad.dcloud.net.cn/)
- App端uni-AD聚合了腾讯广点通、头条穿山甲、360广告联盟等服务，打包时必须勾选相应的sdk，详见：[https://ask.dcloud.net.cn/article/36718](https://ask.dcloud.net.cn/article/36718)
![](https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200115/10b714ce030ce2032a9d9b0bdd0ae03a.jpg)
