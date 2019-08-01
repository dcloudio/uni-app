# web

```<web>``` 用于在 uni-app 页面中显示由 ```src``` 属性指定的页面内容。


#### 基本用法

> ```<web>``` 不支持任何嵌套的子组件，并且必须指定 ```width``` 和 ```height``` 的样式属性，否则将不起作用

**示例代码:**
```html
<web src="https://vuejs.org"></web>
```

#### 属性


|属性名	|类型		|值		|描述		|
|----		|----		|----	|----		|
|src		|String	|{URL}|要加载的网页内容的 URL。您可以指定一个基于 bundle URL 的相对 URL，它将被重写为真实资源 URL（本地或远程）		|

#### 样式

支持通用样式

#### 事件

* 只支持公共事件中的 ```appear``` 和 ```disappear``` 事件
* ```pagestart```： 在 Web 页面开始加载时调用
  
  事件对象：
    * ```url```: ```{String}``` 当前 Web 页面的 URL
* ```pagefinish```：在 Web 页面完成加载时调用

  事件对象：
    * ```url```: ```{String}``` 当前 Web 页面的 URL。
    * ```canGoBack```: ```{Boolean}``` 当前 Web 页面是否可以回退。
    * ```canGoForward```: ```{Boolean}``` 当前 Web 页面是否可以前进。
    * ```title```: ```{String}``` 当前 Web 页面的标题（仅限 iOS 平台）。
* ```error```：在 Web 页面加载失败时调用
* ```receivedtitle```：在 Web 页面的标题发生改变时调用（仅限 Android 平台）
  
  事件对象：
  	
    * ```url```: ```{String}``` 当前 Web 页面的 URL

#### 使用注意事项

* 必须指定 ```<web>``` 的 ```width``` 和 ```heigh```t 样式。
* ```<web>``` 不能包含任何嵌套的子组件。
* 您可以使用 ```webview``` ```module``` 来控制 ```<web>``` 组件，参见示例。

#### 示例

```html
<template>
  <div class="wrapper">
    <web ref="webview" style="width: 730px; height: 500px" src="https://vuejs.org"
      @pagestart="onPageStart" @pagefinish="onPageFinish" @error="onError" @receivedtitle="onReceivedTitle"></web>
    <div class="row" style="padding-top: 10px">
      <text class="button" :class="[canGoBack ? 'button-enabled' : 'button-disabled']" @click="goBack">←</text>
      <text class="button" :class="[canGoForward ? 'button-enabled' : 'button-disabled']" @click="goForward">→</text>
      <text class="button" @click="reload">reload</text>
    </div>
    <text test-id='pagestart'>pagestart: {{pagestart}}</text>
    <text test-id='pagefinish'>pagefinish: {{pagefinish}}</text>
    <text test-id='title'>title: {{title}}</text>
    <text test-id='error'>error: {{error}}</text>
  </div>
</template>

<style scoped>
  .wrapper {
		flex-direction: column;
		padding: 10px;
	}
	.row {
	  flex-direction: row;
	  justify-content: space-between
	}
	.button {
		color: #fff;
		background-color: #337ab7;
		border-color: #2e6da4;
		border-radius: 12px;
		padding-top: 20px;
		padding-left: 36px;
		padding-bottom: 20px;
		padding-right: 36px;
		font-size: 36px;
		text-align: center;
		font-weight: 500;
		margin-bottom: 10px;
  }
  .button-enabled {
    opacity: 1;
  }
  .button-disabled {
    opacity: 0.65;
  }
</style>

<script>
  module.exports = {
    data: {
      pagestart: '',
      pagefinish: '',
      title: '',
      error: '',
      canGoBack: false,
      canGoForward: false,
    },
    methods: {
      goBack: function() {
        var webview = uni.requireModule('webview');
        webview.goBack(this.$refs.webview);
      },
      goForward: function() {
        var webview = uni.requireModule('webview');
        webview.goForward(this.$refs.webview);
      },
      reload: function() {
        var webview = uni.requireModule('webview');
        webview.reload(this.$refs.webview);
      },
      onPageStart: function(e) {
        this.pagestart = e.url;
      },
      onPageFinish: function(e) {
        this.pagefinish = e.url;
        this.canGoBack = e.canGoBack;
        this.canGoForward = e.canGoForward;
        if (e.title) {
          this.title = e.title;
        }
      },
      onError: function(e) {
        this.error = url;
      },
      onReceivedTitle: function(e) {
        this.title = e.title;
      }
    }
  }
</script>
```