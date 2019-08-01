# input

```<input>``` 组件用来创建接收用户输入字符的输入组件。 ```<input>``` 组件的工作方式因 ```type``` 属性的值而异，比如 ```text```， ```password```，```url```，```email```，```tel``` 等。

**注意**：此组件不支持 ```click``` 事件。请监听 ```input``` 或 ```change``` 来代替 ```click``` 事件。

#### 子组件

不支持子组件

#### 属性


|属性名	|类型	|描述|
|----|----|----|
|type	|String	|控件的类型，默认值是 ```text```。```type``` 值可以是 ```text```，```date```，```datetime```，```email```， ```password```，```tel```，```time```，```url```，```number``` 。每个 ```type``` 值都符合 ```W3C``` 标准。	|
|value |String|组件的默认内容|
|placeholder  |String|提示用户可以输入什么。 提示文本不能有回车或换行|
|valuedisabled |Boolean|表示是否支持输入。通常 click 事件在 disabled 控件上是失效的。|
|autofocus  |Boolean|表示是否在页面加载时控件自动获得输入焦点|
|maxlength  |Number|表示输入的最大长度|
|max-length  |Number|表示输入的最大长度|
|lines  |Number|表示输入的最大行数|
|return-key-type  |String|键盘返回键的类型,支持 ```defalut```; ```go```; ```next```; ```search```; ```send```; ```done```。|
|singleline |Boolean|控制内容是否只允许单行|
|max |String|控制当type属性为date时选择日期的最大时间，格式为yyyy-MM-dd|
|min |String|控制当type属性为date时选择日期的最小时间，格式为yyyy-MM-dd|


#### 样式

* ```placeholder-color {color}：placeholder``` 字符颜色。默认值是 ```#999999```
* 伪类：input 支持以下伪类：
  * ```active```
  * ```focus```
  * ```disabled```
  * ```enabled```
*  ```text``` styles:
  * 支持 ```color```
  * 支持 ```font-size```
  * 支持 ```font-style```
  * 支持 ```font-weight```
  * 支持 ```text-align```
* 通用样式：支持所有通用样式
  * 盒模型
  * ```flexbox``` 布局
  * ```position```
  * ```opacity```
  * ```background-color```

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

#### 方法

* ```focus()```：方法用于将 ```input``` 组件聚焦。

* ```blur()```：方法用于从 ```input``` 组件中移除焦点并关闭软键盘（如果它具有焦点）。

* ```setSelectionRange(selectionStart,selectionEnd)```：设置文本选区
  * ```selectionStart {number}```：设置文本选区的起始点
  * ```selectionEnd {number}```：设置文本选区的起终点
* ```getSelectionRange(callback[selectionStart,selectionEnd])```：设置文本选区
  * ```selectionStart {number}```：获取文本选区的起始点
  * ```selectionEnd {number}```：获取文本选区的起终点
* ```setTextFormatter(params)```：这是一个非常有用的特性，可以对```input```设置一组对输入的内容进行实时格式化的规则。
  * ```params {object}```：格式化规则，包含以下参数：
    * ```formatRule {regexp}```：格式化匹配的正则表达式
    * ```formatReplace {string}```：格式化匹配后用于替换的内容
    * ```recoverRule {regexp}```：从格式化后的内容还原原始内容的正则表达式
    * ```recoverReplace {string}```：还原原始内容时用于替换的内容

#### 约束

目前不支持 ```this.$el(id).value = ''``` 这种方式改写 ```input``` ```value```。只支持在 ```<input>``` 组件的 ```input```、```change`` 事件中改写。

#### 示例

```html
<template>
  <div>
    <div>
      <text style="font-size: 40px">oninput: {{txtInput}}</text>
      <text style="font-size: 40px">onchange: {{txtChange}}</text>
      <text style="font-size: 40px">onreturntype: {{txtReturnType}}</text>
      <text style="font-size: 40px">selection: {{txtSelection}}</text>

    </div>
    <scroller>
      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = text</text>
        </div>
        <input type="text" placeholder="Input Text" class="input" :autofocus=true value="" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = password</text>
        </div>
        <input type="password" placeholder="Input Password" class="input" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = url</text>
        </div>
        <input type="url" placeholder="Input URL" class="input" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = email</text>
        </div>
        <input type="email" placeholder="Input Email" class="input" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = tel</text>
        </div>
        <input type="tel" placeholder="Input Tel" class="input" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = time</text>
        </div>
        <input type="time" placeholder="Input Time" class="input" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = number</text>
        </div>
        <input type="number" placeholder="Input number" class="input" @change="onchange" @input="oninput"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input type = date</text>
        </div>
        <input type="date" placeholder="Input Date" class="input" @change="onchange" @input="oninput" max="2017-12-12" min="2015-01-01"/>
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input return-key-type = default</text>
        </div>
        <input type="text" placeholder="please input" return-key-type="default" class="input" @change="onchange" @return = "onreturn" @input="oninput" />
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input return-key-type = go</text>
        </div>
        <input type="text" placeholder="please input" return-key-type="go" class="input" @change="onchange" @return = "onreturn" @input="oninput" />
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input return-key-type = next</text>
        </div>
        <input type="text" placeholder="please input" return-key-type="next" class="input" @change="onchange" @return = "onreturn" @input="oninput" />
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input return-key-type = search</text>
        </div>
        <input type="text" placeholder="please input" return-key-type="search" class="input" @change="onchange" @return = "onreturn" @input="oninput" />
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input return-key-type = send</text>
        </div>
        <input type="text" placeholder="please input" return-key-type="send" class="input" @change="onchange" @return = "onreturn" @input="oninput" />
      </div>

      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input return-key-type = done</text>
        </div>
        <input type="text" placeholder="please input" return-key-type="done" class="input" @change="onchange" @return = "onreturn" @input="oninput" />
      </div>


      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">function focus() & blur()</text>
        </div>
        <div style="flex-direction: row;margin-bottom: 16px;justify-content: space-between">
          <text class="button" value="Focus" type="primary" @click="focus"></text>
          <text class="button" value="Blur" type="primary" @click="blur"></text>
        </div>

        <input type="text" placeholder="Input1" class="input" value="" ref="input1"/>
      </div>


      <div>
        <div style="background-color: #286090">
          <text class="title" style="height: 80 ;padding: 20;color: #FFFFFF">input selection</text>
        </div>
        <div style="flex-direction: row;margin-bottom: 16px;justify-content: space-between">
          <text class="button" value="setRange" type="primary" @click="setRange"></text>
          <text class="button" value="getSelectionRange" type="primary" @click="getSelectionRange"></text>
        </div>
        <input type="text"  ref="inputselection" placeholder="please input" value="123456789"  class="input" @change="onchange" @return = "onreturn" @input="oninput"/>
      </div>



    </scroller>
  </div>
</template>

<style scoped>
  .input {
    font-size: 60px;
    height: 80px;
    width: 750px;
  }
  .button {
    font-size: 36;
    width: 200;
    color: #41B883;
    text-align: center;
    padding-top: 10;
    padding-bottom: 10;
    border-width: 2;
    border-style: solid;
    margin-right: 20;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
</style>

<script>
  module.exports = {
    data: function () {
      return {
        txtInput: '',
        txtChange: '',
        txtReturnType: '',
        txtSelection:'',
        autofocus: false
      };
    },
    methods: {
      ready: function () {
        var self = this;
        setTimeout(function () {
          self.autofocus = true;
        }, 1000);
      },
      onchange: function (event) {
        this.txtChange = event.value;
        console.log('onchange', event.value);
      },
      onreturn: function (event) {
        this.txtReturnType = event.returnKeyType;
        console.log('onreturn', event.type);
      },
      oninput: function (event) {
        this.txtInput = event.value;
        console.log('oninput', event.value);
      },
      focus: function () {
        this.$refs['input1'].focus();
      },
      blur: function () {
        this.$refs['input1'].blur();
      },
      setRange: function() {
        console.log(this.$refs["inputselection"]);
        this.$refs["inputselection"].setSelectionRange(2, 6);
      },
      getSelectionRange: function() {
        console.log(this.$refs["inputselection"]);
        var self = this;
        this.$refs["inputselection"].getSelectionRange(function(e) {
          self.txtSelection = e.selectionStart +'-' + e.selectionEnd;
        });
      }
    }
  };
</script>
```