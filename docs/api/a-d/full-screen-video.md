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
```
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<button :loading="loading" :disabled="loading" type="primary" class="btn" @click="showAd">显示广告</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '全屏视频广告',
				loading: false,
				loadError: false
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			// HBuilderX标准基座真机运行测试全屏视频广告位标识（adpid）为：1507000611
			// adpid: 1507000611 仅用于测试，发布时需要改为广告后台（https://uniad.dcloud.net.cn/）申请的 adpid
			// 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效
			this.adOption = {
				adpid: '1507000611'
			};
			// #endif
			this.createAd();
		},
		methods: {
			createAd() {
				var _ad = this._ad = uni.createFullScreenVideoAd(this.adOption);
				_ad.onLoad(() => {
					this.loading = false;
					this.loadError = false;
					_ad.show();
					console.log('onLoad event')
				});
				_ad.onClose((res) => {
					// 用户点击了【关闭广告】按钮
					if (res && res.isEnded) {
						// 正常播放结束
						console.log("onClose " + res.isEnded);
					} else {
						// 播放中途退出
						console.log("onClose " + res.isEnded);
					}

					setTimeout(() => {
						uni.showToast({
							title: "全屏视频" + (res.isEnded ? "成功" : "未") + "播放完毕",
							duration: 10000,
							position: 'bottom'
						})
					}, 500)
				});
				_ad.onError((err) => {
					this.loading = false;
					if (err.code) {
						this.loadError = true;
					}
					console.log('onError event', err)
					uni.showToast({
						title: err.errMsg,
						position: 'bottom'
					})
				});
			},
			showAd() {
				this.loading = true;
				this._ad.load();
			}
		}
	}
</script>

<style>
	.btn {
		margin-bottom: 20px;
	}

	.ad-tips {
		color: #999;
		padding: 30px 0;
		text-align: center;
	}
</style>

```
