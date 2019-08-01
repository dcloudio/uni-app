# cell

```<cell>``` 用于定义列表中的子列表项，类似于 HTML 中的 ul 之于 li。``uni-app`` 会对 ```<cell>``` 进行高效的内存回收以达到更好的性能，该组件必须作为```<list>``` ```<recycler>``` ```<waterfall>```组件的子组件, 这是为了优化滚动时的性能。


#### 子组件

支持所有 ``uni-app`` 的所有原生组件作为它的子组件。


#### 属性


|属性名	|类型		|描述|
|----|----|----|
|keep-scroll-position	|Boolean	|List 插入数据后是否保持上次滚动的位置	|

#### 样式

```<cell>``` 支持通用样式。

**注意：**由于 ```<cell>``` 本身是一个容器，其布局由 ```<list>``` 进行管理，你不能给 ```<cell>``` 设定flex值。 ```<cell>```的宽度等于父组件 ```<list>``` 的宽度，并且 ```<cell>``` 高度自适应，指定 ```margin``` 样式也不起作用。

#### 事件

```<cell>``` 支持通用通用事件。

**注意：** click 事件的回调函数和 href 跳转的执行顺序未被定义。不要使用 click 来进行 href 跳转前的逻辑处理。

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
  const modal = uni.requireModule('modal')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      fetch (event) {
        modal.toast({ message: 'loadmore', duration: 1 })

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