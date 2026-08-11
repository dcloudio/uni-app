# UTSHarmony


## 实例方法


### colorWithString(colorString)@colorwithstring

将颜色字符串转换为鸿蒙平台对应的颜色值

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| colorString | string | 是 | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.UTSHarmony.colorWithString.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 5.21 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 5.21 |


<!-- UTSJSON.UTSHarmony.colorWithString.tutorial -->


### convert2AbsFullPath(filePath)

将文件的项目相对地址转换为 运行期对应的绝对地址

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| filePath | string | 是 | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.UTSHarmony.convert2AbsFullPath.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.61 |


<!-- UTSJSON.UTSHarmony.convert2AbsFullPath.tutorial -->


### devicePX2px(px)

物理像素转换为页面的px像素

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| px | number | 是 | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.UTSHarmony.devicePX2px.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.devicePX2px.tutorial -->


### exit()

退出应用



**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.exit.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| x |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.exit.tutorial -->


### getAppTheme()

获取应用主题<br/>



**返回值**
| 类型 | 描述 |
| :- | :- |
| AppTheme | 应用主题 | 


<!-- UTSJSON.UTSHarmony.getAppTheme.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS 系统版本 | HarmonyOS |
| :- | :- |
| 5.0.0 (12) | 4.71 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.getAppTheme.tutorial -->


### getCurrentWindow()

获取当前原生窗口对象



**返回值**
| 类型 |
| :- |
| _ohos_window.default.Window | 


<!-- UTSJSON.UTSHarmony.getCurrentWindow.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.getCurrentWindow.tutorial -->


### getOsTheme()

获取系统主题<br/>



**返回值**
| 类型 | 描述 |
| :- | :- |
| OsTheme | 系统主题 | 


<!-- UTSJSON.UTSHarmony.getOsTheme.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS 系统版本 | HarmonyOS |
| :- | :- |
| 5.0.0 (12) | 4.71 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.getOsTheme.tutorial -->


### getResourcePath(filePath)

获取资源文件的原生路径。

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| filePath | string | 是 | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.UTSHarmony.getResourcePath.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.61 |


<!-- UTSJSON.UTSHarmony.getResourcePath.tutorial -->


### getUIAbilityContext()

获取应用的UIAbilityContext



**返回值**
| 类型 |
| :- |
| common.UIAbilityContext | 


<!-- UTSJSON.UTSHarmony.getUIAbilityContext.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.getUIAbilityContext.tutorial -->

**关联文档**

- 鸿蒙官方文档：[UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext)


### onAppAbilityCreate(callback)

监听应用EntryAbility生命周期onCreate

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (want: Want, launchParam: AbilityConstant.LaunchParam) => void | 是 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityCreate.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityCreate.tutorial -->


### onAppAbilityNewWant(callback)

监听应用EntryAbility生命周期onNewWant

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (want: Want, launchParam: AbilityConstant.LaunchParam) => void | 是 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityNewWant.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityNewWant.tutorial -->


### onAppAbilityShare(callback)

监听应用EntryAbility生命周期onShare

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (wantParam: Record\<string, any>) => void | 是 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityShare.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityShare.tutorial -->


### onAppAbilityWindowStageCreate(callback)

监听应用EntryAbility生命周期onWindowStageCreate

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (windowStage: _ohos_window__default.WindowStage) => void | 是 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityWindowStageCreate.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityWindowStageCreate.tutorial -->


### requestSystemPermission(permissions, success?, fail?)

请求系统权限

**参数**
| 名称 | 类型 | 必填 |
| :- | :- | :- |
| permissions | string\[\] | 是 |
| success | (allRight: boolean, grantedList: Array&lt;string&gt;) => void | 否 |
| fail | (doNotAskAgain: boolean, grantedList: Array&lt;string&gt;) => void | 否 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.requestSystemPermission.test -->

**兼容性 <Help />**

**uni-app x 兼容性 <Help />**
| HarmonyOS |
| :- |
| 4.61 |


**uni-app 兼容性 <Help />**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.requestSystemPermission.tutorial -->

