<!-- ## uni.getDeviceInfo(options?) @getdeviceinfo -->

::: sourceCode
## uni.getDeviceInfo(options?) @getdeviceinfo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getDeviceInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getDeviceInfo

:::

获取设备信息

### getDeviceInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetDeviceInfoOptions** | 否 | 包含所有字段的过滤对象 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | \[options=包含所有字段的过滤对象]过滤的字段对象, 不传参数默认为获取全部字段。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filter | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: -; Android: 3.9; iOS: -; HarmonyOS: x | 过滤字段的字符串数组，假如要获取指定字段，传入此数组。 | 


### 返回值 

| 类型 |
| :- |
| **GetDeviceInfoResult** |

#### GetDeviceInfoResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| deviceBrand | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备品牌<br/> |
| deviceId | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备 id 。由 uni-app 框架生成并存储，清空 Storage 会导致改变<br/> |
| deviceModel | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备型号<br/> |
| deviceType | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备类型phone、pad、pc<br/> |
| deviceOrientation | string | 否 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备方向 竖屏 portrait、横屏 landscape<br/> |
| devicePixelRatio | number | 否 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备像素比<br/> |
| system | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统及版本<br/> |
| platform | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 客户端平台<br/> |
| isRoot | boolean | 否 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 是否root。iOS 为是否越狱<br/> |
| isUSBDebugging | boolean | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: x | adb是否开启<br/> |
| osName | string | 否 | - | Web: 4.18; 微信小程序: 4.41; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 系统名称<br/> |
| osVersion | string | 否 | - | Web: 4.18; 微信小程序: 4.41; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统版本。如 ios 版本，andriod 版本<br/> |
| osLanguage | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统语言<br/> |
| osTheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统主题<br/> |
| osAndroidAPILevel | number | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: x; HarmonyOS: x | Android 系统API库的版本。<br/> |
| osHarmonySDKAPIVersion | number | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 鸿蒙系统软件API版本<br/> |
| osHarmonyDisplayVersion | string | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 产品版本，关于本机信息内的软件版本<br/> |
| romName | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | rom 名称。Android 部分机型获取不到值。iOS 恒为 `ios`<br/> |
| romVersion | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | rom 版本号。Android 部分机型获取不到值。iOS 为操作系统版本号（同 `osVersion`）。<br/> |
| abi | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 应用（微信APP）二进制接口类型（仅 Android 支持）<br/> |
| benchmarkLevel | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  |
| cpuType | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.29.0`<br/><br/>设备 CPU 型号（仅 Android 支持）（Tips: GPU 型号可通过 WebGLRenderingContext.getExtension('WEBGL_debug_renderer_info') 来获取）<br/> |
| deviceAbi | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.25.1`<br/><br/>设备二进制接口类型（仅 Android 支持）<br/> |
| memorySize | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.30.0`<br/><br/>设备内存大小，单位为 MB<br/> |
| ~~brand~~ | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 设备品牌  **已废弃，仅为了向下兼容保留** |
| ~~model~~ | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 设备型号  **已废弃，仅为了向下兼容保留** |
| ~~isSimulator~~ | boolean | 否 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 是否是模拟器<br/>  **已废弃，由于合规问题在4.51版本后不会采集传感器信息，会影响准确度，建议使用`isSimulator()`代替。** | 

##### deviceType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| phone | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pad | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| tv | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| watch | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pc | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| car | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| vr | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| appliance | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### platform 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ios | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| android | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| harmonyos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mac | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| windows | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| linux | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### osName 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ios | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| android | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| harmonyos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| macos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| windows | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| linux | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### osTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |


::: warning 注意事项
- 获取OAID、AndroidID等其他设备信息，[见插件市场](https://ext.dcloud.net.cn/search?q=oaid&orderBy=Relevance&uni-appx=1)
- romName值域候选 [详见](./get-system-info.md#romname)
- app平台devicePixelRatio属性，HBuilderX4.22及以下版本类型为string，HBuilderX4.23版本调整为number
- 在4.51以前，调用本api会获取传感器列表，原因是isSimulator属性判断模拟器时，需要根据传感器信息才能做出更准确的判断。但是，应用商店不允许在同意隐私协议前调用传感器。解决方案有2个：1、在同意隐私协议之后再调用，且隐私协议里声明调用传感器的用途；2、按需加载需要的信息，例如下面的代码，只获取品牌，不获取isSimulator：
```
uni.getDeviceInfo({filter:["brand"]})
```
从4.51+，本api的isSimulator调整为不再获取传感器信息，但判断模拟器的准确度会下降。如需更准确的判断模拟器，需要单独使用uni.isSimulator。注意也需要在同意隐私协议之后获取。
:::

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-device-info/get-device-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-device-info/get-device-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-device-info/get-device-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-device-info/get-device-info

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view>
      <page-head :title="title"></page-head>
      <view class="uni-common-mt">
        <view class="uni-list">
          <view class="uni-list">
            <view class="uni-list-cell" v-for="(item, _) in data.items" style="align-items: center">
              <view class="uni-pd">
                <view class="uni-label" style="width: 180px">{{
                  item.label
                }}</view>
              </view>
              <view class="uni-list-cell-db">
                <text class="uni-list-cell-db-text">{{
                  item.value == "" ? "未获取" : item.value
                }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="uni-padding-wrap">
          <view class="uni-btn-v">
            <button type="primary" @tap="getDeviceInfo">获取设备信息</button>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  import { setDevicePixelRatio } from '@/store/index.uts'

  type Item = {
    label : string,
    value : string,
  }

  type DataType = {
    items: Item[];
  }

  const title = ref('getDeviceInfo')
  const data = reactive({
    items: [] as Item[],
  } as DataType)

  const getDeviceInfo = () => {
    const res = uni.getDeviceInfo();
    // 获取像素比, 供截图对比使用
    setDevicePixelRatio(res.devicePixelRatio !== null ? res.devicePixelRatio! : 1)
    data.items = [] as Item[];

    const res_str = JSON.stringify(res);
    const res_obj = JSON.parseObject(res_str);
    const res_map = res_obj!.toMap();
    let keys = [] as string[]
    res_map.forEach((_, key) => {
      keys.push(key);
    });
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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getDeviceInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/getDeviceInfo.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getDeviceInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getDeviceInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getDeviceInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getDeviceInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getDeviceInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getDeviceInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getDeviceInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

