#### getMenuButtonBoundingClientRect()

在小程序平台，如果原生导航栏被隐藏，仍然在右上角会有一个悬浮按钮，微信下也被称为胶囊按钮。本API用于获取小程序下该菜单按钮的布局位置信息，方便开发者布局顶部内容时避开该按钮。

坐标信息以屏幕左上角为原点。

**平台差异说明**

|5+App	|H5	|微信小程序	|支付宝小程序	|百度小程序	|头条小程序	|QQ小程序	|
|:-:	|:-:|:-:		|:-:			|:-:		|:-:		|:-:		|
|x		|x	|√			|x				|√			|√			|√			|

**返回值说明**

|属性	|类型	|说明					|
|width	|number	|宽度，单位：px			|
|height	|number	|高度，单位：px			|
|top	|number	|上边界坐标，单位：px	|
|right	|number	|右边界坐标，单位：px	|
|bottom	|number	|下边界坐标，单位：px	|
|left	|number	|左边界坐标，单位：px	|

**示例**

```javascript
  let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
```

**注意**

- 支付宝小程序：其逻辑与微信小程序不同，它提供了菜单点击后按钮的自定义功能，可以选择显示那些系统按钮，[规范详情](https://docs.alipay.com/mini/api/optionmenuitem)
