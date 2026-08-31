## backdrop-filter



backdrop-filter 属性设置元素的背景滤镜效果，即对其后方（背景透出）的所有内容添加图形效果（如毛玻璃、背景高斯模糊等）。为了看到效果，必须使元素或其背景至少部分透明。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.25 | x | 5.25 | x | 5.25 |






### 语法
```
backdrop-filter: none | <filter-function-list>;
```



### backdrop-filter 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 清除/禁用背景滤镜效果 |
| blur() | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 对背景内容添加高斯模糊（Gaussian Blur）滤镜效果 |









### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.backdrop-filter)
