<template>
	<view class="uni-swiper-item w-100 h-100 overflow-hidden" style="position: absolute; visibility: hidden;" ref="swiperItem">
		<view v-if="autoHeight" class="uni-swiper-item-content w-100 flex-column" :class="
					autoHeight
						? 'h-auto flex-grow-0 flex-shrink-0'
						: 'flex-1 h-100'
				">
			<slot></slot>
		</view>
		<slot v-else></slot>
	</view>
</template>

<script setup lang="uts">
// #ifndef APP-IOS
import {
	UniSwiperItemElement,
} from "./index.uts";

defineOptions({
	name: 'swiper-item',
	rootElement: {
		class: UniSwiperItemElement
	}
})
// #endif

const swiperItem = ref(null)

type UniSwiperItemProps = {
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	itemId?: string
}

const props = withDefaults(defineProps<UniSwiperItemProps>(), {
	itemId: null
})

const autoHeight = inject('autoHeight', false)
const handleMounted = inject('handleSwiperItemMounted') as () => void
const handleUnMounted = inject('handleSwiperItemUnMounted') as () => void

onMounted(() => {
	swiperItem.value.itemId = props.itemId
	handleMounted()
})
onUnmounted(() => {
	handleUnMounted()
})
</script>

<style>
@import url('../styles/common.css');

.flex-grow-0 {
	flex-grow: 0;
}

.flex-shrink-0 {
	flex-shrink: 0;
}

.flex-1 {
	flex: 1;
}
</style>
