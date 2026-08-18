## animation-timeline



The animation-timeline CSS property specifies the timeline that is used to control the progress of a CSS animation.


### uni-app x 兼容性 <Help />
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| x | x | x |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |





### 语法
```
animation-timeline: <single-animation-timeline>#;
```



### animation-timeline 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The animation is not associated with a timeline. |
| auto | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | The animation's timeline is the document's default DocumentTimeline. |
| scroll() | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | An anonymous scroll progress timeline is provided by some ancestor scroller of the current element. The function parameters allow you to select the scroller, and the scrolling axis the timeline will be measured along.<br/>    See scroll() for more information. |
| view() | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | An anonymous view progress timeline is provided by the subject that animation-timeline: view(); is set on. The function parameters allow you to select the scrollbar axis along which timeline progress will be tracked and an inset that adjusts the position of the box in which the subject is deemed to be visible.<br/>    See view() for more information. |


### 默认值 @default-value 
 `auto`






### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-timeline)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-timeline)
