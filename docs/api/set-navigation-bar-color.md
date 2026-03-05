<!-- ## uni.setNavigationBarColor(options) @setnavigationbarcolor -->

::: sourceCode
## uni.setNavigationBarColor(options) @setnavigationbarcolor

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-navigationBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-navigationBar

:::

设置导航条、状态栏颜色


### setNavigationBarColor 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


注意当pages.json中设置导航栏为custom时：
1. 状态栏的背景色将恒为透明。此时无法通过本API设置状态栏背景色。开发者可自行在状态栏区域放置view，设置背景色。
2. 本API设置前景色frontColor时，会修改状态栏的前景色。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetNavigationBarColorOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| frontColor | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000 |
| backgroundColor | [string.ColorString](/uts/data-type.md#ide-string) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 背景颜色值，有效值为十六进制颜色 |
| success | (result: [SetNavigationBarColorSuccess](#setnavigationbarcolorsuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (error: [SetNavigationBarColorFail](#setnavigationbarcolorfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (res: [SetNavigationBarColorComplete](#setnavigationbarcolorcomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） |
| animation | **SetNavigationBarColorOptionsAnimation** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 动画效果<br/> |

##### frontColor 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| #ffffff | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| #000000 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### animation 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| duration | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 动画变化时间，单位 ms<br/> |
| timingFunc | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 动画变化方式<br/><br/>可选值：<br/>- 'linear': 动画从头到尾的速度是相同的;<br/>- 'easeIn': 动画以低速开始;<br/>- 'easeOut': 动画以低速结束;<br/>- 'easeInOut': 动画以低速开始和结束;<br/> |

###### timingFunc 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| linear | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| easeIn | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| easeOut | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| easeInOut | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 

#### SetNavigationBarColorSuccess 的属性值 @setnavigationbarcolorsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SetNavigationBarColorFail 的属性值 @setnavigationbarcolorfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 设置导航栏字体颜色错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SetNavigationBarColorComplete 的属性值 @setnavigationbarcolorcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**SetNavigationBarColorSuccess**> | 否 |

#### Promise\<SetNavigationBarColorSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/set-navigation-bar-color/set-navigation-bar-color.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/set-navigation-bar-color/set-navigation-bar-color.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/set-navigation-bar-color/set-navigation-bar-color

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/set-navigation-bar-color/set-navigation-bar-color

>示例
```vue
<template>
  <page-head title="setNavigationBarColor"></page-head>
  <view class="uni-padding-wrap uni-common-mt">
    <button @tap="setNavigationBarColor1" class="uni-btn">
      设置导航条背景绿色，标题白色
    </button>
    <button @tap="setNavigationBarColor2" class="uni-btn">
      设置导航条背景红色，标题黑色
    </button>
    <button @tap="goNavbarLite" class="uni-btn">
      跳转自定义导航栏页面
    </button>
  </view>
</template>

<script setup lang="uts">
  import { state, setLifeCycleNum } from '@/store/index.uts'

  // 自动化测试
  const getLifeCycleNum = () : number => {
    return state.lifeCycleNum
  }

  // 自动化测试
  const setLifeCycleNumFunc = (num : number) => {
    setLifeCycleNum(num)
  }

  const setNavigationBarColor1 = () => {
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#00ff00',
      success: () => {
        console.log('setNavigationBarColor success')
        setLifeCycleNumFunc(state.lifeCycleNum + 1)
      },
      fail: () => {
        console.log('setNavigationBarColor fail')
        setLifeCycleNumFunc(state.lifeCycleNum - 1)
      },
      complete: () => {
        console.log('setNavigationBarColor complete')
        setLifeCycleNumFunc(state.lifeCycleNum + 1)
      }
    })
  }

  const setNavigationBarColor2 = () => {
    uni.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ff0000',
      success: () => {
        console.log('setNavigationBarColor success')
        setLifeCycleNumFunc(state.lifeCycleNum + 1)
      },
      fail: () => {
        console.log('setNavigationBarColor fail')
        setLifeCycleNumFunc(state.lifeCycleNum - 1)
      },
      complete: () => {
        console.log('setNavigationBarColor complete')
        setLifeCycleNumFunc(state.lifeCycleNum + 1)
      }
    })
  }

  const goNavbarLite = () => {
    uni.navigateTo({
      url: '/pages/template/navbar-lite/navbar-lite'
    })
  }

  defineExpose({
    getLifeCycleNum,
    setLifeCycleNum: setLifeCycleNumFunc,
    setNavigationBarColor1,
    setNavigationBarColor2
  })
</script>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setNavigationBarColor)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#setnavigationbarcolor)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarColor.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setNavigationBarColor&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setNavigationBarColor&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setNavigationBarColor&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setNavigationBarColor&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setNavigationBarColor)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setNavigationBarColor&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Bug & Tips @tips
- app-android平台，受系统限制，通过frontColor修改状态栏前景色仅在Android6.0及以上版本生效。
