## 窗口样式相关的 API

获取对应窗口的样式，返回一个 css 属性值对象;
设置对应窗口的样式，传入一个 css 属性值对象

### uni.getTopWindowStyle()

获取 topWindow 的样式

> 3.1.0 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.getTopWindowStyle()
```

### uni.getLeftWindowStyle()

获取 leftWindow 的样式

> 3.1.0 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.getLeftWindowStyle()
```

### uni.getRightWindowStyle()

获取 rightWindow 的样式

> 3.1.0 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.getRightWindowStyle()
```

### uni.setTopWindowStyle(OBJECT)

设置 topWindow 的样式

> 3.0.5 新增

**OBJECT 参数说明**

|参数|类型|说明|
|---|---|---|
|OBJECT|Object|css 样式对象，需写驼峰css属性 ，{height: '100px', backgroundColor: 'red'}|

**代码示例**

```javascript
uni.setTopWindowStyle({
    height: '100px', 
    backgroundColor: 'red'
})
```

### uni.setLeftWindowStyle(OBJECT)

设置 leftWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OBJECT 参数说明**

|参数|类型|说明|
|---|---|---|
|OBJECT|Object|css 样式对象，需写驼峰css属性 ，{width: '500px', backgroundColor: 'blue'}|

**代码示例**

```javascript
uni.setLeftWindowStyle({
    width: '500px', 
    backgroundColor: 'blue'
})
```

### uni.setRightWindowStyle(OBJECT)

设置 rightWindow 的样式

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**OBJECT 参数说明**

|参数|类型|说明|
|---|---|---|
|OBJECT|Object|css 样式对象，需写驼峰css属性 ，{width: '500px', backgroundColor: 'blue'}|

**代码示例**

```javascript
uni.setRightWindowStyle({
    width: '500px', 
    backgroundColor: 'blue'
})
```

<!-- 
## 显示或隐藏窗口的 API

显示或隐藏对应的窗口

### uni.showTopWindow()

显示 topWindow

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.showTopWindow()
```

### uni.showLeftWindow()

显示 leftWindow

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.showLeftWindow()
```

### uni.showRightWindow()

显示 rightWindow

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.showRightWindow()
```

### uni.hideTopWindow()

隐藏 topWindow

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.hideTopWindow()
```

### uni.hideLeftWindow()

隐藏 leftWindow

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.hideLeftWindow()
```

### uni.hideRightWindow()

隐藏 rightWindow

> 3.0.5 新增

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|

**代码示例**

```javascript
uni.hideRightWindow()
``` 
-->
