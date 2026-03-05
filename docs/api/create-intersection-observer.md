## uni.createIntersectionObserver(component, options) @createintersectionobserver

创建并返回一个 IntersectionObserver 对象实例


### createIntersectionObserver 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| component | any | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |
| options | **CreateIntersectionObserverOptions** | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| thresholds | Array&lt;any&gt; | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 所有阈值 |
| initialRatio | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 初始的相交比例 |
| observeAll | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 是否同时观测多个参照节点（而非一个） |
| nativeMode | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 需要基础库： `3.5.7`<br/><br/>是否使用原生观察器模式。<br/> | 


### 返回值 

| 类型 |
| :- |
| [IntersectionObserver](#intersectionobserver-values) |

#### IntersectionObserver 的方法 @intersectionobserver-values 

#### relativeTo(selector: string, margins?: any): IntersectionObserver; @relativeto
relativeTo
使用选择器指定一个节点，作为参照区域之一
##### relativeTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| selector | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |
| margins | any | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

##### 返回值 

| 类型 |
| :- |
| [IntersectionObserver](#intersectionobserver-values) |
 

#### relativeToViewport(margins?: any): IntersectionObserver; @relativetoviewport
relativeToViewport
指定页面显示区域作为参照区域之一
##### relativeToViewport 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| margins | any | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

##### 返回值 

| 类型 |
| :- |
| [IntersectionObserver](#intersectionobserver-values) |
 

#### observe(targetSelector: string, callback: ObserveCallback): void; @observe
observe
指定目标节点并开始监听相交状态变化情况
##### observe 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| targetSelector | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |
| callback | (result: [ObserveResult](#observeresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

##### ObserveResult 的属性值 @observeresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| intersectionRatio | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 相交比例 |
| intersectionRect | any | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 相交区域的边界 |
| boundingClientRect | **ObserveNodeRect** | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 目标节点布局区域的边界 |
| relativeRect | [ObserveNodeRect](#observenoderect-values) | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 参照区域的边界 |
| time | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 相交检测时的时间戳 |

#### boundingClientRect 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | left |
| right | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | right |
| top | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | top |
| bottom | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | bottom |


#### disconnect(): void; @disconnect
disconnect
停止监听
##### disconnect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | x | x | x |


 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-intersection-observer/create-intersection-observer.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-intersection-observer/create-intersection-observer.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/create-intersection-observer/create-intersection-observer

>示例
```vue
<template>
	<view>
		<page-head :title="data.title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">
				{{data.appear ? '小球出现' : '小球消失'}}
			</view>
			<scroll-view class="scroll-view" :scrollTop="data.scrollTop">
				<view class="scroll-area">
					<text class="notice">向下滚动让小球出现</text>
					<view class="ball"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script setup lang="uts">
  let observer: IntersectionObserver | null = null;

  type DataType = {
    appear: boolean;
    title: string;
    testRes: ObserveResult | null;
    scrollTop: number;
  }

  const data = reactive({
    appear: false,
    title: 'intersectionObserver',
    testRes: null,
    scrollTop: 0
  } as DataType)

  onReady(() => {
    observer = uni.createIntersectionObserver(getCurrentInstance()!.proxy!, {});
    observer.relativeTo('.scroll-view').observe('.ball', (res: ObserveResult) => {
      data.testRes = res;
      if (res.intersectionRatio > 0 && !data.appear) {
        data.appear = true;
      } else if (res.intersectionRatio <= 0 && data.appear) {
        data.appear = false;
      }
    })
  })

  onUnload(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  defineExpose({
    data
  })
</script>
<style>
	.scroll-view {
		height: 200px;
		background: #fff;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}

	.scroll-area {
		height: 650px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.notice {
		margin-top: 75px;
		margin:75px 0 200px 0;
	}

	.ball {
		width: 100px;
		height: 100px;
		background: #4cd964;
		border-radius: 100px;
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.createIntersectionObserver)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/intersection-observer.html#createintersectionobserver)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/IntersectionObserver.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createIntersectionObserver&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createIntersectionObserver&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createIntersectionObserver&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createIntersectionObserver&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createIntersectionObserver)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createIntersectionObserver&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

