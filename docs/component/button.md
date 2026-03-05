<!-- ## button -->

::: sourceCode
## button
:::

> 组件类型：UniButtonElement 

 按钮


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| disabled | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否禁用 |
| hover-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "button-hover" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
| hover-stop-propagation | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | 指定是否阻止本节点的祖先节点出现点击态 |
| hover-start-time | number | 20 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 按住后多久出现点击态，单位毫秒 |
| hover-stay-time | number | 70 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 手指松开后点击态保留时间，单位毫秒 |
| size | string | "default" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 按钮大小 |
| type | string | "default" | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 按钮类型 |
| plain | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 按钮是否镂空，背景色透明 |
| loading | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 名称前是否带 loading 图标 |
| form-type | string | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件 |
| open-type | string | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开放能力 |
| lang | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 |
| session-from | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 会话来源 |
| send-message-title | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 会话内消息卡片标题 |
| send-message-path | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 会话内消息卡片点击跳转应用路径 |
| send-message-img | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 会话内消息卡片图片 |
| show-message-card | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 显示会话内消息卡片 |
| app-parameter | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开 APP 时，向 APP 传递的参数 |
| group-id | string | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开群资料卡时，传递的群号 |
| guild-id | string | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开频道页面时，传递的频道号 |
| public-id | string | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开公众号资料卡时，传递的号码 |
| phone-number-no-quota-toast | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>当手机号快速验证或手机号实时验证额度用尽时，是否对用户展示“申请获取你的手机号，但该功能使用次数已达当前小程序上限，暂时无法使用”的提示，默认展示，open-type="getPhoneNumber" 或 open-type="getRealtimePhoneNumber" 时有效 |
| createliveactivity | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>[新的一次性订阅消息下发机制](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-2.html)回调，open-type=liveActivity时有效 |
| loading-class | [string.ClassString](/uts/data-type.md#ide-string) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): 5.0 | loading 图标的类名 |
| ios-loading-snow | boolean | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | iOS 雪花加载效果 |
| @getuserinfo | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与uni.getUserInfo返回的一致 |
| @contact | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 客服消息回调 |
| @getphonenumber | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 获取用户手机号回调 |
| @error | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当使用开放能力时，发生错误的回调 |
| @opensetting | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 在打开授权设置页后回调 |
| @launchapp | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开 APP 成功的回调 |
| @chooseavatar | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 获取用户头像回调 |
| @chooseaddress | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 调起用户编辑并选择收货地址的回调 |
| @chooseinvoicetitle | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: -; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 用户选择发票抬头的回调 |
| @addgroupapp | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 添加群应用的回调 |
| @subscribe | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: -; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 订阅消息授权回调 |
| @login | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 登录回调 |
| @getrealtimephonenumber | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>手机号实时验证回调，open-type=getRealtimePhoneNumber 时有效。Tips：在触发 bindgetrealtimephonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。 |
| @agreeprivacyauthorization | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>用户同意隐私协议事件回调，open-type=agreePrivacyAuthorization时有效 （Tips: 如果使用 onNeedPrivacyAuthorization 接口，需要在 bindagreeprivacyauthorization 触发后再调用 `resolve({ event: "agree", buttonId })`） |

#### size 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| default | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 默认大小 |
| mini | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 小尺寸 |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| default | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 白色 |
| primary | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 蓝色 |
| warn | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 红色 |

#### form-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| submit | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 提交表单 |
| reset | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 重置表单 |

#### open-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| agreePrivacyAuthorization | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用户同意隐私协议按钮。用户点击一次此按钮后，所有已声明过的隐私接口可以正常调用。 |
| feedback | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开“意见反馈”页面，用户可提交反馈内容并上传日志 |
| share | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 触发用户转发 |
| getUserInfo | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 获取用户信息，可以从@getuserinfo回调中获取到用户信息 |
| contact | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息 |
| getPhoneNumber | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 获取用户手机号，可以从@getphonenumber回调中获取到用户信息 |
| launchApp | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开APP，可以通过app-parameter属性设定向APP传的参数 |
| openSetting | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开授权设置页 |
| chooseAvatar | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 获取用户头像，可以从@chooseavatar回调中获取到头像信息 |
| getAuthorize | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 支持小程序授权 |
| lifestyle | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 关注生活号 |
| contactShare | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 分享到通讯录好友 |
| openGroupProfile | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 呼起QQ群资料卡页面，可以通过group-id属性设定需要打开的群资料卡的群号，同时manifest.json中必须配置groupIdList |
| openGuildProfile | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 呼起频道页面，可以通过guild-id属性设定需要打开的频道ID |
| openPublicProfile | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 打开公众号资料卡，可以通过public-id属性设定需要打开的公众号资料卡的号码，同时manifest.json中必须配置publicIdList |
| shareMessageToFriend | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 在自定义开放数据域组件中,向指定好友发起分享据 |
| addFriend | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权 |
| addColorSign | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 添加彩签，点击后添加状态有用户提示，无回调 |
| addGroupApp | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 添加群应用（只有管理员或群主有权操作），添加后给button绑定@addgroupapp事件接收回调数据 |
| addToFavorites | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 收藏当前页面，点击按钮后会触发Page.onAddToFavorites方法 |
| chooseAddress | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 选择用户收货地址，可以从@chooseaddress回调中获取到用户选择的地址信息 |
| chooseInvoiceTitle | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 选择用户发票抬头，可以从@chooseinvoicetitle回调中获取到用户选择发票抬头信息 |
| login | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 登录，可以从@login回调中确认是否登录成功 |
| subscribe | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 订阅类模板消息，需要用户授权才可发送 |
| favorite | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 触发用户收藏 |
| watchLater | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 触发用户稍后再看 |
| openProfile | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 触发打开用户主页 |
| liveActivity | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 通过前端获取[新的一次性订阅消息下发机制](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-2.html)使用的 code |
| getRealtimePhoneNumber | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 手机号实时验证，向用户申请，并在用户同意后，快速填写和实时验证手机号。[具体说明]((getRealtimePhoneNumber)) （*小程序插件中不能使用*） |

#### lang 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| en | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 英文 |
| zh_CN | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 简体中文 |
| zh_TW | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 繁体中文 |



<!-- UTSCOMJSON.button.component_type-->

- 在web平台，由于0.5px有兼容性问题，button的边框使用伪类实现。
- 在app平台，HBuilderX4.02及以上版本调整为原生实现button组件，默认边框不占高度，解决button实际渲染宽高与Web端不一致的问题；HBuilderX4.01及以下版本封装text实现button组件，由于不支持伪类，默认边框使用 border 样式实现，会导致button的实际的渲染宽高在app端比web端多1px。
- button的默认边框宽度为0.5px，当type属性为plain时，边框宽度是1px，此时在web平台button实际的渲染宽高会大于其他类型1px，在app平台button实际的渲染高度与其他类型一致。
- button 的text区域文字，app平台HBuilderX4.02及以上版本支持 `\n` 方式换行，HBuilderX4.01及以下版本不支持 ，会直接显示 `\n` 字符；Web端 `\n` 会变成一个空格。
- button按下后触发hover-class效果，在app平台，手指不松开、一直在屏幕上移动、离开button组件范围后，hover-class效果消失，同时也不会触发点击事件；在web平台，手指移动一点后，即便未离开button范围，hover-class效果也会消失，同时也不会触发点击事件。
- 无论在哪个平台，hover-class消失后松开手指，都不会触发点击事件。
- button 设置hover-class属性时需注意，app平台HBuilderX4.04及以下版本与web平台有差异，HBuilderX4.05版本统一为以下规则：
  + 如果hover-class属性值设置为none，在style样式里面设置了同名的none样式，none样式将不起作用，没有点击态效果
  + 如果hover-class属性值设置为button-hover或者不设置hover-class属性值，在style样式里面设置了同名的button-hover样式，点击效果将使用button-hover样式
  + 如果hover-class属性值设置为无效值（或非法值），没有点击态效果
- `open-type="agreePrivacyAuthorization"`，用于开发者在让用户同意隐私协议时，放置“同意”按钮。它并非强制性的，它只是开发者和插件作者之间的一种通信方式。并不是没有点下这个按钮，技术上就拦截了涉及隐私的API的调用。[详见](../api/privacy.md)
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
      url: 'buttonstatus',
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

    <navigator url="/pages/template/button-100/button-100">
      <button>组件性能测试</button>
    </navigator>
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

## hover-class 属性值

### button样式修改@style

button在元素的text区域直接写文字，和text组件一样。可以这么理解，button是一个特殊的text组件，文字样式可以直接写在button组件的style或class上。

button组件属性中的size和type，属于预置样式，方便开发者使用。开发者也可以通过style和class来自定义样式。但它们在不同平台，覆盖方式需要注意：

	- App和Web平台style和class的优先级，高于size和type属性
	- 小程序平台，取决于不同小程序平台的button的实现方式。在微信小程序上，type和size属性的样式通过属性选择器设置，开发者设置的class，想要覆盖这2个属性的样式，需要加`!important`。而通过style设置样式，则优先级高于属性选择器，所以可以覆盖2个属性设置的样式。

	如果开发者要自定义button样式，最好不要使用type和size。包括type的颜色在不同小程序平台不一样，甚至在微信小程序的v1和v2的样式中也不一样。如果一定要用type，那么用style而不是class覆盖属性样式，也可以跨端兼容。

button虽然可以内嵌text组件，但不建议通过text组件来修改button样式，因为会导致hove-class不生效。尤其是uvue中样式不继承。建议button组件text区域直接写文字，然后在button组件的style或class属性编写样式。



```html
<template>
	<button size="default" type="default"
	style="color:#ffffff;backgroundColor:#1AAD19;borderColor:#1AAD19"
	hover-class="is-hover">按钮</button>
</template>
<style>
.is-hover {
	color: rgba(255, 255, 255, 0.6);
	background-color: #179b16;
	border-color: #179b16;
  }
</style>
```

## button点击

button 组件的点击遵循 vue 标准的 @click事件。

button 组件没有 url 属性，如果要跳转页面，可以在@click中编写，也可以在button组件外面套一层 navigator 组件。举例，如需跳转到about页面，可按如下几种代码写法执行：

```html
<template>
	<view>
		<navigator url="/pages/about/about"><button>通过navigator组件跳转到about页面</button></navigator>
		<button @click="goto('/pages/about/about')">通过方法跳转到about页面</button>
	</view>
</template>
<script>
	export default {
		methods: {
			goto(url:string) {
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>
```

## tips
- button 的默认文字大小为18px，文字行高为2.5。如果指定了按钮高度，要注意手动调整文字行高

## 样式冲突
使用属性选择器定义css存在平台兼容性，差异点如下：
- **Web** 因页面样式作用域隔离机制编译后会在 class 上增加属性选择器，会覆盖组件属性选择器样式
- **App** 暂不支持属性选择器
- **微信小程序** 普通 class 不能直接覆盖组件的属性选择器，因为属性选择器样式优先级更高
