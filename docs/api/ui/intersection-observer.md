节点布局交叉状态 API 可用于监听两个或多个组件节点在布局位置上的相交状态。这一组API常常可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。

### uni.createIntersectionObserver([this], [options])
创建并返回一个 ``IntersectionObserver`` 对象实例。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|HBuilderX 2.0.4+|√|x|√|√|

**options 的可选参数为：**

|字段名|类型|说明|
|:-|:-|:-|
|thresholds|Array|一个数值数组，包含所有阈值。默认为 ``[0]``。|
|initialRatio|Number|初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。默认为 ``0``。|
|observeAll|Boolean|是否同时观测多个参照节点（而非一个），如果设为 ``true``，``observe`` 的 ``targetSelector`` 将选中多个节点（注意：同时选中过多节点将影响渲染性能）|

### IntersectionObserver 对象的方法列表

|方法|说明|
|:-|:-|
|IntersectionObserver.relativeTo(selector,[margins])|使用选择器指定一个节点，作为参照区域之一。|
|IntersectionObserver.relativeToViewport([margins])|指定页面显示区域作为参照区域之一|
|IntersectionObserver.observe(selector,[callback])|指定目标节点并开始监听相交状态变化情况。回调函数 ``callback`` 包含一个参数 ``result``|
|IntersectionObserver.disconnect()|停止监听。回调函数将不再触发。|

**margins 参数：** 用来扩展（或收缩）参照节点布局区域的边界。

|属性|类型|默认值|是否必填|说明|
|:-|:-|:-|:-|:-|
|left|number||否|节点布局区域的左边界|
|right|number||否|节点布局区域的右边界|
|top|number||否|节点布局区域的上边界|
|bottom|number||否|节点布局区域的下边界|

下面的示例代码中，如果目标节点 ``".test"`` 进入 ``".scroll"`` 区域以下 100px 时，就会触发回调函数。
```
uni.createIntersectionObserver(this).relativeTo('.scroll',{bottom: 100}}).observe('.test', (res) => {
  console.log(res);
})
```

**observe 回调函数 result 包含的字段**

|字段名|类型|说明|
|:-|:-|:-|
|intersectionRatio|Number|相交比例|
|intersectionRect|Object|相交区域的边界，包含 ``left``、``right``、``top``、``bottom`` 四项|
|boundingClientRect|Object|目标节点布局区域的边界，包含 ``left``、``right``、``top``、``bottom`` 四项|
|relativeRect|Object|参照区域的边界，包含 ``left``、``right``、``top``、``bottom`` 四项|
|time|Number|相交检测时的时间戳|


**Tips**

- 与页面显示区域的相交区域并不准确代表用户可见的区域，因为参与计算的区域是“布局区域”，布局区域可能会在绘制时被其他节点裁剪隐藏（如祖先节点中 overflow 样式为 hidden 的节点）或遮盖（如 fixed 定位的节点）。
- 节点交互状态 ``API`` 建议在 ``onReady`` 生命周期里监听，因为此 ``API`` 需要查找页面元素，``onReady`` 时页面已经完成初次渲染，已经能查找到对应的元素。

### 代码示例

```
<template>
	<view class="container">
		<text>{{appear ? '小球出现' : '小球消失'}}</text>
		<view class="page-section">
			<scroll-view class="scroll-view" scroll-y>
				<view class="scroll-area">
					<text class="notice">向下滚动让小球出现</text>
					<view class="ball"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	let observer = null;
	export default {
		data() {
			return {
				appear: false
			}
		},
		onReady() {
			observer = uni.createIntersectionObserver(this);
            observer.relativeTo('.scroll-view').observe('.ball', (res) => {
              if (res.intersectionRatio > 0 && !this.appear) {
                this.appear = true;
              } else if (!res.intersectionRatio > 0 && this.appear) {
                this.appear = false;
              }
            })
		},
		onUnload() {
			if (observer) {
				observer.disconnect()
			}
		}
	}
</script>
<style>
	view,page {
		display: flex;
		flex-direction: column;
	}

	.scroll-view {
		height: 400rpx;
		background: #fff;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}

	.scroll-area {
		height: 1300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: .5s;
	}

	.notice {
		margin-top: 150rpx;
		margin: 150rpx 0 400rpx 0;
	}

	.ball {
		width: 200rpx;
		height: 200rpx;
		background: #1AAD19;
		border-radius: 50%;
	}
</style>

```