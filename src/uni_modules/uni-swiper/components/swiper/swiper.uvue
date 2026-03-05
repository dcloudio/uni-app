<template>
	<view
		ref="wrapper"
		class="uni-swiper-wrapper relative w-100"
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
		@touchcancel="onTouchEnd">
		<view
			class="uni-swiper-container overflow-visible relative"
			:class="vertical ? 'w-100' : 'h-100'">
			<slot></slot>
		</view>
		<view
			class="uni-swiper-indicator absolute justify-center align-center"
			:class="
				vertical
					? 'uni-swiper-indicator_vertical flex-column'
					: 'uni-swiper-indicator_horizontal flex-row'
			">
			<slot name="indicator"></slot>
			<template v-if="indicatorDots && !hasCustomIndicator">
				<view
					v-for="i in sliderCount"
					:key="i"
					class="uni-swiper-indicator-item"
					:class="[
						indicatorClass,
						{ active: currentIndex == i - 1 },
						{ [indicatorActiveClass]: currentIndex == i - 1 },
					]"
					:style="mergeStyle(currentIndex == i - 1)"
					@touchstart="(e: TouchEvent) => {e.stopPropagation();}"
					@touchmove="(e: TouchEvent) => {e.stopPropagation();e.preventDefault()}"
					@touchend="(e: TouchEvent) => {e.stopPropagation();}"
					@touchcancel="(e: TouchEvent) => {e.stopPropagation();}"
					@click="handleIndicatorClick(i - 1)">
				</view>
			</template>
		</view>
	</view>
</template>

<script setup lang="uts">
import { UniSwiperChangeEventDetail, UniSwiperChangeEvent, UniSwiperTransitionEventDetail, UniSwiperTransitionEvent,  UniSwiperAnimationFinishEvent, ContainerSize } from './types.uts'
import { parsePxRpx, getDirection } from './utils.uts'
// #ifndef APP-IOS
import {
	UniSwiperElement,
} from "./index.uts";

defineOptions({
	name: 'swiper',
	rootElement: {
		class: UniSwiperElement
	},
	externalClasses: ['indicator-class', 'indicator-active-class']
})
// #endif

type UniSwiperProps = {
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	vertical?: boolean | string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	current?: number
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	circular?: boolean | string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	autoplay?: boolean | string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	interval?: number
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	duration?: number
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	easingFunction?: string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	previousMargin?: string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	nextMargin?: string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	disableTouch?: boolean | string
	/**
	* 控制是否回弹效果
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	disableBounce?: boolean | string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	indicatorDots?: boolean | string
	/**
	* 指示点绑定的 class
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	indicatorClass?: string.ClassString
	/**
	* 当前选中的指示点绑定的 class
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	indicatorActiveClass?: string.ClassString
	/**
	* 指示点样式
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	indicatorStyle?: string
	/**
	* 当前选中的指示点样式
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	indicatorActiveStyle?: string
	/**
	* 自动高度。设置为 true 时，swiper 高度会随当前 item 的高度变化而变化。
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	autoHeight?: boolean | string
	/**
	* @uniPlatform {
		"app": {
			"harmony": {
				"unixvVer": "5.0"
			}
		}
	}
	*/
	currentItemId?: string
}

const props = withDefaults(defineProps<UniSwiperProps>(), {
	vertical: false,
	circular: false,
	autoplay: false,
	interval: 3000,
	duration: 500,
	easingFunction: 'default',
	previousMargin: '0px',
	nextMargin: '0px',
	disableTouch: false,
	disableBounce: false,
	indicatorDots: false,
	indicatorClass: '',
	indicatorActiveClass: '',
	indicatorStyle: '',
	indicatorActiveStyle: '',
	autoHeight: false,
})

const emit = defineEmits<{
	change : [event: UniSwiperChangeEvent]
	transition : [event: UniSwiperTransitionEvent]
	animationfinish : [event: UniSwiperAnimationFinishEvent]
}>()

const wrapper = ref<UniElement | null>(null)
const currentIndex = ref(0)
const sliderCount = ref(0)
const animating = ref(false)
const autoPlayTimer = ref(0)

// 滑动方向判断的常量配置
const TOUCH_MOVE_THRESHOLD = 5  // 最小移动距离阈值（px）
const DIRECTION_LOCK_THRESHOLD = 5  // 方向锁定的最小距离（px）

let translate_value = 0

let
touchStartX = 0,
touchStartY = 0,
touchStartTime = 0,
dragging = false,
touchMoving = false,
touchStartTranslate = 0,
prevMargin = parsePxRpx(props.previousMargin),
nextMargin = parsePxRpx(props.nextMargin),
sliderItemSize = 0,
firstSliderPosition = 'start',
lastSliderPosition = 'end',
maxTranslate = 0,
minTranslate = 0,
initHasFixedHeight = false,
initd = false,
animationFrameId = 0,
animationStartTranslate = 0,
animationTargetTranslate = 0,
lastAnimationTranslate = 0, // 记录动画执行过程中的视觉 translate 值
animationStartTime = 0,
animationSource = '',  // 记录动画触发来源
sequenceStartTranslate = 0,  // 滑动序列开始时的 translate 值
sequenceStartX = 0,  // 滑动序列开始时的 X 坐标
sequenceStartY = 0,  // 滑动序列开始时的 Y 坐标
touchDirectionLocked = false,  // 是否已锁定滑动方向
touchDirection = '',  // 锁定的滑动方向: 'horizontal' | 'vertical' | ''
needInitAfterAnimate = false,
touchInterruptedAnimation = false,
lastSliderCount = 0,
lastSliderItemSize = 0,
destroyFlag = false

const slots = useSlots()
const hasCustomIndicator = computed(() : boolean => {
	return slots['indicator'] != null
})

function updateContainerTransform() {
	if (swiperContainer == null) return
	const offset = translate_value + prevMargin
	if (props.vertical) {
		swiperContainer!.style.setProperty('transform', `translateY(${offset}px)`)
	} else {
		swiperContainer!.style.setProperty('transform', `translateX(${offset}px)`)
	}
}

function setItemTransform(item: UniElement, offset: number) {
	if (props.vertical) {
		item.style.setProperty('transform', `translateY(${offset}px)`)
	} else {
		item.style.setProperty('transform', `translateX(${offset}px)`)
	}
}

function updateItemPositions() {
	if (sliders == null) return

	for (let i = 0; i < sliders.length; i++) {
		const item = sliders[i]
		const baseOffset = i * sliderItemSize
		// 恢复默认位置
		setItemTransform(item, baseOffset)
	}
	// 重置循环状态变量，确保与 transform 偏移同步
	firstSliderPosition = 'start'
	lastSliderPosition = 'end'
}

const isMarginAndMultipleSliders = computed(() => {
	return (prevMargin > 0 || nextMargin > 0) && sliderCount.value > 2
})

let sliders:UniElement[] | null = null
let swiperContainer:UniElement | null = null

const getSliders = () : UniElement[] | null => {
	const wrapperEl = wrapper.value
	if (wrapperEl == null) return null

	const container = wrapperEl.querySelector('.uni-swiper-container')
	if (container == null) return null
	swiperContainer = container
	const sliders = container.children;
	if (sliders == null || sliders.length == 0) return null
	return sliders
}

const mergeStyle = (isActive : boolean) : string => {
	let style = props.indicatorStyle
	if (isActive && props.indicatorActiveStyle.length > 0) {
		style = style.length > 0 ? style + '; ' + props.indicatorActiveStyle : props.indicatorActiveStyle
	}
	return style
}

function stopAnimationFrame() {
	if (animationFrameId > 0) {
		cancelAnimationFrame(animationFrameId)
		animationFrameId = 0
	}
}

function getEasingProgress(progress : number) : number {
	// 根据 easingFunction 计算实际进度
	// 这里简化处理，使用 ease-out 曲线
	// 如果需要精确匹配 CSS 的 easing，可以使用 bezier 曲线
	if (props.easingFunction === 'linear') {
		return progress
	}
	// 默认使用 ease-out 效果
	return 1 - Math.pow(1 - progress, 2)
}

function dispatchTransitionEvent(offset : number) {
  // 发送累积的偏移量
  const accumulatedDx = props.vertical ? 0 : -offset
  const accumulatedDy = props.vertical ? -offset : 0
  emit('transition', new UniSwiperTransitionEvent(accumulatedDx, accumulatedDy))
}

function animateSlide() {
	if (!animating.value) {
		stopAnimationFrame()
		return
	}

	// 计算时间进度
	const now = Date.now()
	const elapsed = now - animationStartTime
	let timeProgress = elapsed / props.duration

	// 检查动画是否完成
	if (timeProgress >= 1) {
		// 动画完成，设置最终位置
		timeProgress = 1
		translate_value = animationTargetTranslate
		lastAnimationTranslate = animationTargetTranslate
		updateContainerTransform()

		// 发送最后一次 transition 事件
		dispatchTransitionEvent(animationTargetTranslate - sequenceStartTranslate)

		// 触发动画完成事件
		emit('animationfinish', new UniSwiperAnimationFinishEvent(currentIndex.value, animationSource, getItemIdByIndex(currentIndex.value)))

		// 清理状态
		animating.value = false
		stopAnimationFrame()
		resetSlidersPosition()
		if (needInitAfterAnimate) { init() }

		// 重置序列起始点
		sequenceStartTranslate = translate_value
		animationSource = ''

		return
	}

	// 应用缓动函数
	const easedProgress = getEasingProgress(timeProgress)

	// 根据进度计算当前的 translate 值并直接更新
	const currentAnimationTranslate = animationStartTranslate + (animationTargetTranslate - animationStartTranslate) * easedProgress

	// 直接更新 translate 值，驱动视图更新
	translate_value = currentAnimationTranslate
	lastAnimationTranslate = currentAnimationTranslate
	updateContainerTransform()

	// 计算从序列开始到现在的总偏移量
	const totalTranslateChange = currentAnimationTranslate - sequenceStartTranslate
	// 发送累积的偏移量
	dispatchTransitionEvent(totalTranslateChange)

	// 继续下一帧
	animationFrameId = requestAnimationFrame(animateSlide)
}

function isStartToEndSlide(targetIndex: number, direction? : number | null) : boolean {
	return currentIndex.value == 0 && targetIndex == sliderCount.value - 1 && direction == -1
}

function isEndToStartSlide(targetIndex: number, direction? : number | null) : boolean {
	return currentIndex.value == sliderCount.value - 1 && targetIndex == 0 && direction == 1
}

function isSupportCircular() : boolean {
	return props.circular && (sliderCount.value > 2 || (sliderCount.value == 2 && prevMargin == 0 && nextMargin == 0))
}

let resetSlidersPosition = () => {}

function adjustSliderPositionWhenNoMargin(targetIndex : number, direction? : number | null) {
	// 非循环模式下不应该调整slider位置
	if (!isSupportCircular()) return
	if (sliders == null) return

	const totalSize = sliderCount.value * sliderItemSize
	if (totalSize == 0) return

	// 策略：基于当前位置和意图决定是否需要偏移首尾滑块
	// 1. 如果位置已经在溢出区域（例如 translate > 0 或 translate < -max），必须维持偏移
	// 2. 如果位置在边缘且正在向溢出方向拖拽，需要进行偏移

	const currentTranslate = translate_value
	// 正常范围是 [-(count-1)*size, 0]
	// 右侧溢出界限（更小的值，负无穷方向）
	const rightBound = -(sliderCount.value - 1) * sliderItemSize
	// 左侧溢出界限（更大的值，正无穷方向）
	const leftBound = 0

	// 基于当前视觉位置计算视觉索引
	const visualIndex = Math.round(-currentTranslate / sliderItemSize)

	// 判断是否需要将第一个滑块移动到最后
	let needItem0AtEnd = false
	if (currentTranslate < rightBound) {
		needItem0AtEnd = true
	} else if (visualIndex == sliderCount.value - 1 && targetIndex == 0 && direction == 1) {
		// 视觉位置在最后一个，目标是第一个，且从右往左滑动（循环从最后到第一个）
		needItem0AtEnd = true
	}

	// 判断是否需要将最后一个滑块移动到最前
	let needItemLastAtStart = false
	if (currentTranslate > leftBound) {
		needItemLastAtStart = true
	} else if (visualIndex == 0 && targetIndex == sliderCount.value - 1 && direction == -1) {
		// 视觉位置在第一个，目标是最后一个，且从左往右滑动（循环从第一个到最后一个）
		needItemLastAtStart = true
	}

	if(needItem0AtEnd){
		if(firstSliderPosition != 'end'){
			const firstSlider = sliders[0] as UniElement
			if (firstSlider != null) {
				// 移动到最后：原来是 0，现在应该是 totalSize
				setItemTransform(firstSlider, totalSize)
			}
			firstSliderPosition = 'end'
		}
	} else {
		if(firstSliderPosition == 'end'){
			const firstSlider = sliders[0] as UniElement
			if (firstSlider != null) {
				// 恢复到最前：0
				setItemTransform(firstSlider, 0)
			}
			firstSliderPosition = 'start'
		}
	}

	if(needItemLastAtStart){
		if(lastSliderPosition != 'start'){
			const lastSlider = sliders[sliders.length - 1]
			if (lastSlider != null) {
				// 移动到最前：原来是 (N-1)*size，现在应该是 -size
				setItemTransform(lastSlider, -sliderItemSize)
			}
			lastSliderPosition = 'start'
		}
	} else {
		if(lastSliderPosition == 'start'){
			const lastSlider = sliders[sliders.length - 1]
			if (lastSlider != null) {
				// 恢复到最后：(N-1)*size
				setItemTransform(lastSlider, (sliders.length - 1) * sliderItemSize)
			}
			lastSliderPosition = 'end'
		}
	}
}

function adjustSliderPositionWhenHasMargin(targetIndex? : number | null, direction? : number | null){
	// 非循环模式下不应该调整slider位置
	if (!isSupportCircular()) return
	if (sliders == null) return

	const totalSize = sliderCount.value * sliderItemSize
	if (totalSize == 0) return

	// 基于当前视觉位置计算视觉索引
	const currentTranslate = translate_value
	const visualIndex = Math.round(-currentTranslate / sliderItemSize)

	// 正常范围是 [-(count-1)*size, 0]
	const rightBound = -(sliderCount.value - 1) * sliderItemSize
	const leftBound = 0

	// 判断是否需要将第一个滑块移动到最后
	let needItem0AtEnd = false
	if (currentTranslate < rightBound) {
		// 已经进入右侧溢出区，维持首块在末尾
		needItem0AtEnd = true
	} else if (visualIndex == sliderCount.value - 1 && targetIndex == 0 && direction == 1) {
		// 视觉位置在最后一个，目标是第一个，且向左滑动（循环从最后到第一个）
		needItem0AtEnd = true
	} else if (direction == null && targetIndex == sliderCount.value - 1) {
		// 初始化/重置时处于最后一个，确保首块在末尾
		needItem0AtEnd = true
	}

	// 判断是否需要将最后一个滑块移动到最前
	let needItemLastAtStart = false
	if (currentTranslate > leftBound) {
		// 已经进入左侧溢出区，维持末块在最前
		needItemLastAtStart = true
	} else if (visualIndex == 0 && targetIndex == sliderCount.value - 1 && direction == -1) {
		// 视觉位置在第一个，目标是最后一个，且向右滑动（循环从第一个到最后一个）
		needItemLastAtStart = true
	} else if (direction == null && targetIndex == 0) {
		// 初始化/重置时处于第一个，确保末块在最前
		needItemLastAtStart = true
	}

	if(needItem0AtEnd){
		if(firstSliderPosition != 'end'){
			const firstSlider = sliders[0] as UniElement
			if (firstSlider != null) {
				// 移动到最后：原来是 0，现在应该是 totalSize
				setItemTransform(firstSlider, totalSize)
			}
			firstSliderPosition = 'end'
		}
	} else {
		if(firstSliderPosition == 'end'){
			const firstSlider = sliders[0] as UniElement
			if (firstSlider != null) {
				// 恢复到最前：0
				setItemTransform(firstSlider, 0)
			}
			firstSliderPosition = 'start'
		}
	}

	if(needItemLastAtStart){
		if(lastSliderPosition != 'start'){
			const lastSlider = sliders[sliders.length - 1]
			if (lastSlider != null) {
				// 移动到最前：原来是 (N-1)*size，现在应该是 -size
				setItemTransform(lastSlider, -sliderItemSize)
			}
			lastSliderPosition = 'start'
		}
	} else {
		if(lastSliderPosition == 'start'){
			const lastSlider = sliders[sliders.length - 1]
			if (lastSlider != null) {
				// 恢复到最后：(N-1)*size
				setItemTransform(lastSlider, (sliders.length - 1) * sliderItemSize)
			}
			lastSliderPosition = 'end'
		}
	}
}

function adjustSliderPosition(targetIndex? : number | null, direction? : number | null) {
	if (!isSupportCircular()) return
	if (sliders == null) return
	if(isMarginAndMultipleSliders.value){
		adjustSliderPositionWhenHasMargin(targetIndex, direction)
	} else {
		adjustSliderPositionWhenNoMargin(targetIndex!, direction)
	}
}

function resetSlidersPositionWhenHasMargin(){
	// 非循环模式下不应该重置位置
	if (!isSupportCircular()) return
	if (sliders == null) return

	// 优先确保当前位置对应的首尾恢复到正确位置
	if (currentIndex.value == 0) {
		if (firstSliderPosition != 'start') {
			translate_value = 0
			updateContainerTransform()
			if (sliders[0] != null) {
				setItemTransform(sliders[0], 0)
			}
			firstSliderPosition = 'start'
		}
		if (lastSliderPosition != 'end') {
			if (sliders[sliders.length - 1] != null) {
				setItemTransform(sliders[sliders.length - 1], (sliders.length - 1) * sliderItemSize)
			}
			lastSliderPosition = 'end'
		}
		adjustSliderPosition(currentIndex.value, null)
		return
	}

	if (currentIndex.value == sliderCount.value - 1) {
		if (firstSliderPosition != 'start') {
			if (sliders[0] != null) {
				setItemTransform(sliders[0], 0)
			}
			firstSliderPosition = 'start'
		}
		if (lastSliderPosition != 'end') {
			if (sliders[sliders.length - 1] != null) {
				setItemTransform(sliders[sliders.length - 1], (sliders.length - 1) * sliderItemSize)
			}
			lastSliderPosition = 'end'
		}
		translate_value = -(sliderCount.value - 1) * sliderItemSize
		updateContainerTransform()
		adjustSliderPosition(currentIndex.value, null)
		return
	}

	// 中间索引：仅在首尾均偏移时做同步
	if (lastSliderPosition != 'end' && firstSliderPosition != 'start') {
		adjustSliderPosition(currentIndex.value, null)
	}
}

function resetSlidersPositionWhenNoMargin() {
	// 非循环模式下不应该重置位置
	if (!isSupportCircular()) return

	const totalSize = sliderCount.value * sliderItemSize
	if (totalSize == 0) return

	if(translate_value <= -totalSize + 1){
		translate_value += totalSize
		updateContainerTransform()
		// 重置所有 slider 到默认位置
		updateItemPositions()
		firstSliderPosition = 'start'
		lastSliderPosition = 'end'
	} else if(translate_value >= 1){
		translate_value -= totalSize
		updateContainerTransform()
		// 重置所有 slider 到默认位置
		updateItemPositions()
		firstSliderPosition = 'start'
		lastSliderPosition = 'end'
	}
}

resetSlidersPosition = () => {
	if (sliders == null) return
	if(isMarginAndMultipleSliders.value){
		resetSlidersPositionWhenHasMargin()
	} else {
		resetSlidersPositionWhenNoMargin()
	}
}

function getItemIdByIndex(index: number): string | null{
	if(sliders == null) return null
	return sliders[index]?.itemId
}

function slideTo(targetIndex : number, source : string, direction? : number | null) {
	if (targetIndex < 0 || targetIndex >= sliderCount.value) return

	// 如果正在动画或拖拽中，先归一化位置，避免首尾偏移导致抖动
	if (animating.value || dragging) {
		animating.value = false
		stopAnimationFrame()
		dragging = false
		touchMoving = false
		touchDirectionLocked = false
		touchDirection = ''
		touchInterruptedAnimation = false
		if (isSupportCircular()) {
			updateItemPositions()
			firstSliderPosition = 'start'
			lastSliderPosition = 'end'
			translate_value = -(currentIndex.value * sliderItemSize)
		} else {
			translate_value = lastAnimationTranslate
		}
		updateContainerTransform()
		sequenceStartTranslate = translate_value
	}

	// 停止之前的动画
	stopAnimationFrame()

	// 记录基础位置
	const oldTranslate = translate_value
	adjustSliderPosition(targetIndex, direction)
	const translateDelta = translate_value - oldTranslate

	// 如果由于 adjustSliderPosition 发生了位置归一化，需要同步调整 sequenceStartTranslate
	sequenceStartTranslate += translateDelta

	// 记录动画开始位置、时间和来源
	animationStartTranslate = translate_value
	lastAnimationTranslate = animationStartTranslate
	animationStartTime = Date.now()
	animationSource = source

	// 计算目标位置
	if(props.circular && isStartToEndSlide(targetIndex, direction)){
		animationTargetTranslate = (1 * sliderItemSize)
	} else if(props.circular && isEndToStartSlide(targetIndex, direction)){
		animationTargetTranslate = (sliderCount.value * sliderItemSize * -1)
	} else {
		animationTargetTranslate = targetIndex * sliderItemSize * -1
	}

	// 更新当前索引并发送 change 事件
	if(targetIndex != currentIndex.value){
		currentIndex.value = targetIndex
		emit('change', new UniSwiperChangeEvent(targetIndex, source, getItemIdByIndex(targetIndex)))
	}

	// 标记动画开始
	animating.value = true

	// 启动动画（动画函数会自己处理完成事件）
	animationFrameId = requestAnimationFrame(animateSlide)
}

function startAutoPlay() {
	if (!props.autoplay || sliderCount.value <= 1) return

	autoPlayTimer.value = setInterval(() => {
		const next = currentIndex.value == sliderCount.value - 1 ? 0 : currentIndex.value + 1;
		slideTo(next, 'autoplay', 1)
	}, props.interval)
}

function stopAutoPlay() {
	if (autoPlayTimer.value > 0) {
		clearInterval(autoPlayTimer.value)
		autoPlayTimer.value = 0
	}
}

const handleIndicatorClick = (index : number) => {
	const direction = getSlideDirection(index)
	slideTo(index, 'click', direction)
}

function updateWrapperHeight(index : number) {
	if (sliders == null) return

	const currentSlider : UniElement | null = sliders[index]
	if (currentSlider == null) return

	const sliderContent = currentSlider.querySelector('.uni-swiper-item-content')
	if(sliderContent){
		wrapper.value!.style.setProperty('height', `${sliderContent.offsetHeight}px`)
	}
}

function initSliders(){
	sliders = getSliders()
	sliderCount.value = sliders ? sliders.length : 0
}

function updateMinTranslate() {
	minTranslate = -(sliderCount.value - 1) * sliderItemSize
}

function fixIndex(index: number): number {
	if(index < 0){
		return props.circular ? sliderCount.value - 1 : 0
	} else if(index >= sliderCount.value){
		return props.circular ? 0 : sliderCount.value - 1
	}
	return index
}

function getSlideDirection(targetIndex: number): number {
	const count = sliderCount.value
	const current = currentIndex.value
	if (count <= 1 || targetIndex == current) {
		return 1
	}
	if (!props.circular) {
		return targetIndex > current ? 1 : -1
	}
	const forward = (targetIndex - current + count) % count
	const backward = (current - targetIndex + count) % count
	return forward <= backward ? 1 : -1
}

function calculateSliderContainerSize() : ContainerSize {
	const wrapperEl = wrapper.value!
	let containerWidth = wrapperEl.offsetWidth
	let containerHeight = wrapperEl.offsetHeight

	if (containerWidth <= 0 || containerHeight <= 0) {
		const rect = wrapperEl.getBoundingClientRect()
		if (containerWidth <= 0 && rect.width > 0) {
			containerWidth = rect.width
		}
		if (containerHeight <= 0 && rect.height > 0) {
			containerHeight = rect.height
		}
	}

	if (containerWidth <= 0) {
		const wrapperWidth = wrapperEl.style.getPropertyValue('width')
		if (wrapperWidth.endsWith("px") || wrapperWidth.endsWith("rpx")) {
			const parsedWidth = parsePxRpx(wrapperWidth)
			if (parsedWidth > 0) {
				containerWidth = parsedWidth
			}
		}
	}
	if (containerHeight <= 0) {
		const wrapperHeight = wrapperEl.style.getPropertyValue('height')
		if (wrapperHeight.endsWith("px") || wrapperHeight.endsWith("rpx")) {
			const parsedHeight = parsePxRpx(wrapperHeight)
			if (parsedHeight > 0) {
				containerHeight = parsedHeight
			}
		}
	}

	return {
		containerWidth,
		containerHeight
	}
}

function calculateSliderItemSize(hasFixedHeight: boolean, containerWidth: number, containerHeight: number) {
	if (props.vertical) {
		if (hasFixedHeight && containerHeight > 0) {
			sliderItemSize = containerHeight - prevMargin - nextMargin
		} else {
			sliderItemSize = 0
		}
	} else {
		sliderItemSize = containerWidth - prevMargin - nextMargin
		if (sliderItemSize <= 0) {
			sliderItemSize = containerWidth
		}
	}
	if (sliderItemSize < 0) {
		sliderItemSize = 0
	}
}

function updateContainerSize(containerWidth: number, containerHeight: number, hasFixedHeight: boolean) {
	if (sliders == null) return

	const container = wrapper.value!.querySelector('.uni-swiper-container')!

	if (props.vertical) {
		if (containerWidth > 0) {
			container.style.setProperty('width', containerWidth + 'px')
		}
		if (sliderItemSize > 0) {
			const totalSize = sliderItemSize * sliders.length
			container.style.setProperty('height', totalSize + 'px')
		}
	} else {
		const totalSize = sliderItemSize * sliders.length
		container.style.setProperty('width', totalSize + 'px')
		if (hasFixedHeight) {
			container.style.setProperty('height', '100%')
		}
	}
}

function updateSlidersSize(containerWidth: number, sliderItemSize: number, hasFixedHeight: boolean) {
	let sliderWidth = '', sliderHeight = ''
	if (props.vertical) {
		if (containerWidth > 0) {
			sliderWidth = containerWidth + 'px'
		}
		if (sliderItemSize > 0) {
			sliderHeight = sliderItemSize + 'px'
		}
	} else {
		if (sliderItemSize > 0) {
			sliderWidth = sliderItemSize + 'px'
		} else if (containerWidth > 0) {
			sliderWidth = containerWidth + 'px'
		}
		if (hasFixedHeight) {
			sliderHeight = '100%'
		}
	}

	if (sliders == null) return

	for (let i = 0; i < sliders.length; i++) {
		const item = sliders[i]
		if (sliderWidth.length > 0) {
			item.style.setProperty('width', sliderWidth)
		}
		if (sliderHeight.length > 0) {
			item.style.setProperty('height', sliderHeight)
		}
		item.style.setProperty('visibility', 'visible')
	}

	// 记录当前的位移状态，避免 updateItemPositions 后的视觉跳变
	const savedFirstPos = firstSliderPosition
	const savedLastPos = lastSliderPosition

	updateItemPositions()

	// 恢复之前的循环位移状态
	if (isSupportCircular() && sliderCount.value > 0) {
		if (savedFirstPos == 'end') {
			const firstSlider = sliders[0]
			const totalSize = sliderCount.value * sliderItemSize
			setItemTransform(firstSlider, totalSize)
			firstSliderPosition = 'end'
		}
		if (savedLastPos == 'start') {
			const lastSlider = sliders[sliders.length - 1]
			setItemTransform(lastSlider, -sliderItemSize)
			lastSliderPosition = 'start'
		}
	}
}

function updateWrapperOverflow() {
	if (prevMargin > 0 || nextMargin > 0) {
		if (props.vertical) {
			wrapper.value!.style.setProperty('overflow-x', 'hidden')
			wrapper.value!.style.setProperty('overflow-y', 'visible')
		} else {
			wrapper.value!.style.setProperty('overflow-x', 'visible')
			wrapper.value!.style.setProperty('overflow-y', 'hidden')
		}
	}
}

function init(){
	stopAutoPlay()
	needInitAfterAnimate = false

	if (wrapper == null || destroyFlag) return

	let { containerWidth, containerHeight } = calculateSliderContainerSize()
	const isFirstInit = !initd
	if(isFirstInit){
		initd = true
		const wrapperHeight = wrapper.value!.style.getPropertyValue('height')
		if (wrapperHeight.length > 0 && wrapperHeight !== 'auto') {
			initHasFixedHeight = true
			if (containerHeight <= 0) {
				containerHeight = parsePxRpx(wrapperHeight)
			}
		}
		if (!initHasFixedHeight && containerHeight <= 0) {
			containerHeight = 0
		}
	}

	initSliders()
	if (sliders == null) return

	calculateSliderItemSize(initHasFixedHeight, containerWidth, containerHeight)

	updateContainerSize(containerWidth, containerHeight, initHasFixedHeight)

	updateSlidersSize(containerWidth, sliderItemSize, initHasFixedHeight)

	updateWrapperOverflow()

	const sliderStructureChanged = sliderCount.value != lastSliderCount || sliderItemSize != lastSliderItemSize
	lastSliderCount = sliderCount.value
	lastSliderItemSize = sliderItemSize

	// 只在首次初始化时使用props.current，后续保持currentIndex不变
	if (isFirstInit) {
		if(props.current != undefined){
			currentIndex.value = props.current > 0 && props.current < sliderCount.value ? props.current : 0
		}else if(props.currentItemId != undefined){
			const targetIndex = getItemIndexByItemId(props.currentItemId!)
			if(targetIndex != null){
				currentIndex.value = targetIndex
			}
		}
	} else {
		// 确保currentIndex在有效范围内
		if (currentIndex.value >= sliderCount.value) {
			currentIndex.value = sliderCount.value - 1
		}
	}

	if (animating.value || dragging) {
		if (sliderStructureChanged) {
			animating.value = false
			stopAnimationFrame()
			dragging = false
			touchMoving = false
			touchInterruptedAnimation = false
			updateItemPositions()
			firstSliderPosition = 'start'
			lastSliderPosition = 'end'
			if (currentIndex.value >= sliderCount.value) {
				currentIndex.value = Math.max(sliderCount.value - 1, 0)
			}
			translate_value = -(currentIndex.value * sliderItemSize)
			updateContainerTransform()
			sequenceStartTranslate = translate_value
			animationSource = ''
			needInitAfterAnimate = false
			updateMinTranslate()
			updateWrapperHeight(currentIndex.value)
		} else {
			needInitAfterAnimate = true
			// 注意：此处不再重置 translate_value，让 current 动画继续
			updateMinTranslate()
			updateWrapperHeight(currentIndex.value)
			return
		}
	}

	if(currentIndex.value != 0) {
		translate_value = -(currentIndex.value * sliderItemSize)
	} else {
		translate_value = 0
	}
	updateContainerTransform()

	adjustSliderPosition(currentIndex.value, null)
	updateMinTranslate()
	updateWrapperHeight(currentIndex.value)
	startAutoPlay()
}

const onTouchStart = (e : TouchEvent) => {
  if (props.disableTouch) return

	// 停止自动播放
	stopAutoPlay()

	const wasAnimating = animating.value
	touchInterruptedAnimation = wasAnimating
	if (animating.value) {
		animating.value = false
		stopAnimationFrame()

		// 中断动画时，强制重置所有 slider 到默认位置，并将 translate 设置为 currentIndex 对应的位置
		if (isSupportCircular()) {
			updateItemPositions()
			firstSliderPosition = 'start'
			lastSliderPosition = 'end'
			// 基于 currentIndex 重新计算 translate，确保位置一致
			translate_value = -(currentIndex.value * sliderItemSize)
		} else {
			// 非循环模式使用动画中的视觉位置
			translate_value = lastAnimationTranslate
		}
		updateContainerTransform()
	}

	// 记录重置前的位置，用于同步调整 sequenceStartTranslate
	const oldTranslate = translate_value
	resetSlidersPosition()
	const translateDelta = translate_value - oldTranslate

	const t = e.touches[0]
	touchStartX = t.pageX
	touchStartY = t.pageY
	touchStartTime = Date.now()
	dragging = true
	touchMoving = false  // 确保重置移动标志
	touchStartTranslate = translate_value

	// 重置方向锁定状态
	touchDirectionLocked = false
	touchDirection = ''

	// 如果之前没有在动画中（即这是一个新的滑动序列的开始），记录序列起始点
	if (!wasAnimating) {
		sequenceStartTranslate = translate_value
		sequenceStartX = t.pageX
		sequenceStartY = t.pageY
	} else {
		// 如果之前在动画中（连续滑动），保持原有的序列起始点，但需要根据 normalization 调整，避免 dx 跳变
		sequenceStartTranslate += translateDelta
	}
}

const onTouchMove = (e : TouchEvent) => {
  if (props.disableTouch) return
	if (!dragging) return

	touchMoving = true

	const t = e.touches[0]
	const dx = t.pageX - touchStartX
	const dy = t.pageY - touchStartY
	const delta = props.vertical ? dy : dx
	// 基于整体滑动方向，而不是即时方向
	const direction = delta > 0 ? -1 : 1
	const currentTranslate = touchStartTranslate + delta

	// 计算从touch开始的总体滑动方向（用于调整slider位置）
	const overallDelta = currentTranslate - touchStartTranslate
	const overallDirection = overallDelta > 0 ? -1 : 1

	// 计算滑动距离
	const absDx = Math.abs(dx)
	const absDy = Math.abs(dy)

	// 如果还没有锁定方向，基于角度判断
	if (!touchDirectionLocked) {
		const totalDistance = Math.sqrt(dx * dx + dy * dy)

		// 当移动距离达到阈值时锁定方向
		if (totalDistance >= DIRECTION_LOCK_THRESHOLD) {
			// 计算角度（使用 atan2 获得精确角度）
			const angle = Math.atan2(absDy, absDx) * 180 / Math.PI

			// 对于横向swiper
			if (!props.vertical) {
				// 角度小于30度认为是水平滑动，大于60度认为是垂直滑动
				// 30-60度之间根据swiper类型决定（这里偏向垂直以支持list滚动）
				if (angle < 30) {
					touchDirection = 'horizontal'
				} else if (angle > 45) {
					touchDirection = 'vertical'
				} else {
					// 30-45度之间，稍微偏向垂直滑动
					touchDirection = 'vertical'
				}
			} else {
				// 对于纵向swiper
				// 角度大于60度认为是垂直滑动，小于30度认为是水平滑动
				if (angle > 60) {
					touchDirection = 'vertical'
				} else if (angle < 45) {
					touchDirection = 'horizontal'
				} else {
					// 45-60度之间，稍微偏向水平滑动
					touchDirection = 'horizontal'
				}
			}

			touchDirectionLocked = true
		}
	}

	// 根据锁定的方向和swiper类型决定是否处理滑动和阻止默认行为
	if (touchDirectionLocked) {
		if (!props.vertical) {
			// 横向swiper
			if (touchDirection === 'horizontal') {
				// 用户在水平滑动，swiper响应，阻止垂直滚动
				e.preventDefault()
			} else {
				// 用户在垂直滑动，不响应swiper，让子list正常滚动
				// 立即返回，完全不处理这次触摸移动
				return
			}
		} else {
			// 纵向swiper
			if (touchDirection === 'vertical') {
				// 判断swiper是否可以继续滑动
				const canSwipe = isSupportCircular() ||
				                 (delta > 0 && currentIndex.value > 0) ||
				                 (delta < 0 && currentIndex.value < sliderCount.value - 1)

				if (!canSwipe) {
					// swiper已在边界且无法继续滑动，不阻止默认行为，让页面继续滚动
					// 直接返回，不处理后续逻辑
					return
				}
				// swiper可以切换，继续处理（preventDefault将在后面统一处理）
			} else {
				// 用户在水平滑动，不响应swiper，让子元素正常处理
				// 立即返回，完全不处理这次触摸移动
				return
			}
		}
	} else {
		// 未锁定方向时，完全不处理移动
		// 等待方向锁定或触摸结束时回弹
		return
	}

	// 只有在循环模式下，才需要调整位置
	if(isSupportCircular()){
		// 基于视觉位置计算当前所在的索引，而不是 currentIndex.value
		const visualIndex = Math.round(-touchStartTranslate / sliderItemSize)
		// 使用整体方向来判断目标索引，避免因手指抖动导致方向误判
		const targetIndex = fixIndex(visualIndex + overallDirection)
		adjustSliderPosition(targetIndex, overallDirection)
	}

	const atBoundary = !props.circular && props.disableBounce && sliderCount.value > 0 && ((currentTranslate > maxTranslate && delta > 0) || (currentTranslate < minTranslate && delta < 0))
	if (!atBoundary) {
		e.preventDefault()
	}

	if (delta != 0) {
		// 计算从序列开始到现在的总偏移量
		const totalTranslateChange = currentTranslate - sequenceStartTranslate
		// 发送累积的偏移量
		dispatchTransitionEvent(totalTranslateChange)
	}

	if (props.disableBounce) {
		if(currentTranslate > maxTranslate){
			translate_value = maxTranslate
			updateContainerTransform()
			return
		}
		if (currentTranslate < minTranslate) {
			translate_value = minTranslate
			updateContainerTransform()
			return
		}
	} else {
		if(currentTranslate > maxTranslate){
			const overScroll = currentTranslate - maxTranslate
			translate_value = maxTranslate + overScroll * 0.3
			updateContainerTransform()
			return
		}
		if (currentTranslate < minTranslate) {
			const overScroll = currentTranslate - minTranslate
			translate_value = minTranslate + overScroll * 0.3
			updateContainerTransform()
			return
		}
	}

	translate_value = currentTranslate
	updateContainerTransform()
}

const onTouchEnd = (e : TouchEvent) => {
  if (props.disableTouch) return
	if (!dragging) return
	dragging = false

	// 如果没有实际移动，直接返回
	if (!touchMoving) {
		touchMoving = false
		startAutoPlay()
		return
	}
	touchMoving = false

	// 如果方向未锁定，需要回弹到当前位置
	if (!touchDirectionLocked) {
		if (touchInterruptedAnimation) {
			// 回弹到当前索引位置
			slideTo(currentIndex.value, 'touch', 0)
		}
		startAutoPlay()
		return
	}

	// 检查方向是否匹配
	const isDirectionMatched = (!props.vertical && touchDirection === 'horizontal') ||
	                           (props.vertical && touchDirection === 'vertical')

	if (!isDirectionMatched) {
		// 方向不匹配，回弹到当前位置
		if (touchInterruptedAnimation) {
			slideTo(currentIndex.value, 'touch', 0)
		}
		startAutoPlay()
		return
	}

	const t = e.changedTouches[0]
	const dx = t.pageX - touchStartX
	const dy = t.pageY - touchStartY
	const dt = Date.now() - touchStartTime
	const delta = props.vertical ? dy : dx
	const abs = Math.abs(delta)
	const source = 'touch'
	let direction = delta < 0 ? 1 : -1

	const shouldChange = (dt < 300 && abs > 30) || abs > 100
	if (!shouldChange){
		slideTo(currentIndex.value, source, direction)
		return
	}

	let nextIndex = currentIndex.value
	if (isSupportCircular()) {
		if (delta > 0) {
			nextIndex = (currentIndex.value - 1 + sliderCount.value) % sliderCount.value
		} else if (delta < 0) {
			nextIndex = (currentIndex.value + 1) % sliderCount.value
		}
	} else {
		if (!props.disableBounce && (translate_value > maxTranslate || translate_value < minTranslate)) {
			if (translate_value > maxTranslate) {
				nextIndex = 0
			} else if (translate_value < minTranslate) {
				// 向左滑动超出边界，回弹到最后一个索引
				nextIndex = sliderCount.value - 1
			}
		} else {
			if (delta > 0 && currentIndex.value > 0) {
				nextIndex = currentIndex.value - 1
			} else if (delta < 0 && currentIndex.value < sliderCount.value - 1) {
				nextIndex = currentIndex.value + 1
			}
		}
	}
	slideTo(nextIndex, source, direction)

	startAutoPlay()
}

const handleSwiperItemMounted = () => {
	if (initd)
		init()
}

const handleSwiperItemUnMounted = () => {
	if (initd)
		init()
}

provide('handleSwiperItemMounted', handleSwiperItemMounted)
provide('handleSwiperItemUnMounted', handleSwiperItemUnMounted)
provide('autoHeight', props.autoHeight)

function getItemIndexByItemId(itemId: string): number | null {
	const list = sliders
	if(list == null) return null
	
	let res: number | null = null
	for(let i = 0;i<list.length;i++){
		if(list[i].itemId == itemId){
			res = i;
			break;
		}
	}
	return res
}

onMounted(() => {
	watch(() : number | undefined => props.current, (newVal : number) => {
		if (newVal == currentIndex.value || newVal < 0 || newVal >= sliderCount.value) return
		const direction = getSlideDirection(newVal)
		slideTo(newVal, 'prop', direction)
	})
	watch(() : string | undefined => props.currentItemId, (newVal : string) => {
		if (props.current != undefined) return
		const targetIndex = getItemIndexByItemId(newVal)
		if(targetIndex != null){
			currentIndex.value = targetIndex
		}
		const direction = getSlideDirection(currentIndex.value)
		slideTo(currentIndex.value, 'prop', direction)
	})

	watch(currentIndex, (newVal : number) => {
		updateWrapperHeight(newVal)
	})

	watch((): boolean | string => props.autoplay, (newVal : boolean | string) => {
		newVal ? startAutoPlay() : stopAutoPlay()
	})

	watch(() : boolean | string => props.vertical, (newVal : boolean | string) => {
		init()
	})

	init()
})

onBeforeUnmount(() => {
	destroyFlag = true
})

onUnmounted(() => {
	stopAutoPlay()
	stopAnimationFrame()
})
</script>

<style>
@import url('../styles/common.css');

/* #ifdef APP */
.uni-swiper-wrapper {
	height: 150px;
}
/* #endif */

/* #ifdef WEB */
.uni-swiper-wrapper {
	display: block;
	height: 150px;
}
.uni-swiper-wrapper::-webkit-scrollbar {
	display: none;
}
.uni-swiper-wrapper {
	/* IE and Edge */
	-ms-overflow-style: none;
	/* Firefox */
	scrollbar-width: none;
}
/* #endif */

.uni-swiper-indicator {
	z-index: 10;
	background-color: transparent;
	bottom: 0px;
	right: 0px;
	/* #ifdef APP || MP */
	pointer-events: none;
	/* #endif */
}

.uni-swiper-indicator_horizontal {
	left: 0px;
	height: 40px;
}

.uni-swiper-indicator_vertical {
	top: 0px;
	width: 40px;
}
.uni-swiper-indicator-item {
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background-color: rgba(0, 0, 0, 0.3);
	border: 0.1px solid rgba(230, 230, 230, 0.3);
	margin: 2px 4px;
}

.uni-swiper-indicator-item.active {
	background-color: rgba(255, 255, 255, 0.9);
	border: 0.1px solid rgba(225, 225, 225, 0.9);
}
</style>
