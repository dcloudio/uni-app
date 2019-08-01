### onPullDownRefresh
在 js 中定义 onPullDownRefresh 处理函数（和onLoad等生命周期函数同级），监听该页面用户下拉刷新事件。

- 需要在 ``pages.json`` 里，找到的当前页面的pages节点，并在 ``style`` 选项中开启 ``enablePullDownRefresh``。
- 当处理完数据刷新后，``uni.stopPullDownRefresh`` 可以停止当前页面的下拉刷新。

### uni.startPullDownRefresh(OBJECT)
开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|x|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|errMsg|String|接口调用结果|

### uni.stopPullDownRefresh()
停止当前页面下拉刷新。

**示例**

pages.json

```javascript
{
    "pages": [
        {
        	"path": "pages/index/index",
        	"style": {
        		"navigationBarTitleText": "uni-app",
        		"enablePullDownRefresh": true
        	}
        }
    ],
    "globalStyle": {
    	"navigationBarTextStyle": "white",
    	"navigationBarBackgroundColor": "#0faeff",
    	"backgroundColor": "#fbf9fe"
    }
}
```

index.vue
```javascript
// 仅做示例，实际开发中延时根据需求来使用。
export default {
	data: {
		text: 'uni-app'
	},
	onLoad: function (options) {
		setTimeout(function () {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	}
}
```

### FAQ
Q：如何暂时禁用掉下拉刷新，待需要的时候再重新开启？
A：`5+App` 平台下可以处理此类场景，详细参考：[uni-app 中实现动态禁用/开启下拉刷新](http://ask.dcloud.net.cn/article/35134)

Q：自定义title如何让下拉刷新在title之下
A：App和H5端使用circle方式的下拉刷新，设offset在title高度之下。hello uni-app的模板-导航栏中有示例。小程序端无法实现，除非放弃原生下拉刷新，自己模拟。

Q：如何自定义下拉刷新样式
A：小程序端的原生下拉刷新样式是固定的；App端原生的下拉刷新有2种样式可选择，下拉漏出雪花和下拉circle圈。如果使用nvue，也可以自己实现下拉刷新，都是原生渲染。如果想使用scroll-view在前端实现自定义下拉刷新，需要注意列表不可太长和太复杂，否则会有性能问题。[插件市场](https://ext.dcloud.net.cn/)搜索下拉刷新有示例。
