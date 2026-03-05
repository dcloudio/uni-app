## border-left-width



border-left-width 属性用于设置元素的左边框的宽度。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-left-width: <line-width>;
```



### 值限制
- length
- enum



### border-left-width 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| thin | Web: 4.0; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 细边线，App平台对应值为1px |
| medium | Web: 4.0; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 中等边线，App平台对应值为3px |
| thick | Web: 4.0; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 宽边线，App平台对应值为5px |


### 默认值 @default-value 
 `medium`

**注意**
- App平台
	+ HBuilderX3.92及以前版本默认值为0px，HBuilderX3.93+版本调整默认值为thin
	+ HBuilderX4.0+版本调整默认值为medium
- Web端
	+ Android平台Chrome浏览器或内置Webview中实际默认值不是medium，是根据设备自动计算的介于thin和medium中间的值








### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left-width)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-left-width)

