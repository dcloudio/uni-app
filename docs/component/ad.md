
#### ad
广告组件

App 平台 HBuilderX 2.5.2+ 支持

**开通配置广告**

- App平台：[详见](http://uniad.dcloud.net.cn/)


**属性说明**

|属性名|类型|默认值|说明|平台差异|
|:-|:-|:-|:-|:-|
|adpid|String||DCloud 广告位id|App 平台|
|data|Object|可选|广告数据，通过 plus.ad.getAds (参考示例代码)，设置后adpid将无效|App 平台|
|unit-id|String||广告单元id，可在小程序管理后台的流量主模块新建|微信小程序、头条小程序(最低版本1.19.0+)、QQ小程序|
|ad-intervals|number||广告自动刷新的间隔时间，单位为秒，参数值必须大于等于30（该参数不传入时 Banner 广告不会自动刷新）|微信小程序(基础库2.3.1+)|
|appid|String||小程序应用 ID|百度小程序|
|apid|String||小程序广告位 ID|百度小程序|
|ad-left|Number||type为feeds时广告左边距（px），必须大于0|QQ小程序|
|ad-top|Number||type为feeds时广告上边距（px），必须大于0|QQ小程序|
|ad-width|Number||type为feeds时广告宽度（px），默认100%，最大值为屏幕宽度，最小值为265|QQ小程序|
|ad-height|Number||type为feeds时广告高度（px），最小85，最大160|QQ小程序|
|type|String|feed||QQ小程序、百度小程序、头条小程序|
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


**注意**
- 无广告时没有高度，关闭广告时释放高度，宽度由父容器决定
- App 平台，因广告组件内部获得广告数据计算后设置组件大小，会出现界面抖动问题，可以提前通过 plus.ad.getAds 获得广告数据，设置 data 后 adpid 将无效
- 微信小程序 `<ad>` 组件不支持触发 tap 等触摸相关事件
- Android 平台 `<list>` 组件中使用 `<ad>` 时需要指定宽度属性`<ad width="750rpx" />`，因 `<list>` 高效内存回收机制不在屏幕范围的组件不被创建，组件内部无法获取大小
- `<recycle-list>` 暂不支持 `<ad>`


**@error 错误码**
- 穿山甲：[错误码](https://ad.oceanengine.com/union/media/doc?id=5de4cc6d78c8690012a90aa5)
- 广点通：[错误码](https://developers.adnet.qq.com/doc/ios/union/union_debug#%E9%94%99%E8%AF%AF%E7%A0%81)


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


- App平台：无需编码，在打包App时可直接勾选广告位，[详见](https://dcloud.io/dad.html)
- 微信小程序：[规范文档](https://developers.weixin.qq.com/miniprogram/dev/component/ad.html)
- 百度小程序：[规范文档](https://smartprogram.baidu.com/docs/develop/component/ad/)
- 头条小程序：[规范文档](https://developer.toutiao.com/dev/cn/mini-app/develop/component/ad-component)
- QQ小程序：[规范文档](https://q.qq.com/wiki/develop/miniprogram/component/open-ability/ad.html)
- 支付宝小程序：不支持此能力
