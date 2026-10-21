<template>
    <view v-if="overlay && showPageContainer" class="uni-page-container-overlay"
        :style="[overlayStyleMap, overlayStyle]" @click="onClickOverlay" 
        <!-- #ifndef APP-ANDROID -->
        @touchmove.prevent.stop
        <!-- #endif -->
        >
    </view>
    <view v-if="showPageContainer" class="uni-page-container-popup" :class="popupClasses"
        :style="[innerStyleMap, customStyle]" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
        @touchcancel="onTouchCancel">
        <slot />
    </view>
</template>

<script setup lang="ts">
    import { UniPageContainerElement } from './global'
    // #ifndef WEB
    import { pageContainerManager } from './manager'
    // #endif

    defineOptions({
        name: 'page-container',
        rootElement: {
            class: UniPageContainerElement
        }
    })

    type PageContainerPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

    type PageContainerProps = {
        /**
         * 是否显示容器组件
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        show? : boolean;
        /**
         * 动画时长，单位毫秒
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        duration? : number;
        /**
         * z-index 层级
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        zIndex? : number;
        /**
         * 是否显示遮罩层
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        overlay? : boolean;
        /**
         * 是否显示圆角
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        round? : boolean;
        /**
         * 弹出位置
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */ 
        position? : PageContainerPosition;
        /**
         * 自定义弹出层样式
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        customStyle? : string;
        /**
         * 自定义遮罩层样式
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        overlayStyle? : string;
        /**
         * 是否在下滑一段距离后关闭
         * @uniPlatform {
         *   "app": {
         *     "ios": {
         *       "unixVaporVer": "5.11"
         *     },
         *     "android": {
         *       "unixVaporVer": "5.21"
         *     },
         *     "harmony": {
         *       "unixVaporVer": "5.02"
         *     }
         *   }
         * }
         */
        closeOnSlideDown? : boolean;
    }

    const props = withDefaults(defineProps<PageContainerProps>(), {
        show: false,
        duration: 300,
        zIndex: 100,
        overlay: true,
        round: false,
        position: 'bottom',
        customStyle: '',
        overlayStyle: '',
        closeOnSlideDown: false,
    })

    const emits = defineEmits<{
        beforeenter : []
        enter : []
        afterenter : []
        beforeleave : []
        leave : []
        afterleave : []
        clickoverlay : [event: UniPointerEvent]
    }>()

    const showPageContainer = ref(false)
    const isAnimating = ref(false)
    const transitionTimer = ref<number | null>(null)
    const isEntered = ref(false)
    // #ifndef WEB
    const instanceId = ref<number>(0)
    // #endif
    type TransitionType = 'enter' | 'leave'
    const transitionType = ref<TransitionType | null>(null)
    // 每次切换递增，令已经排队的 RAF/定时器失效，避免旧动画覆盖新状态。
    let transitionVersion = 0

    // #ifdef APP-IOS
    const swipeBackDisabledByContainer = ref(false)
    // #endif

    // 触摸相关状态（用于滑动关闭）
    let touchStartX = 0
    let touchStartY = 0
    let touchStartTime = 0
    let isDragging = false
    const MAX_SLIDER_DISTANCE = 100
    const MIN_SLIDER_VELOCITY = 0.3
    const translateValue = ref<number>(0)
    const isSlideClosing = ref<boolean>(false)
    const isSlideLeaving = ref<boolean>(false)

    const overlayStyleMap = computed(() => {
        // #ifdef VUE3-VAPOR
        const styleMap = {
            'z-index': props.zIndex,
            'transition-duration': props.duration + 'ms',
        }
        // #endif
        // #ifndef VUE3-VAPOR
        const styleMap = new Map<string, string>([
            ['z-index', props.zIndex],
            ['transition-duration', props.duration + 'ms'],
        ])
        // #endif
        if (isEntered.value) {
            // #ifdef VUE3-VAPOR
            styleMap['opacity'] = '1'
            styleMap['pointer-events'] = 'auto'
            // #endif
            // #ifndef VUE3-VAPOR
            styleMap.set('opacity', '1').set('pointer-events', 'auto')
            // #endif
        }
        return styleMap
    })

    const innerStyleMap = computed(() => {
        // #ifdef VUE3-VAPOR
        const styleMap = {
            'z-index': props.zIndex + 1,
            'transition-duration': props.duration + 'ms',
        }
        // #endif
        // #ifndef VUE3-VAPOR
        const styleMap = new Map<string, string>([
            ['z-index', props.zIndex + 1],
            ['transition-duration', props.duration + 'ms'],
        ])
        // #endif
        // 滑动拖动时的 transform
        if (translateValue.value != 0 && (isDragging || isSlideClosing.value)) {
            let transformValue = ''
            if (isSlideLeaving.value) {
                switch (props.position) {
                    case 'bottom':
                        transformValue = 'translateY(100%)'
                        break
                    case 'top':
                        transformValue = 'translateY(-100%)'
                        break
                    case 'left':
                        transformValue = 'translateX(-100%)'
                        break
                    case 'right':
                        transformValue = 'translateX(100%)'
                        break
                }
            } else {
                switch (props.position) {
                    case 'bottom':
                    case 'top':
                        transformValue = `translateY(${translateValue.value}px)`
                        break
                    case 'left':
                    case 'right':
                        transformValue = `translateX(${translateValue.value}px)`
                        break
                }
            }
            if (transformValue != '') {
                // #ifdef VUE3-VAPOR
                styleMap['transform'] = transformValue
                styleMap['transition'] = isDragging ? 'none' : `transform ${props.duration}ms ease`
                // #endif
                // #ifndef VUE3-VAPOR
                styleMap.set('transform', transformValue)
                if (isDragging) {
                    styleMap.set('transition', 'none')
                } else {
                    styleMap.set('transition', `transform ${props.duration}ms ease`)
                }
                // #endif
            }
        } else if (translateValue.value != 0 && !isDragging) {
            // 回弹动画
            // #ifdef VUE3-VAPOR
            styleMap['transition'] = `transform ${props.duration}ms ease`
            // #endif
            // #ifndef VUE3-VAPOR
            styleMap.set('transition', `transform ${props.duration}ms ease`)
            // #endif
        }
        return styleMap
    })

    const popupClasses = computed(() => {
        const classes : string[] = []
        if (props.position != null) {
            classes.push(`uni-page-container-popup-${props.position}`)
        }
        if (props.round) {
            classes.push('uni-page-container-popup-round')
        }
        // 始终添加 enter 类，拖动时通过 style 覆盖 transform
        if (isEntered.value) {
            classes.push('uni-page-container-popup-enter')
        }
        return classes
    })

    function resetDragState() {
        isDragging = false
        isSlideClosing.value = false
        isSlideLeaving.value = false
        translateValue.value = 0
    }

    function clearTransitionTimer() {
        if (transitionTimer.value != null) {
            clearTimeout(transitionTimer.value as number)
            transitionTimer.value = null
        }
    }

    // 动画结束处理
    function cancelTransition() {
        transitionVersion++
        clearTransitionTimer()
        isAnimating.value = false
        transitionType.value = null
    }

    function onAnimationEnd(type : TransitionType, version : number) {
        if (version != transitionVersion || transitionType.value != type) {
            return
        }

        isAnimating.value = false
        clearTransitionTimer()
        transitionType.value = null

        if (type == 'enter') {
            emits('afterenter')
        } else if (type == 'leave') {
            showPageContainer.value = false
            isEntered.value = false
            // #ifndef WEB
            instanceId.value = 0
            // #endif
            resetDragState()
            emits('afterleave')
        }
    }

    // 监听动画结束
    function listenTransitionEnd(type : TransitionType, version : number) {
        // 清除之前的定时器
        clearTransitionTimer()

        // 使用 setTimeout 作为兜底方案
        transitionTimer.value = setTimeout(() => {
            onAnimationEnd(type, version)
        }, props.duration)
    }

    // #ifdef APP-IOS
    function updateSwipeBack(disabled : boolean) {
        const pages = getCurrentPages()
        if (pages.length == 0) {
            return
        }
        const currentPage = pages[pages.length - 1]
        currentPage.setPageStyle({
            disableSwipeBack: disabled
        })
        swipeBackDisabledByContainer.value = disabled
    }
    // #endif

    function closeContainer() {
        if (!showPageContainer.value || transitionType.value == 'leave') {
            return
        }
        if (transitionType.value == 'enter') {
            cancelTransition()
        }

        // #ifdef APP-IOS
        if (swipeBackDisabledByContainer.value) {
            updateSwipeBack(false)
        }
        // #endif

        // #ifndef WEB
        pageContainerManager.unregister(instanceId.value)
        instanceId.value = 0
        // #endif
        emits('beforeleave')
        isAnimating.value = true
        transitionType.value = 'leave'
        transitionVersion++
        const version = transitionVersion
        nextTick(() => {
            if (version != transitionVersion || transitionType.value != 'leave') {
                return
            }
            isEntered.value = false
            emits('leave')
            // 监听动画结束
            listenTransitionEnd('leave', version)
        })
    }

    function openContainer() {
        if (transitionType.value == 'enter' && showPageContainer.value) {
            return
        }
        if (transitionType.value == 'leave') {
            cancelTransition()
        }

        emits('beforeenter')
        showPageContainer.value = true
        isEntered.value = false
        isAnimating.value = true
        transitionType.value = 'enter'
        transitionVersion++
        const version = transitionVersion

        // #ifdef APP-IOS
        updateSwipeBack(true)
        // #endif

        // #ifndef WEB
        if (instanceId.value == 0) {
            instanceId.value = pageContainerManager.register()
        }
        // #endif
        // 重置拖动状态
        resetDragState()
        nextTick(() => {
            if (version != transitionVersion || transitionType.value != 'enter') {
                return
            }
            emits('enter')
            // 使用双重 requestAnimationFrame 避免 duration 失效
            requestAnimationFrame(() => {
                if (version != transitionVersion || transitionType.value != 'enter') {
                    return
                }
                requestAnimationFrame(() => {
                    if (version != transitionVersion || transitionType.value != 'enter') {
                        return
                    }
                    if (!props.show) {
                        closeContainer()
                        return
                    }
                    isEntered.value = true
                    listenTransitionEnd('enter', version)
                })
            })
        })
    }

    // #ifndef WEB
    function closeContainerFromSlide() {
        if (!showPageContainer.value || transitionType.value != null) {
            return
        }

        // #ifdef APP-IOS
        if (swipeBackDisabledByContainer.value) {
            updateSwipeBack(false)
        }
        // #endif

        pageContainerManager.unregister(instanceId.value)
        instanceId.value = 0
        emits('beforeleave')
        isAnimating.value = true
        transitionType.value = 'leave'
        transitionVersion++
        const version = transitionVersion
        isDragging = false
        isSlideClosing.value = true
        isSlideLeaving.value = false
        nextTick(() => {
            if (version != transitionVersion || transitionType.value != 'leave') {
                return
            }
            requestAnimationFrame(() => {
                if (version != transitionVersion || transitionType.value != 'leave') {
                    return
                }
                requestAnimationFrame(() => {
                    if (version != transitionVersion || transitionType.value != 'leave') {
                        return
                    }
                    isSlideLeaving.value = true
                    emits('leave')
                    listenTransitionEnd('leave', version)
                })
            })
        })
    }
    // #endif

    watch(() : boolean => props.show, (newVal : boolean) => {
        if (newVal && (!showPageContainer.value || transitionType.value == 'leave')) {
            openContainer()
        } else if (!newVal && showPageContainer.value && transitionType.value != 'leave') {
            closeContainer()
        }
    })

    function onClickOverlay(event : UniPointerEvent) {
        if (isAnimating.value) {
            return
        }
        emits('clickoverlay', event)
        nextTick(() => {
            closeContainer()
        })
    }

    function onTouchStart(e : UniTouchEvent) {
        if (!props.closeOnSlideDown) {
            return
        }

        if (e.touches.length > 0) {
            const { clientX, clientY } = e.touches[0]
            touchStartX = clientX
            touchStartY = clientY
            touchStartTime = Date.now()
            isDragging = false
        }
    }

    function onTouchMove(e : UniTouchEvent) {
        // 如果不是滑动关闭模式，阻止事件冒泡（防止滚动穿透），但允许容器内部滚动
        if (!props.closeOnSlideDown) {
            // #ifdef WEB
            e.preventDefault()
            // #endif
            e.stopPropagation()
            return
        }

        if (e.touches.length > 0) {
            const { clientX, clientY } = e.touches[0]
            const deltaX = clientX - touchStartX
            const deltaY = clientY - touchStartY
            let shouldDrag = false
            let dragValue = 0

            // 根据不同的 position 判断滑动方向
            switch (props.position) {
                case 'bottom':
                    // 底部弹出：向下滑动关闭
                    if (deltaY > 0) {
                        shouldDrag = true
                        dragValue = deltaY
                    }
                    break
                case 'top':
                    // 顶部弹出：向上滑动关闭
                    if (deltaY < 0) {
                        shouldDrag = true
                        dragValue = deltaY
                    }
                    break
                case 'left':
                    // 左侧弹出：向左滑动关闭
                    if (deltaX < 0) {
                        shouldDrag = true
                        dragValue = deltaX
                    }
                    break
                case 'right':
                    // 右侧弹出：向右滑动关闭
                    if (deltaX > 0) {
                        shouldDrag = true
                        dragValue = deltaX
                    }
                    break
            }

            if (shouldDrag) {
                isDragging = true
                translateValue.value = dragValue

                // 阻止默认滚动行为
                e.preventDefault()
                e.stopPropagation()
            }
        }
    }

    function onTouchEnd() {
        if (!props.closeOnSlideDown) {
            return
        }

        if (isDragging) {
            const deltaTime = Date.now() - touchStartTime
            const velocity = Math.abs(translateValue.value) / deltaTime

            const shouldClose = Math.abs(translateValue.value) > MAX_SLIDER_DISTANCE || velocity > MIN_SLIDER_VELOCITY

            // 判断是否应该关闭：拖动距离超过 100px 或拖动速度较快
            if (shouldClose) {
                // #ifdef WEB
                resetDragState()
                closeContainer()
                // #endif
                // #ifndef WEB
                closeContainerFromSlide()
                // #endif
            } else {
                // 回弹
                resetDragState()
            }
        }
    }

    function onTouchCancel() {
        if (!props.closeOnSlideDown) {
            return
        }

        // touchcancel 时重置拖动状态并回弹
        if (isDragging) {
            resetDragState()
        }
    }

    // #ifndef WEB
    onBackPress(() => {
        if (showPageContainer.value && pageContainerManager.isTop(instanceId.value)) {
            closeContainer()
            return true
        }
        return false
    })
    // #endif

    // #ifdef WEB
    function onKeydown(event : KeyboardEvent) {
        if (
            showPageContainer.value &&
            (event.key == 'Escape' || event.key == 'Esc')
        ) {
            closeContainer()
        }
    }
    // #endif

    onMounted(() => {
        // #ifdef WEB
        document.addEventListener('keydown', onKeydown)
        // #endif
        if (props.show) {
            openContainer()
        }
    })

    // 组件卸载前清理
    onBeforeUnmount(() => {
        // #ifdef WEB
        document.removeEventListener('keydown', onKeydown)
        // #endif
        transitionVersion++
        clearTransitionTimer()
        // #ifndef WEB
        if (instanceId.value > 0) {
            pageContainerManager.unregister(instanceId.value)
        }
        // #endif
    })
</script>

<style>
    .uni-page-container-popup {
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
        position: fixed;
        transition-property: transform, opacity;
        transition-timing-function: ease;
    }

    .uni-page-container-overlay {
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        transition-property: opacity;
        transition-timing-function: ease;
        opacity: 0;
        pointer-events: none;
        /* #ifdef WEB */
        height: calc(100% - var(--top-window-height, 0px));
        left: var(--window-left, 0px);
        top: var(--top-window-height, 0px);
        width: calc(100% - var(--window-left, 0px) - var(--window-right, 0px));
        /* #endif */
        /* #ifndef WEB */
        height: 100%;
        left: 0;
        top: 0;
        width: 100%;
        /* #endif */
    }

    .uni-page-container-popup-right {
        transform: translateX(100%);
        /* #ifdef WEB */
        left: var(--window-left, 0px);
        right: var(--window-right, 0px);
        top: var(--top-window-height, 0px);
        height: calc(100% - var(--top-window-height, 0px));
        width: calc(100% - var(--window-left, 0px) - var(--window-right, 0px));
        /* #endif */
        /* #ifndef WEB */
        left: 0;
        right: 0;
        top: 0;
        height: 100%;
        width: 100%;
        /* #endif */
    }

    .uni-page-container-popup-right.uni-page-container-popup-enter {
        transform: translateX(0);
    }

    .uni-page-container-popup-left {
        transform: translateX(-100%);
        /* #ifdef WEB */
        left: var(--window-left, 0px);
        right: var(--window-right, 0px);
        top: var(--top-window-height, 0px);
        height: calc(100% - var(--top-window-height, 0px));
        width: calc(100% - var(--window-left, 0px) - var(--window-right, 0px));
        /* #endif */
        /* #ifndef WEB */
        left: 0;
        right: 0;
        top: 0;
        height: 100%;
        width: 100%;
        /* #endif */
    }

    .uni-page-container-popup-left.uni-page-container-popup-enter {
        transform: translateX(0);
    }

    .uni-page-container-popup-bottom {
        bottom: 0;
        transform: translateY(100%);
        /* #ifdef WEB */
        left: var(--window-left, 0px);
        width: calc(100% - var(--window-left, 0px) - var(--window-right, 0px));
        /* #endif */
        /* #ifndef WEB */
        left: 0;
        width: 100%;
        /* #endif */
    }

    .uni-page-container-popup-bottom.uni-page-container-popup-enter {
        transform: translateY(0);
    }

    .uni-page-container-popup-bottom.uni-page-container-popup-round {
        border-radius: 20px 20px 0 0;
    }

    .uni-page-container-popup-top {
        transform: translateY(-100%);
        /* #ifdef WEB */
        left: var(--window-left, 0px);
        top: var(--top-window-height, 0px);
        width: calc(100% - var(--window-left, 0px) - var(--window-right, 0px));
        /* #endif */
        /* #ifndef WEB */
        left: 0;
        top: 0;
        width: 100%;
        /* #endif */
    }

    .uni-page-container-popup-top.uni-page-container-popup-enter {
        transform: translateY(0);
    }

    .uni-page-container-popup-top.uni-page-container-popup-round {
        border-radius: 0 0 20px 20px;
    }

    .uni-page-container-popup-center {
        transform: scale(0.98);
        transform-origin: center;
        transition-property: opacity, transform;
        transition-timing-function: ease;
        opacity: 0;
        /* #ifdef WEB */
        top: var(--top-window-height, 0px);
        left: var(--window-left, 0px);
        width: calc(100% - var(--window-left, 0px) - var(--window-right, 0px));
        height: calc(100% - var(--top-window-height, 0px));
        /* #endif */
        /* #ifndef WEB */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* #endif */
    }

    .uni-page-container-popup-center.uni-page-container-popup-enter {
        transform: scale(1);
        opacity: 1;
    }
</style>