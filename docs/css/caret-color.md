## caret-color



caret-color 属性用来定义插入光标（caret）的颜色，这里说的插入光标，就是那个在网页的可编辑器区域内，用来指示用户的输入具体会插入到哪里的那个一闪一闪的形似竖杠 \| 的东西。


### uni-app x 兼容性 <Help />
Web: 4.0; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36






### 语法
```
caret-color: auto | <color>;
```



### caret-color 的属性值
| 名称 | 描述 |
| :- | :- |
| auto | 默认颜色，此时浏览器应该用 currentcolor 来作为插入光标的颜色，但浏览器可能还会根据当前的背景色、阴影色等来对该颜色进行适当的调整以确保该插入光标具有良好的可见性。<br/>    <br/>      备注： auto 属性值在 CSS transitions/animations 中是不支持颜色插补（interpolated）的 |




### 适用组件 @unix-tags 
 - [input](/component/input.md)
- [textarea](/component/textarea.md)
- [editor](/component/editor.md)




### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/caret-color)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.caret-color)
