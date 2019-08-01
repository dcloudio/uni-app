#### cover-view

**注意：仅微信基础课1.4.0+生效**

覆盖在原生组件之上的文本视图，可覆盖的原生组件包括map、video、canvas、camera，只支持嵌套cover-view、cover-image。

#### cover-image
**注意：仅微信基础课1.4.0+生效**

覆盖在原生组件之上的图片视图，可覆盖的原生组件同cover-view，支持嵌套在cover-view里。使用竖向滚动时，需要给 ``<scroll-view>`` 一个固定高度，通过 WXSS 设置 height。
 
|属性名|类型		|默认值|说明																																	|
|---|---|---|---|
|src|String	|			|图标路径，支持临时路径、网络地址（1.6.0起支持）。暂不支持base64格式。|

 
 Bug & Tip
1. tip: 事件模型遵循冒泡模型，但不会冒泡到原生组件。
2. tip: 文本建议都套上cover-view标签，避免排版错误。
3. tip: 只支持基本的定位、布局、文本样式。不支持设置单边的border、background-image、shadow、overflow: visible等。
4. tip: 建议子节点不要溢出父节点
5. tip: 默认设置的样式有：white-space: nowrap; line-height: 1.2; display: block;

**代码示例：**
```html
<video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" :controls="false" event-model="bubble">
  <cover-view class="controls">
    <cover-view class="play" @tap="play">
      <cover-image class="img" src="/path/to/icon_play" />
    </cover-view>
    <cover-view class="pause" @tap="pause">
      <cover-image class="img" src="/path/to/icon_pause" />
    </cover-view>
    <cover-view class="time">00:00</cover-view>
  </cover-view>
</video>
```
```css
.controls {
  position: relative;
  top: 50%;
  height: 50px;
  margin-top: -25px;
  display: flex;
}
.play,.pause,.time {
  flex: 1;
  height: 100%;
}
.time {
  text-align: center;
  background-color: rgba(0, 0, 0, .5);
  color: white;
  line-height: 50px;
}
.img {
  width: 40px;
  height: 40px;
  margin: 5px auto;
}
```
```javascript
export default {
  onReady() {
    this.videoCtx = uni.createVideoContext('myVideo')
  },
  methods:{
    play() {
      this.videoCtx.play()
    },
    pause() {
      this.videoCtx.pause()
    }
  }
}
```