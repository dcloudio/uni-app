# textarea

```<textarea>``` 用于用户交互，接受用户输入数据。 可以认为是允许多行的 ```<input>```。

```<textarea>```支持 ```<input>``` 支持的所有的事件。


#### 子组件

不支持子组件。

#### 属性

```textarea``` 组件支持 ```text``` 组件的所有属性，除此之外还支持以下属性：

  * ```rows {number}```：接收 ```number``` 类型的数据，指定组件的高度，默认值是 2。

#### 样式

* 伪类: ```textarea``` 支持以下伪类：

  * ```active```
  * ```focus```
  * ```disabled```
  * ```enabled```
* text styles：
  * 支持 ```color```
  * 支持 ```font-size```
  * 支持 ```font-style```
  * 支持 ```font-weight```
  * 支持 ```text-align```
* 通用样式：支持所有通用样式。
#### 事件

|事件名称  |描述|事件中 event 对象属性|
|---|---|---|
|input|输入字符的值更改时触发|```value```: 触发事件的组件；```timestamp```: 事件发生时的时间戳,仅支持Android。|
|change|当用户输入完成时触发|```value```: 触发事件的组件；```timestamp```: 事件发生时的时间戳,仅支持Android。|
|focus|组件获得输入焦点|```timestamp```: 事件发生时的时间戳,仅支持Android。|
|blur|组件失去输入焦点|```timestamp```: 事件发生时的时间戳,仅支持Android。|
|return|键盘点击返回键|```returnKeyType```: 事件发生时的返回键类型；```value```: 触发事件的组件的文本。|
|longpress|用户长按时触发|```type``` : ```longpress```；```target``` : 触发事件的目标组件；```timestamp```: 长按事件触发时的时间戳。|
|appear|组件的状态变为在屏幕上可见时被触发|```type``` : ```appear```；```target``` : 触发事件的目标组件；```timestamp```: 长按事件触发时的时间戳；```direction ```：触发事件时屏幕的滚动方向，```up``` 或 ```down```。|
|disappear|组件的状态变为在屏幕上滑出时触发|```type``` : ```disappear```；```target``` : 触发事件的目标组件；```timestamp```: 长按事件触发时的时间戳；```direction ```：触发事件时屏幕的滚动方向，```up``` 或 ```down```。|

#### 示例

```html
<template>
  <div class="wrapper">
    <textarea class="textarea" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur"></textarea>
  </div>
</template>

<script>
  export defaultuni   methods: {
      oninput (event) {
        console.log('oninput:', event.value)
      },
      onchange (event) {
        console.log('onchange:', event.value)
      },
      onfocus (event) {
        console.log('onfocus:', event.value)
      },
      onblur (event) {
        console.log('onblur:', event.value)
      }
    }
  }
</script>

<style>
  .textarea {
    font-size: 50px;
    width: 650px;
    margin-top: 50px;
    margin-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
</style>
```