# a

```<a>``` 用于实现页面间的跳转。

**注意：** 除了本文档中注明的特性,```<a>``` 的表现同 ```<div>``` 一致。

**注意：**不能在 ```<a>``` 中直接添加匿名文本，请用```<text>``` 包裹文本。

#### 基本用法

用 ```<a>```将待跳转的元素包裹起来即可。

**示例代码:**
```html
<a href="http://www.dcloud.io">
  <text>Jump</text>
</a> 
```

#### 属性


|属性名	|类型	|值		|描述|
|----|----|----|----|
|href	|String	|{URL}	|待跳转的页面URL	|

#### 样式

```<a>``` 支持通用样式。

#### 事件

```<a>``` 支持通用通用事件。

**注意：** click 事件的回调函数和 href 跳转的执行顺序未被定义。不要使用 click 来进行 href 跳转前的逻辑处理。

#### 示例

```html
<template>
  <div class="wrapper">
    <a class="button" href="http://www.dcloud.io">
      <text class="text">Jump DCloud</text>
    </a>
  </div>
</template>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    width: 450px;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
  .text {
    font-size: 60px;
    color: #666666;
    text-align: center;
  }
</style>
```