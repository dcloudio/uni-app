## 短视频内容联盟组件

### 简介

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√(3.1.17)|x|x|x|x|x|x|x|x|


**仅Android nvue支持**


**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
2. 申请广告位id
在各位后台申请广告位id
3. 在页面合适位置编写代码，放置`ad-content-page`组件，配上广告位adpid
4. App端打包后生效，打包时必须选择快手内容联盟。

**属性说明**

|属性名|类型|默认值|说明|平台差异|
|:-|:-|:-|:-|:-|
|adpid|String||uni-AD App广告位id，在[uni-AD官网](https://uniad.dcloud.net.cn/)申请广告位|仅Android nvue支持|
|@load|EventHandle||广告加载成功的回调||
|@error|EventHandle||广告加载失败的回调||


HBuilder 基座的测试广告位 `adpid` 为 `1111111112`


**示例：**

```html
<template>
  <view class="content">
    <ad-content-page ref="adContentPage" adpid="1111111112" @load="onadload" @error="onaderror"></ad-content-page>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'ad-content-page'
    }
  },
  onShow() {
    // 需要在页面显示时调用广告组件的 show 方法
    this.$refs.adContentPage.show();
  },
  onHide() {
    // 需要在页面隐藏时调用广告组件的 hide 方法停止广告内容的声音
    this.$refs.adContentPage.hide();
  },
  methods: {
    onadload(e) {
      console.log("onload");
    },
    onaderror(e) {
      console.log("onerror");
    }
  }
}
</script>
```

**注意**
- 需要在页面隐藏时调用组件的 `hide` 方法以停止广告内容的声音
