# UTSActivityCallback
  
  > UniActivityCallback 仅支持uniapp-x，不支持uni-app
  
 为了更好的对外暴露activity的方法，我们把activity里面包含的方法按照继承关系进行了分类，下面是分类标准

第一类：activity生命周期相关方法[UniActivityLifeCycleCallback](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#UniActivityLifeCycleCallback)\
比如 oncreate,ondestory 等\
第二类: 键盘事件相关方法[UniActivityKeyEventCallback](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#UniActivityKeyEventCallback)\
比如 onKeyDown,onKeyUp等\
第三类:window窗体的相关方法[UniActivityWindowCallback](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#UniActivityWindowCallback)\
比如onCreatePanelMenu，onWindowDismissed等\
第四类:activity本身自带的相关方法，不继承自其他类[UniActivityCallback](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#UniActivityCallback)\
比如onProvideAssistData等

> 因为uni-app x 暂不支持launchMode配置，所以 UniActivityCallback暂时不支持onNewIntent

第五类：Component 组件相关方法[UniActivityComponentCallback](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#UniActivityComponentCallback)\
比如onTrimMemory等

并且上面的五个类都为IUniActivityCallback的实现类，我们在使用的时候可以传入具体的实现类，然后按照具体需求重写其中的某个方法，具体用法参考[示例](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#示例)



## UniActivityCallback

> HBuilder X  4.62 之后版本 UniActivityParams 新增 activity 即当前activity实例对象

### 实例方法


#### onPreAttachFragment(params, fragment)

对应原生 Activity [onAttachFragment](https://developer.android.com/reference/android/app/Activity#onAttachFragment(android.app.Fragment)) 函数，该方法在Fragment与Activity建立关联时调用。本方法的调用时机在super.onAttachFragment()之前，它允许您在Fragment完全附加到Activity之前进行必要的设置或初始化。<br/>     提在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| fragment | Fragment | 是 | - | - | 即将附加的Fragment对象。这允许Activity在Fragment完全附加之前与之交互。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreAttachFragment.tutorial -->

#### onAttachFragment(params, fragment)

对应原生 Activity 的 [onAttachFragment](https://developer.android.com/reference/android/app/Activity#onAttachFragment(android.app.Fragment)) 函数，此方法在 Fragment 被附加到 Activity 时被调用，以处理相关联的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 fragment 表示被附加的 Fragment 实例。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| fragment | Fragment | 是 | - | - | 被附加的 Fragment 实例 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onAttachFragment.tutorial -->

#### onPreUserInteraction(params)

对应原生 Activity [onUserInteraction](https://developer.android.com/reference/android/app/Activity#onUserInteraction()) 函数。<br/>     在用户与设备进行交互时被调用，例如触摸屏幕或按键。开发者可以覆盖此方法以执行特定操作，如取消自动隐藏的导航控件等。<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreUserInteraction.tutorial -->

#### onUserInteraction(params)

对应原生 Activity 的 [onUserInteraction](https://developer.android.com/reference/android/app/Activity#onUserInteraction()) 函数，该方法在用户与设备进行交互时被调用，用于处理用户交互前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onUserInteraction.tutorial -->

#### onPictureInPictureModeChanged(params)

对应原生 Activity 的 [onPictureInPictureModeChanged](https://developer.android.com/reference/androidx/activity/ComponentActivity?hl=en#onPictureInPictureModeChanged(kotlin.Boolean)) 函数，该方法在 进入/离开 画中画模式时触发。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.82 | 4.82 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPictureInPictureModeChanged.tutorial -->

#### onPreUserLeaveHint(params)

对应原生 Activity [onUserLeaveHint](https://developer.android.com/reference/android/app/Activity#onUserLeaveHint()) 函数。<br/>     当用户即将离开当前Activity时被调用，通常是因为用户按了 "Home" 键或最近任务键。可以覆盖此方法来实现特定的暂停、保存状态或资源释放操作。<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreUserLeaveHint.tutorial -->

#### onUserLeaveHint(params)

对应原生 Activity 的 [onUserLeaveHint](https://developer.android.com/reference/android/app/Activity#onUserLeaveHint()) 函数，此方法在用户即将离开应用且返回到上一级活动（通过按Home键等操作造成的）时被调用，用于处理用户即将离开应用前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onUserLeaveHint.tutorial -->

#### onPreActivityResult(params, requestCode, resultCode, data)

对应原生 Activity [onActivityResult](https://developer.android.com/reference/android/app/Activity#onActivityResult(int,%20int,%20android.content.Intent)) 函数。<br/>     当一个启动的Activity返回结果时调用。在super方法之前调用。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| requestCode | Int | 是 | - | - | 请求代码，标识发送请求的Activity |
| resultCode | Int | 是 | - | - | 结果代码，表明操作是否成功或取消 |
| data | Intent \| null | 是 | - | - | 含返回数据的Intent对象或null | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreActivityResult.tutorial -->

#### onActivityResult(params, requestCode, resultCode, data)

对应原生 Activity 的 [onActivityResult](https://developer.android.com/reference/android/app/Activity#onActivityResult(int,%20int,%20android.content.Intent)) 函数，此方法在从另一个活动返回数据时被调用，用于处理返回数据前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二和第三个参数分别代表请求代码和结果代码，第四个参数 data 为返回的数据。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| requestCode | Int | 是 | - | - | 请求代码 |
| resultCode | Int | 是 | - | - | 结果代码 |
| data | Intent \| null | 是 | - | - | 返回的数据 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onActivityResult.tutorial -->

#### onPreRequestPermissionsResult(params, requestCode, permissions, grantResults)

<!-- UTSJSON.UniActivityCallback.onPreRequestPermissionsResult.description -->

<!-- UTSJSON.UniActivityCallback.onPreRequestPermissionsResult.param -->

<!-- UTSJSON.UniActivityCallback.onPreRequestPermissionsResult.returnValue -->

<!-- UTSJSON.UniActivityCallback.onPreRequestPermissionsResult.compatibility -->

<!-- UTSJSON.UniActivityCallback.onPreRequestPermissionsResult.tutorial -->

#### onRequestPermissionsResult(params, requestCode, permissions, grantResults)

对应原生 Activity 的 \[onRequestPermissionsResult](https://developer.android.com/reference/android/app/Activity#onRequestPermissionsResult(int,%20java.lang.String[],%20int[]) 函数，此方法在用户响应权限请求后被调用，用于处理权限请求结果前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 requestCode 为请求代码，第三个参数 permissions 为请求的权限数组，第四个参数 grantResults 为权限请求结果数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| requestCode | Int | 是 | - | - | 请求代码 |
| permissions | MutableList\<String> | 是 | - | - | 请求的权限 |
| grantResults | IntArray | 是 | - | - | 权限请求结果 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onRequestPermissionsResult.tutorial -->

#### onPreApplyThemeResource(params, theme, resid, first)

对应原生 Activity [onApplyThemeResource](https://developer.android.com/reference/android/app/Activity#onApplyThemeResource(android.content.res.Resources.Theme,int,boolean)) 函数。<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| theme | Resources.Theme | 是 | - | - | 当前 Activity 即将应用的主题资源 |
| resid | Int | 是 | - | - | 用于应用主题的资源ID |
| first | Boolean | 是 | - | - | 是否为第一次应用该主题 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreApplyThemeResource.tutorial -->

#### onApplyThemeResource(params, theme, resid, first)

对应原生 Activity 的 [onApplyThemeResource](https://developer.android.com/reference/android/app/Activity#onApplyThemeResource(android.content.res.Resources.Theme,%20int,%20boolean)) 函数，此方法在应用主题资源时被调用，用于处理主题资源应用前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 theme 为要应用的主题资源，第三个参数 resid 为资源ID，第四个参数 first 标示是否为首次应用。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| theme | Resources.Theme | 是 | - | - | 要应用的主题资源 |
| resid | Int | 是 | - | - | 资源ID |
| first | Boolean | 是 | - | - | 是否为首次应用 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onApplyThemeResource.tutorial -->

#### onPreCreateView(params, parent, name, context, attrs)

对应原生 Activity [onCreateView](https://developer.android.com/reference/android/app/Activity#onCreateView(android.view.View,java.lang.String,android.content.Context,android.util.AttributeSet)) 函数。<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| parent | View \| null | 是 | - | - | 即将创建视图的父视图 |
| name | [String](#string-values) | 是 | - | - | 视图的标识名 |
| context | Context | 是 | - | - | 视图创建时的上下文 |
| attrs | AttributeSet | 是 | - | - | 视图的属性集 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |

##### String 的方法 @string-values 

##### at(index: number): T \| undefined; @at
at
Takes an integer value and returns the item at that index,
allowing for positive and negative integers.
Negative integers count back from the last item in the array.
###### at 兼容性 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| T \| any |
 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreCreateView.tutorial -->

#### onCreateView(params, parent, name, context, attrs)

对应原生 Activity 的 [onCreateView](https://developer.android.com/reference/android/app/Activity#onCreateView(android.view.View,%20java.lang.String,%20android.content.Context,%20android.util.AttributeSet))函数，此方法在视图创建时被调用，用于处理视图创建前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，后续参数分别为 parent 视图的父视图，name 视图名称，context 视图的上下文环境及 attrs 视图的属性集。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| parent | View \| null | 是 | - | - | 父视图 |
| name | string | 是 | - | - | 视图名称 |
| context | Context | 是 | - | - | 上下文环境 |
| attrs | AttributeSet | 是 | - | - | 属性集 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onCreateView.tutorial -->

#### onPreTitleChanged(params, title, color)

对应原生 Activity [onTitleChanged](https://developer.android.com/reference/android/app/Activity#onTitleChanged(java.lang.CharSequence,%20int)) 函数，<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。 |
| title | [String](#string-values) | 是 | - | - | 即将设置的新标题。 |
| color | Int | 是 | - | - | 标题的颜色。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreTitleChanged.tutorial -->

#### onTitleChanged(params, title, color)

对应原生 Activity [onTitleChanged](https://developer.android.com/reference/android/app/Activity#onTitleChanged(java.lang.CharSequence,%20int)) 函数，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数包括页面路由地址与方法返回值 |
| title | string | 是 | - | - | 新的标题字符 |
| color | Int | 是 | - | - | 新的标题颜色 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onTitleChanged.tutorial -->

#### onPreChildTitleChanged(params, childActivity, title)

对应原生 Activity [onChildTitleChanged](https://developer.android.com/reference/android/app/Activity#onChildTitleChanged(android.app.Activity,%20java.lang.CharSequence)) 函数，<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。 |
| childActivity | Activity | 是 | - | - | 标题变更的子Activity。 |
| title | [String](#string-values) | 是 | - | - | 即将设置的新标题。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreChildTitleChanged.tutorial -->

#### onChildTitleChanged(params, childActivity, title)

对应原生 Activity [onChildTitleChanged](https://developer.android.com/reference/android/app/Activity#onChildTitleChanged(android.app.Activity,%20java.lang.CharSequence)) 函数，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数包括页面路由地址与方法返回值 |
| childActivity | Activity | 是 | - | - | 子Activity的实例 |
| title | string | 是 | - | - | 新的子Activity标题字符 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onChildTitleChanged.tutorial -->

#### onPreContextMenuClosed(params, menu)

对应原生 Activity [onContextMenuClosed](https://developer.android.com/reference/android/app/Activity#onContextMenuClosed(android.view.Menu)) 函数，<br/>     在super方法之前调用

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。 |
| menu | Menu | 是 | - | - | 引发上下文菜单关闭事件的菜单。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreContextMenuClosed.tutorial -->

#### onContextMenuClosed(params, menu)

对应原生 Activity [onContextMenuClosed](https://developer.android.com/reference/android/app/Activity#onContextMenuClosed(android.view.Menu)) 函数，注意第一个参数为自定义参数 UniActivityParams。<br/>     当上下文菜单被关闭时调用，可用于执行菜单关闭后的操作。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| menu | Menu | 是 | - | - | 关闭的菜单 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onContextMenuClosed.tutorial -->

#### onPreCreateContextMenu(params, menu, v, menuInfo)

对应原生 Activity [onCreateContextMenu](https://developer.android.com/reference/android/app/Activity#onCreateContextMenu(android.view.ContextMenu,%20android.view.View,%20android.view.ContextMenu.ContextMenuInfo)) 函数，<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。 |
| menu | ContextMenu | 是 | - | - | 要创建的上下文菜单。 |
| v | View | 是 | - | - | 引发上下文菜单的视图。 |
| menuInfo | ContextMenu.ContextMenuInfo \| null | 是 | - | - | 与上下文菜单关联的上下文菜单信息，如果没有则为 null。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreCreateContextMenu.tutorial -->

#### onCreateContextMenu(params, menu, v, menuInfo)

对应原生 Activity [onCreateContextMenu](https://developer.android.com/reference/android/app/Activity#onCreateContextMenu(android.view.ContextMenu,%20android.view.View,%20android.view.ContextMenu.ContextMenuInfo)) 函数，注意第一个参数为自定义参数 UniActivityParams。<br/>     当创建上下文菜单时调用，可用于定制上下文菜单的内容。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| menu | ContextMenu | 是 | - | - | 要创建的上下文菜单 |
| v | View | 是 | - | - | 与上下文菜单相关联的视图 |
| menuInfo | ContextMenu.ContextMenuInfo \| null | 是 | - | - | 关联上下文菜单的附加信息，可为空 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onCreateContextMenu.tutorial -->

#### onPreOptionsMenuClosed(params, menu)

对应原生 Activity [onOptionsMenuClosed](https://developer.android.com/reference/android/app/Activity#onOptionsMenuClosed(android.view.Menu)) 函数，<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值。 |
| menu | Menu | 是 | - | - | 被关闭的选项菜单。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreOptionsMenuClosed.tutorial -->

#### onOptionsMenuClosed(params, menu)

对应原生 Activity [onOptionsMenuClosed](https://developer.android.com/reference/android/app/Activity#onOptionsMenuClosed(android.view.Menu)) 函数，注意第一个参数为自定义参数 UniActivityParams。<br/>     当选项菜单被关闭时调用。可用于执行菜单关闭后的操作。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| menu | Menu | 是 | - | - | 关闭的菜单 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onOptionsMenuClosed.tutorial -->

#### onPrePrepareNavigateUpTaskStack(params, builder)

对应原生 Activity [onPrepareNavigateUpTaskStack](https://developer.android.com/reference/android/app/Activity#onPrepareNavigateUpTaskStack(android.app.TaskStackBuilder)) 函数，<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值。 |
| builder | TaskStackBuilder | 是 | - | - | 用于构建向上导航任务栈的 TaskStackBuilder 实例。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPrePrepareNavigateUpTaskStack.tutorial -->

#### onPrepareNavigateUpTaskStack(params, builder)

对应原生 Activity [onPrepareNavigateUpTaskStack](https://developer.android.com/reference/android/app/Activity#onPrepareNavigateUpTaskStack(android.app.TaskStackBuilder)) 函数，注意第一个参数为自定义参数 UniActivityParams。<br/>     此方法在用户从当前 Activity 导航到应用的祖先 Activity 时调用，以准备返回栈。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| builder | TaskStackBuilder | 是 | - | - | 返回栈建造者，用于构造导航返回栈 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPrepareNavigateUpTaskStack.tutorial -->

#### onPreProvideAssistData(params, data)

对应原生 Activity [onProvideAssistData](https://developer.android.com/reference/android/app/Activity#onProvideAssistData(android.os.Bundle)) 函数，<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值。 |
| data | Bundle | 是 | - | - | 辅助数据的捆绑包。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreProvideAssistData.tutorial -->

#### onProvideAssistData(params, data)

对应原生 Activity [onProvideAssistData](https://developer.android.com/reference/android/app/Activity#onProvideAssistData(android.os.Bundle)) 函数，注意第一个参数为自定义参数 UniActivityParams。<br/>     此方法在构建辅助数据时被调用，比如在使用 Google Now 时展示有关当前 Activity 的信息。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| data | Bundle | 是 | - | - | 提供辅助数据的 Bundle | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onProvideAssistData.tutorial -->

#### onPreProvideAssistContent(params, outContent)

对应原生 Activity [onProvideAssistContent](https://developer.android.com/reference/android/app/Activity#onProvideAssistContent(android.app.assist.AssistContent)) 函数，<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值。 |
| outContent | AssistContent | 是 | - | - | 辅助内容的对象。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onPreProvideAssistContent.tutorial -->

#### onProvideAssistContent(params, outContent)

对应原生 Activity [onProvideAssistContent](https://developer.android.com/reference/android/app/Activity#onProvideAssistContent(android.app.assist.AssistContent)) 函数，注意第一个参数为自定义参数 UniActivityParams。<br/>     此方法允许Activity提供有关其当前在屏幕上显示的内容的附加信息，这有助于提升语音搜索等辅助功能的体验。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |
| outContent | AssistContent | 是 | - | - | 通过这个参数，Activity可以提供有关其内容的结构化信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityCallback.onProvideAssistContent.tutorial -->

## UniActivityComponentCallback


### 实例方法


#### onPreConfigurationChanged(params, newConfig)

该方法是对原生  Activity [onConfigurationChanged](https://developer.android.com/reference/android/app/Activity#onConfigurationChanged(android.content.res.Configuration)) 函数的扩展，<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这为开发者提供了一个机会，让他们能够在配置更改生效之前对其进行预处理。 |
| newConfig | Configuration | 是 | - | - | 提供了新的设备配置信息，允许开发者根据这些信息调整应用行为。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityComponentCallback.onPreConfigurationChanged.tutorial -->

#### onConfigurationChanged(params, newConfig)

对应原生 Activity [onConfigurationChanged](https://developer.android.com/reference/android/app/Activity#onConfigurationChanged(android.content.res.Configuration)) 函数，<br/>     当设备配置（如屏幕大小、方向、语言等）发生改变时调用。开发者可以通过重写此方法来处理配置更改事件。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这允许开发者在处理配置更改时访问特定的环境信息。 |
| newConfig | Configuration | 是 | - | - | 新的设备配置数据。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityComponentCallback.onConfigurationChanged.tutorial -->

#### onPreLowMemory(params)

此方法在 Activity 的 [onLowMemory](https://developer.android.com/reference/android/app/Activity#onLowMemory()) 方法被触发之前调用，<br/>     允许开发者在系统通知内存不足之前执行自定义逻辑。这可以用于积极地释放资源或减少内存使用，以避免应用被系统杀死。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。它们可以被用来做出更加上下文相关的响应。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityComponentCallback.onPreLowMemory.tutorial -->

#### onLowMemory(params)

对应原生 Activity [onLowMemory](https://developer.android.com/reference/android/app/Activity#onLowMemory()) 函数，<br/>     当系统运行在低内存环境下时调用。在这种情况下，开发者应当清除不必要的资源以帮助系统回收内存，减轻内存压力。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这提供了一个机会，让开发者能够在应用面临低内存情况时执行特定逻辑。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityComponentCallback.onLowMemory.tutorial -->

#### onPreTrimMemory(params, level)

此方法在 Activity 的 [onTrimMemory](https://developer.android.com/reference/android/app/Activity#onTrimMemory(int)) 方法被触发之前调用，<br/>     允许开发者在系统建议应用减少内存使用之前预先采取措施。这里的处理可以根据传递的内存级别清除缓存或其他不必要的资源。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。使用这些信息，可以选择性地进行内存优化。 |
| level | Int | 是 | - | - | 系统传递的当前内存清理级别的枚举值。开发者可以基于这个级别来调整他们的内存管理策略。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityComponentCallback.onPreTrimMemory.tutorial -->

#### onTrimMemory(params, level)

对应原生 Activity [onTrimMemory](https://developer.android.com/reference/android/app/Activity#onTrimMemory(int)) 函数，<br/>     当系统决定当前进程需要缩减内存使用时调用。开发者可以根据传递的内存级别清除不必要的资源以帮助系统管理内存。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这使得开发者能够基于应用的当前状态适当地响应内存清理需求。 |
| level | Int | 是 | - | - | 提供了当前内存清理级别的指示，开发者可以根据这个级别确定清理资源的紧迫性。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityComponentCallback.onTrimMemory.tutorial -->

## UniActivityKeyEventCallback


### 实例方法


#### onPreKeyDown(params, keyCode, event)

在 Android Activity 的 [onKeyDown](https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)) 方法触发之前调用，<br/>     允许开发者在标准按键处理流程之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。便于开发者获取上下文信息和返回的数据。 |
| keyCode | Int | 是 | - | - | 按下的键的键码。 |
| event | KeyEvent \| null | 是 | - | - | 提供按键事件的详细信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onPreKeyDown.tutorial -->

#### onKeyDown(params, keyCode, event)

此方法对应 Android Activity 的 [onKeyDown](https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)) 函数，<br/>     在用户按下键盘键（例如返回键、菜单键等）时调用。可以用于自定义按键事件的响应逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了当前活动上下文以及任何先前操作的结果。 |
| keyCode | Int | 是 | - | - | 表明被按下的键的键码。 |
| event | KeyEvent \| null | 是 | - | - | 提供了关于按键事件的详细信息，包括按键的动作和代码。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onKeyDown.tutorial -->

#### onPreKeyLongPress(params, keyCode, event)

在 Android Activity 的 [onKeyLongPress](https://developer.android.com/reference/android/app/Activity#onKeyLongPress(int,%20android.view.KeyEvent)) 方法触发之前调用，<br/>     允许开发者在标准长按处理流程之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。开发者可以利用这些返回值进行进一步处理。 |
| keyCode | Int | 是 | - | - | 长按的键的键码。 |
| event | KeyEvent \| null | 是 | - | - | 提供长按键事件的详细信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onPreKeyLongPress.tutorial -->

#### onKeyLongPress(params, keyCode, event)

此方法对应 Android Activity 的 [onKeyLongPress](https://developer.android.com/reference/android/app/Activity#onKeyLongPress(int,%20android.view.KeyEvent)) 函数，<br/>     在用户长按键盘键时调用。这通常用于执行按键的二级功能。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这样，开发者可以利用设置的返回参数执行上下文相关的操作。 |
| keyCode | Int | 是 | - | - | 表明长按的键的键码。 |
| event | KeyEvent \| null | 是 | - | - | 提供关于长按键事件的额外信息，允许开发者根据需要来响应事件。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onKeyLongPress.tutorial -->

#### onPreKeyUp(params, keyCode, event)

在 Android Activity 的 [onKeyUp](https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)) 方法触发之前调用，<br/>     允许开发者在标准按键抬起处理流程之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。便于开发者获取和处理返回的数据。 |
| keyCode | Int | 是 | - | - | 松开的键的键码。 |
| event | KeyEvent \| null | 是 | - | - | 提供按键抬起事件的详细信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onPreKeyUp.tutorial -->

#### onKeyUp(params, keyCode, event)

此方法对应 Android Activity 的 [onKeyUp](https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)) 函数，<br/>     在用户松开键盘键时调用。可以用于处理按键抬起事件。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供当前上下文及函数调用的相关结果。 |
| keyCode | Int | 是 | - | - | 表示松开的键的键码。 |
| event | KeyEvent \| null | 是 | - | - | 提供了关于按键事件的详细信息，包含按键的动作和代码等。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onKeyUp.tutorial -->

#### onPreKeyMultiple(params, keyCode, repeatCount, event)

在 Android Activity 的 [onKeyMultiple](https://developer.android.com/reference/android/app/Activity#onKeyMultiple(int,%20int,%20android.view.KeyEvent)) 方法触发之前调用，<br/>     允许开发者在处理多个按键事件之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。开发者可以根据这些返回值对按键事件进行处理。 |
| keyCode | Int | 是 | - | - | 表示触发多次的键的键码。 |
| repeatCount | Int | 是 | - | - | 按键重复的次数。 |
| event | KeyEvent \| null | 是 | - | - | 提供多个按键事件的详细信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onPreKeyMultiple.tutorial -->

#### onKeyMultiple(params, keyCode, repeatCount, event)

此方法对应 Android Activity 的 [onKeyMultiple](https://developer.android.com/reference/android/app/Activity#onKeyMultiple(int,%20int,%20android.view.KeyEvent)) 函数，<br/>     在用户进行多个按键事件时调用（例如，当用户按住某个键时会连续触发此事件）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。可以用来执行基于当前应用状态的操作。 |
| keyCode | Int | 是 | - | - | 表示重复按下的键的键码。 |
| repeatCount | Int | 是 | - | - | 表明此键的重复次数。 |
| event | KeyEvent \| null | 是 | - | - | 提供按键事件的详细信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityKeyEventCallback.onKeyMultiple.tutorial -->

## UniActivityLifeCycleCallback


### 实例方法


#### onPreCreate(params, savedInstanceState)

在 Android Activity 的 [onCreate](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)) 方法触发之前调用，<br/>     允许开发者在 Activity 创建之前执行自定义逻辑。<br/>     注意，由于注册时机的问题，首页无法回调此方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了当前的上下文信息和方法调用的结果。 |
| savedInstanceState | Bundle \| null | 是 | - | - | 如果 Activity 正在重新创建，则此参数包含之前保存的状态信息。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPreCreate.tutorial -->

#### onCreate(params, savedInstanceState)

此方法对应 Android Activity 的 [onCreate](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)) 函数，<br/>     当Activity正在被创建时调用。这个回调提供了一种方法来执行任何初始化——创建视图、绑定数据等操作。<br/>     注意，由于注册时机的问题，首页无法回调此方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值，这些参数为开发者提供了当前上下文及函数调用的相关结果。 |
| savedInstanceState | Bundle \| null | 是 | - | - | 如果Activity在之前被销毁，现在正在重新创建，这个Bundle将包含上次保存的状态数据。如果Activity是首次创建，则为null。 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onCreate.tutorial -->

#### onPreStart(params)

在 Android Activity 的 [onStart](https://developer.android.com/reference/android/app/Activity#onStart()) 方法触发之前调用，<br/>     允许开发者在 Activity 开始之前执行自定义逻辑。<br/>     注意，由于注册时机的问题，首页无法回调此方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了进行操作所需的上下文信息。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPreStart.tutorial -->

#### onStart(params)

对应原生 Activity 的 [onStart](https://developer.android.com/reference/android/app/Activity#onStart()) 函数，当Activity即将对用户可见时调用。<br/>     注意，由于注册时机的问题，首页无法回调此方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onStart.tutorial -->

#### onPreRestart(params)

对应原生 Activity 的 [onRestart](https://developer.android.com/reference/android/app/Activity#onRestart()) 函数，在super方法之前调用。此为在 Activity 重启前额外的准备步骤，提供了自定义操作的机会。<br/>     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPreRestart.tutorial -->

#### onRestart(params)

对应原生 Activity 的 [onRestart](https://developer.android.com/reference/android/app/Activity#onRestart()) 函数，当Activity在停止后重新启动前调用。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数,包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onRestart.tutorial -->

#### onPreResume(params)

在 Android Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法触发之前调用，<br/>     允许开发者在 Activity 恢复之前执行自定义逻辑。<br/>     注意，由于注册时机的问题，首页首次无法回调此方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。借助这些参数，开发者可以对 Activity 的恢复行为进行定制。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPreResume.tutorial -->

#### onResume(params)

对应原生 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 函数，在 Activity 准备和用户进行交互时调用。此时 Activity 处于运行状态的顶层。<br/>     注意第一个参数为自定义参数 UniActivityParams。<br/>     注意，由于注册时机的问题，首页首次无法回调此方法

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onResume.tutorial -->

#### onPrePause(params)

在 Android Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法触发之前调用，<br/>     允许开发者在 Activity 暂停之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这些参数提供了进行必要操作所需的上下文。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPrePause.tutorial -->

#### onPause(params)

对应原生 Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 函数，当 Activity 开始进入不活动状态（即用户即将离开此 Activity）时调用。此时应当暂停正在进行的操作和更新 UI 数据。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPause.tutorial -->

#### onPreStop(params)

在 Android Activity 的 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法触发之前调用，<br/>     允许开发者在 Activity 停止之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。利用这些返回参数，开发者可以优化 Activity 的停止过程。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPreStop.tutorial -->

#### onStop(params)

对应原生 Activity 的 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 函数，在 Activity 即将停止时被调用，这通常是因为 Activity 即将被销毁，或因为用户切换到了另一个 Activity。在此阶段，应保存数据或进行清理工作。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onStop.tutorial -->

#### onPreDestroy(params)

在 Android Activity 的 [onDestroy](https://developer.android.com/reference/android/app/Activity#onDestroy()) 方法触发之前调用，<br/>     允许开发者在 Activity 销毁之前执行自定义逻辑。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这为开发者提供了一个机会，在 Activity 销毁之前做必要的资源释放与保存。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onPreDestroy.tutorial -->

#### onDestroy(params)

在 Android Activity 的 [onDestroy](https://developer.android.com/reference/android/app/Activity#onDestroy()) 方法触发时调用，<br/>     允许开发者在 Activity 销毁之前执行自定义逻辑或清理资源。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了当前的上下文信息和方法调用的结果。 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityLifeCycleCallback.onDestroy.tutorial -->

## UniActivityWindowCallback


### 实例方法


#### onPreDetachedFromWindow(params)

对应原生 Activity 的 [onDetachedFromWindow](https://developer.android.com/reference/android/view/View#onDetachedFromWindow()) 函数，此方法在super.onDetachedFromWindow() 调用之前被调用，用于处理 Activity 的窗口从窗口管理器中即将移除前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreDetachedFromWindow.tutorial -->

#### onDetachedFromWindow(params)

对应原生 Activity 的 [onDetachedFromWindow](https://developer.android.com/reference/android/view/View#onDetachedFromWindow()) 函数，当 Activity 的窗口从窗口管理器中移除时调用。这是进行最后清理的好时机。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onDetachedFromWindow.tutorial -->

#### onPreContentChanged(params)

对应原生 Activity 的 [onContentChanged](https://developer.android.com/reference/android/app/Activity#onContentChanged()) 函数，此方法在super.onContentChanged() 调用之前被调用，用于处理 Activity 内容更改前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreContentChanged.tutorial -->

#### onContentChanged(params)

对应原生 Activity 的 [onContentChanged](https://developer.android.com/reference/android/app/Activity#onContentChanged()) 函数，当 Activity 的内容视图更改时调用。这可以作为响应内容更改并更新 UI 的适当时机。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onContentChanged.tutorial -->

#### onPreWindowAttributesChanged(params, attrs)

对应原生 Activity 的 [onWindowAttributesChanged](https://developer.android.com/reference/android/view/Window.Callback#onWindowAttributesChanged(android.view.WindowManager.LayoutParams)) 函数，此方法在super.onWindowAttributesChanged() 调用之前被调用，用于处理窗口属性更改前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 attrs 为窗口属性参数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| attrs | WindowManager.LayoutParams | 是 | - | - | 窗口属性 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreWindowAttributesChanged.tutorial -->

#### onWindowAttributesChanged(params, attrs)

对应原生 Activity 的 [onWindowAttributesChanged](https://developer.android.com/reference/android/view/Window.Callback#onWindowAttributesChanged(android.view.WindowManager.LayoutParams)) 函数，当当前窗口属性更改时调用，如大小、透明度等。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 attrs 为窗口参数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| attrs | WindowManager.LayoutParams | 是 | - | - | 新的窗口属性 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onWindowAttributesChanged.tutorial -->

#### onPreWindowFocusChanged(params, hasFocus)

对应原生 Activity 的 [onWindowFocusChanged](https://developer.android.com/reference/android/app/Activity#onWindowFocusChanged(boolean)) 函数，此方法在super.onWindowFocusChanged() 调用之前被调用，用于处理窗口焦点更改前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasFocus 表示是否获得焦点。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| hasFocus | Boolean | 是 | - | - | 窗口是否获得焦点 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreWindowFocusChanged.tutorial -->

#### onWindowFocusChanged(params, hasFocus)

对应原生 Activity 的 [onWindowFocusChanged](https://developer.android.com/reference/android/app/Activity#onWindowFocusChanged(boolean)) 函数，当 Activity 的窗口焦点发生变化时调用，如获得或失去焦点。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasFocus 指示窗口是否获得了焦点。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| hasFocus | Boolean | 是 | - | - | 窗口是否获得了焦点 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onWindowFocusChanged.tutorial -->

#### onPreAttachedToWindow(params)

对应原生 Activity 的 [onAttachedToWindow](https://developer.android.com/reference/android/view/View#onAttachedToWindow()) 函数，此方法在super.onAttachedToWindow() 调用之前被调用，用于处理窗口附加到窗口管理器前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreAttachedToWindow.tutorial -->

#### onAttachedToWindow(params)

对应原生 Activity 的 [onAttachedToWindow](https://developer.android.com/reference/android/view/View#onAttachedToWindow()) 函数，当 Activity 的窗口被添加到窗口管理器时调用。这标志着 Activity 可以开始与用户交互。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onAttachedToWindow.tutorial -->

#### onPrePanelClosed(params, featureId, menu)

对应原生 Activity 的 [onPanelClosed](https://developer.android.com/reference/android/app/Activity#onPanelClosed(int,%20android.view.Menu)) 函数，此方法在super.onPanelClosed() 调用之前被调用，用于处理面板关闭前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 featureId 表示面板的特征标识，第三个参数 menu 表示关闭的面板的菜单。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| featureId | Int | 是 | - | - | 面板的特征标识 |
| menu | Menu | 是 | - | - | 面板的菜单 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPrePanelClosed.tutorial -->

#### onPanelClosed(params, featureId, menu)

对应原生 Activity 的 [onPanelClosed](https://developer.android.com/reference/android/app/Activity#onPanelClosed(int,%20android.view.Menu)) 函数，当菜单面板被关闭时调用，可以在这里做一些清理工作。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 featureId 为面板编号，第三个参数 menu 为面板的菜单。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| featureId | Int | 是 | - | - | 面板编号 |
| menu | Menu | 是 | - | - | 面板的菜单 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPanelClosed.tutorial -->

#### onPreSearchRequested(params)

对应原生 Activity 的 [onSearchRequested](https://developer.android.com/reference/android/app/Activity#onSearchRequested()) 函数，此方法在super.onSearchRequested() 调用之前被调用，用于处理搜索请求前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreSearchRequested.tutorial -->

#### onSearchRequested(params)

对应原生 Activity 的 [onSearchRequested](https://developer.android.com/reference/android/app/Activity#onSearchRequested()) 函数，当用户请求搜索操作时调用。您可以在这里启动一个搜索界面。<br/>     注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onSearchRequested.tutorial -->

#### onPreWindowStartingActionMode(params, callback)

对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback)) 函数，此方法在super.onWindowStartingActionMode() 调用之前被调用，用于处理窗口开始操作模式前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式的回调函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| callback | ActionMode.Callback \| null | 是 | - | - | 操作模式的回调函数 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreWindowStartingActionMode.tutorial -->

#### onWindowStartingActionMode(params, callback)

对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback)) 函数，当窗口开始进入操作模式时调用，如选择文本操作。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式回调。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| callback | ActionMode.Callback \| null | 是 | - | - | 操作模式的回调 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onWindowStartingActionMode.tutorial -->

#### onPreWindowStartingActionMode(params, callback, type)_1

对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback)) 函数，此方法在super.onWindowStartingActionMode() 调用之前被调用，用于处理窗口开始操作模式前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式的回调函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| callback | ActionMode.Callback \| null | 是 | - | - | 操作模式的回调函数 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreWindowStartingActionMode_1.tutorial -->

#### onWindowStartingActionMode(params, callback, type)_1

对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback,%20int)) 函数，使用特定类型时调用。例如，浮动或类型化的操作模式。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式回调，第三个参数 type 为操作模式类型。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| callback | ActionMode.Callback \| null | 是 | - | - | 操作模式的回调 |
| type | Int | 是 | - | - | 操作模式的类型 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onWindowStartingActionMode_1.tutorial -->

#### onPreActionModeFinished(params, mode)

对应原生 Activity 的 [onActionModeFinished](https://developer.android.com/reference/android/app/Activity#onActionModeFinished(android.view.ActionMode)) 函数，此方法在super.onActionModeFinished() 调用之前被调用，用于处理操作模式结束前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 表示结束的操作模式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| mode | ActionMode \| null | 是 | - | - | 结束的操作模式 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreActionModeFinished.tutorial -->

#### onActionModeFinished(params, mode)

对应原生 Activity 的 [onActionModeFinished](https://developer.android.com/reference/android/app/Activity#onActionModeFinished(android.view.ActionMode)) 函数，当操作模式结束时调用。可以在此处执行清理工作。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 为结束的操作模式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| mode | ActionMode \| null | 是 | - | - | 结束的操作模式 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onActionModeFinished.tutorial -->

#### onPreActionModeStarted(params, mode)

对应原生 Activity 的 [onActionModeStarted](https://developer.android.com/reference/android/app/Activity#onActionModeStarted(android.view.ActionMode)) 函数，此方法在super.onActionModeStarted() 调用之前被调用，用于处理操作模式开始前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 表示开始的操作模式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| mode | ActionMode \| null | 是 | - | - | 开始的操作模式 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreActionModeStarted.tutorial -->

#### onActionModeStarted(params, mode)

对应原生 Activity 的 [onActionModeStarted](https://developer.android.com/reference/android/app/Activity#onActionModeStarted(android.view.ActionMode)) 函数，当操作模式开始时调用。可以在此处进行初始化工作。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 为开始的操作模式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| mode | ActionMode \| null | 是 | - | - | 开始的操作模式 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onActionModeStarted.tutorial -->

#### onPreProvideKeyboardShortcuts(params, data, menu, deviceId)

对应原生 Activity 的 [onProvideKeyboardShortcuts](https://developer.android.com/reference/android/app/Activity#onProvideKeyboardShortcuts(java.util.List,%20android.view.Menu,%20int)) 函数，此方法在super.onProvideKeyboardShortcuts() 调用之前被调用，用于处理提供键盘快捷方式前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 data 为键盘快捷键列表，第三个参数 menu 为菜单（如果有），第四个参数 deviceId 为设备ID。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| data | MutableList\<KeyboardShortcutGroup> \| null | 是 | - | - | 键盘快捷键列表 |
| menu | Menu \| null | 是 | - | - | 菜单 |
| deviceId | Int | 是 | - | - | 设备ID | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPreProvideKeyboardShortcuts.tutorial -->

#### onProvideKeyboardShortcuts(params, data, menu, deviceId)

对应原生 Activity 的 [onProvideKeyboardShortcuts](https://developer.android.com/reference/android/app/Activity#onProvideKeyboardShortcuts(java.util.List,%20android.view.Menu,%20int)) 函数，当用户请求显示键盘快捷方式帮助时调用。可以在此处提供快捷方式信息。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 data 为键盘快捷方式群组的列表，第三个参数 menu 为相关联的菜单（如果有），第四个参数 deviceId 为请求快捷方式的设备ID。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| data | MutableList\<KeyboardShortcutGroup> \| null | 是 | - | - | 键盘快捷方式群组的列表 |
| menu | Menu \| null | 是 | - | - | 相关联的菜单 |
| deviceId | Int | 是 | - | - | 设备ID | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onProvideKeyboardShortcuts.tutorial -->

#### onPrePointerCaptureChanged(params, hasCapture)

对应原生 Activity 的 [onPointerCaptureChanged](https://developer.android.com/reference/android/app/Activity#onPointerCaptureChanged(boolean)) 函数，此方法在super.onPointerCaptureChanged() 调用之前被调用，用于处理指针捕获状态改变前的逻辑。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasCapture 表示是否捕获了输入指针。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| hasCapture | Boolean | 是 | - | - | 是否捕获了输入指针 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPrePointerCaptureChanged.tutorial -->

#### onPointerCaptureChanged(params, hasCapture)

对应原生 Activity 的 [onPointerCaptureChanged](https://developer.android.com/reference/android/app/Activity#onPointerCaptureChanged(boolean)) 函数，当指针捕获状态更改时调用。可以在此处更新 UI 或状态来响应捕获状态的变化。<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasCapture 指示是否启用了指针捕获。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数, 包括页面路由地址与方法返回值 |
| hasCapture | Boolean | 是 | - | - | 是否启用了指针捕获 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.onPointerCaptureChanged.tutorial -->

#### dispatchPreKeyEvent(params, event)

对应原生 Activity 的 [dispatchKeyEvent](https://developer.android.com/reference/android/app/Activity#dispatchKeyEvent(android.view.KeyEvent)) 函数，此方法在super.dispatchKeyEvent() 调用之前被调用，用于处理按键事件分发前的逻辑。<br/>     在super方法之前调用，注意第一个参数为自定义参数 UniActivityParams。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| event | KeyEvent \| null | 是 | - | - | 按键事件 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.dispatchPreKeyEvent.tutorial -->

#### dispatchKeyEvent(params, event)

对应原生 Activity 的 [dispatchKeyEvent](https://developer.android.com/reference/android/app/Activity#dispatchKeyEvent(android.view.KeyEvent)) 函数<br/>     注意第一个参数为自定义参数 UniActivityParams，第二个参数 event 为按键事件。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| params | **UniActivityParams** | 是 | - | - | 统一返回参数，包括页面路由地址与方法返回值 |
| event | KeyEvent \| null | 是 | - | - | 按键事件 | 

#### params 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| activity | Activity | 是 | - | Web: -; Android: 4.62; iOS: x; HarmonyOS: - | 当前activity示例 |
| pageRoute | string | 是 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 页面路由地址 |
| result | any | 否 | - | Web: -; Android: 4.18; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，会在on函数触发时将系统返回值赋给result，作为入参传递给开发者，但在onPreXXX里该值为null |
| returnResult | any | 否 | - | Web: -; Android: 5.01; iOS: x; HarmonyOS: - | 如果对应的方法有返回值，开发者需要将返回值赋给returnResult，作为出参传递给系统，可用于按键事件拦截 |


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| Android | Android UTS 插件 |
| :- | :- |
| 4.18 | 4.18 |


**uni-app 兼容性**
| Android UTS 插件 |
| :- |
| x |


<!-- UTSJSON.UniActivityWindowCallback.dispatchKeyEvent.tutorial -->

## 示例

uvue代码

```vue
  <template>
  <!-- #ifdef APP-ANDROID -->
  <scroll-view style="flex: 1">
    <view>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="text-box" scroll-y="true">
          <text>{{ text }}</text>
        </view>
      </view>
      <button @tap="activityCallback">注册activity 回调方法</button>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="uni-hello-text">
          点击注册activity 回调方法后，可以手动切换其他APP再返回，可在控制台和界面观察事件日志
        </view>
      </view>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="text-box" scroll-y="true">
          <text>{{ cbText }}</text>
        </view>
      </view>
      <button @tap="unRegActivityCallback">取消注册activity 回调方法</button>
    </view>
  </scroll-view>
  <!-- #endif -->
</template>

<script>
  // #ifdef APP-ANDROID
  import {
    UTSAcvitiyLifeCycleCallback,
    UTSAcvitiyKeyEventCallback,
    UTSActivityWindowCallback,
    UTSActivityCallback,
    UTSActivityComponentCallback,
    onCallbackChange
  } from '@/uni_modules/uts-syntaxcase'
  // #endif


  import File from 'java.io.File';
  import Intent from 'android.content.Intent';


  export default {
    data() {
      return {
        cbText: "" as string,  
        text: '',
        callback: [] as Any[]
      }
    },
    unmounted() {
      // #ifdef APP-ANDROID
      this.unRegActivityCallback()
      // #endif

    },
    methods: {
      // #ifdef APP-ANDROID
      // #ifdef UNI-APP-X
      activityCallback() {
        var that = this
        onCallbackChange(function (eventLog : string) {
          // 展示捕捉到的声明周期日志
          let nextLine = that.cbText + eventLog
          that.cbText = nextLine
          let nextLineFlag = that.cbText + '\n'
          that.cbText = nextLineFlag
        })
        let index = getCurrentPages().length - 1
        let page = getCurrentPages()[index]
        console.log('page route=' + page.route)
        this.callback.push(new UTSAcvitiyLifeCycleCallback())
        this.callback.push(new UTSActivityWindowCallback())
        this.callback.push(new UTSAcvitiyKeyEventCallback())
        this.callback.push(new UTSActivityCallback(), page.route)
        this.callback.push(new UTSActivityComponentCallback())
        this.callback.forEach((value) => {
          if (value instanceof UTSAcvitiyLifeCycleCallback) {
            UTSAndroid.onActivityCallback(value,page.route)
          }
          if (value instanceof UTSActivityWindowCallback) {
            UTSAndroid.onActivityCallback(value)
          }
          if (value instanceof UTSAcvitiyKeyEventCallback) {
            UTSAndroid.onActivityCallback(value)
          }
          if (value instanceof UTSActivityCallback) {
            UTSAndroid.onActivityCallback(value)
          }
          if (value instanceof UTSActivityComponentCallback) {
            UTSAndroid.onActivityCallback(value)
          }

        })
      },
      unRegActivityCallback() {
        this.callback.forEach((value) => {

          if (value instanceof UTSAcvitiyLifeCycleCallback) {
            UTSAndroid.offActivityCallback(value)
          }
          if (value instanceof UTSActivityWindowCallback) {
            UTSAndroid.offActivityCallback(value)
          }
          if (value instanceof UTSAcvitiyKeyEventCallback) {
            UTSAndroid.offActivityCallback(value)
          }
          if (value instanceof UTSActivityCallback) {
            UTSAndroid.offActivityCallback(value)
          }
          if (value instanceof UTSActivityComponentCallback) {
            UTSAndroid.offActivityCallback(value)
          }
        })
      }
      // #endif
      // #endif
    },
  }
</script>
```
uts代码

```ts
import Bundle from "android.os.Bundle"  
import KeyEvent from "android.view.KeyEvent"  
import WindowManager from "android.view.WindowManager"   
import Menu from "android.view.Menu"  
import ActionMode from "android.view.ActionMode"  
import Configuration from "android.content.res.Configuration"  
import KeyboardShortcutGroup from "android.view.KeyboardShortcutGroup";  


let callback : (eventLog : string) => void = (res) => { };

export function onCallbackChange(fn : (eventLog : string) => void) {
  callback = fn
}

export class UTSAcvitiyLifeCycleCallback extends UniActivityLifeCycleCallback {
  constructor() {
    super()
  }
  override onCreate(params : UniActivityParams, savedInstanceState : Bundle | null) {
    console.log('UTSAcvitiyLifeCycle', 'onCreate', savedInstanceState)
    callback('onCreate')
  }

  override onResume(params : UniActivityParams) {
    console.log('UTSAcvitiyLifeCycle', 'onResume', params)
    callback('onResume')
  }
  override onPreResume(params : UniActivityParams) {
    console.log('UTSAcvitiyLifeCycle', 'onPreResume', params)
    callback('onPreResume')
  }
  override onStart(params : UniActivityParams) {
    console.log('UTSAcvitiyLifeCycle', 'onStart', params)
    callback('onStart')
  }
  override onPreStart(params : UniActivityParams) {
    console.log('UTSAcvitiyLifeCycle', 'onPreStart', params)
    callback('onPreStart')
  }
}
export class UTSAcvitiyKeyEventCallback extends UniActivityKeyEventCallback {
  constructor() {
    super()
  }
  override onKeyDown(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) {
    console.log('UTSAcvitiyKeyEvent', 'onKeyDown', params, keyCode, '' + event)
    callback('onKeyDown')
  }
  override onPreKeyDown(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) {
    params.returnResult = true //设置returnResult为true，表示需要拦截事件，终止事件传递
    console.log('UTSAcvitiyKeyEvent', 'onPreKeyDown', params, keyCode, '' + event)
    callback('onPreKeyDown')
  }
  override onKeyLongPress(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) {
    console.log('UTSAcvitiyKeyEvent', 'onKeyLongPress', params, keyCode, '' + event)
    callback('onKeyLongPress')
  }
  override onPreKeyLongPress(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) {
    console.log('UTSAcvitiyKeyEvent', 'onPreKeyLongPress', params, keyCode, '' + event)
    callback('onPreKeyLongPress')
  }
}

export class UTSActivityWindowCallback extends UniActivityWindowCallback {
  constructor() {
    super()
  }
  override dispatchPreKeyEvent(params : UniActivityParams, event : KeyEvent | null) {
    console.log('UTSActivityWindowCallback', 'dispatchPreKeyEvent', params, '' + event)
    callback('dispatchPreKeyEvent')
  }
  override dispatchKeyEvent(params : UniActivityParams, event : KeyEvent | null) {
    console.log('UTSActivityWindowCallback', 'dispatchKeyEvent', params, '' + event)
    callback('dispatchKeyEvent')
  }
  override  onWindowAttributesChanged(params : UniActivityParams, attrs : WindowManager.LayoutParams) {
    console.log('UTSActivityWindowCallback', 'onWindowAttributesChanged', '' + attrs)
    callback('onWindowAttributesChanged')

  }
  override onAttachedToWindow(params : UniActivityParams) {
    console.log('UTSActivityWindowCallback', 'onAttachedToWindow', params)
    callback('onAttachedToWindow')

  }
  override onPanelClosed(params : UniActivityParams, featureId : Int, menu : Menu) {
    console.log('UTSActivityWindowCallback', 'onPanelClosed', featureId, menu)
    callback('onPanelClosed')

  }
  override onWindowStartingActionMode(params : UniActivityParams, callback : ActionMode.Callback | null) {
    console.log('UTSActivityWindowCallback', 'onWindowStartingActionMode', callback)
    callback('onWindowStartingActionMode')
  }
  override onProvideKeyboardShortcuts(params : UniActivityParams, data : MutableList<KeyboardShortcutGroup> | null, menu : Menu | null, deviceId : Int) {
    console.log('UTSActivityWindowCallback', 'onProvideKeyboardShortcuts', data, menu)
    callback('onProvideKeyboardShortcuts')
  }
  override  onPreWindowAttributesChanged(params : UniActivityParams, attrs : WindowManager.LayoutParams) {
    console.log('UTSActivityWindowCallback', 'onPreWindowAttributesChanged', attrs)
    callback('onPreWindowAttributesChanged')
  }
  override  onPrePanelClosed(params : UniActivityParams, featureId : Int, menu : Menu) {
    console.log('UTSActivityWindowCallback', 'onPrePanelClosed', featureId, menu)
    callback('onPrePanelClosed')
  }
}

export class UTSActivityCallback extends UniActivityCallback {
  constructor() {
    super()
  }
  override onRequestPermissionsResult(params : UniActivityParams, requestCode : Int, permissions : MutableList<String>, grantResults : IntArray) {
    console.log('UTSActivityCallback', 'onRequestPermissionsResult', params)
    callback('onRequestPermissionsResult')
  }

}

export class UTSActivityComponentCallback extends UniActivityComponentCallback {
  constructor() {
    super()
  }
  override onConfigurationChanged(params : UniActivityParams, newConfig : Configuration) {
    console.log('UTSActivityComponentCallback', 'onConfigurationChanged', params, '' + newConfig)
    callback('onConfigurationChanged')
  }
  override onPreConfigurationChanged(params : UniActivityParams, newConfig : Configuration) {
    console.log('UTSActivityComponentCallback', 'onPreConfigurationChanged', params, '' + newConfig)
    callback('onPreConfigurationChanged')
  }
}
```




