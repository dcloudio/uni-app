## border-left-style



设置元素左边框的样式。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-left-style: <line-style>;
```



### 值限制
- enum



### border-left-style 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 和关键字 hidden 类似，不显示边框。在这种情况下，如果没有设定背景图片，border-width 计算后的值将是 0，即使先前已经指定过它的值。在单元格边框重叠情况下，none 值优先级最低，意味着如果存在其他的重叠边框，则会显示为那个边框。 |
| solid | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示为一条实线。 |
| dashed | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示为一系列短的方形虚线。标准中没有定义线段的长度和大小，视不同实现而定。 |
| dotted | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示为一系列圆点。标准中没有定义两点之间的间隔大小，视不同实现而定。圆点半径是 border-width 计算值的一半。 |











### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left-style)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-left-style)

