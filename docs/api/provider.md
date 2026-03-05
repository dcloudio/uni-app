## provider机制介绍

uni-app的API，统一了多平台的差异。但某个API，可以由很多三方SDK来支撑，所以提供了provider机制用于抹平SDK之间的差异。

比如
- 支付API：有支付宝支持、微信支付
- 定位API：有系统定位、腾讯定位

不同的SDK，本身的API是完全不同的，甚至同一个SDK的Android和iOS的API也不一样。

uni-app 通过 provider 机制来统一不同的SDK，屏蔽他们的差异。

同一个功能的不同的SDK，都被称为该功能的 provider，即供应商。

比如对于支付模块，有 支付宝 和 微信 这2个 provider 供应商。

由于这些[模块和SDK](../collocation/manifest-modules.md)在打包时是可选的，那么在运行时可以通过 `uni.getProvider`，来获取到本App包中包含的provider清单。

**注意**

我们要把SDK和App的概念区分清楚。对于支付的2个provider，支付宝和微信，它们除了有SDK外，也有各自的主App。

`uni.getProviders`，只是动态获取开发者的App包中的provider清单，即打包了哪些SDK。但本API不负责判断这些provider的主App是否安装在同一台手机上。

但微信比较特殊，如果没有微信App，微信支付无法完成。并且Appstore审核要求本机未安装微信时，不能显示微信的登录支付。这就要求开发者必须判断本机是否安装了微信。

所以微信的SDK，自身提供了获取微信主App是否安装的API，那么这个API也被封装到了provider返回的对象里。

除微信外，其他SDK无此特殊情况。

### 自注册provider

除了官方提供的provider，uni-app x 于 `4.24版`开放了provider自注册机制，允许三方插件注册provider。

- [自定义支付provider](request-payment.md#customprovider)

- [自定义定位provider](get-location.md#customprovider)

**注意**

- 标准基座android需要在manifest.json中配置才能获取到对应的provider，ios不需要。自定义基座都需要配置
- 自定义的provider不要在构造函数中写逻辑，因为现在provider会预先实例化，如果在构造函数中写逻辑，会导致代码在应用启动的时候就被执行

::: sourceCode
## uni.getProviderSync(options) @getprovidersync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getProvider


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getProvider

:::

getProvider的同步方法

### getProviderSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.25 | 4.25 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetProviderSyncOptions** | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| service | string | 是 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: - | 服务类型<br/> |

##### service 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| payment | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: - | 支付 (alipay、wxpay) |
| location | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: - | 定位 (system、tencent) |
| oauth | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 授权登录 | 


### 返回值 

| 类型 |
| :- |
| **GetProviderSyncSuccess** |

#### GetProviderSyncSuccess 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| service | string | 是 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: - | 服务类型<br/> |
| providerIds | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 得到的服务供应商 |
| providerObjects | Array&lt;[UniProvider](/api/provider.md#uniprovider)&gt; | 是 | - | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 得到的服务供应商服务对象 | 

##### service 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| payment | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 支付 (alipay、wxpay) |
| location | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 定位 (system、tencent) |
| oauth | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 授权登录 |



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.getProvider)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/provider.html#getprovider)

<!-- UTSAPIJSON.getProvider.example -->


### UniProvider说明文档链接

- 支付Provider：[UniPaymentAlipayProvider](./request-payment.md#providerdes),[UniPaymentWxpayProvider](./request-payment.md#providerdes)

- 定位Provider：[UniLocationSystemProvider](./get-location.md#providerdes),[UniLocationTencentProvider](./get-location.md#providerdes)

## UniProvider

服务供应商




### UniProvider 的属性值 @uniprovider-values
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | string | 是 | - | - | 服务供应商标识 |
| description | string | 是 | - | - | 服务供应商描述 |
| ~~isAppExist~~ | boolean | 是 | - | - | 判断服务供应商依赖的App是否安装（仅支持微信支付） |


### UniProvider 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.18 | 4.18 | - |

<!-- CUSTOMTYPEJSON.UniProvider.example -->

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/provider/provider.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/provider/provider.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/provider/provider
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view class="page">
      <page-head :title="data.title"></page-head>
      <view class="service-item" v-for="(item, index) in data.serviceList" :key="index">
        <text class="service-name">{{item.name}}:</text>
        <view class="provider-list">
          <text class="provider-item" v-for="(item2, index2) in item.provider" :key="index2">
            {{item2}}
            {{item.providerObj.length > 0 ? ':' + JSON.stringify(item.providerObj[index2]) : '' }}
          </text>
        </view>
      </view>
      <button class="btn-get-provider" type="primary" @click="getProvider">getProviderSync</button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type ProviderItem = {
    service : string,
    name : string,
    provider : string[],
    providerObj : UniProvider[]
  }

  type DataType = {
    title: string;
    flag: boolean;
    serviceList: ProviderItem[];
    providerIds: string[];
    providerObjects: string[];
  }

  const data = reactive({
    title: 'provider',
    flag: false,
    serviceList: [
      { service: "payment", name: "支付", provider: [], providerObj: [] },
      { service: "location", name: "定位", provider: [], providerObj: [] },
      // #ifdef APP-HARMONY
      { service: "oauth", name: "登录", provider: [], providerObj: [] },
      // #endif
      // #ifdef APP-HARMONY
      { service: "share", name: "分享", provider: [], providerObj: [] }
      // #endif
    ],
    //自动化测试使用
    providerIds: [],
    providerObjects: [],
  } as DataType)

  const updateProvider = (service : string, provider : string[] | null, uniProvider : UniProvider[]) => {
    //这里需要从新从serviceList 获取item，不能直接用forEach 里面的item，目前存在bug,后续会解决这个问题
    const item : ProviderItem | null = data.serviceList.find((item : ProviderItem) : boolean => {
      return item.service == service
    });

    if (item != null && provider != null) {
      item.provider = provider
      item.providerObj = uniProvider
      item.providerObj.forEach((obj) => {
        data.providerObjects.push(obj.description)
      })
    }
  }

  const getProvider = () => {
    data.providerObjects = []
    data.serviceList.forEach((item : ProviderItem) => {
      var provider = uni.getProviderSync({
        service: item.service,
      } as GetProviderSyncOptions)
      provider.providerIds.forEach((value) => {
        data.providerIds.push(value)
      })
      updateProvider(item.service, provider.providerIds, provider.providerObjects);
    })
  }

  defineExpose({
    data,
    getProvider
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .service-item {
    margin-top: 10px;
  }

  .service-name {
    font-weight: bold;
  }

  .provider-list {
    margin-left: 32px;
  }

  .provider-item {
    line-height: 1.5;
  }

  .btn-get-provider {
    margin-top: 30px;
  }
</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



::: sourceCode
## uni.~~getProvider(options)~~ @getprovider

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getProvider


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getProvider

:::

获取服务供应商  **已废弃，4.25及以后版本请使用getProviderSync()方法代替**

### getProvider 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.11 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetProviderOptions** | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| service | string | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 服务类型：支付 (payment)<br/> |
| success | (result: [GetProviderSuccess](#getprovidersuccess-values)) => void | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用成功的回调 |
| fail | (result: [GetProviderFail](#getproviderfail-values)) => void | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### service 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| payment | Web: x; 微信小程序: x; Android: 4.11; iOS: 4.18; HarmonyOS: - | 支付 (alipay、wxpay) |
| oauth | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 授权登录 |

#### GetProviderSuccess 的属性值 @getprovidersuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| service | string | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 服务类型：支付 (payment)<br/> |
| provider | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 得到的服务供应商 |
| providers | Array&lt;[UniProvider](/api/provider.md#uniprovider)&gt; | 是 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: - | 得到的服务供应商服务对象 |

#### service 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| payment | Web: x; 微信小程序: x; Android: 4.11; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 支付 (alipay、wxpay) |
| oauth | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 授权登录 |
| share | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.66; HarmonyOS(Vapor): 5.0 | 分享 |

#### GetProviderFail 的属性值 @getproviderfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误码：<br/>110600：服务类型参数无效。 |
| errSubject | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |




::: warning uni.getProvider 返回顺序说明：
1. 目前标准基座中注册的 provider 返回顺序如下：
    支付： 微信支付、支付宝；
    定位： 系统定位、腾讯定位

2. 相同 service 下，其他的自注册 provider，返回顺序在官方预置的 provider 之后

3. 自注册的 provider 无法保障顺序， 请不要依赖自注册 provider 的顺序

4. 如果自定义的 service 与 provider 配置与内置的一样，优先采用自定义的

5. 如果自定义的 service 下存在多个同名的 provider，编译器会报错

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.getProviderSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/provider.html#getprovider)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/provider/provider.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/provider/provider.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/provider/provider
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view class="page">
      <page-head :title="data.title"></page-head>
      <view class="service-item" v-for="(item, index) in data.serviceList" :key="index">
        <text class="service-name">{{item.name}}:</text>
        <view class="provider-list">
          <text class="provider-item" v-for="(item2, index2) in item.provider" :key="index2">
            {{item2}}
            {{item.providerObj.length > 0 ? ':' + JSON.stringify(item.providerObj[index2]) : '' }}
          </text>
        </view>
      </view>
      <button class="btn-get-provider" type="primary" @click="getProvider">getProviderSync</button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type ProviderItem = {
    service : string,
    name : string,
    provider : string[],
    providerObj : UniProvider[]
  }

  type DataType = {
    title: string;
    flag: boolean;
    serviceList: ProviderItem[];
    providerIds: string[];
    providerObjects: string[];
  }

  const data = reactive({
    title: 'provider',
    flag: false,
    serviceList: [
      { service: "payment", name: "支付", provider: [], providerObj: [] },
      { service: "location", name: "定位", provider: [], providerObj: [] },
      // #ifdef APP-HARMONY
      { service: "oauth", name: "登录", provider: [], providerObj: [] },
      // #endif
      // #ifdef APP-HARMONY
      { service: "share", name: "分享", provider: [], providerObj: [] }
      // #endif
    ],
    //自动化测试使用
    providerIds: [],
    providerObjects: [],
  } as DataType)

  const updateProvider = (service : string, provider : string[] | null, uniProvider : UniProvider[]) => {
    //这里需要从新从serviceList 获取item，不能直接用forEach 里面的item，目前存在bug,后续会解决这个问题
    const item : ProviderItem | null = data.serviceList.find((item : ProviderItem) : boolean => {
      return item.service == service
    });

    if (item != null && provider != null) {
      item.provider = provider
      item.providerObj = uniProvider
      item.providerObj.forEach((obj) => {
        data.providerObjects.push(obj.description)
      })
    }
  }

  const getProvider = () => {
    data.providerObjects = []
    data.serviceList.forEach((item : ProviderItem) => {
      var provider = uni.getProviderSync({
        service: item.service,
      } as GetProviderSyncOptions)
      provider.providerIds.forEach((value) => {
        data.providerIds.push(value)
      })
      updateProvider(item.service, provider.providerIds, provider.providerObjects);
    })
  }

  defineExpose({
    data,
    getProvider
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .service-item {
    margin-top: 10px;
  }

  .service-name {
    font-weight: bold;
  }

  .provider-list {
    margin-left: 32px;
  }

  .provider-item {
    line-height: 1.5;
  }

  .btn-get-provider {
    margin-top: 30px;
  }
</style>

```
:::
