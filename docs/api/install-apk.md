<!-- ## uni.installApk(options) @installapk -->

::: sourceCode
## uni.installApk(options) @installapk

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-installApk


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-installApk

:::

安装apk

注意：仅支持本地文件路径，网络路径需先通过 [uni.downloadFile](download-file.md) 下载到本地再调用此 API 安装。

### installApk 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.94 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


安装Apk最常见的场景是App的升级，更推荐使用uni的[App升级中心](https://doc.dcloud.net.cn/uniCloud/upgrade-center.html)，这是一个云端一体开源项目，想达到该项目的体验细节需要大量代码，不如直接拿走使用。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **InstallApkOptions** | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | apk文件地址（仅支持本地文件路径） |
| success | (res: [InstallApkSuccess](#installapksuccess-values)) => void | 否 | null | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (err: [InstallApkFail](#installapkfail-values)) => void | 否 | null | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | null | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### InstallApkSuccess 的属性值 @installapksuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 安装成功消息 |

#### InstallApkFail 的属性值 @installapkfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 错误码<br/>- 1300002 找不到文件 |
| errSubject | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.installApk)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/install-apk/install-apk.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/install-apk/install-apk.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/install-apk/install-apk
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <page-head :title="title"></page-head>
      <view class="uni-common-mt">
        <view class="uni-padding-wrap">
          <view class="uni-btn-v">
            <button type="primary" @tap="installApk">
              installApk
            </button>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  const title = ref('installApk')
  const installApk = () => {
    uni.installApk({
      filePath: "/static/app-android/test.apk",
      complete(res : any) {
        console.log(res);
      }
    })
  }
</script>


```
:::

## Tips
- HBuilderX 3.99以前，uni.install是ext api，需单独[下载](https://ext.dcloud.net.cn/plugin?id=15118)。从HBuilderX 3.99起 uni-app x 内置了该api，无需再单独下载。

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

