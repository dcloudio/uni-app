# refresh

```<refresh>``` 为容器提供下拉刷新功能，用法和属性与 ```<loading>``` 类似。

**注意：** ```<refresh>``` 是 ```<list>``` 、```<waterfall>``` 的子组件，只能在被它们包含时才能被正确渲染。


* 简单示例：

```html
<list>
  <refresh>
    ...
  </refresh>
  ...
</list>
</list>
```

#### 子组件

* 诸如 ```<text>```、```<image>``` 之类的任何组件，都可以放到 ```<loading>``` 进行渲染。

* 特殊子组件 ```<loading-indicator>```: 只能作为 ```<refresh>``` 和 ```<loading>``` 的子组件使用，拥有默认的动画效果实现。

* 简单示例：
```html
<refresh>
  <text>Refreshing</text>
  <loading-indicator></loading-indicator>
  ...
</refresh>
```

#### 属性


|属性名	|类型		|值					|默认值	|
|---|---|---|---|
|display|String	|show / hide|show		|

**display**:

  * ```show```：如果 ```<loading>``` 中包含``` <loading-indicator>```，则将其显示并开始默认动画。

  * ```hide```：收起 ```loading``` ```view```，如果 ```<loading>``` 中包含 ```<loading-indicator>```，则将其视图隐藏。

> 注意： display 的设置必须成对出现，即设置 display="show",必须有对应的 display="hide"。

#### 样式

```<loading>``` 支持通用样式。

#### 事件

* **refresh**:当 ```<list>```、```<waterfall>``` 被下拉时触发。
* **pullingdown**:当 ```<list>```、```<waterfall>``` 被下拉时触发，可以从 ```event``` 参数对象中获取 ```dy```, ```pullingDistance```, ```viewHeight```, ```type```:
  * ```dy```: 前后两次回调滑动距离的差值
  * ```pullingDistance```: 下拉的距离
  * ```viewHeight: refresh``` 组件高度
  * ```type: “pullingdown”``` 常数字符串

#### 例子

```html
<template>
  <list class="scroller">
    <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator-text">Refreshing ...</text>
      <loading-indicator class="indicator"></loading-indicator>
    </refresh>
    <cell v-for="num in lists">
      <div class="cell" >
        <div class="panel">
          <text class="text">{{num}}</text>
        </div>
      </div>
    </cell>
  </list>
</template>

<script>
  export default {
    data () {
      return {
        refreshing: false,
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onrefresh (event) {
        console.log("refresh");
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      onpullingdown (event) {
        console.log("dy: " + event.dy)
        console.log("pullingDistance: " + event.pullingDistance)
        console.log("viewHeight: " + event.viewHeight)
        console.log("type: " + type)
      }
    }
  }
</script>

<style scoped>
  .refresh {
    width: 750;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }
  .panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
```