# 组合式 API

> `App.uvue` 从HBuilderX 5.0+起支持组合式 API。

::: warning Android注意
- 暂不支持 `<script setup>` 和 `<script>` 同时使用，如果需要配置 `options` 内容，比如 `name`，可以使用 `defineOptions`。
- 暂不支持顶层 `await`。
- 暂不支持 `<script setup>` 配置 `generic` 泛型类型参数。

:::

## 响应式: 核心

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| ref() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| computed() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| reactive() | 4.0 | 4.41 | √ | 4.11 | 4.61 |
| readonly() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| watchEffect() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| watchPostEffect() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| watchSyncEffect() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| watch() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |

### 示例代码 @example

#### ref

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value`。

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

- 使用 `<template ref>`

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/refs/refs-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/refs/refs-composition

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

:::

#### watch

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/watch/watch-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/watch/watch-composition

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
    <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mb-10">
        <text>count:</text>
        <text id="count" ref="countRef">{{ count }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count result:</text>
        <text id="watch-count-res">{{ watchCountRes }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch count track number:</text>
        <text id="watch-count-track-num">{{ watchCountTrackNum }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count cleanup number:</text>
        <text id="watch-count-cleanup-res">{{ watchCountCleanupRes }}</text>
      </view>

      <button class="increment-btn mb-10" @click="increment">increment</button>
      <button class="stop-watch-count-btn mb-10" @click="triggerStopWatchCount">
        stop watch count
      </button>

      <view class="flex justify-between flex-row mb-10">
        <text>obj.str:</text>
        <text id="obj-str" ref="objStrRef">{{ obj.str }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch obj.str trigger number:</text>
        <text id="watch-obj-str-trigger-num">{{ watchObjStrTriggerNum }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj.num }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.bool:</text>
        <text id="obj-bool" ref="objBoolRef">{{ obj.bool }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.arr:</text>
        <text id="obj-arr" ref="objArrRef">{{ JSON.stringify(obj.arr) }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj result:</text>
        <text id="watch-obj-res">{{ watchObjRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.str result:</text>
        <text id="watch-obj-str-res">{{ watchObjStrRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.bool result:</text>
        <text id="watch-obj-bool-res">{{ watchObjBoolRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.arr result:</text>
        <text id="watch-obj-arr-res">{{ watchObjArrRes }}</text>
      </view>

      <button class="update-obj-btn mb-10" @click="updateObj">
        update obj
      </button>

      <view class="flex justify-between mb-10">
        <text>watch count and obj.num result:</text>
        <text id="watch-count-obj-num-res">{{ watchCountAndObjNumRes }}</text>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
type Obj = {
  num : number,
  str : string,
  bool : boolean,
  arr : number[]
}

const countRef = ref<UniTextElement | null>(null)
const count = ref(0)
const watchCountRes = ref('')
const watchCountCleanupRes = ref('')
const watchCountTrackNum = ref(0)

const stopWatchCount = watch(count, (count : number, prevCount : number, onCleanup : OnCleanup) => {
  // #ifdef APP
  watchCountRes.value = `count: ${count}, prevCount: ${prevCount}, count ref text (flush sync): ${countRef.value!.value}`
  // #endif
  // #ifdef WEB
  watchCountRes.value = `count: ${count}, prevCount: ${prevCount}, count ref text (flush sync): ${(countRef.value!.childNodes[0] as HTMLElement).innerText}`
  // #endif
  const cancel = () => {
    watchCountCleanupRes.value = `watch count cleanup: ${count}`
  }
  onCleanup(cancel)
}, {
  // 侦听器在响应式依赖改变时立即触发
  flush: 'sync',
  // 响应属性或引用作为依赖项被跟踪时调用
  onTrack(event : DebuggerEvent) {
    if (event.type === 'get') {
    // #ifndef VUE3-VAPOR
    // 蒸汽模式放开下面这行会报错 Stack overflow! 已知Bug:[support for trigger responsive getters in onTrack](https://github.com/vuejs/core/pull/12266)
    watchCountTrackNum.value++
    // #endif
    }
  }
  // TODO: vue>3.4.15 开始 监听函数、onTrack、onTrigger 同时存在修改响应式数据时,会报错 Maximum call stack size exceeded
  // 所以将 onTrack 与 onTrigger 调整到两个 watch 里
})

const triggerStopWatchCount = () => stopWatchCount()

const increment = () => {
  count.value++
}

const obj = reactive({
  num: 0,
  str: 'num: 0',
  bool: false,
  arr: [0]
} as Obj)

// immediate: true 第一次触发, 旧值应该是 undefined, 现在 app 是初始值
const watchObjRes = ref('')
watch(obj, (obj : Obj, prevObj ?: Obj) => {
  watchObjRes.value = `obj: ${JSON.stringify(obj)}, prevObj: ${JSON.stringify(prevObj)}`
}, { immediate: true })

const objStrRef = ref<UniTextElement | null>(null)
const watchObjStrRes = ref('')
const watchObjStrTriggerNum = ref(0)
watch(() : string => obj.str, (str : string, prevStr : string) => {
  // #ifdef APP
  watchObjStrRes.value = `str: ${str}, prevStr: ${prevStr}, obj.str ref text (flush pre): ${objStrRef.value!.value}`
  // #endif
  // #ifdef WEB
  watchObjStrRes.value = `str: ${str}, prevStr: ${prevStr}, obj.str ref text (flush pre): ${(objStrRef.value!.childNodes[0] as HTMLElement).innerText}`
  // #endif
}, {
  // 侦听器在组件渲染之前触发
  flush: 'pre',
  // 侦听器回调被依赖项的变更触发时调用
  onTrigger(event : DebuggerEvent) {
    if (event.type === 'set') {
      watchObjStrTriggerNum.value++
    }
  }
})

const objBoolRef = ref<UniTextElement | null>(null)
const watchObjBoolRes = ref('')
watch(() : boolean => obj.bool, (bool : boolean, prevBool : boolean) => {
  // #ifdef APP
  watchObjBoolRes.value = `bool: ${bool}, prevBool: ${prevBool}, obj.bool ref text (flush post): ${objBoolRef.value!.value}`
  // #endif
  // #ifdef WEB
  watchObjBoolRes.value = `bool: ${bool}, prevBool: ${prevBool}, obj.bool ref text (flush post): ${(objBoolRef.value!.childNodes[0] as HTMLElement).innerText}`
  // #endif
}, {
  // 侦听器延迟到组件渲染之后触发
  flush: 'post'
})


const watchObjArrRes = ref('')
watch(() : number[] => obj.arr, (arr : number[], prevArr : number[]) => {
  watchObjArrRes.value = `arr: ${JSON.stringify(arr)}, prevArr: ${JSON.stringify(prevArr)}`
}, { deep: true })

const watchCountAndObjNumRes = ref('')
watch([count, () : number => obj.num], (state : number[], preState : number[]) => {
  watchCountAndObjNumRes.value = `state: ${JSON.stringify(state)}, preState: ${JSON.stringify(preState)}`
})

const updateObj = () => {
  obj.num++
  obj.str = `num: ${obj.num}`
  obj.bool = !obj.bool
  obj.arr.push(obj.num)
}
</script>

```

:::


#### computed

接受一个 getter 函数，返回一个只读的响应式 [ref](#ref) 对象。该 ref 通过 `.value` 暴露 getter 函数的返回值。它也可以接受一个带有 `get` 和 `set` 函数的对象来创建一个可写的 ref 对象。

::: warning 注意
- `computed()` 需通过泛型指定返回值类型。
  ```ts
  const count = ref(0)
  const doubleCount = computed<number>(() : number => {
    return count.value * 2
  })
  ```
- 目前需要可传参的计算属性时，需要手动指定返回值类型
  ```ts
  const stateText = computed(() : (state : number) => string => {
    return (state : number) : string => {
      const stateArr = ['未审核', '审核中', '审核通过']
      return stateArr[state]
    }
  })
  stateText.value(1)
  ```
:::

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/computed/computed-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/computed/computed-composition

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>computed double count:</text>
      <text id="double-count">{{ doubleCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>computed triple count:</text>
      <text id="triple-count">{{ tripleCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.arr:</text>
      <text id="obj-arr">{{ JSON.stringify(obj.arr) }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>computed obj.arr.length:</text>
      <text id="obj-arr-len">{{ objArrLen }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
        <text>computed stateText(1):</text>
        <text id="computed-with-argument">{{ stateText(1) }}</text>
    </view>
    <button id="update-btn" @click="update">update</button>
  </view>
</template>

<script setup lang="uts">
const count = ref(0)

const doubleCount = computed(() : number => {
  return count.value * 2
})

function useTripleCount() {
    return computed(() => count.value * 3)
}
const tripleCount = useTripleCount()
    
type Obj = {
  arr : number[]
}

const obj = reactive({
  arr: [1, 2, 3]
} as Obj)


const objArrLen = computed<number>(() : number => {
  return obj.arr.length
})

const update = () => {
  count.value++
  obj.arr.push(obj.arr.length + 1)
}

const stateText = computed(() => {
  return (state: number) => {
    const stateArr = ['未审核', '审核中', '审核通过']
    return stateArr[state]
  }
})
</script>

```

:::

#### reactive

返回一个对象的响应式代理。

- 详细信息

  响应式转换是“深层”的：它会影响到所有嵌套的属性。一个响应式对象也将深层地解包任何 [ref](#ref) 属性，同时保持响应性。

  若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，请使用 [shallowReactive()](#shallowreactive) 作替代。

::: warning 注意
- `reactive` 在 app-android 平台目前不支持对 class 做响应式，推荐使用 type 定义存储数据的对象类型。
:::

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/reactive/reactive.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/reactive/reactive

```vue
<template>
	<scroll-view direction="vertical" style="flex: 1;">
		<view class="flex justify-between flex-row mb-10">
			<text>count:</text>
			<text id="count">{{ count }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>obj.str:</text>
			<text id="obj-str">{{ obj['str'] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>obj.num:</text>
			<text id="obj-num">{{ obj['num'] }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>obj.arr:</text>
			<text id="obj-arr">{{ JSON.stringify(obj['arr']) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>count1:</text>
			<text id="count1">{{ count1 }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>obj1.a.b.c:</text>
			<text id="obj1-a-b-c">{{ obj1.getString('a.b.c') }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr1(spread):</text>
			<text id="arr1">{{ JSON.stringify(arr1) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr2ForEachEffectCount:</text>
			<text id="arr2">{{ arr2ForEachEffectCount }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr3(reverse):</text>
			<text id="arr3">{{ JSON.stringify(arr3) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr4(sort):</text>
			<text id="arr4">{{ JSON.stringify(computedArr4) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>arr5:</text>
			<text id="arr5">{{ JSON.stringify(arr5Result) }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>map2ForEachEffectCount:</text>
			<text id="map2">{{ map2ForEachEffectCount }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>map3ForOfEffectCount:</text>
			<text id="map3">{{ map3ForOfEffectCount }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>set2ForEachEffectCount:</text>
			<text id="set2">{{ set2ForEachEffectCount }}</text>
		</view>
		<view class="flex justify-between flex-row mb-10">
			<text>set3ForOfEffectCount:</text>
			<text id="set3">{{ set3ForOfEffectCount }}</text>
		</view>
    <view class="flex justify-between flex-row mb-10">
    	<text>response.data.success:</text>
    	<text id="generic">{{ response.data.success }}</text>
    </view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str-id:</text>
		<text id="reactive-str-id">{{ r1.getString(('id')) }}</text>
	</view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str-boolean :</text>
		<text id="reactive-str-boolean">{{ r1.getBoolean(('bl')) }}</text>
	</view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str-number :</text>
		<text id="reactive-str-number">{{ r1.getNumber(('n')) }}</text>
	</view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str-any :</text>
		<text id="reactive-str-any">{{ r1.getAny(('id')) }}</text>
	</view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str-arr :</text>
		<text id="reactive-str-arr">{{ r1.getArray(('arr'))![0] }}</text>
	</view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str-json :</text>
		<text id="reactive-str-json">{{ r1.getJSON(('cars[0]'))!['name'] }}</text>
	</view>
	<view class="flex justify-between flex-row mb-10">
		<text>reactive-str:</text>
		<text id="reactive-str">{{ r2.getString("msg") }}</text>
	</view>
		<button class='mb-10' id="update-count-btn" @click="updateCount">update count</button>
		<button class='mb-10' id="update-obj-str-btn" @click="updateObjStr">update obj.str</button>
		<button class='mb-10' id="update-obj-num-btn" @click="updateObjNum">update obj.num</button>
		<button class='mb-10' id="update-obj-arr-btn" @click="updateObjArr">update obj.arr</button>
		<button class='mb-10' id="update-obj1-a-b-c-btn" @click="updateObj1_A_B_C">update obj1.a.b.c</button>
		<button class='mb-10' id="update-arr1-btn" @click="updateArr1(false)">update arr1 without reactive</button>
		<button class='mb-10' id="update-arr1-reactive-btn" @click="updateArr1(true)">update arr1 with reactive</button>
		<button class='mb-10' id="update-arr2-forEach-effect-btn" @click="updateArr2()">update arr2</button>
		<button class='mb-10' id="update-arr4-btn" @click="updateArr4()">update arr4</button>
		<button class='mb-10' id="update-map2-forEach-effect-btn" @click="updateMap2()">update map2 for each</button>
		<button class='mb-10' id="update-map3-forOf-effect-btn" @click="updateMap3()">update map3 for of</button>
		<button class='mb-10' id="update-set2-forEach-effect-btn" @click="updateSet2()">update set2 for each</button>
		<button class='mb-10' id="update-set3-forOf-effect-btn" @click="updateSet3()">update set3 for of</button>
    <button class='mb-10' id="update-generic" @click="updateResponse()">response.data.success</button>
    
    <!-- 复杂场景测试 -->
    <view class="flex justify-between flex-row mb-10 mt-20">
      <text class="section-title">复杂场景</text>
    </view>
    
    <!-- 1. 数组嵌套对象测试 -->
    <view class="mb-10">
      <text>arrWithObj[0].name:</text>
      <text id="arr-with-obj-name">{{ arrWithObj[0].name }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>arrWithObj[0].count:</text>
      <text id="arr-with-obj-count">{{ arrWithObj[0].count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>arrWithObj length:</text>
      <text id="arr-with-obj-length">{{ arrWithObj.length }}</text>
    </view>
    <button class='mb-10' id="update-arr-with-obj-name-btn" @click="updateArrWithObjName()">update arrWithObj[0].name</button>
    <button class='mb-10' id="update-arr-with-obj-count-btn" @click="updateArrWithObjCount()">update arrWithObj[0].count</button>
    <button class='mb-10' id="push-arr-with-obj-btn" @click="pushArrWithObj()">push new obj to arrWithObj</button>
    
    <!-- 2. 对象嵌套数组测试 -->
    <view class="mb-10">
      <text>objWithArr.items:</text>
      <text id="obj-with-arr-items">{{ JSON.stringify(objWithArr.items) }}</text>
    </view>
    <view class="mb-10">
      <text>objWithArr.items[0]:</text>
      <text id="obj-with-arr-items-0">{{ (objWithArr['items'] as string[])[0] }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>objWithArr.items.length:</text>
      <text id="obj-with-arr-items-length">{{ (objWithArr['items'] as string[]).length }}</text>
    </view>
    <button class='mb-10' id="update-obj-with-arr-items-0-btn" @click="updateObjWithArrItems0()">update objWithArr.items[0]</button>
    <button class='mb-10' id="push-obj-with-arr-items-btn" @click="pushObjWithArrItems()">push to objWithArr.items</button>
    
    <!-- 3. JSON.parse + reactive 联合测试 -->
    <view class="flex justify-between flex-row mb-10">
      <text>jsonParsedData.user.name:</text>
      <text id="json-parsed-user-name">{{ jsonParsedData.getString('user.name') }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>jsonParsedData.user.age:</text>
      <text id="json-parsed-user-age">{{ jsonParsedData.getNumber('user.age') }}</text>
    </view>
    <view class="mb-10">
      <text>jsonParsedData.tags:</text>
      <text id="json-parsed-tags">{{ JSON.stringify(jsonParsedData.tags) }}</text>
    </view>
    <view class="mb-10">
      <text>jsonParsedData.items[0].title:</text>
      <text id="json-parsed-items-0-title">{{ jsonParsedData.getJSON('items[0]')!.title }}</text>
    </view>
    <button class='mb-10' id="update-json-parsed-user-name-btn" @click="updateJsonParsedUserName()">update jsonParsedData.user.name</button>
    <button class='mb-10' id="update-json-parsed-user-age-btn" @click="updateJsonParsedUserAge()">update jsonParsedData.user.age</button>
    <button class='mb-10' id="push-json-parsed-tags-btn" @click="pushJsonParsedTags()">push to jsonParsedData.tags</button>
    <button class='mb-10' id="update-json-parsed-items-0-title-btn" @click="updateJsonParsedItems0Title()">update jsonParsedData.items[0].title</button>
    
    <!-- 4. 多层嵌套复杂结构测试 -->
    <view class="mb-10">
      <text>complexData.users[0].profile.name:</text>
      <text id="complex-users-0-profile-name">{{ ((complexData['users'] as UTSJSONObject[])[0] as UTSJSONObject).getString('profile.name') }}</text>
    </view>
    <view class="mb-10">
      <text>complexData.users[0].hobbies[0]:</text>
      <text id="complex-users-0-hobbies-0">{{ (((complexData['users'] as UTSJSONObject[])[0] as UTSJSONObject)['hobbies'] as string[])[0] }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>complexData.users[0].hobbies.length:</text>
      <text id="complex-users-0-hobbies-length">{{ (((complexData['users'] as UTSJSONObject[])[0] as UTSJSONObject)['hobbies'] as string[]).length }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>complexData.meta.count:</text>
      <text id="complex-meta-count">{{ (complexData['meta'] as UTSJSONObject)['count'] }}</text>
    </view>
    <button class='mb-10' id="update-complex-users-0-profile-name-btn" @click="updateComplexUsers0ProfileName()">update complexData.users[0].profile.name</button>
    <button class='mb-10' id="update-complex-users-0-hobbies-0-btn" @click="updateComplexUsers0Hobbies0()">update complexData.users[0].hobbies[0]</button>
    <button class='mb-10' id="push-complex-users-0-hobbies-btn" @click="pushComplexUsers0Hobbies()">push to complexData.users[0].hobbies</button>
    <button class='mb-10' id="update-complex-meta-count-btn" @click="updateComplexMetaCount()">update complexData.meta.count</button>
    
    <!-- 5. watchEffect 追踪复杂结构 -->
    <view class="flex justify-between flex-row mb-10">
      <text>complexEffectCount:</text>
      <text id="complex-effect-count">{{ complexEffectCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>jsonParsedEffectCount:</text>
      <text id="json-parsed-effect-count">{{ jsonParsedEffectCount }}</text>
    </view>
    <button class='mb-10' id="trigger-complex-effect-btn" @click="triggerComplexEffect()">trigger complex effect</button>
    <button class='mb-10' id="trigger-json-parsed-effect-btn" @click="triggerJsonParsedEffect()">trigger jsonParsed effect</button>
    
    <!-- 6. 数组嵌套对象 + forEach 响应式 -->
    <view class="flex justify-between flex-row mb-10">
      <text>arrWithObjForEachCount:</text>
      <text id="arr-with-obj-forEach-count">{{ arrWithObjForEachCount }}</text>
    </view>
    <button class='mb-10' id="update-arr-with-obj-forEach-btn" @click="updateArrWithObjForEach()">update arrWithObj (forEach effect)</button>
    
    <!-- 7. 对象嵌套数组 + JSON.parse 联合测试 -->
    <view class="mb-10">
      <text>jsonObjWithArr.data.list:</text>
      <text id="json-obj-with-arr-list">{{ JSON.stringify((jsonObjWithArr['data'] as UTSJSONObject)['list']) }}</text>
    </view>
    <view class="mb-10">
      <text>jsonObjWithArr.data.list[0].value:</text>
      <text id="json-obj-with-arr-list-0-value">{{ (((jsonObjWithArr['data'] as UTSJSONObject)['list'] as UTSJSONObject[])[0] as UTSJSONObject)['value'] }}</text>
    </view>
    <button class='mb-10' id="update-json-obj-with-arr-list-0-value-btn" @click="updateJsonObjWithArrList0Value()">update jsonObjWithArr.data.list[0].value</button>
    <button class='mb-10' id="push-json-obj-with-arr-list-btn" @click="pushJsonObjWithArrList()">push to jsonObjWithArr.data.list</button>
	</scroll-view>
</template>

<script setup lang="uts">
	const count = ref(0)

	// TODO: 待支持后补充泛型示例
	const obj = reactive({
		str: 'default str',
		num: count,
		arr: ['a', 'b', 'c']
	})

	const updateObjStr = () => {
		obj['str'] = 'new str';
	}

	const updateObjNum = () => {
		obj['num'] = (obj['num'] as number) + 1
	}

	const updateCount = () => {
		count.value++
	}

	const updateObjArr = () => {
		(obj['arr'] as string[]).push('d')
	}

	const obj1 = reactive({
		a: { b: { c: 'c' } }
	})

	const count1 = ref(0)
	watchEffect(() => {
		count1.value++
		// 测试getString等keyPath触发依赖收集
		obj1.getString("a.b.c")
	})
	function updateObj1_A_B_C() {
		((obj1["a"] as UTSJSONObject)["b"] as UTSJSONObject)["c"] = "c1-" + Date.now()
	}
	const arr1 = ref<number[]>([])
	function test(...args : number[]) {
		arr1.value = args
	}
	function updateArr1(isReactive : boolean) {
		if (isReactive) {
			test(...reactive([4, 5, 6]))
		} else {
			test(...[1, 2, 3])
		}
	}

	const arr2 = reactive<number[]>([1])
	const arr2ForEachEffectCount = ref(0)
	watchEffect(() => {
		arr2ForEachEffectCount.value++
		arr2.forEach((item) => {
			console.log('arr2', item)
		})
	})
	function updateArr2() {
		arr2.push(Date.now())
	}

	const arr3 = reactive([1, 2, 3, 4, 5]).reverse()

	const arr4 = reactive<number[]>([5, 3, 4, 1, 2])
	const computedArr4 = computed(() => arr4.sort())
	function updateArr4() {
		arr4.push(arr4.length + 1)
		console.log(arr4)
	}

	const arr5 = reactive<UTSJSONObject[]>([{ id: 1 }, { id: 2 }])
	const arr5FirstObj = arr5[0]
	const arr5FirstRawObj = toRaw<UTSJSONObject>(arr5[0])
	const arr5Result = {
		includes: [arr5.includes(arr5FirstObj), arr5.includes(arr5FirstRawObj)],
		indexOf: [arr5.indexOf(arr5FirstObj), arr5.indexOf(arr5FirstRawObj)],
		lastIndexOf: [arr5.lastIndexOf(arr5FirstObj), arr5.lastIndexOf(arr5FirstRawObj)],
	}

	const map2 = reactive(new Map<string, number>([["a", 1]]))
	const map2ForEachEffectCount = ref(0)
	watchEffect(() => {
		map2ForEachEffectCount.value++
		map2.forEach((item : number) => {
			console.log('map2', item)
		})
	})
	function updateMap2() {
		map2.set("c-" + Date.now(), Date.now())
	}

	const map3 = reactive(new Map<string, number>([["a", 1]]))
	const map3ForOfEffectCount = ref(0)
	watchEffect(() => {
		map3ForOfEffectCount.value++
		for (const item of map3) {
			console.log("map3", item)
		}
	})
	function updateMap3() {
		map3.set("c-" + Date.now(), Date.now())
	}

	const set2 = reactive(new Set<number>([1]))
	const set2ForEachEffectCount = ref(0)
	watchEffect(() => {
		set2ForEachEffectCount.value++
		set2.forEach((item : number) => {
			console.log('set2', item)
		})
	})
	function updateSet2() {
		set2.add(Date.now())
	}

	const set3 = reactive(new Set<number>([1]))
	const set3ForOfEffectCount = ref(0)
	watchEffect(() => {
		set3ForOfEffectCount.value++
		for (const item of set3) {
			console.log("set3", item)
		}
	})
	function updateSet3() {
		set3.add(Date.now())
	}
  
  type BaseResponse<T> = {
  	code : number
  	data : T
  }
  const response = reactive<BaseResponse<UTSJSONObject>>({
  	code: 1,
  	data: {
      success: true
    } as UTSJSONObject
  })
  function updateResponse() {
  	response.data.success = response.data.success != true
  }
  
  let r1 = reactive({})
  let result = JSON.parse(`{ "result": { "data": { "id": "1", "bl": false, "n": 2, "arr": ["1"], "cars": [ { "name": "car1", "value": 100} ] } } }`) as UTSJSONObject
  r1 = result.getJSON('result.data', {} as UTSJSONObject)
  let r2 = reactive({})
  r2 = { msg: '1' }
  
  // ========== 复杂场景测试 ==========
  
  // 1. 数组嵌套对象测试
  const arrWithObj = reactive<UTSJSONObject[]>([
    { name: 'item1', count: 0 } as UTSJSONObject,
    { name: 'item2', count: 1 } as UTSJSONObject
  ])
  
  function updateArrWithObjName() {
    (arrWithObj[0] as UTSJSONObject)['name'] = 'updated-item1-' + Date.now()
  }
  
  function updateArrWithObjCount() {
    const currentCount = (arrWithObj[0] as UTSJSONObject)['count'] as number;
    (arrWithObj[0] as UTSJSONObject)['count'] = currentCount + 1
  }
  
  function pushArrWithObj() {
    arrWithObj.push({ name: 'item' + arrWithObj.length, count: arrWithObj.length } as UTSJSONObject)
  }
  
  // 2. 对象嵌套数组测试
  const objWithArr = reactive({
    items: ['a', 'b', 'c'] as string[]
  })
  
  function updateObjWithArrItems0() {
    const items = objWithArr['items'] as string[]
    items[0] = 'updated-' + Date.now()
  }
  
  function pushObjWithArrItems() {
    const items = objWithArr['items'] as string[]
    items.push('item' + items.length)
  }
  
  // 3. JSON.parse + reactive 联合测试
  const jsonString = `{
    "user": {
      "name": "John",
      "age": 30
    },
    "tags": ["tag1", "tag2"],
    "items": [
      { "title": "item1", "value": 100 },
      { "title": "item2", "value": 200 }
    ]
  }`
  const jsonParsed = JSON.parse(jsonString) as UTSJSONObject
  const jsonParsedData = reactive(jsonParsed)
  
  function updateJsonParsedUserName() {
    ((jsonParsedData['user'] as UTSJSONObject) as UTSJSONObject)['name'] = 'Updated-' + Date.now()
  }
  
  function updateJsonParsedUserAge() {
    const currentAge = ((jsonParsedData['user'] as UTSJSONObject) as UTSJSONObject)['age'] as number;
    ((jsonParsedData['user'] as UTSJSONObject) as UTSJSONObject)['age'] = currentAge + 1
  }
  
  function pushJsonParsedTags() {
    const tags = jsonParsedData['tags'] as string[]
    tags.push('tag' + tags.length)
  }
  
  function updateJsonParsedItems0Title() {
    const items = jsonParsedData['items'] as UTSJSONObject[];
    (items[0] as UTSJSONObject)['title'] = 'updated-item1-' + Date.now()
  }
  
  // 4. 多层嵌套复杂结构测试
  const complexData = reactive({
    users: [
      {
        profile: {
          name: 'Alice',
          age: 25
        },
        hobbies: ['reading', 'coding'] as string[]
      } as UTSJSONObject
    ] as UTSJSONObject[],
    meta: {
      count: 1
    } as UTSJSONObject
  })
  
  function updateComplexUsers0ProfileName() {
    (((complexData['users'] as UTSJSONObject[])[0] as UTSJSONObject)['profile'] as UTSJSONObject)['name'] = 'Updated-Alice-' + Date.now()
  }
  
  function updateComplexUsers0Hobbies0() {
    (((complexData['users'] as UTSJSONObject[])[0] as UTSJSONObject)['hobbies'] as string[])[0] = 'updated-hobby-' + Date.now()
  }
  
  function pushComplexUsers0Hobbies() {
    const hobbies = (((complexData['users'] as UTSJSONObject[])[0] as UTSJSONObject)['hobbies'] as string[])
    hobbies.push('hobby' + hobbies.length)
  }
  
  function updateComplexMetaCount() {
    const meta = complexData['meta'] as UTSJSONObject
    const currentCount = meta['count'] as number;
    meta['count'] = currentCount + 1
  }
  
  // 5. watchEffect 追踪复杂结构
  const complexEffectCount = ref(0)
  watchEffect(() => {
    complexEffectCount.value++
    // 追踪复杂嵌套结构
    const users = complexData['users'] as UTSJSONObject[]
    const user = users[0] as UTSJSONObject
    const profile = user['profile'] as UTSJSONObject
    const userName = profile['name']
    const hobbies = user['hobbies'] as string[]
    const hobby = hobbies[0]
    const meta = complexData['meta'] as UTSJSONObject
    const metaCount = meta['count']
    console.log('complex effect:', userName, hobby, metaCount)
  })
  
  const jsonParsedEffectCount = ref(0)
  watchEffect(() => {
    jsonParsedEffectCount.value++
    // 追踪 JSON.parse 后的响应式数据
    const userName = jsonParsedData.getString('user.name')
    const tags = jsonParsedData['tags']
    const items = jsonParsedData['items'] as UTSJSONObject[]
    const itemTitle = (items[0] as UTSJSONObject)['title']
    console.log('jsonParsed effect:', userName, tags, itemTitle)
  })
  
  function triggerComplexEffect() {
    updateComplexUsers0ProfileName()
    updateComplexMetaCount()
  }
  
  function triggerJsonParsedEffect() {
    updateJsonParsedUserName()
    pushJsonParsedTags()
  }
  
  // 6. 数组嵌套对象 + forEach 响应式
  const arrWithObjForEachCount = ref(0)
  watchEffect(() => {
    arrWithObjForEachCount.value++
    arrWithObj.forEach((item) => {
      const name = (item as UTSJSONObject)['name']
      const count = (item as UTSJSONObject)['count']
      // console.log('arrWithObj forEach:', name, count)
    })
  })
  
  function updateArrWithObjForEach() {
    updateArrWithObjName()
    pushArrWithObj()
  }
  
  // 7. 对象嵌套数组 + JSON.parse 联合测试
  const jsonObjWithArrString = `{
    "data": {
      "list": [
        { "id": 1, "value": "value1" },
        { "id": 2, "value": "value2" }
      ]
    }
  }`
  const jsonObjWithArrParsed = JSON.parse(jsonObjWithArrString) as UTSJSONObject
  const jsonObjWithArr = reactive(jsonObjWithArrParsed)
  
  function updateJsonObjWithArrList0Value() {
    const data = jsonObjWithArr['data'] as UTSJSONObject
    const list = data['list'] as UTSJSONObject[];
    (list[0] as UTSJSONObject)['value'] = 'updated-value1-' + Date.now()
  }
  
  function pushJsonObjWithArrList() {
    const data = jsonObjWithArr['data'] as UTSJSONObject
    const list = data['list'] as UTSJSONObject[]
    list.push({ id: list.length + 1, value: 'value' + (list.length + 1) } as UTSJSONObject)
  }
</script>
<style>
    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
</style>

```

:::

#### readonly

接受一个对象 (不论是响应式还是普通的) 或是一个 [ref](#ref)，返回一个原值的只读代理。

- 详细信息

  只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 [ref](#ref) 解包行为与 `reactive()` 相同，但解包得到的值是只读的。

  要避免深层级的转换行为，请使用 [shallowReadonly()](#shallowreadonly) 作替代。

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

#### watchEffect

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

- 详细信息

  第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

  第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

  默认情况下，侦听器将在组件渲染之前执行。设置 `flush: 'post'` 将会使侦听器延迟到组件渲染之后再执行。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 `flush: 'sync'` 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。

  返回值是一个用来停止该副作用的函数。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/watch-effect/watch-effect.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/watch-effect/watch-effect

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
    <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mb-10">
        <text>count:</text>
        <text id="count" ref="countRef">{{ count }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count result:</text>
        <text id="watch-count-res">{{ watchCountRes }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch count track number:</text>
        <text id="watch-count-track-num">{{ watchCountTrackNum }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count cleanup number:</text>
        <text id="watch-count-cleanup-res">{{ watchCountCleanupRes }}</text>
      </view>

      <button class="increment-btn mb-10" @click="increment">increment</button>
      <button class="stop-watch-count-btn mb-10" @click="triggerStopWatchCount">
        stop watch count
      </button>

      <view class="flex justify-between flex-row mb-10">
        <text>obj.str:</text>
        <text id="obj-str" ref="objStrRef">{{ obj.str }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch obj.str trigger number:</text>
        <text id="watch-obj-str-trigger-num">{{ watchObjStrTriggerNum }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj.num }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.bool:</text>
        <text id="obj-bool" ref="objBoolRef">{{ obj.bool }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.arr:</text>
        <text id="obj-arr" ref="objArrRef">{{ JSON.stringify(obj.arr) }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj result:</text>
        <text id="watch-obj-res">{{ watchObjRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.str result:</text>
        <text id="watch-obj-str-res">{{ watchObjStrRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.bool result:</text>
        <text id="watch-obj-bool-res">{{ watchObjBoolRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.arr result:</text>
        <text id="watch-obj-arr-res">{{ watchObjArrRes }}</text>
      </view>

      <button class="update-obj-btn mb-10" @click="updateObj">
        update obj
      </button>

      <view class="flex justify-between mb-10">
        <text>watch count and obj.num result:</text>
        <text id="watch-count-obj-num-res">{{ watchCountAndObjNumRes }}</text>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang='uts'>
  type Obj = {
    num : number,
    str : string,
    bool : boolean,
    arr : number[]
  }

  const countRef = ref<UniTextElement | null>(null)
  const count = ref(0)
  const watchCountRes = ref('')
  const watchCountCleanupRes = ref('')
  const watchCountTrackNum = ref(0)

  const stopWatchCount = watchEffect((onCleanup : OnCleanup) => {
    if (countRef.value !== null) {
      // #ifdef APP
      watchCountRes.value = `count: ${count.value}, count ref text (flush sync): ${countRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchCountRes.value = `count: ${count.value}, count ref text (flush sync): ${(countRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchCountRes.value = `count: ${count.value}, count ref text (flush sync): `
    }
    const cancel = () => {
      watchCountCleanupRes.value = `watch count cleanup: ${count.value}`
    }
    onCleanup(cancel)
  }, {
    // 侦听器在响应式依赖改变时立即触发
    flush: 'sync',
    // 响应属性或引用作为依赖项被跟踪时调用
    onTrack(event : DebuggerEvent) {
      if (event.type === 'get') {
        // #ifndef VUE3-VAPOR
        watchCountTrackNum.value++
        // #endif
      }
    },
  })

  const triggerStopWatchCount = () => stopWatchCount()

  const increment = () => {
    count.value++
  }

  const obj = reactive({
    num: 0,
    str: 'num: 0',
    bool: false,
    arr: [0]
  } as Obj)

  const watchObjRes = ref('')
  watchEffect(() => {
    watchObjRes.value = `obj: ${JSON.stringify(obj)}`
  })

  const objStrRef = ref<UniTextElement | null>(null)
  const watchObjStrRes = ref('')
  const watchObjStrTriggerNum = ref(0)
  
  watchEffect(() => {
    if (objStrRef.value !== null) {
      // #ifdef APP
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text (flush pre): ${objStrRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text (flush pre): ${(objStrRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text (flush pre): `
    }
  }, {
    // 侦听器在组件渲染之前触发
    flush: 'pre',
    // 侦听器回调被依赖项的变更触发时调用
    onTrigger(event : DebuggerEvent) {
      if (event.type === 'set') {
        watchObjStrTriggerNum.value++
      }
    }
  })

  const objBoolRef = ref<UniTextElement | null>(null)
  const watchObjBoolRes = ref('')
  watchEffect(() => {
    if (objBoolRef.value !== null) {
      // #ifdef APP
      watchObjBoolRes.value = `bool: ${obj.bool}, obj.bool ref text (flush post): ${objBoolRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchObjBoolRes.value = `bool: ${obj.bool}, obj.bool ref text (flush post): ${(objBoolRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchObjBoolRes.value = `bool: ${obj.bool}, obj.bool ref text (flush post): `
    }
  }, {
    // 侦听器延迟到组件渲染之后触发
    flush: 'post'
  })


  const watchObjArrRes = ref('')
  watchEffect(() => {
    watchObjArrRes.value = `arr: ${JSON.stringify(obj.arr)}`
  })

  const watchCountAndObjNumRes = ref('')
  watchEffect(() => {
    watchCountAndObjNumRes.value = `count: ${count.value}, obj.num: ${obj.num}`
  })

  const updateObj = () => {
    obj.num++
    obj.str = `num: ${obj.num}`
    obj.bool = !obj.bool
    obj.arr.push(obj.num)
  }
</script>
```

:::

#### watchPostEffect

[watchEffect()](#watcheffect) 使用 `flush: 'post'` 选项时的别名。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/watch-post-effect/watch-post-effect.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/watch-post-effect/watch-post-effect

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
    <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mb-10">
        <text>count:</text>
        <text id="count" ref="countRef">{{ count }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count result:</text>
        <text id="watch-count-res">{{ watchCountRes }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch count track number:</text>
        <text id="watch-count-track-num">{{ watchCountTrackNum }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count cleanup number:</text>
        <text id="watch-count-cleanup-res">{{ watchCountCleanupRes }}</text>
      </view>

      <button class="increment-btn mb-10" @click="increment">increment</button>
      <button class="stop-watch-count-btn mb-10" @click="triggerStopWatchCount">
        stop watch count
      </button>

      <view class="flex justify-between flex-row mb-10">
        <text>obj.str:</text>
        <text id="obj-str" ref="objStrRef">{{ obj.str }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch obj.str trigger number:</text>
        <text id="watch-obj-str-trigger-num">{{ watchObjStrTriggerNum }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj.num }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.bool:</text>
        <text id="obj-bool" ref="objBoolRef">{{ obj.bool }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.arr:</text>
        <text id="obj-arr" ref="objArrRef">{{ JSON.stringify(obj.arr) }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj result:</text>
        <text id="watch-obj-res">{{ watchObjRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.str result:</text>
        <text id="watch-obj-str-res">{{ watchObjStrRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.arr result:</text>
        <text id="watch-obj-arr-res">{{ watchObjArrRes }}</text>
      </view>

      <button class="update-obj-btn mb-10" @click="updateObj">
        update obj
      </button>

      <view class="flex justify-between mb-10">
        <text>watch count and obj.num result:</text>
        <text id="watch-count-obj-num-res">{{ watchCountAndObjNumRes }}</text>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang='uts'>
  type Obj = {
    num : number,
    str : string,
    bool : boolean,
    arr : number[]
  }

  const countRef = ref<UniTextElement | null>(null)
  const count = ref<number>(0)
  const watchCountRes = ref('')
  const watchCountCleanupRes = ref('')
  const watchCountTrackNum = ref(0)

  const stopWatchCount = watchPostEffect((onCleanup : OnCleanup) => {
    if (countRef.value !== null) {
      // #ifdef APP
      watchCountRes.value = `count: ${count.value}, count ref text: ${countRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchCountRes.value = `count: ${count.value}, count ref text: ${(countRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchCountRes.value = `count: ${count.value}, count ref text: `
    }
    const cancel = () => {
      watchCountCleanupRes.value = `watch count cleanup: ${count.value}`
    }
    onCleanup(cancel)
  },
    {
      // 响应属性或引用作为依赖项被跟踪时调用
      onTrack(event : DebuggerEvent) {
        if (event.type === 'get') {
          // #ifndef VUE3-VAPOR
          watchCountTrackNum.value++
          // #endif
        }
      }
    },
  )

  const triggerStopWatchCount = () => stopWatchCount()

  const increment = () => {
    count.value++
  }

  const obj = reactive({
    num: 0,
    str: 'num: 0',
    bool: false,
    arr: [0]
  } as Obj)

  const watchObjRes = ref('')
  watchPostEffect(() => {
    watchObjRes.value = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}`
  })

  const objStrRef = ref<UniTextElement | null>(null)
  const watchObjStrRes = ref('')
  const watchObjStrTriggerNum = ref(0)
  
  watchPostEffect(() => {
    if (objStrRef.value !== null) {
      // #ifdef APP
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text: ${objStrRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text: ${(objStrRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text: `
    }
  },{
    // 侦听器回调被依赖项的变更触发时调用
    onTrigger(event : DebuggerEvent) {
      if (event.type === 'set') {
        watchObjStrTriggerNum.value++
      }
    }
  })

  const watchObjArrRes = ref('')
  watchPostEffect(() => {
    watchObjArrRes.value = `arr: ${JSON.stringify(obj.arr)}`
  })

  const watchCountAndObjNumRes = ref('')
  watchPostEffect(() => {
    watchCountAndObjNumRes.value = `count: ${count.value}, obj.num: ${obj.num}`
  })

  const updateObj = () => {
    obj.num++
    obj.str = `num: ${obj.num}`
    obj.bool = !obj.bool
    obj.arr.push(obj.num)
  }
</script>
```

:::

#### watchSyncEffect

[watchEffect()](#watcheffect) 使用 `flush: 'sync'` 选项时的别名。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/watch-sync-effect/watch-sync-effect.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/watch-sync-effect/watch-sync-effect

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
    <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mb-10">
        <text>count:</text>
        <text id="count" ref="countRef">{{ count }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count result:</text>
        <text id="watch-count-res">{{ watchCountRes }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch count track number:</text>
        <text id="watch-count-track-num">{{ watchCountTrackNum }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count cleanup number:</text>
        <text id="watch-count-cleanup-res">{{ watchCountCleanupRes }}</text>
      </view>

      <button class="increment-btn mb-10" @click="increment">increment</button>
      <button class="stop-watch-count-btn mb-10" @click="triggerStopWatchCount">
        stop watch count
      </button>

      <view class="flex justify-between flex-row mb-10">
        <text>obj.str:</text>
        <text id="obj-str" ref="objStrRef">{{ obj.str }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch obj.str trigger number:</text>
        <text id="watch-obj-str-trigger-num">{{ watchObjStrTriggerNum }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj.num }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.bool:</text>
        <text id="obj-bool" ref="objBoolRef">{{ obj.bool }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.arr:</text>
        <text id="obj-arr" ref="objArrRef">{{ JSON.stringify(obj.arr) }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj result:</text>
        <text id="watch-obj-res">{{ watchObjRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.str result:</text>
        <text id="watch-obj-str-res">{{ watchObjStrRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.arr result:</text>
        <text id="watch-obj-arr-res">{{ watchObjArrRes }}</text>
      </view>

      <button class="update-obj-btn mb-10" @click="updateObj">
        update obj
      </button>

      <view class="flex justify-between mb-10">
        <text>watch count and obj.num result:</text>
        <text id="watch-count-obj-num-res">{{ watchCountAndObjNumRes }}</text>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang='uts'>
  type Obj = {
    num : number,
    str : string,
    bool : boolean,
    arr : number[]
  }

  const countRef = ref<UniTextElement | null>(null)
  const count = ref(0)
  const watchCountRes = ref('')
  const watchCountCleanupRes = ref('')
  const watchCountTrackNum = ref(0)

  const stopWatchCount = watchSyncEffect((onCleanup : OnCleanup) => {
    if (countRef.value !== null) {
      // #ifdef APP
      watchCountRes.value = `count: ${count.value}, count ref text: ${countRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchCountRes.value = `count: ${count.value}, count ref text: ${(countRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchCountRes.value = `count: ${count.value}, count ref text: `
    }
    const cancel = () => {
      watchCountCleanupRes.value = `watch count cleanup: ${count.value}`
    }
    onCleanup(cancel)
  },
    {
      // 响应属性或引用作为依赖项被跟踪时调用
      onTrack(event : DebuggerEvent) {
        if (event.type === 'get') {
          // #ifndef VUE3-VAPOR
          watchCountTrackNum.value++
          // #endif
        }
      }
    },
  )

  const triggerStopWatchCount = () => stopWatchCount()

  const increment = () => {
    count.value++
  }

  const obj = reactive({
    num: 0,
    str: 'num: 0',
    bool: false,
    arr: [0]
  } as Obj)

  const watchObjRes = ref('')
  watchSyncEffect(() => {
    watchObjRes.value = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}`
  })

  const objStrRef = ref<UniTextElement | null>(null)
  const watchObjStrRes = ref('')
  const watchObjStrTriggerNum = ref(0)
  
  watchSyncEffect(() => {
    if (objStrRef.value !== null) {
      // #ifdef APP
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text: ${objStrRef.value!.value}`
      // #endif
      // #ifdef WEB
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text: ${(objStrRef.value!.childNodes[0] as HTMLElement).innerText}`
      // #endif 
    } else {
      watchObjStrRes.value = `str: ${obj.str}, obj.str ref text: `
    }
  }, {
    // 侦听器回调被依赖项的变更触发时调用
    onTrigger(event : DebuggerEvent) {
      if (event.type === 'set') {
        watchObjStrTriggerNum.value++
      }
    }
  })

  const watchObjArrRes = ref('')
  watchSyncEffect(() => {
    watchObjArrRes.value = `arr: ${JSON.stringify(obj.arr)}`
  })

  const watchCountAndObjNumRes = ref('')
  watchSyncEffect(() => {
    watchCountAndObjNumRes.value = `count: ${count.value}, obj.num: ${obj.num}`
  })

  const updateObj = () => {
    obj.num++
    obj.str = `num: ${obj.num}`
    obj.bool = !obj.bool
    obj.arr.push(obj.num)
  }
</script>
```

:::

## 响应式: 工具

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| isRef() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| unref() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| toRef() | 4.11 | 4.41 | 4.0 | 4.11 | 4.61 |
| toValue() | 4.11 | 4.41 | 4.0 | 4.11 | 4.61 |
| toRefs() | 4.11 | 4.41 | 4.0 | 4.11 | 4.61 |
| isProxy() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| isReactive() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| isReadonly() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |


::: warning 注意
- `toRefs()` 仅支持 `Array` 和 `UTSJSONObject`, 不支持自定义类型。
:::

### 示例代码 @example

#### isRef

检查某个值是否为 ref。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/is-ref/is-ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/is-ref/is-ref

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>ref count:</text>
      <text id="ref-count">{{ refCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isRef ref count:</text>
      <text id="is-ref-ref-count">{{ isRefRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isRef count:</text>
      <text id="is-ref-count">{{ isRefCount }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
const refCount = ref(0);
const count = 0;
const isRefRefCount = isRef(refCount);
const isRefCount = isRef(count);
</script>

```

:::

#### unref

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/un-ref/un-ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/un-ref/un-ref

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>ref count:</text>
      <text id="ref-count">{{ refCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>ref count type:</text>
      <text id="ref-count-type">{{ refCountType }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>count type:</text>
      <text id="count-type">{{ countType }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
const refCount = ref<number>(0);
const refCountType = typeof refCount;
const count = unref(refCount);
const countType = typeof count;
</script>

```

:::

#### toRef

可以将值、refs 或 getters 规范化为 refs。

也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/to-ref/to-ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/to-ref/to-ref

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isRef count:</text>
      <text id="is-ref-count">{{ isRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>ref count:</text>
      <text id="ref-count">{{ refCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isRef ref count:</text>
      <text id="is-ref-ref-count">{{ isRefRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.num:</text>
      <text id="obj-num">{{ obj.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>toRef(obj, "num"):</text>
      <text id="to-ref-obj-num">{{ objNum }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>toRef(() => obj.num):</text>
      <text id="to-ref-fn-obj-num">{{ readonlyObjNum }}</text>
    </view>

    <button class="mt-10" id="increment-btn" @click="increment">
      increment obj.num
    </button>
  </view>
</template>

<script setup lang="uts">
const count = 0;
const isRefCount = isRef(count);
const refCount = toRef<number>(count);
const isRefRefCount = isRef(refCount);

type Obj = {
  num : number
}
const obj = reactive({
  num: 0
} as Obj)

const objNum = toRef<number>(obj, 'num')

const readonlyObjNum = toRef<number>(() : number => obj.num)

const increment = () => {
  obj.num++;
  objNum.value++;
  readonlyObjNum.value++;
}
</script>

```

:::

#### toValue

将值、refs 或 getters 规范化为值。这与 [unref()](#unref) 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/to-value/to-value.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/to-value/to-value

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>ref count:</text>
      <text id="ref-count">{{ refCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isRef ref count:</text>
      <text id="is-ref-ref-count">{{ isRefRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isRef count:</text>
      <text id="is-ref-count">{{ isRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.num:</text>
      <text id="obj-num">{{ obj.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>toValue(() => obj.num):</text>
      <text id="to-value-obj-num">{{ toValueObjNum }}</text>
    </view>
    <button class="mt-10" id="increment-btn" @click="increment">
      increment obj.num
    </button>
  </view>
</template>

<script setup lang="uts">
const refCount = ref<number>(0);;
const isRefRefCount = isRef(refCount);
const count = toValue(refCount);
const isRefCount = isRef(count);

type Obj = {
  num : number
}
const obj = reactive({
  num: 0
} as Obj)

let toValueObjNum = toValue(() : number => 0)

const increment = () => {
  obj.num++;
  toValueObjNum++;
}
</script>

```

:::

#### toRefs

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [toRef()](#toref) 创建的。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/to-refs/to-refs.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/to-refs/to-refs

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>state.num:</text>
      <text id="state-num">{{ state['num'] }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>state.str:</text>
      <text id="state-str">{{ state['str'] }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>stateAsRefs.num:</text>
      <text id="state-as-refs-num">{{ (stateAsRefs['num'] as Ref<number>).value }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>stateAsRefs.str:</text>
      <text id="state-as-refs-str">{{ (stateAsRefs['str'] as Ref<string>).value }}</text>
    </view>
    <button class="mt-10" id="update-state-btn" @click="updateState">update state</button>
  </view>
</template>

<script setup lang='uts'>
  // toRefs 仅支持 array 和 UTSJSONObject, 不支持自定义类型
  const state = reactive({
    num: 0,
    str: 'str-0'
  })

  const stateAsRefs = toRefs(state)

  const updateState = () => {
    state['num'] = (state['num'] as number) + 1;
    (stateAsRefs['str'] as Ref<string>).value = `str-${(stateAsRefs['num'] as Ref<number>).value}`
  }
</script>
```

:::

#### isProxy

检查一个对象是否是由 [reactive()](#reactive)、[readonly()](#readonly)、[shallowReactive()](#shallowreactive) 或 [shallowReadonly()](#shallowreadonly) 创建的代理。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/is-proxy/is-proxy.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/is-proxy/is-proxy

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>isProxy(count):</text>
      <text id="is-proxy-count">{{ isProxyCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isProxy(refCount):</text>
      <text id="is-proxy-ref-count">{{ isProxyRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isProxy(reactiveCount):</text>
      <text id="is-proxy-reactive-count">{{ isProxyReactiveCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isProxy(readonlyCount):</text>
      <text id="is-proxy-readonly-count">{{ isProxyReadonlyCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isProxy(shallowReactiveCount):</text>
      <text id="is-proxy-shallow-reactive-count">{{
        isProxyShallowReactiveCount
      }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isProxy(shallowReadonlyCount):</text>
      <text id="is-proxy-shallow-readonly-count">{{
        isProxyShallowReadonlyCount
      }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
const count = 0;
const isProxyCount = isProxy(count);

const refCount = ref(0);
const isProxyRefCount = isProxy(refCount);

const reactiveCount = reactive({ count: 0 });
const isProxyReactiveCount = isProxy(reactiveCount);

const readonlyCount = readonly({ count: 0 });
const isProxyReadonlyCount = isProxy(readonlyCount);

const shallowReactiveCount = shallowReactive({ count: 0 });
const isProxyShallowReactiveCount = isProxy(shallowReactiveCount);

const shallowReadonlyCount = shallowReadonly({ count: 0 });
const isProxyShallowReadonlyCount = isProxy(shallowReadonlyCount);
</script>

```

:::

#### isReactive

检查一个对象是否是由 [reactive()](#reactive) 或 [shallowReactive()](#shallowreactive) 创建的代理。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/is-reactive/is-reactive.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/is-reactive/is-reactive

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(count):</text>
      <text id="is-reactive-count">{{ isReactiveCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(count):</text>
      <text id="is-reactive-count">{{ isReactiveCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(refCount):</text>
      <text id="is-reactive-ref-count">{{ isReactiveRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(reactiveCount):</text>
      <text id="is-reactive-reactive-count">{{ isReactiveReactiveCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(readonlyCount):</text>
      <text id="is-reactive-readonly-count">{{ isReactiveReadonlyCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(shallowReactiveCount):</text>
      <text id="is-reactive-shallow-reactive-count">{{
        isReactiveShallowReactiveCount
      }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReactive(shallowReadonlyCount):</text>
      <text id="is-reactive-shallow-readonly-count">{{
        isReactiveShallowReadonlyCount
      }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
const count = 0;
const isReactiveCount = isReactive(count);

const refCount = ref(0);
const isReactiveRefCount = isReactive(refCount);

const reactiveCount = reactive({ count: 0 });
const isReactiveReactiveCount = isReactive(reactiveCount);

const readonlyCount = readonly({ count: 0 });
const isReactiveReadonlyCount = isReactive(readonlyCount);

const shallowReactiveCount = shallowReactive({ count: 0 });
const isReactiveShallowReactiveCount = isReactive(shallowReactiveCount);

const shallowReadonlyCount = shallowReadonly({ count: 0 });
const isReactiveShallowReadonlyCount = isReactive(shallowReadonlyCount);
</script>

```

:::

#### isReadonly

检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。

通过 [readonly()](#readonly) 和 [shallowReadonly()](#shallowreadonly) 创建的代理都是只读的，因为他们是没有 set 函数的 [computed()](#computed) ref。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/utilities/is-readonly/is-readonly.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/utilities/is-readonly/is-readonly

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>isReadonly(count):</text>
      <text id="is-readonly-count">{{ isReadonlyCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReadonly(refCount):</text>
      <text id="is-readonly-ref-count">{{ isReadonlyRefCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReadonly(reactiveCount):</text>
      <text id="is-readonly-reactive-count">{{ isReadonlyReactiveCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReadonly(readonlyCount):</text>
      <text id="is-readonly-readonly-count">{{ isReadonlyReadonlyCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReadonly(shallowReactiveCount):</text>
      <text id="is-readonly-shallow-reactive-count">{{
        isReadonlyShallowReactiveCount
      }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>isReadonly(shallowReadonlyCount):</text>
      <text id="is-readonly-shallow-readonly-count">{{
        isReadonlyShallowReadonlyCount
      }}</text>
    </view>
  </view>
</template>

<script setup lang='uts'>
  const count = 0;
  const isReadonlyCount = isReadonly(count);

  const refCount = ref(0);
  const isReadonlyRefCount = isReadonly(refCount);

  const reactiveCount = reactive({ count: 0 });
  const isReadonlyReactiveCount = isReadonly(reactiveCount);

  const readonlyCount = readonly({ count: 0 });
  const isReadonlyReadonlyCount = isReadonly(readonlyCount);

  const shallowReactiveCount = shallowReactive({ count: 0 });
  const isReadonlyShallowReactiveCount = isReadonly(shallowReactiveCount);

  const shallowReadonlyCount = shallowReadonly({ count: 0 });
  const isReadonlyShallowReadonlyCount = isReadonly(shallowReadonlyCount);
</script>
```

:::

## 响应式: 进阶

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| shallowRef() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| triggerRef() | x | 4.41 | 4.0 | 4.11 | 4.61 |
| customRef() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| shallowReactive() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| shallowReadonly() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| toRaw() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| markRaw() | - | - | - | - | - |
| effectScope() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| getCurrentScope() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |
| onScopeDispose() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 |


### 示例代码 @example

#### customRef

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

- 详细信息

  `customRef()` 预期接收一个工厂函数作为参数，这个工厂函数接受 `track` 和 `trigger` 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。

  一般来说，`track()` 应该在 `get()` 方法中调用，而 `trigger()` 应该在 `set()` 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/custom-ref/custom-ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/custom-ref/custom-ref

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>state.count:</text>
      <text id="state-count">{{ state['count'] }}</text>
    </view>
    <button class="mb-10 increment-btn" @click="increment">
      increment state.count
    </button>
    <button class="mb-10 trigger-ref-btn" @click="triggerRefState">
      triggerRef state
    </button>
  </view>
</template>

<script setup lang="uts">
const useCustomRef = (value : UTSJSONObject) : Ref<UTSJSONObject> => {
  // @ts-ignore
  return customRef<UTSJSONObject>((track, trigger) => {
    return {
      get() : UTSJSONObject {
        track()
        return value
      },
      set(newValue : UTSJSONObject) {
        value = newValue
        trigger()
      }
    }
  })
}

const state = useCustomRef({ count: 0 })


const increment = () => {
  state.value['count'] = (state.value['count'] as number) + 1
}
const triggerRefState = () => {
  triggerRef(state)
}
</script>

```

:::

#### effectScope

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。对于该 API 的使用细节

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/effect-scope/effect-scope.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/effect-scope/effect-scope

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>counter:</text>
      <text id="counter">{{ counter }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>watch counter result:</text>
      <text id="watch-counter-res">{{ watchCounterRes }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>watchEffect counter result:</text>
      <text id="watch-effect-counter-res">{{ watchEffectCounterRes }}</text>
    </view>
    <button
      id="increment-counter-btn"
      class="mt-10"
      @click="
        () => {
          counter++;
        }
      ">
      increment counter
    </button>
    <button id="stop-effect-scope-btn" class="mt-10" @click="stopEffectScope">
      stop effect scope
    </button>
  </view>
</template>

<script setup lang="uts">
const scope = effectScope()

const counter = ref(0)

const watchCounterRes = ref('')

const watchEffectCounterRes = ref('')

scope.run(() => {
  watch(counter, (newVal : number, oldVal : number) => {
    watchCounterRes.value = `newVal: ${newVal}, oldVal: ${oldVal}`
  })

  watchEffect(() => {
    watchEffectCounterRes.value = `counter: ${counter.value}`
  })
})

const stopEffectScope = () => scope.stop()
</script>

```

:::

#### getCurrentScope

如果有的话，返回当前活跃的 effect 作用域。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/get-current-scope/get-current-scope.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/get-current-scope/get-current-scope

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>hasCurrentScope:</text>
      <text id="has-current-scope">{{ hasCurrentScope }}</text>
    </view>
    <button id="create-scope-btn" class="mt-10" @click="createScope">
      create scope
    </button>
  </view>
</template>

<script setup lang="uts">
const hasCurrentScope = ref(false);

const createScope = () => {
  const scope = effectScope();
  scope.run(() => {
    hasCurrentScope.value = getCurrentScope() !== null;
  });
};
</script>

```

:::

#### onScopeDispose

在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

这个方法可以作为可复用的组合式函数中 `onUnmounted` 的替代品，它并不与组件耦合，因为每一个 Vue 组件的 `setup()` 函数也是在一个 effect 作用域中调用的。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/on-scope-dispose/on-scope-dispose.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/on-scope-dispose/on-scope-dispose

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>hasCurrentScope:</text>
      <text id="has-current-scope">{{ hasCurrentScope }}</text>
    </view>
    <button id="create-scope-btn" class="mt-10" @click="createScope">
      create scope
    </button>
    <button id="stop-scope-btn" class="mt-10" @click="stopScope">
      stop scope
    </button>
  </view>
</template>

<script setup lang="uts">
const hasCurrentScope = ref(false)

let scope = null as EffectScope | null

const createScope = () => {
  scope = effectScope();
  (scope as EffectScope).run(() => {
    hasCurrentScope.value = getCurrentScope() != null
    onScopeDispose(() => {
      hasCurrentScope.value = getCurrentScope() != null
    })
  })
}

const stopScope = () => {
  if (scope !== null) {
    (scope as EffectScope).stop()
  }
}
</script>

```

:::

#### shallowReactive

[reactive()](#reactive) 的浅层作用形式。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/shallow-reactive/shallow-reactive.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/shallow-reactive/shallow-reactive

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>state.count:</text>
      <text id="state-count">{{ state.count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>state.nested.count:</text>
      <text id="state-nested-count">{{ state.nested.count }}</text>
    </view>
    <button
      id="increment-state-count-btn"
      class="mb-10"
      @click="incrementStateCount">
      increment state.count
    </button>
    <button
      id="increment-state-nested-count-btn"
      @click="incrementStateNestedCount">
      increment state.nested.count
    </button>
  </view>
</template>

<script setup lang="uts">
type StateNested = {
  count : number
}
type State = {
  count : number,
  nested : StateNested
}
// 可通过泛型指定类型
const state = shallowReactive<State>({
  count: 0,
  nested: {
    count: 0
  }
})

const incrementStateCount = () => {
  state.count++
}

const incrementStateNestedCount = () => {
  state.nested.count++
}

defineExpose({
  state
})
</script>

```

:::

#### shallowReadonly

[readonly()](#readonly) 的浅层作用形式

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/shallow-readonly/shallow-readonly.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/shallow-readonly/shallow-readonly

```vue
<template>
  <view :key="pageKey" class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>state.count:</text>
      <text id="state-count">{{ state.count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>state.nested.count:</text>
      <text id="state-nested-count">{{ state.nested.count }}</text>
    </view>
    <button
      id="increment-state-count-btn"
      class="mb-10"
      @click="incrementStateCount">
      increment state.count
    </button>
    <button
      id="increment-state-nested-count-btn"
      class="mb-10"
      @click="incrementStateNestedCount">
      increment state.nested.count
    </button>
    <!-- #ifndef VUE3-VAPOR -->
    <button id="update-page-render-btn" @click="updatePageRender">
      update page render
    </button>
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
let pageKey = ref<number>(0)

type StateNested = {
  count : number
}
type State = {
  count : number,
  nested : StateNested
}
// 可通过泛型指定类型
const state = shallowReadonly<State>({
  count: 0,
  nested: {
    count: 0
  }
})

const reactiveState = reactive<State>(state)

// #ifdef APP
const incrementStateCount = () => {
  state.count++
}

const incrementStateNestedCount = () => {
  state.nested.count++
}
// #endif

const updatePageRender = () => {
  pageKey.value = Date.now()
}

defineExpose({
  reactiveState,
})
</script>

```

:::

#### shallowRef

[ref()](#ref) 的浅层作用形式。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/shallow-ref/shallow-ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/shallow-ref/shallow-ref

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>state.count:</text>
      <text id="state-count">{{ state.count }}</text>
    </view>
    <button
      id="increment-state-count-btn"
      class="mb-10"
      @click="incrementStateCount">
      increment state.count
    </button>
    <button id="update-state-btn" @click="updateState">update state</button>
  </view>
</template>

<script setup lang="uts">
type State = {
  count: number
}
// 可通过泛型指定类型
const state = shallowRef<State>({
  count: 0
})

const incrementStateCount = () => {
  state.value.count++
}

const updateState = () => {
  state.value = { count: state.value.count } as State
}
</script>

```

:::

#### toRaw

根据一个 Vue 创建的代理返回其原始对象。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/to-raw/to-raw.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/to-raw/to-raw

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>check toRaw ref:</text>
      <text id="check-to-raw-ref">{{ checkToRawRef }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>check toRaw reactive:</text>
      <text id="check-to-raw-reactive">{{ checkToRawReactive }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>check toRaw readonly:</text>
      <text id="check-to-raw-readonly">{{ checkToRawReadonly }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>check toRaw shallowReactive:</text>
      <text id="check-to-raw-shallow-reactive">{{
        checkToRawShallowReactive
      }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>check toRaw shallowReadonly:</text>
      <text id="check-to-raw-shallow-readonly">{{
        checkToRawShallowReadonly
      }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
const obj = {}

const refObj = ref(obj);
const checkToRawRef = toRaw<UTSJSONObject>(refObj) === obj;

const reactiveObj = reactive(obj);
const checkToRawReactive = toRaw<UTSJSONObject>(reactiveObj) === obj;

const readonlyObj = readonly(obj);
const checkToRawReadonly = toRaw<UTSJSONObject>(readonlyObj) === obj;

const shallowReactiveObj = shallowReactive(obj);
const checkToRawShallowReactive = toRaw<UTSJSONObject>(shallowReactiveObj) === obj;

const shallowReadonlyObj = shallowReadonly(obj);
const checkToRawShallowReadonly = toRaw<UTSJSONObject>(shallowReadonlyObj) === obj;
</script>

```

:::

#### triggerRef

强制触发依赖于一个[浅层 ref](#shallowref) 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/advanced/trigger-ref/trigger-ref.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/advanced/trigger-ref/trigger-ref

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>state.count:</text>
      <text id="state-count">{{ state.count }}</text>
    </view>
    <button
      id="increment-state-count-btn"
      class="mb-10"
      @click="incrementStateCount">
      increment state.count
    </button>
    <button id="trigger-ref-state-btn" @click="triggerRefState">
      trigger state
    </button>
  </view>
</template>

<script setup lang="uts">
type State = {
  count: number
}
const state = shallowRef({
  count: 0
} as State)

const incrementStateCount = () => {
  state.value.count++
}

const triggerRefState = () => {
  triggerRef(state)
}
</script>

```

:::

## 组合选项 @options-composition

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| provide | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| inject | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| mixins | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| extends | - | - | - | - | - |

### inject

当使用 `inject` 声明从上层提供方注入的属性时，支持两种写法：字符串数组和对象。推荐使用对象写法，因为当使用数组方法时，类型会被推导为 `any | null` 类型。\
使用对象写法时，额外增加 `type` 属性用于标记类型。如果注入的属性类型不是基础数据类型，需要通过 `PropType` 来标记类型：

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/inject/inject-composition.uvue)

::: preview

```vue
<template>
  <view>
    <text>inject page</text>
    <text class="mt-10 msg">msg: {{msg}}</text>
    <text class="mt-10 num">num: {{num}}</text>
    <text class="mt-10 obj">obj: {{JSON.stringify(obj)}}</text>
    <text class="mt-10 arr">arr: {{JSON.stringify(arr)}}</text>
    <text class="mt-10 arr-0">arr[0]: {{ arr[0]}}</text>
    <text class="mt-10 fn">fn: {{fnRes}}</text>
    <text class="mt-10 fn">notFoundWithWarning: {{notFoundWithWarning}}</text>
    <text class="mt-10 fn">notFoundWithDefaultValue: {{notFoundWithDefaultValue}}</text>
    <text class="mt-10 has-injection-context">hasInjectionContext:
      {{checkHasInjectionContextRes}}</text>
    <button class="mt-10 check-has-injection-context-btn" @click="checkHasInjectionContext">check
      hasInjectionContext</button>
  </view>
</template>

<script setup lang='uts'>
  const msg = inject<string>('msg')
  const num = inject('num')
  const obj = inject('obj')
  const arr = inject<number[]>('arr', [99])
  const fn = inject<() => string>('fn')
  const fnRes = ref('')
  if(fn != null){
    fnRes.value = fn()
  }
  
  const notFoundWithWarning = inject("notFoundWithWarning")
  const notFoundWithDefaultValue = inject("notFoundWithDefaultValue", null)
  

  const checkHasInjectionContextRes = ref('')

  const checkHasInjectionContext = () => {
    checkHasInjectionContextRes.value = `${hasInjectionContext()}`
  }
  checkHasInjectionContext()
</script>
```

:::

## 通用

### getCurrentInstance

访问内部组件实例。

::: warning 注意
- `getCurrentInstance` 只能在 setup 或生命周期钩子中调用。
- 在 `app` 端 `proxy` 属性可能为空，需使用 `!` 非空断言操作符。
:::

```uts
<script setup lang="uts">
// 通过 getCurrentInstance 获取当前 UniPage 对象
const instance = getCurrentInstance()!.proxy!
const currentPage = instance.$page

// 通过 getCurrentInstance 获取组件实例
const mapContext = ref(null as MapContext | null);
onReady(() => {
  mapContext.value = uni.createMapContext("map1", getCurrentInstance()!.proxy!)
})
</script>
```

## 生命周期钩子 @lifecycle-composition

> [页面及组件生命周期流程图](../page.md#lifecycleflow)

### 页面生命周期 @page-lifecycle-composition

#### 兼容性 @page-lifecycle-compatibility

[页面生命周期](../page.md#lifecycle)

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/page/page-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/page/page-composition

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1" :bounces="false">
    <!-- #endif -->
    <view class="page container">
      <text>page lifecycle 组合式 API</text>
      <view class="flex flex-row justify-between mt-10">
        <text>onLoad 触发：</text>
        <text>{{ isOnloadTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPageShow 触发：</text>
        <text>{{ isOnPageShowTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onReady 触发：</text>
        <text>{{ isOnReadyTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPullDownRefresh 触发：</text>
        <text>{{ isOnPullDownRefreshTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onReachBottom 触发：</text>
        <text>{{ isOnReachBottomTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onBackPress 触发：</text>
        <text>{{ isOnBackPressTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPageHide 触发：</text>
        <text>{{ isOnPageHideTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onResize 触发：</text>
        <text>{{ isOnResizeTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <MonitorPageLifecycleComposition />
      </view>
      <button class="mt-10" @click="scrollToBottom">scrollToBottom</button>
      <button class="mt-10" @click="pullDownRefresh">
        trigger pullDownRefresh
      </button>
      <button class="mt-10" @click="goOnBackPress">
        跳转 onBackPress 示例
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
import { state, setLifeCycleNum } from '@/store/index.uts'
import MonitorPageLifecycleComposition from './monitor-page-lifecycle-composition.uvue'

const isOnloadTriggered = ref(false)
const isOnPageShowTriggered = ref(false)
const isOnReadyTriggered = ref(false)
const isOnPullDownRefreshTriggered = ref(false)
const isOnPageScrollTriggered = ref(false)
const isOnReachBottomTriggered = ref(false)
const isOnBackPressTriggered = ref(false)
const isOnPageHideTriggered = ref(false)
const isOnResizeTriggered = ref(false)

type DataInfo = {
  isScrolled : boolean
}
const dataInfo = reactive({
  isScrolled: false,
} as DataInfo)

onLoad((options : OnLoadOptions) => {
  console.log('onLoad', options)
  isOnloadTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 100)
})
onPageShow(() => {
  isOnPageShowTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onReady(() => {
  isOnReadyTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onPullDownRefresh(() => {
  isOnPullDownRefreshTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onPageScroll((e: OnPageScrollOptions) => {
  console.log('onPageScroll', e)
  isOnPageScrollTriggered.value = true
  // 自动化测试
  dataInfo.isScrolled = true
})
onReachBottom(() => {
  isOnReachBottomTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})
onBackPress((options : OnBackPressOptions) : boolean | null => {
  console.log('onBackPress', options)
  isOnBackPressTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 10)
  return null
})
onPageHide(() => {
  isOnPageHideTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 10)
})
onUnload(() => {
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum - 100)
})
onResize((options: OnResizeOptions) => {
  console.log('onBackPress', options)
  isOnResizeTriggered.value = true
  // 自动化测试
  setLifeCycleNum(state.lifeCycleNum + 10)
})

// 自动化测试
const pageGetLifeCycleNum = () : number => {
  return state.lifeCycleNum
}
// 自动化测试
const pageSetLifeCycleNum = (num : number) => {
  setLifeCycleNum(num)
}

// 自动化测试
const pullDownRefresh = () => {
  uni.startPullDownRefresh({
    success() {
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1500)
    },
  })
}

const scrollToBottom = () => {
  uni.pageScrollTo({
    scrollTop: 2000,
  })
}

const goOnBackPress = () => {
  uni.navigateTo({url: '/pages/lifecycle/page/onBackPress/on-back-press-composition'})
}

defineExpose({
  dataInfo,
  pageGetLifeCycleNum,
  pageSetLifeCycleNum,
  pullDownRefresh,
  scrollToBottom,
})
</script>

<style>
.container {
  height: 1200px;
}
</style>

```

:::

### 组件生命周期 @page-component-composition

#### 兼容性 @component-lifecycle-compatibility

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

#### onMounted、onUnmounted 使用注意事项 @mounted-unmounted-tips

目前 App平台 onMounted、onUnmounted 可以保证当前数据已经同步到 DOM，但是由于排版和渲染是异步的的，所以 onMounted、onUnmounted 不能保证 DOM 排版以及渲染完毕。\
如果需要获取排版后的节点信息推荐使用 [uni.createSelectorQuery](../api/nodes-info.md) 不推荐直接使用 [Element](../dom/unielement.md) 对象。\
在修改 DOM 后，立刻使用 [Element](../dom/unielement.md) 对象的同步接口获取 DOM 状态可能获取到的是排版之前的，而 [uni.createSelectorQuery](../api/nodes-info.md) 可以保障获取到的节点信息是排版之后的。

注：页面的 onReady 生命周期可以获取到排版后的节点信息

#### onActivated、onDeactivated 使用注意事项 @activated-deactivated-tips

当 A 页面存在 `keepAlive` 组件，A 页面 `navigateTo` B 页面时
- Web 端 A 页面中 `keepAlive` 的组件会触发 `onDeactivated` 生命周期
- App 端 A 页面中 `keepAlive` 的组件不会触发 `onDeactivated` 生命周期

当 B 页面 back 返回 A 页面时
- Web 端 A 页面中 `keepAlive` 的组件会触发 `onActivated` 生命周期
- App 端 A 页面中 `keepAlive` 的组件不会触发 `onActivated` 生命周期

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/component/ChildComponentComposition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/component/ChildComponentComposition

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

:::


## \<script setup> @script_setup

### 基本语法 @basic-syntax

- 仅支持 `export default {}` 方式定义组件。
- `data` 仅支持函数返回对象字面量方式。
  ```ts
  <script lang="uts">
    export default {
      data() {
        return {
          // 必须写这里
        }
      }
    }
  </script>
  ```
-

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| setup | Any | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | - |
| lang | Any | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 |  |

#### lang 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ts | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | typescript |
| uts | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | uts |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | 4.11 | 4.61 |





##### 参见


### 示例 @example

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/setup-function/setup-function.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/setup-function/setup-function

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mt-10">
        <text>str:</text>
        <text id="str">{{ str }}</text>
      </view>
      <view class="flex justify-between flex-row mt-10">
        <text>num:</text>
        <text id="num">{{ num }}</text>
      </view>
      <view class="flex justify-between flex-row mt-10">
        <text>bool:</text>
        <text id="bool">{{ bool }}</text>
      </view>
      <view class="flex justify-between flex-row mt-10">
        <text>count:</text>
        <text id="count">{{ count }}</text>
      </view>
      <button class="mt-10" id="increment-btn" @click="increment">
        increment count
      </button>
      <view class="flex justify-between flex-row mt-10">
        <text>obj.str:</text>
        <text id="obj-str">{{ obj['str'] }}</text>
      </view>
      <view class="flex justify-between flex-row mt-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj['num'] }}</text>
      </view>
      <view class="flex justify-between flex-row mt-10">
        <text>obj.bool:</text>
        <text id="obj-bool">{{ obj['bool'] }}</text>
      </view>
      <button class="mt-10" id="update-obj-btn" @click="updateObj">
        update obj
      </button>
      <!-- #ifdef APP -->
      <RenderFunction
        :str="str"
        :count="count"
        :obj="obj"
        @compUpdateObj="compUpdateObj"
        :isShow="true" />
      <!-- #endif -->
      <Foo>
        <text class="mt-10" id="default-slot-in-foo">default slot in Foo</text>
      </Foo>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
// #ifdef APP
import RenderFunction from './RenderFunction.uvue'
// #endif
import Foo from './Foo.uvue'
export default {
  components: {
    // #ifdef APP
    RenderFunction,
    // #endif
    Foo
  },
  setup() {
    const count = ref(0)
    // 函数只能通过声明变量,赋值函数的方式,不支持 function xxx(){}
    const increment = () => { count.value++ }
    const obj = reactive({
      str: 'obj default str',
      num: 0,
      bool: false,
    })
    const updateObj = () => {
      obj['str'] = 'obj new str'
      obj['num'] = 100
      obj['bool'] = true
    }
    const compUpdateObj = () => {
      obj['str'] = 'obj new str by comp update'
      obj['num'] = 200
      obj['bool'] = true
    }
    return {
      str: 'default str',
      num: 0,
      bool: false,
      count,
      increment,
      obj,
      updateObj,
      compUpdateObj
    }
  }
}
</script>

```

:::


## 单文件组件中方法兼容性 @single-file-component-script-methods

|  | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| defineProps() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| defineEmits() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| defineModel() | 4.11 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| defineExpose() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| defineOptions() | 4.11 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| defineSlots() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| useSlots() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| useAttrs() | 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |
| useRecycleState() | x | x | x | x | x | 5.0 |


### defineProps()

仅支持数组字面量、对象字面量定义（等同于 `options` 中的 `props`规则）及使用纯类型参数的方式来声明。

#### 示例

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/props/props-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/props/props-composition

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

:::


### defineEmits()

仅支持数组字面量和纯类型参数的方式来声明。

```ts
// 数组字面量
const emit = defineEmits(['change'])

// 纯类型参数
const emit = defineEmits<{
  (e : 'change', id : number) : void
}>()
const emit = defineEmits<{
  // 具名元组语法
  change : [id: number]
}>()

```

#### 示例

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/emit-function/emit-function-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/emit-function/emit-function-composition

```vue
<template>
  <view>
    <button @click="click" class="call-parent-btn">调用父组件事件</button>
  </view>
</template>

<script setup lang="uts">
const emit = defineEmits(['callback'])

const click = () => {
  emit('callback', `${Date.now()}`)
}

defineExpose({
  click
})
</script>
```

:::

### defineOptions()

仅支持对象字面量方式定义。

```ts
defineOptions({
  data() {
    return {
      count: 0,
      price: 10,
      total: 0
    }
  },
  computed: {
    doubleCount() : number {
      return this.count * 2
    },
  },
  watch: {
    count() {
      this.total = this.price * this.count
    },
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

#### 示例

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/options/options-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/options/options-composition

```vue
<template>
  <view class="page">
    <view class="mb-10 flex justify-between flex-row">
      <text>component name: </text>
      <text id="component-name">{{ dataInfo.name }}</text>
    </view>
    <!-- #ifndef APP-ANDROID -->
    <view class="mb-10 flex justify-between flex-row">
      <text>custom key: </text>
      <text id="custom-key">{{ dataInfo.customKey }}</text>
    </view>
    <!-- #ifndef VUE3-VAPOR -->
    <view class="mb-10 flex justify-between flex-row">
      <text>mixin data str: </text>
      <text id="mixin-data-str">{{ dataInfo.mixinDataStr }}</text>
    </view>
    <!-- #endif -->
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
// #ifndef VUE3-VAPOR
import mixins from "./mixins.uts"
// #endif

defineOptions({
  // #ifndef VUE3-VAPOR
  mixins: [mixins],
  // #endif
  name: "$options",
  _customKey: "custom key"
})

type DataInfo = {
  name: string
  customKey: string
  // #ifdef VUE3-VAPOR
  mixinDataStr: string
  // #endif
}

const dataInfo = reactive({
  name: "",
  customKey: "",
  // #ifdef VUE3-VAPOR
  mixinDataStr: ""
  // #endif
} as DataInfo)

onMounted(() => {
  const instance = getCurrentInstance()!.proxy!
  dataInfo.name = instance.$options.name!
  // #ifndef APP-ANDROID
  dataInfo.customKey = instance.$options._customKey
  // #ifndef VUE3-VAPOR
  dataInfo.mixinDataStr = instance.$options.data!({})!['str']
  // #endif
  // #endif
})

defineExpose({
  dataInfo
})
</script>

```

:::

### defineExpose()

使用 `<script setup>` 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性，注意：

- 仅支持对象字面量方式定义 `defineExpose` 导出的属性, 例如：
```js
defineExpose({
  count
})
```
- 导出的变量或方法，必须是 `setup` 中定义的，暂不支持外部定义

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


### defineModel()

这个宏可以用来声明一个双向绑定 prop，通过父组件的 `v-model` 来使用。组件 [v-model](./built-in.md#v-model) 指南中也讨论了示例用法。

在底层，这个宏声明了一个 model prop 和一个相应的值更新事件。如果第一个参数是一个字符串字面量，它将被用作 prop 名称；否则，prop 名称将默认为 `"modelValue"`。在这两种情况下，你都可以再传递一个额外的对象，它可以包含 prop 的选项和 model ref 的值转换选项。

**注意：** android 端 `defineModel` 暂不支持创建 `Array` 类型 `prop`。

#### 示例

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-model/Foo-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-model/v-model-composition

```vue
<template>
  <view>
    <view class="mb-10 flex justify-between flex-row">
      <text>v-model in Foo:</text>
      <text id="model-value-text">{{ modelValue }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>v-model:msg in Foo:</text>
      <text id="model-msg-text">{{ msg }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>defineModel num:</text>
      <text id="model-num-text">{{ num }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>defineModel strArr:</text>
      <text id="model-str-arr-text">{{ JSON.stringify(strArr) }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>defineModel numArr:</text>
      <text id="model-num-arr-text">{{ JSON.stringify(numArr) }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>defineModel utsObj.value:</text>
      <text id="model-uts-obj-value-text">{{ utsObjModelValue }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>defineModel typeObj.value:</text>
      <text id="model-type-obj-value-text">{{ typeObjModelValue }}</text>
    </view>
    <button class="mb-10" id="update-value-btn" @click="updateValue">
      update value
    </button>
  </view>
</template>

<script setup lang="uts">
// 在被修改时，触发 "update:modelValue" 事件
const modelValue = defineModel({ type: String })

// 在被修改时，触发 "update:msg" 事件
const msg = defineModel('msg', { type: String, default: 'default msg' })

const num = defineModel('num', { type: Number, default: 1 })

const strArr = defineModel<string[]>('strArr', { default: () => [] as string[] })
const numArr = defineModel('numArr', {type: Array as PropType<number[]>, required: true })

const utsObjModelValue = defineModel('utsObjModelValue', { type: String })
const typeObjModelValue = defineModel('typeObjModelValue', { type: String })

const updateValue = () => {
  modelValue.value += '1'
  msg.value += '2'
  num.value++
  strArr.value.push(`${strArr.value.length}`)
  numArr.value.push(numArr.value.length)
  utsObjModelValue.value += '1'
  typeObjModelValue.value += '1'
}
</script>

```

:::


### defineSlots()

这个宏可以用于为 IDE 提供插槽名称和 props 类型检查的类型提示。

`defineSlots()` 只接受类型参数，没有运行时参数。类型参数应该是一个类型字面量，其中属性键是插槽名称，值类型是插槽函数。函数的第一个参数是插槽期望接收的 props，其类型将用于模板中的插槽 props。返回类型目前被忽略，可以是 `any`，但我们将来可能会利用它来检查插槽内容。

它还返回 `slots` 对象，该对象等同于在 setup 上下文中暴露或由 `useSlots()` 返回的 `slots` 对象。

#### 示例

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-slot/Foo-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-slot/v-slot-composition

```vue
<template>
  <view>
    <slot name="header" :msg="msg"></slot>
    <slot :num="num"></slot>
    <slot name="num1" :num="num"></slot>
    <slot name="num2" :num="num"></slot>
    <slot name="msgTrue" :msg="msg"></slot>
    <slot name="msgFalse" :msg="msg"></slot>
    <slot name="footer" :arr="arr"></slot>
  </view>
</template>

<script setup lang='uts'>
  const msg = ref('foo msg')
  const num = ref<number>(0)
  const arr = ref<string[]>(['a', 'b', 'c'])

  defineSlots<{
    header(props : { msg : string }) : any,
    default(props : { num : number }) : any,
    num1(props : { num : number }) : any,
    num2(props : { num : number }) : any,
    msgTrue(props : { msg : string }) : any,
    msgFalse(props : { msg : string }) : any,
    footer(props : { arr : string[] }) : any
  }>()
</script>

```

:::

### useSlots() 和 useAttrs()

在 `<script setup>` 使用 `slots` 和 `attrs` 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 `$slots` 和 `$attrs` 来访问它们。在你的确需要使用它们的罕见场景中，可以分别用 `useSlots` 和 `useAttrs` 两个辅助函数：

#### useSlots() 示例 @useslots-example

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-slot/v-slot-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-slot/v-slot-composition

```vue
<template>
  <view class="page">
    <Foo>
      <template #header="{ msg }">
        <view class="mb-10 flex justify-between flex-row">
          <text>header slot msg:</text>
          <text id="slot-header">{{ msg }}</text>
        </view>
      </template>
      <template #default="{ num }">
        <view class="mb-10 flex justify-between flex-row">
          <text>default slot num:</text>
          <text id="slot-default">{{ num }}</text>
        </view>
      </template>
      <!-- #ifndef MP -->
      <template v-for="item in 2" #[`num${item}`]="{ num }">
        <view class="mb-10 flex justify-between flex-row">
          <text>num{{ item }} slot:</text>
          <text :id="`slot-num${item}`">{{ num }}</text>
        </view>
      </template>
      <template v-if="msgTrue['isShow']" #[msgTrue['name']]="{ msg }">
        <view class="mb-10 flex justify-between flex-row">
          <text>{{ msgTrue['name'] }} slot msg:</text>
          <text id="slot-msg-true">{{ msg }}</text>
        </view>
      </template>
      <template v-if="msgFalse['isShow']" #[msgFalse['name']]="{ msg }">
        <view class="mb-10 flex justify-between flex-row">
          <text>{{ msgFalse['name'] }} slot msg:</text>
          <text id="slot-msg-false">{{ msg }}</text>
        </view>
      </template>
      <!-- #endif -->
      <template #footer="{ arr }">
        <view class="mb-10 flex justify-between flex-row">
          <text>footer slot arr:</text>
          <text id="slot-footer">{{ JSON.stringify(arr) }}</text>
        </view>
      </template>
    </Foo>
  </view>
</template>

<script setup lang="uts">
  import Foo from './Foo-composition.uvue'

  const msgTrue = ref({
    isShow: true,
    name: 'msgTrue'
  })
  const msgFalse = ref({
    isShow: false,
    name: 'msgFalse'
  })
</script>
```

:::

#### useAttrs() 示例 @useattrs-example

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/attrs/child-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/attrs/attrs-composition

```vue
<template>
  <view>
    <view class="mb-10 flex flex-row justify-between">
      <text>hasPropsAttr</text>
      <text id="has-props-attr">{{ hasPropsAttr }}</text>
    </view>
    <view class="mb-10 flex flex-row justify-between">
      <text>hasEmitsAttr</text>
      <text id="has-emits-attr">{{ hasEmitsAttr }}</text>
    </view>
    <view class="mb-10 flex flex-row justify-between">
      <text>hasClassAttr</text>
      <text id="has-class-attr">{{ hasClassAttr }}</text>
    </view>
    <view class="mb-10 flex flex-row justify-between">
      <text>hasStyleAttr</text>
      <text id="has-class-attr">{{ hasStyleAttr }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
defineEmits(['childClick'])

defineProps({
  str: {
    type: String,
    required: true
  }
})

const attrs = useAttrs()

const hasPropsAttr = computed(():boolean => {
  return attrs['val'] != null
})

const hasEmitsAttr = computed(():boolean => {
  return attrs['childClick'] != null
})

const hasClassAttr = computed(():boolean => {
  return attrs['class'] != null
})

const hasStyleAttr = computed(():boolean=>{
  return attrs['style'] != null
})
</script>

```

:::

### useComputedStyle() @use-computed-style

获取组件根节点的计算样式。useComputedStyle返回一个响应式的map，开发者可以通过map的get方法获取对应的样式值。[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/helpers/useComputedStyle/CompUseComputedStyle.uvue)

类型定义：

```ts
type UseComputedStyleOptions = {
    /**
     * 需要监听的样式属性列表
     */
    properties?: string[] | null;
    /**
     * 是否从原根节点过滤 properties 中的属性，默认过滤
     * @default true
     */
    filterProperties?: boolean | null;
};
declare function useComputedStyle(options: UseComputedStyleOptions | null): Map<string, string>;
```

::: preview

```vue
<template>
	<view>
		<text :style="{ 'font-size': style.get('font-size'), color: style.get('color') }">hello</text>
	</view>
</template>

<script setup>
	const style = useComputedStyle({
		properties: ['font-size', 'color'],
		filterProperties: true
	} as UseComputedStyleOptions)
	watchEffect(() => {
		console.log(`style.fontSize = ${style.get('font-size')}`)
	})
</script>

<style></style>
```

:::

### useRecycleState() @use-recycle-state

组件回收复用时状态存储工具方法

### withDefaults()

在组合式 API 中使用响应式 Props 解构时，需要使用 `withDefaults` 编译器宏。

```ts
interface Props {
  msg: string
  labels : string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: ():string[] => ['a', 'b'],
})
```

上面代码会被编译为等价的运行时 props 的 default 选项。此外，`withDefaults` 辅助函数提供了对默认值的类型检查。\
请注意，在使用 `withDefaults` 时，默认值为可变引用类型 (如数组或对象) 应该封装在函数中，以避免意外修改和外部副作用。

#### withDefaults() 示例 @withdefaults-example

[详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/props/props-with-defaults.uvue)

::: preview
```vue
<template>
  <view class='mt-10'>
    <text class="mb-10 bold">withDefaults</text>
    <view class="mb-10 flex flex-row justify-between">
      <text>msg</text>
      <text id="prop-msg">{{ props.msg }}</text>
    </view>
    <view class="mb-10 flex flex-row justify-between">
      <text>labels</text>
      <text id="prop-labels">{{ JSON.stringify(props.labels) }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
type CustomPropsTestType = {
  a?: number
}  
interface CustomProps {
  msg: string
  labels : string[]
  test: CustomPropsTestType
  testArr1?: CustomPropsTestType[]
  testArr2?: Array<CustomPropsTestType>
}

const props = withDefaults(defineProps<CustomProps>(), {
  msg: 'hello',
  labels: ():string[] => ['a', 'b'],
  test: {} as CustomPropsTestType
})
</script>

```
:::

### 与渲染函数一起使用


示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/render/render-composition.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/render/render-composition
```vue
<script setup lang="uts">
import CompForHFunction from '@/components/CompForHFunction.uvue'
import CompForHFunctionWithSlot from '@/components/CompForHFunctionWithSlot.uvue'
import Foo from './Foo.uvue'
const msg = ref('default msg')
const list = ref(['a','b'])
// 故意外部声明为UTSJSONObject
const msgProps = { class: 'mt-10 msg', style: { color: 'blue' } }
// #ifdef APP-ANDROID
const render = computed(():VNode => {
// #endif
// #ifndef APP-ANDROID
const render = ():VNode => {
// #endif
  const textList: VNode[] = []
  list.value.forEach((item) => {
    textList.push(h('text', { class: 'text-item' }, item))
  })
  return h('view', { class: 'page' }, [
    h(CompForHFunctionWithSlot, {}, () : VNode[] => [h('text', { class: 'comp-slot' }, 'component slot')]),
    h(CompForHFunction, { msg: msg.value }),
    h('text', msgProps, msg.value),
    h(Foo, null, {
        header: (): VNode[] => [h('text', { id: "header" }, 'header')],
        footer: (): VNode[] => [h('text', { id: "footer" }, 'footer')]
    }),
    h('view', null, textList),
    h(
      'button',
      {
        class: 'mt-10 btn',
        type: 'primary',
        onClick: () => {
          msg.value = 'new msg'
          list.value.push('c')
        }
      },
      'click'
    )
  ])
}
// #ifdef APP-ANDROID
)
// #endif
</script>

<template><render /></template>

<style>
.btn {
  color: red;
}
</style>

```
:::
