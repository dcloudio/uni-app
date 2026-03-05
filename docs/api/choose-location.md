<!-- ## uni.chooseLocation(options) @chooselocation -->

::: sourceCode
## uni.chooseLocation(options) @chooselocation

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-chooseLocation


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-chooseLocation

:::

打开地图选择位置

调用本API会打开一个新窗体，在地图中选择一个位置，在success回调中返回选择的位置名称和坐标。

本功能依赖地图组件。App和Web需在manifest.json中正确配置地图模块以及相关的key信息。

不同平台支持的地图不同，具体见[map组件](../component/map.md)。

国内图商的坐标系都是gcj02坐标，国外图商是wgs84坐标。

地图是商业服务，授权较贵，如需购买，请点击[获取优惠](https://ask.dcloud.net.cn/explore/map/)。


### chooseLocation 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.33 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ChooseLocationOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.chooseLocation函数参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 否 | - | Web: 4.0; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指示位置的经度 |
| longitude | number | 否 | - | Web: 4.0; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指示位置的纬度 |
| keyword | string | 否 | - | Web: 4.0; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指示位置的名称 |
| payload | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | - | Web: 4.35; 微信小程序: -; Android: 4.35; iOS: 4.35; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用户自定义参数 |
| success | (result: [ChooseLocationSuccess](#chooselocationsuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [ChooseLocationFail](#chooselocationfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### ChooseLocationSuccess 的属性值 @chooselocationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| name | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| address | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| latitude | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| longitude | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ChooseLocationFail 的属性值 @chooselocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1 | Web: 4.34; 微信小程序: -; Android: 4.34; iOS: 4.34; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消 |
| 4 | Web: 4.34; 微信小程序: -; Android: 4.34; iOS: 4.34; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 框架内部错误 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/choose-location/choose-location.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/choose-location/choose-location.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/choose-location/choose-location

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/choose-location/choose-location

>示例
```vue
<template>
  <view>
    <page-head :title="data.title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-column uni-container align-center">
        <text class="uni-hello-text">位置信息</text>
        <text v-if="!data.hasLocation" class="uni-title-text uni-common-mt">未选择位置</text>
        <view v-if="data.hasLocation" class="align-center">
          <text class="uni-common-mt">{{data.locationName}}</text>
          <text class="uni-common-mt">{{data.locationAddress}}</text>
          <view class="uni-common-mt" v-if="data.location.latitude.length>1">
            <text>E: {{data.location.longitude[0]}}°{{data.location.longitude[1]}}′</text>
            <text>\nN: {{data.location.latitude[0]}}°{{data.location.latitude[1]}}′</text>
          </view>
        </view>
      </view>
      <view class="uni-btn-v">
        <text class="tips">注意：\n1. Web和App需要正确配置地图服务商的Key并且保证Key的权限和余额足够，才能正常选择位置\n2. 若没有关联uniCloud空间，则只能全屏地图选点，不能根据POI选择位置\n3. payload参数会原样透传给uni-map-co，可用于用户鉴权</text>
        <boolean-data :defaultValue="false" title="是否指定位置为天安门" @change="changeLocationBoolean"></boolean-data>
        <boolean-data :defaultValue="false" title="是否携带keyword参数" @change="changeKeywordBoolean"></boolean-data>
        <!-- #ifndef MP -->
        <boolean-data :defaultValue="false" title="是否携带payload参数" @change="changePayloadBoolean"></boolean-data>
        <!-- #endif -->
        <button class="uni-btn" type="primary" @tap="chooseLocation">选择位置</button>
        <button class="uni-btn" @tap="clear">清空</button>
        <!-- #ifdef APP-IOS -->
        <button class="uni-btn" type="primary" @tap="chooseLocationByPlugin">通过 uts 插件调用 chooseLocation</button>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>
<script setup lang="uts">
  import {
    state,
    setLifeCycleNum
  } from '@/store/index.uts'

  type Location = {
    latitude: string[]
    longitude: string[]
  }

  type DataType = {
    title: string
    hasLocation: boolean
    location: Location
    locationName: string
    locationAddress: string
    dialogPagesNum: number
    hoverLocation: boolean
    hoverKeyword: boolean
    hoverPayload: boolean
  }

  const data = reactive({
    title: 'chooseLocation',
    hasLocation: false,
    location: {
      latitude: [],
      longitude: []
    } as Location,
    locationName: '',
    locationAddress: '',
    dialogPagesNum: -1,
    hoverLocation: false,
    hoverKeyword: false,
    hoverPayload: false
  } as DataType)

  const formatLocation = (longitude: number, latitude: number): Location => {
    const longitudeArr = longitude.toString().split('.')
    const latitudeArr = latitude.toString().split('.')
    if(longitudeArr.length > 1){
      longitudeArr[1] = longitudeArr[1].substring(0,2)
    }
    if(latitudeArr.length > 1){
      latitudeArr[1] = latitudeArr[1].substring(0,2)
    }
    return {
      longitude: longitudeArr,
      latitude: latitudeArr
    }
  }

  const clear = () => {
    data.hasLocation = false
  }

  const changeLocationBoolean = (checked: boolean) => {
    data.hoverLocation = checked
  }

  const changeKeywordBoolean = (checked: boolean) => {
    data.hoverKeyword = checked
  }

  const changePayloadBoolean = (checked: boolean) => {
    data.hoverPayload = checked
  }

  // #ifdef APP-IOS
  const chooseLocationByPlugin = () => {
    uni.chooseLocationPlugin()
  }
  // #endif

  // 自动化测试
  const test = () => {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    // #ifdef APP || WEB
    const dialogPages = page.getDialogPages()
    data.dialogPagesNum = dialogPages.length
    // #endif
  }

  // 自动化测试
  const setLifeCycleNumFunc = (value: number) => {
    setLifeCycleNum(value)
  }

  // 自动化测试
  const getLifeCycleNum = (): number => {
    return state.lifeCycleNum
  }

  const chooseLocation = () => {
    let chooseLocationOptions = {
      success: (res) => {
        console.log('chooseLocation success', res)
        data.hasLocation = true
        data.location = formatLocation(res.longitude, res.latitude)
        data.locationName = res.name
        data.locationAddress = res.address
      }
    } as ChooseLocationOptions
    if (data.hoverLocation) {
      chooseLocationOptions.latitude = 39.908823
      chooseLocationOptions.longitude = 116.39747
    }
    if (data.hoverKeyword) {
      chooseLocationOptions.keyword = '公园'
    }
    // #ifndef MP
    if (data.hoverPayload) {
      chooseLocationOptions.payload = {
        token: 'xxx'
      }
    }
    // #endif
    uni.chooseLocation(chooseLocationOptions)
    // 自动化测试
    setTimeout(() => {
      test()
    }, 500)
  }

  onPageShow(() => {
    console.log("Page Show");
    // 自动化测试
    setLifeCycleNumFunc(state.lifeCycleNum + 1)
  })

  onPageHide(() => {
    console.log("Page Hide");
    // 自动化测试
    setLifeCycleNumFunc(state.lifeCycleNum - 1)
  })

  defineExpose({
    data,
    setLifeCycleNumFunc,
    getLifeCycleNum,
    chooseLocation,
    // #ifdef APP-IOS
    chooseLocationByPlugin,
    // #endif
    clear,
    changeLocationBoolean,
    changeKeywordBoolean,
    changePayloadBoolean,
    test
  })
</script>

<style>
  .page-body-info {
    padding-bottom: 0;
    height: 220px;
  }
  .align-center{
    align-items: center;
  }
  .tips {
    font-size: 12px;
    margin: 15px 0;
    opacity: .8;
  }
</style>

```

:::

## 三方地图SDK

uni.chooseLocation 依赖三方地图SDK，点击[查看详情](../component/map.md#mapsdk)

## App平台依赖uniCloud@unicloud
> HBuilderX 4.33+

uni.chooseLocation 中有个功能是传入位置返回周围的POI信息。在腾讯地图中该功能不是客户端API，而是一个webservice接口。因为涉及收费，该接口需要传入key。

在App中，从客户端带着key直接发起请求腾讯地图的webservice接口是不安全的。key泄露后会导致其他人调用腾讯相关能力但费用由key的所属人缴纳。

web端可以使用在腾讯地图web控制台配置域名白名单的方式，但App无法采用这种方式。

App上安全的方式是由客户端不带key请求开发者的服务器，由开发者的服务器判断客户端的身份，然后服务器带着key请求腾讯地图的服务器，成功后返回POI列表给客户端。

DCloud的所有服务器API，都是基于uniCloud的。并且uniCloud早已经有 [uni-map-common](https://doc.dcloud.net.cn/uniCloud/uni-map-common.html)

所以在腾讯地图的 uni.chooseLocation 中，需要依赖 uniCloud 的 uni-map-common 插件。开发者在该插件的配置文件中配置好key，无需自己编写代码，即可使用本API。

开发者首先需要开通 [uniCloud](https://unicloud.dcloud.net.cn)，选择一个服务商（可自由选择，不是必须使用腾讯云），创建一个服务空间。

在HBuilderX对项目点右键，关联服务空间。如果你的项目没有创建过 uniCloud 环境，则先右键项目名，创建uniCloud云开发环境，uniCloud 的 web控制台地址：[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn)

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/API/chooseLocation/aa35d5a6-9b13-4fea-8a0c-1b3534584659.png)

关联服务空间后，将 uni-map-common 插件导入项目，插件地址：[https://ext.dcloud.net.cn/plugin?id=13872](https://ext.dcloud.net.cn/plugin?id=13872)

安装完 uni-map-common 插件后，需要将你的地图key配置在 `/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-map/config.js` 如果你的项目没有此配置文件，则直接根据目录创建对应的目录和 `config.js` 文件，文件内容如下：

```js
module.exports = {
	"default": "qqmap", // 当前使用哪个平台
	"key": {
		"qqmap": "", // 腾讯地图key
		"amap": "", // 高德地图key
	}
}
```

请务必注意地图的key，是有权限的可以访问周围POI信息的，且有足够的额度。这涉及付费采购。点此联系DCloud咨询[获取优惠](https://ask.dcloud.net.cn/explore/map/)

配置完毕后，本地运行即可使用。正式发布时，记得对uniCloud目录点右键，将相关云函数和模块提交发布到正式服务器上。具体操作如下图所示

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/API/chooseLocation/6ce6b6f3-2334-40d5-bd06-69efb5174305.png)

如果需要在uniCloud服务器更安全的验证客户端的身份，你可以在云函数中校验客户的token，避免其他人伪造请求访问你的云函数。

### uni-map-common错误码

uni.chooseLocation 获取POI列表的功能依赖uniCloud中的 [uni-map-common](https://doc.dcloud.net.cn/uniCloud/uni-map-common.html) 插件，该插件在请求地图服务器失败时会抛出错误信息，点击查看[uni-map-common错误码](https://doc.dcloud.net.cn/uniCloud/uni-map-common.html#errorcode)


### 透传鉴权参数payload@payload
> HBuilderX 4.35+

uni.chooseLocation 自HBuilderX 4.35+ 起，新增了一个参数payload，为 UTSJSONObject 类型，此参数会透传给uni-map-co，开发者可在请求地图服务器之前对参数进行鉴权，比如只有登录用户才能调用POI查询接口等等。

**示例代码**

```js
uni.chooseLocation({
  payload: {
    token: "xxx",
  },
  success: (res) => {
    console.log('res: ', res);
  }
});
```

#### 鉴权payload参数
> HBuilderX 4.35+

开发者可以在 uni-map-co 的 `_before` 方法内进行鉴权，鉴权代码可以写在 `_before` 函数已有代码的下面。

#### 情况一: 自身业务在uniCloud，且使用了uni-id-common@payload1

1. 右键 uni-map-co 云对象，管理公共模块或扩展库依赖，打勾 uni-id-common 依赖
2. 在 `_before` 函数已有代码的下面新增以下代码
```js
const uniIdCommon = require('uni-id-common')
const uniID = uniIdCommon.createInstance({
	clientInfo: this.getClientInfo()
});
// 获取uniIdToken
const uniIdToken = this.getUniIdToken()
// 校验uniIdToken
const checkTokenRes = await uniIDIns.checkToken(uniIdToken)
if (checkTokenRes.code) {
	// token校验不通过
	throw {
		errCode: checkTokenRes.errCode || checkTokenRes.code,
		errMsg: checkTokenRes.errMsg || checkTokenRes.msg
	}
}
// 获取payload参数
let {
	payload, // payload参数为前端传递的参数，可以在前端调用uni.chooseLocation时传递
} = this.getParams()[0] || {};
// 可继续校验payload参数
// ...

```

以上就已经完成了用户是否登录的判断，不登录不能调用，当然你还能继续优化代码以适应不同的业务需求。

#### 情况二: 自身业务在uniCloud，未使用uni-id-common@payload2

推荐使用uni-id-common，[下载地址](https://ext.dcloud.net.cn/plugin?id=8576)

当然你也可以直接在 `_before` 函数已有代码的下面新增自己的鉴权代码

```js
// 获取payload参数
let {
	payload, // payload参数为前端传递的参数，可以在前端调用uni.chooseLocation时传递
} = this.getParams()[0] || {};
if (!payload) {
	throw {
		errCode: -1,
		errMsg: "payload参数不能为空"
	}
}
// 继续校验payload参数
// ...
```

#### 情况三: 自身业务不在uniCloud@payload3

如果业务不在uniCloud，你可以在uni-map-co中通过http请求你的后端服务器。

1. 打开文件 `/uni_modules/uni-map-common/uniCloud/cloudfunctions/uni-map-co/index.obj.js`
2. 在 `_before` 函数已有代码的下面新增以下代码

```js
// 获取payload参数
let {
	payload, // payload参数为前端传递的参数，可以在前端调用uni.chooseLocation时传递
} = this.getParams()[0] || {};
if (!payload) {
	throw {
		errCode: -1,
		errMsg: "payload参数不能为空"
	}
}
// 请求后端服务接口
const requestRes = await uniCloud.request({
	method: 'POST',
	url: '你自己的接口地址',
	data: payload,
});
// 与后端约定errCode不为0代表校验失败，errMsg为失败原因
if (requestRes.data.errCode !== 0) {
	throw {
		errCode: requestRes.data.errCode,
		errMsg: requestRes.data.errMsg
	}
}
```


### 未依赖uniCloud时向下兼容说明

当项目未使用uniCloud时，uni.chooseLocation 功能将调整为全屏地图选点模式。在该模式下，POI列表信息将不再显示，用户无法通过POI进行选点，只能直接在地图上进行位置选择。同时返回值只有latitude和longitude是有值的，name和address为空字符串，如下所示：

```json
{
	"name": "",
	"address": "",
	"latitude": 39.951028,
	"longitude": 116.354662
}
```

## 自定义样式@custom
> HBuilderX 4.33+

uni.chooseLocation 虽然是一个框架内置的页面。但提供了丰富的自定义能力。

该页面自动适配了暗黑、横屏、国际化（内置中文繁简和英文）。页面上的图片元素均使用字体图标，可以覆盖class。

可通过App.vue中写入全局css样式进行覆盖修改。

- 以 .uni-choose-location-light 开头的为light模式下的样式
- 以 .uni-choose-location-dark 开头的为dark模式下的样式

样式必须以 `!important;` 结尾才能生效，以下是css的class名称，写入同名名称就可以覆盖。

文本样式除了下方列出的 color 和 background-color 外，你还可以替换 font-family 等任何 text 标签支持的样式。

地图中心点的icon

```css
.uni-choose-location-light .uni-choose-location-map-target-icon {
	color: red !important;
}
.uni-choose-location-dark .uni-choose-location-map-target-icon {
	color: red !important;
}
```

右上方"确认"按钮

```css
.uni-choose-location-light .uni-choose-location-nav-confirm-text {
	background-color: red !important;
	color: #fff !important;
}
.uni-choose-location-dark .uni-choose-location-nav-confirm-text {
	background-color: red !important;
	color: #fff !important;
}
```

左上方"取消"按钮

```css
.uni-choose-location-light .uni-choose-location-nav-back-text {
	color: red !important;
}
.uni-choose-location-dark .uni-choose-location-nav-back-text {
	color: red !important;
}
```

搜索框右侧的"取消"文字

```css
.uni-choose-location-light .uni-choose-location-poi-search-cancel {
	color: red !important;
}
.uni-choose-location-dark .uni-choose-location-poi-search-cancel {
	color: red !important;
}
```

已选中的POI右侧的对钩icon

```css
.uni-choose-location-light .uni-choose-location-poi-item-selected-icon {
	color: red !important;
}
.uni-choose-location-dark .uni-choose-location-poi-item-selected-icon {
	color: red !important;
}
```

POI标题

```css
.uni-choose-location-light .uni-choose-location-poi-item-title-text {
  color: red !important;
}
.uni-choose-location-dark .uni-choose-location-poi-item-title-text {
  color: red !important;
}
```

POI地址

```css
.uni-choose-location-light .uni-choose-location-poi-item-detail-text {
  color: red !important;
}
.uni-choose-location-dark .uni-choose-location-poi-item-detail-text {
  color: red !important;
}
```

## 历史问题
uni-app x 4.24以前，Web平台本API调用了腾讯地图的免费gcj02坐标转换接口，该接口从2024年7月18日起被腾讯逐步下线，导致老版本中本API无法使用。请升级到4.24+。

升级后注意：
1. manifest中配置好自己的地图厂商key
2. 确保在地图厂商那里配额足够
3. 确保在地图厂商那里有周边服务的权限。否则无法获取周围地址
4. 确保自己的域名在地图厂商那里正确配置了域名白名单


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.chooseLocation)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/location/location.html#chooselocation)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.chooseLocation.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=chooseLocation&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=chooseLocation&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=chooseLocation&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=chooseLocation&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=chooseLocation)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=chooseLocation&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
