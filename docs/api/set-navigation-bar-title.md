<!-- ## uni.setNavigationBarTitle(options) @setnavigationbartitle -->

::: sourceCode
## uni.setNavigationBarTitle(options) @setnavigationbartitle

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-navigationBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-navigationBar

:::

动态设置当前页面的标题


### setNavigationBarTitle 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.97 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetNavigationBarTitleOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.97; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 页面标题 |
| success | (result: [SetNavigationBarTitleSuccess](#setnavigationbartitlesuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.97; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (error: [SetNavigationBarTitleFail](#setnavigationbartitlefail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.97; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (res: [SetNavigationBarTitleComplete](#setnavigationbartitlecomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.97; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SetNavigationBarTitleSuccess 的属性值 @setnavigationbartitlesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SetNavigationBarTitleFail 的属性值 @setnavigationbartitlefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 设置导航栏标题错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SetNavigationBarTitleComplete 的属性值 @setnavigationbartitlecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**SetNavigationBarTitleSuccess**> | 否 |

#### Promise\<SetNavigationBarTitleSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setNavigationBarTitle)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#setnavigationbartitle)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setNavigationBarTitle&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setNavigationBarTitle&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setNavigationBarTitle&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setNavigationBarTitle&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setNavigationBarTitle)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setNavigationBarTitle&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/set-navigation-bar-title/set-navigation-bar-title.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/set-navigation-bar-title/set-navigation-bar-title.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/set-navigation-bar-title/set-navigation-bar-title

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/set-navigation-bar-title/set-navigation-bar-title

>示例
```vue
<template>
  <page-head title="setNavigationBarTitle"></page-head>
  <view class="uni-padding-wrap uni-common-mt">
    <button @tap="setNavigationBarNewTitle" class="uni-btn">
      设置当前页面标题为: {{ newTitle }}
    </button>
    <button @tap="setNavigationBarLongTitle" class="uni-btn">
      设置超长标题
    </button>
    <!-- #ifndef VUE3-VAPOR -->
    <!-- #ifdef APP-HARMONY -->
    <button @tap="showNavigationBarLoading" class="uni-btn">
      设置标题 loading
    </button>
    <button @tap="hideNavigationBarLoading" class="uni-btn">
      隐藏标题 loading
    </button>
    <!-- #endif -->
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
  import { state, setLifeCycleNum } from '@/store/index.uts'

  const newTitle = ref('new title')
  const longTitle = ref('long title long title long title long title long title long title long title long title long title long title')

  // 自动化测试
  const getLifeCycleNum = () : number => {
    return state.lifeCycleNum
  }

  // 自动化测试
  const setLifeCycleNumFunc = (num : number) => {
    setLifeCycleNum(num)
  }

  // #ifdef APP-HARMONY
  const showNavigationBarLoading = () => {
    uni.showNavigationBarLoading({
      success: () => {
        console.log('showNavigationBarLoading success')
      },
      fail: () => {
        console.log('showNavigationBarLoading fail')
      },
      complete: () => {
        console.log('showNavigationBarLoading complete')
      }
    })
  }

  const hideNavigationBarLoading = () => {
    uni.hideNavigationBarLoading({
      success: () => {
        console.log('hideNavigationBarLoading success')
      },
      fail: () => {
        console.log('hideNavigationBarLoading fail')
      },
      complete: () => {
        console.log('hideNavigationBarLoading complete')
      }
    })
  }
  // #endif

  const setNavigationBarNewTitle = () => {
    uni.setNavigationBarTitle({
      title: newTitle.value,
      success: () => {
        console.log('setNavigationBarTitle success')
        setLifeCycleNumFunc(state.lifeCycleNum + 1)
      },
      fail: () => {
        console.log('setNavigationBarTitle fail')
        setLifeCycleNumFunc(state.lifeCycleNum - 1)
      },
      complete: () => {
        console.log('setNavigationBarTitle complete')
        setLifeCycleNumFunc(state.lifeCycleNum + 1)
      }
    })
  }

  const setNavigationBarLongTitle = () => {
    uni.setNavigationBarTitle({
      title: longTitle.value,
      success() {
        console.log('setNavigationBarTitle success')
      },
      fail() {
        console.log('setNavigationBarTitle fail')
      },
      complete() {
        console.log('setNavigationBarTitle complete')
      }
    })
  }

  defineExpose({
    getLifeCycleNum,
    setLifeCycleNum: setLifeCycleNumFunc,
    setNavigationBarNewTitle,
    setNavigationBarLongTitle
  })
</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

