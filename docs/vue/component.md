# 组件

我们可以对一段要复用的js/uts逻辑代码进行封装，抽出function、module等形式。

那么涉及UI的复用时，该如何抽象？

这就是vue的组件机制，把视图template、script、style都封装到独立的uvue组件文件中，在其他需要的地方使用组件的名称进行引用。

每个组件，包括如下几个部分：以组件名称为标记的开始标签和结束标签、组件text内容、组件属性、组件属性值。

组件还可以封装方法、事件、插槽，提供了[组件的生命周期](#component-lifecycle)，提供了组件和页面的[互通信机制](#use-and-communication)，满足了各种高级需求。

如果您还不了解这些概念，请务必先阅读 [组件概述文档](../component/README.md)

## 组件内容构成 @component-structure

uni-app x 组件基于 vue 单文件组件规范，一个组件内，有 3 个根节点标签：

- `<template>`：组件的模板内容
- `<script>`：组件的脚本代码
- `<style>`：组件的样式

### 和页面的区别 @component-page-difference

组件的内容构成和页面大体上一致，都符合vue的sfc规范。

事实上，一个在pages.json注册的页面uvue文件，也可以被当做一个组件引入到其他页面。

组件和页面的差别有：
1. 组件中不支持页面相关的生命周期和API，比如 `onLoad`、`onShow` 等[页面生命周期](../page.md#lifecycle)，比如$setPageStyle等API。
2. 组件中有一批组件独有的生命周期和API，比如 `mounted`、`unmounted` 等[组件生命周期](#component-lifecycle)，比如页面和组件通信的API。
3. 组件文件不需要在pages.json中注册


## 创建及引用组件 @create-and-import-component
<!-- TODO：此处需要重写 -->
### 创建组件 @create-component

#### easycom

1. 在 `项目根目录/components` 目录上右键（如果没有，在根目录新建一个 `components` 目录即可），选择 `新建组件`，输入组件名称，选择一个模板；可勾选创建同名目录，将组件放在同名目录下。
2. 在 `项目根目录/uni_modules` 目录上右键（如果没有，在根目录新建一个 `uni_modules` 目录即可），选择 `新建uni_modules插件`，输入`插件ID`，分类选择`前端组件-通用组件`；将组件放在和插件ID同名的目录下。

#### 创建自定义组件 @create-custom-component

3. 在项目 `pages 目录` 下的任意地方创建 `.uvue/.vue` 文件并编写组件代码

::: warning 注意事项
uni-app x 项目支持使用 `.vue`、`.uvue` 文件作为组件使用，但同文件名的两个文件同时存在，`.uvue` 文件会优先编译。
:::

### 引用组件 @import-component
#### easycom

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom` 将其精简为一步。

只要组件安装在项目的 `components` 目录下或 `uni_modules/插件 id/components/插件 id/插件 id.uvue` 目录下，并符合 `组件名称/组件名称.(vue|uvue)` 目录结构。就可以不用引用、注册，直接在页面中使用。

- 比如 [uni-loading](https://ext.dcloud.net.cn/plugin?id=15980)，它导入到项目后，存放在了目录 /uni_modules/uni-loading/components/uni-loading/uni-loading.uvue

  同时它的组件名称也叫 uni-loading，所以这样的组件，不用在 script 里注册和引用。如下：

  ```html
  <template>
      <view>
        <uni-loading></uni-loading><!-- 这里会显示一个loading -->
      </view>
    </template>
  <script>
    // 这里不用import引入，也不需要在components内注册组件。template里就可以直接用
    // ...
  </script>
  ```

这里出现了`uni_module`的概念，简单说下，它是uni-app的一种包管理方案。

`uni_module`其实不止服务于组件，它可以容纳组件、script库、页面、项目等所有DCloud插件市场所支持的种类。

在HBuilderX中点右键可方便的更新插件，插件作者也可以方便的上传插件。

uni_module有详细的专项文档，请另行查阅[uni_module规范](https://uniapp.dcloud.net.cn/plugin/uni_modules.html)。

如果你的组件不满足easycom标准的目录规范，还有一种办法是在[pages.json](../collocation/pagesjson.md#pages-easycom)里声明自己的目录规则，以便编译器查找到你的组件。自定义easycom路径规则的详细教程[详见](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)

##### easycom组件的类型规范 @easycom-component-type

组件标签名首字母大写，`驼峰+ComponentPublicInstance`，如：

`<test/>` 类型为：TestComponentPublicInstance
`<uni-data-checkbox/>` 类型为：UniDataCheckboxComponentPublicInstance

#### 手动引入组件 @manual-import-component

不符合 easycom 规范的组件，则需要手动引入：

```vue
<!-- 组件 child.vue -->
<template>
  <view>Child Component</view>
</template>

<!-- 页面（与 child.vue 组件在同级目录 -->
<template>
  <view>
    <child ref="component1"></child>
  </view>
</template>
<script setup lang="uts">
// 引入 child 组件
import child from './child.vue'

const component1 = ref<ComponentPublicInstance | null>(null) // 手动引入组件时的类型
</script>
```

##### 手动引入组件的类型规范 @manual-import-component-type

类型为：ComponentPublicInstance


## 使用及通信 @use-and-communication

### 页面与页面通信 @page-page-communication

1. 使用 [navigateTo](https://doc.dcloud.net.cn/uni-app-x/api/navigator.html#navigateto) 在 `url` 地址中携带参数
2. 使用 [event-bus](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html)

### 页面与组件通信 @page-component-communication

#### 向组件传递 `props` @transfer-component-props

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/props/props-options.uvue)

::: warning 注意
- 选项式 API：`this.$props` 是 `Map` 类型，需要使用 `this.$props["propName"]` 来访问
- 组合式 API：可以使用 `.` 点操作符来访问
- 默认情况下，父组件传递的，但没有被子组件解析为 props 的 attributes 绑定会被“透传”。这意味着当我们有一个单根节点的子组件时，这些绑定会被作为一个常规的 attribute 应用在子组件的根节点元素上，可以通过 `inheritAttrs` 选项来关闭该行为，[详见](./options-api.md#inheritattrs)
:::

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/props/props-options

> 组合式 API

```vue
<template>
  <view class="page">
    <array-literal :str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <object-type str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <same-name-prop-default-value />
    <props-with-defaults />
    <!-- #ifdef APP-ANDROID -->
    <reference-types :list="[1,2,3]" />
    <!-- #endif -->
    <!-- #ifndef APP-ANDROID -->
    <reference-types :list="['a','b','c']" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
  import ArrayLiteral from './array-literal-composition.uvue'
  import ObjectType from "./object-type-composition.uvue";
  import SameNamePropDefaultValue from "./same-name-prop-default-value-composition.uvue";
  import PropsWithDefaults from "./props-with-defaults.uvue";
  import ReferenceTypes from './reference-types-composition.uvue'

  const str = 'str'
  const num = 10
  const bool = true
  const obj = { age: 18 }
  const arr = ['a', 'b', 'c']
</script>
```

> 选项式 API

```vue
<template>
  <view class="page">
    <array-literal :str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <object-type str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <same-name-prop-default-value />
    <props-with-defaults />
    <!-- #ifdef APP-ANDROID -->
    <reference-types :list="[1,2,3]" />
    <!-- #endif -->
    <!-- #ifndef APP-ANDROID -->
    <reference-types :list="['a','b','c']" />
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
  import ArrayLiteral from './array-literal-options.uvue'
  import ObjectType from "./object-type-options.uvue";
  import SameNamePropDefaultValue from "./same-name-prop-default-value-options.uvue";
  import PropsWithDefaults from "./props-with-defaults.uvue";
  import ReferenceTypes from './reference-types-options.uvue'

  export default {
    components: {
      ArrayLiteral,
      ObjectType,
      SameNamePropDefaultValue,
      PropsWithDefaults,
      ReferenceTypes
    },
    data() {
      return {
        str: 'str',
        num: 10,
        bool: true,
        obj: { age: 18 },
        arr: ['a', 'b', 'c']
      }
    },
  }
</script>
```

:::

#### 向组件传递回调函数 @transfer-component-method

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/emit-function/emit-function-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/emit-function/emit-function-options

> 组合式 API

```vue
<template>
  <view class="page">
    <view class="row">
      <text>子组件传的参数</text>
      <text id="value">
        {{ value }}
      </text>
    </view>
    <child @callback="callback"></child>
  </view>
</template>

<script setup lang="uts">
import child from './child-composition.uvue'

const value = ref('')

const callback = (str: string) => {
  value.value = str
}
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
```

> 选项式 API

```vue
<template>
  <view class="page">
    <view class="row">
      <text>子组件传的参数</text>
      <text id="value">
        {{ value }}
      </text>
    </view>
    <child @callback="callback"></child>
  </view>
</template>

<script>
import child from './child-options.uvue'

export default {
  components: {
    child
  },
  data () {
    return {
      value: ""
    }
  },
  methods: {
    callback (str: string) {
      this.value = str
    }
  }
}
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>

```

:::

#### 使用 `provide/inject` 来向下传递参数 @provide-inject

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/provide/provide-options-1.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/provide/provide-options-1

> 组合式 API

```vue
<template>
  <view class="page">
    <inject-comp />
  </view>
</template>

<script setup lang="uts">
import InjectComp from '../inject/inject-composition.uvue';

provide('msg', 'hello');
provide('num', 0);
provide('obj', { a: 1 });
provide('arr', [1, 2, 3]);
provide('fn', () : string => 'hello');
</script>

```

> 选项式 API

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <text>provide page</text>
      <button class="mt-10" @click="goProvidePage2">
        跳转函数方式定义 provide 示例
      </button>
      <ComponentForInject />
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
import ComponentForInject from '../inject/inject-options-1.uvue'

export default {
  components: {
    ComponentForInject
  },
  data(){
    return {
      title: '字面量方式定义 provide page title',
      obj: {
        title: 'data obj.title',
        content: 'data obj.content'
      },
    }
  },
  provide: {
    providePageStr: '字面量方式定义 provide page str',
    providePageNum: 1,
    providePageBool: true,
    providePageObject: {
      title: '字面量方式定义 provide page object title',
      content: '字面量方式定义 provide page object content'
    },
    providePageArr: ['字面量方式定义 provide page arr'],
    providePageMap: new Map<string, string>([['key', '字面量方式定义 provide page map']]),
    providePageSet: new Set<string>(['字面量方式定义 provide page set']),
  },
  methods: {
    goProvidePage2(){
      uni.navigateTo({
        url: '/pages/component-instance/provide/provide-options-2'
      })
    }
  },
}
</script>

```

:::

#### 使用 [全局变量与状态管理](../tutorial/store.md) @global-store

> store/index.uts [文件详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/store/index.uts)

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/examples/nested-component-communication/nested-component-communication-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/examples/nested-component-communication/nested-component-communication-options

> 组合式 API

```vue
<template>
  <view class="page">
    <view class="flex-row">
      父组件:
      <text class="parent-msg">{{ msg }}</text>
    </view>
    <button class="parent-btn" @click="change">父组件改变数据</button>
    <child />
  </view>
</template>

<script setup lang="uts">
import child from './components/child.uvue'
import { setComponentMsg, state } from '@/store/index.uts'

const msg = computed<number>((): number => state.componentMsg)

const change = () => {
  setComponentMsg(state.componentMsg + 1)
}
</script>
```

> 选项式 API

```vue
<template>
  <view class="page">
    <view class="flex-row">
      父组件:
      <text class="parent-msg">{{ msg }}</text>
    </view>
    <button class="parent-btn" @click="change">父组件改变数据</button>
    <child></child>
  </view>
</template>

<script>
import child from './components/child.uvue'
import { setComponentMsg, state } from '@/store/index.uts'
export default {
  components: {
    child
  },
  computed: {
    msg(): number {
      return state.componentMsg
    }
  },
  methods: {
    change() {
      setComponentMsg(state.componentMsg + 1)
    }
  }
}
</script>

```

:::

#### 在 `main.uts` 中使用 `app.config.globalProperties`

如在 `main.uts` 中的 `createApp` 方法中使用：
```ts
app.config.globalProperties.globalPropertiesReactiveObj = reactive({
  str: 'default reactive string',
  num: 0,
  bool: false,
} as UTSJSONObject)
```

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/app-instance/globalProperties/globalProperties-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/app-instance/globalProperties/globalProperties-options

> 组合式 API

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
    <!-- #endif -->
    <view class="uni-padding-wrap">
      <text class="mt-10"
        >globalProperties string: {{ globalPropertiesStr }}</text
      >
      <text class="mt-10"
        >globalProperties number: {{ globalPropertiesNum }}</text
      >
      <text class="mt-10"
        >globalProperties boolean: {{ globalPropertiesBool }}</text
      >
      <text class="mt-10"
        >globalProperties object: {{ globalPropertiesObj }}</text
      >
      <text class="mt-10"
        >globalProperties null: {{ globalPropertiesNull }}</text
      >
      <text class="mt-10"
        >globalProperties array: {{ globalPropertiesArr }}</text
      >
      <text class="mt-10"
        >globalProperties set: {{ globalPropertiesSet }}</text
      >
      <text class="mt-10"
        >globalProperties map: {{ globalPropertiesMap }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.str:
        {{ globalPropertiesReactiveObj['str'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.num:
        {{ globalPropertiesReactiveObj['num'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.boolean:
        {{ globalPropertiesReactiveObj['bool'] }}</text
      >
      <text class="mt-10"
        >globalProperties fun 返回值: {{ globalPropertiesFn() }}</text
      >
      <button @click="updateGlobalProperties" class="mt-10">
        update globalProperties
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
type MyGlobalProperties = {
	str : string;
	num : number;
	bool : boolean;
	obj : UTSJSONObject;
	null : string | null;
	arr : number[];
	set : string[];
	map : UTSJSONObject;
	reactiveObj : UTSJSONObject;
  globalPropertiesFnRes: string;
}

const myGlobalProperties = reactive<MyGlobalProperties>({
	str: '',
	num: 0,
	bool: false,
	obj: {},
	null: null,
	arr: [] as number[],
	set: [] as string[],
	map: {},
	reactiveObj: {
		str: '',
		num: 0,
		bool: false,
	},
  globalPropertiesFnRes: '',
} as MyGlobalProperties)

const instance = getCurrentInstance()!.proxy!
const getGlobalProperties = () => {
	myGlobalProperties.str = instance.globalPropertiesStr
	myGlobalProperties.num = instance.globalPropertiesNum
	myGlobalProperties.bool = instance.globalPropertiesBool
	myGlobalProperties.obj = instance.globalPropertiesObj
	myGlobalProperties.null = instance.globalPropertiesNull
	myGlobalProperties.arr = instance.globalPropertiesArr
	myGlobalProperties.set = []
	instance.globalPropertiesSet.forEach(item => {
		myGlobalProperties.set.push(item)
	})
	myGlobalProperties.map = {}
	instance.globalPropertiesMap.forEach((value: number, key: string) => {
		myGlobalProperties.map[key] = value
	})
	myGlobalProperties.reactiveObj = instance.globalPropertiesReactiveObj
	myGlobalProperties.globalPropertiesFnRes = instance.globalPropertiesFn()
}

setTimeout(() => {
  // 等待 globalProperties-options resetGlobalProperties 完成
	getGlobalProperties()
}, 1000)

const updateGlobalProperties = () => {
	instance.globalPropertiesStr = 'new string'
	instance.globalPropertiesNum = 100
	instance.globalPropertiesBool = true
	instance.globalPropertiesObj = {
		str: 'new globalProperties obj string',
		num: 100,
		bool: true,
	}
	instance.globalPropertiesNull = 'not null'
	instance.globalPropertiesArr = [1, 2, 3]
	instance.globalPropertiesSet = new Set(['a', 'b', 'c'])
	instance.globalPropertiesMap = new Map([['a', 1], ['b', 2], ['c', 3]])
	instance.globalPropertiesReactiveObj['str'] = 'new reactive string'
	instance.globalPropertiesReactiveObj['num'] = 200
	instance.globalPropertiesReactiveObj['bool'] = true
	getGlobalProperties()
}

defineExpose({
  myGlobalProperties,
  updateGlobalProperties
})
</script>

<style>
.uni-padding-wrap {
  padding: 10px 10px 40px 10px;
}
</style>

```

> 选项式 API

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
    <!-- #endif -->
    <view class="uni-padding-wrap">
      <text class="mt-10"
        >globalProperties string: {{ globalPropertiesStr }}</text
      >
      <text class="mt-10"
        >globalProperties number: {{ globalPropertiesNum }}</text
      >
      <text class="mt-10"
        >globalProperties boolean: {{ globalPropertiesBool }}</text
      >
      <text class="mt-10"
        >globalProperties object: {{ globalPropertiesObj }}</text
      >
      <text class="mt-10"
        >globalProperties null: {{ globalPropertiesNull }}</text
      >
      <text class="mt-10"
        >globalProperties array: {{ globalPropertiesArr }}</text
      >
      <text class="mt-10"
        >globalProperties set: {{ globalPropertiesSet }}</text
      >
      <text class="mt-10"
        >globalProperties map: {{ globalPropertiesMap }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.str:
        {{ globalPropertiesReactiveObj['str'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.num:
        {{ globalPropertiesReactiveObj['num'] }}</text
      >
      <text class="mt-10"
        >globalProperties reactiveObj.boolean:
        {{ globalPropertiesReactiveObj['bool'] }}</text
      >
      <text class="mt-10"
        >globalProperties fun 返回值: {{ globalPropertiesFn() }}</text
      >
      <button @click="updateGlobalProperties" class="mt-10">
        update globalProperties
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
type MyGlobalProperties = {
	str : string;
	num : number;
	bool : boolean;
	obj : UTSJSONObject;
	null : string | null;
	arr : number[];
	set : string[];
	map : UTSJSONObject;
	reactiveObj : UTSJSONObject;
	globalPropertiesFnRes: string
}
export default {
	data() {
		return {
			myGlobalProperties: {
				str: '',
				num: 0,
				bool: false,
				obj: {},
				null: null,
				arr: [],
				set: [],
				map: {},
				reactiveObj: {
					str: '',
					num: 0,
					bool: false,
				} as UTSJSONObject,
				globalPropertiesFnRes: '',
			} as MyGlobalProperties,
		}
	},
	onLoad() {
		this.getGlobalProperties()
	},
	onUnload(){
		this.resetGlobalProperties()
	},
	methods: {
		getGlobalProperties() {
			this.myGlobalProperties.str = this.globalPropertiesStr
			this.myGlobalProperties.num = this.globalPropertiesNum
			this.myGlobalProperties.bool = this.globalPropertiesBool
			this.myGlobalProperties.obj = this.globalPropertiesObj
			this.myGlobalProperties.null = this.globalPropertiesNull
			this.myGlobalProperties.arr = this.globalPropertiesArr
			this.myGlobalProperties.set = []
			this.globalPropertiesSet.forEach(item => {
				this.myGlobalProperties.set.push(item)
			})
			this.myGlobalProperties.map = {}
			this.globalPropertiesMap.forEach((value: number, key: string) => {
				this.myGlobalProperties.map[key] = value
			})
			this.myGlobalProperties.reactiveObj = this.globalPropertiesReactiveObj
			this.myGlobalProperties.globalPropertiesFnRes = this.globalPropertiesFn()
		},
		resetGlobalProperties() {
			this.globalPropertiesStr = 'default string'
			this.globalPropertiesNum = 0
			this.globalPropertiesBool = false
			this.globalPropertiesObj = {
				str: 'default globalProperties obj string',
				num: 0,
				bool: false,
			}
			this.globalPropertiesNull = null
			this.globalPropertiesArr = []
			this.globalPropertiesSet = new Set()
			this.globalPropertiesMap = new Map()
			this.globalPropertiesReactiveObj['str'] = 'default reactive string'
			this.globalPropertiesReactiveObj['num'] = 0
			this.globalPropertiesReactiveObj['bool'] = false
		},
		updateGlobalProperties() {
			this.globalPropertiesStr = 'new string'
			this.globalPropertiesNum = 100
			this.globalPropertiesBool = true
			this.globalPropertiesObj = {
				str: 'new globalProperties obj string',
				num: 100,
				bool: true,
			}
			this.globalPropertiesNull = 'not null'
			this.globalPropertiesArr = [1, 2, 3]
			this.globalPropertiesSet = new Set(['a', 'b', 'c'])
			this.globalPropertiesMap = new Map([['a', 1], ['b', 2], ['c', 3]])
			this.globalPropertiesReactiveObj['str'] = 'new reactive string'
			this.globalPropertiesReactiveObj['num'] = 200
			this.globalPropertiesReactiveObj['bool'] = true
			this.getGlobalProperties()
		}
	},
}
</script>

<style>
.uni-padding-wrap {
  padding: 10px 10px 40px 10px;
}
</style>

```

:::


### 父组件与子组件通信 @parent-child-communication

上述 [页面与组件通信](#page-component-communication) 方法同样适用于父组件与子组件通信。

### 页面调用组件方法 @page-call-component-method

#### 调用 `easycom` 组件方法 @call-easycom-component-method

> 在调用组件方法的时候如报错 `error: Reference has a nullable type` 则需要使用 `?.` 操作符（如：a?.b?.()）。

easycom组件，用法和内置组件一样。也是使用 `this.$refs` 获取组件并转换为组件的类型，通过 `.`操作符 调用组件方法或设置属性。

**语法**

```(this.$refs['组件ref属性值'] as 驼峰ComponentPublicInstance)?.foo?.();```

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/methods/call-method-easycom-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/methods/call-method-easycom-options

> 组合式 API

```vue
<template>
  <view>
    <call-easy-method ref="callEasyMethod1"></call-easy-method>
    <custom-call-easy-method ref="customCallEasyMethod1"></custom-call-easy-method>
    <test-getter-setter-composition ref="getterAndSetterComposition"></test-getter-setter-composition>
    <!-- #ifndef VUE3-VAPOR -->
    <test-getter-setter-options ref="getterAndSetterOptions"></test-getter-setter-options>
    <!-- #endif -->
    <view>
        <text>getter-setter: <text id="getterAndSetter">{{JSON.stringify(getterAndSetterResult)}}</text></text>
    </view>
  </view>
</template>

<script setup lang="uts">
const callEasyMethod1 = ref<CallEasyMethodComponentPublicInstance | null>(null)
const customCallEasyMethod1 = ref<CustomCallEasyMethodComponentPublicInstance | null>(null)

const callMethod = () => {
  // 调用组件的 foo 方法
  customCallEasyMethod1.value?.foo?.()
}

const callMethod1 = () => {
  // 调用组件的 foo1 方法
  callEasyMethod1.value?.foo1?.()
}

const callMethod2 = () => {
  // 调用组件的 foo2 方法并传递 1个参数
  callEasyMethod1.value?.foo2?.(Date.now())
}

const callMethod3 = () => {
  // 调用组件的 foo3 方法并传递 2个参数
  callEasyMethod1.value?.foo3?.(Date.now(), Date.now())
}

const callMethod4 = () => {
  // 调用组件的 foo4 方法并传递 callback
  callEasyMethod1.value?.foo4?.(() => {
    console.log('callback')
  })
}

const callMethod5 = () => {
  // 注意： 返回值可能为 null，当前例子一定不为空，所以加了 !
  const result = callEasyMethod1.value?.foo5?.('string1') as string
  console.log(result) // string1
}

const callMethodTest = (text: string): string | null => {
  const result = callEasyMethod1.value?.foo5?.(text) as string
  return result
}

const callCustomMethodTest = (): string | null => {
  const result = customCallEasyMethod1.value?.foo?.() as string
  return result
}

const getterAndSetterComposition = ref<TestGetterSetterCompositionComponentPublicInstance | null>(null)
// #ifndef VUE3-VAPOR
const getterAndSetterOptions = ref<TestGetterSetterOptionsComponentPublicInstance | null>(null)
// #endif
const getterAndSetterResult = ref<number[]>([])

const callGetterAndSetterCompositionGetCount = (): number => {
    return getterAndSetterComposition.value!.getCount()
}
const callGetterAndSetterCompositionGetCountWithCallMethod = (): number => {
    return getterAndSetterComposition.value!.$callMethod('getCount') as number
}
// #ifndef VUE3-VAPOR
const callGetterAndSetterOptionsGetCount = (): number => {
    return getterAndSetterOptions.value!.getCount()
}
const callGetterAndSetterOptionsGetCountWithCallMethod = (): number => {
    return getterAndSetterOptions.value!.$callMethod('getCount') as number
}
// #endif
const callGetterAndSetterCompositionSetCount = (count: number) => {
    getterAndSetterComposition.value!.setCount(count)
}
const callGetterAndSetterCompositionSetCountWithCallMethod = (count: number) => {
    getterAndSetterComposition.value!.$callMethod('setCount', count)
}
// #ifndef VUE3-VAPOR
const callGetterAndSetterOptionsSetCount = (count: number) => {
    getterAndSetterOptions.value!.setCount(count)
}
const callGetterAndSetterOptionsSetCountWithCallMethod = (count: number) => {
    getterAndSetterOptions.value!.$callMethod('setCount', count)
}
// #endif

const callGetterAndSetter = (): number[] => {
    const result: number[] = []
    callGetterAndSetterCompositionSetCount(1)
    result.push(callGetterAndSetterCompositionGetCount())
    callGetterAndSetterCompositionSetCountWithCallMethod(2)
    result.push(callGetterAndSetterCompositionGetCountWithCallMethod())
    // #ifndef VUE3-VAPOR
    callGetterAndSetterOptionsSetCount(3)
    result.push(callGetterAndSetterOptionsGetCount())
    callGetterAndSetterOptionsSetCountWithCallMethod(4)
    result.push(callGetterAndSetterOptionsGetCountWithCallMethod())
    // #endif
    getterAndSetterResult.value = result
    return result
}
const delay = (): Promise<string> =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

const call = async (): Promise<void> => {
  callGetterAndSetter()
  callMethod()
  callMethod1()
  await delay()
  callMethod2()
  await delay()
  callMethod3()
  await delay()
  callMethod4()
  await delay()
  callMethod5()
}

onReady(() => {
  call()
})

defineExpose({
  callMethodTest,
  callCustomMethodTest
})
</script>
```

> 选项式 API

```vue
<template>
  <view>
    <call-easy-method ref="callEasyMethod1"></call-easy-method>
    <custom-call-easy-method ref="customCallEasyMethod1"></custom-call-easy-method>
    <test-getter-setter-composition ref="getterAndSetterComposition"></test-getter-setter-composition>
    <test-getter-setter-options ref="getterAndSetterOptions"></test-getter-setter-options>
    <view>
        <text>getter-setter: <text id="getterAndSetter">{{JSON.stringify(getterAndSetterResult)}}</text></text>
    </view>
  </view>
</template>

<script lang="uts">
const delay = (): Promise<string> =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

export default {
  data() {
    return {
      callEasyMethod1: null as CallEasyMethodComponentPublicInstance | null,
      customCallEasyMethod1: null as CustomCallEasyMethodComponentPublicInstance | null,
      getterAndSetterComposition: null as TestGetterSetterCompositionComponentPublicInstance | null,
      getterAndSetterOptions: null as TestGetterSetterOptionsComponentPublicInstance | null,
      getterAndSetterResult: [] as number[]
    }
  },
  onReady() {
    // 通过组件 ref 属性获取组件实例, 组件标签名首字母大写，驼峰+ComponentPublicInstance
    this.callEasyMethod1 = this.$refs['callEasyMethod1'] as CallEasyMethodComponentPublicInstance
    this.customCallEasyMethod1 = this.$refs['customCallEasyMethod1'] as CustomCallEasyMethodComponentPublicInstance
    
    this.getterAndSetterComposition = this.$refs['getterAndSetterComposition'] as TestGetterSetterCompositionComponentPublicInstance
    this.getterAndSetterOptions = this.$refs['getterAndSetterOptions'] as TestGetterSetterOptionsComponentPublicInstance
    this.call()
  },
  methods: {
    async call(): Promise<void> {
      this.callGetterAndSetter()
      this.callCustomMethod()
      this.callMethod1()
      await delay()
      this.callMethod2()
      await delay()
      this.callMethod3()
      await delay()
      this.callMethod4()
      await delay()
      this.callMethod5()
    },
    callMethod1() {
      // 调用组件的 foo1 方法
      this.callEasyMethod1?.foo1?.()
    },
    callMethod2() {
      // 调用组件的 foo2 方法并传递 1个参数
      this.callEasyMethod1?.foo2?.(Date.now())
    },
    callMethod3() {
      // 调用组件的 foo3 方法并传递 2个参数
      this.callEasyMethod1?.foo3?.(Date.now(), Date.now())
    },
    callMethod4() {
      // 调用组件的 foo4 方法并传递 callback
      this.callEasyMethod1?.foo4?.(() => {
        console.log('callback')
      })
    },
    callMethod5() {
      // 注意： 返回值可能为 null，当前例子一定不为空，所以加了 !
      const result = this.callEasyMethod1?.foo5?.('string1') as string
      console.log(result) // string1
    },
    callMethodTest(text: string): string | null {
      const result = this.callEasyMethod1?.foo5?.(text) as string
      return result
    },
    callCustomMethod() {
      // 调用组件的 foo 方法
      this.customCallEasyMethod1?.foo?.()
    },
    callCustomMethodTest(): string | null {
      const result = this.customCallEasyMethod1?.foo?.() as string
      return result
    },
    callGetterAndSetter(): number[] {
        const result:number[] = []
        this.callGetterAndSetterCompositionSetCount(1)
        result.push(this.callGetterAndSetterCompositionGetCount())
        this.callGetterAndSetterCompositionSetCountWithCallMethod(2)
        result.push(this.callGetterAndSetterCompositionGetCountWithCallMethod())
        this.callGetterAndSetterOptionsSetCount(3)
        result.push(this.callGetterAndSetterOptionsGetCount())
        this.callGetterAndSetterOptionsSetCountWithCallMethod(4)
        result.push(this.callGetterAndSetterOptionsGetCountWithCallMethod())
        this.getterAndSetterResult = result
        return result
    },
    callGetterAndSetterCompositionGetCount(): number {
        return this.getterAndSetterComposition!.getCount()
    },
    callGetterAndSetterCompositionGetCountWithCallMethod(): number {
        return this.getterAndSetterComposition!.$callMethod('getCount') as number
    },
    callGetterAndSetterOptionsGetCount(): number {
        return this.getterAndSetterOptions!.getCount()
    },
    callGetterAndSetterOptionsGetCountWithCallMethod(): number {
        return this.getterAndSetterOptions!.$callMethod('getCount') as number
    },
    callGetterAndSetterCompositionSetCount(count: number) {
        this.getterAndSetterComposition!.setCount(count)
    },
    callGetterAndSetterCompositionSetCountWithCallMethod(count: number) {
        this.getterAndSetterComposition!.$callMethod('setCount', count)
    },
    callGetterAndSetterOptionsSetCount(count: number) {
        this.getterAndSetterOptions!.setCount(count)
    },
    callGetterAndSetterOptionsSetCountWithCallMethod(count: number) {
        this.getterAndSetterOptions!.$callMethod('setCount', count)
    }
  }
}
</script>
```

:::

##### 调用 `uni_modules easycom` 组件方法 <Badge text="HBuilderX 3.97+"/> @call-uni-modules-easycom-component-method

使用 `ref` 属性拿到组件实例，调用 `easycom` 组件方法时不需要使用 `$callMethod` 方法，直接使用点操作符即可 `.`

> 在调用组件方法的时候如报错 `error: Reference has a nullable type` 则需要使用 `?.` 操作符（如：a?.b?.()）。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/methods/call-method-easycom-uni-modules-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/methods/call-method-easycom-uni-modules-options

> 组合式 API

```vue
<template>
  <view>
    <call-easy-method-uni-modules ref="callEasyMethod1"></call-easy-method-uni-modules>
    <!-- #ifdef APP-ANDROID || APP-IOS || APP-HARMONY -->
    <!-- 在兼容组件中 ios 返回非普通对象数据，比如 Map 数据时候会被 jscore 统一处理为 object，和安卓产生了差异 -->
    <!-- 测试用例用来验证返回数据特殊，安卓和其他平台无此限制 -->
    <view>---</view>
    <test-props id="btn1" :numList="numList" :objList='objList' @buttonclick='onButtonClick'
      @numListChange='numListChange' @objListChange='objListChange'
      style="width: 80px;height: 30px;background-color: lightblue"></test-props>
    <view style="flex-direction: row ;">
      <text>isNumListValid: </text>
      <text id='isNumListValid'>{{isNumListValid}}</text>
    </view>
    <view style="flex-direction: row ;">
      <text>isObjListValid: </text>
      <text id='isObjListValid'>{{isObjListValid}}</text>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
  import { testInOtherFile } from './call-method-easycom-uni-modules'

  // #ifdef APP-ANDROID || APP-IOS
  import { PropsChangeEvent } from '@/uni_modules/test-props'
  // #endif

  const delay = () : Promise<string> =>
    new Promise((resolve, _) => {
      setTimeout(() => {
        resolve('')
      }, 1000)
    })

  const callEasyMethod1 = ref<CallEasyMethodUniModulesComponentPublicInstance | null>(null)

  const numList = ref<number[]>([1])   // 传递 props
  const objList = ref<any[]>([])
  const isNumListValid = ref(false)
  const isObjListValid = ref(false)


  const callMethod1 = () => {
    // 调用组件的 foo1 方法
    callEasyMethod1.value?.foo1?.()
  }
  const callMethod2 = () => {
    // 调用组件的 foo2 方法并传递 1个参数
    callEasyMethod1.value?.foo2?.(Date.now())
  }
  const callMethod3 = () => {
    // 调用组件的 foo3 方法并传递 2个参数
    callEasyMethod1.value?.foo3?.(Date.now(), Date.now())
  }
  const callMethod4 = () => {
    // 调用组件的 foo4 方法并传递 callback
    callEasyMethod1.value?.foo4?.(() => {
      console.log('callback')
    })
  }
  const callMethod5 = () => {
    // 注意： 返回值可能为 null，当前例子一定不为空，所以加了 !
    const result = callEasyMethod1.value?.foo5?.('string5') as string
    console.log(result) // string1
  }
  const callMethodTest = (text : string) : string | null => {
    const result = callEasyMethod1.value?.foo5?.(text) as string
    return result
  }
  const callMethodInOtherFile = (text : string) : string => {
    return testInOtherFile(callEasyMethod1.value!, text)
  }

  // #ifdef APP-ANDROID
  const numListChange = (res : Map<string, Map<string, any>>) => {
    const value = res['detail']!['value'] as number[]
    const isArray = Array.isArray(value)
    const isLengthGt0 = value.length > 0
    isNumListValid.value = isArray && isLengthGt0
  }
  // #endif

  // #ifdef APP-IOS || APP-HARMONY
  const numListChange = (res : any) => {
    const value = res['detail']!['value'] as number[]
    const isArray = Array.isArray(value)
    const isLengthGt0 = value.length > 0
    isNumListValid.value = isArray && isLengthGt0
  }
  // #endif


  // #ifdef APP-ANDROID
  const objListChange = (res : Map<string, Map<string, any>>) => {
    const value = res['detail']!['value'] as any[]
    const isArray = Array.isArray(value)
    const isLengthGt0 = value.length > 0
    isObjListValid.value = isArray && isLengthGt0
  }
  // #endif

  // #ifdef APP-IOS || APP-HARMONY
  const objListChange = (res : any) => {
    const value = res['detail']!['value'] as any[]
    const isArray = Array.isArray(value)
    const isLengthGt0 = value.length > 0
    isObjListValid.value = isArray && isLengthGt0
  }
  // #endif


  const onButtonClick = () => {
    // 改变 props: 观察 props 返回值为非响应式值
    numList.value = [3, 2, 1]
    objList.value = [{ id: '3' }, { id: '4' }]
  }


  const call = async () : Promise<void> => {
    callMethod1()
    await delay()
    callMethod2()
    await delay()
    callMethod3()
    await delay()
    callMethod4()
    await delay()
    callMethod5()
  }

  onReady(() => {
    call()
  })

  defineExpose({
    callMethodTest,
    callMethodInOtherFile,
    onButtonClick
  })
</script>

```

> 选项式 API

```vue
<template>
  <view>
    <call-easy-method-uni-modules ref="callEasyMethod1"></call-easy-method-uni-modules>

    <!-- #ifdef APP-IOS || APP-ANDROID || APP-HARMONY -->
    <!-- 在兼容组件中 ios 返回非普通对象数据，比如 Map 数据时候会被 jscore 统一处理为 object，和安卓产生了差异 -->
    <!-- 测试用例用来验证返回数据特殊，安卓和其他平台无此限制 -->
    <view>---</view>
    <test-props id="btn1" :numList="numList" :objList='objList' @buttonclick='onButtonClick'
      @numListChange='numListChange' @objListChange='objListChange'
      style="width: 80px;height: 30px;background-color: lightblue"></test-props>
    <view style="flex-direction: row ;">
      <text>isNumListValid: </text>
      <text id='isNumListValid'>{{isNumListValid}}</text>
    </view>
    <view style="flex-direction: row ;">
      <text>isObjListValid: </text>
      <text id='isObjListValid'>{{isObjListValid}}</text>
    </view>
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
  import { testInOtherFile } from './call-method-easycom-uni-modules'

  const delay = () : Promise<string> =>
    new Promise((resolve, _) => {
      setTimeout(() => {
        resolve('')
      }, 1000)
    })

  export default {
    data() {
      return {
        callEasyMethod1: null as CallEasyMethodUniModulesComponentPublicInstance | null,
        isWatched: false,
        changeTimes: 0,
        numList: [1] as number[], // 传递 props
        objList: [] as any[],
        isNumListValid: false,
        isObjListValid: false
      }
    },
    onReady() {
      // 通过组件 ref 属性获取组件实例, 组件标签名首字母大写，驼峰+ComponentPublicInstance
      this.callEasyMethod1 = this.$refs['callEasyMethod1'] as CallEasyMethodUniModulesComponentPublicInstance

      this.call()
    },
    methods: {
      async call() : Promise<void> {
        this.callMethod1()
        await delay()
        this.callMethod2()
        await delay()
        this.callMethod3()
        await delay()
        this.callMethod4()
        await delay()
        this.callMethod5()

      },
      callMethod1() {
        // 调用组件的 foo1 方法
        this.callEasyMethod1?.foo1?.()
      },
      callMethod2() {
        // 调用组件的 foo2 方法并传递 1个参数
        this.callEasyMethod1?.foo2?.(Date.now())
      },
      callMethod3() {
        // 调用组件的 foo3 方法并传递 2个参数
        this.callEasyMethod1?.foo3?.(Date.now(), Date.now())
      },
      callMethod4() {
        // 调用组件的 foo4 方法并传递 callback
        this.callEasyMethod1?.foo4?.(() => {
          console.log('callback')
        })
      },
      callMethod5() {
        // 注意： 返回值可能为 null，当前例子一定不为空，所以加了 !
        const result = this.callEasyMethod1?.foo5?.('string5') as string
        console.log(result) // string1
      },
      callMethodTest(text : string) : string | null {
        const result = this.callEasyMethod1?.foo5?.(text) as string
        return result
      },
      callMethodInOtherFile(text : string) : string {
        return testInOtherFile(this.callEasyMethod1!, text)
      },

      // #ifdef APP-ANDROID
      numListChange(res : Map<string, Map<string, any>>) {
        const value = res['detail']!['value'] as number[]
        const isArray = Array.isArray(value)
        const isLengthGt0 = value.length > 0
        this.isNumListValid = isArray && isLengthGt0
      },
      // #endif
      // #ifdef APP-IOS || APP-HARMONY
      numListChange(res : any) {
        const value = res['detail']!['value'] as number[]
        const isArray = Array.isArray(value)
        const isLengthGt0 = value.length > 0
        this.isNumListValid = isArray && isLengthGt0
      },
      // #endif

      // #ifdef APP-ANDROID
      objListChange(res : Map<string, Map<string, any>>) {
        const value = res['detail']!['value'] as number[]
        const isArray = Array.isArray(value)
        const isLengthGt0 = value.length > 0
        this.isObjListValid = isArray && isLengthGt0
      },
      // #endif
      // #ifdef APP-IOS || APP-HARMONY
      objListChange(res : any) {
        const value = res['detail']!['value'] as number[]
        const isArray = Array.isArray(value)
        const isLengthGt0 = value.length > 0
        this.isObjListValid = isArray && isLengthGt0
      },
      // #endif
      onButtonClick() {
        // 改变 props: 观察 props 返回值为非响应式值
        console.log('button click');
        this.numList = [3, 2, 1]
        this.objList = [{ id: '3' }, { id: '4' }]
      }
    }
  }
</script>

```

:::

#### 使用 `ref` 属性搭配 `$callMethod` 方法 @call-component-method

如果不是内置组件，也不是easycom组件，那么无法使用`.`操作符了。

此时需使用 `this.$refs` 获取组件实例，然后通过 `$callMethod` 调用组件的方法。也就是把组件的方法名、参数，当做callMethod的参数来传递。此时也就没有`.`操作符那样的代码提示和校验了。

callMethod可用于所有自定义组件，包括easycom组件也可以使用，只不过easycom组件有更简单的用法。

**语法**

```(this.$refs['组件ref属性值'] as ComponentPublicInstance)?.$callMethod('方法名', ...args)```

**组件类型**

ComponentPublicInstance

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/parent/parent-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/parent/parent-options

> 组合式 API

```vue
<template>
  <view class="page">
    <child ref="childRef" />
  </view>
</template>

<script setup lang="uts">
  import Child from './child-composition.uvue'

  const childRef = ref<ComponentPublicInstance | null>(null)
  const str = ref('parent str')
  const num = ref(1)

  const getNum = () : number => { return num.value }

  const instance = getCurrentInstance()!.proxy!

  const callMethodByChild = () : number => {
    const childComponent = instance.$refs['childRef'] as ComponentPublicInstance
    return childComponent.$parent!.$callMethod('getNum') as number
  }

  defineExpose({
    str,
    getNum,
    callMethodByChild
  })
</script>
```

> 选项式 API

```vue
<template>
  <view class="page">
    <child ref='child' />
  </view>
</template>

<script lang='uts'>
import child from './child-options.uvue'

export default {
  components: {
    child
  },
  data() {
    return {
      str: "parent str",
      num: 1
    }
  },
  methods: {
    getNum() : number {
      return this.num
    },
    callMethodByChild(): number {
      const child = this.$refs['child'] as ComponentPublicInstance
      return child.$parent!.$callMethod('getNum') as number
    }
  }
}
</script>

```

:::

**注意：**
- App-Android 平台 `4.0` 版本开始支持 `$callMethod` 调用 `defineExpose` 导出的方法
- Web 平台、App-iOS 平台 `4.13` 版本开始支持 `$callMethod` 调用 `defineExpose` 导出的方法
- 小程序 平台 支持 `$callMethod` 调用 `defineExpose` 导出的方法
- `<script setup>`下的变量名不能和 easycom 组件的驼峰写法重复，比如：组件名为`test-canvas`，那么不能在`<script setup>`中定义`const testCanvas`变量名。
- `$callMethod` 调用性能低于easycom组件的强类型调用，如果遇到高频调用场景，建议使用easycom组件的强类型调用方法。

#### 内置组件的方法调用或设置属性 <Badge text="HBuilderX 3.93+"/> @call-builtin-component-method

使用 `this.$refs` 获取组件并as转换为组件对应的element类型，通过 `.`操作符 调用组件方法或设置属性。

**语法**

```(this.$refs['组件ref属性值'] as Uni[xxx]Element)?.foo?.();```

**内置组件的element类型规范**

Uni`组件名(驼峰)`Element

如：

`<button>`: UniButtonElement
`<picker-view>`: UniPickerViewElement


示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/methods/call-method-uni-element-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/methods/call-method-uni-element-options

> 组合式 API

```vue
<template>
  <view>
    <slider :show-value="true" ref="sliderRef"></slider>
  </view>
</template>

<script setup lang="uts">
const sliderRef = ref<UniSliderElement | null>(null)

onReady(() => {
  sliderRef.value!.value = 80
})

const callMethodTest = (text: string): string | null => {
  sliderRef.value?.setAttribute('str', text)
  const result = sliderRef.value?.getAttribute('str') as string
  return result
}

defineExpose({
  callMethodTest
})
</script>
```

> 选项式 API

```vue
<template>
  <view>
    <slider :show-value="true" ref="slider1"></slider>
  </view>
</template>

<script>
export default {
  data() {
    return {
      slider1: null as UniSliderElement | null
    }
  },
  onReady() {
    // 通过组件 ref 属性获取组件实例, Uni组件名(驼峰)UniElement
    this.slider1 = this.$refs['slider1'] as UniSliderElement;
    this.setValue()
  },
  methods: {
    setValue() {
      this.slider1!.value = 80
    },
    callMethodTest(text: string): string | null {
      this.slider1?.setAttribute('str', text);
      const result = this.slider1?.getAttribute('str') as string;
      return result;
    },
  }
}
</script>

```

:::

**bug&tips**

- 目前uts组件，即封装原生ui给uni-app或uni-app x的页面中使用，类型与内置组件的 Uni`组件名(驼峰)`Element 方式相同。目前没有代码提示。

### 组件监听应用、页面生命周期 @component-page-lifecycle

> 选项式 API 和 组合式 API 在监听页面生命周期时有所不同
>
> 比如选项式 API 中的 `onShow`、`onHide` 监听页面生命周期在组合式 API 中分别对应 `onPageShow`、`onPageHide`（在组合式 API 时会和 App 的生命周期冲突）
>
> 具体请查看 [页面生命周期](../page.md#lifecycle)

|组件中监听应用生命周期 |Android |HarmonyOS |iOS |Web |微信小程序 |
|:-:			          |:-:		 |:-:		    |:-: |:-:	 |:-:		  |
|onAppHide          |4.11    |x         |x   |4.11 |x        |
|onAppShow          |4.11    |x         |x   |4.11 |x        |

::: warning 注意
 `onPageHide`、`onPageShow` 需要写在选项式的 setup 函数或者组合式 `<script setup>` 中才能生效
:::

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/page/monitor-page-lifecycle-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/page/page-options

> 组合式 API

```vue
<script lang="uts" setup>
// #ifdef APP-ANDROID
onAppHide(() => {
	console.log('组件监听应用生命周期 => onAppHide')
})
onAppShow((onShowOptions: OnShowOptions) => {
	console.log('组件监听应用生命周期 => onAppShow => onShowOptions', onShowOptions)
})
// #endif

onPageShow(() => {
	console.log('组件监听页面生命周期 => onPageShow')
})
onPageHide(() => {
	console.log('组件监听页面生命周期 => onPageHide')
})
</script>

<template>
	<text>组件监听页面、应用生命周期（组合式 API）</text>
</template>
```

> 选项式 API

```vue
<script lang="uts">
export default {
	setup() {
		// #ifdef APP-ANDROID
		onAppHide(() => {
			console.log('组件监听应用生命周期 => onAppHide')
		})
		onAppShow((onShowOptions: OnShowOptions) => {
			console.log('组件监听应用生命周期 => onAppShow => onShowOptions', onShowOptions)
		})
		// #endif

		onPageShow(() => {
			console.log('组件监听页面生命周期 => onPageShow')
		})
		onPageHide(() => {
			console.log('组件监听页面生命周期 => onPageHide')
		})
	}
}
</script>

<template>组件监听页面、应用生命周期（选项式 API）</template>
```

:::

## 组件的生命周期 @component-lifecycle

### 组件生命周期（选项式 API）兼容性 @component-lifecycle-options-compatibility

|  | Web | 微信小程序 | Android | iOS | HarmonyOS | 描述 |
| :- | :- | :- | :- | :- | :- | :- |
| beforeCreate | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件实例初始化完成之后立即调用。<br/>在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。 |
| created | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件实例处理完所有与状态相关的选项后调用。<br/>在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。<br/>然而，此时挂载阶段还未开始，因此 $el 属性仍不可用。 |
| beforeMount | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件被挂载之前调用。<br/>相关的 render 函数首次被调用。<br/>当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。<br/>它即将首次执行 DOM 渲染过程。 |
| mounted | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件被挂载之后调用。<br/>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。<br/>如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。 |
| beforeUpdate | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用。<br/>数据更新时调用，发生在虚拟 DOM 打补丁之前。<br/>这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。 |
| updated | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件因为一个响应式状态变更而更新其 DOM 树之后调用。<br/>父组件的更新钩子将在其子组件的更新钩子之后调用。<br/>这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。<br/>如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。 |
| beforeUnmount | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在一个组件实例被卸载之前调用。<br/>当这个钩子被调用时，组件实例依然还保有全部的功能。 |
| unmounted | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在一个组件实例被卸载之后调用。<br/>可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。 |
| errorCaptured | 4.0 | 4.41 | x | x | x | 在捕获了后代组件传递的错误时调用。<br/>这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。<br/>这个钩子可以通过返回 false 来阻止错误继续向上传递。 |
| renderTracked | 4.0 | 4.41 | x | x | x | 在一个响应式依赖被组件的渲染作用追踪后调用。<br/>跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。<br/>此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。 |
| renderTriggered | 4.0 | 4.41 | x | x | x | 在一个响应式依赖被组件触发了重新渲染之后调用。<br/>当虚拟 DOM 重新渲染为 triggered.Similarly 为renderTracked，接收 debugger event 作为参数。<br/>此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。 |
| activated | 4.0 | x | 4.0 | 4.11 | 4.61 | 若组件实例是 \<KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用。<br/>keep-alive 组件激活时调用。 |
| deactivated | 4.0 | x | 4.0 | 4.11 | 4.61 | 若组件实例是 \<KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用。<br/>keep-alive 组件停用时调用。 |
| serverPrefetch | x | x | x | x | x | 当组件实例在服务器上被渲染之前要完成的异步函数。<br/>如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。 |

### 组件生命周期（组合式 API）兼容性 @component-lifecycle-composition-compatibility

|  | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) | 描述 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| onMounted() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。<br/>如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。 |
| onUpdated() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。 |
| onUnmounted() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - | 在一个组件实例被卸载之后调用。 |
| onBeforeMount() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - | 在挂载开始之前被调用：相关的 render 函数首次被调用。 |
| onBeforeUpdate() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - | 数据更新时调用，发生在虚拟 DOM 打补丁之前。<br/>这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。 |
| onBeforeUnmount() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - | 在一个组件实例被卸载之前调用。 |
| onErrorCaptured() | x | - | x | x | x | - | 注册一个钩子，在捕获了后代组件传递的错误时调用。 |
| onRenderTracked() | x | - | x | x | x | - | 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。 |
| onRenderTriggered() | x | - | x | x | x | - | 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。 |
| onActivated() | 4.0 | x | x | x | x | - | keep-alive 组件激活时调用。 |
| onDeactivated() | 4.0 | x | x | x | x | - | keep-alive 组件停用时调用。 |
| onServerPrefetch() | x | x | x | x | x | - | 注册一个异步函数，在组件实例在服务器上被渲染之前调用。<br/>如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。<br/>这个钩子仅会在服务端渲染中执行，可以用于执行一些仅存在于服务端的数据抓取过程。 |
| onRecycle() | x | x | x | x | x | 5.0 | 组件回收时的生命周期钩子 |
| onReuse() | x | x | x | x | x | 5.0 | 组件复用时的生命周期钩子 |

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/component/ChildComponentOptions.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/component/component-options

> 组合式 API

```vue
<template>
	<!-- #ifndef VUE3-VAPOR -->
  title: {{ title }}
	<!-- #endif -->
	<!-- #ifdef VUE3-VAPOR -->
	<text>title: {{ title }}</text>
	<!-- #endif -->
  <button class="component-lifecycle-btn mt-10" @click="updateTitle">
    updateTitle
  </button>
</template>

<script setup lang='uts'>
import { state, setLifeCycleNum } from '@/store/index.uts'

const title = ref('component for composition API lifecycle test')

const emit = defineEmits<{
  (e : 'updateIsScroll', val : boolean) : void
}>()

onLoad((_ : OnLoadOptions) => {
  console.log('child component composition onLoad')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 100)
})
onPageShow(() => {
  console.log('child component composition onPageShow')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onReady(() => {
  console.log('child component composition onReady')
  // 自动化测试
  // TODO: onReady 未触发
  setLifeCycleNum(state.lifeCycleNum + 10)
})

onPullDownRefresh(() => {
  console.log('child component composition onPullDownRefresh')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onPageScroll((_) => {
  console.log('child component composition onPageScroll')
  // 自动化测试
  emit('updateIsScroll', true)
})
onReachBottom(() => {
  console.log('child component composition onReachBottom')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onBackPress((_ : OnBackPressOptions) : boolean | null => {
  console.log('child component composition onBackPress')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 10)
  return null
})
onPageHide(() => {
  console.log('child component composition onPageHide')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 10)
})
onUnload(() => {
  console.log('child component composition onUnload')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 100)
})

onBeforeMount(() => {
  console.log('child component composition onBeforeMount')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 1)
  console.log('component for lifecycle test onBeforeMount')
})

onMounted(() => {
  console.log('child component composition onMounted')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 1)
  console.log('component for lifecycle test mounted')
})

onBeforeUpdate(() => {
  console.log('child component composition onBeforeUpdate')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 1)
  console.log('component for lifecycle test beforeUpdate')
})

onUpdated(() => {
  console.log('child component composition onUpdated')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 1)
  console.log('component for lifecycle test updated')
})

onBeforeUnmount(() => {
  console.log('child component composition onBeforeUnmount')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 1)
  console.log('component for lifecycle test beforeUnmount')
})

onUnmounted(() => {
  console.log('child component composition onUnmounted')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 1)
  console.log('component for lifecycle test unmounted')
})

onActivated(() => {
  console.log('child component composition onActivated')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 1)
  console.log('component for lifecycle test onActivated')
})
onDeactivated(() => {
  console.log('child component composition onDeactivated')
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 1)
  console.log('component for lifecycle test onDeactivated')
})

const updateTitle = () => {
  title.value = 'component for lifecycle test updated'
}
</script>

```

> 选项式 API

```vue
<template>
  title: {{ title }}
  <button class="component-lifecycle-btn mt-10" @click="updateTitle">
    updateTitle
  </button>
</template>

<script lang='uts'>
  import { state, setLifeCycleNum } from '@/store/index.uts';
  export default {
    name: 'OptionsAPIComponentLifecycle',
    data() {
      return {
        title: 'component for options API lifecycle test',
      };
    },
    beforeCreate() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test beforeCreate');
    },
    created() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test created');
    },
    beforeMount() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test beforeMount');
    },
    mounted() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test mounted');
    },
    beforeUpdate() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test beforeUpdate');
    },
    updated() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test updated');
    },
    beforeUnmount() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum - 1);
      console.log('component for lifecycle test beforeUnmount');
    },
    unmounted() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum - 1);
      console.log('component for lifecycle test unmounted');
    },
    activated() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test activated');
    },
    deactivated() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum - 1);
      console.log('component for lifecycle test deactivated');
    },
    methods: {
      updateTitle() {
        this.title = 'component for lifecycle test updated';
      },
    },
  };
</script>
```

:::

## 全局组件 @global-component

[详情见 app.component](./global-api.md#app-component)

## props

- 支持[对象方式](https://cn.vuejs.org/guide/components/props.html#props-declaration)声明。从 4.0+ 支持字符串数组方式声明。使用字符串数组方式声明时，所有 prop 类型均为 any | null。
- 仅支持直接在 `export default` 内部声明，不支持其他位置定义后，在 `export default` 中引用。
- 复杂数据类型需要通过 `PropType` 标记类型，[详见](https://cn.vuejs.org/guide/typescript/options-api.html#typing-component-props)。
- `type` 不支持使用自定义的构造函数。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/props/props-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/props/props-options
> 组合式 API

```vue
<template>
  <view class="page">
    <array-literal :str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <object-type str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <same-name-prop-default-value />
    <props-with-defaults />
    <!-- #ifdef APP-ANDROID -->
    <reference-types :list="[1,2,3]" />
    <!-- #endif -->
    <!-- #ifndef APP-ANDROID -->
    <reference-types :list="['a','b','c']" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
  import ArrayLiteral from './array-literal-composition.uvue'
  import ObjectType from "./object-type-composition.uvue";
  import SameNamePropDefaultValue from "./same-name-prop-default-value-composition.uvue";
  import PropsWithDefaults from "./props-with-defaults.uvue";
  import ReferenceTypes from './reference-types-composition.uvue'

  const str = 'str'
  const num = 10
  const bool = true
  const obj = { age: 18 }
  const arr = ['a', 'b', 'c']
</script>
```

> 选项式 API

```vue
<template>
  <view class="page">
    <array-literal :str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <object-type str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <same-name-prop-default-value />
    <props-with-defaults />
    <!-- #ifdef APP-ANDROID -->
    <reference-types :list="[1,2,3]" />
    <!-- #endif -->
    <!-- #ifndef APP-ANDROID -->
    <reference-types :list="['a','b','c']" />
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
  import ArrayLiteral from './array-literal-options.uvue'
  import ObjectType from "./object-type-options.uvue";
  import SameNamePropDefaultValue from "./same-name-prop-default-value-options.uvue";
  import PropsWithDefaults from "./props-with-defaults.uvue";
  import ReferenceTypes from './reference-types-options.uvue'

  export default {
    components: {
      ArrayLiteral,
      ObjectType,
      SameNamePropDefaultValue,
      PropsWithDefaults,
      ReferenceTypes
    },
    data() {
      return {
        str: 'str',
        num: 10,
        bool: true,
        obj: { age: 18 },
        arr: ['a', 'b', 'c']
      }
    },
  }
</script>
```

:::

## 透传 Attributes​

### Attributes 继承​
“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 `props` 或 `emits` 的 attribute 或者 `v-on` 事件监听器。最常见的例子就是 `class`、`style` 和 `id`。

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。举例来说，假如我们有一个 `<MyButton>` 组件，它的模板长这样：

```template
<!-- <MyButton> 的模板 -->
<button>Click Me</button>
```
一个父组件使用了这个组件，并且传入了 `class`：

```template
<MyButton class="large" />
```
最后渲染出的 DOM 结果是：

```html
<button class="large">Click Me</button>
```
这里，`<MyButton>` 并没有将 `class` 声明为一个它所接受的 prop，所以 `class` 被视作透传 attribute，自动透传到了 `<MyButton>` 的根元素上。

#### 对 class 和 style 的合并​
如果一个子组件的根元素已经有了 `class` 或 `style` attribute，它会和从父组件上继承的值合并。如果我们将之前的 `<MyButton>` 组件的模板改成这样：

```template
<!-- <MyButton> 的模板 -->
<button class="btn">Click Me</button>
```
则最后渲染出的 DOM 结果会变成：

```html
<button class="btn large">Click Me</button>
```
#### v-on 监听器继承​
同样的规则也适用于 v-on 事件监听器：

```template
<MyButton @click="onClick" />
```
`click` 监听器会被添加到 `<MyButton>` 的根元素，即那个原生的 `<button>` 元素之上。当原生的 `<button>` 被点击，会触发父组件的 `onClick` 方法。同样的，如果原生 `button` 元素自身也通过 `v-on` 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发。

#### 深层组件继承​
有些情况下一个组件会在根节点上渲染另一个组件。例如，我们重构一下 `<MyButton>`，让它在根节点上渲染 `<BaseButton>`：

```template
<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
<BaseButton />
```
此时 `<MyButton>` 接收的透传 attribute 会直接继续传给 `<BaseButton>`。

请注意：

1. 透传的 attribute 不会包含 `<MyButton>` 上声明过的 props 或是针对 `emits` 声明事件的 `v-on` 侦听函数，换句话说，声明过的 props 和侦听函数被 `<MyButton>`“消费”了。
2. 透传的 attribute 若符合声明，也可以作为 props 传入 `<BaseButton>`。

### 禁用 Attributes 继承​
如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`。

你也可以直接在 `<script setup>` 中使用 `defineOptions`：

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```
最常见的需要禁用 attribute 继承的场景就是 attribute 需要应用在根节点以外的其他元素上。通过设置 `inheritAttrs` 选项为 `false`，你可以完全控制透传进来的 attribute 被如何使用。

这些透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。

```template
<span>Fallthrough attribute: {{ $attrs }}</span>
```
这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`，`v-on` 监听器等等。

有几点需要注意：

- 和 `props` 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问。
- 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`。


### 多根节点的 Attributes 继承​
和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。

```template
<CustomLayout id="custom-layout" @click="changeValue" />
```
如果 `<CustomLayout>` 有下面这样的多根节点模板，由于 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告。

```template
<header>...</header>
<main>...</main>
<footer>...</footer>
```
如果 $attrs 被显式绑定，则不会有警告：

```template
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## ref

在 `uni-app js 引擎版`中，非 `Web端` 只能用于获取自定义组件，不能用于获取内置组件实例（如：`view`、`text`）。\
在 `uni-app x` 中，内置组件会返回组件根节点的引用，自定义组件会返回组件实例。

**注意事项：**
- 如果多个节点或自定义组件绑定相同 `ref` 属性，将获取到最后一个节点或组件实例的引用。
- 在 `v-for` 循环时，绑定 `ref` 属性会获取到节点或组件实例的集合。
- 在 `uni-app x` 中，要访问 `$refs` 中的属性，需要使用索引方式。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/refs/refs-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/refs/refs-options
> uni-app x（组合式）

```vue
<template>
  <view class="page">
    <view class="row">
      <text>NodeRef: </text>
      <text ref="nodeRef">{{ dataInfo.existRef }}</text>
    </view>
    <view class="row">
      <text>childRef:</text>
      <text>{{ dataInfo.existChildRef }}</text>
    </view>
    <view class="row">
      <text>existTextItems:</text>
      <text>{{ dataInfo.existTextItems }}</text>
    </view>
    <view>
      <text v-for="item in dataInfo.textItemsExpectNum" ref="textItems" :key="item">{{
        item
      }}</text>
    </view>
    <child class="mt-10" ref="childRef">ComponentRef</child>
  </view>
</template>

<script setup lang="uts">
import Child from './child-composition.uvue'

type DataInfo = {
  existRef: boolean
  existChildRef: boolean
  textItemsExpectNum: number
  existTextItems: boolean
}

const dataInfo = reactive<DataInfo>({
  existRef: false,
  existChildRef: false,
  textItemsExpectNum: 3,
  existTextItems: false
})

const nodeRef = ref<UniElement | null>(null)
const childRef = ref<UniElement | null>(null)
const textItems = ref<UniElement[] | null>(null)

onReady(() => {
  dataInfo.existRef = nodeRef.value !== null
  dataInfo.existChildRef = childRef.value !== null
  dataInfo.existTextItems = textItems.value?.length === dataInfo.textItemsExpectNum
})

defineExpose({
  dataInfo
})
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
```

> uni-app x（选项式）

```vue
<template>
  <view class="page">
    <view class="row">
      <text>NodeRef: </text>
      <text ref="node">{{ dataInfo.existRef }}</text>
    </view>
    <view class="row">
      <text>childRef:</text>
      <text>{{ dataInfo.existChildRef }}</text>
    </view>
    <view class="row">
      <text>existTextItems:</text>
      <text>{{ dataInfo.existTextItems }}</text>
    </view>
    <view>
      <text v-for="item in dataInfo.textItemsExpectNum" ref="textItems" :key="item">{{
        item
      }}</text>
    </view>
    <child class="mt-10" ref="childRef">ComponentRef</child>
  </view>
</template>

<script lang="uts">
import child from './child-options.uvue'

type DataInfo = {
  existRef: boolean
  existChildRef: boolean
  textItemsExpectNum: number
  existTextItems: boolean
}
export default {
  components: {
    child
  },
  data() {
    return {
      dataInfo: {
        existRef: false,
        existChildRef: false,
        textItemsExpectNum: 3,
        existTextItems: false
      } as DataInfo
    }
  },
  onReady() {
    this.dataInfo.existRef = this.$refs['node'] !== null
    this.dataInfo.existChildRef = this.$refs['childRef'] !== null
    const textItems = this.$refs['textItems'] as Array<UniElement>
    this.dataInfo.existTextItems = textItems.length === this.dataInfo.textItemsExpectNum
  }
}
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>

```

> uni-app js 引擎版

```vue
<template>
	<view>
		<text ref="textRef">text node</text>
		<Foo ref="fooRef" />
	</view>
</template>

<script lang="ts">
  import type { ComponentPublicInstance } from 'vue'

	export default {
		onReady() {
			const text = this.$refs.textRef as Element // 仅H5端支持
			const foo = this.$refs.fooRef as ComponentPublicInstance
		}
	}
</script>
```
:::

## 自定义组件 v-model 绑定复杂表达式 @v-model-complex-expression

自定义组件 `v-model` 绑定复杂表达式时，需要通过 `as` 指定类型(仅App-Android 平台)。

::: preview

> 组合式 API
```ts
<template>
  <input v-model="obj.str as string" />
</template>

<script setup lang="uts">
  type Obj = {
    str: string
  }
  const obj = reactive({
      str: "str"
    } as Obj)
</script>
```

> 选项式 API
```ts
<template>
  <input v-model="obj.str as string" />
</template>

<script lang="uts">
  type Obj = {
    str : string
  }
  export default {
    data() {
      return {
        obj: {
          str: "str"
        } as Obj
      }
    }
  }
</script>
```
:::


## 作用域插槽的类型 @scoped-slot-type

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/built-in/special-elements/slots/child-options.uvue)

作用域插槽需在组件中指定插槽数据类型
::: preview https://hellouvue.dcloud.net.cn/#/pages/built-in/special-elements/slots/child-options
> 组合式 API

```vue
<template>
  <view class="container">
    <view>
      <slot name="header" msg="Here might be a page title"></slot>
    </view>
    <view>
      <slot msg="A paragraph for the main content."></slot>
    </view>
    <view>
      <slot name="footer" msg="Here's some contact info"></slot>
    </view>
  </view>
</template>

<script setup lang="uts">
defineOptions({
  name: 'child'
})

defineSlots<{
  default(props: { msg: string }): any
  header(props: { msg: string }): any
  footer(props: { msg: string }): any
}>()
</script>
```

> 选项式 API

```vue
<template>
  <view class="container">
    <view>
      <slot name="header" msg="Here might be a page title"></slot>
    </view>
    <view>
      <slot msg="A paragraph for the main content."></slot>
    </view>
    <view>
      <slot name="footer" msg="Here's some contact info"></slot>
    </view>
  </view>
</template>

<script lang="uts">
export default {
  name: 'child',
  slots: Object as SlotsType<{
    header: { msg: string }
    default: { msg: string }
    footer: { msg: string }
  }>
}
</script>

```

:::

## 递归组件

实现递归组件时不要使用组件 import 自身的写法，直接在模板内使用组件名即可。

```vue
<!-- component-a.uvue -->
<template>
  <view>
    <text>component-a::{{text}}</text>
    <component-a v-if="!end" :text="text" :limit="limit-1"></component-a>
  </view>
</template>

<script setup lang="uts">
  // import componentA from './component-a' // 错误用法
  defineOptions({
    name: "component-a"
  })
  const props = defineProps({
    text: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 2
    }
  })
  const end = computed(() : boolean => {
    return props.limit <= 0
  })
</script>
```
