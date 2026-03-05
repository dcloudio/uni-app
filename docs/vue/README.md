# uvue概述

[vue.js](https://vuejs.org/) 是流行的js框架，它提供了：
1. 简易的模板式写法。降低使用门槛，UI和逻辑分离更清晰。
2. 数据双向绑定。减少手写dom，diff机制提高性能。
3. 组件机制。封装UI和逻辑，让轮子更加丰富。

但 vue.js 并不支持web之外的其他平台，也不支持uts。

uni-app x 为vue开发者提供了跨平台的解决方案。

uni-app x 中，web平台内置了vue.js，其他平台为 DCloud 参考vue规范提供的兼容实现。

在 uni-app x 中，页面和组件的文件后缀名均为 `*.uvue`。u 即 uni 的意思。

页面与组件均符合vue的单文件组件规范，只不过页面需要在pages.json中注册且多了一批生命周期和API。

在非web平台，uvue 尽可能拉齐了vue.js的功能，但仍有些不常用的功能暂未提供，需注意查看相关文档的兼容性。同时 uvue 也新增了 [easycom](./component.md#easycom) 等技术，简化组件的使用。

hello uvue 是非常重要的vue示例，演示了各种vue功能的应用。

- 插件地址：[https://ext.dcloud.net.cn/plugin?id=15021](https://ext.dcloud.net.cn/plugin?id=15021)
- 源码地址：[https://gitcode.com/dcloud/hello-uvue](https://gitcode.com/dcloud/hello-uvue)，注意有master和alpha分支，对应HBuilderX最新的正式版和alpha版。

# 版本对应@ver
HBuilderX/uni-app x，会跟踪vue版本的升级，版本映射表如下

|HBuilderX	|vue版本	|
|--	|--	|
|4.14	|3.4	|

# 页面/组件内容构成@sfc

一个 uvue 页面/组件，符合vue单文件组件规范（SFC），有3个根节点标签：

1. 模板组件区 `<template>`
2. 脚本区 `<script>`
3. 样式区 `<style>`

注意html中，根节点是`<html>`，`<script>`和`<style>`是子节点。但在uvue中，这3个节点都是一级节点。

vue的script分组合式和选项式，下面先提供1个基于组合式的数据绑定和修改的示例，点击按钮，修改按钮的文字。

```vue
<template>
	<view class="content">
		<!-- button的文字绑定了响应式变量title，点击事件绑定了buttonClick方法-->
		<button @click="buttonClick">{{title}}</button>
	</view>
</template>

<script setup>
  let title = ref("Hello world") //定义一个响应式变量title，默认赋值为Hello world
	const buttonClick = () => {
		title.value = "按钮被点了" //对响应式变量title的.value属性赋值，界面上button的文字会自动同步修改
	}
	/*
		function buttonClick() { // 简单的function方式也可以用，但在不同平台的作用域有细微差异。所以一般推荐上方箭头函数的写法。
		title.value = "按钮被点了"
	}
	*/
	onLoad(() => {
		// 页面启动的生命周期，这里编写页面加载时的逻辑
	})
</script>

<style>
	.content {
		width: 750rpx;
	}
</style>
```

可以看出整体和html还是很接近的。但响应式变量和绑定机制，可以免去写大量的dom操作代码，让开发更高效轻松。

基于选项式的示例，下面章节会提供。

## template

template中文名为`模板`，它类似html的标签。但有2个区别：

1. html中 `script` 和 `style` 是 html 的二级节点。但在 uvue 文件中，`template`、`script`、`style` 这3个是平级关系。
2. html 中写的是 web 标签，但 vue 的 `template` 中写的全都是 vue 组件（包括[内置基础组件](../component/README.md)、自定义前端uvue组件、[uts原生插件组件](../plugin/uts-component.md)），每个组件支持属性、事件、vue 指令，还可以绑定 vue 的 data 数据。

组件，即component，是vue中非常重要的概念，或者说现代开发框架都离不开组件概念。

我们知道js逻辑可以封装为函数或类库。而对于页面上可视的元素，则可以将ui、样式、逻辑一起封装为组件。详见[uvue组件规范](./component.md)

在 uni-app x 中， `<view>`是最基本的视图容器组件，`<text>`则是文字组件，`<button>`是按钮组件。这些都是[内置组件](../component/README.md)

一个页面或组件只能有一个template标签，template下面可以有多个二级节点，即多个根组件。如下：

```vue
<template>
	<view>
		<text v-if="titleShow" :style="'color:' + titleColor">{{title}}</text> <!-- text组件的text绑定了响应式变量title、v-if指令绑定了titleShow、style绑定了titleColor-->
	</view>
	<scroll-view >
		<button @click="buttonClick_changeText" type="primary">修改文字内容</button>
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

	let titleColor = ref("black")
	const buttonClick_changeColor = () => {
		titleColor.value = "red" //对响应式变量的.value属性赋值，界面上文字组件的style属性绑定了titleColor，所以会变色
	}
</script>
```

组件有很多概念，属性、事件、指令。如果还不了解相关概念，请参阅 [组件介绍](../compiler/README.md)

## script

script中编写逻辑代码。

uvue中只能有一个script标签。

script标签的属性如下：
- lang
lang 仅支持uts，不管script的lang属性写成什么，都按uts编译。注意在iOS的js引擎驱动的uvue页面里，uts会被编译为js。
- setup
setup属性声明代表script里的代码为组合式写法，如果没有setup属性则为选项式写法。

**注意：** 所有 `vue` 公开的 `API` 都是不需要 `import` 的, `uni-app x` 会自动引入。

比如不需要写：
```js
import { ref } from 'vue';
```

### 组合式和选项式的区别

vue最初只有选项式API，从vue3起，新增了组合式API。uni-app x仅支持vue3。

所谓选项式，就是把script的内容在export default {} 中约定不同的对象，在其中通过多个选项的对象来定义data、method和生命周期。

框定好这些后，开发者就在这个框框里分别写自己的业务逻辑。

这种方式易用但不够灵活。所以在vue3以前，部分开发者会认为react更难学、更灵活，所以更高级。

vue3新增的组合式API，是纯编程的，解决了选项式不够灵活的问题。同时维持了易学的特点。让vue变的即容易、又灵活。

在vue3中，组合式和选项式是可以混合使用的。
1. 可以A页面使用组合式，B页面使用选项式，互相跳转。
2. 可以页面使用组合式，其中的某些组件使用选项式。反之亦然。
3. 一个页面或组件内，可以混合使用组合式和选项式
- 在选项式的script里，可通过setup选项，在其中编写组合式代码
- 在组合式script里（即script有setup属性），也可以通过defineOptions来定义选项式写法

但注意不支持一个页面/组件有2个script，分别写选项式和组合式。

开发者可以根据自己的喜好选择2种写法，但还有几个差别需要注意：
1. 组合式API的组件，可以监听引用其页面的页面级生命周期。而选项式是不能的。有相关需求的组件，需使用组合式API，或在选项式中使用setup函数。[详见](./component.md#component-page-lifecycle)
2. 选项式的type类型定义在`export default {}`外，这些都是应用级全局的，略微影响性能。[见下](#export-default-out)
3. app.uvue和uts组件插件的index.vue，目前只支持选项式。
4. vue即将发布蒸汽模式，该模式抛弃了VNode，让页面加载速度更快。但该模式仅支持组合式。

一般推荐的建议是：
1. 如果有历史的选项式代码需要复用，这些选项式代码仍然可以使用。
2. 如果新写页面和组件，建议直接使用组合式。

### 组合式API
组合式 API，也称 Composition API，或 setup函数。

组合式提供了更灵活自由、更简洁的编程方式，通过代码而不是通过规范约定死的选项来定义data、method和生命周期。

如下页面代码的逻辑是：

1. 定义了一个响应式`title`，初始值是"Hello world"。
2. 在页面中放置了一个button组件，按钮文字区使用`{{}}`模板写法，里面写响应式变量`title`，那么`title`的值就会绑定到按钮的文字区，即按钮的初始文字是"Hello world"
3. 按钮的点击事件`@click`，指向了一个方法`buttonClick`，点击按钮即触发这个方法的执行
4. 页面onReady生命周期中打印日志

```vue
<template>
	<view>
		<!-- button的文字绑定了响应式变量title，点击事件绑定了buttonClick方法-->
		<button @click="buttonClick">{{title}}</button>
	</view>
</template>

<script setup>
  let title = ref("Hello world") //定义一个响应式变量title，默认赋值为Hello world
	const buttonClick = () => {
		title.value = "按钮被点了" //对响应式变量title的.value属性赋值，界面上button的文字会自动同步修改
	}
	/*
		function buttonClick() { // 简单的function方式也可以用，但在不同平台的作用域有细微差异。所以一般推荐上方箭头函数的写法。
		title.value = "按钮被点了"
	}
	*/
	onLoad(() => {
		// 页面启动的生命周期，这里编写页面加载时的逻辑
	})
</script>

```

### 选项式API
选项式 API，也称 Option API，指在script中写`export default {}`，在其中通过多个选项的对象来定义data、method和生命周期。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

以下代码的逻辑与上一章节组合式API的示例相同，只是写法改成了选项式写法。

```vue
<template>
	<view>
		<button @click="buttonClick">{{title}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "Hello world", // 定义绑定在页面上的data数据
			}
		},
		onLoad() {
			// 页面启动的生命周期，这里编写页面加载时的逻辑
		},
		methods: {
			buttonClick: function () {
				this.title= "按钮被点了" //对响应式变量title赋值，界面上button的文字会自动同步修改
			},
		}
	}
</script>
```

对比之前组合式的、相同业务逻辑的代码，可以看到两种方式的差异：
1. 选项式由于有框框的存在，看起来结构清晰些，但代码行数也更长
2. 组合式更灵活，代码更短。高级开发者也可以自己保证代码结构的清晰整洁。但初学者如果代码写的很长，容易乱糟糟

上述代码比较简单，如果涉及到响应式变量的类型定义，那么会更明显的感受到组合式的灵活和简洁。

#### `export default` 外的代码@export-default-out

选项式主代码在`export default {}`里。但既然有`export default {}`里的代码，那么就有 `export default {}` 外面的代码。

写在外面一般有几种情况：

1. 引入第三方 uts 模块
2. 引入非 easycom 的组件（一般组件推荐使用[easycom](./component.md#easycom)，无需导入注册）
3. 定义 type，对 data 进行类型定义
4. 定义作用域更大的变量

```html
<script>
	const TAB_OFFSET = 1; // 外层静态变量不会跟随页面关闭而回收
	import charts from 'charts.uts'; // 导入外部js/ts模块
	import swiperPage from 'swiper-page.uvue'; //导入非easycom的组件
	type GroupType = {
		id : number,
		title : string
	} // 在uts中，为下面data数据的 groupList 定义类型
	export default {
		components: {
		    swiperPage
		}, // 注册非easycom组件
		data() {
			return {
				groupList: [
					{ id: 1, title: "第一组" },
					{ id: 2, title: "第二组" },
				] as GroupType[], // 为数据groupList定义ts类型
			}
		},
		onLoad() {},
		methods: {}
	}
</script>
```

开发者应谨慎编写 `export default {}` 外面的代码，这里的代码有2个注意事项：

1. 影响应用性能。不管写在哪个页面，这部分代码都在应用启动时执行，而不是页面加载。如果`export default {}`外的代码写的太复杂，会影响应用启动速度，占用更多内存。
2. 不跟随组件、页面关闭而回收。在外层的静态变量不会跟随页面关闭而回收。如果必要，你需要手动处理。比如 `unmounted` 或 `onUnload` 生命周期进行处理。

## style（CSS功能） @css

style的写法与web的css基本相同。但在App端，由于并非webview渲染，支持的css有限。[详见](../css/README.md)

本章节重点讲解uvue下样式的使用注意事项。

一个页面/组件允许有多个style标签。

style通过lang属性，可以支持less、scss、stylus等css预处理语言。

### style 标签 @style

-

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| lang | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 |  |
| scoped | boolean | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| module | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |

#### lang 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| scss | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | - |
| less | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | - |
| stylus | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | - |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | 4.11 | 4.61 |





##### 参见



### Class 与 Style 绑定 @class-style

- `uni-app x` 支持绑定  `UTSJSONObject` 和 `Map` 类型数据。
- 在App-Android平台上 `Map` 的性能高于 `UTSJSONObject` 数据类型。从 `uni-app x 4.01` 起，Web平台也支持了 `Map` 类型绑定。

如下示例中，给view组件的style和class分别绑定了2个data，就可以通过在逻辑代码里修改data而实现动态修改样式。
```vue
<template>
  <view>
    <view :style="styleMap" :class="classMap"></view>
  </view>
</template>

<script lang="uts">
  export default {
    data() {
      return {
        styleMap: new Map<string, string>([['border', '2px solid red'], ['background-color', 'green']]),
        classMap: new Map<string, boolean>([['w-100', true], ['h-100', true], ['rounded', false]])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .w-100 {
    width: 100px;
  }
  .h-100 {
    height: 100px;
  }
  .rounded {
    border-radius: 8px;
  }
</style>
```

- [参见](https://uniapp.dcloud.net.cn/tutorial/vue3-basics.html#class-%E4%B8%8E-style-%E7%BB%91%E5%AE%9A)

### 深度选择器 @scoped

什么是 scoped CSS？

参考 Vue 文档了解 [组件作用域 CSS](https://cn.vuejs.org/api/sfc-css-features.html) 基本用法。

> 处于 `scoped` 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` / `::v-deep` 方案：

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}

.a ::v-deep .b {
	/* ... */
}
</style>
```

在 uni-app x 项目中，页面默认可以影响组件样式，组件之间样式彼此隔离。深度选择器 `:deep()` / `::v-deep` 只在 Web 平台有实际含义。
> [HBuilderX 5+ 隔离策略文档](../css/common/style-isolation.md)

- 在 Web 平台，uni-app x 中 style 会自动添加 `scoped`（因为web端最终是编译成单页应用SPA，需要隔离不同页面间的样式），因此需要使用深度选择器，来影响子组件样式。
- 微信小程序、App 平台页面可直接影响子组件，添加 scoped、使用深度选择器无意义

HBuilderX 4.71 起，App 端可以使用深度选择器控制台不再告警，视为后代选择器。

<!-- ### CSS Modules @css-module

一个 `<style module>` 标签会被编译为 `CSS Modules` 并且将生成的 CSS class 作为 `$style` 对象暴露给组件：

```vue
<template>
  <text :class="$style.red">This should be red</text>
</template>

<style module>
.red {
  color: red;
}
</style>
```

得出的 class 将被哈希化以避免冲突，实现了同样的将 CSS 仅作用于当前组件的效果。

#### CSS Modules 自定义注入名称 @css-module-custom-injection

你可以通过给 `module` attribute 一个值来自定义注入 class 对象的属性名：

```vue
<template>
  <text :class="classes.red">red</text>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

#### CSS Modules 与组合式 API 一同使用 @css-module-composition-api

可以通过 `useCssModule` API 在 `setup()` 和 `<script setup>` 中访问注入的 class。对于使用了自定义注入名称的 `<style module>` 块，useCssModule 接收一个匹配的 module attribute 值作为第一个参数：

```ts
import { useCssModule } from 'vue'

// 在 setup() 作用域中...
// 默认情况下, 返回 <style module> 的 class
useCssModule()

// 具名情况下, 返回 <style module="classes"> 的 class
useCssModule('classes')
``` -->

### CSS 中的 v-bind() @css-v-bind

|App|Web|
|:-:|:-:|
|x  |4.13+  |

[示例](./data-bind.md#v-bind-css-data)

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态：

```vue
<template>
  <text class="text">hello</text>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

这个语法同样也适用于 `<script setup>`，且支持 UTS 表达式 (需要用引号包裹起来)：

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <text class="view">hello</text>
</template>

<style scoped>
.view {
  color: v-bind('theme.color');
}
</style>
```


## 利用API将选项式转换为组合式

把页面改成组合式写法
1. 在进行“选项式 API → 组合式 API”改造时，只做语法层面的转换，保证代码不报错，避免引入业务逻辑变更。
2. 在改造过程中，不要删除或遗漏任何已有代码和注释，也不要新增任何注释，确保代码完整性。
3. 在组合式 API 中，必须保证所有函数和变量在调用前已定义，如顺序不对，要根据依赖关系调整函数定义顺序，避免未定义前调用。
4. 在组合式 API 中，不需要 import 所有 vue 的 API 和 uni-app-x 的生命周期函数（如 `ref、computed、watch、onLoad、onMounted` 等），uni-app x 会自动引入。
5. 在选项式 API 中的 `onShow、onHide` 页面生命周期，改为组合式 API 时，分别改成 `onPageShow、onPageHide`。
6. 在组件生命周期兼容性方面，选项式 API 的 `beforeUnmount、mounted、unmounted`，改为组合式 API 时，分别改成 `onBeforeUnmount、onMounted、onUnmounted`，避免生命周期名称不一致；选项式 API 的 created 改为组合式的 `<script setup>` 顶层代码直接执行。
7. 在使用 ref 时
- 如果引用内置组件（例如：scroll-view、swiper、slider等），类型应为：Uni组件名(驼峰)Element，例如 `<slider>` 组件类型为 `UniSliderElement`，声明为 `const sliderRef = ref<UniSliderElement | null>(null)`；避免类型错误，错误示例：swiper上的ref写成了`const swiper = ref<UniElement|null>(null)`。
- 如果引用内置 DOM 元素（例如：view、text），类型为 `ref<UniElement|null>(null)` 或 `ref<UniElement[]|null>(null)`；
- 如果引用自定义组件，类型为 `ref<ComponentPublicInstance|null>(null)` 或 `ref<ComponentPublicInstance[]|null>(null)`，避免类型声明错误。
8. 在组合式 API 中，每个 ref 要单独声明，变量名与模板 ref 保持一致，直接用 `xxx.value` 访问，避免变量名与 import 的组件名重复，否则会报错。
9. 在组合式 API 下，子组件方法不会自动暴露给父组件，只有通过 `defineExpose` 显式暴露的方法，父组件才能通过 ref 调用，避免父组件无法访问子组件方法。
10. 在测试例页面用到页面中的数据或方法时，必须通过 `defineExpose` 显式暴露数据和方法，避免测试无法访问。
11. 在页面生命周期中，`onPullDownRefresh` 应作为页面生命周期函数处理，而不是写成普通方法。
