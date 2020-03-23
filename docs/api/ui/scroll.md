### uni.pageScrollTo(OBJECT)

将页面滚动到目标位置。

**OBJECT参数说明**

|参数名		|类型			|必填	|说明																					|
|:-				|:-				|:-		|:-																						|
|scrollTop|String		|否		|滚动到页面的目标位置（单位px）										|
|selector	|Number		|否		|选择器，仅微信小程序2.7.3+ 支持									|
|duration	|Number		|否		|滚动动画的时长，默认300ms，单位 ms								|
|success	|function	|否		|接口调用成功的回调函数														|
|fail			|function	|否		|接口调用失败的回调函数														|
|complete	|function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）	    |

**selector 语法**
selector类似于 CSS 的选择器，但仅支持下列语法。

- ID选择器：#the-id
- class选择器（可以连续指定多个）：`.a-class.another-class`
- 子元素选择器：`.the-parent > .the-child`
- 后代选择器：`.the-ancestor .the-descendant`
- 跨自定义组件的后代选择器：`.the-ancestor >>> .the-descendant`
- 多选择器的并集：`#a-node, .some-other-nodes`

**示例**

```javascript
uni.pageScrollTo({
	scrollTop: 0,
	duration: 300
});
```

