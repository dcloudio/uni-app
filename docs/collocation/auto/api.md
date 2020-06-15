### Page

Page 模块提供了控制页面的方法。

#### 属性

page.path

页面路径。

`page.path: string`

page.query

页面参数。
`page.query: Object`


#### 方法

page.$

获取页面元素。

`page.$(selector: string): Promise<Element>`

参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|selector|string|是|-|选择器|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-desc')
  console.log(element.tagName) // 'view'
```


page.$$

获取页面元素数组。

`page.$$(selector: string): Promise<Element[]>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|selector|string|是|-|选择器|

该方法跟 $ 一样均无法选择自定义组件内的元素，请使用 element.$。

示例代码：
```
  const page = await program.currentPage()
  const elements = await page.$$('.list-text')
  console.log(elements.length)
```

page.waitFor

等待直到指定条件成立。

`page.waitFor(condition: string | number | Function): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|condition|string number Function|是|-|等待条件|


如果条件是 `string` 类型，那么该参数会被当成选择器，当该选择器选中元素个数不为零时，结束等待。

如果条件是 `number` 类型，那么该参数会被当成超时时长，当经过指定时间后，结束等待。

如果条件是 `Function` 类型，那么该参数会被当成断言函数，当该函数返回真值时，结束等待。


示例代码：
```
  const page = await program.currentPage()
  await page.waitFor(5000) // 等待 5 秒
  await page.waitFor('picker') // 等待页面中出现 picker 元素
  await page.waitFor(async () => {
    return (await page.$$('picker')).length > 5
  }) // 等待页面中 picker 元素数量大于 5
```

page.data

获取页面渲染数据。

`page.data(path?: string): Promise<Object>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|path|string|否|-|数据路径|

示例代码：
```
  const page = await program.currentPage()
  console.log(await page.data('list'))
```


page.setData

设置页面渲染数据。

`page.setData(data: Object): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|data|Object|是|-|要改变的数据|

示例代码：
```
  const page = await program.currentPage()
  await page.setData({
    text: 'changed data'
  })
```


page.size

获取页面大小。

`page.size(): Promise<Object>`


返回值说明

|字段|类型|说明|
|:-:|:-:|:-:|
|width|number|页面可滚动宽度|
|height|number|页面可滚动高度|


示例代码：
```
  const page = await program.currentPage()
  const { width, height } = await page.size()
  console.log(width, height)
```


page.scrollTop

获取页面滚动位置。

`page.scrollTop(): Promise<number>`


示例代码：
```
  const page = await program.currentPage()
  await program.pageScrollTo(20)
  console.log(await page.scrollTop())
```


page.callMethod

调用页面指定方法。

`page.callMethod(method: string, ...args: any[]): Promise<any>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|method|string|是|-|需要调用的方法名|
|...args|array|否|-|方法参数|


示例代码：
```
  const page = await program.currentPage()
  await page.callMethod('onShareAppMessage')
```



### Element
Element 模块提供了控制页面元素的方法。

#### 属性

element.tagName

标签名，小写。

`element.tagName: string`


#### 方法

element.$

在元素范围内获取元素。

`element.$(selector: string): Promise<Element>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|selector|string|是|-|选择器|

示例代码：
```
  const page = await program.currentPage()
  let element = await page.$('.index-hd')
  element = await element.$('.index-desc')
  console.log(await element.text())
```


element.$$

在元素范围内获取元素数组。

`element.$$(selector: string): Promise<Element[]>`


参数说明

|字段|类型|必填	|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|selector|string|是|-|选择器|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-bd')
  const elements = await element.$$('.list-text')
  console.log(await elements[0].text())
```


element.size

获取元素大小。

`element.size(): Promise<Object>`


返回值说明

|字段|类型|说明|
|:-:|:-:|:-:|
|width|number|元素宽度|
|height|number|元素高度|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-bd')
  const { width, height } = await element.size()
  console.log(width, height)
```


element.offset

获取元素绝对位置。

`element.offset(): Promise<Object>`


返回值说明

|字段|类型|说明|
|:-:|:-:|:-:|
|left|number|左上角x坐标，单位：px|
|top|number|左上角y坐标，单位：px|

坐标信息以页面左上角为原点。


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-bd')
  const { left top } = await element.offset()
  console.log(left, top)
```


element.text

获取元素文本。

`element.text(): Promise<string>`


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-desc')
  console.log(await element.text())
```


element.attribute

获取元素特性。

`element.attribute(name: string): Promise<string>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|name|string|是|-|特性名|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.logo')
  console.log(await element.attribute('src')) // -> 'static/logo.png'
```


element.property

获取元素属性。

`element.property(name: string): Promise<any>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|name|string|是|-|属性名|

`element.property` 与 `element.attribute` 主要区别如下：

`element.attribute` 获取的是标签上的值，因此它的返回类型一定是字符串，element.property 则不一定。

`element.attribute` 可以获取到 class 和 id 之类的值，element.property 不行。

`element.property` 可以获取到文档里对应组件列举的大部分属性值，比如表单 input 等组件的 value 值。


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('input')
  console.log(await element.property('value'))
```


element.html

获取元素 HTML。

`element.html(): Promise<string>`


element.outerHtml

同 html，只是会获取到元素本身。

`element.outerHtml(): Promise<string>`


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-desc')
  console.log(await element.html())
  console.log(await element.outerHtml())
```


element.value

获取元素值。

`element.value(): Promise<string>`


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.input')
  console.log(await element.value())
```


element.style

获取元素样式值。

`element.style(name: string): Promise<string>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|name|string|是|-|样式名|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.index-desc')
  console.log(await element.style('color')) // -> 'rgb(128, 128, 128)'
```


element.tap

点击元素。

`element.tap(): Promise<void>`


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('.list-item-hd')
  await element.tap()
```


element.longpress

长按元素。

`element.longpress(): Promise<void>`


element.touchstart

手指开始触摸元素。

`element.touchstart(options: Object): Promise<void>`


options 字段定义如下：

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|touches|array|是|-|触摸事件，当前停留在屏幕中的触摸点信息的数组|
|changedTouches|array|是|-|触摸事件，当前变化的触摸点信息的数组|


element.touchmove

手指触摸元素后移动。

`element.touchmove(options: Object): Promise<void>`

options 字段同 touchstart。


element.touchend

手指结束触摸元素。

`element.touchend(options: Object): Promise<void>`

options 字段同 touchstart。


```
  const page = await program.currentPage()
  const element = await page.$('.touch')
  await element.touchstart({
    touches: [
      {
        identifier: 1,
        pageX: 500,
        pageY: 500
      }
    ],
    changedTouches: [
      {
        identifier: 1,
        pageX: 500,
        pageY: 500
      }
    ]
  })
  await element.touchend({
    touches: [],
    changedTouches: [
      {
        identifier: 1,
        pageX: 500,
        pageY: 500
      }
    ]
  })
```


element.trigger

触发元素事件。

`element.trigger(type: string, detail?: Object): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|type|string|是|-|触发事件类型|
|detail|Object|否|-|触发事件时传递的 detail 值|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('picker')
  await element.trigger('change', { value: 1 })
```
该方法无法改变组件状态，仅触发响应方法，也无法触发用户操作事件，即 `tap`，`longpress` 等事件，请使用对应的其它方法调用。


element.input

输入文本，仅 input、textarea 组件可以使用。

`element.input(value: string): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|value|string|是|-|需要输入的文本|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('input')
  await element.input('test')
```


element.callMethod

调用组件实例指定方法，仅自定义组件可以使用。

`element.callMethod(method: string, ...args: any[]): Promise<any>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|method|string|是|-|需要调用的方法名|
|...args|array|否|-|方法参数|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('set-tab-bar')
  await element.callMethod('navigateBack')
```


element.data

获取组件实例渲染数据，仅自定义组件可以使用。

`element.data(path?: string): Promise<Object>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|path|string|否|-|数据路径|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('set-tab-bar')
  console.log(await element.data('hasSetTabBarBadge'))
```


element.setData

设置组件实例渲染数据，仅自定义组件可以使用。

`element.setData(data: Object): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|data|Object|是|-|要改变的数据|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('set-tab-bar')
  await page.setData({
    hasSetTabBarBadge: true
  })
```


element.callContextMethod

调用上下文 Context 对象方法，仅 video 组件可以使用。

`element.callContextMethod(method: string, ...args: any[]): Promise<any>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|method|string|是|-|需要调用的方法名|
|...args|array|否|-|方法参数|

video 组件必须设置了 id 才能使用。

```
  const page = await program.currentPage()
  const element = await page.$('video')
  await element.callContextMethod('play')
```


element.scrollWidth

获取滚动宽度，仅 scroll-view 组件可以使用。

`element.scrollWidth(): Promise<number>`


element.scrollHeight

获取滚动高度，仅 scroll-view 组件可以使用。

`element.scrollHeight(): Promise<number>`


element.scrollTo

滚动到指定位置，仅 scroll-view 组件可以使用。

`element.scrollTo(x: number, y: number): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|x|number|是|-|横向滚动位置|
|y|number|是|-|纵向滚动位置|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('scroll-view')
  const y = (await element.scrollHeight()) - 50
  await element.scrollTo(0, y)
```


element.swipeTo

滑动到指定滑块，仅 swiper 组件可以使用。

`element.swipeTo(index: number): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|index|number|是|-|目标滑块的 index|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('swiper')
  await element.swipeTo(2)
```


element.moveTo

移动视图容器，仅 movable-view 组件可以使用。

`element.moveTo(x: number, y: number): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|x|number|是|-|x 轴方向的偏移|
|y|number|是|-|y 轴方向的偏移|

示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('movable-view')
  await element.moveTo(40, 40)
```


element.slideTo

滑动到指定数值，仅 slider 组件可以使用。

`element.slideTo(value: number): Promise<void>`


参数说明

|字段|类型|必填|默认值|说明|
|:-:|:-:|:-:|:-:|:-:|
|value|number|是|-|要设置的值|


示例代码：
```
  const page = await program.currentPage()
  const element = await page.$('slider')
  await element.slideTo(10)
```



**平台差异**

#### program(全局对象)

|方法							|APP-NVUE	|APP-VUE|H5	|微信小程序	|百度小程序	|说明																																|
|--								|--				|--			|--	|--					|--					|--																																	|
|pageStack				|√				|√			|√	|√					|√					|获取小程序页面堆栈																									|
|navigateTo				|√				|√			|√	|√					|√					|保留当前页面，跳转到应用内的某个页面，同`uni.navigateTo`						|
|redirectTo				|√				|√			|√	|√					|√					|关闭当前页面，跳转到应用内的某个页面，同`uni.redirectTo`						|
|navigateBack			|√				|√			|√	|√					|√					|关闭当前页面，返回上一页面，同`uni.navigateBack`										|
|reLaunch					|√				|√			|√	|√					|√					|关闭所有页面，打开到应用内的某个页面，同`uni.reLaunch`							|
|switchTab				|√				|√			|√	|√					|√					|跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，同`uni.switchTab`|
|currentPage			|√				|√			|√	|√					|√					|获取当前页面																												|
|systemInfo				|√				|√			|√	|√					|√					|获取系统信息，同`uni.getSystemInfo`																|
|pageScrollTo			|x				|√			|√	|√					|√					|将页面滚动到目标位置，同`uni.pageScrollTo`													|
|callUniMethod		|√				|√			|√	|√					|√					|调用 uni 对象上的指定方法																					|
|screenshot				|√				|√			|√	|√					|x					|对当前页面截图，目前只有开发者工具模拟器支持，客户端无法使用				|
|mockUniMethod		|√				|√			|√	|√					|√					|覆盖 uni 对象上指定方法的调用结果																	|
|restoreUniMethod	|√				|√			|√	|√					|√					|重置 uni 指定方法，消除 mockUniMethod 调用的影响										|
|testAccounts			|x				|x			|x	|√					|x					|获取多账号调试中已添加的用户列表																		|
|evaluate					|x				|x			|x	|√					|x					|注入代码片段并返回执行结果																					|
|exposeFunction		|x				|x			|x	|√					|x					|在全局暴露方法，供小程序侧调用测试脚本中的方法											|

#### Page

|属性	|APP-NVUE	|APP-VUE|H5	|微信小程序	|百度小程序	|说明			|
|--		|--				|--			|--	|--					|--					|--				|
|path	|√				|√			|√	|√					|√					|页面路径	|
|query|√				|√			|√	|√					|√					|页面参数	|

|方法				|APP-NVUE	|APP-VUE|H5	|微信小程序	|百度小程序	|说明												|
|--					|--				|--			|--	|--					|--					|--													|
|$					|√				|√			|√	|√					|√					|获取页面元素								|
|$$					|√				|√			|√	|√					|√					|获取页面元素数组						|
|waitFor		|√				|√			|√	|√					|√					|等待直到指定条件成立				|
|data				|√				|√			|√	|√					|√					|获取页面渲染数据						|
|setData		|√				|√			|√	|√					|√					|设置页面渲染数据						|
|size				|√				|√			|√	|√					|√					|获取页面大小(width,height)	|
|scrollTop	|√				|√			|√	|√					|√					|获取页面滚动位置						|
|callMethod	|√				|√			|√	|√					|√					|调用页面指定方法						|

#### Element
|属性		|APP-NVUE	|APP-VUE|H5	|微信小程序	|百度小程序	|说明					|
|--			|--				|--			|--	|--					|--					|--						|
|tagName|√				|√			|√	|√					|√					|标签名，小写	|

|方法							|APP-NVUE	|APP-VUE|H5	|微信小程序	|百度小程序	|说明																								|
|--								|--				|--			|--	|--					|--					|--																									|
|$								|√				|√			|√	|√					|√					|在元素范围内获取元素																|
|$$								|√				|√			|√	|√					|√					|在元素范围内获取元素数组														|
|size							|√				|√			|√	|√					|√					|获取元素大小(width,height)													|
|offset						|√				|√			|√	|√					|√					|获取元素绝对位置(left,top)													|
|text							|√				|√			|√	|√					|√					|获取元素文本																				|
|attribute				|√				|√			|√	|√					|√					|获取元素特性																				|
|style						|√				|√			|√	|√					|√					|获取元素样式值																			|
|tap							|√				|√			|√	|√					|√					|点击元素																						|
|value						|√				|√			|√	|√					|√					|获取元素值																					|
|callMethod				|√				|√			|√	|√					|√					|调用组件实例指定方法，仅自定义组件可以使用					|
|html							|√				|√			|√	|√					|√					|获取元素 HTML																			|
|outerHtml				|√				|√			|√	|√					|√					|同 html，只是会获取到元素本身											|
|data							|√				|√			|√	|√					|√					|获取组件实例渲染数据，仅自定义组件可以使用					|
|setData					|√				|√			|√	|√					|√					|设置组件实例渲染数据，仅自定义组件可以使用					|
|property					|√				|√			|√	|√					|x					|获取元素属性																				|
|touchstart				|√				|√			|√	|√					|x					|手指开始触摸元素																		|
|touchmove				|√				|√			|√	|√					|x					|手指触摸元素后移动																	|
|touchend					|√				|√			|√	|√					|x					|手指结束触摸元素																		|
|longpress				|√				|√			|√	|√					|x					|获取元素文本																				|
|trigger					|√				|√			|√	|√					|x					|触发元素事件																				|
|input						|√				|√			|√	|√					|x					|输入文本，仅 input、textarea 组件可以使用					|
|callContextMethod|x				|x			|x	|√					|x					|调用上下文 Context 对象方法，仅 video 组件可以使用	|
|scrollWidth			|x				|√			|√	|√					|x					|获取滚动宽度，仅 scroll-view 组件可以使用					|
|scrollHeight			|x				|√			|√	|√					|x					|获取滚动高度，仅 scroll-view 组件可以使用					|
|scrollTo					|x				|√			|√	|√					|x					|滚动到指定位置，仅 scroll-view 组件可以使用				|
|swipeTo					|√				|√			|√	|√					|x					|滑动到指定滑块，仅 swiper 组件可以使用							|
|moveTo						|√				|√			|√	|√					|x					|移动视图容器，仅 movable-view 组件可以使用					|
|slideTo					|√				|√			|√	|√					|x					|滑动到指定数值，仅 slider 组件可以使用							|


#### 测试平台判断
```
if (process.env.UNI_PLATFORM === "h5") {}
if (process.env.UNI_PLATFORM === "app-plus") {}
if (process.env.UNI_PLATFORM === "mp-weixin") {}
if (process.env.UNI_PLATFORM === "mp-baidu") {}
```
