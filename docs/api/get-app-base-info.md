<!-- ## uni.getAppBaseInfo(options?) @getappbaseinfo -->

::: sourceCode
## uni.getAppBaseInfo(options?) @getappbaseinfo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getAppBaseInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getAppBaseInfo

:::

获取app基本信息

### getAppBaseInfo 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetAppBaseInfoOptions** | 否 | 包含所有字段的过滤对象 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | \[options=包含所有字段的过滤对象] 过滤的字段对象, 不传参数默认为获取全部字段。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filter | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 过滤字段的字符串数组，假如要获取指定字段，传入此数组。 | 


### 返回值 

| 类型 |
| :- |
| **GetAppBaseInfoResult** |

#### GetAppBaseInfoResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appId | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | manifest.json 中应用appid，即DCloud appid。<br/> |
| appName | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用名称。<br/> |
| appVersion | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用版本名称，如果离线打包注意修改修改index.kt中UniAppConfig类型中的版本名称[文档](https://doc.dcloud.net.cn/uni-app-x/native/use/android.html#%E6%8B%B7%E8%B4%9Dkt%E6%96%87%E4%BB%B6)。<br/> |
| appVersionCode | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | `manifest.json` 中应用版本号，如果离线打包注意修改修改index.kt中UniAppConfig类型中的版本号[文档](https://doc.dcloud.net.cn/uni-app-x/native/use/android.html#%E6%8B%B7%E8%B4%9Dkt%E6%96%87%E4%BB%B6)。<br/> |
| appLanguage | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | 应用设置的语言en、zh-Hans、zh-Hant、fr、es<br/> |
| language | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | 应用设置的语言<br/> |
| appWgtVersion | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用资源（wgt）的版本名称。<br/> |
| hostLanguage | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 小程序宿主语言<br/> |
| hostVersion | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | App、小程序宿主版本。<br/> |
| hostName | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 小程序宿主名称<br/> |
| hostPackageName | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 小程序宿主包名<br/> |
| hostSDKVersion | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | uni小程序SDK版本、小程序客户端基础库版本<br/> |
| hostTheme | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 系统当前主题，取值为light或dark。微信小程序全局配置"darkmode":true时才能获取，否则为 null （不支持小游戏）<br/> |
| isUniAppX | boolean | 否 | - | Web: 4.18; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | 是否uni-app x<br/> |
| uniCompilerVersion | string | 否 | - | Web: 4.18; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本<br/> |
| uniPlatform | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni-app 运行平台。<br/> |
| uniRuntimeVersion | string | 否 | - | Web: 4.18; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | uni 运行时版本<br/> |
| uniCompilerVersionCode | number | 否 | - | Web: 4.18; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本号<br/> |
| uniRuntimeVersionCode | number | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 运行时版本号<br/> |
| packageName | string | 否 | - | Web: x; 微信小程序: x; Android: 3.97; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Android的包名<br/> |
| bundleName | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 鸿蒙的包名<br/> |
| bundleId | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | iOS的bundleId<br/> |
| signature | string | 否 | - | Web: x; 微信小程序: x; Android: 3.97; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | Android: 应用签名证书的SHA1值（全部为小写，中间不包含“:”）。<br/>iOS: 应用签名证书中绑定的Bundle ID（AppleID）的md5值（全部为小写）。<br/> |
| appTheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; iOS uni-app x UTS 插件: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前App的主题<br/> |
| channel | string | 否 | - | Web: x; 微信小程序: x; Android: 4.28; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: x | 当前应用分发的渠道<br/> |
| SDKVersion | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 客户端基础库版本<br/> |
| enableDebug | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  |
| fontSizeScaleFactor | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 微信字体大小缩放比例<br/> |
| fontSizeSetting | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.23.4`<br/><br/>微信字体大小，单位px<br/> |
| host | **GetAppBaseInfoResultHost** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前小程序运行的宿主环境<br/> |
| theme | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 系统当前主题，取值为`light`或`dark`，全局配置`"darkmode":true`时才能获取，否则为 undefined （不支持小游戏）<br/><br/>可选值：<br/>- 'dark': 深色主题;<br/>- 'light': 浅色主题;<br/> |
| ~~version~~ | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 引擎版本号。已废弃，仅为了向下兼容保留  **已废弃，仅为了向下兼容保留** |
| ~~uniCompileVersion~~ | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | uni 编译器版本  **已废弃，仅为了向下兼容保留** |
| ~~uniCompileVersionCode~~ | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本号  **已废弃，仅为了向下兼容保留** | 

##### uniPlatform 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| app | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| web | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-weixin | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-alipay | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-baidu | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-toutiao | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-lark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-qq | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-kuaishou | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-jd | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-360 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview-union | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview-huawei | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### appTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| auto | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### host 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appId | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 宿主 app（第三方App） 对应的 appId （当小程序运行在第三方App环境时才返回）<br/> |

##### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |


#### appTheme @apptheme
获取应用的主题配置信息，仅app平台支持。
appTheme返回值为`auto`，代表跟随系统。此时需通过[getSystemInfo](./get-system-info.md)或[getDeviceInfo](./get-device-info.md)查询osTheme获取当前到底是light还是dark。

#### channel @channel
获取应用的渠道信息，仅app-android平台支持渠道包。
- 云打包时需在“App打包”界面中配置，详情参考[配置渠道包](../tutorial/app-package.md#channel)。
- 离线打包时需在原生工程中配置，详情参考[Android平台配置应用渠道包](../native/use/android.md#androidmanifest)


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-app-base-info/get-app-base-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-app-base-info/get-app-base-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-app-base-info/get-app-base-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-app-base-info/get-app-base-info

>示例
```vue
<template>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt">
    <view class="uni-list">
      <view class="uni-list-cell" v-for="(item, index) in data.items" :key="index" style="align-items: center;">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">{{item.label}}</view>
        </view>
        <view class="uni-list-cell-db">
          <text class="uni-list-cell-db-text">{{ item.value == '' ? '未获取' : item.value }}</text>
        </view>
      </view>
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v">
        <button type="primary" @tap="getAppBaseInfo">获取App基础信息</button>
      </view>
    </view>
  </view>
</template>
<script setup lang="uts">
  type Item = {
    label : string,
    value : string,
  }

  type DataType = {
    items: Item[];
  }

  const title = ref('getAppBaseInfo')
  const data = reactive({
    items: [] as Item[],
  } as DataType)

  const getAppBaseInfo = () => {
    const res = uni.getAppBaseInfo();
    const res_str = JSON.stringify(res);
    const res_obj = JSON.parseObject(res_str);
    const res_map = res_obj!.toMap();
    let keys = [] as string[]
    res_map.forEach((_, key) => {
      keys.push(key);
    });

    data.items = [] as Item[];
    keys.sort().forEach(key => {
      const value = res[key];
      if (value != null) {
        const item = {
          label: key,
          value: "" + ((typeof value == "object") ? JSON.stringify(value) : value)
        } as Item;
        data.items.push(item);
      }
    });
  }

</script>

<style>
  .uni-pd {
    padding-left: 15px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getAppBaseInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/getAppBaseInfo.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getAppBaseInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getAppBaseInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getAppBaseInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getAppBaseInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getAppBaseInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getAppBaseInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getAppBaseInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

