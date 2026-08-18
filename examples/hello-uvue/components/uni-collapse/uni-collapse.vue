<template>
	<!-- 父组件暂时无用，后续子组件联动需要使用到父组件 -->
	<view>
		<slot></slot>
	</view>
</template>

<script setup lang="uts">
const props = defineProps({
	// 是否开启手风琴效果
	accordion: {
		type: Boolean,
		default: true
	}
});
const child_nodes = ref([] as Array<ComponentPublicInstance>)

const init = (child: ComponentPublicInstance) => {
	child_nodes.value.push(child)
}
// 关闭所有
const closeAll = () => {
	// 开启手风琴效果才回关闭其他
	if (props.accordion && child_nodes.value.length > 0) {
		child_nodes.value.forEach((item) => {
			const is_open = item.$data['is_open'] as boolean
			// TODO 暂时无法获取子组件上的属性和方法，暂时使用绕过方案
			if (is_open) {
				item.$data['is_open'] = false
				item.$callMethod('openOrClose', false)
			}
		})
	}
}
</script>
