### uni.setTabBarBadge(OBJECT)

为 tabBar 某一项的右上角添加文本。

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|index		|Number		|是		|tabBar的哪一项，从左边算起												|
|text			|String		|是		|显示的文本，超过 3 个字符则显示成“…”					|
|success	|Function	|否		|接口调用成功的回调函数														|
|fail			|Function	|否		|接口调用失败的回调函数														|
|complete	|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）	|
  
**示例代码**

```javascript
uni.setTabBarBadge({
  index: 0,
  text: '1'
})
```

### uni.removeTabBarBadge(OBJECT)

移除 tabBar 某一项右上角的文本。

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|index		|Number		|是	|tabBar的哪一项，从左边算起												|
|success	|Function	|否	|接口调用成功的回调函数														|
|fail			|Function	|否	|接口调用失败的回调函数														|
|complete	|Function	|否	|接口调用结束的回调函数（调用成功、失败都会执行）	|

### uni.showTabBarRedDot(OBJECT)

显示 tabBar 某一项的右上角的红点。

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|index		|Number		|是		|tabBar的哪一项，从左边算起												|
|success	|Function	|否		|接口调用成功的回调函数														|
|fail			|Function	|否		|接口调用失败的回调函数														|
|complete	|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）	|

### uni.hideTabBarRedDot(OBJECT)

隐藏 tabBar 某一项的右上角的红点。

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|index		|Number		|是	|tabBar的哪一项，从左边算起												|
|success	|Function	|否	|接口调用成功的回调函数														|
|fail			|Function	|否	|接口调用失败的回调函数														|
|complete	|Function	|否	|接口调用结束的回调函数（调用成功、失败都会执行）	|

**onTabItemTap**

点击 tab 时触发

```javascript
export default {
  methods:{
    onTabItemTap(item) {
      console.log(item.index)
      console.log(item.pagePath)
      console.log(item.text)
    }
  }
}
```

### uni.setTabBarStyle(OBJECT)

动态设置 tabBar 的整体样式

**OBJECT参数说明：**

|参数						|类型			|说明																							|
|---									|---						|---			|
|color					|HexColor	|tab 上的文字默认颜色															|
|selectedColor	|HexColor	|tab 上的文字选中时的颜色													|
|backgroundColor|HexColor	|tab 的背景色																			|
|borderStyle		|String		|tabbar上边框的颜色， 仅支持 black/white					|
|success				|Function	|接口调用成功的回调函数														|
|fail						|Function	|接口调用失败的回调函数														|
|complete				|Function	|接口调用结束的回调函数（调用成功、失败都会执行）	|

**示例代码**

```javascript
uni.setTabBarStyle({
    color: '#FF0000',
    selectedColor: '#00FF00',
    backgroundColor: '#0000FF',
    borderStyle: 'white'
})
```

### uni.setTabBarItem(OBJECT)

动态设置 tabBar 某一项的内容

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|index						|Number		|是			|tabBar 的哪一项，从左边算起																																						|
|text							|String		|否			|tab 上按钮文字																																													|
|iconPath					|String		|否			|图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片|
|selectedIconPath	|String		|否			|选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效				|
|success					|Function	|否			|接口调用成功的回调函数																																									|
|fail							|Function	|否			|接口调用失败的回调函数																																									|
|complete					|Function	|否			|接口调用结束的回调函数（调用成功、失败都会执行）																												|

**示例代码**

```javascript
uni.setTabBarItem({
    index: 0,
    text: 'text',
    iconPath: '/path/to/iconPath',
    selectedIconPath: '/path/to/selectedIconPath'
})
```

### uni.showTabBar(OBJECT)

显示 tabBar

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|animation|Boolean	|否	|是否需要动画效果，默认无													|
|success	|Function	|否	|接口调用成功的回调函数														|
|fail			|Function	|否	|接口调用失败的回调函数														|
|complete	|Function	|否	|接口调用结束的回调函数（调用成功、失败都会执行）	|


### uni.hideTabBar(OBJECT)

隐藏 tabBar

**OBJECT参数说明：**

|参数			|类型			|必填	|说明																							|
|---			|---			|---	|---																							|
|animation|Boolean	|否	|是否需要动画效果，默认无													|
|success	|Function	|否	|接口调用成功的回调函数														|
|fail			|Function	|否	|接口调用失败的回调函数														|
|complete	|Function	|否	|接口调用结束的回调函数（调用成功、失败都会执行）	|