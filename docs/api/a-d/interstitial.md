### 插屏广告

支持多种规格尺寸，支持GIF、图片、图文、动态创意；插屏广告与信息流或横幅广告相比展现尺寸更大，同样能够满足您对大量曝光和用户转化的需求。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a90b5f95-90ba-4d30-a6a7-cd4d057327db/5dc1ce6b-b786-4175-aec5-dd2ab4a5e34c.png)

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|App 3.1.9+|x|√|x|x|x|√|

- app端的广告源由腾讯优量汇、头条穿山甲、快手等广告联盟提供，DCloud负责聚合
- 小程序端的广告由小程序平台提供

**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
    * 小程序平台：在各自的小程序管理后台操作。
2. 申请广告位id
在各位后台申请广告位id
3. App端打包后生效，打包时必须选择要集成的广告SDK（优量汇、穿山甲、快手）。

### 语法

`uni.createInterstitialAd(options)`

### 参数说明

`options` 为 object 类型，属性如下：

|属性名		|类型		|必填	|描述			|最低支持版本	|
|:-:|:-:|:-:|:-:|:-:|
|adpid	  |string	|	是|广告位 id |App 3.1.9+|
|adUnitId	|string	|	是|广告位 id |微信小程序2.6.0+, QQ0.1.26+|


HBuilder 基座的测试广告位 `adpid` 为 `1111111113`


示例代码

```js
<script>
	export default {
		data() {
			return {
				title: '插屏广告',
				loading: false
			}
		},
		onReady() {
			this.showAd();
		},
		methods: {
			showAd() {
				const adOption = {
					adpid: '1111111113' // HBuilder基座的测试广告位
				};
				let interstitialAd = uni.createInterstitialAd(adOption);
				interstitialAd.onLoad(() => {
					this.loading = false;
					interstitialAd.show();
				});
				interstitialAd.onClose((res) => {
				});
				interstitialAd.onError((err) => {
					this.loading = false;
				});
				interstitialAd.load();
				this.loading = true;
			}
		}
	}
</script>

```


#### 方法

`Promise InterstitialAd.load()`

加载插屏广告。

`Promise InterstitialAd.show()`

显示插屏广告。

`InterstitialAd.destroy()`

销毁插屏广告实例。

`InterstitialAd.onLoad(function callback)`

监听插屏广告加载事件。

`InterstitialAd.offLoad(function callback)`

取消监听插屏广告加载事件

`InterstitialAd.onError(function callback)`

监听插屏错误事件。

`InterstitialAd.offError(function callback)`

取消监听插屏错误事件

`InterstitialAd.onClose(function callback)`

监听插屏广告关闭事件。

`InterstitialAd.offClose(function callback)`

取消监听插屏广告关闭事件
