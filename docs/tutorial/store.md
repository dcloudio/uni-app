# 全局变量与状态管理

全局变量，如果不需要绑定在界面上，可以使用 [globalData](../collocation/app.md#globaldata)

如果需要绑定在界面上，也就是需要响应式，就涉及状态管理。

`vuex` 已被淘汰，`pinia`官方版并不支持uts。

uni-app x下可选方案有：

1. 在独立的uts文件中定义一个全局的reactive变量，各处引用它。
2. 使用三方插件 [Pinia by uts](https://ext.dcloud.net.cn/plugin?name=x-pinia-s)

使用全局的reactive变量，详细方案如下：

## 专用模块
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

// 选项式 API
<script lang="uts">
	import { state, setGlobalNum } from '@/store/index.uts'

	export default {
		computed: {
			globalNum(): number { //定义可绑定在界面上的globalNum
				return state.globalNum
			}
		},
		methods: {
			plus(){
				setGlobalNum(state.globalNum + 1)
			}
		}
	}
</script>

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
