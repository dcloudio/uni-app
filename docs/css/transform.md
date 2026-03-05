## transform



CSS transform 属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改 CSS 视觉格式化模型的坐标空间来实现的。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
transform: none | <transform-list>;
```



### 值限制
- enum



### transform 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| rotate(<angle>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 旋转元素以给定的角度（angle） |
| rotateX(<angle>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 绕 X 轴旋转元素以给定的角度（angle） |
| rotateY(<angle>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 绕 Y 轴旋转元素以给定的角度（angle） |
| rotateZ(<angle>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 绕 Z 轴旋转元素以给定的角度（angle） |
| scale(<number> <number>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缩放元素的尺寸，水平和垂直方向分别使用给定的比例（number） |
| scaleX(<number>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 水平方向缩放元素的尺寸，使用给定的比例（number） |
| scaleY(<number>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 垂直方向缩放元素的尺寸，使用给定的比例（number） |
| translate(<length/percentage> <length/percentage>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 沿 X 和 Y 轴移动元素，水平和垂直方向分别使用给定的距离或百分比 |
| translateX(<length/percentage>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 沿 X 轴移动元素，使用给定的距离或百分比 |
| translateY(<length/percentage>) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 沿 Y 轴移动元素，使用给定的距离或百分比 |







web中经常使用scaleY缩放一个1px的线条变成0.5px的细线。这个方案在app也适用。示例如下：
```html
<view style="width: 750rpx; height: 1px; background-color: #000; transform: scaleY(0.5)"></view>
```

**注意事项**：

- iOS 平台设置了`rotateX(<angle>)`、`rotateY(<angle>)`、`rotateZ(<angle>)`的组件视图是在三维空间中的旋转具有穿透效果，会被同一层级中其他组件视图遮盖住穿透的部分，如果不想被遮盖同层级中请不要存在其他组件。
- Android平台使用`scale()`、`scaleX()`、`scaleY()`时，使用`getBoundingClientRect`获取的宽高不会改变，后续会兼容处理。







### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transform)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.transform)

