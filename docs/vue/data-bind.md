# 数据绑定模型

vue的一大特色，就是可以定义一个响应式变量，通过模板绑定的写法，更方便的实现对dom的更改。

在组合式里，定义响应式变量是`ref()`，在选项式里，定义方式是在data里return。

虽然组合式和选项式的定义方式不一样，但在模板里的绑定和使用方式是一样的。

响应式变量被绑定到UI界面后（template和style都可以），
1. 在逻辑script中修改变量，UI界面会自动更新。省却再编写dom代码操作UI。
2. 响应式变量有diff更新机制。比如对于一个大列表的UTSJSONObject数据，其中一项变更时，框架底层会自动计算diff，给UI层差量同步数据。这在大多数情况是很好的，但注意diff这个计算过程本身也会增加耗时。

下面分别讲解各种方式的用法。

## 声明响应式状态 @declaring-reactive-state

### 选项式 API @options-api

选用选项式 API 时，会用 `data` 选项来声明组件的响应式状态。此选项的值应为返回一个对象的函数。Vue 将在创建新组件实例的时候调用此函数，并将函数返回的对象用响应式系统进行包装。此对象的所有顶层属性都会被代理到组件实例 (即方法和生命周期钩子中的 `this`) 上。

data需要特殊类型时，通过 as 来转换。

如下示例中，
- 首先在data的return中定义了响应式变量：str、num、arr，并赋值了初始值。
- 第2步在模板template中通过`{{}}`的方式绑定和显示在text组件的内容区中。即右边预览区显示的3行内容，显示了3个响应式变量的初始值。
- 第3步点击按钮“update data”，触发`updateData()`，在这个方法里通过`this.`来访问响应式变量，给它们重新赋值。然后界面上3行内容会被自动更新为新值。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/data/data-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/data/data-options
```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>str: </text>
      <text id="str">{{ str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>num: </text>
      <text id="num">{{ num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>arr: </text>
      <text id="arr">{{ arr.join(',') }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.str: </text>
      <text id="obj-str">{{ obj.str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.num: </text>
      <text id="obj-num">{{ obj.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.arr: </text>
      <text id="obj-arr">{{ obj.arr.join(',') }}</text>
    </view>
    <view ref='htmlRef' id="idRef" class="flex justify-between flex-row mb-10">
      <text>data 存储 element不需要被包装</text>
      <text id="isSameRefText">{{ refElementIsSame }}</text>
    </view>

    <button @click="updateData">update data</button>
  </view>
</template>

<script lang="uts">
  type Obj = {
    str : string,
    num : number,
    arr : number[]
  }
  export default {
    data() {
      return {
        str: 'default str',
        num: 0,
        arr: [1, 2, 3],
        // 特殊类型需要通过 as 指定类型
        obj: {
          str: 'default obj.str',
          num: 10,
          arr: [4, 5, 6]
        } as Obj,
        refElement: null as UniElement | null,
        refElementIsSame: false
      }
    },
    methods: {
      refTest() {
        const queryElementById1 = uni.getElementById('idRef')
        const queryElementById2 = uni.getElementById('idRef')
        const htmlRefElement = this.$refs['htmlRef'] as UniElement;
        this.refElement = htmlRefElement
        if (queryElementById1 === queryElementById2
          && queryElementById1 === htmlRefElement
          && queryElementById1 === this.refElement) {
          this.refElementIsSame = true
        }
      },
      updateData() {
        this.str = 'new str'
        this.num = 1
        this.arr = [4, 5, 6]

        this.obj.str = 'new obj.str'
        this.obj.num = 100
        this.obj.arr = [7, 8, 9]

        this.refTest()


      },
    },
  }
</script>

```
:::

data中的响应式变量，如需在script中使用，需通过 `this.xx` 的方式，比如上述的`this.str`。

### 组合式 API @composition-api

组合式 API 没有 data 这种选项，而是通过 `ref`、`reactive` 方法来声明组件的响应式状态。

这种定义方式更加灵活和简洁。

建议把 `ref` 定义都写在开头，否则到处都写也不好找。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/data/data-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/data/data-composition
```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>str: </text>
      <text id="str">{{ str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>num: </text>
      <text id="num">{{ num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>arr: </text>
      <text id="arr">{{ arr.join(',') }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.str: </text>
      <text id="obj-str">{{ obj.str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.num: </text>
      <text id="obj-num">{{ obj.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.arr: </text>
      <text id="obj-arr">{{ obj.arr.join(',') }}</text>
    </view>
    <view ref='htmlRef' id="idRef" class="flex justify-between flex-row mb-10">
      <text>data 存储 element不需要被包装</text>
      <text id="isSameRefText">{{ refElementIsSame }}</text>
    </view>
    <button @click="updateData">update data</button>
  </view>
</template>

<script setup lang="uts">
  type Obj = {
    str : string,
    num : number,
    arr : number[]
  }

  const instance = getCurrentInstance()!.proxy!

  const str = ref('default str')
  const num = ref(0)
  // 可通过泛型指定类型
  const arr = ref<number[]>([1, 2, 3])
  const obj = ref<Obj>({
    str: 'default obj.str',
    num: 10,
    arr: [4, 5, 6]
  })

  const refElement = ref<UniElement | null>(null)
  const refElementIsSame = ref(false)

  const refTest = () => {
    const queryElementById1 = uni.getElementById('idRef')
    const queryElementById2 = uni.getElementById('idRef')
    const htmlRefElement = instance.$refs['htmlRef'] as UniElement | null;
    refElement.value = htmlRefElement
    if (queryElementById1 === queryElementById2
      && queryElementById1 === htmlRefElement
      && queryElementById1 === refElement.value
    ) {
      refElementIsSame.value = true
    }
  }
  const updateData = () => {
    str.value = 'new str'
    num.value = 1
    arr.value = [4, 5, 6]

    obj.value.str = 'new obj.str'
    obj.value.num = 100
    obj.value.arr = [7, 8, 9]

    refTest()
  }

  defineExpose({
    updateData
  })
</script>

```
:::

#### ref

使用 `ref()` 函数来定义一个响应式变量。

需要给 `ref` 标注类型时，可通过泛型的写法，如：`ref<string>()`， 或使用 `as` 的写法。

当然 uts 有一定的自动推导能力，对于特别简单的布尔值/数字/字符串的字面量，不写泛型或as，也可以自动推导类型。

`ref()` 接收参数，并将其包裹在一个带有 `.value` 属性的 `ref` 对象中返回。这个对象，

- 在 uts 中取值时，需要使用 `.value`属性。
- 而在模板中使用 ref 时，不需要附加 `.value`（为了方便起见，在模板中使用时，ref 会自动解包，这样模板里的写法和选项式保持了一致）。

如下示例中，
- 首先在明确script为setup，即组合式API。
- 通过ref定义了3个响应式变量：count1、count2、counter（注意是小写），并赋值了初始值。
- 在模板template中通过`{{}}`的方式绑定和显示在text组件的内容区中。即右边预览区显示的3行内容，显示了3个响应式变量的初始值。
- 点击按钮“increment”，触发`increment()`，在这个方法里通过`.value`属性给响应式变量自增。然后界面上3行内容会被自动更新为新值。
<!-- TODO 为什么加2 -->
示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/ref/ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/ref/ref
```vue
<template>
	<view class="page">
		<view class="flex justify-between flex-row mb-10">
			<text>count:</text>
			<text id="count">{{ count }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>str:</text>
			<text id="str">{{ str }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>bool:</text>
			<text id="bool">{{ bool }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr:</text>
			<text id="arr">{{ JSON.stringify(arr) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>counter.count:</text>
			<text id="counter-count">{{ counter.count }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>counters.length:</text>
			<text id="counters-count">{{ counters.length }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>issue15557:</text>
			<text id="issue-15557">{{ issue15557?.['a'] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>issue20323:</text>
			<text id="issue-20323-1">{{ issue20323_1_a }}</text>
			<text id="issue-20323-2">{{ issue20323_2_a }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-id:</text>
			<text id="ref-str-id">{{ r1.getString(('id')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-boolean :</text>
			<text id="ref-str-boolean">{{ r1.getBoolean(('bl')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-number :</text>
			<text id="ref-str-number">{{ r1.getNumber(('n')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-any :</text>
			<text id="ref-str-any">{{ r1.getAny(('id')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-arr :</text>
			<text id="ref-str-arr">{{ r1.getArray(('arr'))![0] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-json :</text>
			<text id="ref-str-json">{{ r1.getJSON(('cars[0]'))!['name'] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str:</text>
			<text id="ref-str">{{ r2.msg }}</text>
		</view>
		<button class='mb-10' id="change-count-btn" @click="changeCount">change count</button>
		<button class='mb-10' id='change-str-btn' @click='changeStr'>change str</button>
		<button class='mb-10' id='change-bool-btn' @click='changeBool'>change bool</button>
		<button class='mb-10' id='change-arr-btn' @click='changeArr'>change arr</button>
		<button class='mb-10' id='change-counter-btn' @click='changeCounter'>change counter</button>
		<button class='mb-10' id='change-counters-btn' @click='changeCounters'>change counters</button>
	</view>
</template>

<script setup lang="uts">
	// 基础数据类型可自动推导类型
	const count = ref(0)
	const str = ref('default str')
	const bool = ref(false)

	// 可通过泛型指定类型
	const arr = ref<number[]>([1, 2, 3])
	type Counter = {
		count : number
	}
	// 可通过泛型指定类型
	const counter = ref<Counter>({
		count: 0
	})

	const counters = ref<Counter[]>([])

	const changeCount = () => {
		count.value++
	}
	const changeStr = () => {
		str.value = 'new str'
	}
	const changeBool = () => {
		bool.value = !bool.value
	}
	const changeArr = () => {
		arr.value.push(arr.value.length + 1)
	}
	const changeCounter = () => {
		counter.value.count++
	}
	const changeCounters = () => {
		counters.value.push({ count: 0 })
	}

	// issue/15557
	const issue15557 = ref<UTSJSONObject | null>(null)
	issue15557.value = {
		a: 1
	}
	issue15557.value!.set('a', 2)

	// issue/20323
	const issue20323_1 = ref<UTSJSONObject>({
		a: "abc"
	})
	const issue20323_1_a = ref<string | null>(issue20323_1.value.getString('a'))

	let _issue20323_2_a : string | null = null
	const issue20323_2 = ref<UTSJSONObject>({
		a: _issue20323_2_a ?? "abc"
	})
	const issue20323_2_a = ref<string | null>(issue20323_2.value.getString('a'))
	
	const r1 = ref({})
	let result = JSON.parse(`{ "result": { "data": { "id": "1", "bl": false, "n": 2, "arr": ["1"], "cars": [ { "name": "car1", "value": 100} ] } } }`) as UTSJSONObject
	r1.value = result.getJSON('result.data', {} as UTSJSONObject)
	const r2 = ref({ msg: '1' })
</script>
```
:::

#### reactive

还有另一种声明响应式状态的方式，即使用 reactive() API。与将内部值包装在特殊对象中的 ref 不同，reactive() 将使对象本身具有响应性，还可以使用 `readOnly` 来禁止修改。

需要注意：reactive() 返回的是一个原始对象的代理（Proxy），它和原始对象是不相等的。

只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是仅使用你声明对象的代理版本。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/readonly/readonly.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/readonly/readonly
```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>data.str:</text>
      <text id="data-str">{{ data.str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>data.num:</text>
      <text id="data-num">{{ data.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>data.arr:</text>
      <text id="data-arr">{{ JSON.stringify(data.arr) }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>readonly data.str:</text>
      <text id="readonly-data-str">{{ readonlyData.str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>readonly data.num:</text>
      <text id="readonly-data-num">{{ readonlyData.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>readonly data.arr:</text>
      <text id="readonly-data-arr">{{ JSON.stringify(readonlyData.arr) }}</text>
    </view>

    <button id="update-data-btn" class="mb-10" @click="updateData">
      update data
    </button>
    <button id="update-readonly-data-btn" @click="updateReadonlyData">
      update readonly data
    </button>
  </view>
</template>

<script setup lang="uts">
type Data = {
  str : string,
  num : number,
  arr : string[]
}
// 可通过泛型指定类型
const data = reactive<Data>({
  str: 'default str',
  num: 0,
  arr: ['a', 'b', 'c']
})
// 可通过泛型指定类型
const readonlyData = readonly<Data>(data)

const updateData = () => {
  data.str = 'new str'
  data.num++
  data.arr.push('d')
}

const updateReadonlyData = () => {
  readonlyData.str = 'new readonly str'
  readonlyData.num++
  readonlyData.arr.push('e')
}
</script>

```
:::

#### defineExpose

使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性：

> 在示例中，使用 `defineExpose` 导出一个方法供自动化测试脚本使用

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/define-expose/define-expose.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/define-expose/define-expose
```vue
<template>
  <view class="page">
    <define-expose-foo ref="fooRef" />
    <view class="flex justify-between flex-row mt-10">
      <text>str from component Foo: </text>
      <text id="foo-str">{{ fooStr }}</text>
    </view>
    <view class="flex justify-between flex-row mt-10">
      <text>num from component Foo: </text>
    <text id="foo-num">{{ fooNum }}</text>
    </view>
    <button class="increment-btn mt-10" @click="increment">
      trigger Foo increment
    </button>
  </view>
</template>

<script setup lang="uts">
const fooRef = ref<DefineExposeFooComponentPublicInstance | null>(null)
const fooStr = ref('')
const fooNum = ref<number>(0)

onMounted(() => {
  fooStr.value = fooRef.value!.str
  fooNum.value = fooRef.value!.num
})

const increment = () => {
  fooRef.value!.increment()
  fooNum.value = fooRef.value!.num
}
</script>

```
:::

## 绑定变量 @bind-data

### 在模板里绑定 @bind-template-data

当使用 `Options API` `data` 或 `Composition API` 的 `ref` 、 `reactive` 定义了响应式数据后，可以在模板中使用。

- 组件的text区域，使用`{{}}` 语法绑定数据。这常见于`<text>`组件。
- 组件的vue指令中，直接写变量名称。

比如下述组件的vue指令：

- `v-bind` 或 `:`（简写）。它后面跟着组件的属性名称，可以动态修改组件的属性。
- `v-if`、`v-else-if` 或 `v-else`
- `v-for`

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/built-in/special-elements/template/template-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/built-in/special-elements/template/template-options

> 组合式 API
```vue
<template>
  <view class="page">
    <template v-if="dataInfo.isShow">
      <text id="title">{{ title }}</text>
    </template>
    <template v-else>
      <text>隐藏标题时显示</text>
    </template>
    <!-- vapor button 调整实现，自动化测试无法通过 innerText 获取文本内容，重构为 text  -->
    <text class="mt-10 btn" id="show-botton" @click="handleShow">{{ dataInfo.isShow ? '点击隐藏' : '点击显示' }}</text>
    <template v-for="(item, index) in list" :key="index">
      <text :class="'item'">{{ index + 1 }}.{{ item.name }}</text>
    </template>
    <button @click="goMapStyle">跳转绑定 Map 类型 style 页面</button>
  </view>
</template>

<script setup lang="uts">
type DataInfo = {
  isShow: boolean
}
type ListItem = {
  name: string
}

const dataInfo = reactive({
  isShow: false
} as DataInfo)

const title = ref<string>('hello')
const list = ref<ListItem[]>([
  {
    name: 'foo1'
  },
  {
    name: 'foo2'
  }
])

const handleShow = () => {
  dataInfo.isShow = !dataInfo.isShow
}

const goMapStyle = () => {
  uni.navigateTo({ url: '/pages/built-in/special-elements/template/template-map-style-composition' })
}

defineExpose({
  dataInfo,
  goMapStyle
})
</script>

<style>
.btn{
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
}
.item {
  margin: 15px;
  padding: 4px 8px;
  border: #eee solid 1px;
}
</style>
```

> 选项式 API
```vue
<template>
  <view class="page">
    <template v-if="dataInfo.isShow">
      <text id="title">{{ title }}</text>
    </template>
    <template v-else>
      <text>隐藏标题时显示</text>
    </template>
    <text class="mt-10 btn" id="show-botton" @click="handleShow">{{ dataInfo.isShow ? '点击隐藏' : '点击显示' }}</text>
    <template v-for="(item, index) in list" :key="index">
      <text :class="'item'">{{ index + 1 }}.{{ item.name }}</text>
    </template>
    <button @click="goMapStyle">跳转绑定 Map 类型 style 页面</button>
  </view>
</template>

<script lang='uts'>
type DataInfo = {
  isShow: boolean
}
type objType = {
  name : string
}
export default {
  data() {
    return {
      title: "hello",
      dataInfo: {
        isShow: false,
      } as DataInfo,
      list: [{
        name: 'foo1'
      },
      {
        name: 'foo2'
      }
      ] as objType[]
    }
  },
  methods: {
    handleShow() {
      this.dataInfo.isShow = !this.dataInfo.isShow
    },
    goMapStyle() {
      uni.navigateTo({ url: '/pages/built-in/special-elements/template/template-map-style-options' })
    }
  }
}
</script>

<style>
.btn{
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
}
.item {
  margin: 15px;
  padding: 4px 8px;
  border: #eee solid 1px;
}
</style>

```
:::

### 在样式里绑定 @v-bind-css-data

|App|Web|
|:-:|:-:|
|x  |4.13+  |

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态

这个语法同样也适用于 `<script setup>`，且支持 UTS 表达式 (需要用引号包裹起来)

`v-bind` 也可在样式中使用，可以很方便的在 uts 中改变样式，如下所示：

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-bind/v-bind-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-bind/v-bind-options

> 组合式 API
```vue
<template>
<!-- #ifdef APP -->
<scroll-view style="flex: 1">
  <!-- #endif -->    
  <view class="page">
    <!-- v-bind attribute -->
    <button id="disabled-btn" class="mb-10" :disabled="true">
      :disabled true
    </button>
    <button id="v-bind-disabled-btn" class="mb-10" v-bind:disabled="false">
      v-bind:disabled false
    </button>

    <!-- v-bind style -->
    <view class="flex justify-between flex-row mb-10">
      <text>bind object style fontSize:</text>
      <text id="bind-object-style" :style="{ fontSize: dataInfo.fontSize }">
        {{ dataInfo.fontSize }}
      </text>
    </view>
    <view id="bind-array-style" class="mb-10 p-10" :style="[dataInfo.backgroundColor, dataInfo.border]">
      <view>bind arr style</view>
      <view class="my-10">{{ dataInfo.backgroundColor }}</view>
      <view>{{ dataInfo.border }}</view>
    </view>
    <view class="mb-10 p-10">
        <text id="bind-raw-object-style" :style="rawObjectStyle">rawObjectStyle</text>
    </view>
    <!-- 目前仅android平台在内部重新调用了normalizeStyle，其他端暂时没有，这应该是vue的bug -->
    <view class="mb-10 p-10">
        <text id="bind-raw-array-style" :style="rawArrayStyle">rawArrayStyle</text>
    </view>

    <!-- v-bind props -->
    <Foo :title="dataInfo.fooProps.title" :num="dataInfo.fooProps.num" :obj="dataInfo.fooProps.obj" />

    <!-- v-bind props -->
    <Foo checked />
    <!-- #ifndef MP -->
    <!-- 绑定对象 -->
    <Foo id="bindObj1" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并-->
    <Foo id="bindObj2" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" title="foo title override" />
    <!-- 绑定对象合并-->
    <Foo id="bindObj3" title="foo" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并（UTSJSONObject）-->
    <Foo id="bindObj4" v-bind="fooProps" title="foo title(json) override" />
    <!-- 绑定对象合并（UTSJSONObject）-->
    <Foo id="bindObj5" title="foo" v-bind="fooProps" />
    <!-- #endif -->
    <!-- v-bind in style -->
    <!-- #ifdef WEB -->
    <view class="mb-10 v-bind-css"></view>
    <!-- #endif -->
  </view>
<!-- #ifdef APP -->
</scroll-view>
<!-- #endif -->  
</template>

<script setup lang="uts">
  import Foo from './Foo-composition.uvue'
  import { FooProps, FooPropsObj } from './type.uts'

  type DataInfo = {
    fontSize : string
    backgroundColor : string
    border : string
    fooProps : FooProps
    vBindClassBackgroundColor : string,
    vBindClassRpxHeight : string,
  }

  const dataInfo = reactive({
    fontSize: '20px',
    backgroundColor: 'background-color: green',
    border: 'border: 2px solid red',
    fooProps: {
      title: 'foo title',
      num: 1,
      obj: {
        name: 'foo obj name',
      } as FooPropsObj
    },
    vBindClassBackgroundColor: 'red',
    vBindClassRpxHeight: '300rpx'
  } as DataInfo)
  
  const fooProps = reactive({
      title: 'foo title(json)',
      num: 2,
  })
  
  const rawObjectStyle = {
      width: '100%',
      height: '30px',
      'background-color': 'red'
  }
  
  const rawArrayStyle = [
      {
        width: '100%',
        height: '30px'
      },
      {
        'background-color': 'red'
      }
  ]

  defineExpose({
    dataInfo
  })
</script>

<style>
  /* #ifdef WEB */
  .v-bind-css {
    background-color: v-bind(dataInfo.vBindClassBackgroundColor);
    height: v-bind(dataInfo.vBindClassRpxHeight);
  }
  /* #endif */
</style>
```

> 选项式 API
```vue
<template>
<!-- #ifdef APP -->
<scroll-view style="flex: 1">
  <!-- #endif -->
  <view class="page">
    <!-- v-bind attribute -->
    <button id="disabled-btn" class="mb-10" :disabled="true">:disabled true</button>
    <button id="v-bind-disabled-btn" class="mb-10" v-bind:disabled="false">v-bind:disabled false</button>

    <!-- v-bind style -->
    <view class="flex justify-between flex-row mb-10">
      <text>bind object style fontSize:</text>
      <text id="bind-object-style" :style="{ fontSize: dataInfo.fontSize }">
        {{ dataInfo.fontSize }}
      </text>
    </view>
    <view id="bind-array-style" class="mb-10 p-10" :style="[dataInfo.backgroundColor, dataInfo.border]">
      <view>bind arr style</view>
      <view class="my-10">{{ dataInfo.backgroundColor }}</view>
      <view>{{ dataInfo.border }}</view>
    </view>
    <view class="mb-10 p-10">
        <text id="bind-raw-object-style" :style="rawObjectStyle">rawObjectStyle</text>
    </view>
    <view class="mb-10 p-10">
        <text id="bind-raw-array-style" :style="rawArrayStyle">rawArrayStyle</text>
    </view>

    <!-- v-bind props -->
    <Foo :title="dataInfo.fooProps.title" :num="dataInfo.fooProps.num" :obj="dataInfo.fooProps.obj" />

    <!-- v-bind props -->
    <Foo checked />
    
    <!-- #ifndef MP -->
    <!-- 绑定对象 -->
    <Foo v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <Foo v-bind="fooProps"/>
    <Foo id="bindObj1" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并 v-bind 在前 -->
    <Foo v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" id="bindObj2" :title="dataInfo.fooProps.title + ' override'" />
    <!-- 绑定对象合并 v-bind 在后 -->
    <Foo id="bindObj3" title="foo" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并 v-bind 在中间（UTSJSONObject）-->
    <Foo id="bindObj4" v-bind="fooProps" title="foo title(json) override" />
    <!-- 绑定对象合并（UTSJSONObject）-->
    <Foo id="bindObj5" title="foo" v-bind="fooProps" />
    <!-- #endif -->
    
    <!-- v-bind in style -->
    <!-- #ifdef WEB -->
    <view class="mb-10 v-bind-css"></view>
    <!-- #endif -->
  </view>
<!-- #ifdef APP -->
</scroll-view>
<!-- #endif -->
</template>

<script lang="uts">
  import Foo from './Foo-options.uvue'
  import { FooProps, FooPropsObj } from './type.uts'

  type DataInfo = {
    fontSize : string
    backgroundColor : string
    border : string
    fooProps : FooProps
    vBindClassBackgroundColor : string
    vBindClassRpxHeight : string
  }

  export default {
    components: { Foo },
    data() {
      return {
        dataInfo: {
          fontSize: '20px',
          backgroundColor: 'background-color: green',
          border: 'border: 2px solid red',
          fooProps: {
            title: 'foo title',
            num: 1,
            obj: {
              name: 'foo obj name'
            } as FooPropsObj
          },
          vBindClassBackgroundColor: 'red',
          vBindClassRpxHeight: '300rpx'
        } as DataInfo,
        fooProps:{
            title: 'foo title(json)',
            num: 2,
        },
        rawObjectStyle: {
            width: '100%',
            height: '30px',
            'background-color': 'red'
        },
        rawArrayStyle: [
            {
              width: '100%',
              height: '30px'
            },
            {
              'background-color': 'red'
            }
        ]
      }
    }
  }
</script>

<style>
  /* #ifdef WEB */
  .v-bind-css {
    background-color: v-bind(dataInfo.vBindClassBackgroundColor);
    height: v-bind(dataInfo.vBindClassRpxHeight);
  }
  /* #endif */
</style>
```
:::

## 定义方法 @methods

使用选项式 API 时可以在 `methods` 选项中定义方法，这些方法可以在模板中使用\
而使用组合式 API 时，可以直接在 `<script setup lang="uts">` 中定义方法

定义方法之后，可以传递给子组件，子组件使用 `emit` 调用，也可以在 `script` 中直接使用

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/ref/ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/ref/ref
```vue
<template>
	<view class="page">
		<view class="flex justify-between flex-row mb-10">
			<text>count:</text>
			<text id="count">{{ count }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>str:</text>
			<text id="str">{{ str }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>bool:</text>
			<text id="bool">{{ bool }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr:</text>
			<text id="arr">{{ JSON.stringify(arr) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>counter.count:</text>
			<text id="counter-count">{{ counter.count }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>counters.length:</text>
			<text id="counters-count">{{ counters.length }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>issue15557:</text>
			<text id="issue-15557">{{ issue15557?.['a'] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>issue20323:</text>
			<text id="issue-20323-1">{{ issue20323_1_a }}</text>
			<text id="issue-20323-2">{{ issue20323_2_a }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-id:</text>
			<text id="ref-str-id">{{ r1.getString(('id')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-boolean :</text>
			<text id="ref-str-boolean">{{ r1.getBoolean(('bl')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-number :</text>
			<text id="ref-str-number">{{ r1.getNumber(('n')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-any :</text>
			<text id="ref-str-any">{{ r1.getAny(('id')) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-arr :</text>
			<text id="ref-str-arr">{{ r1.getArray(('arr'))![0] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str-json :</text>
			<text id="ref-str-json">{{ r1.getJSON(('cars[0]'))!['name'] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>ref-str:</text>
			<text id="ref-str">{{ r2.msg }}</text>
		</view>
		<button class='mb-10' id="change-count-btn" @click="changeCount">change count</button>
		<button class='mb-10' id='change-str-btn' @click='changeStr'>change str</button>
		<button class='mb-10' id='change-bool-btn' @click='changeBool'>change bool</button>
		<button class='mb-10' id='change-arr-btn' @click='changeArr'>change arr</button>
		<button class='mb-10' id='change-counter-btn' @click='changeCounter'>change counter</button>
		<button class='mb-10' id='change-counters-btn' @click='changeCounters'>change counters</button>
	</view>
</template>

<script setup lang="uts">
	// 基础数据类型可自动推导类型
	const count = ref(0)
	const str = ref('default str')
	const bool = ref(false)

	// 可通过泛型指定类型
	const arr = ref<number[]>([1, 2, 3])
	type Counter = {
		count : number
	}
	// 可通过泛型指定类型
	const counter = ref<Counter>({
		count: 0
	})

	const counters = ref<Counter[]>([])

	const changeCount = () => {
		count.value++
	}
	const changeStr = () => {
		str.value = 'new str'
	}
	const changeBool = () => {
		bool.value = !bool.value
	}
	const changeArr = () => {
		arr.value.push(arr.value.length + 1)
	}
	const changeCounter = () => {
		counter.value.count++
	}
	const changeCounters = () => {
		counters.value.push({ count: 0 })
	}

	// issue/15557
	const issue15557 = ref<UTSJSONObject | null>(null)
	issue15557.value = {
		a: 1
	}
	issue15557.value!.set('a', 2)

	// issue/20323
	const issue20323_1 = ref<UTSJSONObject>({
		a: "abc"
	})
	const issue20323_1_a = ref<string | null>(issue20323_1.value.getString('a'))

	let _issue20323_2_a : string | null = null
	const issue20323_2 = ref<UTSJSONObject>({
		a: _issue20323_2_a ?? "abc"
	})
	const issue20323_2_a = ref<string | null>(issue20323_2.value.getString('a'))
	
	const r1 = ref({})
	let result = JSON.parse(`{ "result": { "data": { "id": "1", "bl": false, "n": 2, "arr": ["1"], "cars": [ { "name": "car1", "value": 100} ] } } }`) as UTSJSONObject
	r1.value = result.getJSON('result.data', {} as UTSJSONObject)
	const r2 = ref({ msg: '1' })
</script>
```
:::
