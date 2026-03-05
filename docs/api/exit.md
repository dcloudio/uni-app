<!-- ## uni.exit(options?) @exit -->

::: sourceCode
## uni.exit(options?) @exit

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-exit


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-exit

:::

退出当前应用

### exit 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.91 | 4.33 | 4.33 | 4.71 | 5.0 |


#### app平台差异

##### app-android平台
Android平台的应用退出分热退出和冷退出。
- 冷退出是彻底杀掉
- 热退出是关闭可见的activity，后台进程不退出（比如push）

基本上主流Android App都是热退出。本API也是热退出。

热退出，即通知了os：这个App用户不用了，在os需要时可以回收。如果在os回收之前，用户又启动这个App，会感觉启动速度更快一些。

[uni-app x 原生SDK](../native/README.md)模式中调用本API仅会关闭uni-app x应用。不会关闭宿主应用。

##### app-ios平台
iOS系统自身并没有退出应用的API。

[uni-app x 原生SDK](../native/README.md)模式中支持通过本API关闭uni-app x应用。

##### app-harmony平台
在鸿蒙平台退出时会结束当前 Ability，应用会在最近任务列表中保留快照 [文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#terminateself) /
如果需要在停止 UIAbility 时，清理任务中心的相关任务（即不保留最近任务列表中的快照），需要在 [module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file) 配置文件中将 `removeMissionAfterTerminate` 字段取值配置为 `true`。

[uni-app x 原生SDK](../native/README.md)模式时通过本API关闭uni-app x应用仅会关闭uni-app x实例，不会销毁所在的Ability。


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ExitOptions** | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | uni.exit参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [ExitSuccess](#exitsuccess-values)) => void | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | uni.exit成功回调函数定义 |
| fail | (res: [ExitFail](#exitfail-values)) => void | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | uni.exit失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | uni.exit完成回调函数定义 | 

#### ExitSuccess 的属性值 @exitsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### ExitFail 的属性值 @exitfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 12001 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 系统不支持 |
| 12002 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 未知错误 |
| 12003 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | iOS平台，仅在uni-app x SDK模式中支持应用退出 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.exit)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=exit&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=exit&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=exit&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=exit&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=exit&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=exit)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=exit&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/exit/exit.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/exit/exit.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/exit/exit
```uvue
<template>
  <view>
    <button @tap="exitAppClick">退出应用</button>
    <text>注:iOS仅在uni-app x SDK模式中支持应用退出</text>
  </view>
</template>

<script setup lang="uts">
  const exitAppClick = () => {
    uni.exit({
      success: function (res) {
        console.log(res)
      },
      fail: function(error){
        console.log(error)
      }
    })
  }
</script>

<style>

</style>

```
:::

## 切换应用到后台@back

### Android

有的Android App，点back后不询问用户，直接隐藏到了后台。这种做法占用手机的资源一些，但确实也有一些App是这么做的。

Android的activity提供了将应用切换到后台的方法：
```ts
// #ifdef APP-ANDROID
	UTSAndroid.getUniActivity()?.moveTaskToBack(true)
// #endif
```

### HarmonyOS
在鸿蒙平台可以通过 Ability 的 `moveAbilityToBackground` 方法将应用切换到后台：
```ts
UTSHarmony.getUIAbilityContext().moveAbilityToBackground()
```

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

