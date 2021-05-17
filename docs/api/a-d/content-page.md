### 短视频内容联盟广告

简介

⼀个视频内容频道，支持上下滑动切换视频内容

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a90b5f95-90ba-4d30-a6a7-cd4d057327db/673f23ff-0924-4302-8467-9c1c1fd03b96.png)


内容联盟广告是一个原生全屏组件，大小不可控制

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（3.1.5+）|x|x|x|x|x|x|

**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
2. 申请广告位id
在各位后台申请广告位id
3. App端打包后生效，打包时必须选择要集成的广告SDK（目前仅支持快手内容联盟）。


### 语法

`plus.ad.showContentPage(options, success, fail)`

### 参数说明

`options` 为 object 类型，属性如下：

|属性名		|类型		|必填	|描述			|
|:-:|:-:|:-:|:-:|
|adpid	  |string	|	是|广告位 id |
|background	|string	|	否|背景颜色，不支持透明度 |

`success` 为 function 类型，加载成功后的回调

`fail` 为 function 类型，加载失败后的回调

HBuilder 基座的测试广告位 `adpid` 为 `1111111112`


示例代码

```html
<template>
	<view>
		<button :loading="loading" :disabled="loading" type="primary" class="btn" @click="showAd">显示广告</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false
			}
		},
		onLoad() {
			// HBuilderX 标准基座真机运行测试内容联盟广告位标识（adpid）为：1111111112
			// adpid: 1111111112 仅用于测试，发布时需要改为广告后台（https://uniad.dcloud.net.cn/）申请的 adpid
			// 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效

			this.adOptions = {
				adpid: 1111111112
			}
		},
		methods: {
			showAd() {
				if (this.loading == true) {
					return;
				}

				this.loading = true;
				plus.ad.showContentPage(this.adOptions, (res) => {
					this.loading = false;
				}, (err) => {
					this.loading = false;
					console.log(err);
				});
			}
		}
	}
</script>
```

