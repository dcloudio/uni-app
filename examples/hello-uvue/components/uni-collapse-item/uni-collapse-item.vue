<template>
	<view class="uni-collapse-item" :class="{ 'open': is_open }">
		<view class="uni-collapse-item__title" @click="openCollapse(!is_open)">
			<text class="uni-collapse-item__title-text" :class="{'is-disabled':disabled,'open--active':is_open}">{{title}}</text>
			<view class="down_arrow" :class="{'down_arrow--active': is_open}"></view>
		</view>
		<view ref="boxRef" class="uni-collapse-item__content">
			<view ref="contentRef" class="uni-collapse-item__content-box">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script setup lang="uts">
import { $dispatch } from './util.uts'

const instance = getCurrentInstance()!.proxy!;

const props = defineProps({
		// 列表标题
		title: {
			type: String,
			default: ''
		},
		open: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	})
	const is_open = ref<boolean>(props.open)
	const boxNode = ref<UniElement | null>(null)
	const contentNode = ref<UniElement | null>(null)

	onMounted(() => {
		nextTick(() => {
			$dispatch(instance, 'UniCollapse', 'init', instance)
			boxNode.value = instance.$refs['boxRef'] as UniElement
			contentNode.value = instance.$refs['contentRef'] as UniElement
		});
	})

	const openOrClose = (open: boolean) => {
		const boxNodeStyle = boxNode.value?.style!;
		const contentNodeStyle = contentNode.value?.style!;
		let hide = open ? 'flex' : 'none';
		const opacity = open ? 1 : 0
		let ani_transform = open ? 'translateY(0)' : 'translateY(-100%)';
		boxNodeStyle.setProperty('display', hide);
		nextTick(() => {
			contentNodeStyle.setProperty('transform', ani_transform);
			contentNodeStyle.setProperty('opacity', opacity);
		})
	}
	// 开启或关闭折叠面板
	const openCollapse = (open: boolean) => {
		if (props.disabled) return
		// 关闭其他已打开
		$dispatch(instance, 'UniCollapse', 'closeAll')
		is_open.value = open
		openOrClose(open)
	}

	watch(():boolean => props.open, (value: boolean) => {
		if (boxNode.value != null) {
			openCollapse(value)
		}
	})
</script>

<style scoped>
	.uni-collapse-item {
		background-color: #fff;
	}
	.uni-collapse-item__title {
		flex-direction: row;
		align-items: center;
		padding: 12px;
		background-color: #fff;
	}

	.down_arrow {
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
		border-right: 1px #999 solid;
		border-bottom: 1px #999 solid;
		margin-top: -3px;
		transition-property: transform;
		transition-duration: 0.2s;
	}

	.down_arrow--active {
		transform: rotate(-135deg);
		margin-top: 0px;
	}

	.uni-collapse-item__title-text {
		flex: 1;
		color: #333;
		font-size: 14px;
		font-weight: 400;
	}

	.open--active {
		/* background-color: #f0f0f0; */
		color: #bbb;
	}

	.is-disabled {
		color: #999;
	}

	.uni-collapse-item__content {
		display: none;
		position: relative;
	}

	.uni-collapse-item__content-box {
		width: 100%;
/* 		transition-property: transform , opacity;
		transition-duration: 0.2s; */
		transform: translateY(-100%);
		opacity: 0;
	}
</style>
