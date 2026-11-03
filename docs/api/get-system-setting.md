<!-- ## uni.getSystemSetting() @getsystemsetting -->

::: sourceCode
## uni.getSystemSetting() @getsystemsetting

> issues: https://issues.dcloud.net.cn/?mid=api.device.getSystemSetting


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getSystemSetting

:::

获取系统设置

### getSystemSetting 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemSetting.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=getSystemSetting&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","3.9","4.11","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />




### 返回值 

| 类型 |
| :- |
| **GetSystemSettingResult** |

#### GetSystemSettingResult 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| bluetoothEnabled | boolean | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 蓝牙是否开启<br/> |
| bluetoothError | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 蓝牙的报错信息<br/> |
| locationEnabled | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 位置是否开启<br/> |
| wifiEnabled | boolean | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | wifi是否开启<br/> |
| wifiError | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: x; HarmonyOS: 4.61 | wifi的报错信息<br/> |
| deviceOrientation | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 设备方向<br/> |

##### deviceOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "portrait" | Web: x | 纵向 |
| "landscape" | Web: x | 横向 | 


## 注意事项

- 如果出现 `bluetoothError`、`wifiError` 非空的情况就说明权限配置错误，需要根据 [文档](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions) 正确配置权限。

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-system-setting/get-system-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-system-setting/get-system-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-system-setting/get-system-setting
```uvue
<template>
  <view>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt">
    <view class="uni-list">
      <view class="uni-list-cell system-setting-cell">
        <view class="system-setting-label">
          <text class="system-info-text">蓝牙的系统开关</text>
        </view>
        <view class="system-setting-value">
          <input class="system-info-input" placeholder-class="system-info-placeholder" type="text" :disabled="true" placeholder="未获取" :value="data.bluetoothEnabled" />
        </view>
      </view>
      <view class="uni-list-cell system-setting-cell">
        <view class="system-setting-label">
          <text class="system-info-text">地理位置的系统开关</text>
        </view>
        <view class="system-setting-value">
          <input class="system-info-input" placeholder-class="system-info-placeholder" type="text" :disabled="true" placeholder="未获取" :value="data.locationEnabled" />
        </view>
      </view>
      <view class="uni-list-cell system-setting-cell">
        <view class="system-setting-label">
          <text class="system-info-text">Wi-Fi 的系统开关</text>
        </view>
        <view class="system-setting-value">
          <input class="system-info-input" placeholder-class="system-info-placeholder" type="text" :disabled="true" placeholder="未获取" :value="data.wifiEnabled" />
        </view>
      </view>
      <!-- #ifndef MP-ALIPAY -->
      <view class="uni-list-cell system-setting-cell">
        <view class="system-setting-label">
          <text class="system-info-text">设备方向</text>
        </view>
        <view class="system-setting-value">
          <input class="system-info-input" placeholder-class="system-info-placeholder" type="text" :disabled="true" placeholder="未获取" :value="data.deviceOrientation" />
        </view>
      </view>
      <!-- #endif -->
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v">
        <button type="primary" @tap="getSystemSetting">获取系统设置</button>
      </view>
    </view>
  </view>
  </view>
</template>

<script setup lang="ts">
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
  .system-setting-cell {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--list-background-color, #ffffff);
  }

  .system-setting-label {
    width: 180px;
    padding-left: 15px;
    background-color: var(--list-background-color, #ffffff);
  }

  .system-setting-value {
    flex: 1;
    background-color: var(--list-background-color, #ffffff);
  }

  .system-info-text,
  .system-info-input {
    color: var(--text-color, #333333);
  }

  .system-info-input {
    height: 24px;
    padding: 0;
    border-width: 0;
    background-color: var(--list-background-color, #ffffff);
  }

  .system-info-placeholder {
    color: var(--active-color, #999999);
  }
</style>

```
:::



## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |


