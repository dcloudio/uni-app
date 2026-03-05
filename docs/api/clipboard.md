<!-- ## uni.getClipboardData(options) @getclipboarddata -->

::: sourceCode
## uni.getClipboardData(options) @getclipboarddata

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-clipboard


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-clipboard

:::

获得系统剪贴板的内容


### getClipboardData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.71 | 4.71 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetClipboardDataOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [GetClipboardDataSuccess](#getclipboarddatasuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 成功返回的回调函数 |
| fail | (result: [GetClipboardDataFail](#getclipboarddatafail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 结束的回调函数（调用成功、失败都会执行） | 

#### GetClipboardDataSuccess 的属性值 @getclipboarddatasuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 剪贴板的内容 |

#### GetClipboardDataFail 的属性值 @getclipboarddatafail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.getClipboardData.example -->

**注意**

- App（除 HarmonyOS）平台暂未内置，[见插件市场](https://ext.dcloud.net.cn/search?q=%E5%89%AA%E5%88%87%E6%9D%BF&orderBy=Relevance&cat1=8&cat2=81)
- 读取剪贴板，在一些新的Android设备上，被列为单独的权限，如没有相关权限，则无法读取剪贴板。
- 在鸿蒙上，读取剪贴板是一个高敏感权限，较难申请，参考[鸿蒙文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/get-pastedata-permission-guidelines?ha_source=Dcloud&ha_sourceId=89000448)


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.clipboard.getClipboardData)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/clipboard.html#getclipboarddata)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/clipboard/wx.getClipboardData.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getClipboardData&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getClipboardData&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getClipboardData&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getClipboardData&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getClipboardData)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getClipboardData&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setClipboardData(options) @setclipboarddata -->

::: sourceCode
## uni.setClipboardData(options) @setclipboarddata

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-clipboard


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-clipboard

:::

设置系统剪贴板的内容


### setClipboardData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.71 | 4.71 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetClipboardDataOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要设置的内容 |
| showToast | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否弹出提示，默认弹出提示 |
| success | (result: SetClipboardDataSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 成功返回的回调函数 |
| fail | (result: [SetClipboardDataFail](#setclipboarddatafail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 结束的回调函数（调用成功、失败都会执行） | 

#### SetClipboardDataFail 的属性值 @setclipboarddatafail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.setClipboardData.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.clipboard.setClipboardData)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/clipboard.html#setclipboarddata)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/clipboard/wx.setClipboardData.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setClipboardData&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setClipboardData&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setClipboardData&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setClipboardData&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setClipboardData)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setClipboardData&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/clipboard/clipboard.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/clipboard/clipboard.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/clipboard/clipboard

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/clipboard/clipboard

>示例
```vue
<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-title">请输入剪贴板内容</view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <input class="uni-input" type="text" placeholder="请输入剪贴板内容" :value="data.data" @input="dataChange" />
        </view>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="setClipboard">存储数据</button>
        <button @tap="getClipboard">读取数据</button>
      </view>
    </view>
  </view>
</template>
<script setup lang="uts">
  type DataType = {
    data: string;
    // 自动化测试
    getDataTest: string;
    setClipboardTest: boolean;
  }

  const title = ref('get/setClipboardData')
  const data = reactive({
    data: '',
    // 自动化测试
    getDataTest: '',
    setClipboardTest: false
  } as DataType)

  // 页面卸载时清空剪贴板，避免影响其他测试用例
  onUnload(() => {
    uni.setClipboardData({
      data: ''
    })
  })

  const dataChange = (e:UniInputEvent) => {
    data.data = e.detail.value
  }

  const getClipboard = () => {
    uni.getClipboardData({
      success: (res) => {
        console.log(res.data);
        data.getDataTest = res.data;
        const content = res.data != "" ? '剪贴板内容为:' + res.data : '剪贴板暂无内容';
        uni.showModal({
          content,
          title: '读取剪贴板',
          showCancel: false
        })
      },
      fail: (err) => {
        uni.showModal({
          content: `读取剪贴板失败: ${err.errMsg}`,
          showCancel: false
        })
      }
    });
  }

  const setClipboard = () => {
    if (data.data.length == 0) {
      uni.showModal({
        title: '设置剪贴板失败',
        content: '内容不能为空',
        showCancel: false
      })
    } else {
      uni.setClipboardData({
        data: data.data,
        success: () => {
          data.setClipboardTest = true
          // 成功处理
          uni.showToast({
            title: '设置剪贴板成功',
            icon: "success"
          })
        },
        fail: () => {
          // bug：自动化测试时设置成功也进入了fail
          data.setClipboardTest = false
          // 失败处理
          uni.showToast({
            title: '储存数据失败!',
            icon: "none"
          })
        }
      });
    }
  }

  defineExpose({
    data,
    getClipboard,
    setClipboard
  })
</script>

<style>
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

