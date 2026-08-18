## animation-timing-function



animation-timing-function CSS 属性设置动画在每个周期的持续时间内如何进行。


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
animation-timing-function: <easing-function>#;
```



### animation-timing-function 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| ease | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 等同于 cubic-bezier(0.25, 0.1, 0.25, 1.0)，即默认值，表示动画在中间加速，在结束时减速。。 |
| linear | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 等同于 cubic-bezier(0.0, 0.0, 1.0, 1.0)，表示动画以匀速运动。 |
| ease-in | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 等同于 cubic-bezier(0.42, 0, 1.0, 1.0)，表示动画一开始较慢，随着动画属性的变化逐渐加速，直至完成。 |
| ease-out | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 等同于 cubic-bezier(0, 0, 0.58, 1.0)，表示动画一开始较快，随着动画的进行逐渐减速。 |
| ease-in-out | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 等同于 cubic-bezier(0.42, 0, 0.58, 1.0)，表示动画属性一开始缓慢变化，随后加速变化，最后再次减速变化。 |
| cubic-bezier() | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 开发者自定义的三次贝塞尔曲线，其中 p1 和 p3 的值必须在 0 到 1 的范围内。 |
| steps() | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 按照 n 个定格在过渡中显示动画迭代，每个定格等长时间显示。例如，如果 n 为 5，则有 5 个步骤。动画是否在 0%、20%、40%、60% 和 80% 处或 20%、40%、60%、80% 和 100% 处暂停，或者在动画的 0% 和 100% 之间设置 5 个定格，又或是在包括 0% 和 100% 的情况下设置 5 个定格（在 0%、25%、50%、75% 和 100% 处）取决于使用以下跳跃项之一：<br/>    <br/>      jump-start<br/>      <br/>        表示一个左连续函数，因此第一个跳跃发生在动画开始时。<br/>      <br/>      jump-end<br/>      <br/>        表示一个右连续函数，因此最后一个跳跃发生在动画结束时。<br/>      <br/>      jump-none<br/>      <br/>        两端都没有跳跃。相反，在 0% 和 100% 标记处分别停留，每个停留点的持续时间为总动画时间的 1/n。<br/>      <br/>      jump-both<br/>      <br/>        在 0% 和 100% 标记处停留，有效地在动画迭代过程中添加一个步骤。<br/>      <br/>      start<br/>      <br/>        等同于 jump-start。<br/>      <br/>      end<br/>      <br/>        等同于 jump-end。<br/>      <br/>      step-start<br/>      <br/>        等同于 steps(1, jump-start)。<br/>      <br/>      step-end<br/>      <br/>        等同于 steps(1, jump-end)。 |
| step-start | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 等同于 steps(1, jump-start)。 |
| step-end | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 等同于 steps(1, jump-end)。 |
| jump-start | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 表示一个左连续函数，因此第一个跳跃发生在动画开始时。 |
| jump-end | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 表示一个右连续函数，因此最后一个跳跃发生在动画结束时。 |
| jump-none | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 两端都没有跳跃。相反，在 0% 和 100% 标记处分别停留，每个停留点的持续时间为总动画时间的 1/n。 |
| jump-both | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 在 0% 和 100% 标记处停留，有效地在动画迭代过程中添加一个步骤。 |
| start | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 等同于 jump-start。 |
| end | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 等同于 jump-end。 |


### 默认值 @default-value 
 `ease`






### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-timing-function)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-timing-function)
