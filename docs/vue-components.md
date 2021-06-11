[观看本节视频讲解](https://learning.dcloud.io/#/?vid=12)

## 概念

- 组件是视图层的基本组成单元。
- 组件是一个单独且可复用的功能模块的封装。
- 一个组件包括开始标签和结束标签，标签上可以写属性，并对属性赋值。内容则写在两个标签之内。
	- 根节点为 `<template>`，这个 `<template>` 下只能且必须有一个根 `<view>` 组件。这是[vue单文件组件规范](https://cn.vuejs.org/v2/guide/single-file-components.html)。
	- 一个组件的 data 选项必须是一个函数。

下面是一个基本组件示例，在根`<view>`组件下再次引入一个`<view>`组件，并给组件的text区绑定一个data。
```html
	<template>
		<view>
			<view>{{userName}}</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					"userName":"foo"
				}
			}
		}
	</script>
```

基础组件是内置在uni-app框架中的，包括view、text、input、button、video等几十个基础组件，列表详见：[uni-app基础组件](https://uniapp.dcloud.net.cn/component/README?id=%e5%9f%ba%e7%a1%80%e7%bb%84%e4%bb%b6)

但仅有基础组件是不够用的，实际开发中会有很多封装的组件。

比如我们需要一个五角星点击评分的组件，在DCloud的插件市场里可以获取到：[https://ext.dcloud.net.cn/plugin?id=33](https://ext.dcloud.net.cn/plugin?id=33)

把这个uni-rate组件导入到你的uni-app项目下，在需要的vue页面里引用它，就可以在指定的地方显示出这个五角星组件。

```html
	<!-- 在index.vue页面引用 uni-rate 组件-->
	<template>
		<view>
			<uni-rate></uni-rate><!-- 这里会显示一个五角星，并且点击后会自动亮星 -->
		</view>
	</template>
```




## 优势


- 可以将组件进行任意次数的复用。
- 合理的划分组件，有助于提高应用性能。
- 代码更加方便组织和管理，并且扩展性也更强，便于多人协同开发。
- 组件化开发能大幅度提高应用开发效率、测试性、复用性等。




## 注册

在注册一个组件的时候，我们始终需要给它一个名字。
定义组件名的方式有两种：

- 使用 kebab-case

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

- 使用 PascalCase

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。
也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。


在uni-app工程根目录下的 `components` 目录，创建并存放自定义组件：

```html
│─components            	符合vue组件规范的uni-app组件目录
│  └─componentA         	符合‘components/组件名称/组件名称.vue’目录结构，easycom方式可直接使用组件
│  		└─componentA.vue    可复用的componentA组件
│  └─component-a.vue      可复用的component-a组件
```



### 全局注册

`uni-app` 支持配置全局组件，需在 `main.js` 里进行全局注册，注册后就可在所有页面里使用该组件。

**注意**

- Vue.component 的第一个参数必须是静态的字符串。
- nvue 页面暂不支持全局组件。

1.`main.js` 里进行全局导入和注册

```js
	import Vue from 'vue'
	import pageHead from './components/page-head.vue'
	Vue.component('page-head',pageHead)
```

2.`index.vue` 里可直接使用组件
 

```html
	<template>
		<view>
			<page-head></page-head>
		</view>
	</template>
```


### 局部注册


局部注册之前，在需要引用该组件的页面，导入你想使用的组件。

**页面引入组件方式**


如下通过两种方式导入一个角标的组件库，[详见](https://ext.dcloud.net.cn/plugin?id=21)，推荐使用 `easycom` 方式引入。

1.**传统vue规范：** 在 index.vue 页面中，通过 `import` 方式引入组件 ，在 `components` 选项中定义你想要使用的组件。

```html
	<!-- 在index.vue引入 uni-badge 组件-->
	<template>
		<view>
			<uni-badge text="1"></uni-badge><!-- 3.使用组件 -->
		</view>
	</template>
	<script>
		import uniBadge from '@/components/uni-badge/uni-badge.vue';//1.导入组件（这步属于传统vue规范，但在uni-app的easycom下可以省略这步）
		export default {
			components:{uniBadge }//2.注册组件（这步属于传统vue规范，但在uni-app的easycom下可以省略这步） 
		}
	</script>
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

在对象中放一个类似 uniBadge  的变量名其实是 uniBadge : uniBadge  的缩写，即这个变量名同时是：

- 用在模板中的自定义元素的名称
- 包含了这个组件选项的变量名(仅支持驼峰法命名)


2.**通过uni-app的[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)：** 将组件引入精简为一步。只要组件安装在项目的 `components` 目录下，并符合 `components/组件名称/组件名称.vue` 目录结构。就可以不用引用、注册，直接在页面中使用。


```html
	<!-- 在index.vue引入 uni-badge 组件-->
	<template>
		<view>
			<uni-badge text="1"></uni-badge><!-- 3.使用组件 -->
		</view>
	</template>
	<script>
		// 这里不用import引入，也不需要在components内注册uni-badge组件。template里就可以直接用
		export default {
			data() {
				return {
				}
			}
		}
	</script>
```

- **easycom是自动开启的**，不需要手动开启，有需求时可以在 `pages.json` 的 `easycom` 节点进行个性化设置，[详见](https://uniapp.dcloud.io/collocation/pages?id=easycom)。

- 不管components目录下安装了多少组件，easycom打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。



组件是 `vue` 技术中非常重要的部分，组件使得与ui相关的轮子可以方便的制造和共享，进而使得 `vue` 使用者的开发效率大幅提升。

`uni-app` 搭建了组件的插件市场，有很多现成的组件，若下载符合components/组件名称/组件名称.vue目录结构的组件，均可直接使用。[uni-app插件市场](https://ext.dcloud.net.cn/)



> `uni-app`只支持 vue单文件组件（.vue 组件）。其他的诸如：动态组件，自定义 `render` ，和 `<script type="text/x-template">` 字符串模版等，在非H5端不支持。


## props

`props` 可以是数组或对象，用于接收来自父组件的数据。`props` 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。


|选项	|类型	|说明	|
|--	|--	|--	|
|type	| `String` 、 `Number` 、 `Boolean` 、 `Array` 、 `Object` 、 `Date` 、 `Function` 、 `Symbol` ，任何自定义构造函数、或上述内容组成的数组	|会检查一个 `prop` 是否是给定的类型，否则抛出警告	|
|default	|any	|为该 `prop` 指定一个默认值。如果该 `prop` 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。	|
|required	|Boolean	|定义该 `prop` 是否是必填项|
|validator	|Function	|自定义验证函数会将该 `prop` 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 `false` 的值 (也就是验证失败)，一个控制台警告将会被抛出|

##### 示例：

```html
	<template>
		<view>
			<!-- 我是子组件componentA -->
			<view>{{age}}</view>
		</view>
	</template>
	<script>
		export default {
			props: {
				// 检测类型 + 其他验证
				age: {
					type: Number,
					default: 0,
					required: true,
					validator: function(value) {
						return value >= 0
					}
				}
			}
		}
	</script>
```

```html
	<template>
		<view>
			<!-- 我是父组件 -->
			<componentA :age="10"></componentA>
		</view>
	</template>
```



### 传递静态或动态 Prop


- 可以像这样给 `prop` 传入一个静态的值：

```html
	<blog-post title="My journey with Vue"></blog-post>
```

- 可以通过 `v-bind` 动态赋值

```html
	<!-- 动态赋予一个变量的值 -->
	<blog-post v-bind:title="post.title"></blog-post>
	
	<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
	<blog-post is-published></blog-post>
	
	<blog-post v-bind:is-published="post.isPublished"></blog-post>
```


- 传入一个对象的所有 `property`

如果你想要将一个对象的所有 `property` 都作为 `prop` 传入，你可以使用不带参数的 `v-bind` (取代 v-bind:prop-name)。例如，对于一个给定的对象 `post` ：

```js
	post: {
		id: 1,
		title: 'My Journey with Vue'
	}
```

```html
	<blog-post v-bind="post"></blog-post>
	<!-- 上面的模板等价于： -->
	<blog-post
		v-bind:id="post.id"
		v-bind:title="post.title"
	></blog-post>
```


### 单向数据流


所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

> 每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

- 这个 `prop` 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 `prop` 数据来使用。

```html
	<template>
		<view>
			<!-- 我是子组件componentA -->
			<view>{{title}}</view>
		</view>
	</template>
	<script>
		export default {
			props: ['title']
		}
	</script>
```

```html
	<template>
		<view>
			<!-- 我是父组件 -->
			<componentA :title="title"></componentA>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					title:"hello"
				}
			}
		}
	</script>
```

- 这个 `prop` 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 `prop` 的值来定义一个计算属性： 

```html
	<template>
		<view>
			<!-- 我是子组件componentA -->
			<view>{{normalizedSize}}</view>
		</view>
	</template>

	<script>
		export default {
			props: ['size'],
			computed: {
				normalizedSize: function () {
					return this.size.toLowerCase()
				}
			}
		}
	</script>
```

```html
	<template>
		<view>
			<!-- 我是父组件 -->
			<componentA :size="size"></componentA>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					size:"M"
				}
			}
		}
	</script>
```






## ref


被用来给元素或子组件注册引用信息，引用信息将会注册在父组件的 `$refs` 对象上。

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

```html

//非H5端不支持通过this.$refs.content来获取view实例
<view ref="content">hello</view>

//支持通过this.$refs.child来获取child-component实例
<child-component ref="child"></child-component>

```


当 `ref` 和 `v-for` 一起用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。



**关于 ref 注册时间的重要说明：**

因为 `ref` 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们，它们还不存在！`$refs` 也不是响应式的，因此你不应该用它在模板中做数据绑定。




#### 子组件ref


尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。
访问子组件实例或子元素，通过 ref 为子组件赋予一个 ID 引用，在vue的js中可通过`this.$refs.XXX`来获取到组件对象。

```html
	<base-input ref="usernameInput"></base-input>
```

你已经定义了这个 ref 的组件里，你可以使用：`this.$refs.usernameInput`来访问这个` <base-input> `实例。

##### 示例：

```html
//base-input子组件页面
<template>
	<view>
		<input :focus="isFocus" type="text" placeholder="请输入内容" />
	</view>
</template>
<script>
	export default {
		name:"base-input",
		data() {
			return {
				"isFocus":false
			};
		},
		methods:{
			focus(){
				this.isFocus = true
			}
		}
	}
</script>
```


允许父级组件通过下面的代码聚焦` <base-input> ` 里的输入框：


```html
//index 父组件页面
<template>
	<view>
		<base-input ref="usernameInput"></base-input>
		<button type="default" @click="getFocus">获取焦点</button> 
	</view>
</template>
<script>
	export default {
		methods:{
			getFocus(){
				//通过组件定义的ref调用focus方法
				this.$refs.usernameInput.focus()
			}
		}
	}
</script>
```


**注意**

> 非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：view、text）









## 自定义事件

### 将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。
这时，你可以使用 @事件的 `.native` 修饰符：

- 注意：在app、小程序端和h5端表现不一致，h5端获取到的是浏览器原生事件。

```html
	<template>
		<view>
			<!-- 我是父组件 -->
			<componentA @click.native="clickComponentA" style="height: 200px;"></componentA>
		</view>
	</template>
	<script>
		export default {
			methods: {
				clickComponentA(){
					console.log("clickComponentA");
				}
			}
		}
	</script>
```

```html
	<template>
		<view>
			<!-- 我是子组件 -->
			<view type="default" @click.stop="open" style="height: 30px;">点击</view>
		</view>
	</template>
	<script>
		export default {
			methods:{
				open(){
					console.log("open");
				}
			}
		}
	</script>
```




### .sync 修饰符

当一个子组件改变了一个 `prop` 的值时，这个变化也会同步到父组件中所绑定。
`.sync` 它会被扩展为一个自动更新父组件属性的 `v-on` 监听器。


```html
	<!-- 父组件 -->
	<template>
		<view>
			<syncA :title.sync="title"></syncA>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					title:"hello vue.js"
				}
			}
		}
	</script>
```

```html
	<!-- 子组件 -->
	<template>
		<view>
			<view @click="changeTitle">{{title}}</view>
		</view>
	</template>
	<script>
		export default {
			props: {
				title: {
					default: "hello"
				},
			},
			methods:{
				changeTitle(){
					//触发一个更新事件
					this.$emit('update:title',"uni-app")
				}
			}
		}
	</script>
```





## 插槽

Vue 实现了一套内容分发的 API，将 `slot` 元素作为承载分发内容的出口。

它允许你像这样合成组件：


```html
	<template>
		<view>
			<componentA>
				Your Profile
			</componentA>
		</view>
	</template>
```


在 `<componentA>` 的模板中可能会写为：

```html
	<template>
		<view>
			<!-- 我是子组件componentA -->
			<view >{{title}}</view>
			<slot></slot>
		</view>
	</template>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 `HTML` ：

```html
	<template>
		<view>
			<!-- 我是父组件 -->
			<componentA>
				<view>Your Profile</view>
				<!-- 添加一个 uni-icons 图标 -->
				<uni-icons type="contact" size="30"></uni-icons>
			</componentA>
		</view>
	</template>
```

如果 `<componentA>` 的 `template` 中没有包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。


### 编译作用域

当你想在一个插槽中使用数据时，例如：

```html
	<navigation-link url="/profile">
		Logged in as {{ user.name }}
	</navigation-link>
```

该插槽跟模板的其它地方一样可以访问相同的实例 `property` (也就是相同的“作用域”)，而不能访问 `<navigation-link>` 的作用域。例如 `url` 是访问不到的：

```html
	<navigation-link url="/profile">
		Clicking here will send you to: {{ url }}
	<!--
		这里的 `url` 会是 undefined，
		因为其 (指该插槽的) 内容是_传递给_ <navigation-link> 的
		而不是在 <navigation-link> 组件*内部*定义的。
	-->
	</navigation-link>
```


> 记住规则：**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**



### 默认内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。例如在一个 `<submit-button>` 组件中：

```html
	<button type="submit">
		<slot></slot>
	</button>
```

我们可能希望这个 `<button>` 内绝大多数情况下都渲染文本“Submit”。为了将“Submit”作为后备内容，我们可以将它放在 `<slot>` 标签内：

```html
	<button type="submit">
		<slot>Submit</slot>
	</button>
```


- 当我在一个父级组件中使用 `<submit-button>` 并且不提供任何插槽内容时：

```html
	<!-- 父级组件：不提供任何插槽内容-->
	<submit-button></submit-button>
	
	<!-- 子组件：后备内容 “Submit” 将会被渲染： -->
	<button type="submit">
		Submit
	</button>
```

- 当我在一个父级组件中使用 `<submit-button>` 并且提供插槽内容时：

```html
	<!-- 父级组件：提供插槽内容-->
	<submit-button>
		Save
	</submit-button>
	
	<!-- 子组件：则这个提供的内容将会被渲染从而取代后备内容： -->
	<button type="submit">
		Save
	</button>
```




### 具名插槽

需要多个插槽时，可以利用 `<slot>` 元素的一个特殊的特性：`name` 来定义具名插槽


- `<base-layout>` 子组件模板：

```html
	<template>
		<view  class="container">
			<header>
				<!-- 我们希望把页头放这里 -->
				<slot name="header"></slot>
			</header>
			<main>
				<!-- 我们希望把主要内容放这里 -->
				<slot></slot>
			</main>
			<footer>
				<!-- 我们希望把页脚放这里 -->
				<slot name="footer"></slot>
			</footer>
		</view>
	</template>
```


- 在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 v-slot 的参数的形式提供其名称：


```html
	<template>
		<view>
		<!-- 父组件使用子组件`<base-layout>`，节点上使用slot特性： -->
			<base-layout>
				<template v-slot:header>
					<view>Here might be a page title</view>
				</template>
				<template v-slot:default>
					<view>A paragraph for the main content.</view>
					<view>And another one.</view>
				</template>
				<template v-slot:footer>
					<view>Here's some contact info</view>
				</template>
			</base-layout>
		</view>
	</template>
```


现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 v-slot 的 `<template>` 中的内容都会被视为默认插槽的内容。

> v-slot 只能添加在 `<template>` 上 
> 
> 一个不带 name 的 `<slot>` 出口会带有隐含的名字 “default” 。


#### 具名插槽的缩写


跟 v-on 和 v-bind 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 **#**。例如 `v-slot:header` 可以被重写为 `#header` ：


```html
	<template>
		<view>
		<!-- 父组件使用子组件`<base-layout>`，节点上使用slot特性： -->
			<base-layout>
				<template #header>
					<view>Here might be a page title</view>
				</template>
				
				<view>A paragraph for the main content.</view>
				<view>And another one.</view>
				
				<template #footer>
					<view>Here's some contact info</view>
				</template>
			</base-layout>
		</view>
	</template>
```




### 作用域插槽

在作用域插槽内，父组件可以拿到子组件的数据。子组件可以在 `slot` 标签上绑定属性值。

有时让插槽内容能够访问子组件中才有的数据是很有用的。

```html
	<!-- 子组件 <current-user>-->
	<template>
		<view>
			<slot>{{ user.lastName }}</slot>
		</view>
	</template>
```

我们可能想换掉默认内容，用名而非姓来显示。如下：

```html
	<template>
		<view>
			<current-user>
				{{ user.firstName }}
			</current-user>
		</view>
	</template>
```

然而上述代码不会正常工作，因为只有 `<current-user>` 组件可以访问到 user 而我们提供的内容是在父级渲染的。

为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 `<slot>` 元素的一个 `attribute` 绑定上去：

```html
	<!-- 子组件 <current-user>-->
	<template>
		<view>
			<slot :user="user">{{user.lastName}}</slot>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					user:{
						"lastName":"bar",
						"firstName":"foo"
					}
				}
			}
		}
	</script>
```


绑定在 `<slot>` 元素上的 `attribute` 被称为**插槽 prop**。现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 `prop` 的名字：

```html
	<template>
		<view>
			<current-user>
				<template v-slot:default="slotProps">
					{{ slotProps.user.firstName }}
				</template>
			</current-user>
		</view>
	</template>
```

在这个例子中，我们选择将包含所有插槽 `prop` 的对象命名为 `slotProps` ，但你也可以使用任意你喜欢的名字。


#### 独占默认插槽的缩写语法

就像假定未指明的内容对应默认插槽一样，不带参数的 `v-slot` 被假定对应默认插槽：

```html
<template>
	<view>
		<current-user>
			<template v-slot="slotProps">
				{{ slotProps.user.firstName }}
			</template>
		</current-user>
	</view>
</template>
```


**默认插槽的缩写语法不能和具名插槽混用**，因为它会导致作用域不明确：

```html
	<template>
		<view>
			<!-- 无效，会导致警告 -->
			<current-user v-slot="slotProps">
				{{ slotProps.user.firstName }}
				<template v-slot:other="otherSlotProps">
					slotProps is NOT available here
				</template>
			</current-user>
		</view>
	</template>
```


只要出现多个插槽，请始终为**所有的插槽**使用完整的基于 `<template>` 的语法：

```html
	<template>
		<view>
			<current-user>
				<template v-slot:default="slotProps">
					{{ slotProps.user.firstName }}
				</template>
			
				<template v-slot:other="otherSlotProps">
					...
				</template>
			</current-user>
		</view>
	</template>
```


#### 解构插槽 Prop

作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里：

```js
	function (slotProps) {
		// 插槽内容
	}
```

这意味着 `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 `JavaScript` 表达式。
所以在支持的环境下 ( [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html) 或 [现代浏览器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment))，你也可以使用 [ES2015 解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 来传入具体的插槽 `prop`，如下：

```html
	<current-user v-slot="{ user }">
		{{ user.firstName }}
	</current-user>
```


这样可以使模板更简洁，尤其是在该插槽提供了多个 `prop` 的时候。它同样开启了 `prop` 重命名等其它可能，例如将 `user` 重命名为 `person` ：

```html
	<current-user v-slot="{ user: person }">
		{{ person.firstName }}
	</current-user>
```


你甚至可以定义后备内容，用于插槽 `prop` 是 `undefined` 的情形：

```html
	<current-user v-slot="{ user = { firstName: 'Guest' } }">
		{{ user.firstName }}
	</current-user>
```


## 小程序不支持列表


- 作用域插槽（HBuilderX 3.1.19 以下仅支持解构插槽且不可使用作用域外数据以及使用复杂的表达式）
- 动态组件
- 异步组件
- `inline-template`
- `X-Templates`
- `keep-alive`（App端也未支持）
- `transition` （可使用 `animation` 或 CSS 动画替代）



## 命名限制

在 uni-app 中以下这些作为保留关键字，不可作为组件名。

- `a`
- `canvas`
- `cell`
- `content`
- `countdown`
- `datepicker`
- `div`
- `element`
- `embed`
- `header`
- `image`
- `img`
- `indicator`
- `input`
- `link`
- `list`
- `loading-indicator`
- `loading`
- `marquee`
- `meta`
- `refresh`
- `richtext`
- `script`
- `scrollable`
- `scroller`
- `select`
- `slider-neighbor`
- `slider`
- `slot`
- `span`
- `spinner`
- `style`
- `svg`
- `switch`
- `tabbar`
- `tabheader`
- `template`
- `text`
- `textarea`
- `timepicker`
- `transition-group`
- `transition`
- `video`
- `view`
- `web`



Tips

- 除以上列表中的名称外，标准的 HTML 及 SVG 标签名也不能作为组件名。
- 在百度小程序中使用时，不要在 data 内使用 hidden ，可能会导致渲染错误。
- methods中不可使用与生命周期同名的方法名。







