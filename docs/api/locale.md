本文档仅为部分API介绍，完整的国际化指南，另见[文档](../i18n.md)

## uni.getLocale() @getlocale

获取当前设置的语言


### getLocale 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


App端可以在[uni.getDeviceInfo](./get-device-info.md)中获取os的language。



### 返回值 

| 类型 |
| :- |
| string |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.locale.getLocale)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/ui/locale.html#getlocale)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/ui/locale.html#getlocale)

## uni.setLocale(locale) @setlocale

设置当前语言


### setLocale 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| locale | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.locale.setLocale)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/ui/locale.html#setlocale)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/ui/locale.html#setlocale)

## uni.onLocaleChange(callback) @onlocalechange

设置当前语言


### onLocaleChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnLocaleChangeCallbackResult](#onlocalechangecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

### OnLocaleChangeCallbackResult 的属性值 @onlocalechangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| locale | string | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 当前语言 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.locale.onLocaleChange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/ui/locale.html#onlocalechange)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/ui/locale.html#onlocalechange)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |
