<!-- ## uni.getAppAuthorizeSetting() @getappauthorizesetting -->

::: sourceCode
## uni.getAppAuthorizeSetting() @getappauthorizesetting

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getAppAuthorizeSetting


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getAppAuthorizeSetting

:::

获取 APP 授权设置。

### getAppAuthorizeSetting 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |




### 返回值 

| 类型 |
| :- |
| **GetAppAuthorizeSettingResult** |

#### GetAppAuthorizeSettingResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| albumAuthorized | string | 是 | - | Web: x; 微信小程序: -; Android: 4.25; iOS: 4.11; HarmonyOS: - | 允许 App 使用相册的开关<br/> |
| bluetoothAuthorized | string | 是 | - | Web: x; 微信小程序: -; Android: 4.25; iOS: 4.11; HarmonyOS: - | 允许 App 使用蓝牙的开关<br/> |
| cameraAuthorized | string | 是 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 允许 App 使用摄像头的开关<br/> |
| locationAuthorized | string | 是 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 允许 App 使用定位的开关<br/> |
| locationAccuracy | string | 否 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 定位准确度。<br/> |
| locationReducedAccuracy | boolean | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: 4.11; HarmonyOS: - | 定位准确度（推荐使用 locationAccuracy 属性）。true 表示模糊定位，false 表示精确定位（仅 iOS 支持） |
| microphoneAuthorized | string | 是 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 允许 App 使用麦克风的开关<br/> |
| notificationAuthorized | string | 是 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: - | 允许 App 通知的开关<br/> |
| notificationAlertAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: 4.11; HarmonyOS: - | 允许 App 通知带有提醒的开关（仅 iOS 支持）<br/> |
| notificationBadgeAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: 4.11; HarmonyOS: - | 允许 App 通知带有标记的开关（仅 iOS 支持）<br/> |
| notificationSoundAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: 4.11; HarmonyOS: - | 允许 App 通知带有声音的开关（仅 iOS 支持）<br/> |
| phoneCalendarAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 允许读写日历的开关（仅微信小程序支持）<br/> |
| readPhoneCalendarAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 允许读日历的开关（仅鸿蒙支持）<br/> |
| writePhoneCalendarAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 允许写日历的开关（仅鸿蒙支持）<br/> |
| pasteboardAuthorized | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 允许读取剪切版（仅鸿蒙支持）<br/> |

##### albumAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Android平台：表示没有配置[相册相关权限](https://doc.dcloud.net.cn/uni-app-x/native/permission/android_permission_adapter.html)，[权限配置详情](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)；iOS平台：当前应用没有配置相册权限描述 |

##### bluetoothAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Android平台：表示没有配置[蓝牙相关权限](https://doc.dcloud.net.cn/uni-app-x/native/permission/android_permission_adapter.html)，[权限配置详情](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)；iOS平台：当前应用没有配置蓝牙权限描述 |

##### cameraAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Android平台：表示没有配置 `android.permission.CAMERA` 权限，[权限配置详情](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)；iOS平台：当前应用没有配置相机权限描述 |

##### locationAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Android平台：表示没有配置 `android.permission.ACCESS_COARSE_LOCATION` 权限，[权限配置详情](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)；iOS平台：当前应用没有配置定位权限描述 |

##### locationAccuracy 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| reduced | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 模糊定位 |
| full | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 精准定位 |
| unsupported | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 不支持（包括用户拒绝定位权限和没有包含定位权限描述） |

##### microphoneAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Android平台：表示没有配置 `android.permission.RECORD_AUDIO` 权限，[权限配置详情](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)；iOS平台：当前应用没有配置麦克风权限描述 |

##### notificationAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Android平台没有该值；iOS平台：没有包含推送权限描述 |

##### notificationAlertAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前应用没有配置推送权限描述 |

##### notificationBadgeAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前应用没有配置推送权限描述 |

##### notificationSoundAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关） |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前应用没有配置推送权限描述 |

##### phoneCalendarAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求； |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前应用没有配置推送权限描述 |

##### readPhoneCalendarAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权。Android平台：需要申请相册相关权限；iOS平台：此情况需要引导用户打开系统设置，在设置页中打开权限 |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求； |
| config error | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前应用没有配置推送权限描述 |

##### writePhoneCalendarAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权；（此情况需要引导用户打开系统设置，在设置页中打开权限） |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求； |

##### pasteboardAuthorized 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| authorized | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 已经获得授权，无需再次请求授权 |
| denied | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求授权被拒绝，无法再次请求授权；（此情况需要引导用户打开系统设置，在设置页中打开权限） |
| not determined | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 尚未请求授权，会在App下一次调用系统相应权限时请求； | 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-app-authorize-setting/get-app-authorize-setting.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-app-authorize-setting/get-app-authorize-setting.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-app-authorize-setting/get-app-authorize-setting
```uvue
<template>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否授权使用相册</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.albumAuthorized" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否授权使用蓝牙</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.bluetoothAuthorized" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否授权使用摄像头</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.cameraAuthorized" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否授权使用定位</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.locationAuthorized" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">定位准确度</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.locationAccuracy" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否授权使用麦克风</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.microphoneAuthorized" />
        </view>
      </view>

      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否授权通知</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.notificationAuthorized" />
        </view>
      </view>
      <!-- #ifdef APP-IOS -->
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否允许通知带有提醒</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.notificationAlertAuthorized" />
        </view>
      </view>

      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否允许通知带有标记</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.notificationBadgeAuthorized" />
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-pd">
          <view class="uni-label" style="width:180px;">是否允许通知带有声音</view>
        </view>
        <view class="uni-list-cell-db">
          <input type="text" :disabled="true" placeholder="未获取" :value="data.notificationSoundAuthorized" />
        </view>
      </view>
      <!-- #endif -->
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v">
        <button type="primary" @tap="getAppAuthorizeSetting">获取App授权设置</button>
      </view>
    </view>
  </view>
</template>
<script setup lang="uts">
  type DataType = {
    cameraAuthorized: string;
    albumAuthorized: string;
    locationAuthorized: string;
    locationAccuracy: string;
    microphoneAuthorized: string;
    bluetoothAuthorized: string;
    notificationAuthorized: string;
    notificationAlertAuthorized: string;
    notificationBadgeAuthorized: string;
    notificationSoundAuthorized: string;
  }

  const title = ref('getAppAuthorizeSetting')
  const data = reactive({
    cameraAuthorized: "",
    albumAuthorized: "",
    locationAuthorized: "",
    locationAccuracy: "",
    microphoneAuthorized: "",
    bluetoothAuthorized: "",
    notificationAuthorized: "",
    notificationAlertAuthorized: "",
    notificationBadgeAuthorized: "",
    notificationSoundAuthorized: ""
  } as DataType)

  const getAppAuthorizeSetting = () => {
    const res = uni.getAppAuthorizeSetting();
    data.albumAuthorized = res.albumAuthorized;
    data.bluetoothAuthorized = res.bluetoothAuthorized;
    data.cameraAuthorized = res.cameraAuthorized;
    data.locationAuthorized = res.locationAuthorized;
    data.locationAccuracy = res.locationAccuracy ?? "unsupported";
    data.microphoneAuthorized = res.microphoneAuthorized;
    data.notificationAuthorized = res.notificationAuthorized;
    // #ifdef APP-IOS
    data.notificationAlertAuthorized = res.notificationAlertAuthorized;
    data.notificationBadgeAuthorized = res.notificationBadgeAuthorized;
    data.notificationSoundAuthorized = res.notificationSoundAuthorized;
    // #endif
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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getAppAuthorizeSetting)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getAppAuthorizeSetting.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getAppAuthorizeSetting&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getAppAuthorizeSetting&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getAppAuthorizeSetting&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getAppAuthorizeSetting&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getAppAuthorizeSetting)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getAppAuthorizeSetting&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

如需跳转到权限设置界面，参考[uni.openAppAuthorizeSetting](./open-app-authorize-setting.md)

注意：

Android和iOS的权限设计并不相同，比如iOS有相册权限，而Android不同版本的相册权限逻辑不一样，低版本没有单独的相册权限，归入本地文件读写权限（非沙盒文件），高版本又独立出来。还有很多权限只有一个平台才有。

权限的命名各平台也不相同，所以本API返回的权限名称不是Android和iOS原始的命名，只是一个示意名称。

本API只返回部分权限，Android平台的权限非常多，在Android上获取所有未授权权限，另见[UTSAndroid.getSystemPermissionDenied](../uts/utsandroid.md#getsystempermissiondenied)，这里的权限名称就是Android原始的权限名称了。

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

