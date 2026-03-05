<!-- ## uni.getSystemSetting() @getsystemsetting -->

::: sourceCode
## uni.getSystemSetting() @getsystemsetting

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getSystemSetting


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getSystemSetting

:::

获取系统设置

### getSystemSetting 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |




### 返回值 

| 类型 |
| :- |
| **GetSystemSettingResult** |

#### GetSystemSettingResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| bluetoothEnabled | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 蓝牙是否开启<br/> |
| bluetoothError | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 蓝牙的报错信息<br/> |
| locationEnabled | boolean | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 位置是否开启<br/> |
| wifiEnabled | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | wifi是否开启<br/> |
| wifiError | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | wifi的报错信息<br/> |
| deviceOrientation | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备方向<br/> |

##### deviceOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| portrait | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 纵向 |
| landscape | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横向 | 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-system-setting/get-system-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-system-setting/get-system-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-system-setting/get-system-setting
```uvue
<template>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">蓝牙的系统开关</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.bluetoothEnabled" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">地理位置的系统开关</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.locationEnabled" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">Wi-Fi 的系统开关</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.wifiEnabled" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">设备方向</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.deviceOrientation" />
        </view>
      </view>
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v">
        <button type="primary" @tap="getSystemSetting">获取系统设置</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="uts">
  type DataType = {
    bluetoothEnabled: string;
    locationEnabled: string;
    wifiEnabled: string;
    deviceOrientation: string;
  }

  const title = ref('getSystemSetting')
  const data = reactive({
    bluetoothEnabled: "",
    locationEnabled: "",
    wifiEnabled: "",
    deviceOrientation: ""
  } as DataType)

  const getSystemSetting = () => {
    const res = uni.getSystemSetting();
    data.bluetoothEnabled = (res.bluetoothEnabled ?? false) ? "开启" : "关闭";
    data.locationEnabled = res.locationEnabled ? "开启" : "关闭";
    data.wifiEnabled = (res.wifiEnabled ?? false) ? "开启" : "关闭";
    data.deviceOrientation = res.deviceOrientation

    if (res.bluetoothError != null) {
      data.bluetoothEnabled = "无蓝牙权限"
    }

    if (res.wifiError != null) {
      data.wifiEnabled = "无WiFi权限"
    }
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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getSystemSetting)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemSetting.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getSystemSetting&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getSystemSetting&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getSystemSetting&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getSystemSetting&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getSystemSetting)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getSystemSetting&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

