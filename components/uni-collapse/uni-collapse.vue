<template>
	<!-- 父组件暂时无用，后续子组件联动需要使用到父组件 -->
	<view>
		<slot></slot>
	</view>
</template>

<script lang="uts">
	export default {
		name: "UniCollapse",
		props: {
			// 是否开启手风琴效果
			accordion: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				child_nodes: [] as Array<ComponentPublicInstance>
			};
		},

		methods: {
			init(child: ComponentPublicInstance) {
				this.child_nodes.push(child)
			},
			// 关闭所有
			closeAll() {
				// 开启手风琴效果才回关闭其他
				if (this.accordion && this.child_nodes.length > 0) {
					this.child_nodes.forEach((item) => {
						const is_open = item.$data['is_open'] as boolean
						// TODO 暂时无法获取子组件上的属性和方法，暂时使用绕过方案
						if (is_open) {
							item.$data['is_open'] = false
							item.$callMethod('openOrClose', false)
						}
					})
				}
			}
		}
	}
</script>
