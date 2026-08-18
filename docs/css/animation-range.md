## animation-range



The animation-range CSS shorthand property is used to set the start and end of an animation's attachment range along its timeline, i.e. where along the timeline an animation will start and end.


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
animation-range: [ <'animation-range-start'> <'animation-range-end'>? ]#;
```



### animation-range 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the start of the timeline in the case of animation-range-start and the end of the timeline in the case of animation-range-end. This is the default value. |
| cover | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the full range of a named view progress timeline (see CSS scroll-driven animations for more details), from the point where the subject element first starts to enter the scroll port's view progress visibility range (0% progress) to the point where it has completely left it (100% progress). |
| contain | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the range of a named view progress timeline where the subject element is fully contained by, or fully contains, the scroll port's view progress visibility range.<br/>        <br/>          If the subject element is smaller than the scrollport, it ranges from the point where the subject element is first completely contained by the scroll port (0% progress), to the point where it is no longer completely contained by the scroll port (100% progress).<br/>          If the subject element is larger than the scrollport, it ranges from the point where the subject element first completely covers the scroll port (0% progress), to the point where it no longer completely covers the scroll port (100% progress). |
| entry | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the range of a named view progress timeline from the point where the subject element first starts to enter the scroll port (0% progress), to the point where it has completely entered the scroll port (100%). |
| exit | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the range of a named view progress timeline from the point where the subject element first starts to exit the scroll port (0% progress), to the point where it has completely exited the scroll port (100%). |
| entry-crossing | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the range of a named view progress timeline from the point where the subject element first starts to cross the scroll port's starting edge (0% progress), to the point where it has completely crossed the scroll port's starting edge (100%). |
| exit-crossing | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Represents the range of a named view progress timeline from the point where the subject element first starts to cross the scroll port's end edge (0% progress), to the point where it has completely crossed the scroll port's end edge (100%). |









### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-range)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-range)
