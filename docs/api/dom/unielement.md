## UniElement

所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。

### UniElement 兼容性 <Help /> 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |




### UniElement 的属性值 @unielement-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| id | string | 是 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; iOS(Vapor) UTS 插件: x; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.0 | 只读属性，当前元素的标识符 |
| isConnected | boolean | 是 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; iOS(Vapor) UTS 插件: x; HarmonyOS: 4.61 | 只读属性，当前元素是否与 DOM 树连接 |
| attributes | Map\<string, any> | 是 | Web: 4.0; 微信小程序: x; Android(VDOM): 4.0; Android(Vapor): x; iOS(VDOM): 4.11; iOS(Vapor): x; iOS(VDOM) UTS 插件: 4.25; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): x | 只读属性，当前元素上所有属性元素的集合 |
| classList | Array&lt;string&gt; | 是 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: x; HarmonyOS: 4.61 | 只读属性，当前元素 class 属性的动态集合 |
| dataset | any | 是 | Web: 4.0; 微信小程序: 4.41 仅在event对象内的target上可用; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: x; HarmonyOS: 4.61 | 只读属性，当前元素上自定义数据属性（data-*）的集合 |
| children | Array&lt;[UniElement](/api/dom/unielement.md)&gt; | 是 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素包含的子元素的集合 |
| firstChild | [UniElement](/api/dom/unielement.md) | 否 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素的第一个子元素，如果元素是无子元素，则返回 null |
| lastChild | [UniElement](/api/dom/unielement.md) | 否 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素的最后一个子元素，如果没有子元素，则返回 null |
| parentElement | [UniElement](/api/dom/unielement.md) | 否 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素在 DOM 树中的父元素，如果没有父元素（如未添加到DOM树中），则返回null。 |
| nextElementSibling | [UniElement](/api/dom/unielement.md) | 否 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素在 DOM 树中紧跟在其后面的同级元素，如果当前元素为最后一个元素，则返回 null |
| offsetLeft | number | 是 | Web: 4.0; 微信小程序: 4.41 仅在event对象内的target上可用; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素左上角相对于其定位父元素内边框（Border内侧）左边缘的逻辑像素值 |
| offsetTop | number | 是 | Web: 4.0; 微信小程序: 4.41 仅在event对象内的target上可用; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素外边框左上角相对于其定位父元素内边框（Border内侧）顶部边缘的逻辑像素值 |
| offsetWidth | number | 是 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素的布局宽度逻辑像素值，包含border、padding区域 |
| offsetHeight | number | 是 | Web: 4.0; 微信小程序: x; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素的布局高度逻辑像素值，包含border、padding区域 |
| style | [CSSStyleDeclaration](/api/dom/cssstyledeclaration.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素的CSS样式对象 |
| scrollWidth | number | 是 | Web: 4.0; 微信小程序: 5.13; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素的可滚动内容总宽度，仅scroll-view、list-view等可滚动组件支持，其他组件返回视图宽度 |
| scrollHeight | number | 是 | Web: 4.0; 微信小程序: 5.13; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，当前元素可滚动内容的总高度，仅scroll-view、list-view等可滚动组件支持，其他组件返回视图高度 |
| scrollLeft | number | 是 | Web: 4.0; 微信小程序: 5.13; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 获取或修改当前元素横向滚动的逻辑像素值，仅scroll-view、list-view等可滚动组件支持，其他组件修改无效、获取时返回 0 |
| scrollTop | number | 是 | Web: 4.0; 微信小程序: 5.13; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 获取或修改当前元素竖向滚动逻辑像素值，仅scroll-view、list-view可滚动组件支持，其他组件修改无效、获取时返回 0 |
| tagName | string | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; iOS(VDOM) UTS 插件: 4.25; HarmonyOS: 4.61 | 只读属性，获取当前元素的标签名 |
| uniPage | [UniPage](/api/unipage.md) | 是 | Web: 4.0; 微信小程序: x; Android: 4.61; iOS: 4.61; iOS(VDOM) UTS 插件: x; HarmonyOS: 4.61 | 只读属性，当前元素所属的页面对象 |
| innerHTML | string | 是 | Web: x; 微信小程序: x; Android(VDOM): 4.84; Android(Vapor): x; iOS: x; HarmonyOS: x | 只读属性，当前元素内部所有子元素（不包括注释节点）的 HTML 内容 |


#### dataset@dataset

从 5.21 起全平台 dataset 调整为 UniDOMStringMap 类型。[详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#dataset)

#### style@style
- App端
获取的是元素对象计算后的CSS样式集合对象，包括通过样式选择器设置的CSS样式。

- Web端
获取的是元素对象style属性设置的CSS样式集合对象，不包括通过样式选择器设置的CSS样式。

- 小程序端
获取的是元素对象style属性设置的CSS样式集合对象（仅限通过 UniElement.style 的API设置的），不包括通过样式选择器设置的CSS样式，也不包含在模板上绑定的style属性。

### UniElement 的方法 @unielement-methods

#### appendChild(aChild: UniElement): void @appendchild

将一个元素添加到指定父元素的子元素列表的末尾处。如果将被插入的元素已经存在于当前文档的文档树中，那么将会它从原先的位置移动到新的位置。

##### appendChild 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| aChild | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 插入子元素对象 | 






#### insertBefore(newChild: UniElement, refChild?: UniElement): UniElement \| null @insertbefore

在参考元素之前插入一个拥有指定父元素的子元素。如果给定的子元素是对文档中现有元素的引用，insertBefore() 会将其从当前位置移动到新位置。

##### insertBefore 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| newChild | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 插入子元素对象 |
| refChild | [UniElement](/api/dom/unielement.md) | 否 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 已存在父元素的子元素对象 | 


##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 




#### insertBefore(newChild: UniElement): UniElement \| null @insertbefore

将一个元素添加到指定父元素的子元素列表的末尾处 功能等同于appendChild

##### insertBefore 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 4.11 | x | 4.25 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| newChild | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 插入子元素对象 | 


##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 




#### setAttribute(key: string, value: string): void @setattribute

设置指定元素上的某个属性值。如果设置的属性已经存在，则更新该属性值；否则使用指定的名称和值添加一个新的属性。

##### setAttribute 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


**注意**
- setAttribute从HBuilderX 3.93起，调整为只能保存string类型属性值，需要保存其它类型数据请使用dataset属性。
- 为保证多端一致setAttribute不推荐用于修改本文档中的UniElement属性，如有此类需求应使用element.xxx设置，如element.scrollTop。其余绑定到内置组件的属性也尽量使用数据驱动而不是绕过vue去设置。

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| key | string | 是 | 微信小程序: x | 属性名称 |
| value | string | 是 | 微信小程序: x | 属性值域 | 




**App平台**
app平台 setAttribute 不支持设置 class、style 属性，设置了也不会生效，class 属性需在 uvue/vue 页面中设置，style 信息可以通过 [style](#style) 属性设置。



#### setAnyAttribute(key: string, value: any): void @setanyattribute

设置指定元素上的某个属性值。功能等同setAttribute value支持任意类型

##### setAnyAttribute 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| x | x | 4.0 | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| key | string | 是 | Web: x; 微信小程序: x | 属性名称 |
| value | any | 是 | Web: x; 微信小程序: x | 属性值域 | 






#### getAttribute(key: string): string \| null @getattribute

获取元素指定的属性值，如果指定的属性不存在则返回null。

##### getAttribute 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.0 | 5.23 | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


**注意**
- getAttribute返回值从HBuilderX 3.93起，调整为string类型，不要使用此方法获取非string类型的属性值。如有非string需求，请使用对象的点操作符直接访问dateset属性，不通过getAttribute方法。
- 为保证多端一致getAttribute不应用于获取本文档中的UniElement属性，如有此类需求应使用element.xxx获取，如element.scrollTop。

##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| key | string | 是 | 属性名称 | 


##### 返回值 

| 类型 | 必备 |
| :- | :- |
| string | 否 |
 


**App平台**
app平台 getAttribute 不支持获取 class、style 属性， uvue/vue 页面中设置的 class 属性暂不支持通过 UniElement 对象获取，style 信息可以通过 [style](#style) 属性获取。

##### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/element-get-attribute/element-get-attribute.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/element-get-attribute/element-get-attribute.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/element-get-attribute/element-get-attribute

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/element-get-attribute/element-get-attribute

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view style="padding: 15px;">
      <page-intro content="本页演示元素属性与样式读写：getAttribute 获取元素 id（小程序端支持 style）、getPropertyValue 获取样式值（如背景色）、setProperty 设置样式；含自定义组件子元素的 getBoundingClientRectAsync、scroll-view 的 scrollTo、以及获取 scale 变换后 view 的尺寸信息。"></page-intro>
      <view id="box" ref="boxRef">
        <text class="uni-title-text">元素的id：{{ data.attrId }}</text>
        <!-- #ifndef APP -->
        <text class="uni-title-text">元素的style：{{ data.attrStyle }}</text>
        <!-- #endif -->
        <text class="uni-title-text">元素的背景色样式值：{{ data.propertyValue }}</text>
        <text class="uni-subtitle-text">小程序端：getAttribute 获取元素的属性值，目前仅支持id、style</text>
        <text class="uni-subtitle-text">App端：getAttribute 不支持获取 class、style 属性</text>
      </view>
      <button @click="getAttributeId">getAttribute获取元素的id</button>
      <button @click="setStyle">setProperty设置背景色</button>
      <!-- #ifndef APP -->
      <button @click="getAttributeStyle">getAttribute获取元素的style</button>
      <!-- #endif -->
      <button @click="getPropertyValue">getPropertyValue获取背景色值</button>

      <child id="child" ref="childRef"></child>
      <button @click="getBoundingClientRectAsyncChild">获取自定义组件child元素信息</button>
      <view class="rect-info" v-if="data.rectInfo">
        <view class="node-info-item">
          <text class="node-info-item-k">x: </text>
          <text class="node-info-item-v">{{data.rectInfo.x}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">y: </text>
          <text class="node-info-item-v">{{data.rectInfo.y}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">width: </text>
          <text class="node-info-item-v">{{data.rectInfo.width}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">height: </text>
          <text class="node-info-item-v">{{data.rectInfo.height}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">left: </text>
          <text class="node-info-item-v">{{data.rectInfo.left}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">top: </text>
          <text class="node-info-item-v">{{data.rectInfo.top}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">right: </text>
          <text class="node-info-item-v">{{data.rectInfo.right}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">bottom: </text>
          <text class="node-info-item-v">{{data.rectInfo.bottom}}</text>
        </view>
      </view>
      <scroll-view ref="scrollViewRef" class="scroll-view_H" direction="horizontal">
        <view class="scroll-view-item_H uni-bg-red"><text class="text">A</text></view>
        <view class="scroll-view-item_H uni-bg-green"><text class="text">B</text></view>
        <view class="scroll-view-item_H uni-bg-blue"><text class="text">C</text></view>
      </scroll-view>
      <!-- #ifndef WEB -->
      <button @click="scrollTo">scrollTo设置left滚动200px</button>
      <!-- #endif -->
      <button style="margin-top: 8px" @click="getUniElementScrollOffset">打印 scroll-view 滚动属性</button>

      <view id="scaledView" style="transform: scale(2);background-color: green;width: 50px;height: 50px;margin-top: 45px;margin-left: 25px;"></view>

      <button type="default" @click="handleGetScaledViewSize" style="margin-top: 30px;">获取scale后的view尺寸信息</button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">

  import child from './child.uvue'

  type DomRectType = {
    x : number,
    y : number,
    left : number,
    top : number,
    right : number,
    bottom : number,
    width : number,
    height : number,
  }

  type DataType = {
    attrId: string,
    attrStyle: string,
    propertyValue: string,
    rectInfo: DomRectType,
    scaledViewWidth: number,
    scaledViewHeight: number
  }

  type ScrollOffset = {
    scrollTop: number,
    scrollHeight: number,
    scrollWidth: number,
    scrollLeft: number,
    width: number
  }

  const boxRef = ref<UniElement | null>(null)
  const scrollViewRef = ref<UniScrollViewElement | null>(null)
  const data = reactive({
    attrId: "",
    attrStyle: "",
    propertyValue: "",
    rectInfo: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    scaledViewWidth: 0,
    scaledViewHeight: 0
  } as DataType)
  const scrollOffset = reactive<ScrollOffset>({
    scrollTop: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    scrollLeft: 0,
    width: 0
  })

  function getBoundingClientRectAsyncChild(){
    const childEl = uni.getElementById('child')!
    childEl.getBoundingClientRectAsync()!.then((rect : DOMRect) => {
      console.log('rect: ',rect);
      data.rectInfo = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      } as DomRectType
    })
  }

  function getAttributeId() {
    if (boxRef.value != null) {
      data.attrId = boxRef.value!.getAttribute('id') ?? ""
    }
  }

  function setStyle() {
    if (boxRef.value != null) {
      boxRef.value!.style.setProperty("background-color", "#FFF000")
    }
  }

  function getPropertyValue() {
    if (boxRef.value != null) {
      data.propertyValue = boxRef.value!.style.getPropertyValue("background-color")
    }
  }

  function getAttributeStyle() {
    if (boxRef.value != null) {
      data.attrStyle = boxRef.value!.getAttribute('style')?? ""
    }
  }

  function scrollTo() {
    if (scrollViewRef.value != null) {
      // #ifdef MP-WEIXIN
      scrollViewRef.value!.scrollTo({
        left: 200
      })
      // #endif
      // #ifndef MP-WEIXIN
      scrollViewRef.value!.scrollTo(200,0)
      // #endif
    }
  }

  function getUniElementScrollOffset() {
    if (scrollViewRef.value != null) {
      const scrollView = scrollViewRef.value!
      console.log("scrollTop: ", scrollView.scrollTop)
      console.log("scrollHeight: ", scrollView.scrollHeight)
      console.log("scrollWidth: ", scrollView.scrollWidth)
      console.log("scrollLeft: ", scrollView.scrollLeft)
      const screenWidth = uni.getWindowInfo().screenWidth
      scrollOffset.width = (screenWidth - 30) * 3
      scrollOffset.scrollTop = scrollView.scrollTop
      scrollOffset.scrollHeight = scrollView.scrollHeight
      scrollOffset.scrollWidth = scrollView.scrollWidth
      scrollOffset.scrollLeft = scrollView.scrollLeft
    }
  }

  //scrollView元素获取class中的margin-top属性值 仅自动化测试使用
  function getScrollViewStyleMarginTop() : string {
    if (scrollViewRef.value != null) {
      return scrollViewRef.value.style.getPropertyValue("margin-top")
    }
    return ""
  }

  const handleGetScaledViewSize = () => {
    const element = uni.getElementById("scaledView")
    if (element != null) {
      const rect = element.getBoundingClientRect()
      data.scaledViewWidth = rect.width
      data.scaledViewHeight = rect.height
      console.log("scaledView size : ", data.scaledViewWidth, data.scaledViewHeight);
    }
  }

  onReady(() => {
    // Refs are already assigned via template
  })

  defineExpose({
    data,
    scrollOffset,
    getAttributeId,
    setStyle,
    getAttributeStyle,
    getPropertyValue,
    getBoundingClientRectAsyncChild,
    scrollTo,
    handleGetScaledViewSize,
    getScrollViewStyleMarginTop
  })

</script>
<style>
  .scroll-view_H {
    width: 100%;
    flex-direction: row;
    margin-top:15px;
  }
  .scroll-view-item_H {
    width: 100%;
    height: 150px;
    justify-content: center;
    align-items: center;
  }
  .text {
    font-size: 18px;
    color: #ffffff;
  }

  .rect-info {
    margin-top: 15px;
    padding: 10px;
    flex-direction: column;
  }

  .node-info-item {
    flex-direction: row;
  }

  .node-info-item-k {
    width: 72px;
    line-height: 2;
  }

  .node-info-item-v {
    font-weight: bold;
    line-height: 2;
  }
</style>

```

:::



#### getAnyAttribute(key: string): any \| null @getanyattribute

返回元素上一个指定的属性值。如果指定的属性不存在，则返回 null

##### getAnyAttribute 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| x | x | 4.0 | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| key | string | 是 | Web: x; 微信小程序: x | 属性名称 | 


##### 返回值 

| 类型 | 必备 |
| :- | :- |
| any | 否 |
 




#### hasAttribute(key: string): boolean @hasattribute

返回该元素是否包含有指定的属性，属性存在则返回true，否则返回false。

##### hasAttribute 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| key | string | 是 | 微信小程序: x | 属性名称 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 




#### removeAttribute(key: string): void @removeattribute

从元素中删除一个属性，如果指定的属性不存在，则不做任何操作，也不会产生错误。

##### removeAttribute 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 4.11 | 5.21 | 4.25 | 4.61 | 5.21 | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| key | string | 是 | 微信小程序: x | 属性名称 | 






#### getAndroidView(): View \| null @getandroidview

获取元素android原生view 可能返回null

##### getAndroidView 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android UTS 插件 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | 4.25 | x | 5.23 | x | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| View | 否 |
 




**getAndroidView获取原生View：**

```uts
//通过组件定义的id属性值，获取到UniElement对象
const element = uni.getElementById(id)
//getAndroidView不设置泛型，获取到安卓View
if(element != null) {
	const view = element.getAndroidView()
}
```

更多示例请参考 uts 插件 [uts-get-native-view](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/uni_modules/uts-get-native-view/utssdk/app-android/index.uts)

**注意事项：**

+ 安卓蒸汽模式目前页面运行在js环境中，无法直接获取原生view类型，需要在uts插件中执行getAndroidView。
+ 安卓平台页面渲染时元素才会构建View，所以元素刚创建就获取View大概率是null，推荐页面onReady时获取。
+ 安卓平台获取的原生View尽可能的避免设置View的background属性，会导致元素background、border、boxshadow css效果失效或设置的background不生效，与设置background时机有关。

#### getAndroidView\<T>(): T \| null @getandroidview

获取元素android原生view 通过泛型定义view类型 可能返回null

##### getAndroidView 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(Vapor) UTS 插件 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | 4.25 | x | 5.21 | x | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| T | 否 |
 




**getAndroidView通过泛型定义获取原生View：**

```uts
//导入安卓原生WebView对象
import WebView from "android.webkit.WebView"

//通过web-view组件定义的id属性值，获取web-view标签的UniElement对象
const webViewElement = uni.getElementById(id)
//getAndroidView设置泛型为安卓底层WebView对象, 直接获取WebView 如果泛型不匹配会返回null
if(webViewElement != null) {
	const webview = webViewElement.getAndroidView<WebView>()
}
```

获取到原生的WebView对象后，可以直接使用其所有属性和方法。原生对象的方法非常多，远多于 uni-app x 封装的API。这些方法都可以直接调用了。

在 hello uni-app x 的 组件 -> web-view 示例中，获取原生WebView对象，然后进一步使用了可否前进后退的方法。
- [Android](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/uni_modules/uts-get-native-view/utssdk/app-android/index.uts)
- [iOS](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/uni_modules/uts-get-native-view/utssdk/app-ios/index.uts)

**可通过getAndroidView泛型明确定义View类型的组件：**

| 组件      | 对应 android 平台原生View         |
| --------- | -------------------------------- |
| [view](https://doc.dcloud.net.cn/uni-app-x/component/view.html) | [ViewGroup](https://developer.android.google.cn/reference/android/view/ViewGroup) |
| [input](https://doc.dcloud.net.cn/uni-app-x/component/input.html) | [AppCompatEditText](https://developer.android.google.cn/reference/kotlin/androidx/appcompat/widget/AppCompatEditText) |
| [textarea](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) | [AppCompatEditText](https://developer.android.google.cn/reference/kotlin/androidx/appcompat/widget/AppCompatEditText) |
| [web-view](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) | [WebView](https://developer.android.google.cn/reference/android/webkit/WebView) |

#### getAndroidActivity(): Activity \| null @getandroidactivity

获取元素android原生activity 可能返回null

##### getAndroidActivity 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android UTS 插件 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | 4.25 | x | 5.23 | x | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| Activity | 否 |
 




#### getBoundingClientRect(): DOMRect @getboundingclientrect

获取元素的大小及其相对于窗口的位置信息。

##### getBoundingClientRect 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.61 | 5.23 | 5.23 |




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [DOMRect](/api/dom/domrect.md) | 一个 DOMRect 代表一个矩形。 |
 




#### getBoundingClientRectAsync(options?: GetBoundingClientRectAsyncOptions): Promise\<DOMRect> \| null @getboundingclientrectasync

获取元素的大小及其相对于窗口的位置信息 异步。

##### getBoundingClientRectAsync 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | Android(Vapor) UTS 插件 | iOS | iOS UTS 插件 | HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.41 | 4.41 | 4.41 | 5.23 | x | 4.41 | x | 4.61 | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **GetBoundingClientRectAsyncOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (rect: [DOMRect](/api/dom/domrect.md)) => void | 否 |
| fail | () => void | 否 |
| complete | (rect?: any) => void | 否 | 


##### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<DOMRect> | 否 |
 


##### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/element-get-bounding-client-rect-async/element-get-bounding-client-rect-async.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/element-get-bounding-client-rect-async/element-get-bounding-client-rect-async.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/element-get-bounding-client-rect-async/element-get-bounding-client-rect-async

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/element-get-bounding-client-rect-async/element-get-bounding-client-rect-async

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view class="page" id="page">
      <page-head :title="title"></page-head>
      <page-intro content="本页演示元素获取布局矩形：getBoundingClientRectAsync 异步接口与 getBoundingClientRect 同步方法，返回 x、y、width、height、left、top、right、bottom；对 view、text、image、scroll-view 等组件分别测试，并含拍平（flatten）对比，以及 box-shadow 导致尺寸变大的现象演示。"></page-intro>
      <button class="uni-common-mt" @click="getBoundingClientRectAsync">getBoundingClientRectAsync</button>
      <view id="rect-test" ref="rectTest" class="rect-test"></view>
      <view class="rect-info" v-if="data.rectInfo != null">
        <view class="node-info-item">
          <text class="node-info-item-k">x: </text>
          <text class="node-info-item-v">{{data.rectInfo!.x}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">y: </text>
          <text class="node-info-item-v">{{data.rectInfo!.y}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">width: </text>
          <text class="node-info-item-v">{{data.rectInfo!.width}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">height: </text>
          <text class="node-info-item-v">{{data.rectInfo!.height}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">left: </text>
          <text class="node-info-item-v">{{data.rectInfo!.left}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">top: </text>
          <text class="node-info-item-v">{{data.rectInfo!.top}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">right: </text>
          <text class="node-info-item-v">{{data.rectInfo!.right}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">bottom: </text>
          <text class="node-info-item-v">{{data.rectInfo!.bottom}}</text>
        </view>
      </view>

      <!-- 新增 getBoundingClientRect 同步方法测试 -->
      <view class="section-divider"></view>
      <text class="section-title">getBoundingClientRect 方法测试</text>

      <!-- View 元素测试 -->
      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" type="default" @click="getViewRect">View</button>
          <button class="btn-small" @click="getViewRectFlat">View(拍平测试)</button>
        </view>
        <view class="test-elements">
          <view id="rect-test-view" class="rect-test-small"></view>
          <view id="rect-test-view-flat" class="rect-test-small" flatten></view>
        </view>
      </view>
      <view class="rect-row"  v-if="syncData.viewRectInfo != null || syncData.viewRectInfoFlat != null">
        <view class="rect-data-col" v-if="syncData.viewRectInfo != null">
          <text class="rect-data-item">x: {{syncData.viewRectInfo!.x}}</text>
          <text class="rect-data-item">y: {{syncData.viewRectInfo!.y}}</text>
          <text class="rect-data-item">width: {{syncData.viewRectInfo!.width}}</text>
          <text class="rect-data-item">height: {{syncData.viewRectInfo!.height}}</text>
          <text class="rect-data-item">left: {{syncData.viewRectInfo!.left}}</text>
          <text class="rect-data-item">top: {{syncData.viewRectInfo!.top}}</text>
          <text class="rect-data-item">right: {{syncData.viewRectInfo!.right}}</text>
          <text class="rect-data-item">bottom: {{syncData.viewRectInfo!.bottom}}</text>
        </view>
        <view class="rect-data-col" v-if="syncData.viewRectInfoFlat != null">
          <text class="rect-data-item">x: {{syncData.viewRectInfoFlat!.x}}</text>
          <text class="rect-data-item">y: {{syncData.viewRectInfoFlat!.y}}</text>
          <text class="rect-data-item">width: {{syncData.viewRectInfoFlat!.width}}</text>
          <text class="rect-data-item">height: {{syncData.viewRectInfoFlat!.height}}</text>
          <text class="rect-data-item">left: {{syncData.viewRectInfoFlat!.left}}</text>
          <text class="rect-data-item">top: {{syncData.viewRectInfoFlat!.top}}</text>
          <text class="rect-data-item">right: {{syncData.viewRectInfoFlat!.right}}</text>
          <text class="rect-data-item">bottom: {{syncData.viewRectInfoFlat!.bottom}}</text>
        </view>
      </view>

      <!-- Text 元素测试 -->
      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" @click="getTextRect">Text</button>
          <button class="btn-small" @click="getTextRectFlat">Text(拍平测试)</button>
        </view>
        <view class="test-elements">
          <text id="rect-test-text" class="rect-test-text-small">测试文本</text>
          <text id="rect-test-text-flat" class="rect-test-text-small" flatten>测试文本拍平</text>
        </view>
      </view>
      <view class="rect-row" v-if="syncData.textRectInfo != null || syncData.textRectInfoFlat != null">
        <view class="rect-data-col" v-if="syncData.textRectInfo != null">
          <text class="rect-data-item">x: {{syncData.textRectInfo!.x}}</text>
          <text class="rect-data-item">y: {{syncData.textRectInfo!.y}}</text>
          <text class="rect-data-item">width: {{syncData.textRectInfo!.width}}</text>
          <text class="rect-data-item">height: {{syncData.textRectInfo!.height}}</text>
          <text class="rect-data-item">left: {{syncData.textRectInfo!.left}}</text>
          <text class="rect-data-item">top: {{syncData.textRectInfo!.top}}</text>
          <text class="rect-data-item">right: {{syncData.textRectInfo!.right}}</text>
          <text class="rect-data-item">bottom: {{syncData.textRectInfo!.bottom}}</text>
        </view>
        <view class="rect-data-col" v-if="syncData.textRectInfoFlat != null">
          <text class="rect-data-item">x: {{syncData.textRectInfoFlat!.x}}</text>
          <text class="rect-data-item">y: {{syncData.textRectInfoFlat!.y}}</text>
          <text class="rect-data-item">width: {{syncData.textRectInfoFlat!.width}}</text>
          <text class="rect-data-item">height: {{syncData.textRectInfoFlat!.height}}</text>
          <text class="rect-data-item">left: {{syncData.textRectInfoFlat!.left}}</text>
          <text class="rect-data-item">top: {{syncData.textRectInfoFlat!.top}}</text>
          <text class="rect-data-item">right: {{syncData.textRectInfoFlat!.right}}</text>
          <text class="rect-data-item">bottom: {{syncData.textRectInfoFlat!.bottom}}</text>
        </view>
      </view>

      <!-- Image 元素测试 -->
      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" @click="getImageRect">Image</button>
          <button class="btn-small" @click="getImageRectFlat">Image(拍平测试)</button>
        </view>
        <view class="test-elements">
          <image id="rect-test-image" class="rect-test-image-small" src="/static/test-image/logo.png" mode="aspectFit"></image>
          <image id="rect-test-image-flat" class="rect-test-image-small" src="/static/test-image/logo.png" mode="aspectFit" flatten></image>
        </view>
      </view>
      <view class="rect-row" v-if="syncData.imageRectInfo != null || syncData.imageRectInfoFlat != null" >
        <view class="rect-data-col" v-if="syncData.imageRectInfo != null">
          <text class="rect-data-item">x: {{syncData.imageRectInfo!.x}}</text>
          <text class="rect-data-item">y: {{syncData.imageRectInfo!.y}}</text>
          <text class="rect-data-item">width: {{syncData.imageRectInfo!.width}}</text>
          <text class="rect-data-item">height: {{syncData.imageRectInfo!.height}}</text>
          <text class="rect-data-item">left: {{syncData.imageRectInfo!.left}}</text>
          <text class="rect-data-item">top: {{syncData.imageRectInfo!.top}}</text>
          <text class="rect-data-item">right: {{syncData.imageRectInfo!.right}}</text>
          <text class="rect-data-item">bottom: {{syncData.imageRectInfo!.bottom}}</text>
        </view>
        <view class="rect-data-col" v-if="syncData.imageRectInfoFlat != null">
          <text class="rect-data-item">x: {{syncData.imageRectInfoFlat!.x}}</text>
          <text class="rect-data-item">y: {{syncData.imageRectInfoFlat!.y}}</text>
          <text class="rect-data-item">width: {{syncData.imageRectInfoFlat!.width}}</text>
          <text class="rect-data-item">height: {{syncData.imageRectInfoFlat!.height}}</text>
          <text class="rect-data-item">left: {{syncData.imageRectInfoFlat!.left}}</text>
          <text class="rect-data-item">top: {{syncData.imageRectInfoFlat!.top}}</text>
          <text class="rect-data-item">right: {{syncData.imageRectInfoFlat!.right}}</text>
          <text class="rect-data-item">bottom: {{syncData.imageRectInfoFlat!.bottom}}</text>
        </view>
      </view>

      <!-- ScrollView 元素测试 -->
      <button class="uni-common-mt" @click="getScrollViewRect">getBoundingClientRect - ScrollView</button>
      <scroll-view id="rect-test-scrollview" class="rect-test-scrollview">
        <view class="scroll-content">
          <text class="scroll-text">滚动区域内容1</text>
        </view>
        <view class="scroll-content">
          <text class="scroll-text">滚动区域内容2</text>
        </view>
        <view class="scroll-content">
          <text class="scroll-text">滚动区域内容2</text>
        </view>
      </scroll-view>
      <view class="rect-info" v-if="syncData.scrollViewRectInfo != null">
        <view class="node-info-item">
          <text class="node-info-item-k">x: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.x}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">y: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.y}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">width: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.width}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">height: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.height}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">left: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.left}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">top: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.top}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">right: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.right}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">bottom: </text>
          <text class="node-info-item-v">{{syncData.scrollViewRectInfo!.bottom}}</text>
        </view>
      </view>

      <!-- 自定义组件测试 -->
      <button class="uni-common-mt" @click="getCustomComponentRect">getBoundingClientRect - 自定义组件</button>
      <child id="rect-test-component" class="uni-common-mt"></child>
      <view class="rect-info" v-if="syncData.customComponentRectInfo != null">
        <view class="node-info-item">
          <text class="node-info-item-k">x: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.x}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">y: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.y}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">width: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.width}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">height: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.height}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">left: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.left}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">top: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.top}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">right: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.right}}</text>
        </view>
        <view class="node-info-item">
          <text class="node-info-item-k">bottom: </text>
          <text class="node-info-item-v">{{syncData.customComponentRectInfo!.bottom}}</text>
        </view>
      </view>

      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" @click="getShadowBaseRect">View(无阴影)</button>
          <button class="btn-small" @click="getShadowBugRect">View(box-shadow)</button>
        </view>
        <text class="test-tip">两个元素样式尺寸一致，右侧仅增加 box-shadow，用于演示获取到的宽高可能变大。</text>
        <view class="test-elements">
          <view id="rect-test-shadow-base" class="shadow-demo-box"></view>
          <view id="rect-test-shadow-bug" class="shadow-demo-box shadow-demo-box-bug"></view>
        </view>
      </view>
      <view class="rect-row" v-if="syncData.shadowBaseRectInfo != null || syncData.shadowBugRectInfo != null">
        <view class="rect-data-col" v-if="syncData.shadowBaseRectInfo != null">
          <text class="rect-data-item">无阴影 x: {{syncData.shadowBaseRectInfo!.x}}</text>
          <text class="rect-data-item">无阴影 y: {{syncData.shadowBaseRectInfo!.y}}</text>
          <text class="rect-data-item">无阴影 width: {{syncData.shadowBaseRectInfo!.width}}</text>
          <text class="rect-data-item">无阴影 height: {{syncData.shadowBaseRectInfo!.height}}</text>
          <text class="rect-data-item">无阴影 left: {{syncData.shadowBaseRectInfo!.left}}</text>
          <text class="rect-data-item">无阴影 top: {{syncData.shadowBaseRectInfo!.top}}</text>
          <text class="rect-data-item">无阴影 right: {{syncData.shadowBaseRectInfo!.right}}</text>
          <text class="rect-data-item">无阴影 bottom: {{syncData.shadowBaseRectInfo!.bottom}}</text>
        </view>
        <view class="rect-data-col" v-if="syncData.shadowBugRectInfo != null">
          <text class="rect-data-item">阴影 x: {{syncData.shadowBugRectInfo!.x}}</text>
          <text class="rect-data-item">阴影 y: {{syncData.shadowBugRectInfo!.y}}</text>
          <text class="rect-data-item">阴影 width: {{syncData.shadowBugRectInfo!.width}}</text>
          <text class="rect-data-item">阴影 height: {{syncData.shadowBugRectInfo!.height}}</text>
          <text class="rect-data-item">阴影 left: {{syncData.shadowBugRectInfo!.left}}</text>
          <text class="rect-data-item">阴影 top: {{syncData.shadowBugRectInfo!.top}}</text>
          <text class="rect-data-item">阴影 right: {{syncData.shadowBugRectInfo!.right}}</text>
          <text class="rect-data-item">阴影 bottom: {{syncData.shadowBugRectInfo!.bottom}}</text>
        </view>
      </view>

   </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import Child from './child.uvue'

  type DomRectType = {
    x : number,
    y : number,
    left : number,
    top : number,
    right : number,
    bottom : number,
    width : number,
    height : number,
  }

  type DataType = {
    rectInfo: DomRectType,
  }

  type SyncDataType = {
    viewRectInfo: DomRectType | null,
    textRectInfo: DomRectType | null,
    imageRectInfo: DomRectType | null,
    shadowBaseRectInfo: DomRectType | null,
    shadowBugRectInfo: DomRectType | null,
    viewRectInfoFlat: DomRectType | null,
    textRectInfoFlat: DomRectType | null,
    imageRectInfoFlat: DomRectType | null,
    scrollViewRectInfo: DomRectType | null,
    customComponentRectInfo: DomRectType | null,
  }

  function createEmptyRectInfo(): DomRectType {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }
  }

  function createRectInfo(rect : DOMRect): DomRectType {
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
    }
  }

  const title = ref('getBoundingClientRectAsync')
  const rectTest = ref<UniElement | null>(null)

  const data = reactive<DataType>({
    rectInfo: createEmptyRectInfo(),
  })

  const syncData = reactive<SyncDataType>({
    viewRectInfo: null,
    textRectInfo: null,
    imageRectInfo: null,
    shadowBaseRectInfo: null,
    shadowBugRectInfo: null,
    viewRectInfoFlat: null,
    textRectInfoFlat: null,
    imageRectInfoFlat: null,
    scrollViewRectInfo: null,
    customComponentRectInfo: null,
  })

  function getBoundingClientRectAsync() {
    if (rectTest.value != null) {
      rectTest.value!.getBoundingClientRectAsync()!.then((rect : DOMRect) => {
        data.rectInfo = createRectInfo(rect)
      })
    }
  }

  // 通用方法：获取元素的位置信息
  function getRectInfo(elementId: string, dataKey: keyof SyncDataType) {
    const element = uni.getElementById(elementId)!
    const rect = element.getBoundingClientRect()
    syncData[dataKey] = createRectInfo(rect)
  }

  function getViewRect() {
    getRectInfo('rect-test-view', 'viewRectInfo')
  }

  function getTextRect() {
    getRectInfo('rect-test-text', 'textRectInfo')
  }

  function getImageRect() {
    getRectInfo('rect-test-image', 'imageRectInfo')
  }

  function getShadowBaseRect() {
    getRectInfo('rect-test-shadow-base', 'shadowBaseRectInfo')
  }

  function getShadowBugRect() {
    getRectInfo('rect-test-shadow-bug', 'shadowBugRectInfo')
  }

  function getViewRectFlat() {
    getRectInfo('rect-test-view-flat', 'viewRectInfoFlat')
  }

  function getTextRectFlat() {
    getRectInfo('rect-test-text-flat', 'textRectInfoFlat')
  }

  function getImageRectFlat() {
    getRectInfo('rect-test-image-flat', 'imageRectInfoFlat')
  }

  function getScrollViewRect() {
    getRectInfo('rect-test-scrollview', 'scrollViewRectInfo')
  }

  function getCustomComponentRect() {
    getRectInfo('rect-test-component', 'customComponentRectInfo')
  }

  defineExpose({
    data,
    syncData,
    getBoundingClientRectAsync,
    getViewRect,
    getTextRect,
    getImageRect,
    getShadowBaseRect,
    getShadowBugRect,
    getViewRectFlat,
    getTextRectFlat,
    getImageRectFlat,
    getScrollViewRect,
    getCustomComponentRect
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .rect-test {
    margin-top: 15px;
    height: 100px;
    background-color: dodgerblue;
  }

  .rect-info {
    margin-top: 15px;
    flex-direction: column;
  }

  .node-info-item {
    flex-direction: row;
  }

  .node-info-item-k {
    width: 72px;
    line-height: 2;
  }

  .node-info-item-v {
    font-weight: bold;
    line-height: 2;
  }

  .section-divider {
    margin-top: 30px;
    height: 1px;
    background-color: #e0e0e0;
  }

  .section-title {
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  .test-group {
    margin-top: 20px;
    flex-direction: column;
  }

  .test-buttons {
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
  }

  .btn-small {
    padding: 5px 15px;
    font-size: 13px;
    border-radius: 4px;
    flex: 1;
    margin: 0 5px;
  }

  .test-tip {
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 18px;
    color: #909399;
  }

  .test-elements {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    padding: 14px 0;
  }

  .rect-test-small {
    width: 45%;
    height: 60px;
    background-color: dodgerblue;
  }

  .rect-test-text-small {
    width: 45%;
    padding: 8px;
    font-size: 14px;
    color: #fff;
    background-color: #ff6b6b;
  }

  .rect-test-image-small {
    width: 45%;
    height: 60px;
    background-color: #f0f0f0;
  }

  .shadow-demo-box {
    width: 45%;
    height: 60px;
    background-color: #67c23a;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: #4f9a2a;
  }

  .shadow-demo-box-bug {
    box-shadow: 0px 0px 24px 12px rgba(0, 0, 0, 0.35);
  }

  .rect-row {
    flex-direction: row;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e4e7ed;
  }

  .rect-data-col {
    flex: 1;
    flex-direction: column;
    margin: 0 5px;
  }

  .rect-data-item {
    font-size: 12px;
    line-height: 1.8;
    color: #606266;
  }

  .rect-test-scrollview {
    margin-top: 15px;
    height: 120px;
    border: 1px solid #dcdfe6;
    background-color: #f5f7fa;
  }

  .scroll-content {
    height: 120px;
    padding: 10px;
    border: 1px solid #37b4ea;
    justify-content: center;
    align-items: center;
  }

  .scroll-text {
    line-height: 30px;
    font-size: 14px;
    color: #606266;
  }

</style>

```

:::



#### getDrawableContext(): DrawableContext \| null @getdrawablecontext

获取组件的绘制对象，仅uvue页面中的 view 组件支持，其它组件不支持则返回null。

##### getDrawableContext 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | x | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [DrawableContext](/api/dom/drawablecontext.md) | 否 |
 




#### getIOSView(): UIView \| null @getiosview

获取元素ios原生view

##### getIOSView 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | iOS UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | x | 4.25 | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| UIView | 否 |
 




**getIOSView 获取原生 View：**

```uts
//通过 webViewElementId 获取 web-view 标签的 UniElement 对象
const webViewElement = uni.getElementById(webViewElementId)
//获取原生 view
const view = webViewElement?.getIOSView();
//判断 view 是否存在，类型是否为 WKWebView
if (view != null && view instanceof WKWebView) {
    //将 view 转换为 WKWebView 类型
    const webView = view! as WKWebView;
}
```

获取到原生的WebView对象后，可以直接使用其所有属性和方法。原生对象的方法非常多，远多于 uni-app x 封装的API。这些方法都可以直接调用了。

在 hello uni-app x 的 组件 -> web-view 示例中，获取原生WebView对象，然后进一步使用了可否前进后退的方法。
- [Android](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/uni_modules/uts-get-native-view/utssdk/app-android/index.uts)
- [iOS](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/uni_modules/uts-get-native-view/utssdk/app-ios/index.uts)


**组件对应原生 View 类型：**

| 组件      | 对应 iOS 平台原生 View         |
| --------- | -------------------------------- |
| [view](https://doc.dcloud.net.cn/uni-app-x/component/view.html) | [UIView](https://developer.apple.com/documentation/uikit/uiview) |
| [input](https://doc.dcloud.net.cn/uni-app-x/component/input.html) | [UITextField](https://developer.apple.com/documentation/uikit/uitextfield) |
| [textarea](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) | [UITextView](https://developer.apple.com/documentation/uikit/uitextview) |
| [web-view](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) | [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) |

**注意事项：**

+ iOS平台 uvue 环境使用 js 驱动无法处理原生类型，getIOSView 方法需要在 uts 插件中使用。
+ iOS平台页面渲染时元素才会构建View，所以元素刚创建就获取 View 大概率是 null，推荐页面 onReady 时获取。

#### addEventListener\<T extends UniEvent, R>(type: string, callback: (event: T) => R): UniCallbackWrapper @addeventlistener

将指定的监听器注册到元素对象上，当该对象触发指定的事件时，指定的回调函数就会被执行。

##### addEventListener 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(Vapor) UTS 插件 | iOS | iOS(Vapor) UTS 插件 | HarmonyOS | HarmonyOS(Vapor) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 4.11 | x | 5.23 | x |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| type | string | 是 | 微信小程序: x | 事件类型 |
| callback | (event: T) => R | 是 | 微信小程序: x | 事件监听器 T表示event类型，R表示返回值类型 | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| UniCallbackWrapper | 事件回调封装类，用于注销监听函数的形参 |
 




#### removeEventListener(type: string, callbackWrapper: UniCallbackWrapper): void @removeeventlistener

删除使用 addEventListener 方法添加的事件监听器。

##### removeEventListener 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | Android(Vapor) UTS 插件 | iOS | iOS UTS 插件 | HarmonyOS | HarmonyOS(Vapor) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | x | 4.11 | x | 5.23 | x |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| type | string | 是 | 微信小程序: x | 事件类型 |
| callbackWrapper | UniCallbackWrapper | 是 | 微信小程序: x | 事件监听回调封装类 | 






#### removeChild(aChild: UniElement): UniElement \| null @removechild

从元素中删除一个子元素，返回删除的元素。

##### removeChild 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| aChild | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 被删除子元素对象 | 


##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 




#### remove(): void @remove

把元素对象从它所属的 DOM 树中删除。

##### remove 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | x | 5.23 | 4.11 | x | 4.25 | 4.61 | x | 5.23 |








#### dispatchEvent(value: UniEvent): void @dispatchevent

向一个指定的事件目标派发一个 Event，并以合适的顺序（同步地）调用此事件的监听器回调函数。

##### dispatchEvent 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | x | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| value | [UniEvent](/component/common.md#unievent) | 是 | 事件返回对象 | 








#### scrollTo(x: number, y: number): void @scrollto

使界面滚动到给定元素的指定坐标位置 仅scroll-view、list-view组件支持

##### scrollTo 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.61 | 5.23 | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| x | number | 是 | 微信小程序: x | x轴要滚动到坐标位置(单位px) |
| y | number | 是 | 微信小程序: x | y轴要滚动到坐标位置(单位px) | 






#### scrollBy(x: number, y: number): void @scrollby

使得元素滚动一段特定距离 仅scroll-view、list-view组件支持

##### scrollBy 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.61 | 5.23 | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| x | number | 是 | 微信小程序: x | x轴要滚动的距离(单位px) |
| y | number | 是 | 微信小程序: x | y轴要滚动的距离(单位px) | 






#### querySelector(selector: string.cssSelectorString): UniElement \| null @queryselector

返回文档中与指定选择器或选择器组匹配的第一个 Element对象。如果找不到匹配项，则返回null

##### querySelector 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.61 | 5.23 | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| selector | [string.cssSelectorString](/uts/data-type.md#ide-string) | 是 | 微信小程序: x | CSS 选择器字符串 | 


##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 




#### querySelectorAll(selector: string.cssSelectorString): UniElement\[\] @queryselectorall

返回与指定的选择器组匹配的文档中的元素列表

##### querySelectorAll 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android(VDOM) UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.61 | 5.23 | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| selector | [string.cssSelectorString](/uts/data-type.md#ide-string) | 是 | 微信小程序: x | CSS 选择器字符串 | 


##### 返回值 

| 类型 |
| :- |
| Array&lt;[UniElement](/api/dom/unielement.md)&gt; |
 




**注意：**

+ Android平台 从HBuilderX 5.0起，调整 querySelectorAll 返回值，不再返回null，如果查询失败则返回空数组。

#### focus(): void @focus

使元素获取焦点 仅input、Textarea组件支持

##### focus 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.81 | x | 5.23 |








#### blur(): void @blur

使元素丢失焦点 仅input、Textarea组件支持

##### blur 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | Android UTS 插件 | iOS(VDOM) | iOS(Vapor) | iOS(VDOM) UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 4.0 | 5.23 | 5.23 | 4.11 | 5.23 | 4.25 | 4.81 | x | 5.23 |








#### takeSnapshot(options: TakeSnapshotOptions): void @takesnapshot

对当前组件进行截图，调用此方法会将当前组件（包含子节点）渲染结果导出成图片。
成功会返回图片对应的临时文件路径，目前默认png格式


##### takeSnapshot 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | iOS | iOS(VDOM) UTS 插件 | HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| x | x | 3.93 | 5.23 | 4.11 | 4.25 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **TakeSnapshotOptions** | 是 | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 组件截图的参数对象 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 否 | "file" | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 截图导出类型，目前仅支持 'file' 保存到临时文件目录 |
| format | string | 否 | "png" | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 截图文件格式，目前仅支持 'png' |
| success | (res: [TakeSnapshotSuccess](#takesnapshotsuccess-values)) => void | 否 |  | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 接口调用成功的回调函数 |
| fail | (res: [TakeSnapshotFail](#takesnapshotfail-values)) => void | 否 |  | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 |  | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### TakeSnapshotSuccess 的属性值 @takesnapshotsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 截图保存的临时文件路径 |

###### TakeSnapshotFail 的属性值 @takesnapshotfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: x; Android: 5.02; iOS: 5.02; iOS(VDOM) UTS 插件: x; HarmonyOS: 5.02; HarmonyOS(VDOM) UTS 插件: x | 截图失败时的错误描述信息 |




##### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/element-takesnapshot/element-takesnapshot.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/element-takesnapshot/element-takesnapshot.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/element-takesnapshot/element-takesnapshot
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view id="snapshot-content">
      <page-head title="对本页面根view截图"></page-head>
      <view class="uni-padding-wrap">
        <text>this is text</text>
      </view>
      <button class="uni-btn btn-TakeSnapshot" type="primary" @tap="takeSnapshotClick">
        点击截图并替换显示下方图片
      </button>
      <image class="snapshot-original-image" :src="data.snapImage" :mode="mode" @longpress="saveToAlbum"></image>

      <!-- 新增 takeSnapshot 测试 -->
      <view class="section-divider"></view>
      <text class="section-title">takeSnapshot 测试</text>

      <!-- View 元素测试 -->
      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" @click="takeViewSnapshot">View</button>
        </view>
        <view class="test-elements">
          <view id="snapshot-test-view" class="snapshot-test-small"></view>
        </view>
      </view>
      <!-- View 截图展示 -->
      <view class="snapshot-row" v-if="snapshotData.viewSnapshot != null">
        <view class="snapshot-data-col">
          <text class="snapshot-data-subtitle">截图结果</text>
          <image class="snapshot-preview" :src="snapshotData.viewSnapshot" mode="aspectFit" @longpress="saveToAlbum"></image>
        </view>
      </view>

      <!-- Text 元素测试 -->
      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" @click="takeTextSnapshot">Text</button>
        </view>
        <view class="test-elements">
          <text id="snapshot-test-text" class="snapshot-test-text-small">测试文本</text>
        </view>
      </view>
      <!-- Text 截图展示 -->
      <view class="snapshot-row" v-if="snapshotData.textSnapshot != null">
        <view class="snapshot-data-col">
          <text class="snapshot-data-subtitle">截图结果</text>
          <image class="snapshot-preview" :src="snapshotData.textSnapshot" mode="aspectFit" @longpress="saveToAlbum"></image>
        </view>
      </view>

      <!-- Image 元素测试 -->
      <view class="test-group">
        <view class="test-buttons">
          <button class="btn-small" @click="takeImageSnapshot">Image</button>
        </view>
        <view class="test-elements">
          <image id="snapshot-test-image" class="snapshot-test-image-small" src="/static/test-image/logo.png" mode="aspectFit"></image>
        </view>
      </view>
      <!-- Image 截图展示 -->
      <view class="snapshot-row" v-if="snapshotData.imageSnapshot != null">
        <view class="snapshot-data-col">
          <text class="snapshot-data-subtitle">截图结果</text>
          <image class="snapshot-preview" :src="snapshotData.imageSnapshot" mode="aspectFit" @longpress="saveToAlbum"></image>
        </view>
      </view>

      <!-- ScrollView 元素测试 -->
      <button class="btn uni-common-mt" type="default" @click="takeScrollViewSnapshot">takeSnapshot - ScrollView</button>
      <scroll-view id="snapshot-test-scrollview" class="snapshot-test-scrollview">
        <view class="scroll-content">
          <text class="scroll-text">滚动区域内容1</text>
        </view>
        <view class="scroll-content">
          <text class="scroll-text">滚动区域内容2</text>
        </view>
        <view class="scroll-content">
          <text class="scroll-text">滚动区域内容3</text>
        </view>
      </scroll-view>
      <image v-if="snapshotData.scrollViewSnapshot" class="snapshot-result-image" :src="snapshotData.scrollViewSnapshot" mode="widthFix" @longpress="saveToAlbum"></image>
      <text v-else class="snapshot-placeholder-center">暂无截图</text>

      <!-- 自定义组件测试 -->
      <button class="btn uni-common-mt" type="default" @click="takeCustomComponentSnapshot">takeSnapshot - 自定义组件</button>
      <child id="snapshot-test-component" class="snapshot-test-component"></child>
      <image v-if="snapshotData.customComponentSnapshot" class="snapshot-result-image uni-common-mb" :src="snapshotData.customComponentSnapshot" mode="widthFix" @longpress="saveToAlbum"></image>
      <text v-else class="snapshot-placeholder-center">暂无截图</text>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import Child from './child.uvue'

  type DataType = {
    snapImage: string,
    completeTriggered: boolean,
  }

  type SnapshotDataType = {
    viewSnapshot: string,
    textSnapshot: string,
    imageSnapshot: string,
    scrollViewSnapshot: string,
    customComponentSnapshot: string,
  }

  const mode = ref("center")//aspectFit
  const data = reactive({
    snapImage: "/static/test-image/logo.png",
    completeTriggered: false,
  } as DataType)

  const snapshotData = reactive({
    viewSnapshot: '',
    textSnapshot: '',
    imageSnapshot: '',
    scrollViewSnapshot: '',
    customComponentSnapshot: '',
  } as SnapshotDataType)

  function takeSnapshotClick() {
    const view = uni.getElementById('snapshot-content')!
    view.takeSnapshot({
      success: (res) => {
        console.log('takeSnapshot success', res.tempFilePath)
        data.snapImage = res.tempFilePath
        mode.value = 'widthFix'
        uni.showToast({
          title: '截图成功，路径：' + res.tempFilePath,
          icon: "none"
        })
      },
      fail: (res) => {
        console.log('takeSnapshot fail', res)
        uni.showToast({
          icon: 'error',
          title: '截图失败'
        })
      },
      complete: (res) => {
        data.completeTriggered = true
        console.log('takeSnapshot complete', res)
      }
    })
  }

  function saveToAlbum(e : TouchEvent) {
    // console.log(e.currentTarget!.getAttribute("src"));
    let filePath : string = e.currentTarget!.getAttribute("src") as string
    uni.showActionSheet({
      itemList: ["保存"],
      success: res => {
        // console.log(res.tapIndex);
        if (res.tapIndex == 0) {
          uni.saveImageToPhotosAlbum({
            filePath: filePath,
            success() {
              uni.showToast({
                position: "center",
                icon: "none",
                title: "图片保存成功，请到手机相册查看"
              })
            },
            fail(e) {
              uni.showModal({
                content: "保存相册失败，errCode：" + e.errCode + "，errMsg：" + e.errMsg + "，errSubject：" + e.errSubject,
                showCancel: false
              });
            }
          })
        }
      },
      fail: () => { },
      complete: () => { }
    });
  }

  // 通用方法：对元素进行截图
  function takeSnapshotForElement(elementId: string, dataKey: keyof SnapshotDataType) {
    const element = uni.getElementById(elementId)!
    element.takeSnapshot({
      success: (res) => {
        // console.log('takeSnapshot success', elementId, res.tempFilePath)
        snapshotData[dataKey] = res.tempFilePath
        uni.showToast({
          title: '截图成功',
          icon: "success"
        })
      },
      fail: (res) => {
        // console.log('takeSnapshot fail', elementId, res)
        uni.showToast({
          icon: 'error',
          title: '截图失败'
        })
      }
    })
  }

  function takeViewSnapshot() {
    takeSnapshotForElement('snapshot-test-view', 'viewSnapshot')
  }

  function takeTextSnapshot() {
    takeSnapshotForElement('snapshot-test-text', 'textSnapshot')
  }

  function takeImageSnapshot() {
    takeSnapshotForElement('snapshot-test-image', 'imageSnapshot')
  }

  function takeScrollViewSnapshot() {
    takeSnapshotForElement('snapshot-test-scrollview', 'scrollViewSnapshot')
  }

  function takeCustomComponentSnapshot() {
    takeSnapshotForElement('snapshot-test-component', 'customComponentSnapshot')
  }

  defineExpose({
    data,
    snapshotData,
    takeSnapshotClick,
    takeViewSnapshot,
    takeTextSnapshot,
    takeImageSnapshot,
    takeScrollViewSnapshot,
    takeCustomComponentSnapshot
  })
</script>

<style>
  .section-divider {
    margin-top: 30px;
    height: 1px;
    background-color: #e0e0e0;
  }

  .section-title {
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  .test-group {
    margin: 20px;
    flex-direction: column;
  }

  .test-buttons {
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
  }

  .btn-small {
    padding: 5px 15px;
    font-size: 13px;
    border-radius: 4px;
    flex: 1;
    margin: 0 5px;
  }

  .test-elements {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
  }

  .snapshot-test-small {
    width: 80%;
    height: 60px;
    background-color: dodgerblue;
  }

  .snapshot-test-text-small {
    width: 80%;
    padding: 8px;
    font-size: 14px;
    color: #fff;
    background-color: #ff6b6b;
  }

  .snapshot-test-image-small {
    width: 80%;
    height: 60px;
    background-color: #f0f0f0;
  }

  .snapshot-row {
    flex-direction: row;
    margin-top: 10px;
    background-color: #f5f7fa;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
  }

  .snapshot-data-col {
    flex: 1;
    flex-direction: column;
    margin: 0 5px;
    align-items: center;
  }

  .snapshot-data-subtitle {
    font-size: 13px;
    font-weight: bold;
    color: #409eff;
    margin-bottom: 5px;
  }

  .snapshot-preview {
    width: 100%;
    height: 120px;
    background-color: #fff;
    border-radius: 4px;
  }

  .snapshot-placeholder {
    font-size: 12px;
    color: #909399;
    padding: 20px 0;
  }

  .snapshot-original-image {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 90%;
  }

  .snapshot-result-image {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 90%;
  }

  .snapshot-placeholder-center {
    font-size: 12px;
    color: #909399;
    text-align: center;
    margin-top: 10px;
  }

  .snapshot-test-scrollview {
    margin-top: 15px;
    height: 120px;
    border: 1px solid #dcdfe6;
    background-color: #f5f7fa;
  }

  .scroll-content {
    height: 120px;
    padding: 10px;
    border: 1px solid #37b4ea;
    justify-content: center;
    align-items: center;
  }

  .scroll-text {
    line-height: 30px;
    font-size: 14px;
    color: #606266;
  }

  .snapshot-test-component {
    margin-top: 15px;
  }
</style>

```
:::



完整示例代码参考[hello uni-app x](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/API/element-takesnapshot/element-takesnapshot.uvue)

* 截图会在应用沙盒目录的cache目录产生临时文件，位置[详见](../api/file-system-spec.md#cache)。
* app端如需主动删除临时文件，使用[uni.getFileSystemManager](../api/get-file-system-manager.md)。
* app端list-view、waterflow、rich-text、web-view组件涉及复用，仅渲染屏幕显示的内容，所以截图仅能截取到当前屏幕展示的内容。
* app端scroll-view组件设置padding后，截图内容不会包含padding区域。
* 截图默认为png格式，包含透明度。如果view等元素未设置背景，截图后会表现为相关区域透明。另需注意png如果压缩成jpg会丢失透明度，一般会填充成黑色背景。开发者也可以主动给view设背景色来规避截图的png含有透明度。


#### ~~getPage(): UniPage \| null~~ @getpage

获取元素所属的页面对象  **请使用 uniPage 属性**

##### getPage 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.31 | x | 4.31 | 4.31 | 4.61 |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [UniPage](/api/unipage.md) | 否 |
 




#### animate(keyframes: UniAnimationKeyframe \| UniAnimationKeyframe\[], options: UniAnimationOption \| number): UniAnimation \| null @animate

创建一个新的动画并应用于元素，然后立即执行动画。

::: warning 注意
- 鸿蒙平台暂不支持返回动画实例。
:::

##### animate 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | Android(Vapor) UTS 插件 | iOS | iOS UTS 插件 | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 | HarmonyOS(Vapor) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| √ | 4.53 | 4.51 | 5.23 | x | 4.53 | x | 4.61 | 5.08 | x | 5.23 |


##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| keyframes | [UniAnimationKeyframe](#unianimationkeyframe-values) \| Array&lt;**UniAnimationKeyframe**&gt; | 是 | 关键帧对象数组或一个关键帧对象。 |
| options | **UniAnimationOption** \| number | 是 | 动画属性配置。 |

#### keyframes 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| width | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制宽度属性的过渡效果 |
| height | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制高度属性的过渡效果 |
| margin | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制外边距属性的过渡效果 |
| marginTop | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制上外边距属性的过渡效果 |
| marginBottom | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制下外边距属性的过渡效果 |
| marginLeft | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制左外边距属性的过渡效果 |
| marginRight | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制右外边距属性的过渡效果 |
| left | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制左侧位置属性的过渡效果 |
| right | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制右侧位置属性的过渡效果 |
| top | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制顶部位置属性的过渡效果 |
| bottom | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制底部位置属性的过渡效果 |
| padding | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制内边距属性的过渡效果 |
| paddingLeft | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制左内边距属性的过渡效果 |
| paddingRight | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制右内边距属性的过渡效果 |
| paddingTop | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制上内边距属性的过渡效果 |
| paddingBottom | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制下内边距属性的过渡效果 |
| opacity | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制透明度属性的过渡效果 |
| backgroundColor | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制背景颜色属性的过渡效果 |
| borderColor | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制边框颜色属性的过渡效果 |
| borderTopColor | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制上边框颜色属性的过渡效果 |
| borderBottomColor | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制下边框颜色属性的过渡效果 |
| borderLeftColor | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制左边框颜色属性的过渡效果 |
| borderRightColor | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制右边框颜色属性的过渡效果 |
| transform | Array&lt;any&gt; | 否 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制变换属性的过渡效果 |
| transformOrigin | Array&lt;any&gt; | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 控制元素变形的原点的过渡效果 |
| offset | number | 否 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 关键帧的偏移量。为0.0和1.0之间的数字。如果此值缺失，则关键帧将在相邻关键帧之间均匀分布。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| delay | number | 否 | 0 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): 5.08 | 动画延迟的毫秒数 |
| direction | string | 否 | normal | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 动画运行方向 |
| duration | number | 否 | 0 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): 5.08 | 动画时长 |
| easing | string | 否 | linear | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): 5.08 | 动画曲线。 |
| fill | string | 否 |  | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 决定动画效果是否应在播放前反映在元素中 |
| iterations | number | 否 | 1 | Web: √; 微信小程序: √; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): 4.61; HarmonyOS(Vapor): 5.08 | 动画重复的次数。当设置为`Infinity`时，动画将一直重复执行。 | 

##### direction 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| normal | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 正向运行 |
| reverse | Web: √; 微信小程序: x; Android: x; iOS: x; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 反向运行 |
| alternate | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 每次迭代后切换方向 |
| alternate-reverse | Web: √; 微信小程序: x; Android: x; iOS: x; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 反向运行并在每次迭代后切换方向 |

##### easing 的属性描述

| 合法值 |
| :- |
| ease |
| ease-in |
| ease-out |
| ease-in-out |
| linear |
| cubic-bezier |

##### fill 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| backwards | Web: √; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画播放完毕后恢复初始状态 |
| forwards | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 动画播放完毕后保留状态 |
| both | Web: √; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画播放完毕后保留状态 |
| none | Web: √; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画播放完毕后恢复初始状态 |


- keyframes 支持的属性值

|名称				|描述																				|
|:--				|:--																				|
|width				|控制宽度属性的过渡效果																|
|height				|控制高度属性的过渡效果																|
|margin				|控制外边距属性的过渡效果																|
|marginTop			|控制上外边距属性的过渡效果															|
|marginBottom		|控制下外边距属性的过渡效果															|
|marginLeft		|控制左外边距属性的过渡效果															|
|marginRight		|控制右外边距属性的过渡效果															|
|left				|控制左侧位置属性的过渡效果															|
|right				|控制右侧位置属性的过渡效果															|
|top				|控制顶部位置属性的过渡效果															|
|bottom				|控制底部位置属性的过渡效果															|
|padding			|控制内边距属性的过渡效果																|
|paddingLeft		|控制左内边距属性的过渡效果															|
|paddingRight		|控制右内边距属性的过渡效果															|
|paddingTop		|控制上内边距属性的过渡效果															|
|paddingBottom		|控制下内边距属性的过渡效果															|
|opacity			|控制透明度属性的过渡效果																|
|backgroundColor	|控制背景颜色属性的过渡效果															|
|borderColor		|控制边框颜色属性的过渡效果															|
|borderTopColor	|控制上边框颜色属性的过渡效果															|
|borderBottomColor|控制下边框颜色属性的过渡效果															|
|borderLeftColor	|控制左边框颜色属性的过渡效果															|
|borderRightColor	|控制右边框颜色属性的过渡效果															|
|transform			|控制变换属性的过渡效果																|
|transformOrigin	|控制元素变形的原点的过渡效果															|
|offset				|关键帧的偏移量。为0.0和1.0之间的数字。如果此值缺失，则关键帧将在相邻关键帧之间均匀分布。	|

:::tip Tips
- App平台keyframes支持的属性值不支持设置百分比。
- 微信小程序平台 keyframes 使用 wxs + transition 方案实现，不支持多个 keyframes 之间使用缺省属性。微信内置的 `this.animate` 方案支持 [css 属性有限](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E5%85%B3%E9%94%AE%E5%B8%A7%E5%8A%A8%E7%94%BB)，可以配合使用。
:::

- options 支持的属性

|名称		|描述																				|
|:--		|:--																				|
|delay		|动画延迟的毫秒数	。默认值为0															|
|direction	|动画运行方向。Android/微信小程序平台仅支持alternate和normal，默认为normal							|
|duration	|动画时长。默认值为0																	|
|easing		|动画曲线。支持ease、ease-in、ease-out、ease-in-out、linear和贝塞尔函数。默认值为linear（微信小程序平台支持 linear）	|
|fill		|决定动画效果是否应在播放前反映在元素中（Android仅支持forwards）							|
|iterations	|动画应重复的次数。默认值为1。	当设置为`Infinity`时，动画将一直重复执行。					|

##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [UniAnimation](#unianimation-values) | 否 |

#### UniAnimation 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| id | string | 是 | Web: √; 微信小程序: 4.53; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 获取或设置用于标识动画的字符串 |
| playState | string | 是 | Web: √; 微信小程序: x; Android: 4.51; iOS: 4.53; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.08 | 返回动画播放状态。可选值：`running`动画正在运行；`paused`动画暂停；`finished`动画播放完成；`idle`动画取消或者失败 |
###### UniAnimation 的方法 @unianimation-values 

###### oncancel: (event: UniAnimationPlaybackEvent) => void @oncancel
oncancel
监听动画取消事件
###### oncancel 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| √ | 5.21 | 4.51 | 4.53 | x | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| event | **UniAnimationPlaybackEvent** | 是 |

#### event 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| type | string | 是 | 动画的事件类型 | 



###### onfinish: (event: UniAnimationPlaybackEvent) => void @onfinish
onfinish
监听动画完成事件
###### onfinish 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| √ | x | 4.51 | 4.53 | x | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| event | **UniAnimationPlaybackEvent** | 是 |

#### event 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| type | string | 是 | 动画的事件类型 | 



###### cancel(): void @cancel
cancel
终止并取消所有动画
###### cancel 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| √ | 4.53 | 4.51 | 4.53 | x | 5.08 |




###### finish(): void @finish
finish
动画跳转到最后一毫秒并立即播放完成
###### finish 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| √ | x | 4.51 | 4.53 | x | 5.08 |




###### pause(): void @pause
pause
暂停动画播放
###### pause 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| √ | x | 4.51 | 4.53 | x | 5.08 |




###### play(): void @play
play
开始或恢复动画播放
###### play 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| √ | 4.53 | 4.51 | 4.53 | x | 5.08 |



 


##### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/animate/animate.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/animate/animate.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/animate/animate

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/animate/animate

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-intro content="本页演示 uni.createAnimation 与 uni.createAnimateContext：点击开始/暂停/恢复/取消动画，可点击各 view 修改宽度、高度、margin、padding 等属性动画。"></page-intro>
    <view id="main" style="width: 100px;height: 100px; background-color: brown; transform: scale(1);"></view>

    <button @click="startAnimate">开始动画</button>
    <!-- #ifndef !VUE3-VAPOR && APP-HARMONY -->
    <!-- #ifndef MP-WEIXIN -->
    <button @click="pauseAnimate">暂停动画</button>
    <!-- #endif -->
    <button @click="resumeAnimate">恢复动画</button>
    <button @click="cancelAnimate">取消动画</button>
    <!-- #endif -->

    <image src="/static/test-image/logo.png" id="roll" style="width: 100px; height: 100px;margin: 10px;"></image>


   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改宽度</text>
     <view id="widthProperty" style="width: 100px;height: 100px;background-color: brown;" @click="widthProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改高度</text>
     <view id="height1" style="width: 100px;height: 100px;background-color: brown;" @click="heightProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改margin</text>
     <view id="marginProperty" style="width: 100px;height: 100px;background-color: brown;" @click="marginProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改padding</text>
     <view id="paddingProperty" style="width: 100px;height: 100px;background-color: brown;" @click="paddingProperty">
       <view style="width: 50px;height: 50px;background-color: black;"></view>
     </view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改border颜色</text>
     <view id="borderProperty"
       style="width: 100px;height: 100px;background-color: brown;border-width: 10px;border-color: black;border-style: solid;"
       @click="borderProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改transform</text>
     <view id="transformProperty" style="width: 100px;height: 100px;background-color: brown;" @click="transformProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改position</text>
     <view id="positionProperty" style="width: 100px;height: 100px;background-color: brown;" @click="positionProperty"></view>
   </view>
   <!-- #ifndef MP-WEIXIN -->
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改背景色和宽度</text>
     <view id="backgroundAndWidthProperty" style="width: 100px;height: 100px;background-color: brown;" @click="backgroundAndWidthProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">执行的动画只有一个值1</text>
     <view id="oneProperty1" style="width: 100px;height: 100px;background-color: brown;" @click="oneProperty1"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">执行的动画只有一个值2</text>
     <view id="oneProperty2" style="width: 100px;height: 100px;background-color: brown;" @click="oneProperty2"></view>
   </view>
   <!-- #endif -->
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改背景色和margin-left(关键帧)</text>
     <view id="backgroundAndMarginLeftProperty" style="width: 100px;height: 100px;background-color: brown;" @click="backgroundAndMarginLeftProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改背景色和transform(关键帧)</text>
     <view id="backgroundAndTransformProperty" style="width: 100px;height: 100px;background-color: brown;" @click="backgroundAndTransformProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改背景色(关键帧)</text>
     <view id="backgroundProperty" style="width: 100px;height: 100px;background-color: brown;" @click="backgroundProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改opacity(关键帧)</text>
     <view id="opacityProperty" style="width: 100px;height: 100px;background-color: brown;" @click="opacityProperty"></view>
   </view>
   <view
     style="border-radius: 5px;margin: 4px;padding: 4px;border-style: solid;background-color: #eee;border-color: #eee;">
     <text style="margin-bottom: 4px;">修改border-color和margin-left(关键帧)</text>
     <view id="borderColorMarginLeftProperty" style="width: 100px;height: 100px;background-color: brown;border-width: 5px;border-style: solid;"
       @click="borderColorMarginLeftProperty"></view>
   </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  let mainView : UniElement | null = null
  let animation : UniAnimation | null = null

  type Data = {
    testTriggerFinishEvent : boolean,
    testTriggerCancelEvent : boolean
  }

  const data = {
    testTriggerFinishEvent: false,
    testTriggerCancelEvent: false
  } as Data

  function startAnimate() {
    animation = mainView!.animate([
      {
        transform: "scale(1)",
        transformOrigin: "0px 0px"
      },
      {
        transform: "scale(0)",
        transformOrigin: "50px 50px"
      },
      {
        transform: "scale(1)",
        transformOrigin: "100px 100px"
      }
    ], {
      duration: 5000,

    })
    if (animation != null) {
      animation!.oncancel = (_ : UniAnimationPlaybackEvent) => {
        data.testTriggerCancelEvent = true
        uni.showToast({
          title: "动画被取消了"
        })
      }
      animation!.onfinish = (_ : UniAnimationPlaybackEvent) => {
        data.testTriggerFinishEvent = true
        uni.showToast({
          title: "动画播放完成"
        })
      }
    }
  }

  function pauseAnimate() {
    animation?.pause()
  }

  function resumeAnimate() {
    animation?.play()
  }

  function cancelAnimate() {
    animation?.cancel()
  }

  function widthProperty(e : UniPointerEvent) {
    e.currentTarget?.animate({
      width: ["100px", "200px", "150px"]
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function heightProperty(e : UniPointerEvent) {
    e.currentTarget?.animate({
      height: ["100px", "200px"]
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function marginProperty(e : UniPointerEvent) {
    e.currentTarget?.animate({
      margin: ["8px", "16px", "32px"]
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function paddingProperty(e : UniPointerEvent) {
    e.currentTarget?.animate({
      padding: ["0px", "16px", "32px", "16px"]
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function backgroundProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        offset: 0.3,
        backgroundColor: "yellow"
      },
      {
        offset: 0.6,
        backgroundColor: "red"
      },
      {
        backgroundColor: "blue"
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function borderProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        offset: 0.3,
        borderColor: "yellow"
      },
      {
        offset: 0.6,
        borderColor: "pink"
      },
      {
        borderColor: "blue"
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function transformProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        transform: "translateX(0px) scale(1) rotate(0deg)"
      },
      {
        transform: "translateX(100px)"
      },
      {
        transform: "scale(0.8) rotate(180deg)"
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function positionProperty(e : UniPointerEvent) {
    e.currentTarget?.animate({
      left: ["0px", "16px", "32px", "16px"]
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function backgroundAndWidthProperty(e : UniPointerEvent) {
    e.currentTarget?.animate({
      width: ["100px", "200px"],
      backgroundColor: ["red", "yellow", "blue"]
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function backgroundAndMarginLeftProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        offset: 0.2,
        backgroundColor: "red"
      }, {
        marginLeft: "10px"
      }, {
        marginLeft: "20px"
      }, {
        marginLeft: "30px",
        backgroundColor: "pink"
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function backgroundAndTransformProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        offset: 0.2,
        backgroundColor: "red"
      }, {
        transform: "translate(30px,0px)"
      }, {
        transform: "translate(50px,0px)"
      }, {
        transform: "translate(100px,0px)",
        backgroundColor: "pink"
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function oneProperty1(e : UniPointerEvent) {
    e.currentTarget?.animate({
      backgroundColor: "green"
    }, {
      duration: 1000,
      fill: "forwards"
    })
  }

  function oneProperty2(e : UniPointerEvent) {
    e.currentTarget?.animate([{
      backgroundColor: "blue"
    }], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function borderColorMarginLeftProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        borderColor: "red",
        marginLeft: "0px",
        offset: 0
      },
      {
        marginLeft: "20px",
        offset: 0.5
      },
      {
        marginLeft: "60px",
        borderColor: "yellow",
        offset: 1
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  function opacityProperty(e : UniPointerEvent) {
    e.currentTarget?.animate([
      {
        offset: 0.3,
        opacity: "1"
      },
      {
        offset: 0.6,
        opacity: "0.1"
      },
      {
        opacity: "0.5"
      }
    ], {
      duration: 1000,
      fill: "forwards"
    })
  }

  onReady(() => {
    mainView = uni.getElementById("main")
    var roll = uni.getElementById("roll")
    roll!.animate([
      { transform: "translateX(0) rotate(0)" },
      { transform: "translateX(200px) rotate(540deg)" },
    ],
      {
        duration: 2000,
        direction: "alternate",
        easing: "ease-in-out",
        iterations: Infinity,
      },
    )
  })

  defineExpose({
    data,
    startAnimate,
    cancelAnimate
  })
</script>

<style>
  .view-margin {
    margin: 8px;
  }
</style>

```

:::




#### getHarmonyController(): any \| null @getharmonycontroller

鸿蒙原生组件控制器，可以控制组件的状态。可能返回null

注意：getHarmonyController限于ets环境。只能获取在ets环境中创建的原生对象。鸿蒙蒸汽模式中，view、text、image等大部分内置组件都不是ets组件，无法get到其Controller。

##### getHarmonyController 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) | HarmonyOS(VDOM) UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | x | 4.61 | x | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| any | 否 |
 


<!-- CUSTOMTYPEJSON.UniElement.methods.getHarmonyController.example -->




#### getHarmonyController\<T>(): T \| null @getharmonycontroller

鸿蒙原生组件控制器，可以控制组件的状态。通过泛型定义view类型，可能返回null

##### getHarmonyController 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | x | x | 4.61 | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| T | 否 |
 


<!-- CUSTOMTYPEJSON.UniElement.methods.getHarmonyController_1.example -->




#### requestFullscreen(options?: RequestFullscreenOptions): void @requestfullscreen

控制元素进入全屏状态

##### requestFullscreen 兼容性 <Help /> 
| Web | 微信小程序 | Android | Android(VDOM) UTS 插件 | iOS | iOS(VDOM) UTS 插件 | HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| x | x | 4.61 | 5.23 | 4.61 | x | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **RequestFullscreenOptions** | 否 | Web: x; 微信小程序: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| navigationUI | string | 否 | Web: x; 微信小程序: x | 全屏模式时导航栏状态 |
| orientation | string | 否 | Web: x; 微信小程序: x | 全屏显示方向 |
| success | () => void | 否 | Web: x; 微信小程序: x | 成功回调 |
| fail | (error: [IFullscreenError](#ifullscreenerror-values)) => void | 否 | Web: x; 微信小程序: x | 失败回调 |
| complete | (result?: any) => void | 否 | Web: x; 微信小程序: x | 完成回调 | 

##### navigationUI 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| hide | Web: x; 微信小程序: x | 隐藏所有系统状态栏和底部导航栏 |
| show | Web: x; 微信小程序: x | 隐藏顶部系统状态栏，显示底部系统导航栏 |
| auto | Web: x; 微信小程序: x | 系统默认行为 |

##### orientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: x; 微信小程序: x | 根据重力感应自动调整 |
| landscape | Web: x; 微信小程序: x | 固定为横屏，会根据重力调整方向 |
| landscape-secondary | Web: x; 微信小程序: x | 固定为反向横屏 |
| landscape-primary | Web: x; 微信小程序: x | 固定为正向横屏 |
| portrait | Web: x; 微信小程序: x | 固定为竖屏 |

###### IFullscreenError 的属性值 @ifullscreenerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: x | 错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 106600 | Web: x; 微信小程序: x | 当前页面已经有element处于全屏状态 |
| 106601 | Web: x; 微信小程序: x | 当前element不支持全屏 |
| 106602 | Web: x; 微信小程序: x | 当前页面没有element处于全屏状态 |
| 106603 | Web: x; 微信小程序: x | 页面已销毁或者尚未就绪 |
| 106604 | Web: x; 微信小程序: x | 组件未就绪 |




##### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/element-request-fullscreen/element-request-fullscreen.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/element-request-fullscreen/element-request-fullscreen.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/element-request-fullscreen/element-request-fullscreen
```uvue
<template>
  <scroll-view class="content" direction="vertical">
    <view id="fullscreen" class="view1" @click="fullscreen" @fullscreenchange="fullscreenchange" @fullscreenerror="fullscreenerror">
      <text style="color: white;">{{ text }}</text>
    </view>
    <enum-data :items="orientation_enum" title="orientation" @change="radio_change_orientation"></enum-data>
    <enum-data :items="navigationUI_enum" title="navigationUI" @change="radio_change_ui"></enum-data>
  </scroll-view>
</template>

<script setup lang="uts">
  
  import { ItemType } from '@/components/enum-data/enum-data-types';

  const orientation_enum = ref([{ "value": 0, "name": "auto" }, { "value": 1, "name": "landscape" }, { "value": 2, "name": "landscape-primary" }, { "value": 3, "name": "landscape-secondary" }, { "value": 4, "name": "portrait" }] as ItemType[])
  const navigationUI_enum = ref([{ "value": 0, "name": "auto" }, { "value": 1, "name": "hide" }, { "value": 2, "name": "show" }] as ItemType[])
  const text = ref("点击进入全屏")
  let fullscreenElement: UniElement | null = null
  let isFullscreen = false
  const orientation = ref("landscape")
  const navigationUI = ref("hide")

  type DataType = {
    fullscreenchangeCount: number,
    requestFullscreenCallbackStatus: boolean,
    exitFullscreenCallbackStatus: boolean,
  }

  const data = reactive({
    fullscreenchangeCount: 0,
    requestFullscreenCallbackStatus: false,
    exitFullscreenCallbackStatus: false,
  } as DataType)

  function getCurrentPage() : UniPage {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  }

  function fullscreen() {
    if (isFullscreen) {
      // 重置退出全屏回调状态
      let status1 = false
      const page = getCurrentPage()
      page.exitFullscreen({
        success: () => {
          text.value = "点击进入全屏"
          status1 = true
        },
        fail: (err) => {
          console.log('fail', err)
          status1 = false
        },
        complete: () => {
          console.log('complete')
          data.exitFullscreenCallbackStatus = status1
        }
      })
    } else {
      // 重置进入全屏回调状态
      let status1 = false
      fullscreenElement?.requestFullscreen({
        navigationUI: navigationUI.value,
        orientation: orientation.value,
        success: () => {
          text.value = "点击退出全屏"
          status1 = true
        },
        fail: (err) => {
          console.log('fail', err)
          status1 = false
        },
        complete: () => {
          console.log('complete')
          data.requestFullscreenCallbackStatus = status1
        }
      })
    }

    isFullscreen = !isFullscreen
  }

  function fullscreenchange(e : UniEvent) {
    console.log(e.type)
    data.fullscreenchangeCount++
    console.log(data.fullscreenchangeCount)
  }

  function fullscreenerror(e : UniEvent) {
    console.log(e.type)
  }

  function radio_change_orientation(checked : number) {
    console.log(checked)
    orientation.value = orientation_enum.value[checked]['name'] as string
  }

  function radio_change_ui(checked : number) {
    console.log(checked)
    navigationUI.value = navigationUI_enum.value[checked]['name'] as string
  }

  onReady(() => {
    fullscreenElement = uni.getElementById('fullscreen') as UniElement
  })

  defineExpose({
    data,
    fullscreen
  })
</script>

<style>
  .content {
    flex: 1;
    background-color: #f0f0f0;
  }

  .view1 {
    width: 100%;
    height: 150px;
    align-items: center;
    justify-content: center;
    background-color: black;
  }
</style>

```
:::



:::tip Tips
- requestFullscreen仅支持`view`组件。其他组件调用会触发失败回调。
- app-ios平台，横屏时系统会自动隐藏状态栏。
:::
