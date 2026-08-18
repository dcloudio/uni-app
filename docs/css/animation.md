## animation



CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。


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
animation: <single-animation>#;
```



### animation 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| alternate | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. |
| alternate-reverse | Android(Vapor): x; iOS(Vapor): x | The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. |
| backwards | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. |
| both | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | Both forwards and backwards fill modes are applied. |
| forwards | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes. |
| infinite | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Causes the animation to repeat forever. |
| none | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | No animation is performed |
| normal | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Normal playback. |
| reverse | Android(Vapor): x; iOS(Vapor): x | All iterations of the animation are played in the reverse direction from the way they were specified. |









### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation)
