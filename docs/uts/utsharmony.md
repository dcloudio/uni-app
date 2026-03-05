# UTSHarmony


## 实例方法


### convert2AbsFullPath(filePath)

将文件的项目相对地址转换为 运行期对应的绝对地址

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.UTSHarmony.convert2AbsFullPath.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.61 |


<!-- UTSJSON.UTSHarmony.convert2AbsFullPath.tutorial -->

### devicePX2px(px)

物理像素转换为页面的px像素

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| px | number | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.UTSHarmony.devicePX2px.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
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

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| x | - |


**uni-app 兼容性**
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

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
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

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
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

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.getOsTheme.tutorial -->

### getResourcePath(filePath)

获取资源文件的原生路径。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.UTSHarmony.getResourcePath.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
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

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.getUIAbilityContext.tutorial -->

### offAppThemeChange(id)

取消监听应用主题变化<br/>

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | - | 应用主题 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.offAppThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.offAppThemeChange.tutorial -->

### offOsThemeChange(id)

取消监听系统主题变化<br/>

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | - | 监听ID | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.offOsThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.offOsThemeChange.tutorial -->

### onAppAbilityCreate(callback)

监听应用EntryAbility生命周期onCreate

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (want: Want, launchParam: AbilityConstant.LaunchParam) => void | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityCreate.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityCreate.tutorial -->

### onAppAbilityNewWant(callback)

监听应用EntryAbility生命周期onNewWant

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (want: Want, launchParam: AbilityConstant.LaunchParam) => void | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityNewWant.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityNewWant.tutorial -->

### onAppAbilityShare(callback)

监听应用EntryAbility生命周期onShare

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (wantParam: Record\<string, any>) => void | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityShare.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityShare.tutorial -->

### onAppAbilityWindowStageCreate(callback)

监听应用EntryAbility生命周期onWindowStageCreate

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (windowStage: _ohos_window__default.WindowStage) => void | 是 | - | - |  | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.onAppAbilityWindowStageCreate.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.onAppAbilityWindowStageCreate.tutorial -->

### onAppThemeChange(callback)

监听应用主题变化<br/>

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [OnAppThemeChangeCallbackResult](#onappthemechangecallbackresult-values)) => void | 是 | - | - | 应用主题 | 

##### OnAppThemeChangeCallbackResult 的属性值 @onappthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appTheme | "dark" \| "light" | 是 | - | - | 主题名称 |


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.UTSHarmony.onAppThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.onAppThemeChange.tutorial -->

### onOsThemeChange(callback)

坚听系统主题变化<br/>

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [OnOsThemeChangeCallbackResult](#onosthemechangecallbackresult-values)) => void | 是 | - | - | 系统主题变化回调 | 

##### OnOsThemeChangeCallbackResult 的属性值 @onosthemechangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| osTheme | "dark" \| "light" | 是 | - | - | 主题名称 |


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.UTSHarmony.onOsThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.onOsThemeChange.tutorial -->

### requestSystemPermission(permissions, success?, fail?)

请求系统权限

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| permissions | string[\] | 是 | - | - | - |
| success | (allRight: boolean, grantedList: Array&lt;string&gt;) => void | 否 | - | - | - |
| fail | (doNotAskAgain: boolean, grantedList: Array&lt;string&gt;) => void | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.requestSystemPermission.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.61 | 4.61 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.31 |


<!-- UTSJSON.UTSHarmony.requestSystemPermission.tutorial -->

### setAppTheme(appTheme)

设置应用主题<br/>

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appTheme | AppTheme | 是 | - | - | 应用主题 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSHarmony.setAppTheme.test -->

**兼容性**

**uni-app x 兼容性**
| HarmonyOS | HarmonyOS UTS 插件 |
| :- | :- |
| 4.71 | 4.71 |


**uni-app 兼容性**
| HarmonyOS UTS 插件 |
| :- |
| 4.71 |


<!-- UTSJSON.UTSHarmony.setAppTheme.tutorial -->
