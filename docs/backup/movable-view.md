#### movable-area

** 注意：仅微信基础库 1.2.0+ 支持，5+App不支持**

movable-view 的可移动区域。

|属性名			|类型		|默认值						|说明		|最低版本|
| --------						| -----			| ------|-----------			|-----	|
|scale-area	|Boolean	|false	|当里面的movable-view设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area|	1.9.90|

**注意：movable-area 必须设置width和height属性，不设置默认为10px**

#### movable-view

** 注意：仅微信基础库 1.2.0+ 支持，5+App不支持**

可移动的视图容器，在页面中可以拖拽滑动。
 
|属性名				|类型						|默认值	|说明																																																																																																																		|最低版本	|
| --------		| -----					| ------|-----------																																																																																																														|-----		|
|direction		|String					|none		|movable-view的移动方向，属性值有all、vertical、horizontal、none																																																																																				|					|
|inertia			|Boolean				|false	|movable-view是否带有惯性																																																																																																								|					|
|out-of-bounds|Boolean				|false	|超过可移动区域后，movable-view是否还可以移动																																																																																														|					|
|x						|Number / String|				|定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画																																																																							|					|
|y						|Number / String|				|定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画																																																																							|					|
|damping			|Number					|20			|阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快																																																																																			|					|
|friction			|Number					|2			|摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值																																																																			|					|
|disabled			|Boolean				|false	|是否禁用																																																																																																																|1.9.90		|
|scale				|Boolean				|false	|是否支持双指缩放，默认缩放手势生效区域是在movable-view内																																																																																								|1.9.90		|
|scale-min		|Number					|0.5		|定义缩放倍数最小值																																																																																																											|1.9.90		|
|scale-max		|Number					|10			|定义缩放倍数最大值																																																																																																											|1.9.90		|
|scale-value	|Number					|1			|定义缩放倍数，取值范围为 0.5 - 10																																																																																																			|1.9.90		|
|@change		|EventHandle		|				|拖动过程中触发的事件，event.detail = {x: x, y: y, source: source}，其中source表示产生移动的原因，值可为touch（拖动）、touch-out-of-bounds（超出移动范围）、out-of-bounds（超出移动范围后的回弹）、friction（惯性）和空字符串（setData）|1.9.90		|
|@scale		|EventHandle		|				|缩放过程中触发的事件，event.detail = {scale: scale}																																																																																										|1.9.90		|
 
 除了基本事件外，movable-view提供了两个特殊事件
 
 
|类型	|触发条件|	最低版本|
|---|---|---|
|htouchmove	|初次手指触摸后移动为横向的移动，如果catch此事件，则意味着touchmove事件也被catch	|1.9.90|
|vtouchmove	|初次手指触摸后移动为纵向的移动，如果catch此事件，则意味着touchmove事件也被catch	|1.9.90|

> movable-view 必须设置width和height属性，不设置默认为10px

> movable-view 默认为绝对定位，top和left属性为0px

> 当movable-view小于movable-area时，movable-view的移动范围是在movable-area内；当movable-view大于movable-area时，movable-view的移动范围必须包含movable-area（x轴方向和y轴方向分开考虑）

**注意：** ``<movable-view>`` 必须在 ``<movable-area>`` 组件中，并且必须是直接子节点，否则不能移动。
**示例代码：**
```html
<view class="section">
  <view class="section__title">movable-view区域小于movable-area</view>
  <movable-area style="height: 200px; width: 200px; background: red;">
    <movable-view style="height: 50px; width: 50px; background: blue;" :x="x" :y="y" direction="all">
    </movable-view>
  </movable-area>
  <view class="btn-area">
    <button size="mini" @tap="tap">click me to move to (30px, 30px)</button>
  </view>
  <view class="section__title">movable-view区域大于movable-area</view>
  <movable-area style="height: 100px; width: 100px; background: red;">
    <movable-view style="height: 200px; width: 200px; background: blue;" direction="all">
    </movable-view>
  </movable-area>
  <view class="section__title">可放缩</view>
  <movable-area style="height: 200px; width: 200px; background: red;" scale-area>
    <movable-view style="height: 50px; width: 50px; background: blue;" direction="all" @change="onChange" @scale="onScale" scale scale-min="0.5" scale-max="4" scale-value="2">
    </movable-view>
  </movable-area>
</view>
```
```javascript
export default {
  data: {
    x: 0,
    y: 0
  },
  methods:{
    tap: function(e) {
      this.setData({
        x: 30,
        y: 30
      });
    },
    onChange: function(e) {
      console.log(e.detail)
    },
    onScale: function(e) {
      console.log(e.detail)
    }
  }
}
```