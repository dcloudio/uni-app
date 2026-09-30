## text-decoration



text-decoration 属性用于设置元素中文本的修饰线外观，是 text-decoration-line、text-decoration-color、text-decoration-style、text-decoration-thickness 属性的缩写。


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
text-decoration: <'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>;
```



### 值限制
- enum
- color
- length



### text-decoration 的属性值
| 名称 | 描述 |
| :- | :- |
| dashed | 虚线。 |
| dotted | 点划线。 |
| double | 双实线。 |
| line-through | 贯穿文本中间的线。 |
| none | 不画线。 |
| overline | 在文本的上方的线。 |
| solid | 实线。 |
| underline | 下滑线。 |
| wavy | 波浪线。 |
| text-decoration-line | 设置使用的装饰类型，例如 underline 或者 line-through。 |
| text-decoration-color | 设置装饰的颜色。 |
| text-decoration-style | 设置装饰的线条的颜色，例如 solid、wavy 或者 dashed。 |
| text-decoration-thickness | 设置用于装饰的线条粗细。 |




### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)



#### tips@suggestion
- app平台暂不支持 text-decoration 简写样式，仅支持 [text-decoration-line](./text-decoration-line.md) 设置修饰线类型





### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.text-decoration)

