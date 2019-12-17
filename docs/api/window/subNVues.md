subNvue，是 vue 页面的原生子窗体，把weex渲染的原生界面当做 vue 页面的子窗体覆盖在页面上。它不是全屏页面，它给App平台vue页面中的层级覆盖和原生界面自定义提供了更强大和灵活的解决方案。它也不是组件，就是一个原生子窗体。

它的设计背景和用途详见：[subNVue 原生子窗体开发指南](https://ask.dcloud.net.cn/article/35948)

> subNvue 自1.9.10 起支持 ，仅支持 app 平台

### uni.getSubNVueById(subNvueId)@app-getsubnvuebyid

通过 `ID` 获取 `subNVues` 原生子窗体的实例。  [subNVues 配置](/collocation/pages?id=app-subNVues)

|参数	|类型	|说明				|
|---	|---	|---				|
|subNvueId |String	| 原生子窗体的 ID|

**代码示例**

```javascript
const subNVue = uni.getSubNVueById('popup');
```

#### 返回值
返回一个 [subNVue](/api/window/subNVues?id=subnvue) 对象


### uni.getCurrentSubNVue()@app-getCurrentSubNVue

在一个subnvue窗体的nvue页面代码中，获取当前 `subNVues` 原生子窗体的实例。

**代码示例（注意执行在nvue页面中）**

```javascript
const subNVue = uni.getCurrentSubNVue();
```

#### 返回值
返回一个 [subNVue](/api/window/subNVues?id=subnvue) 对象


#### subNVue 对象的方法列表@subNVue

|方法			|说明				|
|---			|---				|
|show			| 显示原生子窗体		|
|hide			| 隐藏原生子窗体		|
|setStyle		| 设置原生子窗体的样式	|


### subNVue.show (aniShow,duration,showedCB)
显示原生子窗体

|参数		|类型|默认值	|说明								|
|---		|---	|---		|---																|
|aniShow	|String| auto	|显示原生子窗体的动画效果 ，如果没有指定窗口动画类型，则使用默认值“auto”，即自动选择上一次显示窗口的动画效果，如果之前没有显示过，则使用“none”动画效果。[详见动画类型](/api/window/subNVues?id=动画类型)|
|duration	|Number| 600	|显示原生子窗体的动画持续时间，单位为ms，如果没有设置则使用默认窗口动画时间 600ms。|
|showedCB	|Function|		|显示完成的回调函数，当指定原生子窗体显示动画执行完毕时触发回调函数，窗口无动画效果（如"none"动画效果）时也会触发此回调。	|


**代码示例**

```javascript
subNVue.show('slide-in-left',200,()=>{
	console.log('subNVue 原生子窗体显示成功');
})
```


### subNVue.hide (aniShow,duration)
隐藏原生子窗体

|参数		|类型|默认值	|说明																																																												|
|---		|---|---	|---																		|
|aniShow	|String| auto	|隐藏原生子窗体的动画效果 ，如果没有指定窗口动画类型，则使用默认值“auto”，即自动选择上一次显示窗口的动画效果，如果之前没有显示过，则使用“none”动画效果。[详见动画类型](/api/window/subNVues?id=动画类型)|
|duration	|Number| 600	|隐藏原生子窗体的动画持续时间，单位为ms，如果没有设置则使用默认窗口动画时间 600ms。	|

**代码示例**

```javascript
subNVue.hide('slide-out-left',200);
```


### subNVue.setStyle (style)
设置原生子窗体的样式

|参数	|类型	|说明					|
|---	|---	|---					|
|style	|Object	| 原生子窗体的样式	|

**原生子窗体的样式**

|属性|类型|默认值|描述|
|:-|:-|:-|:-|
|position|String|absolute|原生子窗体的排版位置，排版位置决定原生子窗体在父窗口中的定位方式。 可取值："static"，原生子窗体在页面中正常定位，如果页面存在滚动条则随窗口内容滚动；"absolute"，原生子窗体在页面中绝对定位，如果页面存在滚动条不随窗口内容滚动；"dock"，原生子窗体在页面中停靠，停靠的位置由dock属性值决定。 默认值为"absolute"。|
|dock|String|bottom|原生子窗体的停靠方式,仅当原生子窗体 "position" 属性值设置为 "dock" 时才生效，可取值："top"，原生子窗体停靠则页面顶部；"bottom"，原生子窗体停靠在页面底部；"right"，原生子窗体停靠在页面右侧；"left"，原生子窗体停靠在页面左侧。 默认值为"bottom"。|
|mask|HexColor|rgba(0,0,0,0.5)|原生子窗体的遮罩层,仅当原生子窗体 "type" 属性值设置为 "popup" 时才生效，可取值： rgba格式字符串，定义纯色遮罩层样式，如"rgba(0,0,0,0.5)"，表示黑色半透明；|
|width|String|100%|原生子窗体的宽度,支持百分比、像素值，默认为100%。未设置width属性值时，可同时设置left和right属性值改变窗口的默认宽度。|
|height|String|100%|原生子窗体的高度,支持百分比、像素值，默认为100%。 当未设置height属性值时，优先通过top和bottom属性值来计算原生子窗体的高度。|
|top|String|0px|原生子窗体垂直向下的偏移量，支持百分比、像素值，默认值为0px。 未设置top属性值时，优先通过bottom和height属性值来计算原生子窗体的top位置。|
|bottom|String||原生子窗体垂直向上偏移量,支持百分比、像素值，默认值无值（根据top和height属性值来自动计算）。 当同时设置了top和height值时，忽略此属性值； 当未设置height值时，可通过top和bottom属性值来确定原生子窗体的高度。|
|left|String|0px|原生子窗体水平向左的偏移量，支持百分比、像素值，默认值为0px。 未设置left属性值时，优先通过right和width属性值来计算原生子窗体的left位置。|
|right|String||原生子窗体水平向右的偏移量，支持百分比、像素值，默认无值（根据left和width属性值来自动计算）。 当设置了left和width值时，忽略此属性值； 当未设置width值时，可通过left和bottom属性值来确定原生子窗体的宽度。|
|margin|String||原生子窗体的边距，用于定位原生子窗体的位置，支持auto，auto表示居中。若设置了left、right、top、bottom则对应的边距值失效。|
|zindex|Number||原生子窗体的窗口的堆叠顺序值，拥有更高堆叠顺序的窗口总是会处于堆叠顺序较低的窗口的前面，拥有相同堆叠顺序的窗口后调用show方法则在前面。|

**代码示例**

```javascript

subNVue.setStyle({
	"position": "absolute", //除 popup 外，其他值域参考 5+ webview position 文档
	"width": "50%",
	"height": "50%",
	"left":"20px",
	"top":"100px"
})
```


### subNVue.postMessage(OBJECT)
发送消息

**代码示例**

```javascript

const subNVue = uni.getSubNVueById('subNvue');
subNvue.postMessage({
	id:'1'
	name:'subNvues'
})
```

### subNVue.onMessage(CallBack)
监听消息

**代码示例**

```javascript

const subNVue = uni.getSubNVueById('subNvue');
subNvue.onMessage(function(data){
	console.log('监听来自所属页面的 message' + JSON.stringify(data));
})
```


### 动画类型
显示动画与关闭动画，会有默认的对应规则。但是如果通过 API 原生子窗体的关闭动画类型，则不会使用默认的类型。

|显示动画|关闭动画|显示动画描述（关闭动画与之相反）
|:-|:-|:-|
|slide-in-right|slide-out-right|新窗体从右侧进入|
|slide-in-left|slide-out-left|新窗体从左侧进入|
|slide-in-top|slide-out-top|新窗体从顶部进入|
|slide-in-bottom|slide-out-bottom|新窗体从底部进入|
|fade-in|fade-out|新窗体从透明到不透明逐渐显示|
|zoom-out|zoom-in|新窗体从小到大缩放显示|
|zoom-fade-out|zoom-fade-in|新窗体从小到大逐渐放大并且从透明到不透明逐渐显示|
|pop-in|pop-out|新窗体从左侧进入，且老窗体被挤压而出|
|none|none|无动画|

详细的窗口动画说明，请参考：

- 窗口显示的动画：[AnimationTypeShow](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.AnimationTypeShow)
- 窗口关闭的动画：[AnimationTypeClose](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.AnimationTypeClose)

**注意事项**
- 了解更多 `subNVue` 原生子窗体的用途，请详读[subNVues 原生子窗体开发指南](https://ask.dcloud.net.cn/article/35948)
- 在hello uni-app的接口-界面-原生子窗体中，有完整的subNVue示例，包括带渐变色的原生导航栏、可遮盖地图的侧滑菜单、可从顶部弹出的popup、可在视频上滚动的消息列表
- 每个 `subNVue` 页面都要在 pages.json 中注册。如果需要全局弹窗，也可以直接弹出nvue页面，参考这个[插件](https://ext.dcloud.net.cn/plugin?id=953)
- `subNVue` 比cover-view和plus.nativeObj.view更强大，也占用更多内存，为了保证更好的性能体验，一个vue页面不要加载太多 `subNVue` 子窗体，建议控制在三个以内
