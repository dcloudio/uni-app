# 全局变量与状态管理

全局变量，如果不需要绑定在界面上，可以使用 [globalData](../collocation/app.md#globaldata)

如果需要绑定在界面上，也就是需要响应式，就涉及状态管理。

uni-app x下可选方案有：

1. 在独立的uts文件中定义一个全局的reactive变量，各处引用它。
2. 引入pinia。蒸汽模式下可直接使用pinia官方库。Android vdom模式下需使用三方插件 [Pinia by uts](https://ext.dcloud.net.cn/plugin?name=x-pinia-s)

从 HBuilderX 5.25 起，uni-app x 项目的 `pinia` 升级到了 `3.0.4` 版本。如希望使用其他版本，可在项目根目录自行安装指定版本。

APP 蒸汽模式、鸿蒙和 iOS VDOM 模式、Web平台、小程序平台可以直接使用 `pinia` 官方库。

## Pinia

在 `main.uts` 中引入并挂载 Pinia：

```ts
import App from './App.uvue'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())

  return {
    app
  }
}
```

定义一个 Store，比如 `store/counter.uts`：

```ts
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const name = ref('Pinia')
  const count = ref(0)

  const doubleCount = computed(() : number => {
    return count.value * 2
  })

  const countText = computed(() : string => {
    return `${name.value}: ${count.value}`
  })

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  const rename = () => {
    name.value = name.value == 'Pinia' ? 'Pinia Store' : 'Pinia'
  }

  const reset = () => {
    name.value = 'Pinia'
    count.value = 0
  }

  return {
    name,
    count,
    doubleCount,
    countText,
    increment,
    decrement,
    rename,
    reset
  }
})
```

页面中使用 Store：

```vue
<template>
  <view>
    <text>name: {{ name }}</text>
    <text>count: {{ count }}</text>
    <text>double count: {{ doubleCount }}</text>
    <text>count text: {{ countText }}</text>

    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="rename">rename</button>
    <button @click="reset">reset</button>
  </view>
</template>

<script setup lang="uts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/counter.uts'

const counterStore = useCounterStore()
const { name, count, doubleCount, countText } = storeToRefs(counterStore)

const increment = () => {
  counterStore.increment()
}

const decrement = () => {
  counterStore.decrement()
}

const rename = () => {
  counterStore.rename()
}

const reset = () => {
  counterStore.reset()
}
</script>
```

## 全局reactive变量
定义一个模块，编写一个单独的uts文件，比如 /store/index.uts，在里面设一个全局变量，比如globalNum。

```ts
//定义一个大写的State类型
export type State = {
  globalNum: number
  // 如有需要，可增加更多属性
}
// 实例化为state
export const state = reactive({ globalNum: 0 } as State)
// 定义修改属性值的方法
export const setGlobalNum = (num: number) => {
  state.globalNum = num
}
```

在需要的页面和uts文件里，import上面的/store/index.uts，通过如下方式读和写globalNum。

```vue
<template>
	<text @click="plus">{{ globalNum }}</text>
</template>

// 组合式 API
<script setup lang="uts">
	import { state, setGlobalNum } from '@/store/index.uts'

	const globalNum = computed(() => state.globalNum)

	const plus = () => {
		setGlobalNum(state.globalNum + 1)
	}
</script>
```

不管在哪里修改了globalNum的值，界面上都会自动更新。
