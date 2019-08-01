# video

```<video>``` 组件可以让我们在 uni-app 页面中嵌入视频内容。


#### 子组件

```<text>``` 是唯一合法的子组件。


#### 属性


|属性名	|类型		|描述|
|----|----|----|
|src 	|String	|内嵌的视频指向的URL	|
|play-status 	|String	|可选值为 ```play```/```pause```，用来控制视频的播放状态，```play``` 或者 ```pause```，默认值是 ```pause```	|
|auto-play 	|Boolean	|可选值为 ```true```/```false```，当页面加载初始化完成后，用来控制视频是否立即播放默认值是 ```false```	|

#### 样式

```<video>``` 支持通用样式。

#### 事件

* ```start```：当 playback 的状态是 Playing 时触发
* ```pause```：当 playback 的状态是 Paused 时触发
* ```finish```：当 playback 的状态是 Finished 时触发
* ```fail```：当 playback 状态是 Failed 时触发


#### 示例

```html
<template>
  <div>
    <video class="video" :src="src" autoplay controls
      @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>
    <text class="info">state: {{state}}</text>
  </div>
</template>

<style scoped>
  .video {
    width: 630px;
    height: 350px;
    margin-top: 60px;
    margin-left: 60px;
  }
  .info {
    margin-top: 40px;
    font-size: 40px;
    text-align: center;
  }
</style>

<script>
  export default {
    data () {
      return {
        state: '----',
        src:'http://img.cdn.qiniu.dcloud.net.cn/wap2appvsnative.mp4'
      }
    },
    methods:{
      onstart (event) {
        this.state = 'onstart'
      },
      onpause (event) {
        this.state = 'onpause'
      },
      onfinish (event) {
        this.state = 'onfinish'
      },
      onfail (event) {
        this.state = 'onfinish'
      }
    }
  }
</script>
```