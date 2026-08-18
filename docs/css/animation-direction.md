## animation-direction



animation-direction CSS 属性设置动画是应正向播放、反向播放还是在正向和反向之间交替播放。


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
animation-direction: <single-animation-direction>#;
```



### animation-direction 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| alternate | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 动画在每个循环中正反交替播放，第一次迭代是正向播放。确定循环是奇数还是偶数的计数从 1 开始。 |
| alternate-reverse | Android(Vapor): x; iOS(Vapor): x | 动画在每个循环中正反交替播放，第一次迭代是反向播放。确定循环是奇数还是偶数的计数从 1 开始。 |
| normal | Web: 4.0; Android 系统版本: -; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | 动画在每个循环中正向播放。换句话说，每次动画循环时，动画将重置为起始状态并重新开始。这是默认值。 |
| reverse | Android(Vapor): x; iOS(Vapor): x | 动画在每个循环中反向播放。换句话说，每次动画循环时，动画将重置为结束状态并重新开始。动画步骤将反向执行，并且时间函数也将被反转。例如，ease-in 时间函数变为 ease-out。 |


### 默认值 @default-value 
 `normal`






### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-direction)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation-direction)
