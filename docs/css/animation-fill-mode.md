## animation-fill-mode



CSS 属性 animation-fill-mode 设置 CSS 动画在执行之前和之后如何将样式应用于其目标。


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
animation-fill-mode: <single-animation-fill-mode>#;
```



### animation-fill-mode 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| backwards | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在animation-delay期间保留此值。第一个关键帧取决于animation-direction的值：<br/>    <br/>      <br/>        <br/>          animation-direction<br/>          first relevant keyframe<br/>        <br/>      <br/>      <br/>        <br/>          normal or alternate<br/>          0% or from<br/>        <br/>        <br/>          reverse or alternate-reverse<br/>          100% or to |
| both | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | 动画将遵循forwards和backwards的规则，从而在两个方向上扩展动画属性。 |
| forwards | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 目标将保留由执行期间遇到的最后一个关键帧 (en-US)计算值。最后一个关键帧取决于animation-direction和animation-iteration-count的值：<br/>    <br/>      <br/>        <br/>          animation-direction<br/>          animation-iteration-count<br/>          last keyframe encountered<br/>        <br/>      <br/>      <br/>        <br/>          normal<br/>          even or odd<br/>          100% or to<br/>        <br/>        <br/>          reverse<br/>          even or odd<br/>          0% or from<br/>        <br/>        <br/>          alternate<br/>          even<br/>          0% or from<br/>        <br/>        <br/>          alternate<br/>          odd<br/>          100% or to<br/>        <br/>        <br/>          alternate-reverse<br/>          even<br/>          100% or to<br/>        <br/>        <br/>          alternate-reverse<br/>          odd<br/>          0% or from |
| none | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。 |


### 默认值 @default-value 
 `none`






### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-fill-mode)
