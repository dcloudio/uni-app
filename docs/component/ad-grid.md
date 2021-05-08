## Grid 广告

### 简介

开发者可以使用 ad 组件创建 Grid 广告组件，Grid 广告组件在创建后会自动拉取广告数据并显示。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|x|x|x|x|x|


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
|unit-id|String||广告单元id，可在小程序管理后台的流量主模块新建|微信小程序|
|ad-type|String|grid||微信小程序|
|@load|EventHandle||广告加载成功的回调||
|@error|EventHandle||广告加载失败的回调||
|@close|EventHandle||广告关闭的回调||

### 广告尺寸设置

Grid 广告不允许直接设置样式属性，默认宽度为100%（width: 100%），高度会自动等比例计算，因此开发者可以设置广告外层组件的宽度调整广告的尺寸。格子广告有最小尺寸限制，5个的形态为331px，8个的形态为294px。

```html
<view class="adContainer">
  <ad unit-id="xxxx" ad-type="grid" ad-theme="white" grid-count="5"></ad>
</view>
```

```css
<style>
/* 外层组件的宽度可设置成100%或具体数值 */
.adContainer {
  width: 100%;
}
<style>
```


### 广告事件监听

Grid 广告在创建后会自动拉取广告。开发者可以通过 ad 组件的 load 和 error 事件监听广告拉取成功或失败，可以通过 close 事件监听广告被关闭。

```html
<view class="adContainer">
  <ad unit-id="xxxx" ad-type="grid" ad-theme="white" grid-count="5" @load="adLoad" @error="adError" @close="adClose"></ad>
</view>
```

```js
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      adLoad() {
      },
      adError(e) {
      },
      adClose(e) {
      }
    }
  }
</script>
```


### 广告主题样式设置

广告组件提供黑、白两种主题样式，开发者可以在创建广告时传入ad-theme参数实现主题样式选择，ad-theme参数为字符串类型，参数值可选white, black

```
<view class="adContainer">
  <ad unit-id="xxxx" ad-type="grid" ad-theme="white"></ad>
</view>
```

```
<view class="adContainer">
  <ad unit-id="xxxx" ad-type="grid" ad-theme="black"></ad>
</view>
```


### 广告格子个数设置

广告组件提供黑、白两种主题样式，开发者可以在创建广告时传入grid-count参数实现主题样式选择，grid-count参数为数字类型，参数值可选5, 8

```
<view class="adContainer">
  <ad unit-id="xxxx" ad-type="grid" grid-count="5"></ad>
</view>
```

```
<view class="adContainer">
  <ad unit-id="xxxx" ad-type="grid" grid-count="8"></ad>
</view>
```
