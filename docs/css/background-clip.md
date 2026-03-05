## background-clip



background-clip 属性用于设置元素的背景（背景图片或颜色）是否延伸到边框区域、内边距区域、内容区域下面。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | x | x | x |




### 语法
```
background-clip: <box>#;
```



### 值限制
- enum



### background-clip 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| border-box | Web: 4.0; Android: 3.9; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 背景延伸到边框区域，被边框覆盖 |
| padding-box | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 背景延伸到内边距（padding）区域，不会绘制到边框区域 |
| content-box | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 背景仅绘制到内容区（content box）区域 |


### 默认值 @default-value 
 `border-box`








### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-clip)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.background-clip)

