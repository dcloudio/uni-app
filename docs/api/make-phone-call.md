<!-- ## uni.makePhoneCall(options) @makephonecall -->

::: sourceCode
## uni.makePhoneCall(options) @makephonecall

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-makePhoneCall


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-makePhoneCall

:::

拨打电话

### makePhoneCall 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.63 | 4.63 | 4.63 | 4.61 | 4.61 |


::: warning 注意

- `HarmonyOS` 平台使用时需要添加受限开放权限 [ohos.permission.WRITE_CONTACTS](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/restricted-permissions-V5#section31629267196?ha_source=Dcloud&ha_sourceId=89000448)

:::

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MakePhoneCallOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| phoneNumber | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.63; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: 4.61; HarmonyOS uni-app x UTS 插件: 4.61 | 需要拨打的电话号码 |
| success | (result: MakePhoneCallSuccess) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.63; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: 4.61; HarmonyOS uni-app x UTS 插件: 4.61 | 成功返回的回调函数 |
| fail | (result: [MakePhoneCallFail](#makephonecallfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.63; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: 4.61; HarmonyOS uni-app x UTS 插件: 4.61 | 失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.63; iOS: 4.63; iOS uni-app x UTS 插件: 4.63; HarmonyOS: 4.61; HarmonyOS uni-app x UTS 插件: 4.61 | 结束的回调函数（调用成功、失败都会执行） | 

#### MakePhoneCallFail 的属性值 @makephonecallfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500601 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前设备不支持此功能 |
| 1500602 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 无效号码 |
| 1500603 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 内部错误 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.makePhoneCall)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/phone.html#makephonecall)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/phone/wx.makePhoneCall.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=makePhoneCall&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=makePhoneCall&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=makePhoneCall&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=makePhoneCall&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=makePhoneCall)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=makePhoneCall&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/make-phone-call/make-phone-call.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/make-phone-call/make-phone-call.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/make-phone-call/make-phone-call

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/make-phone-call/make-phone-call

>示例
```vue
<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-hello-text uni-center">请在下方输入电话号码</view>
      <input class="input uni-common-mt" type="number" name="input" @input="bindInput" />
      <view class="uni-btn-v uni-common-mt">
        <button @tap="makePhoneCall" type="primary" :disabled="data.disabled">拨打</button>
      </view>
    </view>
  </view>
</template>
<script setup lang="uts">
  type DataType = {
    disabled: boolean;
    inputValue: string;
  }

  const title = ref('makePhoneCall')
  const data = reactive({
    disabled: true,
    inputValue: ''
  } as DataType)

  const bindInput = (e : UniInputEvent) => {
    data.inputValue = e.detail.value
    if (data.inputValue.length > 0) {
      data.disabled = false
    } else {
      data.disabled = true
    }
  }

  const makePhoneCall = () => {
    uni.makePhoneCall({
      phoneNumber: data.inputValue,
      success: () => {
        console.log("成功拨打电话")
      },
      fail: (err) => {
        console.log(err.errCode)
        uni.showToast({
          title: '错误码：' + err.errCode.toString(),
          icon: "error"
        })
      }
    })
  }

</script>

<style>
  .input {
    height: 60px;
    line-height: 60px;
    font-size: 39px;
    border-bottom: 1px solid #E2E2E2;
    text-align: center;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

