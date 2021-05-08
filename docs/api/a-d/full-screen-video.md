### 全屏视频广告

全屏视频广告是一个原生组件，层级比普通组件高。全屏视频广告每次创建都会返回一个全新的实例，默认是隐藏的，需要调用 FullScreenVideoAd.show() 将其显示。

如何开通参考激励视频广告 [https://uniapp.dcloud.net.cn/api/a-d/rewarded-video](https://uniapp.dcloud.net.cn/api/a-d/rewarded-video)

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（2.9.5+）|x|x|x|x|x|x|

uni.createFullScreenVideoAd(Object)

|属性|类型|必填|说明|
|:-:|:-:|:-:|:-:|
|adpid|string|是|广告位 id|


#### 方法

加载全屏视频广告。

`Promise FullScreenVideoAd.load()`


显示全屏视频广告。

`Promise FullScreenVideoAd.show()`


销毁全屏视频广告实例。

`FullScreenVideoAd.destroy()`


监听全屏视频广告加载事件。

`FullScreenVideoAd.onLoad(function callback)`


监听全屏视频错误事件。

`FullScreenVideoAd.onError(function callback)`


监听全屏视频广告关闭事件。

`FullScreenVideoAd.onClose(function callback)`


示例代码
```html
<template>
  <view>
    <button :loading="loading" :disabled="loading" type="primary" @click="showFullScreenVideoAd">显示广告</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '全屏视频广告',
        loading: false
      }
    },
    onReady() {
      // HBuilderX标准基座真机运行测试全屏视频广告位标识（adpid）为：1507000611
      // adpid: 1507000611 仅用于测试，发布时需要改为广告后台（https://uniad.dcloud.net.cn/）申请的 adpid
      // 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效
      this.adOption = {
        adpid: '1507000611'
      };

      // 创建广告实例
      this.createFullScreenVideoAd();
    },
    methods: {
      createFullScreenVideoAd() {
        var fullScreenVideoAd = this.fullScreenVideoAd = uni.createFullScreenVideoAd(this.adOption);
        fullScreenVideoAd.onLoad(() => {
          // 广告数据加载成功
          this.loading = false;
          console.log("onLoad");
        });
        fullScreenVideoAd.onClose((e) => {
          // 用户点击了关闭或返回键(仅Android有返回键)
          console.log("onClose " + e.isEnded);
        });
        fullScreenVideoAd.onError((err) => {
          console.log("onError", JSON.stringify(err));
          // 广告数据加载失败
          this.loading = false;
          uni.showToast({
            title: `${err.code} : ${err.errMsg}`
          })
        });
      },
      showFullScreenVideoAd() {
        // 调用 fullScreenVideoAd.show()，如果数据正在加载中不会显示广告，加载成功后才显示
        // 在数据没有加载成功时，需要防止用户频繁点击显示广告
        if (this.loading == true) {
          return
        }
        this.loading = true;
        this.fullScreenVideoAd.show().then(() => {
          this.loading = false;
        }).catch((err) => {
          console.log(err.message);
          this.loading = false;
          uni.showToast({
            title: `${err.code} : ${err.errMsg}`
          })
        });
      }
    },
    onUnload() {
      this.fullScreenVideoAd.destroy()
    }
  }
</script>

```
