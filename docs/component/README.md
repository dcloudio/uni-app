# 组件概述

## 组件定义

- 组件是视图层的基本组成单元。
- 组件是一个单独且可复用的UI及配套功能模块的封装。

我们知道js逻辑可以封装为函数或类库。而对于页面上可视的元素，则可以将ui、样式、逻辑一起封装为组件。

组件涉及较多的概念，包括组件名称、开头和闭合标签、组件属性、组件属性值、组件事件、组件vue指令、组件text内容、子组件。

我们先看一个简单的例子：
```vue
<component-name property1="value" property2="value">
	content
</component-name>
```

上面的代码，是一个组件，组件名为component-name，这个组件有2个属性，property1和property2，这2个属性的属性值都是"value"，组件的text内容为"content"

然后我们看一个全面但有些复杂的示例，这段示例融合了组件的各种概念：

```vue
<template>
  <view></view>
	<view>
		<text v-if="titleShow" :style="'color:' + titleColor">{{title}}</text> <!-- text组件的text绑定了响应式变量title、v-if指令绑定了titleShow、style绑定了titleColor-->
	</view>
	<image src="http://www.noexit.jpg" @error="imgerror"/>
	<scroll-view >
		<button type="primary" @click="buttonClick_changeText">修改文字内容</button>
		<button @click="buttonClick_showHide">点击让文字组件显示或消失</button>
		<button @click="buttonClick_changeColor">修改文字颜色</button>
	</scroll-view>
</template>
<script setup>
  let title = ref("Hello world") //定义一个响应式变量title，默认赋值为hello world
	const buttonClick_changeText = () => {
		title.value = "新文字内容" //对响应式变量title的.value属性赋值，界面上文字会自动同步修改
	}

	let titleShow = ref(true) //决定标题文字是否显示
	const buttonClick_showHide = () => {
		titleShow.value = !titleShow.value //对响应式变量的.value属性赋值，界面上文字组件的v-if指令绑定了titleShow，所以会动态显示消失
	}

	let titleColor = ref("black") //定义一个响应式变量titleColor，默认为黑色
	const buttonClick_changeColor = () => {
		titleColor.value = "red" //对响应式变量的.value属性赋值，界面上文字组件的style属性绑定了titleColor，所以会变为红色
	}

	const imgerror = (event : ImageErrorEvent) => { // image组件加载失败时触发
		console.log(event.type, event.detail); //错误的详情
	}
</script>
```

所有组件，都写在template标签下面。

- 组件的名称和开始/结束标签
每个组件，都有开始和结束标签。\
标签由尖括号包裹，它有开始标签和结束标签。结束标签的`<`后面用`/`来表示结束。结束标签也称为闭合标签。
比如上面例子中template节点下第一个子节点 <view></view> ，view 表示这个组件的名称，<view>为开始标签，</view>为闭合标签。这是一个空的view视图组件。

如果标签没有text内容或子组件，可以写成 自闭合标签，即只写 开始标签，并且 开始标签 以 `/>` 结尾。\
比如上面例子中的 `<image src="http://www.noexit.jpg" @error="imgerror"/>`

- 组件内容text
指组件的内容区，即组件的开始标签和闭合标签之间的文字内容。\
比如上面例子中button组件中的“修改文字内容”。\
uni-app x中只有button、text组件等少数组件支持内容区，具体需查阅每个组件文档。

- 子组件
组件的内容区可以不是文字，而是下级组件。\
比如上面例子中view组件的子组件是text组件，而scroll-view组件下面有3个button子组件。\
并非所有组件都支持子组件，一般视图组件肯定是支持子组件的，其他组件需要查阅组件的文档说明。

- 组件属性
组件开始标签的组件名称后面，以空格分割的、以等号赋值的，不以v-或@开头的普通属性。\
比如上面例子中button组件的[type属性](../component/button.md)，它定义了组件的一些控制参数，这是由组件作者给使用者提供的自定义参数。\

- 组件属性值
在属性名后面用=号赋值的内容。\
比如上面例子中button组件的type属性，其属性值为primary，`type="primary"`，即表示一个主按钮。\

- 事件
组件在发生某些事件后触发的函数。\
比如上面例子中button组件的click事件。`@click="buttonClick_changeText"`。\
buttonClick_changeText 是script里定义的一个函数。\
事件区别于普通属性名的特征是以@开头，事件值指向一个函数（选项式指向一个method）。\
很多事件还有event参数。\
比如上面例子中image组件的error事件，绑定到imgerror函数，它有一个参数event对象，类型是ImageErrorEvent。接下来的代码打印了event对象的2个属性。

- vue指令
vue提供的一批特殊写法的属性，它们以v-开头，比如上面例子中text组件的v-if指令，绑定了一个titleShow的响应式变量，根据变量的true或false可以决定text组件是否显示。详见[vue指令](../vue/built-in.md)\
有一种特殊指令`v-bind`，一种把属性值变成script以便绑定响应式变量的写法，它的完整写法是 v-bind:普通属性名 = "属性值"，
但它更常见的写法是简写为在普通属性前面加个冒号，比如上面例子中text组件的:style，`:style="'color:' + titleColor"`。\
这个写法的意思是，text组件的style样式中，color属性的值绑定到了script定义的响应式变量titleColor上，修改这个响应式变量的值，text组件的文字颜色就会跟着变化。\
绑定后属性值的内容变成了script，而不再是普通字符串。所以在属性值里写字符串需要再加单引号。


组件们，有公共的属性和事件，[详见](../component/common.md)，也有组件特有的属性和事件，详见每个组件的文档。

每个组件可以有多个属性、指令、事件，用空格分割。它们赋值的=号，前后可以允许0个或1个空格。

所有组件与属性名都是**小写**，单词之间以连字符`-`连接。

## 组件的分类

uni-app x文档规范中有一批标准组件，同时也支持扩展自定义组件。

### 1. 标准组件
- 1.1 内置组件
内置在uni-app x引擎中，开发者无需在代码中引用和注册的，可以直接使用。比如view、text、button...
- 1.2 ext组件
在app平台，对于不太常用、体积又大的官方基础组件，虽然其文档在uni-app x的官方文档中，但并没有内置到uni-app x引擎中。需要开发者下载ext组件到项目下才能使用。\
出现这种情况一般是由于小程序规范里内置了该组件，而App端又不常用。（为了多端兼容，uni的组件规范是参考小程序组件规范制定的）\
比如[animation-view组件](./animation-view.md)。\
除了ext组件，还有ext api，它们情况类似，详细介绍：[ext插件](https://uniapp.dcloud.net.cn/api/extapi.html)

### 2. 自定义组件

标准组件只是一些基础组件。开发者还可以自行扩展组件，封装UI和逻辑，称为自定义组件。

这类组件需要手动下载到项目中，或者自行在项目下编写。

自定义组件，按开发方式分类，又有2种：前端uvue组件 和 原生uts组件

- 2.1 前端uvue组件
即开发者自己按照vue组件规范编写的uvue文件。这种组件一般由前端工程师编写。详见[uvue组件模型介绍](../vue/component.md)
- 2.2 原生uts组件
这是一种App平台专用的扩展机制。
由Android或iOS的原生开发者，按照uts插件的组件规范编写，把原生的view嵌入到uvue页面上，它在编写时贴近但不完全是vue组件开发规范。\
不过对于组件的使用者来讲，用法就是标准的uvue组件了。详见[uts组件开发指南](../plugin/uts-component.md)\
uts原生组件，下载组件到项目后（或自己按规范编写），在页面template里直接引用即可。无需导入注册组件。

对于前端uvue组件，又有2种引用方式。
1. 传统vue组件：
需要先import、注册，然后再在页面template中使用。[详见](../vue/component.md#manual-import-component)
2. easycom组件
easycom组件是uni-app提供的一种易用方式，它通过一个路径规范让编译器知道组件的位置，实现自动的import和注册。详见[easycom组件规范](../vue/component.md#easycom)

在uni插件市场（[https://ext.dcloud.net.cn/](https://ext.dcloud.net.cn/)），下载的组件基本都是easycom组件规范或uts原生组件规范，都是在页面里可以直接引用的。

插件市场的功能较多，可以看介绍了解：[详见](https://uniapp.dcloud.net.cn/plugin/plugin-ext-introduction.html)

## 其他组件概念
- datacom
`datacom`是一种数据驱动的组件，只需要给出符合格式的数据就可以使用。它是uvue组件的子类，尤其适合云端一体组件。详见：[datacom介绍](https://uniapp.dcloud.net.cn/component/datacom.html)

- uni_modules
`uni_modules`是uni-app生态的包管理方案。非内置组件，可以放在项目下任意位置，也可以封装在`uni_modules`下。一般对外提供的成熟组件都应该封装在`uni_modules`下。\
如果还不了解`uni_modules`，那务必需要阅读：[uni_modules介绍](https://uniapp.dcloud.net.cn/plugin/uni_modules.html)


## 组件的编写
- 前端uvue组件的开发指南：[详见](../vue/component.md)
- uts原生组件的开发指南：[详见](../plugin/uts-component.md)

组件开发完毕后可发布到插件市场，插件作者指南：[详见](https://uniapp.dcloud.net.cn/plugin/publish.html)

<!-- TODO下面这段应该挪走 -->
## 调用组件方法@methods

需要把组件分为 内置组件、easycom组件、非easycom组件，这3种组件有不同的方法调用方式。[详情](../vue/component.md#page-call-component-method)

### 内置组件的方法调用或设置属性

> 3.93+ 支持

使用 `this.$refs` 获取组件并as转换为组件对应的element类型，通过 `.`操作符 调用组件方法或设置属性。[详情](../vue/component.md#call-builtin-component-method)

### easycom组件调用方法或设置属性@method_easycom

> 3.97+ 支持 uni_modules 目录下的组件

easycom组件，用法和内置组件一样。也是使用 `this.$refs` 获取组件并转换为组件的类型，通过 `.`操作符 调用组件方法或设置属性。[详情](../vue/component.md#call-easycom-component-method)

### 其它自定义组件的方法调用使用callMethod@$callMethod

如果不是内置组件，也不是easycom组件，那么无法使用`.`操作符了。

此时需使用 `this.$refs` 获取组件实例，然后通过 `$callMethod` 调用组件的方法。也就是把组件的方法名、参数，当做callMethod的参数来传递。此时也就没有`.`操作符那样的代码提示和校验了。[详情](../vue/component.md#call-component-method)。注意：`$callMethod` 调用性能低于easycom组件的强类型调用，如果遇到高频调用场景，建议使用easycom组件的强类型调用方法。

## 如何开发同时兼容 uni-app x 和 uni-app 的组件

目前有两种方案：

- 目录下同时提供uvue，vue文件，分别适配 uni-app x 和 uni-app

组件作者在 uvue 和 vue 文件中可以自由使用各自的特性，比如 vue 中可以任意使用 js 或 ts 来书写代码，

如果部分组件逻辑被抽离为单独的文件，需要分别命名为各自环境支持的文件类型，导入时不同平台支持的文件类型也不同，

比如 uvue 文件目前不支持引入js或ts；在 uni-app 项目中 vue 文件不能直接引入单独的 uts 文件，如果有需求，应该封装为uts插件来引入使用。

对于现有的 uni-app 组件，通过新建 uvue 文件来渐进式支持 uni-app x，可以避免对已有 uni-app 项目造成影响

- 仅提供一个vue文件，同时适配 uni-app x 和 uni-app

该方案，需要script节点配置lang="ts"，这样才可以在 uni-app 项目中正常书写带有类型的代码，而在 uni-app x 项目中，则会忽略 lang="ts"，当做 uts 代码编译。

当需要区分平台或项目类型时，可以使用对应的条件编译。

<!-- 比如，当需要在 css 中区分原生渲染和webview渲染时

可以通过 APP-UVUE（表示在 uni-app x 项目app端的Android和iOS原生渲染）、APP-NVUE（表示在 uni-app 项目app端的nvue页面原生渲染） 区分，

`#ifdef APP-UVUE || APP-NVUE` 可以表示原生渲染，使用 `ifndef` 则可以取反表示为webview渲染，如 `#ifndef APP-UVUE || APP-NVUE`
 -->
比如通过 UNI-APP-X 来区分项目类型，更多条件编译见：[详情](https://uniapp.dcloud.net.cn/tutorial/platform.html)


### vue 与 uvue 不同文件后缀的优先级 @priority

新建组件时(注意不是新建页面)，默认组件的后缀名为.uvue，但也支持.vue。

.vue里面写uvue的语法，可以正常被.uvue页面引用和编译。

.vue里写条件编译，可以制作同时满足uni-app和uni-app x的组件。

.vue中适用于uni-app x的条件编译区域内的代码，必须符合uni-app x的规范。如果使用uni-app x不支持的、uni-app js引擎版特有的功能，会报错。

当你手动import或easycom手动配置规则，可以指定文件名后缀。比如`import PageHead from '@/components/page-head.uvue'`

但如果未明确指定组件后缀名的情况，且同一个组件目录下即存在.vue文件、又存在.uvue文件，
此时 `vue` 组件和 `uvue` 组件的优先级如下：
- 在 `uni-app x` 中，优先使用 `uvue` 组件，如果不存在 `uvue` 组件，则使用 `vue` 组件。
- 在 `uni-app` 中，只支持使用 `vue` 组件。
