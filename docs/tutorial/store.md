# 全局变量与状态管理

`uni-app x` 在app平台暂不支持 `pinia` 和 `vuex`。可通过 [globalData](../collocation/app.md#globaldata) 或一个专用模块组织和管理全局变量与状态。

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

<script lang="uts">
	import { state, setGlobalNum } from '@/store/index.uts' //导出state和修改其属性值的方法，如不需要修改值，则不需要导出修改方法
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
```

不管在哪里修改了globalNum的值，界面上都会自动更新。
