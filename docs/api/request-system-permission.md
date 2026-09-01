::: sourceCode
## uni.requestSystemPermission(options) @requestsystempermission
:::

申请系统权限

### requestSystemPermission 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **RequestSystemPermissionOptions** | 是 | Web: x; 微信小程序: x; iOS: x | 请求系统权限参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| permissions | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 申请的系统权限列表 |
| success | (result: [RequestSystemPermissionSuccess](#requestsystempermissionsuccess-values)) => void | 否 | Web: x; 微信小程序: x; iOS: x | 申请系统权限成功回调 |
| fail | (result: [RequestSystemPermissionFail](#requestsystempermissionfail-values)) => void | 否 | Web: x; 微信小程序: x; iOS: x |  |
| complete | (result: any) => void | 否 | Web: x; 微信小程序: x; iOS: x |  | 

#### RequestSystemPermissionSuccess 的属性值 @requestsystempermissionsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| grantedList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 已授权权限列表，仅包含当前系统支持的权限 |
| deniedList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 已拒绝权限列表 |
| doNotAskAgainList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 不在询问权限列表 |

#### RequestSystemPermissionFail 的属性值 @requestsystempermissionfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: x; iOS: x | 错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; iOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; iOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; iOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1560601 | Web: x; 微信小程序: x; iOS: x | 申请权限为空 |
| 1560604 | Web: x; 微信小程序: x; iOS: x | 不支持申请权限 |






### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/request-system-permission/request-system-permission.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/request-system-permission/request-system-permission.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/request-system-permission/request-system-permission
```uvue
<template>
  <scroll-view class="page-scroll-view">
    <page-head title="requestSystemPermission"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-db">
            <textarea
              class="permission-input"
              v-model="data.permissionText"
              placeholder="请输入权限名称，多个权限使用逗号分隔"
            />
          </view>
        </view>
      </view>

      <view class="uni-btn-v uni-common-mt">
        <!-- #ifdef APP-HARMONY -->
        <button @tap="selectAccelerometer">加速度计权限</button>
        <button @tap="selectLocation">定位权限</button>
        <button @tap="selectUnconfigured">未配置权限</button>
        <!-- #endif -->
        <!-- #ifdef APP-ANDROID -->
        <button @tap="selectCamera">相机权限</button>
        <button @tap="selectLocation">定位权限</button>
        <!-- #endif -->
        <button id="request-permission" type="primary" @tap="requestPermission">申请权限</button>
      </view>

      <view class="result uni-common-mt">
        <text class="result-title">申请结果</text>
        <text class="result-text">状态：{{ data.status }}</text>
        <text class="result-text">errCode：{{ data.errCode }}</text>
        <text class="result-text">errMsg：{{ data.errMsg }}</text>
        <text class="result-text">grantedList：{{ (data.grantedList).join(', ') }}</text>
        <text class="result-text">deniedList：{{ (data.deniedList).join(', ') }}</text>
        <text class="result-text">doNotAskAgainList：{{ (data.doNotAskAgainList).join(', ') }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  // #ifdef APP-HARMONY
  const DEFAULT_PERMISSION = 'ohos.permission.ACCELEROMETER'
  const ACCELEROMETER_PERMISSION = 'ohos.permission.ACCELEROMETER'
  const LOCATION_PERMISSIONS = 'ohos.permission.APPROXIMATELY_LOCATION, ohos.permission.LOCATION'
  const UNCONFIGURED_PERMISSION = 'ohos.permission.ACCESS_BLUETOOTH'
  // #endif
  // #ifdef APP-ANDROID
  const DEFAULT_PERMISSION = 'android.permission.CAMERA'
  const CAMERA_PERMISSION = 'android.permission.CAMERA'
  const LOCATION_PERMISSIONS = 'android.permission.ACCESS_FINE_LOCATION, android.permission.ACCESS_COARSE_LOCATION'
  // #endif

  type DataType = {
    permissionText: string
    status: string
    errCode: number
    errMsg: string
    grantedList: string[]
    deniedList: string[]
    doNotAskAgainList: string[]
    complete: boolean
  }

  const data = reactive({
    permissionText: DEFAULT_PERMISSION,
    status: '待申请',
    errCode: 0,
    errMsg: '',
    grantedList: [] as string[],
    deniedList: [] as string[],
    doNotAskAgainList: [] as string[],
    complete: false
  } as DataType)

  // #ifdef APP-HARMONY
  const selectAccelerometer = () => {
    data.permissionText = ACCELEROMETER_PERMISSION
  }
  // #endif

  // #ifdef APP-ANDROID
  const selectCamera = () => {
    data.permissionText = CAMERA_PERMISSION
  }
  // #endif

  const selectLocation = () => {
    data.permissionText = LOCATION_PERMISSIONS
  }

  // #ifdef APP-HARMONY
  const selectUnconfigured = () => {
    data.permissionText = UNCONFIGURED_PERMISSION
  }
  // #endif

  const resetResult = () => {
    data.status = '申请中'
    data.errCode = 0
    data.errMsg = ''
    data.grantedList = [] as string[]
    data.deniedList = [] as string[]
    data.doNotAskAgainList = [] as string[]
    data.complete = false
  }

  const request = (permissions: string[]) => {
    resetResult()
    uni.requestSystemPermission({
      permissions,
      success: (res) => {
        data.status = '申请成功'
        data.grantedList = res.grantedList
        data.deniedList = res.deniedList
        data.doNotAskAgainList = res.doNotAskAgainList
      },
      fail: (err) => {
        data.status = '申请失败'
        data.errCode = err.errCode
        data.errMsg = err.errMsg
      },
      complete: () => {
        data.complete = true
      }
    })
  }

  const requestPermission = () => {
    const permissions = data.permissionText
      .split(',')
      .map((permission) => permission.trim())
      .filter((permission) => permission.length > 0)
    request(permissions)
  }

  const jestRequestPermissions = () => {
    request([DEFAULT_PERMISSION])
  }

  const jestRequestEmptyPermissions = () => {
    request([])
  }

  // #ifdef APP-HARMONY
  const jestRequestUnconfiguredPermission = () => {
    request([UNCONFIGURED_PERMISSION])
  }
  // #endif

  // #ifdef APP-HARMONY
  defineExpose({
    data,
    jestRequestPermissions,
    jestRequestEmptyPermissions,
    jestRequestUnconfiguredPermission
  })
  // #endif

  // #ifdef APP-ANDROID
  defineExpose({
    data,
    jestRequestPermissions,
    jestRequestEmptyPermissions
  })
  // #endif
</script>

<style>
  .permission-input {
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
  }

  .result {
    padding: 12px;
    border: 1px solid #dddddd;
  }

  .result-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .result-text {
    margin-bottom: 6px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.requestSystemPermission)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/request-system-permission.html)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=requestSystemPermission&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=requestSystemPermission&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=requestSystemPermission&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=requestSystemPermission&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=requestSystemPermission&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=requestSystemPermission)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=requestSystemPermission&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/request-system-permission/request-system-permission.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/request-system-permission/request-system-permission.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/request-system-permission/request-system-permission
```uvue
<template>
  <scroll-view class="page-scroll-view">
    <page-head title="requestSystemPermission"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-db">
            <textarea
              class="permission-input"
              v-model="data.permissionText"
              placeholder="请输入权限名称，多个权限使用逗号分隔"
            />
          </view>
        </view>
      </view>

      <view class="uni-btn-v uni-common-mt">
        <!-- #ifdef APP-HARMONY -->
        <button @tap="selectAccelerometer">加速度计权限</button>
        <button @tap="selectLocation">定位权限</button>
        <button @tap="selectUnconfigured">未配置权限</button>
        <!-- #endif -->
        <!-- #ifdef APP-ANDROID -->
        <button @tap="selectCamera">相机权限</button>
        <button @tap="selectLocation">定位权限</button>
        <!-- #endif -->
        <button id="request-permission" type="primary" @tap="requestPermission">申请权限</button>
      </view>

      <view class="result uni-common-mt">
        <text class="result-title">申请结果</text>
        <text class="result-text">状态：{{ data.status }}</text>
        <text class="result-text">errCode：{{ data.errCode }}</text>
        <text class="result-text">errMsg：{{ data.errMsg }}</text>
        <text class="result-text">grantedList：{{ (data.grantedList).join(', ') }}</text>
        <text class="result-text">deniedList：{{ (data.deniedList).join(', ') }}</text>
        <text class="result-text">doNotAskAgainList：{{ (data.doNotAskAgainList).join(', ') }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  // #ifdef APP-HARMONY
  const DEFAULT_PERMISSION = 'ohos.permission.ACCELEROMETER'
  const ACCELEROMETER_PERMISSION = 'ohos.permission.ACCELEROMETER'
  const LOCATION_PERMISSIONS = 'ohos.permission.APPROXIMATELY_LOCATION, ohos.permission.LOCATION'
  const UNCONFIGURED_PERMISSION = 'ohos.permission.ACCESS_BLUETOOTH'
  // #endif
  // #ifdef APP-ANDROID
  const DEFAULT_PERMISSION = 'android.permission.CAMERA'
  const CAMERA_PERMISSION = 'android.permission.CAMERA'
  const LOCATION_PERMISSIONS = 'android.permission.ACCESS_FINE_LOCATION, android.permission.ACCESS_COARSE_LOCATION'
  // #endif

  type DataType = {
    permissionText: string
    status: string
    errCode: number
    errMsg: string
    grantedList: string[]
    deniedList: string[]
    doNotAskAgainList: string[]
    complete: boolean
  }

  const data = reactive({
    permissionText: DEFAULT_PERMISSION,
    status: '待申请',
    errCode: 0,
    errMsg: '',
    grantedList: [] as string[],
    deniedList: [] as string[],
    doNotAskAgainList: [] as string[],
    complete: false
  } as DataType)

  // #ifdef APP-HARMONY
  const selectAccelerometer = () => {
    data.permissionText = ACCELEROMETER_PERMISSION
  }
  // #endif

  // #ifdef APP-ANDROID
  const selectCamera = () => {
    data.permissionText = CAMERA_PERMISSION
  }
  // #endif

  const selectLocation = () => {
    data.permissionText = LOCATION_PERMISSIONS
  }

  // #ifdef APP-HARMONY
  const selectUnconfigured = () => {
    data.permissionText = UNCONFIGURED_PERMISSION
  }
  // #endif

  const resetResult = () => {
    data.status = '申请中'
    data.errCode = 0
    data.errMsg = ''
    data.grantedList = [] as string[]
    data.deniedList = [] as string[]
    data.doNotAskAgainList = [] as string[]
    data.complete = false
  }

  const request = (permissions: string[]) => {
    resetResult()
    uni.requestSystemPermission({
      permissions,
      success: (res) => {
        data.status = '申请成功'
        data.grantedList = res.grantedList
        data.deniedList = res.deniedList
        data.doNotAskAgainList = res.doNotAskAgainList
      },
      fail: (err) => {
        data.status = '申请失败'
        data.errCode = err.errCode
        data.errMsg = err.errMsg
      },
      complete: () => {
        data.complete = true
      }
    })
  }

  const requestPermission = () => {
    const permissions = data.permissionText
      .split(',')
      .map((permission) => permission.trim())
      .filter((permission) => permission.length > 0)
    request(permissions)
  }

  const jestRequestPermissions = () => {
    request([DEFAULT_PERMISSION])
  }

  const jestRequestEmptyPermissions = () => {
    request([])
  }

  // #ifdef APP-HARMONY
  const jestRequestUnconfiguredPermission = () => {
    request([UNCONFIGURED_PERMISSION])
  }
  // #endif

  // #ifdef APP-HARMONY
  defineExpose({
    data,
    jestRequestPermissions,
    jestRequestEmptyPermissions,
    jestRequestUnconfiguredPermission
  })
  // #endif

  // #ifdef APP-ANDROID
  defineExpose({
    data,
    jestRequestPermissions,
    jestRequestEmptyPermissions
  })
  // #endif
</script>

<style>
  .permission-input {
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
  }

  .result {
    padding: 12px;
    border: 1px solid #dddddd;
  }

  .result-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .result-text {
    margin-bottom: 6px;
  }
</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |
