# slider

```<slider>``` 组件用于在一个页面中展示多个图片，在前端，这种效果被称为 轮播图。


#### 子组件

支持任意类型的 uni 组件作为其子组件。 其中，还支持以下组件作为子组件展示特殊效果：
  * ```<indicator>```：用于显示轮播图指示器效果，必须充当 ```<slider>``` 组件的子组件使用。

#### 属性


|属性名		|类型		|描述						|
|----|----			|----		|----						|
|auto-play|Boolean|否自动播放轮播,默认为false|
|interval |Number	|值为毫秒数，此值设定 slider 切换时间间隔。当 auto-play 值为 true 时生效|
|infinite |Boolean	|是否循环播放，默认的是 true|
|offset-x-accuracy |Number	|控制```onscrol```l事件触发的频率，默认值为10，表示两次```onscroll```事件之间```Slider``` ```Page```至少滚动了```10px```。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能|
|show-indicators |Boolean	|设置是否显示indicator|
|index  |Number	|设置显示slider的第几个页面|
|scrollable   |Boolean	|设置是否可以通过滑动手势来切换slider页面|
|keep-index   |Number	|设置slider中的数据发生变化后是否保持变化前的页面index|

#### 样式

```<slider>``` 支持通用样式。

#### 事件

* ```change```：当轮播索引改变时，触发该事件。
  事件中 ```event``` 对象属性：
  * index：展示的图片索引
  * scroll 0.11+: 列表发生滚动时将会触发该事件，事件的默认抽样率为```10px```，即列表每滚动```10px```触发一次，可通过属性```offset-accuracy```设置抽样率。
  * ```offsetXRatio {number}```：表示当前页面的偏移比例，取值范围为```[-1, 1]```，负值表示向左侧滚动，正值向右。例如，-0.2表示当前```item```有20%的区域被滚动到```slider```左侧边界以外，0.3表示当前item有30%的区域被滚动到```slider```右侧边界以外。
* 支持通用通用事件。


#### 示例

```html
<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
  </div>
</template>

<style scoped>
  .image {
    width: 700px;
    height: 700px;
  }
  .slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
</style>

<script>
  export default {
    data () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    }
  }
</script>
```