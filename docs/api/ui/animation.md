### uni.createAnimation(OBJECT)

创建一个动画实例 [animation](#animation)。调用实例的方法来描述动画。最后通过动画实例的export方法导出动画数据传递给组件的animation属性。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|HBuilderX 2.0.4+|√|√|√|√|√|

**注意:**
- export 方法每次调用后会清掉之前的动画操作
- nvue 暂不支持
- 启用摇树优化会舍弃使animation动画无效

**OBJECT参数说明：**

|参数|类型|必填|默认值|说明|
|---|---|---|---|---|
|duration|Integer|否|400|动画持续时间，单位ms|
|timingFunction|String|否|"linear"|定义动画的效果|
|delay|Integer|否|0|动画延迟时间，单位 ms|
|transformOrigin|String|否|"50% 50% 0"|设置transform-origin||

**timingFunction 有效值：**

|值|说明|
|----|----|
|linear|动画从头到尾的速度是相同的|
|ease|动画以低速开始，然后加快，在结束前变慢|
|ease-in|动画以低速开始|
|ease-in-out|动画以低速开始和结束|
|ease-out|动画以低速结束|
|step-start|动画第一帧就跳至结束状态直到结束|
|step-end|动画一直保持开始状态，最后一帧跳到结束状态|

```javascript
var animation = uni.createAnimation({
  transformOrigin: "50% 50%",
  duration: 1000,
  timingFunction: "ease",
  delay: 0
})
```


**animation**

动画实例可以调用以下方法来描述动画，调用结束后会返回自身，支持链式调用的写法。

**animation 对象的方法列表：**

样式：

|方法|参数|说明|
|---|---|---|
|opacity|value|透明度，参数范围 0~1|
|backgroundColor|color|颜色值|
|width|length|长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值|
|height|length|长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值|
|top|length|长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值|
|left|length|长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值|
|bottom|length|长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值|
|right|length|长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值|


旋转：

|方法|参数|说明|
|---|---|---|
|rotate|deg|deg的范围-180~180，从原点顺时针旋转一个deg角度|
|rotateX|deg|deg的范围-180~180，在X轴旋转一个deg角度|
|rotateY|deg|deg的范围-180~180，在Y轴旋转一个deg角度|
|rotateZ|deg|deg的范围-180~180，在Z轴旋转一个deg角度|
|rotate3d|(x,y,z,deg)|同[transform-function rotate3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d)|

缩放：

|方法|参数|说明|
|---|---|---|
|scale|sx,[sy]|一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数|
|scaleX|sx|在X轴缩放sx倍数|
|scaleY|sy|在Y轴缩放sy倍数|
|scaleZ|sz|在Z轴缩放sy倍数|
|scale3d|(sx,sy,sz)|在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数|

偏移：

|方法|参数|说明|
|---|---|---|
|translate|tx,[ty]|一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。|
|translateX|tx|在X轴偏移tx，单位px|
|translateY|ty|在Y轴偏移tx，单位px|
|translateZ|tz|在Z轴偏移tx，单位px|
|translate3d|(tx,ty,tz)|在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px|

倾斜：

|方法|参数|说明|
|---|---|---|
|skew|ax,[ay]|参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度|
|skewX|ax|参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度|
|skewY|ay|参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度|

矩阵变形：

|方法|参数|说明|
|---|---|---|
|matrix|(a,b,c,d,tx,ty)|同	[transform-function matrix](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)|
|matrix3d||同[transform-function matrix3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d)|

**动画队列**

调用动画操作方法后要调用 ```step()``` 来表示一组动画完成，可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。```step``` 可以传入一个跟 ```uni.createAnimation()``` 一样的配置参数用于指定当前组动画的配置。

**示例代码**

```html
<view :animation="animationData" style="background:red;height:100rpx;width:100rpx"></view>
```

```javascript
export default{
  data: {
    animationData: {}
  },
  onShow: function(){
    var animation = uni.createAnimation({
      duration: 1000,
        timingFunction: 'ease',
    })

    this.animation = animation

    animation.scale(2,2).rotate(45).step()

    this.animationData = animation.export()

    setTimeout(function() {
      animation.translate(30).step()
      this.animationData = animation.export()
    }.bind(this), 1000)
  },
  methods:{
    rotateAndScale: function () {
      // 旋转同时放大
      this.animation.rotate(45).scale(2, 2).step()
      this.animationData = this.animation.export()
    },
    rotateThenScale: function () {
      // 先旋转后放大
      this.animation.rotate(45).step()
      this.animation.scale(2, 2).step()
      this.animationData = this.animation.export()
    },
    rotateAndScaleThenTranslate: function () {
      // 先旋转同时放大，然后平移
      this.animation.rotate(45).scale(2, 2).step()
      this.animation.translate(100, 100).step({ duration: 1000 })
      this.animationData = this.animation.export()
    }
  }
}
```
