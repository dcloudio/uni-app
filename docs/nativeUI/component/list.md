# list

```<list>``` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。最简单的使用方法是在 ```<list>``` 标签内使用一组由简单数组 ```repeat``` 生成的 ```<cell>``` 标签填充。


#### 子组件

```<list> ``` 组件支持更多高级功能，由以下子组件提供：
* ```<cell>```： 用于定义列表中的子列表项，类似于 ```HTML``` 中的 ```ul``` 之于 ```li```。```nvue``` 会对 ```<cell>``` 进行高效的内存回收以达到更好的性能。
* ```<header>```：当 ```<header>``` 到达屏幕顶部时，吸附在屏幕顶部。
* ```<refresh>```：用于给列表添加下拉刷新的功能。
* ```<loading>```：```<loading>``` 用法与特性和 ```<refresh>``` 类似，用于给列表添加上拉加载更多的功能。

**注意：**：```<list>``` 的子组件只能包括以上四种组件或是 ```fix``` 定位的组件，其他形式的组件将不能被正确的渲染。

#### 属性


|属性名	|类型	|描述|
|----|----|----|
|show-scrollbar	|Boolean|默认值为 true。控制是否出现滚动条	|
|loadmoreoffset 	|Number|默认值为 0，触发 ```loadmore``` 事件所需要的垂直偏移距离（设备屏幕底部与 ```<list>``` 底部之间的距离）。当 ```<list>``` 的滚动条滚动到足够接近 ```<list>``` 底部时将会触发 ```loadmore``` 这个事件。	|
|offset-accuracy	|Number|控制```onscroll```事件触发的频率，默认值为10，表示两次```onscroll```事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能|

<div style="text-align:center;">
  <img src="https://uni.apache.org/cn/references/images/list_4.jpg" width="200"/>
</div>

#### 样式

```<list>``` 支持所有通用样式。

#### 事件

* ```loadmore```：如果列表滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。
* ```scroll```: 列表发生滚动时将会触发该事件，事件的默认抽样率为```10px```，即列表每滚动```10px```触发一次，可通过属性```offset-accuracy```设置抽样率。

  事件中 event 对象属性：

    * ```contentSize {Object}```：列表的内容尺寸
    * ```width {number}```: 列表内容宽度
    * ```height {number}```: 列表内容高度
    * ```contentOffset {Object}```: 列表的偏移尺寸

* 支持所有通用事件。

#### 扩展

##### scrollToElement(node, options)

滚动到列表某个指定项是常见需求，```<list>``` 拓展了该功能支持滚动到指定 ```<cell>```。

```html
<template>
  <div class="wrapper">
    <scroller class="scroller">
      <div class="row" v-for="(name, index) in rows" :ref="'item'+index">
        <text class="text" :ref="'text'+index">{{name}}</text>
      </div>
    </scroller>
    <div class="group">
      <text @click="goto10" class="button">Go to 10</text>
      <text @click="goto20" class="button">Go to 20</text>
    </div>
  </div>
</template>

<script>
  const dom = uni.requireModule('dom')

  export default {
    data () {
      return {
        rows: []
      }
    },
    created () {
      for (let i = 0; i < 30; i++) {
        this.rows.push('row ' + i)
      }
    },
    methods: {
      goto10 (count) {
        const el = this.$refs.item10[0]
        dom.scrollToElement(el, {})
      },
      goto20 (count) {
        const el = this.$refs.item20[0]
        dom.scrollToElement(el, { offset: 0 })
      }
    }
  }
</script>

<style scoped>
  .scroller {
    width: 700px;
    height: 700px;
    border-width: 3px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    margin-left: 25px;
  }
  .row {
    height: 100px;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
  }
  .text {
    font-size: 45px;
    color: #666666;
  }
  .group {
    flex-direction: row;
    /*justify-content: space-around;*/
    justify-content: center;
    margin-top: 60px;
  }
  .button {
    width: 200px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 40px;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    color: #41B883;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
</style>
```

##### resetLoadmore() 

在默认情况下，触发```loadmore```事件后，如果列表中内容没有发生变更，则下一次滚动到列表末尾时将不会再次触发```loadmore```事件，你可以通过调用```resetLoadmore()```方法来打破这一限制，调用该方法后，下一次滚动到列表末尾时将强制触发```loadmore```。

**参数**

* ```node {node}```：指定目标节点。
* ```options {Object}```：
  * ```offset {number}```：一个到其可见位置的偏移距离，默认是 0

#### 约束  

1. 不允许相同方向的 ```<list>``` 或者 ```<scroller>``` 互相嵌套，换句话说就是嵌套的 ```<list>```/```<scroller>``` 必须是不同的方向。

  举个例子，不允许一个垂直方向的 ```<list>``` 嵌套的一个垂直方向的 ```<scroller>``` 中，但是一个垂直方向的 ```<list>``` 是可以嵌套的一个水平方向的 ```list``` 或者 ```<scroller>``` 中的。

2. ```<list>``` 为根节点时无需设置高度，但是内嵌 ```<list>``` 高度必须可计算，你可以使用 ```flex``` 或 ```postion``` 将 ```<list>``` 设为一个响应式高度（例如全屏显示）, 也可以显式设置 ```<list>``` 组件的 ```height``` 样式。

#### 示例

```html
<template>
  <list class="list" @loadmore="fetch" loadmoreoffset="10">
    <cell class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
</template>

<script>
  const LOADMOREuniNT = 4

  export default {
    data () {
      return {
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      fetch (event) {
        uni.showToast({ title: 'loadmore' })

        setTimeout(() => {
          const length = this.lists.length
          for (let i = length; i < length + LOADMORE_COUNT; ++i) {
            this.lists.push(i + 1)
          }
        }, 800)
      }
    }
  }
</script>

<style scoped>
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
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
```