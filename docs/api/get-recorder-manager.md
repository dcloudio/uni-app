<!-- ## uni.getRecorderManager() @getrecordermanager -->

::: sourceCode
## uni.getRecorderManager() @getrecordermanager

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-recorder


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-recorder

:::

录音管理

### getRecorderManager 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |


web平台可通过插件拉齐，[详见](https://ext.dcloud.net.cn/search?q=getRecorderManager&orderBy=Relevance&cat1=4&cat2=41&uni-app-platforms=&uni-app-x-platforms=)



### 返回值 

| 类型 |
| :- |
| [RecorderManager](#recordermanager-values) |

#### RecorderManager 的方法 @recordermanager-values 

#### start(options : RecorderManagerStartOptions) : void; @start
start
开始录音
##### start 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RecorderManagerStartOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| duration | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，默认值 60000（1 分钟)，微信小程序最大值 600000（10 分钟), App 平台没有最大值限制 |
| sampleRate | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 采样率，有效值 8000/16000/44100, Android平台默认是8000，iOS平台默认是44100 |
| numberOfChannels | number | 否 | 2 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 录音通道数，有效值 1/2 |
| encodeBitRate | number | 否 | 48000 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 编码码率，有效值见下表格 |
| format | string | 否 | aac | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 音频格式 |
| frameSize | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。 | 

##### format 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| aac | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | aac格式 |
| mp3 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | mp3格式 |
| pcm | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | pcm格式 |
| wav | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | wav格式 |
| m4a | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | m4a格式 |


#### pause() : void; @pause
pause
暂停录音,App-Android平台在Android 7.0及以后版本支持
##### pause 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 7.0 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |



#### resume() : void; @resume
resume
继续录音，App-Android平台在Android 7.0及以后版本支持
##### resume 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 7.0 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |



#### stop() : void; @stop
stop
停止录音
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |



#### onStart(options : (result : any) => void) : void; @onstart
onStart
录音开始事件
##### onStart 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offStart() : void; @offstart
offStart
取消监听录音开始事件
##### offStart 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.0 | 5.0 | 5.0 | 5.0 |



#### onPause(options : (result : any) => void) : void; @onpause
onPause
录音暂停事件,App-Android平台在Android 7.0及以后版本支持
##### onPause 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 7.0 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offPause() : void; @offpause
offPause
取消监听录音暂停事件
##### offPause 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 7.0 | 5.0 | 5.0 | 5.0 | 5.0 |



#### onStop(options : (result : RecorderManagerOnStopResult) => void) : void; @onstop
onStop
录音停止事件，会回调文件地址
##### onStop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: [RecorderManagerOnStopResult](#recordermanageronstopresult-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### RecorderManagerOnStopResult 的属性值 @recordermanageronstopresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 录音文件的临时路径 |


#### offStop() : void; @offstop
offStop
取消监听录音停止事件
##### offStop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.0 | 5.0 | 5.0 | 5.0 |



#### onFrameRecorded(options : (result : any) => void) : void; @onframerecorded
onFrameRecorded
已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
##### onFrameRecorded 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | x | x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offFrameRecorded() : void; @offframerecorded
offFrameRecorded
取消监听帧回调事件
##### offFrameRecorded 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | x | x | x | x |



#### onError(options: (result: IRecorderManagerFail) => void): void; @onerror
onError
录音错误事件, 会回调错误信息
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: [IRecorderManagerFail](#irecordermanagerfail-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### IRecorderManagerFail 的属性值 @irecordermanagerfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1107601 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有麦克风权限 |
| 1107602 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持该采样率 |
| 1107603 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 采样率是和编码码率不匹配 |
| 1107604 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 启动失败 |
| 1107605 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持该音频格式 |
| 1107606 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 其他错误 |
| 1107607 | Web: x; 微信小程序: 4.41; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 被打断 |
| 1107608 | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: x; HarmonyOS: x | 正在录音中，请稍后执行此操作 |


#### offError(): void; @offerror
offError
取消监听录音错误事件
##### offError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.0 | 5.0 | 5.0 | 5.0 |



#### onResume(options : (result : any) => void) : void; @onresume
onResume
监听录音继续事件,App-Android平台在Android 7.0及以后版本支持
##### onResume 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 7.0 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offResume() : void; @offresume
offResume
取消监听录音继续事件
##### offResume 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 7.0 | 5.0 | 5.0 | 5.0 | 5.0 |



#### onInterruptionBegin(options : (result : any) => void) : void; @oninterruptionbegin
onInterruptionBegin
监听录音因为受到系统占用而被中断开始事件
##### onInterruptionBegin 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offInterruptionBegin() : void; @offinterruptionbegin
offInterruptionBegin
取消监听录音因为受到系统占用而被中断开始事件
##### offInterruptionBegin 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.0 | 5.0 | 5.0 | 5.0 |



#### onInterruptionEnd(options : (result : any) => void) : void; @oninterruptionend
onInterruptionEnd
监听录音中断结束事件
##### onInterruptionEnd 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.61 | 4.61 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offInterruptionEnd() : void; @offinterruptionend
offInterruptionEnd
取消监听录音中断结束事件
##### offInterruptionEnd 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.0 | 5.0 | 5.0 | 5.0 |


 


::: tip 编码格式与采样率、码率的关系

`Android、iOS、微信小程序`

|采样率|编码码率|
|:-|:-|
|8000|16000 - 48000|
|11025|16000 - 48000|
|12000|24000 - 64000|
|16000|24000 - 96000|
|22050|32000 - 128000|
|24000|32000 - 128000|
|32000|48000 - 192000|
|44100|64000 - 320000|
|48000|64000 - 320000|

`HarmonyOS`

- aac 编码格式支持码率范围[32000 - 500000]
- mp 编码格式支持码率范围[8000, 16000, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 160000, 192000, 224000, 256000, 320000]
  - 采样率使用16K以下时，对应码率范围为[8000 - 64000]
  - 采样率使用16K~32K时对应的码率范围为[8000 - 160000]
  - 采样率使用32K以上时对应的码率范围为[32000 - 320000]
- wav 编码格式时，补丁码率 8000，采样率 64000，通道数 1
:::

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-recorder-manager/get-recorder-manager.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-recorder-manager/get-recorder-manager.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-recorder-manager/get-recorder-manager
```uvue
<template>
  <page-head :title="title"></page-head>
  <view class="page-body-time">
    <text class="time-big">{{formatedRecordTime}}</text>
    <!-- <text class="time-big">{{recordTimeInterval}}</text> -->
  </view>

  <scroll-view style="flex: 1;">
    <view>
      <button class="btnstyle" size="default" @click="registerOnStart">注册onStart</button>
      <button class="btnstyle" size="default" @click="registeronStop">注册onStop</button>
      <button class="btnstyle" size="default" id="btn-error" @click="registeronError">注册onError</button>
      <button class="btnstyle" size="default" @click="registeronPause">注册onPause</button>
      <button class="btnstyle" size="default" @click="registeronResume">注册onResume</button>
      <button class="btnstyle" size="default" @click="registeronInterruptionBegin">注册onInterruptionBegin</button>
      <button class="btnstyle" size="default" @click="registeronInterruptionEnd">注册onInterruptionEnd</button>
      <view class="uni-list">
        <text style="margin-bottom: 10px"> 请选择录音格式：</text>
        <radio-group class="uni-flex uni-row" @change="radioChange" style="flex-wrap: wrap">
          <radio class="uni-list-cell" style="margin-right: 15px" v-for="(item, index) in items" :key="item.value"
            :value="item.value" :checked="index === current">
            {{ item.name }}
          </radio>
        </radio-group>
      </view>
      <button class="btnstyle" size="default" :disabled="disableStartBtn" id="btn-startRecord"
        @click="startRecord()">开始录制</button>
      <button class="btnstyle" size="default" :disabled="disablePauseBtn" @click="pauseRecord">暂停录制</button>
      <button class="btnstyle" size="default" :disabled="disableResumeBtn" @click="resumeRecord">继续录制</button>
      <button class="btnstyle" size="default" id="btn-stopRecord" @click="stopRecord">停止录制</button>
      <button class="btnstyle" size="default" id="btn-startPlay" @click="playVoice">开始播放</button>
      <button class="btnstyle" size="default" id="btn-stopPlay" @click="stopVoice">停止播放</button>
    </view>
  </scroll-view>
</template>
<script setup lang="uts">
  export type ItemType = { value : string, name : string }

	type DataType = {
		registerError: boolean,
		recording: boolean,
		playing: boolean
	}

	const disableStartBtn = ref(false)
	const disableResumeBtn = ref(false)
	const disablePauseBtn = ref(false)
	const title = ref('start/stopRecord、play/stopVoice')
	const hasRecord = ref(false) //是否有了一个
	// 使用reactive避免ref数据在自动化测试中无法访问
	const data = reactive({
		registerError: false,
		recording: false, //录音中
		playing: false //播放中
	} as DataType)

  const playTimeInterval = ref(0)
  const recordTimeInterval = ref(0)
  const tempFilePath = ref('')
  const recordTime = ref(0)
  const current = ref(0)
  const playTime = ref(0)
  const formatedRecordTime = ref('00:00:00') //录音的总时间
  const formatedPlayTime = ref('00:00:00')//播放录音的当前时间,
  const recorderManager = ref(null as RecorderManager | null)
  const music = ref(null as InnerAudioContext | null)
  const items = ref([
    {
      value: 'aac',
      name: 'aac'
    },
    {
      value: 'mp3',
      name: 'mp3'
    },
    {
      value: 'wav',
      name: 'wav'
    },
    // #ifdef APP-HARMONY
    {
      value: 'm4a',
      name: 'm4a'
    },
    // #endif
    // #ifndef APP-HARMONY
    {
      value: 'pcm',
      name: 'pcm'
    }
    // #endif
  ] as ItemType[])

  const radioChange = (e: UniRadioGroupChangeEvent) => {
    for (let i = 0; i < items.value.length; i++) {
      if (items.value[i].value === e.detail.value) {
        current.value = i;
        break;
      }
    }
  }

  const formatTime = (time: number): string => {
    if (typeof time !== 'number' || time < 0) {
      return time.toString()
    }

    var hour = parseInt((time / 3600).toString())
    time = time % 3600
    var minute = parseInt((time / 60).toString())
    time = time % 60
    var second = time
    return [hour, minute, second].map((n: number) => {
      let str = n.toString();
      return str.length > 1 ? str : "0" + str;
    }).join(":");
  }

  const registerOnStart = () => {
    uni.showToast({
      title: 'already registerOnStart'
    })

    recorderManager.value!.onStart(() => {
      console.log('recorder on start');
      recordTime.value = 0
      data.recording = true;
      recordTimeInterval.value = setInterval(() => {
        recordTime.value += 1;
        formatedRecordTime.value = formatTime(recordTime.value);
      }, 1000)
    });
  }

  const registeronStop = () => {
    uni.showToast({
      title: 'already registeronStop'
    })
    recorderManager.value!.onStop((res) => {
      console.log('on stop', res);
      music.value!.src = res.tempFilePath
      clearInterval(recordTimeInterval.value)
      hasRecord.value = true;
      data.recording = false;
    });
  }

  const registeronError = () => {
    uni.showToast({
      title: 'already registeronError'
    })
    data.registerError = true
    recorderManager.value!.onError((res) => {
      console.log('recorder onError', JSON.stringify(res));
    });
  }

  const registeronPause = () => {
    uni.showToast({
      title: 'already registeronPause'
    })
    recorderManager.value?.onPause(() => {
      console.log('recorder onPause');
    })
  }

  const registeronResume = () => {
    uni.showToast({
      title: 'already registeronStop'
    })
    recorderManager.value?.onResume(() => {
      console.log('recorder onResume');
    })
  }

  const registeronOnFrameRecorded = () => {
    uni.showToast({
      title: 'already registeronOnFrameRecorded'
    })
    recorderManager.value?.onFrameRecorded((res) => {
      console.log('recorder onFrameRecorded----', res);
    })
  }

  const registeronInterruptionBegin = () => {
    uni.showToast({
      title: 'already registeronInterruptionBegin'
    })
    recorderManager.value?.onInterruptionBegin(() => {
      console.log('recorder onInterruptionBegin');
    })
  }

  const registeronInterruptionEnd = () => {
    uni.showToast({
      title: 'already registeronInterruptionEnd'
    })
    recorderManager.value?.onInterruptionBegin(() => {
      console.log('recorder registeronInterruptionEnd');
    })
  }

  const pauseRecord = () => {
    console.log('recorder pause');
    recorderManager.value?.pause()
    if (data.recording) {
      disableStartBtn.value = false
      disablePauseBtn.value = true
      disableResumeBtn.value = false
    }
    clearInterval(recordTimeInterval.value)
  }

  const resumeRecord = () => {
    console.log('recorder resume ', recorderManager.value);
    recorderManager.value?.resume()
    recorderManager.value?.onResume(() => {
      console.log('recorder onResume');
    })
    if (data.recording) {
      disableStartBtn.value = false
      disablePauseBtn.value = false
      disableResumeBtn.value = true
      recordTimeInterval.value = setInterval(() => {
        recordTime.value += 1;
        formatedRecordTime.value = formatTime(recordTime.value);
      }, 1000)
    }
  }

  const startRecord = () => { //开始录音
    if (data.recording) {
      uni.showToast({
        title: disablePauseBtn.value ? "当前是录音暂停状态" : "当前正在录音"
      })
      return
    }

    console.log('startRecord', items.value[current.value].value)
    // TODO ios 在没有请求过权限之前无法得知是否有相关权限，这种状态下需要直接调用录音，但没有状态或回调判断用户拒绝
    recorderManager.value?.start({
      format: items.value[current.value].value,
      sampleRate: 8000,
      numberOfChannels: 2,
      encodeBitRate: 48000,
      frameSize: 2
    });
  }

  const stopRecord = () => { //停止录音
    recorderManager.value?.stop();
    disableStartBtn.value = false
    disablePauseBtn.value = false
    disableResumeBtn.value = false
  }

  const playVoice = () => {
    if (data.recording) {
      uni.showToast({
        title: "当前录音还未结束"
      })
      return
    }
    console.log('play voice');
    if (data.playing) {
      return
    }
    data.playing = true;
    playTimeInterval.value = setInterval(() => {
      if (playTime.value < recordTime.value) {
        playTime.value += 1;
      }
      formatedRecordTime.value = formatTime(playTime.value);
    }, 1000)
    music.value?.play();
  }

  const stopVoice = () => {
    if (data.recording) {
      uni.showToast({
        title: "当前录音还未结束"
      })
      return
    }
    clearInterval(playTimeInterval.value)
    data.playing = false;
    formatedRecordTime.value = formatTime(0);
    playTime.value = 0;
    music.value?.stop();
  }

  const end = () => {
    music.value?.stop();
    music.value?.destroy();
    // #ifdef APP
    recorderManager.value?.offError()
    recorderManager.value?.offFrameRecorded()
    recorderManager.value?.offInterruptionBegin()
    recorderManager.value?.offInterruptionEnd()
    recorderManager.value?.offPause()
    recorderManager.value?.offResume()
    recorderManager.value?.offStart()
    recorderManager.value?.offStop()
    // #endif
    recorderManager.value?.stop();
    clearInterval(recordTimeInterval.value)
    clearInterval(playTimeInterval.value);
    data.recording = false
    data.playing = false
    hasRecord.value = false;
    playTime.value = 0
    recordTime.value = 0;
    formatedRecordTime.value = "00:00:00"
    formatedRecordTime.value = "00:00:00";
  }

  const clear = () => {
    end();
  }

  onUnload(() => {
    end();
  })

  onLoad(() => {
    music.value = uni.createInnerAudioContext();
    music.value!.onEnded(() => {
      clearInterval(playTimeInterval.value)
      var playTimeValue = 0
      console.log('play voice finished')
      data.playing = false;
      formatedPlayTime.value = formatTime(playTimeValue);
      playTime.value = playTimeValue;
    });
    recorderManager.value = uni.getRecorderManager();

    recorderManager.value!.onStart(() => {
      console.log('recorder onStart');
      disableStartBtn.value = true
      disablePauseBtn.value = false
      disableResumeBtn.value = false
      data.recording = true;
      recordTime.value = 0
      recordTimeInterval.value = setInterval(() => {
        recordTime.value += 1;
        formatedRecordTime.value = formatTime(recordTime.value);
      }, 1000)
    });
    recorderManager.value!.onStop((res) => {
      console.log('on stop', res.tempFilePath);
      disablePauseBtn.value = false
      disableResumeBtn.value = false
      disableStartBtn.value = false
      music.value!.src = res.tempFilePath
      clearInterval(recordTimeInterval.value)
      hasRecord.value = true;
      data.recording = false;
    });
    recorderManager.value!.onError((res) => {
      console.log('recorder onError', JSON.stringify(res));
      disablePauseBtn.value = false
      disableResumeBtn.value = false
      disableStartBtn.value = false
      data.registerError = true
      uni.showToast({
        title: JSON.stringify(res)
      })
    });
  })

	defineExpose({
		data
	})
</script>

<style>
  .page-body-time {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time-big {
    font-size: 30px;
    margin: 10px;
  }

  .btnstyle {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;
  }

  .uni-list {
    border-bottom: 0px;
    background-color: transparent;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.getRecorderManager)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/record-manager.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getRecorderManager&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getRecorderManager&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getRecorderManager&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getRecorderManager&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getRecorderManager)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getRecorderManager&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

