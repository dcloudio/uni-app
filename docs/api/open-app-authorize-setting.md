<!-- ## uni.openAppAuthorizeSetting(options) @openappauthorizesetting -->

::: sourceCode
## uni.openAppAuthorizeSetting(options) @openappauthorizesetting

> issues: https://issues.dcloud.net.cn/?mid=api.device.openAppAuthorizeSetting


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-openAppAuthorizeSetting

:::

跳转系统授权管理页

### openAppAuthorizeSetting 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.openAppAuthorizeSetting.html"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","4.51","4.51","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />


_注：App平台其实早期版本也可以使用_

### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **OpenAppAuthorizeSettingOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [OpenAppAuthorizeSettingSuccess](#openappauthorizesettingsuccess-values)) => void | 否 | null | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | 接口调用成功的回调函数 |
| fail | (result: [OpenAppAuthorizeSettingFail](#openappauthorizesettingfail-values)) => void | 否 | null | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | 接口调用失败的回调函数 |
| complete | (result: [OpenAppAuthorizeSettingComplete](#openappauthorizesettingcomplete-values)) => void | 否 | null | Web: x; 微信小程序: 4.41; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### OpenAppAuthorizeSettingSuccess 的属性值 @openappauthorizesettingsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | 错误信息 |

#### OpenAppAuthorizeSettingFail 的属性值 @openappauthorizesettingfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | 错误信息 |

#### OpenAppAuthorizeSettingComplete 的属性值 @openappauthorizesettingcomplete-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | 错误信息 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-app-authorize-setting/open-app-authorize-setting
```uvue
<template>
    <button type="primary" style="margin: 20px;" @tap="go">跳转系统授权管理页</button>
</template>

<script setup lang="ts">
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



### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-app-authorize-setting/open-app-authorize-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-app-authorize-setting/open-app-authorize-setting
```uvue
<template>
    <button type="primary" style="margin: 20px;" @tap="go">跳转系统授权管理页</button>
</template>

<script setup lang="ts">
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


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

