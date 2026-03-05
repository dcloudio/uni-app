<template>
	<uni-map-element ref="mapElem" class="uni-root">
		<native-view ref="natvieElement" @init="onObjectInit" style="width: 100%;height: 100%;">
		</native-view>
	</uni-map-element>
</template>

<script setup lang="uts">
	import { AmapMap, UniMapElement } from "@/uni_modules/uni-map-amap";
	import type { AmapMarker } from "@/uni_modules/uni-map-amap/utssdk/interface";

	const mapElem = ref<UniMapElement | null>(null)
	const natvieElement = ref<IUniNativeElement | null>(null)

	const props = withDefaults(defineProps<{
		latitude ?: number,
		longitude ?: number,
		scale ?: number,
		theme ?: string,
		minScale ?: number,
		maxScale ?: number,
		layerStyle ?: string,
		showLocation ?: boolean,
		markers ?: Array<AmapMarker> | null,
	}>(), {
		latitude:0,  // 北京天安门
		longitude: 0,
		scale: 16,
		theme: "normal",
		minScale:3,
		maxScale:20,
		layerStyle:"1",
		showLocation: false,
		markers: null,
	})
	
	let map : AmapMap | null = null
	
	// #ifndef APP-IOS
	defineOptions({
		name: "AmapMap",
		rootElement: {
			name: 'uni-map-element',
			class: UniMapElement
		}
	})
	// #endif
	
	const setDefaultOptions = () => {
		map?.setCenter(props.latitude, props.longitude, false)
		map?.setScale(props.scale, false)
		// map?.setTheme(props.theme)
		map?.setMinScale(props.minScale)
		map?.setMaxScale(props.maxScale)
		map?.setLayerStyle(props.layerStyle)
		map?.setShowLocation(props.showLocation)
		if (props.markers != null) {
			map?.setMarkers(props.markers)
		}
	}

	watchEffect(() => {
		const latitude = props.latitude
		const longitude = props.longitude
		// 使用可选链调用，避免智能转换问题
		console.log(`setCenter:latitude = ${latitude},longitude=${longitude},map = ${map}`)
		map?.setCenter(latitude, longitude, true)
	})

	watchEffect(() => {
		const scale = props.scale
		map?.setScale(scale, true)
	})

	watchEffect(() => {
		const theme = props.theme
		map?.setTheme(theme)
	})
	
	watchEffect(() => {
		const minScale = props.minScale
		map?.setMinScale(minScale)
	})
	
	watchEffect(() => {
		const maxScale = props.maxScale
		map?.setMaxScale(maxScale)
	})
	
	watchEffect(() => {
		const layerStyle = props.layerStyle
		map?.setLayerStyle(layerStyle)
	})
	
	watchEffect(() => {
		const showLocation = props.showLocation
		map?.setShowLocation(showLocation)
	})
	
	watchEffect(() => {
		const markers = props.markers
		if (markers == null) {
			map?.setMarkers([] as AmapMarker[])
		} else {
			map?.setMarkers(markers!)
		}
	})

	function onObjectInit() {
		if (natvieElement.value != null) {
			// 类型转换：IUniNativeElement 转换为 UniNativeViewElement
			map = new AmapMap(natvieElement.value as UniNativeViewElement)
			setTimeout(() => {
				setDefaultOptions()
			}, 0);
		}
	}

	onUnmounted(() => {
		map?.destroy()
	})
</script>

<style scoped>
	.uni-root {
		width: 100%;
		height: 100%;
	}
</style>

