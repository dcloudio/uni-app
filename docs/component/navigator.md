#### navigator

页面链接。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|url|String||应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 ``.vue`` 后缀||
|open-type|String|navigate|跳转方式||
|delta|Number||当 open-type 为 'navigateBack' 时有效，表示回退的层数||
|animation-type|String|pop-in/out|当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果，详见：[窗口动画](api/router?id=animation)|5+App|
|animation-duration|Number|300|当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间。|5+App|
|hover-class|String|navigator-hover|指定点击时的样式类，当hover-class="none"时，没有点击态效果||
|hover-stop-propagation|Boolean|false|指定是否阻止本节点的祖先节点出现点击态|微信小程序|
|hover-start-time|Number|50|按住后多久出现点击态，单位毫秒||
|hover-stay-time|Number|600|手指松开后点击态保留时间，单位毫秒|&nbsp;|

**open-type 有效值**

|值|说明|平台差异说明|
|:-|:-|:-|
|navigate|对应 uni.navigateTo 的功能||
|redirect|对应 uni.redirectTo 的功能||
|switchTab|对应 uni.switchTab 的功能||
|reLaunch|对应 uni.reLaunch 的功能|头条小程序不支持|
|navigateBack|对应 uni.navigateBack 的功能|&nbsp;|

**注意**
- navigator-hover 默认为 {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}, ``<navigator>`` 的子节点背景色应为透明色。**
- app-nvue 平台暂不支持 `<navigator>`

**示例**
 
```html
<template>
	<view>
		<view class="page-body">
			<view class="btn-area">
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<button type="default">跳转到新页面</button>
				</navigator>
				<navigator url="redirect/redirect?title=redirect" redirect hover-class="other-navigator-hover">
					<button type="default">在当前页打开</button>
				</navigator>
			</view>
		</view>
	</view>
</template>
```

**注意**
- 跳转tabbar页面，必须设置open-type="switchTab"