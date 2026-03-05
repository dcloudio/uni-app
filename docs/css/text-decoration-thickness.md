## text-decoration-thickness



text-decoration-thickness 属性用于设置元素中文本的修饰线的粗细。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | x | x | x | x |




### 语法
```
text-decoration-thickness: auto | from-font | <length> | <percentage> ;
```



### 值限制
- length



### text-decoration-thickness 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 自动为文本装饰线选择合适的粗细。 |
| from-font | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 如果字体文件中包含了首选的粗细值，则使用字体文件的粗细值。如果字体文件中没有包含首选的粗细值，则效果和设置为 auto 一样。 |




### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)





#### App平台差异
text-decoration-thickness 样式不支持继承


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text-decoration-thickness)

