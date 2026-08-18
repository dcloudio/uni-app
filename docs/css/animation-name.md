## animation-name



animation-name CSS 属性指定一个或多个 @keyframes at-rule 的名称，这些 at-rule 描述了要应用于元素的动画。多个 @keyframes at-rule 以逗号分隔的名称列表的形式指定。如果指定的名称不匹配任何 @keyframes at-rule，则不会对任何属性进行动画处理。


### uni-app x 兼容性 <Help />
| Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 5.25 | x | 5.25 | x | 5.25 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |





### 语法
```
animation-name: [ none | <keyframes-name> ]#;
```



### animation-name 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 一个特殊的关键字，表示没有关键帧。它可用于禁用动画，而不改变其他标识符的顺序，或禁用级联的动画。 |


### 默认值 @default-value 
 `none`






### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-name)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-name)
