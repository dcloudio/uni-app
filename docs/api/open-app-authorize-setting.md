<!-- ## uni.openAppAuthorizeSetting(options) @openappauthorizesetting -->

::: sourceCode
## uni.openAppAuthorizeSetting(options) @openappauthorizesetting

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-openAppAuthorizeSetting


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-openAppAuthorizeSetting

:::

跳转系统授权管理页

### openAppAuthorizeSetting 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.51 | 4.51 | 4.51 | 4.61 | 5.0 |


_注：App平台其实早期版本也可以使用_

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OpenAppAuthorizeSettingOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [OpenAppAuthorizeSettingSuccess](#openappauthorizesettingsuccess-values)) => void | 否 | null | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [OpenAppAuthorizeSettingFail](#openappauthorizesettingfail-values)) => void | 否 | null | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [OpenAppAuthorizeSettingComplete](#openappauthorizesettingcomplete-values)) => void | 否 | null | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### OpenAppAuthorizeSettingSuccess 的属性值 @openappauthorizesettingsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 错误信息 |

#### OpenAppAuthorizeSettingFail 的属性值 @openappauthorizesettingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 错误信息 |

#### OpenAppAuthorizeSettingComplete 的属性值 @openappauthorizesettingcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 错误信息 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-app-authorize-setting/open-app-authorize-setting
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <button type="primary" style="margin: 20px;" @tap="go">跳转系统授权管理页</button>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  const go = () => {
    uni.openAppAuthorizeSetting({
      success (res) {
        console.log(res)
      }
    })
  }

  defineExpose({
    go
  })
</script>

<style>

</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.openAppAuthorizeSetting)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/system/openappauthorizesetting)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.openAppAuthorizeSetting.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=openAppAuthorizeSetting&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=openAppAuthorizeSetting&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=openAppAuthorizeSetting&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=openAppAuthorizeSetting&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=openAppAuthorizeSetting)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=openAppAuthorizeSetting&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-app-authorize-setting/open-app-authorize-setting
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <button type="primary" style="margin: 20px;" @tap="go">跳转系统授权管理页</button>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  const go = () => {
    uni.openAppAuthorizeSetting({
      success (res) {
        console.log(res)
      }
    })
  }

  defineExpose({
    go
  })
</script>

<style>

</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

