::: sourceCode
## uni.vibrateShort(options) @vibrateshort
:::

使设备发生短时间的振动。


### vibrateShort 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **VibrateShortOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| type | string | 是 | Web: x |
| success | (result: [VibrateShortSuccess](#vibrateshortsuccess-values)) => void | 否 | Web: x |
| fail | (result: [VibrateShortFail](#vibrateshortfail-values)) => void | 否 | Web: x |
| complete | (result: [VibrateShortSuccess](#vibrateshortsuccess-values) \| [VibrateShortFail](#vibrateshortfail-values)) => void | 否 | Web: x | 

##### type 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| heavy | Web: x |
| medium | Web: x |
| light | Web: x |

#### VibrateShortSuccess 的属性值 @vibrateshortsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | Web: x |

#### VibrateShortFail 的属性值 @vibrateshortfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x |  |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 9001001 | Web: x |
| 9001002 | Web: x |
| 9001003 | Web: x |

#### VibrateShortSuccess 的属性值 @vibrateshortsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | Web: x |

#### VibrateShortFail 的属性值 @vibrateshortfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x |  |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 9001001 | Web: x |
| 9001002 | Web: x |
| 9001003 | Web: x |






<!-- UTSAPIJSON.vibrateShort.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.vibrate.vibrateShort)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/vibrate.html#vibrateshort)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/vibrate/wx.vibrateShort.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=vibrateShort&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=vibrateShort&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=vibrateShort&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=vibrateShort&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=vibrateShort)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=vibrateShort&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.vibrateLong(options) @vibratelong
:::

使设备发生长时间的振动。


### vibrateLong 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **VibrateLongOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (result: [VibrateLongSuccess](#vibratelongsuccess-values)) => void | 否 | Web: x |
| fail | (result: [VibrateLongFail](#vibratelongfail-values)) => void | 否 | Web: x |
| complete | (result: [VibrateLongSuccess](#vibratelongsuccess-values) \| [VibrateLongFail](#vibratelongfail-values)) => void | 否 | Web: x | 

#### VibrateLongSuccess 的属性值 @vibratelongsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | Web: x |

#### VibrateLongFail 的属性值 @vibratelongfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x |  |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 9001001 | Web: x |
| 9001002 | Web: x |
| 9001003 | Web: x |

#### VibrateLongSuccess 的属性值 @vibratelongsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | Web: x |

#### VibrateLongFail 的属性值 @vibratelongfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x |  |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 9001001 | Web: x |
| 9001002 | Web: x |
| 9001003 | Web: x |






<!-- UTSAPIJSON.vibrateLong.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.vibrate.vibrateLong)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/vibrate.html#vibratelong)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/vibrate/wx.vibrateLong.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=vibrateLong&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=vibrateLong&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=vibrateLong&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=vibrateLong&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=vibrateLong)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=vibrateLong&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/vibrate/vibrate.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/vibrate/vibrate.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/vibrate/vibrate
```uvue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 6px;">
	<!-- #endif -->
		<text class="uni-h2">振动</text>
		<text class="notice">如下情况会导致无法振动：设备电量不足、静音模式、关闭了系统触感</text>
		<text class="uni-h3">短振动 uni.vibrateShort</text>
		<text class="margin-v">短振动支持 `light`、`medium`、`heavy` 三种力度类型。</text>
		<button class="margin-v" @tap="callShort('light')">轻振动</button>
		<button class="margin-v" @tap="callShort('medium')">中振动</button>
		<button class="margin-v" @tap="callShort('heavy')">强振动</button>
		
		<text class="uni-h3">长振动 uni.vibrateLong</text>
		<button @tap="callLong">触发长振动</button>
		
    <text class="uni-h4">最近日志：</text>
    <text class="log-text">{{ statusText }}</text>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script setup lang="uts">

  type ShortType = 'heavy' | 'medium' | 'light'

  const statusText = ref('等待触发振动')

  function updateStatus(message : string) : void {
    statusText.value = message
  }

  function getShortTypeLabel(type : ShortType) : string {
    switch (type) {
      case 'light':
        return '轻振动'
      case 'medium':
        return '中振动'
      default:
        return '强振动'
    }
  }

  function callShort(type : ShortType) : void {
    uni.vibrateShort({
      type,
      success: () => {
        updateStatus(`${getShortTypeLabel(type)}调用成功`)
      },
      fail: (err) => {
        updateStatus(`短振动调用失败：${err.errMsg}`)
      }
    })
  }

  function callLong() : void {
    uni.vibrateLong({
      success: () => {
        updateStatus('长振动调用成功')
      },
      fail: (err) => {
        updateStatus(`长振动调用失败：${err.errMsg}`)
      }
    })
  }
</script>

<style>
  .margin-v {
    margin: 5px 0;
  }
	.log-text {
    padding: 10px;
		font-size: 14px;
    border: 1px solid #ccc;
  }
	.notice {
	  color: #550000;
		font-size: 14px;
		font-style: italic;
	}
	
</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41 | 错误信息 |
