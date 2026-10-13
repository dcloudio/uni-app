::: sourceCode
## uni.createDramaAd(options) @createdramaad
:::

创建短剧广告实例：创建即自动加载短剧模块（自动加载模式），加载结果经 onLoad / onError 上报

> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-drama](https://ext.dcloud.net.cn/plugin?id=30115)

UTS 短剧插件：提供 `uni.createDramaAd`（API 模式，自建聚合页）与 `ad-drama` 组件（组件模式，内嵌短剧首页），创建实例即自动加载短剧模块。仅支持 **App-Android**（HBuilderX 5.32+）。

- API 模式文档：[uni.createDramaAd](https://doc.dcloud.net.cn/uni-app-x/api/create-drama-ad.html)
- 组件模式文档：[ad-drama 组件](https://doc.dcloud.net.cn/uni-app-x/component/ad-drama.html)

### 效果预览

短剧剧集的集合页面，用户可以通过该页面点击进入短剧播放页：

<img src="https://web-ext-storage.dcloud.net.cn/uniad/ad-drama.jpg" width="300" />

### 使用前提

1. 在 [uni-ad 后台](https://uniad.dcloud.net.cn/)开通短剧广告位，获取 `adpid`；
2. 从穿山甲后台下载 SDK 配置文件，重命名为 `gm_SDK_Setting.json` 放到项目根目录 `nativeResources/android/assets/` 下；
3. **必须使用自定义基座**（标准基座不含短剧运行时，报 `-5020`）：HBuilderX 菜单【发行 → 原生App-云打包】→ 勾选"制作自定义调试基座"。

   打包自定义基座配置示例：

   <img src="https://web-ext-storage.dcloud.net.cn/uniad/ad-drama-pkg-base.png" width="600" />
4. **Android 包名必须与 `gm_SDK_Setting.json` 中 `license_config` 的 `PackageName`（当前为 `com.bytedance.djxdemo`）保持一致，否则短剧播放会崩溃**。详见 [gm_SDK_Setting.json 配置说明](./docs/gm-sdk-setting.md)。

> 本插件独立运行，无需安装其他插件，也**无需手动导入任何 AAR**——原生库由云打包按 `manifest.json` 的 uni-ad 模块配置自动引入。

### 快速使用（API 模式）

> 完整属性、方法、错误码说明见 [uni.createDramaAd 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/create-drama-ad.html)。

```uts
import { CreateDramaAdOptions, DramaListOptions, DramaListResult, IUniDramaError } from "@/uni_modules/uni-drama"

// 创建即自动加载模块；注册监听后等 onLoad 再查询（避免 -5012）
const dramaAd = uni.createDramaAd({ adpid: '你的短剧广告位 ID' } as CreateDramaAdOptions)
dramaAd.onError((err: IUniDramaError) => console.error(err.errMsg))
dramaAd.onLoad((res: any) => {
  // 模块就绪（res["providerType"] 为渠道类型），可发起查询
})
dramaAd.getRecommendedList({
  page: 1,
  pageSize: 20,
  success: (res: DramaListResult) => { /* 渲染列表 */ },
  fail: (err: IUniDramaError) => { /* 错误处理 */ }
} as DramaListOptions)
```

### 快速使用（组件模式）

> 完整属性、事件、错误码说明见 [ad-drama 组件官方文档](https://doc.dcloud.net.cn/uni-app-x/component/ad-drama.html)。

```vue
<template>
  <ad-drama
    :adpid="'1158231135'"
    :free="2"
    :lock="2"
    :url-callback="{ userId: 'u001', extra: 'order-001' }"
    @load="onLoad"
    @error="onError"
    @click="onClick"
    @close="onClose"
  ></ad-drama>
</template>
```

### 注意事项

- 类型统一从 `@/uni_modules/uni-drama` 导入，勿 import 编译产物包名 `uts.sdk.modules.DCloudUniDrama`（云打包服务器无此包，会导致云打包失败）。
- 短剧解锁的激励视频由 SDK 内部完成，无需接入广告插件；`url-callback`（userId/extra）用于激励发放的服务器回调校验。
- API 模式请在页面 `onUnmounted` 时调用 `destroy()` 释放实例。


短剧广告：通过短剧内容生态（穿山甲内容联盟）变现的高价值广告形式。开发者将短剧内容（列表、播放页）嵌入自己的应用，用户免费观看指定集数后，需观看激励视频解锁后续剧集，从而实现广告变现。

uni-app x 内置短剧 uni-drama，提供两种接入方式：

| 接入方式 | 说明 | 适用场景 |
| :- | :- | :- |
| API 模式 | 通过 `uni.createDramaAd` 创建实例，自行搭建短剧列表页，调用查询接口获取短剧数据，再调用 `open` 打开原生播放页 | 需要自定义短剧列表页样式、深度定制业务 |
| 组件模式 | 使用 `<ad-drama>` 组件（native-view）| 快速接入，直接使用渠道提供的短剧首页 |

组件模式另见：[ad-drama 组件](../component/ad-drama.md)。
示例Demo另见：[详见](https://gitcode.com/dcloud/uni-ad-drama)

**开通配置广告**

[开通广告步骤详情](https://uniapp.dcloud.net.cn/uni-ad/ad-open.html)

**Tips**
- 使用短剧组件需要先开通穿山甲广告。开通问题请咨询：[uni-ad交流群](https://im.dcloud.net.cn/#/?joinGroup=65d85fc09847e92db03ff81a)。
- 标准基座不包含短剧运行时，需制作自定义基座后运行，否则报错 `-5020`。

### 配置文件

在穿山甲后台 内容输出->接入管理 找到需要接入内容SDK的应用，点击"下载SDK参数配置"，然后将SDK配置文件（例如 sdk_setting_file.json）拷贝到项目的 assets 文件夹下。

![](https://lf3-plat.pglstatp-toutiao.com/obj/union-platform/a30bc3001dff716fcf6876da15151ecf.png)

文件下载之后重命名为：`gm_SDK_Setting.json`，然后将文件放到项目根目录的`nativeResources->android->assets`目录下。

### 服务器回调

用户观看激励视频解锁剧集后，为防止客户端伪造看完广告的凭据，解锁集数的发放由服务器回调完成，这是业内通行的安全方案。调用 `open` 时传入 `urlCallback`（userId/extra），激励发放时会透传到业务服务器参与校验。服务器回调机制详见 [激励视频广告服务器回调](https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html#callback)。

### createDramaAd 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.32 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **CreateDramaAdOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 用于创建短剧广告（DramaAd）实例时传入的配置项类型，目前仅包含必填的 adpid |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| adpid | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧广告位标识<br/>必填；在 uni-ad 平台申请短剧广告位获取的 adpid。<br/>adpid 为空、无效或广告位未开通时，创建后经 onError 上报 -5001 / -5002 / -5003。 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| [DramaAd](#dramaad-values) | 短剧广告实例：自建聚合页场景的列表/搜索/详情能力入口。<br/>创建实例（uni.createDramaAd）即自动加载短剧模块（自动加载模式），<br/>加载结果经 onLoad / onError 上报。 |

#### DramaAd 的方法 @dramaad-values 

#### getList(options : DramaListOptions) : void @getlist
getList
获取短剧列表，用于自建聚合页渲染；分页参数 page 从 1 开始，结果经 options.success / options.fail 回调返回
##### getList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getRecommendedList(options : DramaListOptions) : void @getrecommendedlist
getRecommendedList
分页获取推荐短剧列表，结果经 options.success / options.fail 回调返回
##### getRecommendedList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getCollectionList(options : DramaListOptions) : void @getcollectionlist
getCollectionList
分页获取用户收藏的短剧列表，结果经 options.success / options.fail 回调返回
##### getCollectionList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getHistoryList(options : DramaListOptions) : void @gethistorylist
getHistoryList
分页获取用户观看记录的短剧列表，结果经 options.success / options.fail 回调返回
##### getHistoryList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### search(options : DramaSearchOptions) : void @search
search
根据关键词搜索短剧，isFuzzy 为 true 时模糊匹配（默认 true），结果经 options.success / options.fail 回调返回
##### search 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaSearchOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | search 搜索参数 searchWord 必填；isFuzzy 默认 true（模糊匹配）；搜索结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| searchWord | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 搜索关键词，必填 |
| isFuzzy | boolean | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 是否模糊匹配；不传默认 true（模糊匹配） |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 搜索成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 搜索失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 搜索结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getInfo(options : DramaInfoOptions) : void @getinfo
getInfo
获取指定短剧信息，参数 dramaId 与 dramaIds 二选一，结果经 options.success / options.fail 回调返回
##### getInfo 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaInfoOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | getInfo 查询参数 dramaId / dramaIds 二选一，同时传入时优先 dramaIds；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 单个短剧 ID；与 dramaIds 二选一，两者同时传入时优先使用 dramaIds |
| dramaIds | Array&lt;number&gt; | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 批量短剧 ID 列表；与 dramaId 二选一，两者同时传入时优先使用 dramaIds |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### open(options : DramaOpenOptions) : void @open
open
打开短剧播放页播放指定短剧；支持起播集数 episode、单次激励视频解锁集数 lock、初始免费观看集数 free 与服务端回调透传 urlCallback，结果经 options.success / options.fail 回调返回
##### open 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaOpenOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | open 打开短剧播放页参数 free 初始免费观看集数、lock 单次激励视频可解锁的集数；打开结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧 ID（与 DramaInfo.dramaId 一致，统一为 string） |
| episode | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 起播集数，默认 1 |
| lock | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 单次激励视频解锁的集数，默认 1 |
| free | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 初始免费观看集数，默认 1 |
| urlCallback | **DramaUrlCallback** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 服务端回调透传参数：激励发放时回传服务器校验。 |
| success | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 播放页打开成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 播放页打开失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 打开结束的回调函数（成功失败都会执行） | 

##### urlCallback 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| userId | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 用户唯一标识：激励视频解锁发放时，用于服务端回调校验；不传则不透传 |
| extra | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 服务端回调透传的附加参数（业务自定义，回调时原样回传）；不传则不透传 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### destroy() : void @destroy
destroy
销毁短剧广告实例并释放资源；API 模式请在页面 onUnmounted 时调用
##### destroy 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |




#### onLoad(callback : DramaSimpleCallback) : void @onload
onLoad
短剧模块加载成功时触发（res.providerType 为渠道类型）；open() 打开的播放页就绪后会再次触发（res.type 为 "detail" 并携带 dramaId）
##### onLoad 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 



#### offLoad(callback : DramaSimpleCallback) : void @offload
offLoad
取消 onLoad(callback) 注册的监听
##### offLoad 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 



#### onError(callback : DramaErrorCallback) : void @onerror
onError
发生错误时触发（模块加载失败、查询前置校验失败等），回调参数为 IUniDramaError（errCode / errMsg）
##### onError 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (err: [IUniDramaError](#iunidramaerror-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误回调，err 为 IUniDramaError（errCode 错误码 / errMsg 错误描述） | 

##### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### offError(callback : DramaErrorCallback) : void @offerror
offError
取消 onError(callback) 注册的监听
##### offError 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (err: [IUniDramaError](#iunidramaerror-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误回调，err 为 IUniDramaError（errCode 错误码 / errMsg 错误描述） | 

##### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### onPlayEvent(callback : DramaEventCallback) : void @onplayevent
onPlayEvent
播放相关事件，事件数据包含 event（如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay）与 info
##### onPlayEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### offPlayEvent(callback : DramaEventCallback) : void @offplayevent
offPlayEvent
取消 onPlayEvent(callback) 注册的监听
##### offPlayEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### onAdEvent(callback : DramaEventCallback) : void @onadevent
onAdEvent
短剧内广告相关事件，事件数据包含 event（如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError）与 info
##### onAdEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### offAdEvent(callback : DramaEventCallback) : void @offadevent
offAdEvent
取消 onAdEvent(callback) 注册的监听
##### offAdEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### onUnlockEvent(callback : DramaSimpleCallback) : void @onunlockevent
onUnlockEvent
短剧解锁相关事件（激励视频解锁成功等）
##### onUnlockEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 



#### offUnlockEvent(callback : DramaSimpleCallback) : void @offunlockevent
offUnlockEvent
取消 onUnlockEvent(callback) 注册的监听
##### offUnlockEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; iOS: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 


 


## Tips

+ 短剧广告仅支持 Android 平台。

<!-- UTSAPIJSON.createDramaAd.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ad.createDramaAd)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=createDramaAd&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createDramaAd&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createDramaAd&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createDramaAd&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createDramaAd&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createDramaAd)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createDramaAd&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

