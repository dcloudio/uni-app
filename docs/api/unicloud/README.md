## 概述

uniCloud是基于serverless的云开发服务，它大幅降低开发者的开发成本和运维成本。业务介绍[详见](https://doc.dcloud.net.cn/uniCloud/)

截止到目前，uni-app x下的uniCloud还不支持：

- 暂不支持schema2code
- uts插件编译为swift、arkts时插件内不可调用uniCloud

**兼容说明**

- `HBuilderX 3.9+` 支持阿里云，`3.91+`支持腾讯云，`3.98+`支持支付宝小程序云
- `HBuilderX 3.91+` 支持clientDB
- `HBuilderX 3.99+` 支持pages.json中的uniIdRouter
- `HBuilderX 4.71+` 支持安全网络





### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| config | **UniCloudInitOptions** | 是 |   |  |
| mixinDatacom | any | 是 |   |  |
| datacomProps | **DatacomPropsType** | 是 | Android(VDOM): x; Android(Vapor): 5.32; iOS(VDOM): x; iOS(Vapor): 5.32; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.32 | datacom 属性定义，供页面/组件 defineProps 展开使用 |
| SSEChannel | [SSEChannel](#ssechannel-values) | 是 | Web: 4.71; 微信小程序: 4.71; Android: 4.71; iOS: 4.71; HarmonyOS: 4.71 | 服务端通知通道 |
| useDatacom | (props: [DatacomProps](#datacomprops-values)) => [Datacom](#datacom-values) | 是 | Android(VDOM): x; Android(Vapor): 5.32; iOS(VDOM): x; iOS(Vapor): 5.32; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.32 | datacom 组合式逻辑，替换原 mixinDatacom | 

#### config 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| provider | string | 是 | 服务商，目前支持 aliyun、tencent、alipay |
| spaceName | string | 否 | 服务空间名 |
| spaceId | string | 是 | 服务空间id |
| clientSecret | string | 否 | 阿里云clientSecret |
| endpoint | string | 否 | 阿里云endpoint |
| spaceAppId | string | 否 | 支付宝云spaceAppId |
| accessKey | string | 否 | 支付宝云accessKey |
| secretKey | string | 否 | 支付宝云secretKey |
| wsEndpoint | string | 否 | 支付宝云 WebSocket Endpoint |

#### datacomProps 的属性描述

| 名称 | 类型 | 必备 | 默认值 |
| :- | :- | :- | :- |
| localdata | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 否 | () => Array\<UTSJSONObject> |
| options | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) \| Array&lt;any&gt; | 否 | () => UTSJSONObject |
| collection | string | 否 | string |
| action | string | 否 | string |
| field | string | 否 | string |
| orderby | string | 否 | string |
| where | string \| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | string |
| pageData | string | 否 | string |
| pageCurrent | number | 否 | number |
| pageSize | number | 否 | number |
| getcount | boolean \| string | 否 | boolean |
| gettree | boolean \| string | 否 | boolean |
| gettreepath | boolean \| string | 否 | boolean |
| startwith | string | 否 | string |
| limitlevel | number | 否 | number |
| groupby | string | 否 | string |
| groupField | string | 否 | string |
| distinct | boolean \| string | 否 | boolean |
| manual | boolean | 否 | boolean |

### SSEChannel 的方法 @ssechannel-values 

### open(): Promise\<void>; @open
open
开启通道，注意只有开启之后才能把SSEChannel实例传入云函数



#### 返回值 

| 类型 |
| :- |
| Promise\<void> |
 

### toJSON(): {    appId: string;    pushClientId: string;    seqId: string;  }; @tojson
toJSON




#### 返回值 

| 类型 |
| :- |
| [{ appId: string; pushClientId: string; seqId: string; }](#appid-values) |

#### { appId: string; pushClientId: string; seqId: string; } 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| appId | string | 是 |
| pushClientId | string | 是 |
| seqId | string | 是 | 

### close(): void; @close
close
关闭通道




### on(event: 'message', callback: (message: string) => void): void; @on
on
监听消息接收事件

#### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| event | string | 是 |
| callback | (message: string) => void | 是 | 



### off(event: 'message', callback: (message: string) => void): void; @off
off
取消监听消息接收事件

#### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| event | string | 是 |
| callback | (message: string) => void | 是 | 



### DatacomProps 的属性值 @datacomprops-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| localdata | Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; | 是 | 本地数据 |
| options | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) \| Array&lt;any&gt; | 是 | 额外的查询选项 |
| collection | string | 是 | 表名 |
| action | string | 是 | 云端执行数据库查询的前或后，触发某个 action 函数操作，进行预处理或后处理 |
| field | string | 是 | 查询字段，多个字段用 `,` 分割 |
| orderby | string | 是 | 排序字段及正序倒序设置 |
| where | string \| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 查询条件 |
| pageData | string | 是 | add：多次查询的集合；replace：当前查询的集合 |
| pageCurrent | number | 是 | 当前页 |
| pageSize | number | 是 | 每页数据数量 |
| getcount | boolean \| string | 是 | 是否查询总数量 |
| gettree | boolean \| string | 是 | 是否查询树状结构数据 |
| gettreepath | boolean \| string | 是 | 是否查询树状结构数据的路径 |
| startwith | string | 是 | gettree 的第一层级条件，不传时默认从最顶级开始查询 |
| limitlevel | number | 是 | gettree 查询返回的树的最大层级，默认 10，最大 15，最小 1 |
| groupby | string | 是 | 对数据进行分组 |
| groupField | string | 是 | 对数据进行分组统计 |
| distinct | boolean \| string | 是 | 是否对数据查询结果中重复的记录进行去重 |
| manual | boolean | 是 | 是否手动加载数据，默认为 false，页面 onLoad 时自动联网加载数据 |

### Datacom 的属性值 @datacom-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| loading | Ref\<boolean> | 是 | 网络请求状态 |
| hasMore | Ref\<boolean> | 是 | 是否有更多数据 |
| resData | Ref\<UTSJSONObject\[]> | 是 | 请求返回的数据，调用 easyGet 后会更新 |
| errorMessage | Ref\<any> | 是 | 请求出错时的错误消息 |
| page | Ref\<DatacomPagination> | 是 | 分页信息 |

### Datacom 的方法 @datacom-values 

### easyGet(options?: DatacomEasyGetOptions): void @easyget
easyGet
加载数据

#### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **DatacomEasyGetOptions** | 否 | mixinDatacomEasyGet 参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| getone | boolean | 否 | 指定查询结果是否返回数组第一条数据，默认 false |
| success | (data: Array&lt;any&gt;) => void | 否 | 成功回调 |
| fail | (err: UniCloudError) => void | 否 | 失败回调 | 



### get(options?: DatacomGetOptions): Promise\<UniCloudDBGetResult> @get
get
调用 uniClientDB 查询数据

#### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **DatacomGetOptions** | 否 | mixinDatacomGet 参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| action | string | 否 | action 函数名，优先级高于 props.action |
| collection | string | 否 | 表名，优先级高于 props.collection |
| where | string \| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | 查询条件，优先级高于 props.where |
| field | string | 否 | 查询字段，优先级高于 props.field |
| groupby | string | 否 | 分组字段，优先级高于 props.groupby |
| groupField | string | 否 | 分组统计字段，优先级高于 props.groupField |
| distinct | boolean \| string | 否 | 是否去重，优先级高于 props.distinct |
| orderby | string | 否 | 排序字段，优先级高于 props.orderby |
| pageCurrent | number | 否 | 当前页，优先级高于分页信息 |
| pageSize | number | 否 | 每页数据数量，优先级高于分页信息 |
| getcount | boolean \| string | 否 | 是否查询总数量，优先级高于 props.getcount |
| gettree | boolean \| string | 否 | 是否查询树状结构数据，优先级高于 props.gettree |
| gettreepath | boolean \| string | 否 | 是否查询树状结构数据的路径，优先级高于 props.gettreepath |
| limitlevel | number | 否 | 树的最大层级，优先级高于 props.limitlevel |
| startwith | string | 否 | 树的起始条件，优先级高于 props.startwith | 


#### 返回值 

| 类型 |
| :- |
| Promise\<UniCloudDBGetResult> |
 

### refresh(): void @refresh
refresh
刷新，重新加载当前数据




### reset(): void @reset
reset
重置，清空已加载的数据和分页信息




### onMixinDatacomPropsChange(needReset: boolean, changed: Array\<string>): void @onmixindatacompropschange
onMixinDatacomPropsChange
props 发生变化时被调用，可在组件中覆盖此方法

#### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| needReset | boolean | 是 |
| changed | Array&lt;string&gt; | 是 | 








### datacom 组件示例

Vue蒸汽模式不支持的`mixin`语法，使用属性展开和方法替代，[datacom组件规范](https://uniapp.dcloud.net.cn/component/datacom.html)

```html
<template>
  <view>
    <view v-if="datacom.loading" class="data-city-loading">Loading...</view>
    <view v-else-if="datacom.errorMessage" class="data-city-error">
      请求错误：{{datacom.errorMessage}}
    </view>
    <view v-else class="data-city-data">
      <!-- 需要自行处理数据及相关UI展现 -->
      {{datacom.resData}}
    </view>
  </view>
</template>

<script setup lang="ts">
  const props = defineProps({
    ...uniCloud.datacomProps, // HBuilderX 5.32
    multiple: {
      type: Boolean,
      default: false
    }
  })

  // HBuilderX 5.32
  const datacom = uniCloud.useDatacom(props)

  // 调用 useDatacom 中的方法加载数据
  datacom.easyGet()

  defineExpose({
    loadData: datacom.easyGet,
    refresh: datacom.refresh,
    clear: datacom.reset
  })
</script>
```
