[uni直播](https://doc.dcloud.net.cn/uniCloud/uni-live/intro.html)是DCloud与七牛云合作推出的直播服务，七牛云直播依托云边一体化架构和海量节点资源，构建高效的流媒体服务。通过多维度的节点监控与弹性的节点调度管理，确保高质量服务与成本效益的完美平衡。

`live-player` 组件是[uni直播](https://doc.dcloud.net.cn/uniCloud/uni-live/intro.html)服务中的拉流（播放）组件，在 Android/iOS 平台使用需要申请绑定包名/Bundle ID(AppID)，详情[咨询](https://im.dcloud.net.cn/#/?joinGroup=68622a2ba99ae56f95028db1)

<!-- ## live-player -->

::: sourceCode
## live-player
:::

实时音视频播放


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.81 | 4.81 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| src | string([string.VideoURIString](/uts/data-type.md#ide-string)) | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 音视频地址。微信小程序支持 flv, rtmp 格式，app平台支持 rtmp, hls 协议 |
| mode | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | live（直播），RTC（实时通话） |
| autoplay | boolean | false | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 自动播放 |
| muted | boolean | false | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 是否静音 |
| orientation | string | "vertical" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 画面方向，可选值有 vertical，horizontal |
| object-fit | string | "contain" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 填充模式，可选值有 contain，fillCrop |
| background-mute | boolean | false | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 进入后台时是否静音 |
| min-cache | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 最小缓冲区，单位s |
| max-cache | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 最大缓冲区，单位s |
| sound-mode | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>声音输出方式 |
| auto-pause-if-navigate | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>当跳转到本小程序的其他页面时，是否自动暂停本页面的实时音视频播放 |
| auto-pause-if-open-native | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>当跳转到其它微信原生页面时，是否自动暂停本页面的实时音视频播放 |
| picture-in-picture-mode | string/Array | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string/Array)*<br/>设置小窗模式： push, pop，空字符串或通过数组形式设置多种模式（如： \["push", "pop"] |
| picture-in-picture-init-position= | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>小窗模式下小窗的初始显示位置，格式为 (alignment, y)，其中 alignment 表示小窗吸附屏幕左侧还是右侧，可选值为 left、right，y 代表小窗最顶部所在的屏幕高度百分比 |
| enable-auto-rotation | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>是否开启手机横屏时自动全屏，当系统设置开启自动旋转时生效 |
| referrer-policy | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>格式固定为 `https://servicewechat.com/{appid}/{version}/page-frame.html`，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本； |
| enable-casting | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>是否支持投屏。开启后，可以通过 [LivePlayerContext]((LivePlayerContext)) 上相关方法进行操作。 |
| @statechange | (event: [UniLivePlayerStatechangeEvent](#uniliveplayerstatechangeevent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 播放状态变化事件，event.detail = {code} |
| @fullscreenchange | (event: [UniLivePlayerFullscreenchangeEvent](#uniliveplayerfullscreenchangeevent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 全屏变化事件，event.detail = {direction, fullScreen} |
| @error | (event: [UniLivePlayerErrorEvent](#uniliveplayererrorevent)) => void | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 错误事件，event.detail = {errCode, errMsg} |
| @netstatus | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 网络状态通知，detail = {info} |
| @audiovolumenotify | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>播放音量大小通知，detail = {} |
| @enterpictureinpicture | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>播放器进入小窗 |
| @leavepictureinpicture | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>播放器退出小窗 |
| @castinguserselect | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>用户选择投屏设备时触发 detail = { state: "success"/"fail" } |
| @castingstatechange | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>投屏成功/失败时触发 detail = { type, state: "success"/"fail" } |
| @castinginterrupt | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>投屏被中断时触发 |

#### mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| RTC | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| live | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | - |

#### orientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| vertical | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| horizontal | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |

#### object-fit 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| contain | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| fillCrop | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |

#### sound-mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| speaker | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 扬声器 |
| ear | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 听筒 |

#### picture-in-picture-mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| [] | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 取消小窗 |
| push | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 路由 push 时触发小窗 |
| pop | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 路由 pop 时触发小窗 |

#### referrer-policy 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| origin | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 发送完整的referrer |
| no-referrer | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 不发送 |


### 事件
#### UniLivePlayerStatechangeEvent
播放状态变化事件

##### UniLivePlayerStatechangeEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniLivePlayerStatechangeEventDetail** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | - |
| cancelable | boolean | 是 | - | - | - |
| type | string | 是 | - | - | - |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| timeStamp | Long | 是 | - | - | - |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| code | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 状态码 |

##### code 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 10000 | - | - |
| 10001 | - | 初始化 |
| 10002 | - | 准备播放 |
| 10004 | - | 播放中 |
| 10006 | - | 停止渲染 |
| 10007 | - | 播放完成 |
| 10008 | - | 播放进度跳转中 |
| 10009 | - | 播放停止 |
| 10010 | - | 播放错误 |
| 10011 | - | 播放结束 |
| 10012 | - | - |
| 10013 | - | 资源释放 |


##### UniLivePlayerStatechangeEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | - |
| preventDefault | () => void | 是 | - | - | - |

#### UniLivePlayerFullscreenchangeEvent
全屏事件

##### UniLivePlayerFullscreenchangeEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniLivePlayerFullscreenchangeEventDetail** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | - |
| cancelable | boolean | 是 | - | - | - |
| type | string | 是 | - | - | - |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| timeStamp | Long | 是 | - | - | - |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| direction | string | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 屏幕方向 |
| fullScreen | boolean | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 是否全屏 |


##### UniLivePlayerFullscreenchangeEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | - |
| preventDefault | () => void | 是 | - | - | - |

#### UniLivePlayerErrorEvent
错误事件

##### UniLivePlayerErrorEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniLivePlayerError** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | - |
| cancelable | boolean | 是 | - | - | - |
| type | string | 是 | - | - | - |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| timeStamp | Long | 是 | - | - | - |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | - | - |
| errSubject | string | 是 | - | - | 统一错误主题（模块）名称 |
| data | any | 否 | - | - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | - | - |

##### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 3001 | - | 当前视频格式不支持，视频无法播放 |
| 3002 | - | 视频解码失败 |
| 3003 | - | 不支持的解码格式 |
| 3004 | - | 重连失败，请检查网络情况 |
| 3005 | - | 视频播放失败，请检查网络或视频资源 |


##### UniLivePlayerErrorEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | - |
| preventDefault | () => void | 是 | - | - | - |


<!-- UTSCOMJSON.live-player.component_type -->

### 音视频协议
- 支持 rtmp、hls 协议格式。

### 上下文对象API
[uni.createLivePlayerContext()](../api/create-live-player-context.md)



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/live-player/live-player.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/live-player/live-player.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/live-player/live-player
```uvue
<template>
  <view class="uni-flex-item">
    <live-player id="live-player" class="live-player" :src="src" :autoplay="autoplay" :muted="muted"
      :object-fit="objectFit" :background-mute="backgroundMute" :sound-mode="soundMode" :orientation="orientation"
      @statechange="statechange" @fullscreenchange="fullscreenchange" @error="error">
    </live-player>
    <scroll-view class="uni-padding-wrap uni-common-mt uni-flex-item">
      <view class="uni-title">
        <text class="uni-title-text">API示例</text>
      </View>
      <view class="uni-btn-v">
        <button type="primary" @click="play" :disabled="playState">播放</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="pause" :disabled="!playState">暂停</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="resume" :disabled="initState || playState || stopState">恢复</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="stop" :disabled="!playState">停止</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="mute" :disabled="!playState">静音</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="requestFullScreen" :disabled="!playState">进入全屏</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="exitFullScreen" :disabled="!playState">退出全屏</button>
      </view>
      <view class="uni-title">
        <text class="uni-title-text">属性示例</text>
      </view>
      <input class="input margin-10" type="string" placeholder="设置播放地址" @confirm="onSrcComfirm"></input>
      <boolean-data title="设置是否自动播放" :defaultValue="autoplay" @change="onAutoplayChange"></boolean-data>
      <boolean-data title="设置是否静音" :defaultValue="muted" @change="onMutedChange"></boolean-data>
      <boolean-data title="设置进入后台时是否静音" :defaultValue="backgroundMute" @change="onBackgroundMuteChange"></boolean-data>
      <enum-data title="设置填充模式" :items="objectFitItemTypes" @change="onObjectFitChange"></enum-data>
      <enum-data title="设置声音输出方式" :items="soundModeItemTypes" @change="onSoundModeChange"></enum-data>
      <enum-data title="设置画面方向" :items="orientationItemTypes" @change="onOrientationChange"></enum-data>
    </scroll-view>
  </view>
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types';

  const context = ref(null as LivePlayerContext | null);
  const src = ref("");
  const autoplay = ref(false);
  const muted = ref(false);
  const objectFit = ref("contain");
  const backgroundMute = ref(false);
  const soundMode = ref("speaker");
  const orientation = ref("vertical");
  const initState = ref(true);
  const playState = ref(false);
  const stopState = ref(false);

  onReady(() => {
    context.value = uni.createLivePlayerContext("live-player", getCurrentInstance()!.proxy);
  });

  const statechange = (e : UniLivePlayerStatechangeEvent) => {
    console.log("statechange", e);
    switch (e.detail.code) {
      case 10004:
        initState.value = false;
        playState.value = true;
        stopState.value = false;
        break;
      case 10009:
        stopState.value = true;
      case 10006:
      case 10007:
      case 10010:
      case 10011:
        playState.value = false;
        break;
    }
  };
  const fullscreenchange = (e : UniLivePlayerFullscreenchangeEvent) => {
    console.log("fullscreenchange", e);
  };
  const error = (e : UniLivePlayerErrorEvent) => {
    console.log("error", e);
  };
  const isSrcValid = () : boolean => {
    const length = src.value.length;
    if (length <= 0) {
      uni.showToast({
        title: "请输入播放地址",
        icon: "none"
      });
    }
    return length > 0;
  };
  const play = () => {
    if (!isSrcValid()) return;
    context.value?.play({
      success: (res) => {
        console.log("play", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("play", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("play", JSON.stringify(res));
      }
    });
  };
  const pause = () => {
    if (!isSrcValid()) return;
    context.value?.pause({
      success: (res) => {
        console.log("pause", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("pause", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("pause", JSON.stringify(res));
      }
    });
  };
  const resume = () => {
    if (!isSrcValid()) return;
    context.value?.resume({
      success: (res) => {
        console.log("resume", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("resume", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("resume", JSON.stringify(res));
      }
    });
  };
  const stop = () => {
    if (!isSrcValid()) return;
    context.value?.stop({
      success: (res) => {
        console.log("stop", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("stop", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("stop", JSON.stringify(res));
      }
    });
  };
  const mute = () => {
    if (!isSrcValid()) return;
    context.value?.mute({
      success: (res) => {
        console.log("mute", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("mute", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("mute", JSON.stringify(res));
      }
    });
  };
  const requestFullScreen = () => {
    if (!isSrcValid()) return;
    context.value?.requestFullScreen({
      success: (res) => {
        console.log("requestFullScreen", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("requestFullScreen", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("requestFullScreen", JSON.stringify(res));
      }
    });
  };
  const exitFullScreen = () => {
    if (!isSrcValid()) return;
    context.value?.exitFullScreen({
      success: (res) => {
        console.log("exitFullScreen", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("exitFullScreen", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("exitFullScreen", JSON.stringify(res));
      }
    });
  };

  const objectFitItemTypes = [{ "value": 0, "name": "contain" }, { "value": 1, "name": "fillCrop" }] as ItemType[];
  const objectFitItems = ["contain", "fillCrop"];
  const soundModeItemTypes = [{ "value": 0, "name": "speaker" }, { "value": 1, "name": "ear" }] as ItemType[];
  const soundModeItems = ["speaker", "ear"];
  const orientationItemTypes = [{ "value": 0, "name": "vertical" }, { "value": 1, "name": "horizontal" }] as ItemType[];
  const orientationItems = ["vertical", "horizontal"];
  const onSrcComfirm = (event : UniInputConfirmEvent) => {
    let value = event.detail.value;
    if (value == '') return;
    src.value = value;
    console.log("src ->", value);
  };
  const onAutoplayChange = (value : boolean) => {
    autoplay.value = value;
    console.log("autoplay ->", autoplay.value);
  };
  const onMutedChange = (value : boolean) => {
    muted.value = value;
    console.log("muted ->", muted.value);
  };
  const onBackgroundMuteChange = (value : boolean) => {
    backgroundMute.value = value;
    console.log("background-mute ->", backgroundMute.value);
  };
  const onObjectFitChange = (value : number) => {
    objectFit.value = objectFitItems[value];
    console.log("object-fit ->", objectFit.value);
  };
  const onSoundModeChange = (value : number) => {
    soundMode.value = soundModeItems[value];
    console.log("sound-mode ->", soundMode.value);
  };
  const onOrientationChange = (value : number) => {
    orientation.value = orientationItems[value];
    console.log("orientation ->", orientation.value);
  };
</script>

<style>
  .live-player {
    width: 100%;
    height: 40%;
  }

  .input {
    height: 40px;
    background: #FFF;
    padding: 8px 13px;
  }

  .margin-10 {
    margin: 10px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.media.live-player)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/live-player.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=live-player&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=live-player&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=live-player&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=live-player&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=live-player)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=live-player&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
