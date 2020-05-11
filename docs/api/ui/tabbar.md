### uni.setTabBarItem(OBJECT)

动态设置 tabBar 某一项的内容

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|index|number||是|tabBar 的哪一项，从左边算起|
|text|String||否|tab 上的按钮文字|
|iconPath|String||否|图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片|
|selectedIconPath|String||否|选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效|
|success|Funtion||否|接口调用成功的回调函数|
|fail|Funtion||否|接口调用失败的回调函数|
|complete|Funtion||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例代码**

```js
uni.setTabBarItem({
  index: 0,
  text: 'text',
  iconPath: '/path/to/iconPath',
  selectedIconPath: '/path/to/selectedIconPath'
})
```

### uni.setTabBarStyle(OBJECT)

动态设置 tabBar 的整体样式

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|color|String||否|tab 上的文字默认颜色，HexColor|
|selectedColor|String||否|tab 上的文字选中时的颜色，HexColor|
|backgroundColor|String||否|tab 的背景色，HexColor|
|backgroundImage|String||否|图片背景。支持设置本地图片或创建线性渐变如，优先级高于 backgroundColor，仅 App 2.7.1+ 支持|
|backgroundRepeat|String||否|背景图平铺方式。repeat：背景图片在垂直方向和水平方向平铺；repeat-x：背景图片在水平方向平铺，垂直方向拉伸；repeat-y：背景图片在垂直方向平铺，水平方向拉伸；no-repeat：背景图片在垂直方向和水平方向都拉伸。 默认使用 no-repeat。仅 App 2.7.1+ 支持|
|borderStyle|String||否|tabBar上边框的颜色， 仅支持 black/white|
|success|Funtion||否|接口调用成功的回调函数|
|fail|Funtion||否|接口调用失败的回调函数|
|complete|Funtion||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**backgroundImage创建线性渐变说明**

`backgroundImage: linear-gradient(to top, #a80077, #66ff00);`

目前暂不支持 radial-gradient（径向渐变）。

目前只支持两种颜色的渐变，渐变方向如下：

- to right：从左向右渐变
- to left：从右向左渐变
- to bottom：从上到下渐变
- to top：从下到上渐变
- to bottom right：从左上角到右下角
- to top left：从右下角到左上角

**示例代码**

```js
uni.setTabBarStyle({
  color: '#FF0000',
  selectedColor: '#00FF00',
  backgroundColor: '#0000FF',
  borderStyle: 'white'
})
```

### uni.hideTabBar(OBJECT)

隐藏 tabBar

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|animation|boolean|false|否|是否需要动画效果，仅微信小程序和百度小程序支持|
|success|Funtion||否|接口调用成功的回调函数|
|fail|Funtion||否|接口调用失败的回调函数|
|complete|Funtion||否|接口调用结束的回调函数（调用成功、失败都会执行）|

### uni.showTabBar(OBJECT)

显示 tabBar

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|animation|boolean|false|否|是否需要动画效果，仅微信小程序和百度小程序支持|
|success|Funtion||否|接口调用成功的回调函数|
|fail|Funtion||否|接口调用失败的回调函数|
|complete|Funtion||否|接口调用结束的回调函数（调用成功、失败都会执行）|

### uni.setTabBarBadge(OBJECT)
为 tabBar 某一项的右上角添加文本。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|index|Number|是|tabBar的哪一项，从左边算起|
|text|String|是|显示的文本，不超过 3 个半角字符|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例代码**

```javascript
uni.setTabBarBadge({
  index: 0,
  text: '1'
})
```

### uni.removeTabBarBadge(OBJECT)
移除 tabBar 某一项右上角的文本。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|index|Number|是|tabBar的哪一项，从左边算起|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

### uni.showTabBarRedDot(OBJECT)
显示 tabBar 某一项的右上角的红点。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|index|Number|是|tabBar的哪一项，从左边算起|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

### uni.hideTabBarRedDot(OBJECT)
隐藏 tabBar 某一项的右上角的红点。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

**OBJECT参数说明：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|index|Number|是|tabBar的哪一项，从左边算起|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

### uni.onTabBarMidButtonTap(CALLBACK)
监听中间按钮的点击事件

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√（HBuilderX 2.3.4+）|x|x|x|x|x|x|


**Tip**
- tabbar是原生的，层级高于前端元素
- [uni-app插件市场](https://ext.dcloud.net.cn/search?q=%E5%BA%95%E9%83%A8%E5%9B%BE%E6%A0%87%E8%8F%9C%E5%8D%95)有封装的前端tabbar，但性能不如原生tabbar
- 如果想要一个中间带+号的tabbar，在HBuilderX中新建uni-app项目、选择 底部选项卡 模板
