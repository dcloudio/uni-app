<!-- ## list-item -->

::: sourceCode
## list-item
:::

> 组件类型：UniListItemElement 

 list-view组件的子组件。每个item是一行


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.02 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| type | number | 0 | Web: 4.02; 微信小程序: 4.41; Android: 3.9; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 对应list-item的类型 list-view 将对同类型条目进行复用，所以合理的类型拆分，可以很好地提升 list-view 性能 |

### list-item复用机制

> 仅App平台支持复用 (iOS 4.25+版本支持)。Web平台仅渲染当前屏幕及上下一定高度内的元素，没有对list-item进行复用。

+ 良好的复用，需要在list-item上使用v-for且配置:key。
+ type属性定义list-item组件类型。不赋值type属性默认值为0，每一个type类型都会有对应的list-item组件缓存池。
+ 鸿蒙平台在非蒸汽模式不支持type属性，会将一个list-view下所有list-item放在一个缓存池进行复用。蒸汽模式支持type分类复用。
+ list-view组件加载list-item组件时，会优先查询对应type缓存池是否存在可复用的list-item组件。有则复用没有则创建新的list-item组件。
+ list-item组件被滑动出屏幕则会优先添加到对应类型的list-item缓存池，每个类型缓存最大5~8个（不同平台缓存最大值不固定），如果缓存池已满则进行组件销毁！
+ 部分list-item组件存在子元素个数差异时。请尽可能的配置不同的type，可以规避获取相同type类型的list-item组件因子元素个数差异导致重新创建，增加性能消耗。
	* 举例1：list-item里放置banner图，该list-item应该设置独立的type，不需要复用，每次从缓存池拿出即可，触发复用反而会出现滚动位置异常图片重新加载等异常情况。
	* 举例2：list-item子元素个数存在差异应设置不同的type，type相同则会导致list-item复用时因子元素个数差异复用失败，元素重新创建增加性能消耗。具体可参考示例：

```html
	<template>
	  <view class="content">
		<list-view ref="listView" class="list" :scroll-y="true">
		  <list-item v-for="(item,index) in list" :key="item" class="content-item1" type=1>
			<text class="text">title-{{item}}</text>
			<text class="text">content-{{item}}</text>
		  </list-item>
		  <list-item v-for="(item,index) in list" :key="item" class="content-item2" type=2>
		  	<image class="image" src ="/static/test-image/logo.png"></image>
		  </list-item>
		  <list-item type=3>
			<text class="loading">{{text}}</text>
		  </list-item>
		</list-view>
	  </view>
	</template>
```

示例中有三种类型的list-item组件。如果type都是默认值0，list-item组件滑动出屏幕后都归类到type=0的缓存池。当触发list-item组件重新加载时，获取type=0的缓存池的组件，获取到的list-item组件可能是两个text子组件也可能是一个image子组件或一个text子组件，底层复用判断时则认为该情况异常不复用，重新创建新的list-item组件！复用失败未能优化性能。正确的方式则是不同的类型设置不同的type。加载时则会获取对应type类型缓存池中的list-item组件实现复用。

**注意：**

1. 避免对list-item组件的子元素设置event事件，复用后list-item组件部分子元素可能无法正常响应event，有相关业务需要对子元素设置event事件，可对list-item组件设置独立的type实现不复用。
2. App-iOS平台：使用 v-for 遍历集合方式创建 list-item 时，需要绑定 :key 并要保证值唯一，最好不要使用 index，否则可能会引起 list-item 显示顺序错乱的问题；



<!-- UTSCOMJSON.list-item.component_type-->

### 子组件 @children-tags
支持所有组件




### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.list-view.list-item)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=list-item&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=list-item&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=list-item&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=list-item&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=list-item&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=list-item)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=list-item&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

#### App平台

+ App平台scroll-x、scroll-y属性不支持同时设置为true，同时设置true时仅scroll-y生效。4.0版本开始scroll-x、scroll-y已废弃，请使用direction属性。
+ App平台list-view组件默认高度取值：
	- list-view组件的子元素高度之和未超过list-view组件的父元素高度：
		+ list-view组件的默认高度取值为子元素高度之和
	- list-view组件的子元素高度之和超过list-view组件的父元素高度：
		+ 3.9版本list-view组件默认高度取值为list-view组件父元素的高度。子元素高度之和超过list-view组件的高度，list-view组件可滚动。
		+ 4.0版本开始list-view组件的默认高度取值为子元素高度之和。高度相同list-view组件无法滚动。开发者需要设置css属性定义list-view组件高度，让list-view组件高度小于子元素高度之和，实现滚动能力。

#### Web平台

+ web平台仅渲染当前屏幕及上下一定距离的内容，滚动高度为空白容器占位，因此如果使用dom API获取list-item内的元素可能无法取到。
+ scroll-with-animation属性在safari 15.4以下版本不支持
+ 尽量避免在list-item上使用浏览器的[外边距折叠特性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)会导致list-view无法准确计算回收的元素的高度，进而导致滚动出现异常。即不要同时为list-item设置上边距（margin-top）和下边距（margin-bottom）。
