<!-- ## uni.share(options) @share -->

::: sourceCode
## uni.share(options) @share

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-share


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-share

:::

分享


> Android、iOS平台从 HBuilderX5.08 版本开始支持微信分享  

### share 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | 4.81 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **ShareOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 否 | weixin | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享服务提供商，通过 [uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html) 获取,如果不设置则默认 weixin |
| type | number | 否 | 0 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享类型。默认图文0 |
| title | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 标题 |
| scene | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 场景 |
| summary | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 摘要 |
| href | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 跳转链接 |
| imageUrl | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 图片地址 |
| mediaUrl | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 音视频地址 |
| miniProgram | **ShareMiniProgramShareOptions** | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享小程序 |
| openCustomerServiceChat | boolean | 否 | false | Web: x; Android: x; iOS: x; HarmonyOS 系统版本: 5.0.0 (12); HarmonyOS: 5.0 | 是否启用拉起客服功能，为 true 时除 `corpid`、`customerUrl` 外其他参数无效 |
| corpid | string | 否 |  | Web: x; Android: x; iOS: x; HarmonyOS 系统版本: 5.0.0 (12); HarmonyOS: 5.0 | 客服ID，`openCustomerServiceChat` 为 true 时必填<br/> |
| customerUrl | string | 否 |  | Web: x; Android: x; iOS: x; HarmonyOS 系统版本: 5.0.0 (12); HarmonyOS: 5.0 | 客服的页面路径，`openCustomerServiceChat` 为 true 时必填<br/> |
| success | (result: ShareSuccess) => void | 否 |  | Web: x | 接口调用成功的回调函数 |
| fail | (result: [ShareFail](#sharefail-values)) => void | 否 |  | Web: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 |  | Web: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 0 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 图文 |
| 1 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 纯文字 |
| 2 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 纯图片 |
| 3 | Web: x; Android: x; iOS: x; HarmonyOS: x | 音乐 |
| 4 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 视频 |
| 5 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 小程序 |

##### scene 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| WXSceneSession | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享到聊天界面 |
| WXSceneTimeline | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享到朋友圈 |
| WXSceneFavorite | Web: x; Android: x; iOS: x; HarmonyOS: x | 分享微信收藏 |

##### miniProgram 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 微信小程序原始id |
| path | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 点击链接进入的页面 |
| type | number | 否 | 0 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 微信小程序版本类型，默认为0。 |
| webUrl | string | 否 |  | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 兼容低版本的网页链接 |

###### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 0 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 正式版 |
| 1 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 测试版 |
| 2 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 体验版 |

#### ShareFail 的属性值 @sharefail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 4000500 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 未找到微信APPID,请确认 manifest.json 中配置信息是否正确 |
| 4000501 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 该场景字段当前不支持 |
| 4000502 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 该场景字段未匹配到 |
| 4000503 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享类型不匹配，请确认类型是否正确 |
| 4000504 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 参数填写错误 |
| 4000505 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 请求微信接口失败 |
| 4000506 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 暂不支持该类型的分享 |
| 4000507 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 图片下载失败 |
| 4000508 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 加载本地文件失败 |
| 4000509 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 获取缩略图失败 |
| 4000510 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 微信可能未安装 |
| 4000511 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 分享失败 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/share/share.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/share/share.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/share/share
```uvue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-list-cell-padding status-box">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text">分享内容：</text>
      </view>
      <textarea style="max-height: 100px;padding: 10px;background-color:aliceblue;border: 1px solid black;"
        :auto-height=" true" :value="shareContent"></textarea>
    </view>
    <view class="uni-list-cell-padding status-box">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text">分享图片：</text>
      </view>
      <view style="flex-wrap: wrap;">
        <image v-if="imageURL != null" style="width: 104px; height: 104px;" :src="imageURL">
        </image>
        <image v-else class="uni-uploader__input-box" @tap="chooseImage" src="/static/plus.png"></image>
      </view>
    </view>
    <view class="uni-list-cell-padding status-box">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text">分享类型：</text>
      </view>
      <radio-group class="uni-row" @change="typeChange">
        <radio class="uni-common-mt" value="0" :checked="true">
          图文
        </radio>
        <radio class="uni-common-mt" value="1">纯文字</radio>
        <radio class="uni-common-mt" value="2">纯图片</radio>
      </radio-group>
    </view>
    <view class="uni-list-cell-padding status-box">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text">分享到：</text>
      </view>
      <radio-group class="uni-row" style="flex-wrap: wrap;" @change="sceneChange">
        <radio class="uni-common-mt" value="WXSceneSession" :checked="true">
          聊天界面
        </radio>
        <radio class="uni-common-mt" value="WXSceneTimeline">朋友圈</radio>
        <radio class="uni-common-mt" value="WXSceneFavorite" :disabled="true" style="color: gray;">微信收藏（暂不支持）</radio>
      </radio-group>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <button type="primary" @click="share">分享</button>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  const scene = ref('WXSceneSession')
  const type = ref(0)

  const typeChange = (e : UniRadioGroupChangeEvent) => {
    type.value = parseInt(e.detail.value)
  }
  const sceneChange = (e : UniRadioGroupChangeEvent) => {
    scene.value = e.detail.value
  }

  const title = ref('share')
  const shareContent = ref('uni-app x 可以分享内容到微信了！')
  const imageURL = ref<string | null>(null)

  function chooseImage() {
    uni.chooseImage({
      count: 1,
      success: (res) => {
        imageURL.value = res.tempFilePaths[0]
      },
      fail: (err) => {
        console.log("err: ", JSON.stringify(err));
        uni.showToast({
          title: "choose image error.code:" + err.errCode + ";message:" + err.errMsg,
          position: "bottom"
        })
      }
    })
  }

  function share() {
    uni.showLoading({
      title: "正在分享......"
    })
    console.log('scene.value: ', scene.value);
    uni.share({
      provider: 'weixin',
      title: '微信分享',
      scene: scene.value,
      type: type.value,
      href: "https://uniapp.dcloud.net.cn/api/plugins/share.html",
      summary: shareContent.value,
      imageUrl: imageURL.value,
      success(res) {
        uni.hideLoading()
        uni.showToast({
          title: '分享成功'
        })
      },
      fail(e) {
        uni.hideLoading()
        uni.showToast({
          title: e.errMsg
        })
      }
    })
  }
</script>

<style>
  .uni-uploader__input-box {
    margin: 5px;
    width: 104px;
    height: 104px;
    border: 1px solid #D9D9D9;
  }

  .status-box {
    background-color: #FFFFFF;
    margin: 0 20px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.share.share)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/share.html)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=share&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=share&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=share&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=share&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=share&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=share)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=share&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 分享provider对象描述 @providerdes

UniShareWeixinProvider(微信分享)继承自 [UniProvider](./provider.md#uniprovider)


| 名称           | 类型      | 必备 | 默认值  | 描述                                  |
| -------------- | --------- | ---- | ------ | ------------------------------------- |
| isWeChatInstalled     | boolean   | 是    | -      | 判断微信是否安装 |


## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 错误信息 |

## 自定义分享provider接入到uni API @customprovider

背景：目前uni-app x引擎已经内置了微信分享。但分享SDK还有很多，比如微博、抖音分享。

以往这些SDK可以通过独立插件的方式集成到uni-app x中，但需要提供单独的API给开发者使用。

uni-app x从4.25起，开放了provider自接入机制，让三方SDK可以以[provider](./provider.md)方式被开发者集成。

开发一个UTS插件，对接uni规范化的API、错误信息描述等实现自己的分享插件，这样插件使用者就可以通过uni的标准API使用三方SDK。

举个例子，开发者想使用uni.share()的方式调用XX分享，但是内置分享api不支持，

那只需要按照下面四个步骤实现即可:

第一步，新建一个UTS插件，在interface.uts 中定义接口，UniShareProvider，代码如下

```ts
export interface UniShareWeixinProvider extends UniShareProvider{}
```

第二步，在app-android或者app-ios的index.uts中实现接口，代码如下

```ts
import { UniShareWeixinProvider } from '../interface.uts'
export class UniShareWeixinProviderImpl implements UniShareWeixinProvider {
	override id : String = "XX" // id必须有插件作者前缀，避免冲突，避免不同插件作者的插件id重名
	override description : String = "XX的描述"
	override isAppExist : boolean | null = null

	constructor(){}

	override share(options : ShareOptions) {
		//todo 具体逻辑，接收uni规范的入参，进行业务处理，返回uni规范的返回值。如遇到错误，按uni的规范返回错误码
	}
}
```

第三步，在manifest.json中配置

```ts
  "app": {
    "distribute": {
      /* android打包配置 */
      "modules": {
        "uni-share":{
          "XX":{}
        }
      }
    }
  }
```

第四步，打包自定义基座然后运行

### Bug&Tips @bug_tips

- HarmonyOS 平台分享图片时仅支持 jpeg/png 类型的图片
  - 分享视频，大小不能超过 64KB
  - 分享图片，大小不支持超过 100KB
- HarmonyOS 平台分享携带文本时
  - title 不支持超过 512 个字节
  - summary 不支持超过 1024 个字节
- 鸿蒙平台，HBuilderX 4.87 及以下版本，分享时有图片大于 20 KB 会出现分享失败的问题。临时方案是下载 [har包](https://web-ext-storage.dcloud.net.cn/temp/uni_modules__uni_share_weixin_x.har)并改名为 `uni_modules__uni_share_weixin.har`，放到 `项目根目录/harmony-configs/libs/` 目录下重新编译运行到手机。高版本不存在此问题

### 注意
- App平台开发微信分享，无需自定义基座，真机运行可直接开发
- App平台判断微信是否安装可以通过`uni.getProvider`的方式，详见[uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html#getprovider)

```ts
   uni.getProvider({
      service: "share",
      success: (e) => {
         const provider = e.providers.find((item): boolean => {
            return item.id == 'weixin'
         })

          // #ifdef APP-ANDROID
          if (provider != null && provider instanceof UniPaymentWxpayProvider && !((provider as UniPaymentWxpayProvider).isWeChatInstalled)) {
            console.log('WeChat 没有安装')
          } else {
             console.log('WeChat 已安装')
          }
          // #endif
          // #ifdef APP-IOS
          if (provider != null && ((provider as UniPaymentWxpayProvider).isWeChatInstalled == undefined || ((provider as UniPaymentWxpayProvider).isWeChatInstalled != null && (provider as UniPaymentWxpayProvider).isWeChatInstalled == false))) {
            console.log('WeChat 没有安装')
          } else {
            console.log('WeChat 已安装')
          }
          // #endif
      },
      fail: (e) => {
         console.log("获取分享通道失败：", e);
      }
   })
```
- **app需要在根目录manifest.json文件中配置`uni-share`节点，详见 [https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-share模块配置](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-share)**
