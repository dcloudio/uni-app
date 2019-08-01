# text

```<text>``` 是 uni-app 内置的组件，用来将文本按照指定的样式渲染出来。```<text>``` 只能包含文本值，你可以使用 ```{{}}``` 标记插入变量值作为文本内容。

**注意：** ```<text>``` 里直接写文本头尾空白会被过滤，如果需要保留头尾空白，暂时只能通过数据绑定写头尾空格。

**注意：**```<text>```不支持子组件。

#### 属性


|属性名	|类型	|描述|
|----|----|----|
|value	|String	|组件的值，与 ```<text>``` 标签中的文本内容相同	|

#### 样式

* ```<text>``` 支持通用样式。
* ```lines {number}```: 指定文本行数。默认值是```0```， 代表不限制行数
* 支持 ```文本样式```:
  * 支持 color 样式.
  * 支持 ```font-size ```样式，默认值为32.
  * 支持 ```font-style``` 样式.
  * 支持 ```font-weight``` 样式.
  * 支持 ```text-align ```样式.
  * 支持 ```text-decoration``` 样式.
  * 支持 ```text-overflow``` 样式.
  * 支持 ```line-height```样式.

#### 事件

```<text>``` 支持通用通用事件。

#### 自定义字体

支持ttf和woff字体格式的自定义字体, 可以通过调用 ```dom module``` 里面的 ```addRule```方法, 构建自定义的```font-family```使用, ```addRule``` 建议在 ```beforeCreate``` 或者更早时调用

#### 示例

普通示例

```html
<template>
  <div class="wrapper">
    <div class="panel">
      <text class="text" lines="3">uni 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。Vue 是一个轻量并且功能强大的渐进式前端框架。</text>
    </div>
    <div class="panel">
      <text class="text" lines="3">uni is an cross-platform development solution that builds high-performance, scalable native applications with a Web development experience. Vue is a lightweight and powerful progressive front-end framework. </text>
    </div>
  </div>
</template>


<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .panel {
    width: 600px;
    margin-left: 75px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }
  .text {
    lines: 3;
    color: #666666;
    font-size: 32px;
  }
</style>
```

自定义字体：

```html
<template>
    <div style='flex-direction:row;margin-top:50px'>
        <text style='font-family:iconfont4;font-size:50;color:green'>&#xe614;&#xe612;&#xe613;</text>
        <text style='font-family:iconfont4;font-size:50;'>&#xe614;&#xe612;&#xe613;&#xe61d;&#xe714;</text>
        <text style='font-family:iconfont4;font-size:60;color:blue'>&#xe711;</text>
        <text style='font-family:iconfont4;font-size:60;color:green'>&#xe71c;&#xe60b;</text>
    </div>
</template>
<script>
    module.exports = {
      beforeCreate: function() {
        var domModule = uni.requireModule('dom');
        .addRule('fontFace', {
            'fontFamily': "iconfont2",
            'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
        });
      }
    }
</script>
```
