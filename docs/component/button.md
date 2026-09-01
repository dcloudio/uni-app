<!-- ## button -->

::: sourceCode
## button
:::

> 组件类型：UniButtonElement 

 按钮


### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| disabled | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 是否禁用 |
| hover-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "button-hover" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
| hover-stop-propagation | boolean | false | Web: x; 微信小程序: 4.41; Android(VDOM): x; Android(Vapor): 5.21; iOS(VDOM): x; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.0 | 指定是否阻止本节点的祖先节点出现点击态 |
| hover-start-time | number | 20 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 按住后多久出现点击态，单位毫秒 |
| hover-stay-time | number | 70 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 手指松开后点击态保留时间，单位毫秒 |
| size | string | "default" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 按钮大小 |
| type | string | "default" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 按钮类型 |
| plain | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 按钮是否镂空，背景色透明 |
| loading | boolean | false | Web: 4.0; 微信小程序: 4.41; Android(VDOM): x; Android(Vapor): 5.21; iOS(VDOM): x; iOS(Vapor): 5.11; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.0 | 名称前是否带 loading 图标 |
| form-type | string |   | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件 |
| open-type | string |   | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61 | 开放能力 |
| lang | string |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 |
| session-from | string |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 会话来源 |
| send-message-title | string |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 会话内消息卡片标题 |
| send-message-path | string |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 会话内消息卡片点击跳转应用路径 |
| send-message-img | string |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 会话内消息卡片图片 |
| show-message-card | boolean |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 显示会话内消息卡片 |
| app-parameter | string |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 打开 APP 时，向 APP 传递的参数 |
| group-id | string |   | Web: x; 微信小程序: x; Android: x; iOS: x | 打开群资料卡时，传递的群号 |
| guild-id | string |   | Web: x; 微信小程序: x; Android: x; iOS: x | 打开频道页面时，传递的频道号 |
| public-id | string |   | Web: x; 微信小程序: x; Android: x; iOS: x | 打开公众号资料卡时，传递的号码 |
| phone-number-no-quota-toast | boolean |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | *(boolean)*<br/>当手机号快速验证或手机号实时验证额度用尽时，是否对用户展示“申请获取你的手机号，但该功能使用次数已达当前小程序上限，暂时无法使用”的提示，默认展示，open-type="getPhoneNumber" 或 open-type="getRealtimePhoneNumber" 时有效 |
| createliveactivity | eventhandle |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>[新的一次性订阅消息下发机制](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-2.html)回调，open-type=liveActivity时有效 |
| loading-class | string([string.ClassString](/uts/data-type.md#ide-string)) |   | Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.0 | loading 图标的类名 |
| loading-text-class | string([string.ClassString](/uts/data-type.md#ide-string)) |   | Android(Vapor): 5.21; iOS(Vapor): 5.21; HarmonyOS(Vapor): 5.21 | loading 文案的类名 |
| ios-loading-snow | boolean | false | iOS(Vapor): 5.11 | iOS 雪花加载效果 |
| @getuserinfo | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与uni.getUserInfo返回的一致 |
| @contact | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 客服消息回调 |
| @getphonenumber | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 获取用户手机号回调 |
| @error | (event: [UniEvent](/component/common.md#unievent)) => void |   | 微信小程序: 4.41; Android: x; iOS: x | 当使用开放能力时，发生错误的回调 |
| @opensetting | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 在打开授权设置页后回调 |
| @launchapp | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 打开 APP 成功的回调 |
| @chooseavatar | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 获取用户头像回调 |
| @chooseaddress | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: x; Android: x; iOS: x | 调起用户编辑并选择收货地址的回调 |
| @chooseinvoicetitle | (event: [UniEvent](/component/common.md#unievent)) => void |   | 微信小程序: x; Android: x; iOS: x | 用户选择发票抬头的回调 |
| @addgroupapp | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: x; Android: x; iOS: x | 添加群应用的回调 |
| @subscribe | (event: [UniEvent](/component/common.md#unievent)) => void |   | 微信小程序: x; Android: x; iOS: x | 订阅消息授权回调 |
| @login | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: x; 微信小程序: x; Android: x; iOS: x | 登录回调 |
| @getrealtimephonenumber | eventhandle |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>手机号实时验证回调，open-type=getRealtimePhoneNumber 时有效。Tips：在触发 bindgetrealtimephonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。 |
| @agreeprivacyauthorization | eventhandle |   | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>用户同意隐私协议事件回调，open-type=agreePrivacyAuthorization时有效 （Tips: 如果使用 onNeedPrivacyAuthorization 接口，需要在 bindagreeprivacyauthorization 触发后再调用 `resolve({ event: "agree", buttonId })`） |

#### size 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| default | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 默认大小 |
| mini | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 小尺寸 |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| default | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 白色 |
| primary | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 蓝色 |
| warn | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 红色 |

#### form-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| submit | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 提交表单 |
| reset | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 重置表单 |

#### open-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| agreePrivacyAuthorization | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61 | 用户同意隐私协议按钮。用户点击一次此按钮后，所有已声明过的隐私接口可以正常调用。 |
| feedback | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 打开“意见反馈”页面，用户可提交反馈内容并上传日志 |
| share | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 触发用户转发 |
| getUserInfo | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 获取用户信息，可以从@getuserinfo回调中获取到用户信息 |
| contact | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息 |
| getPhoneNumber | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 获取用户手机号，可以从@getphonenumber回调中获取到用户信息 |
| launchApp | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 打开APP，可以通过app-parameter属性设定向APP传的参数 |
| openSetting | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 打开授权设置页 |
| chooseAvatar | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 获取用户头像，可以从@chooseavatar回调中获取到头像信息 |
| getAuthorize | Web: x; 微信小程序: x; Android: x; iOS: x | 支持小程序授权 |
| lifestyle | Web: x; 微信小程序: x; Android: x; iOS: x | 关注生活号 |
| contactShare | Web: x; 微信小程序: x; Android: x; iOS: x | 分享到通讯录好友 |
| openGroupProfile | Web: x; 微信小程序: x; Android: x; iOS: x | 呼起QQ群资料卡页面，可以通过group-id属性设定需要打开的群资料卡的群号，同时manifest.json中必须配置groupIdList |
| openGuildProfile | Web: x; 微信小程序: x; Android: x; iOS: x | 呼起频道页面，可以通过guild-id属性设定需要打开的频道ID |
| openPublicProfile | Web: x; 微信小程序: x; Android: x; iOS: x | 打开公众号资料卡，可以通过public-id属性设定需要打开的公众号资料卡的号码，同时manifest.json中必须配置publicIdList |
| shareMessageToFriend | Web: x; 微信小程序: x; Android: x; iOS: x | 在自定义开放数据域组件中,向指定好友发起分享 |
| addFriend | Web: x; 微信小程序: x; Android: x; iOS: x | 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权 |
| addColorSign | Web: x; 微信小程序: x; Android: x; iOS: x | 添加彩签，点击后添加状态有用户提示，无回调 |
| addGroupApp | Web: x; 微信小程序: x; Android: x; iOS: x | 添加群应用（只有管理员或群主有权操作），添加后给button绑定@addgroupapp事件接收回调数据 |
| addToFavorites | Web: x; 微信小程序: x; Android: x; iOS: x | 收藏当前页面，点击按钮后会触发Page.onAddToFavorites方法 |
| chooseAddress | Web: x; 微信小程序: x; Android: x; iOS: x | 选择用户收货地址，可以从@chooseaddress回调中获取到用户选择的地址信息 |
| chooseInvoiceTitle | Web: x; 微信小程序: x; Android: x; iOS: x | 选择用户发票抬头，可以从@chooseinvoicetitle回调中获取到用户选择发票抬头信息 |
| login | Web: x; 微信小程序: x; Android: x; iOS: x | 登录，可以从@login回调中确认是否登录成功 |
| subscribe | Web: x; 微信小程序: x; Android: x; iOS: x | 订阅类模板消息，需要用户授权才可发送 |
| favorite | Web: x; 微信小程序: x; Android: x; iOS: x | 触发用户收藏 |
| watchLater | Web: x; 微信小程序: x; Android: x; iOS: x | 触发用户稍后再看 |
| openProfile | Web: x; 微信小程序: x; Android: x; iOS: x | 触发打开用户主页 |
| liveActivity | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 通过前端获取[新的一次性订阅消息下发机制](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-2.html)使用的 code |
| getRealtimePhoneNumber | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 手机号实时验证，向用户申请，并在用户同意后，快速填写和实时验证手机号。[具体说明]((getRealtimePhoneNumber)) （*小程序插件中不能使用*） |

#### lang 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| en | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 英文 |
| zh_CN | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 简体中文 |
| zh_TW | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 繁体中文 |



<!-- UTSCOMJSON.button.component_type-->

### 子组件 @children-tags
不可以嵌套组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/button/button.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/button/button.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/button/button

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/button/button

>示例
```vue
<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  type DataType = {
    plain_boolean: boolean;
    disabled_boolean: boolean;
    default_style: boolean;
    size_enum: ItemType[];
    size_enum_current: number;
    type_enum: ItemType[];
    type_enum_current: number;
    count: number;
    text: string;
    loading: boolean;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    plain_boolean: false,
    disabled_boolean: false,
    default_style: false,
    size_enum: [{ "value": 0, "name": "default" }, { "value": 1, "name": "mini" }],
    size_enum_current: 0,
    type_enum: [{ "value": 0, "name": "default" }, { "value": 1, "name": "primary" }, { "value": 2, "name": "warn" }],
    type_enum_current: 0,
    count: 0,
    text: '',
    loading: false,
  } as DataType)

  onReady(() => {
    data.text = 'uni-app-x'
  })

  const button_click = () => {
    console.log("组件被点击时触发")
    data.count++
  }

  const button_touchstart = () => {
    console.log("手指触摸动作开始")
  }

  const button_touchmove = () => {
    console.log("手指触摸后移动")
  }

  const button_touchcancel = () => {
    console.log("手指触摸动作被打断，如来电提醒，弹窗")
  }

  const button_touchend = () => {
    console.log("手指触摸动作结束")
  }

  const button_tap = () => {
    console.log("手指触摸后马上离开")
  }

  const button_longpress = () => {
    console.log("如果一个组件被绑定了 longpress 事件，那么当用户长按这个组件时，该事件将会被触发。")
  }

  const change_plain_boolean = (checked: boolean) => {
    data.plain_boolean = checked
  }

  const change_loading = (checked: boolean) => {
    data.loading = checked
  }

  const change_disabled_boolean = (checked: boolean) => {
    data.disabled_boolean = checked
  }

  const change_default_style = (checked: boolean) => {
    data.default_style = checked
  }

  const radio_change_size_enum = (checked: number) => {
    data.size_enum_current = checked
  }

  const radio_change_type_enum = (checked: number) => {
    data.type_enum_current = checked
  }

  const confirm_text_input = (value: string) => {
    data.text = value
  }

  const navigateToChild = () => {
    uni.navigateTo({
      url: '/pages/component/button/buttonstatus',
    })
  }

  const openPrivacyDialog = () => {
    uni.openDialogPage({
      url: '/pages/component/button/privacy',
    })
  }

  //用于自动化测试
  const checkUniButtonElement = (): boolean => {
    const button = uni.getElementById("testButton")
    if (button != null && button instanceof UniButtonElement) {
      return true
    }
    return false
  }

  defineExpose({
    data,
    checkUniButtonElement
  })
</script>

<template>
  <view class="main">
    <button id="testButton" :loading="data.loading" :disabled="data.disabled_boolean"
      :size="data.size_enum[data.size_enum_current].name" :type="data.type_enum[data.type_enum_current].name"
      :plain="data.plain_boolean" @touchstart="button_touchstart" @touchmove="button_touchmove"
      @touchcancel="button_touchcancel" @touchend="button_touchend" @tap="button_tap" @click="button_click"
      @longpress="button_longpress" class="btn"
      :loading-text-class="data.loading ? (data.type_enum[data.type_enum_current].name == 'default' ? 'black-loading-text' : 'white-loading-text') : ''"
      :class="data.default_style ? (data.disabled_boolean ? 'custom-btn-disable' : 'custom-btn') : ''"
      :hover-class="data.default_style ? 'is-hover' : 'button-hover'">
      {{ data.text }}
    </button>
  </view>
  <scroll-view style="flex: 1">
    <view class="content">
      <boolean-data :defaultValue="false" title="按钮是否镂空，背景色透明" @change="change_plain_boolean"></boolean-data>
      <boolean-data :defaultValue="false" title="是否禁用" @change="change_disabled_boolean"></boolean-data>
      <boolean-data :defaultValue="false" title="修改默认样式和点击效果(高优先)" @change="change_default_style"></boolean-data>
      <boolean-data :defaultValue="false" title="显示loading（限小程序和蒸汽模式的App）" @change="change_loading"></boolean-data>
      <enum-data :items="data.size_enum" title="按钮的大小" @change="radio_change_size_enum"></enum-data>
      <enum-data :items="data.type_enum" title="按钮的类型" @change="radio_change_type_enum"></enum-data>
      <input-data :defaultValue="data.text" title="按钮的文案" type="text" @confirm="confirm_text_input"></input-data>
      <view style="height: 10px;"></view>
      <button @click="navigateToChild">更多button示例</button>
      <view style="height: 10px;"></view>
      <!-- #ifdef APP -->
      <button @click="openPrivacyDialog">open-type实现App隐私政策弹框</button>
      <view style="height: 10px;"></view>
      <!-- #endif -->
    </view>

    <!-- #ifndef MP-ALIPAY -->
      <navigator url="/pages/template/button-100/button-100">
        <button>组件性能测试</button>
      </navigator>
    <!-- #endif -->
  </scroll-view>
</template>

<style>
  .main {
    padding: 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    flex-direction: row;
    justify-content: center;
  }

  .custom-btn {
    color: #ffffff;
    background-color: #1AAD19;
    border-color: #1AAD19;
  }

  .custom-btn-disable {
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(26, 173, 25, 0.7);
    border-color: rgba(26, 173, 25, 0.7);
  }

  .is-hover {
    color: rgba(255, 255, 255, 0.6);
    background-color: #179b16;
    border-color: #179b16;
  }

  .button-hover {
    color: rgba(0, 0, 0, 0.6);
    background-color: #dedede;
  }

  .default-button {
    color: #000000;
    background-color: #f8f8f8;
    border-color: rgba(0, 0, 0, 0.2);
  }

  .black-loading-text {
    color: #000000
  }

  .white-loading-text {
    color: #ffffff
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.form-component.button)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/button.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=button&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=button&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=button&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=button&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=button)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=button&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 样式修改 @style

button 的 size、type 属性是预置样式，适合快速使用；如需修改文字、背景、边框、尺寸等样式，可直接在 button 组件上使用 style 或 class 覆盖。如需保持样式一致，建议不要依赖 type 的默认颜色。

APP 蒸汽模式不支持属性选择器，建议使用 class 或 style 自定义样式。

APP蒸汽模式、WEB 和微信小程序平台的 button 组件在 `plain` 为 `true` 时，通过 class 配置的 `background-color` 样式不生效，只能通过 style 设置。

```html
<template>
	<button class="custom-button" hover-class="custom-button-hover">按钮</button>
</template>

<style>
.custom-button {
	color: #ffffff;
	background-color: #1AAD19;
	border-color: #1AAD19;
}

.custom-button-hover {
	color: rgba(255, 255, 255, 0.6);
	background-color: #179b16;
	border-color: #179b16;
}
</style>
```

## 暗黑模式

App平台蒸汽模式从 5.25+ 起内置适配 button 默认样式的暗黑模式。暗黑模式下，默认按钮背景色为 `#343434`，文字色为 `#d6d6d6`；按下时背景色为 `rgba(255, 255, 255, 0.1)`；禁用时背景色为 `rgba(255, 255, 255, 0.08)`，文字色为 `rgba(255, 255, 255, 0.2)`。

暗黑模式下，默认镂空按钮背景色为 `transparent`，边框色和文字色为 `#353535`；镂空按钮按下时背景色为 `rgba(50, 50, 50, 0.2)`，边框色和文字色为 `rgba(150, 150, 150, 0.6)`；镂空按钮禁用时背景色为 `transparent`，边框色和文字色为 `rgba(255, 255, 255, 0.2)`。

## hover-class 属性值

button 按下后触发 hover-class 效果。点击态取消后的触发规则如下：

- Android 平台：手指不松开并持续在屏幕上移动，离开 button 组件范围后，hover-class 效果消失。
- iOS 平台：手指按下后，hover-class 效果会保持到手指抬起时消失。
- 鸿蒙平台、Web 平台：手指移动一点后，即便未离开 button 范围，hover-class 效果也会消失。

button 设置 hover-class 属性规则如下：

- 如果 hover-class 属性值设置为 button-hover 或者不设置 hover-class 属性值，在 style 样式里面设置了同名的 button-hover 样式，点击效果将使用 button-hover 样式。
- 如果 hover-class 属性值设置为无效值（或非法值），没有点击态效果。

## 点击跳转

button 组件没有 url 属性，点击后需要跳转页面时，可在 @click 中调用路由 API，也可以使用 [navigator](./navigator.md) 组件实现声明式跳转。

```html
<template>
	<view>
		<button @click="gotoAbout">跳转到 about 页面</button>
		<navigator url="/pages/about/about" open-type="navigate">
			<button>使用 navigator 跳转到 about 页面</button>
		</navigator>
	</view>
</template>

<script setup lang="uts">
	function gotoAbout() {
		uni.navigateTo({
			url: '/pages/about/about'
		})
	}
</script>
```

## 隐私协议授权

`open-type="agreePrivacyAuthorization"` 用于开发者在让用户同意隐私协议时，放置“同意”按钮。它不是强制拦截能力，只是开发者和插件作者之间的一种通信方式；未点击该按钮，并不代表技术上会拦截涉及隐私的 API 调用。[详见](../api/privacy.md)

## 文本显示

- 如果 button 组件的文本内容包含 `\n`，非蒸汽模式 APP 和 web 会被渲染为字符，不会换行，微信小程序会移除换行符号。蒸汽模式 APP 会移除 `\n` 旁的文字。
- 非蒸汽模式 button 默认文字大小为 18px，文字行高为 2.5。自定义高度时，需要同步调整 line-height。
- APP 蒸汽模式下，button 的文字居中依赖 padding。调整 height 和 line-height 时，建议同时将 padding-top、padding-bottom 设置为 0。

```html
<template>
	<button style="height: 50px; line-height: 50px; padding-top: 0; padding-bottom: 0;">按钮</button>
</template>
```
