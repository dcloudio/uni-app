## text-decoration-color



text-decoration-color 属性用于设置元素中文本的修饰线颜色。


### uni-app x 兼容性 <Help />
| Web | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 5.11 | x | 5.0 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | 5.11 | 5.0 |



### 语法
```
text-decoration-color: <color>;
```



### 值限制
- color






### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)





#### App平台差异
+ App平台默认颜色为文字颜色  
+ App-Android平台不支持设置修饰线颜色，修饰性颜色与文字颜色一致  
+ App-iOS 平台 VDOM 模式不支持设置修饰线颜色，修饰性颜色与文字颜色一致，蒸汽模式支持设置修饰线颜色  


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-color)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.text-decoration-color)

