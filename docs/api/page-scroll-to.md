<!-- ## uni.pageScrollTo(options) @pagescrollto -->

::: sourceCode
## uni.pageScrollTo(options) @pagescrollto

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-pageScrollTo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-pageScrollTo

:::

将页面滚动到目标位置


可以滚动到指定的scrollTop值处，也可以滚动到指定的目标元素处（通过css选择器selector）, 仅支持一级 class。

本API滚动的是栈顶的页面。

app-uvue下，其实没有页面级滚动。但本API做了一定兼容，当页面的根元素为scroll-view时，本API也会滚动该scroll-view。[详见](../css/README.md#pagescroll)

### pageScrollTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **PageScrollToOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| scrollTop | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 滚动到页面的目标位置 |
| selector | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 选择器 |
| offsetTop | number | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 偏移距离，可以滚动到 selector 加偏移距离的位置 |
| duration | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 滚动动画的时长 |
| success | (result: [PageScrollToSuccess](#pagescrolltosuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [PageScrollToFail](#pagescrolltofail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [PageScrollToComplete](#pagescrolltocomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### PageScrollToSuccess 的属性值 @pagescrolltosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### PageScrollToFail 的属性值 @pagescrolltofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 设置页面滚动错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### PageScrollToComplete 的属性值 @pagescrolltocomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


`scrollTop` 和 `selector` 必须指定其中一个属性，否者触发 `fail` 回调

### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**PageScrollToSuccess**> | 否 |

#### Promise\<PageScrollToSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/page-scroll-to/page-scroll-to.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/page-scroll-to/page-scroll-to.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/page-scroll-to/page-scroll-to

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/page-scroll-to/page-scroll-to

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1" scroll-with-animation="true">
  <!-- #endif -->
    <view class="uni-padding-wrap">
      <page-head :title="title"></page-head>
      <button type="default" class="btn-scrollTo" @click="scrollTo">
        scrollTo
      </button>
      <button type="default" class="btn-scrollToElement" @click="scrollToElement">
        scrollToElement
      </button>
      <view class="uni-list" v-for="(_, index) in 10" :key="index">
        <view class="uni-list-cell list-item">{{ index }}</view>
      </view>
      <view class="custom-element">scrollTo-custom-element</view>
      <view class="uni-list" v-for="(_, index2) in 10" :key="index2">
        <view class="uni-list-cell list-item">{{ index2 }}</view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  const title = ref('pageScrollTo')

  const scrollTo = () => {
    uni.pageScrollTo({
      scrollTop: 100,
      duration: 300,
      success: () => {
        console.log('success')
      },
    })
  }

  const scrollToElement = () => {
    uni.pageScrollTo({
      selector: '.custom-element',
      duration: 300,
      success: () => {
        console.log('success')
      },
    })
  }

  defineExpose({
    scrollTo
  })

</script>

<style>
  .list-item {
    height: 100px;
    padding-left: 30px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.pageScrollTo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/scroll.html#pagescrollto)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=pageScrollTo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=pageScrollTo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=pageScrollTo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=pageScrollTo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=pageScrollTo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=pageScrollTo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

**selector 语法**

selector类似于 CSS 的选择器，但仅支持下列语法。

- ID选择器：#the-id
- class选择器（可以连续指定多个）：`.a-class.another-class`
- 子元素选择器：`.the-parent > .the-child`
- 后代选择器：`.the-ancestor .the-descendant`
- 跨自定义组件的后代选择器：`.the-ancestor >>> .the-descendant`
- 多选择器的并集：`#a-node, .some-other-nodes`

## uni-app x 注意事项

1. app-uvue支持的选择器较少，不支持ID选择器，[详见](../css/common/selector.md)
2. app-uvue的页面滚动，是由页面最外层的scroll-view模拟的，如果页面最外层不是scroll-view，无法使用本api。[详见](../css/README.md#pagescroll)
3. app-uvue的scroll-view滚动时，如需动画，则需要在scroll-view的属性中配置 `scroll-with-animation="true"`，[详见](../component/scroll-view.md)
4. scroll-view的滚动，设置其scrollTop即可。[详见](../component/scroll-view.md)

**示例**

```javascript
uni.pageScrollTo({
	scrollTop: 0,
	duration: 300
});
```

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

