## text-decoration-style



text-decoration-style 属性用于设置元素中文本的修饰线样式，线的样式会应用到所有被 text-decoration-line 设定的线，不能为其中的每条线设置不同的样式。


### uni-app x 兼容性 <Help />
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| 4.0 | x | x | x |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |



### 语法
```
text-decoration-style: solid | double | dotted | dashed | wavy;
```



### 值限制
- enum



### text-decoration-style 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| solid | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 实线。 |
| dashed | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 虚线。 |
| dotted | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 点划线。 |
| wavy | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 波浪线。 |




### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)





#### App平台差异
text-decoration-style 样式不支持继承


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-style)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.text-decoration-style)

