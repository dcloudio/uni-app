``uni-app`` 扩展了常用的的UI组件，使用方式：

1. 从 [hello uniapp](https://github.com/dcloudio/hello-uniapp) 的 ``components`` 目录拷贝出以 ``uni`` 开头的相关组件，从 ``common`` 目录拷贝出 ``uni.css``（在 [HBuilderX](http://www.dcloud.io/hbuilderx.html) 中新建 ``hello uniapp`` 示例也可得到相关组件和css）。
2. 将拷贝出的组件放置于自己工程下的 ``components`` 目录，组件的使用可参考各组件的使用说明。
3. 项目中如果有多个页面用到扩展组件，可在 ``App.vue`` 里引入 ``uni.css``，若只是很少的页面用到扩展组件，仅需在用到的页面里引入 ``uni.css``，引入外部css可参考 [样式导入](/frame?id=样式导入)。


### Badge 数字角标

数字角标一般和其它控件（列表、9宫格等）配合使用，用于进行数量提示，默认为实心灰色背景，组件名：``uni-badge``，代码块： uBadge。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniBadge from "@/components/uni-badge.vue"
export default {
    components: {uniBadge}
}
```

在 ``template`` 中使用组件

```html
<uni-badge text="1"></uni-badge>
<uni-badge text="2" type="purple" @click="bindClick"></uni-badge>
<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
```

**Badge 属性说明：**

|属性名		|类型																			|默认值					|说明				|
|---		|----	|---					|---																											|
|text		|String	|						|角标内容																										|
|type		|String	|default|颜色类型，可选值：default（灰色）、primary（蓝色）、success（绿色）、warning(黄色)、danger(红色)、royal(紫色)	|
|inverted	|Boolean|false	|是否无需背景颜色，为 true 时，背景颜色将变为文字的字体颜色|
|@click	    |EventHandle|	|点击 Badge 触发事件	|

### CountDown 倒计时

倒计时组件，组件名：``uni-countdown``，代码块： uCountDown。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniCountdown from "@/components/uni-countdown.vue"
export default {
    components: {uniCountdown}
}
```

CountDown 在 ``template`` 中的使用

```html
<uni-countdown font-color="#FFFFFF" bgr-color="#000000" timer="2018-12-23 12:00:00"></uni-countdown>
```

**CountDown 属性说明：**

|属性名|类型|默认值	|说明|
|---|----|---|---|
|bgr-color	|String|#FFFFFF|背景色|
|border-color|String|#000000|边框颜色|
|font-color	|String	|#000000|文字颜色|
|splitor-color|String|#000000|割符号颜色|
|timer|String||倒计时时间，格式为：``YY-mm-dd HH:ii:ss``（日期和时间之间以空格隔开），如：``2018-12-23 12:00:00``|

### Drawer 抽屉

抽屉侧滑菜单，组件名：``uni-drawer``，代码块： uDrawer。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniDrawer from "@/components/uni-drawer.vue"
export default {
    components: {uniDrawer}
}
```

Drawer 在 ``template`` 中以 **插槽** 形式插入内容

```html
<uni-drawer :visible="true">
    <view style="padding:30rpx;">
        <view class="uni-title">抽屉式导航</view>
        <view class="uni-list uni-common-mt">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right">Item1</view>
            </view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right">Item2</view>
            </view>
        </view>
    </view>
</uni-drawer>
```

**Drawer 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|visible	|Boolean|false|Drawer的显示状态|
|mask	|Boolean	|true|是否显示遮罩|
|mode|String|left|Drawe滑出位置，可选值：left（从左侧滑出）， right（从右侧滑出|
|@close|EventHandle||组件关闭时触发事件	|


### Icon 图标

用于展示 icon，组件名：``uni-icon``，代码块： uIcon。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniIcon from "@/components/uni-icon.vue"
export default {
    components: {uniIcon}
}
```

在 ``template`` 中使用组件

```html
<uni-icon type="contact" size="30"></uni-icon>
```

**Icon 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|type	|String	||图标图案，参考下表|
|color	|String	||图标颜色	|
|size	|Number	|24|图标大小|
|@click	|EventHandle||点击 Icon 触发事件|

**type 类型**

<div>
  <link rel="stylesheet" type="text/css" href="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/icon1.1.css"/>
  <ul class="icon-group">
  	<li class="icon-item"><span class="uni-icon uni-icon-contact"></span><span>contact</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-person"></span><span>person</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-personadd"></span><span>personadd</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-contact-filled"></span><span>contact-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-person-filled"></span><span>person-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-personadd-filled"></span><span>personadd-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-phone"></span><span>phone</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-email"></span><span>email</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-chatbubble"></span><span>chatbubble</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-chatboxes"></span><span>chatboxes</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-phone-filled"></span><span>phone-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-email-filled"></span><span>email-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-chatbubble-filled"></span><span>chatbubble-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-chatboxes-filled"></span><span>chatboxes-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-weibo"></span><span>weibo</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-weixin"></span><span>weixin</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-pengyouquan"></span><span>pengyouquan</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-chat"></span><span>chat</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-qq"></span><span>qq</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-videocam"></span><span>videocam</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-camera"></span><span>camera</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-mic"></span><span>mic</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-location"></span><span>location</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-mic-filled"></span><span>mic-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-location-filled"></span><span>location-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-micoff"></span><span>micoff</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-image"></span><span>image</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-map"></span><span>map</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-compose"></span><span>compose</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-trash"></span><span>trash</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-upload"></span><span>upload</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-download"></span><span>download</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-close"></span><span>close</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-redo"></span><span>redo</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-undo"></span><span>undo</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-refresh"></span><span>refresh</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-star"></span><span>star</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-plus"></span><span>plus</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-minus"></span><span>minus</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-circle"></span><span>circle</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-clear"></span><span>clear</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-refresh-filled"></span><span>refresh-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-star-filled"></span><span>star-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-plus-filled"></span><span>plus-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-minus-filled"></span><span>minus-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-circle-filled"></span><span>circle-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-checkbox-filled"></span><span>checkbox-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-closeempty"></span><span>closeempty</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-refreshempty"></span><span>refreshempty</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-reload"></span><span>reload</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-starhalf"></span><span>starhalf</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-spinner"></span><span>spinner</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-spinner-cycle"></span><span>spinner-cycle</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-search"></span><span>search</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-plusempty"></span><span>plusempty</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-forward"></span><span>forward</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-back"></span><span>back</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-checkmarkempty"></span><span>checkmarkempty</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-home"></span><span>home</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-navigate"></span><span>navigate</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-gear"></span><span>gear</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-paperplane"></span><span>paperplane</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-info"></span><span>info</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-help"></span><span>help</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-locked"></span><span>locked</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-more"></span><span>more</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-flag"></span><span>flag</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-home-filled"></span><span>home-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-gear-filled"></span><span>gear-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-info-filled"></span><span>info-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-help-filled"></span><span>help-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-more-filled"></span><span>more-filled</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-settings"></span><span>settings</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-list"></span><span>list</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-bars"></span><span>bars</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-loop"></span><span>loop</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-paperclip"></span><span>paperclip</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-eye"></span><span>eye</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowup"></span><span>arrowup</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowdown"></span><span>arrowdown</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowleft"></span><span>arrowleft</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowright"></span><span>arrowright</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowthinup"></span><span>arrowthinup</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowthindown"></span><span>arrowthindown</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowthinleft"></span><span>arrowthinleft</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-arrowthinright"></span><span>arrowthinright</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-pulldown"></span><span>pulldown</span></li>
  	<li class="icon-item"><span class="uni-icon uni-icon-scan"></span><span>scan</span></li>
  </ul>
</div>


### LoadMore 加载更多

用于列表中，做滚动加载使用，展示 loading 的各种状态，组件名：``uni-load-more``，代码块： uLoadMore。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniLoadMore from "@/components/uni-load-more.vue"
export default {
    components: {uniLoadMore}
}
```

在 ``template`` 中使用组件

```html
<uni-load-more :status="more"></uni-load-more>
```

**LoadMore 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|status	|String	|more|loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）|
|show-icon	|Boolean	|true|是否显示 loading 图标|
|color	|String	|#777777|图标和文字颜色	|
|content-text	|Object	|```{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}```|各状态文字说明|


### NavBar 导航栏

导航栏组件，主要用于头部导航，组件名：``uni-nav-bar``，代码块： uNavBar。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniNavBar from "@/components/uni-nav-bar.vue"
export default {
    components: {uniNavBar}
}
```

在 ``template`` 中使用组件

```html
<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar>
```

**NavBar 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|title	|String	||标题文字|
|left-text	|String	||右侧按钮文本|
|right-text	|String	||右侧按钮文本|
|left-tcon	|String	||左侧按钮图标（图标类型参考 [Icon 图标](/uniUI?id=icon-图标) type 属性）|
|right-tcon	|String	||右侧按钮图标（图标类型参考 [Icon 图标](/uniUI?id=icon-图标) type 属性）|
|fixed	|Boolean	|false|是否固定顶部|
|status-bar	|Boolean|false（fixed为true时，status-bar默认值为true）|是否包含状态栏，|
|shadow	|Boolean|true|导航栏下是否有阴影|
|color	|String	|#000000|图标和文字颜色	|
|background-color|String|#FFFFFF|导航栏背景颜色	|
|@click-left|EventHandle||左侧按钮点击时触发	|
|@click-right|EventHandle||右侧按钮点击时触发	|

**NavBar 插槽**

开发者使用 NavBar 时，支持向 NavBar 里插入不同内容，以达到自定义的目的。


|子元素 slot 的值|说明|
|---|----|
|left	|向导航栏左侧插入|
|right	|向导航栏右侧插入|
|其他	|向导航栏中间插入|

```html
<uni-nav-bar>
    <view>标题栏</view>
    <view slot="left">left</view>
    <view  slot="right">right</view>
</uni-nav-bar>
```

### NumberBox 数字输入框

带加减按钮的数字输入框，组件名：``uni-number-box``，代码块： uNumberBox。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniNumberBox from "@/components/uni-number-box.vue"
export default {
    components: {uniNumberBox}
}
```

在 ``template`` 中使用组件

```html
<uni-number-box></uni-number-box>
<uni-number-box :min="0" :max="9"></uni-number-box>
<uni-number-box @change="bindChange"></uni-number-box>
```

**NumberBox 属性说明：**

|属性名		|类型	|默认值					|说明				|
|---		|----	|---					|---																											|
|value		|Number	|0|输入框当前值	|
|min		|Number	|-|最小值					|
|max		|Number	|-|最大值|
|step		|Number	|1|每次点击改变的间隔大小|
|disabled	|Boolean|false	|是否为禁用状态|
|@change	|EventHandle|	|输入框值改变时触发的事件，参数为输入框当前的 value	|


### Popup 弹出层

在页面不同位置显示弹出层，组件名：``uni-popup``，代码块： uPopup。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniPopup from "@/components/uni-popup.vue"
export default {
    components: {uniPopup}
}
```

在 ``template`` 中使用组件

```html
<uni-popup :show="true" type="middle" msg="popup 文字内容"></uni-popup>
```

**Popup 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|show	|Boolean|false|是否显示弹出层|
|type|String|middle|弹出层内容出现在页面的位置，可选值：top（顶部）， middle（居中）, bottom（底部）|
|msg	|String	||弹出层文字内容|
|@hidePopup|EventHandle||点击遮罩时触发事件	|

**Popup 插槽**

开发者使用 Popup 时，支持向 Popup 里插入不同内容，以达到自定义的目的。

```html
<uni-popup :show="true" type="middle">
    <view>使用插槽</view>
</uni-popup>
```

### SegmentedControl 分段器

用作不同视图的显示，组件名：``uni-segmented-control``，代码块： uSegmentedControl。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniSegmentedControl from "@/components/uni-segmented-control.vue"
export default {
    components: {uniSegmentedControl},
    data() {
    	return {
    		items: ['选项卡1','选项卡2','选项卡3'],
    		current: 0
    	}
    },
    methods: {
    	onClickItem(index) {
    		if (this.current !== index) {
    			this.current = index;
    		}
    	}
    }
}
```

SegmentedControl 在 ``template`` 中的使用

```html
<template>
    <view>
        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
        <view class="content">
            <view v-show="current === 0">
                选项卡1的内容
            </view>
            <view v-show="current === 1">
                选项卡2的内容
            </view>
            <view v-show="current === 2">
                选项卡3的内容
            </view>
        </view>
    </view>
</template>
```

**SegmentedControl 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|current	|Number|0|当前选中的tab索引值，从0计数|
|values	|Array&lt;String&gt;||选项数组|
|style-type	|String	|button|分段器样式类型，可选值：button（按钮类型），text（文字类型）|
|active-color|String	|#007aff|选中的标签背景色与边框颜色|
|@clickItem|EventHandle||组件触发点击事件时触发，参数为当前选中的tab索引值 current	|


### Tag 标签

用于展示1个或多个文字标签，可点击切换选中、不选中的状态，组件名：``uni-tag``，代码块： uTag。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniTag from "@/components/uni-tag.vue"
export default {
    components: {uniTag}
}
```

在 ``template`` 中使用组件

```html
<uni-tag text="标签"></uni-tag>
<uni-tag text="标签" type="danger" :circle="true"></uni-tag>
<uni-tag text="标签" @click="bindClick"></uni-tag>
```

**Tag 属性说明：**

|属性名		|类型	|默认值					|说明				|
|---		|----	|---					|---																											|
|text		|String	|-						|标签内容																										|
|size		|String	|normal|大小尺寸，可选值：normal、small					|
|type		|String	|default|颜色类型，可选值：default（灰色）、primary（蓝色）、success（绿色）、warning(黄色)、danger(红色)、royal(紫色)	|
|disabled	|Boolean|false	|是否为禁用状态|
|inverted	|Boolean|false	|是否无需背景颜色（空心标签）|
|circle 	|Boolean|false	|是否为圆角|
|@click	    |EventHandle|	|点击 Tag 触发事件	|





