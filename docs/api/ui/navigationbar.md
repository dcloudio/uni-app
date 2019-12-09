### uni.setNavigationBarTitle(OBJECT)

动态设置当前页面的标题。

**OBJECT参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|title|String|是|页面标题|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.setNavigationBarTitle({
	title: '新的标题'
});
```


### uni.setNavigationBarColor(OBJECT)

设置页面导航条颜色。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明**

|参数|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|frontColor|String|是|前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000|5+App、H5、微信小程序、百度小程序|
|backgroundColor|String|是|背景颜色值，有效值为十六进制颜色||
|animation|Object|否|动画效果，{duration,timingFunc}|微信小程序、百度小程序|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**注意**
- Android 上的 backgroundColor 参数有限制，黑色大于 rgb(30,30,30), 白色小于 rgb(235,235,235)

**animation 结构**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|duration|number|0|否|动画变化时间，单位 ms|
|timingFunc|String|'linear'|否|动画变化方式|

**animation.timingFunc 有效值**

|值|说明|
|:-|:-|
|linear|动画从头到尾的速度是相同的。|
|easeIn|动画以低速开始|
|easeOut|动画以低速结束。|
|easeInOut|动画以低速开始和结束。|

**success返回参数说明**

|参数名|类型|说明|
|:-|:-|:-|
|errMsg|String|调用结果|

**示例**

```javascript
uni.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: '#ff0000',
    animation: {
        duration: 400,
        timingFunc: 'easeIn'
    }
})
```

### uni.showNavigationBarLoading(OBJECT)

在当前页面显示导航条加载动画。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|√|√|√|x|√|

App平台调用此API时会在屏幕中间悬浮显示loading

**OBJECT参数说明**

|参数|类型|必填|说明|
|---|---|---|---|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.showNavigationBarLoading()
```

### uni.hideNavigationBarLoading(OBJECT)

在当前页面隐藏导航条加载动画。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|√|√|√|x|√|

App平台调用此API时会关闭屏幕中间悬浮显示的loading

**OBJECT参数说明**

|参数|类型|必填|说明|
|---|---|---|---|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.hideNavigationBarLoading()
```


### uni.hideHomeButton(OBJECT)

在当前页面隐藏导航条加载动画。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|x|x|x|

隐藏返回首页按钮。

**OBJECT参数说明**

|参数|类型|必填|说明|
|---|---|---|---|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.hideHomeButton()
```

**说明**
- 微信小程序自基础库版本2.8.3开始支持
- 当用户打开的小程序最底层页面是非首页时，默认展示“返回首页”按钮，开发者可在页面`onShow`中调用`hideHomeButton`进行隐藏。