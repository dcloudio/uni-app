## background



background 是一种 CSS 简写属性，用于一次性集中定义各种背景属性，包括 color, image, origin, size, repeat 等。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
background: [ <bg-layer> , ]* <final-bg-layer>;
```



### 值限制
- color
- gradient



### background 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| fixed | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 背景固定于视口。在分页媒体中，如果没有视口，则“fixed”背景将相对于页面框固定，因此在每一页都会复制。 |
| local | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 背景相对于元素内容固定：如果元素具有滚动机制，背景将随元素内容滚动。 |
| none | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 被视为图像层，但不绘制任何内容。 |
| scroll | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 背景固定于元素自身，不随内容滚动（实际上附加在元素的边框上）。 |











### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.background)

