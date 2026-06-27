# 组件标志

开发者会遇到很多与组件标志有关的概念：id、ref、Element、NodeRef、context、ComponentPublicInstance...

上述概念，其实都是为了给组件一个标记，通过标记拿到组件的上下文对象，然后操作这个对象的方法。

但因为平台不同，制造了不同的概念。id在web和小程序中存在，NodeRef是小程序的概念、ref和ComponentPublicInstance是vue的概念。uni-app中这些皆而有之。

我们以video为例，解释这些概念的相同和差别之处。

## web开发中
### 内置html标签
html内置标签有id属性，通过document.getElmenetById("")可以返回一个Element。可以进一步调用Element的方法
```html
<video id="vid" src="uni.mp4"></video>
<script>
    document.getElementById("vid").play() //js写法
	(document.getElementById("vid") as HTMLVideoElement).play(); //ts写法。只有HTMLVideoElement才有play方法
</script>
```

### vue自定义组件@vuecomponent
vue框架中组件有ref属性，选项式中通过this.refs可以返回一个组件实例ComponentPublicInstance，组合式则是定义一个同名的ref()变量。得到组件实例可以进一步调用组件的属性和方法。

对于html内置元素，在web中一般不通过ref获取。ref更多是服务于自定义的vue组件。

但在uni-app x中，ref获取内置组件时，App和Web平台得到的是UniElement。获取非内置组件才是vue组件实例。

假使有一个vue组件，其有一个方法getSome()，那么用法是：\
template区：
```html
<component1 ref="c1"></component1>
```
script区：
```js
this.$refs.c1.getSome() //js写法
this.$refs["c1"].getSome() //与上一行等价
(this.$refs["c1"] as ComponentPublicInstance).getSome() //ts或uts写法，必须明确类型才能调用其方法和属性
```

## 小程序中
### 小程序内置组件
小程序的内置组件有id属性，有多种方式获取组件上下文对象：
1. 通过uni.createXXXContext来获取，比如uni.createVideoContext()
template区：
```html
<video id="vid" src="uni.mp4"></video>
```

scrip区：
```js
uni.createVideoContext('vid').play()
```

2. 通过uni.createSelectorQuery()，传入选择器，拿到返回的NodesRef，然后再.context，异步获取到组件的上下文对象
```js
  uni.createSelectorQuery().select('.the-video-class').context(function(res){
    console.log(res.context) // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
  }).exec()
```

一般推荐使用第1种方法，也就是createXXContext方式。这种方式简洁并且可以跨平台。

### vue自定义组件
uni-app编译到小程序时，vue组件的用法与web相同，具体[见上](#vuecomponent)。

## uni-app x中

uni-app x中，web、小程序、vue这3类概念都支持，所以id、ref、Element、NodeRef、context、ComponentPublicInstance这些概念都存在。

分为如下几类：

### 内置组件
内置组件都支持Element。

为了与小程序api拉齐，也有部分组件同时支持context，如video。

不涉及小程序api拉齐的一些组件未提供context，比如`<unicloud-db>`组件只有Element。

#### Element方式

uni-app x提供了[uni.getElementById](../api/get-element.md)等多种方法获取[Element](../dom/unielement.md)类型。

通用的元素操作方法，比如getAttribute、setStyle，在Element上就可以操作。

获取Element有很多方法，
1. [uni.getElementById](../api/get-element.md)获取栈顶页面的元素（注意无法获取dialogPage页面的元素）
2. [UniPage的getElementById](../api/get-current-pages.md#getelementbyid)获取指定页面的元素。通过`this.$page.getElementById`可以获取当前页面的元素。
3. 还可以通过this.refs获取到vue实例然后as为Element。[见下](#ref方式)

UniVideoElement 继承自 UniElement，拥有video专用的一批方法。

template区：
```html
<video id="vid" src="uni.mp4"></video>
```
script区：
```uts
(uni.getElementById("vid") as UniVideoElement).play() //注意没有document对象，getElementById方法在uni下。务必确保vid存在，否则as会崩溃
uni.getElementById<UniVideoElement>("vid")!.play() //泛型写法
```

#### context方式
script区：
```uts
uni.createVideoContext("vid")!.play()
```

#### NodeRef方式
uni-app x 虽然支持 `uni.createSelectorQuery()` API，传入选择器，可以拿到返回的NodesRef。但无法继续获取.context子对象。无法通过这种方式拿到context。

#### ref方式

其实`this.$refs`获取到的内置组件，通过as也可以转换为Element。

与`uni.getElementById`相比，`this.$refs`方式与调用页面绑定。

script区：
```js
(this.$refs['vid'] as UniVideoElement).play(); //但一般ref用于vue自定义组件
```


### vue自定义组件

uni-app x中vue组件的用法与web相同，具体[见上](#vuecomponent)。
