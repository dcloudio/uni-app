<!-- #ifndef WEB -->
<template>
    <scroll-view :ref="recycleWaterflowCpp.setElement" :scroll-top="props.scrollTop"
        :show-scrollbar="props.showScrollbar" :scroll-with-animation="props.scrollWithAnimation" :type="props.type"
        :bounces="props.bounces" :android-overscroll="props.androidOverscroll" :upper-threshold="props.upperThreshold"
        :lower-threshold="props.lowerThreshold" :scroll-left="props.scrollLeft"
        :refresher-enabled="props.refresherEnabled" :refresher-threshold="props.refresherThreshold"
        :refresher-max-drag-distance="props.refresherMaxDragDistance" :refresher-background="props.refresherBackground"
        :refresher-triggered="props.refresherTriggered" :associative-container="props.associativeContainer"
        :enable-back-to-top="props.enableBackToTop" :refresher-default-style="props.refresherDefaultStyle"
        :android-scrollbar-draggable="props.androidScrollbarDraggable" :android-refresher-color="props.androidRefresherColor"
        :waterflow-id="waterflowId satisfies number"
        change:waterflow-id="recycleWaterflowCpp.setWaterflowId" :list="keyList satisfies string[]"
        change:list="recycleWaterflowCpp.updateList" :cross-axis-count="realCrossAxisCount satisfies number"
        :main-axis-gap="realMainAxisGap satisfies number" :cross-axis-gap="realCrossAxisGap satisfies number"
        :max-cross-axis-extent="realMaxCrossAxisExtent satisfies number" change:cross-axis-count="recycleWaterflowCpp.setCrossAxisCount"
        change:main-axis-gap="recycleWaterflowCpp.setMainAxisGap"
        change:cross-axis-gap="recycleWaterflowCpp.setCrossAxisGap"
        change:max-cross-axis-extent="recycleWaterflowCpp.setMaxCrossAxisExtent"
        :scroll-into-view-key="scrollIntoViewKey satisfies string"
        change:scroll-into-view-key="recycleWaterflowCpp.setScrollIntoViewKey">
        <slot></slot>
        <view class="placeholder" :ref="recycleWaterflowCpp.setPlaceholderElement"></view>
        <slot name="refresher"></slot>
        <slot name="load-more"></slot>
    </scroll-view>
</template>
<script module="recycleWaterflowCpp" lang="cpp" class-name="RecycleWaterflow" src="../../cppsdk/recycle_waterflow.h"
    namespace="recycle_waterflow"></script>
<script setup>
import { generateWaterflowId, NATIVE_CHANNEL_ACTIONS, useNativeChannelFn } from '../../common/utils'
import { UniWaterflowElement } from '../../common/element'

defineOptions({
    name: 'waterflow',
    rootElement: {
        class: UniWaterflowElement
    }
})

/**
 * 不支持如下属性
 * - direction
 */
const props = defineProps({
    androidOverscroll: {
        type: [Boolean, String],
        default: false
    },
    crossAxisCount: {
        type: [Number, String],
        default: 2
    },
    mainAxisGap: {
        type: [Number, String],
        default: 0
    },
    crossAxisGap: {
        type: [Number, String],
        default: 0
    },
    maxCrossAxisExtent: {
        type: [Number, String],
        default: 0
    },
    associativeContainer: {
        type: String,
        default: ''
    },
    enableBackToTop: {
        type: [Boolean, String],
        default: true
    },
    bounces: {
        type: [Boolean, String],
        default: true
    },
    upperThreshold: {
        type: Number,
        default: 50
    },
    lowerThreshold: {
        type: Number,
        default: 50
    },
    scrollTop: {
        type: Number,
        default: 0
    },
    scrollLeft: {
        type: Number,
        default: 0
    },
    scrollIntoView: {
        type: String,
        default: ''
    },
    scrollWithAnimation: {
        type: [Boolean, String],
        default: false
    },
    refresherEnabled: {
        type: [Boolean, String],
        default: false
    },
    refresherThreshold: {
        type: Number,
        default: 45
    },
    refresherMaxDragDistance: {
        type: Number
    },
    refresherDefaultStyle: {
        type: String,
        default: 'black'
    },
    refresherBackground: {
        type: String,
        default: 'transparent'
    },
    refresherTriggered: {
        type: [Boolean, String],
        default: false
    },
    showScrollbar: {
        type: [Boolean, String],
        default: true
    },
    /**
     * @internal
     */
    androidScrollbarDraggable: {
        type: [Boolean, String],
        default: false
    },
    androidRefresherColor: {
        type: String,
        default: ''
    }
})

const realCrossAxisCount = computed(() => {
    if (props.maxCrossAxisExtent !== 0 && props.maxCrossAxisExtent !== '0') {
        return 0;
    }
    return parseInt(props.crossAxisCount);
})
const realMainAxisGap = computed(() => {
    if (typeof props.mainAxisGap === 'string') {
        return parseFloat(props.mainAxisGap);
    }
    return props.mainAxisGap;
})
const realCrossAxisGap = computed(() => {
    if (typeof props.crossAxisGap === 'string') {
        return parseFloat(props.crossAxisGap);
    }
    return props.crossAxisGap;
})
const realMaxCrossAxisExtent = computed(() => {
    if (typeof props.maxCrossAxisExtent === 'string') {
        return parseFloat(props.maxCrossAxisExtent);
    }
    return props.maxCrossAxisExtent;
})

const waterflowId = generateWaterflowId();
provide('__uni_recycle_view_id', waterflowId);
provide('__uni_recycle_state_map', new Map<string, Map<string, unknown>>());

const {
    ensureNativeChannelFn,
    setNativeChannelFn
} = useNativeChannelFn();

const idKeyMap = new Map<string, string>();
function updateIdKeyMap(ids: string[], keys: string[]) {
    if (keys.length !== ids.length) {
        return;
    }
    idKeyMap.clear();
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const id = ids[i];
        if (!key || !id) {
            continue;
        }
        idKeyMap.set(id, key);
    }
}

let listIds: string[] = []
const keyList = shallowRef<string[]>([])
function updateList(newList: string[]) {
    keyList.value = newList
    updateIdKeyMap(listIds, newList)
}
function updateListIds(ids: string[]) {
    listIds = ids
    updateIdKeyMap(ids, keyList.value)
}
function resolveKeyById(id: string): string | undefined {
    if (!id) {
        return undefined;
    }
    if (idKeyMap.has(id)) {
        return idKeyMap.get(id);
    }
}

const scrollIntoViewKey = computed(() => {
    if (!props.scrollIntoView) {
        return '';
    }
    return resolveKeyById(props.scrollIntoView) || '';
})

const renderRange = ref<[number, number]>([0, 0]);

function updateRenderInfo(renderRangeStart: number, renderRangeEnd: number) {
    renderRange.value = [renderRangeStart, renderRangeEnd];
}

onBeforeUnmount(() => {
    ensureNativeChannelFn((nativeChannelFn: Function) => {
        nativeChannelFn(NATIVE_CHANNEL_ACTIONS.DESTROY, waterflowId);
    })
})

defineExpose({
    renderRange,
    updateList,
    updateListIds,
    updateRenderInfo,
    setNativeChannelFn
});
</script>
<style>
.placeholder {
    width: 1px;
}
</style>
<!-- #endif -->
<!-- #ifdef WEB -->
<template>
    <scroll-view ref="scrollElement" @scroll="onScroll" @scrollend="onScrollEnd">
        <view style="position: relative; overflow-anchor: none">
            <slot />
            <view ref="placeholderElement" class="placeholder" />
        </view>
        <template #refresher>
            <slot name="refresher" />
        </template>
        <slot name="load-more" />
    </scroll-view>
</template>

<script setup lang="ts">
    import {
        computed,
        getCurrentInstance,
        nextTick,
        onBeforeUnmount,
        onMounted,
        provide,
        ref,
        useAttrs,
        watch,
    } from 'vue'
    import { UniWaterflowElement } from '../../common/element'
    import type { FlowItemInstance, RecycleWaterflow } from '../../common/web/types'

    defineOptions({
        name: 'waterflow',
        rootElement: {
            class: UniWaterflowElement,
        },
    })
    const props = defineProps({
        crossAxisCount: { type: [Number, String], default: 2 },
        mainAxisGap: { type: [Number, String], default: 0 },
        crossAxisGap: { type: [Number, String], default: 0 },
        maxCrossAxisExtent: { type: [Number, String], default: 0 },
        scrollIntoView: { type: String, default: '' },
    })
    const attrs = useAttrs()
    const realCrossAxisCount = computed(() =>
        parseInt(String(props.crossAxisCount)),
    )
    const realMainAxisGap = computed(() => parseFloat(String(props.mainAxisGap)))
    const realCrossAxisGap = computed(() => parseFloat(String(props.crossAxisGap)))
    const realMaxCrossAxisExtent = computed(() =>
        parseFloat(String(props.maxCrossAxisExtent)),
    )
    const scrollElement = ref<UniScrollViewElement | null>(null)
    const placeholderElement = ref<UniViewElement | null>(null)
    const renderRange = ref<[number, number]>([0, 0])
    interface ItemInfo {
        key : string
        index : number
        size : number
        offsetX : number
        offsetY : number
        maxEndOffset : number
    }
    let list : ItemInfo[] = []
    let keyItemMap = new Map<string, ItemInfo>()
    const itemInstanceMap = new Map<string, FlowItemInstance>()
    const idKeyMap = new Map<string, string>()
    let listIds : string[] = []
    let size = 0
    let containerCrossAxisSize = 0
    let itemCrossAxisSize = 0
    let layoutCrossAxisCount = 2
    let placeholderSize = 0
    let scrollOffset = 0
    let cachedSizeStart = 200
    let queued = false
    let destroyed = false
    let pendingScrollId = props.scrollIntoView
    let scrollingToItemKey : string | undefined
    let scrollingToItemOffset = -1
    let scrollingToItemTimestamp = 0
    let scrollEndTimer : ReturnType<typeof setTimeout> | undefined

    provide('__uni_recycle_view_instance', getCurrentInstance())
    provide('__uni_recycle_state_map', new Map<string, Map<string, unknown>>())
    provide<RecycleWaterflow>('__uni_recycle_waterflow', {
        itemInstanceMap,
        updateItemSize,
        getItemOffset,
        getItemCrossAxisSize: () => itemCrossAxisSize,
    })

    function updateIdKeyMap() {
        if (listIds.length !== list.length) return
        idKeyMap.clear()
        listIds.forEach((id, index) => {
            if (id && list[index].key) idKeyMap.set(id, list[index].key)
        })
    }

    function updateList(keys : string[]) {
        const oldItems = keyItemMap
        keyItemMap = new Map()
        list = keys.map((key, index) => {
            const instance = itemInstanceMap.get(key)
            const item = oldItems.get(key) || {
                key,
                index,
                size: instance ? instance.size : -1,
                offsetX: 0,
                offsetY: 0,
                maxEndOffset: 0,
            }
            item.index = index
            keyItemMap.set(key, item)
            return item
        })
        rebuildItemOffsetsFrom(0)
        updateIdKeyMap()
        queueLayout()
    }

    function updateListIds(ids : string[]) {
        listIds = ids
        updateIdKeyMap()
        queueLayout()
    }

    function updateRenderInfo(start : number, length : number) {
        if (renderRange.value[0] !== start || renderRange.value[1] !== length) {
            renderRange.value = [start, length]
        }
    }

    function realItemSize(item : ItemInfo) {
        return item.size < 0 ? 150 : item.size
    }

    function rebuildItemOffsetsFrom(start : number) {
        const columns = new Array<number>(layoutCrossAxisCount).fill(0)
        const mainGap = realMainAxisGap.value
        const crossGap = realCrossAxisGap.value
        for (let i = 0; i < start; i++) {
            const item = list[i]
            const column =
                itemCrossAxisSize + crossGap > 0
                    ? Math.min(
                        layoutCrossAxisCount - 1,
                        Math.round(item.offsetX / (itemCrossAxisSize + crossGap)),
                    )
                    : 0
            columns[column] = Math.max(
                columns[column],
                item.offsetY + realItemSize(item) + mainGap,
            )
        }
        let maxEnd = start > 0 ? list[start - 1].maxEndOffset : 0
        for (let i = start; i < list.length; i++) {
            const item = list[i]
            let column = 0
            for (let c = 1; c < columns.length; c++) {
                if (columns[c] < columns[column]) column = c
            }
            item.offsetX = column * (itemCrossAxisSize + crossGap)
            item.offsetY = columns[column]
            const end = item.offsetY + realItemSize(item)
            item.maxEndOffset = maxEnd = Math.max(maxEnd, end)
            columns[column] = end + mainGap
        }
        placeholderSize = Math.max(0, Math.max(...columns) - mainGap)
    }

    function updateCrossAxisMetrics() {
        const gap = realCrossAxisGap.value
        const extent = realMaxCrossAxisExtent.value
        layoutCrossAxisCount =
            extent > 0 && containerCrossAxisSize > 0
                ? Math.max(1, Math.ceil(containerCrossAxisSize / (extent + gap)))
                : Math.max(1, realCrossAxisCount.value)
        const width = Math.max(
            0,
            (containerCrossAxisSize - gap * (layoutCrossAxisCount - 1)) /
            layoutCrossAxisCount,
        )
        if (width !== itemCrossAxisSize) {
            itemCrossAxisSize = width
            // 列宽变化后旧高度不再有效，未挂载的条目也需要重新估算。
            list.forEach(item => {
                item.size = -1
            })
            itemInstanceMap.forEach(item => item.updateItemCrossAxisSize(width))
        }
        rebuildItemOffsetsFrom(0)
        queueLayout()
    }

    function updateItemSize(key : string, height : number) {
        const item = keyItemMap.get(key)
        if (!item || item.size === height) return
        item.size = height
        rebuildItemOffsetsFrom(item.index)
        queueLayout()
    }

    function getItemOffset(key : string) : [number, number] {
        const item = keyItemMap.get(key)
        return item ? [item.offsetX, item.offsetY] : [-1, -1]
    }

    function queueLayout() {
        if (queued || destroyed) return
        queued = true
        nextTick(() => {
            queued = false
            if (!destroyed && scrollElement.value) updateRenderList()
        })
    }

    function updateRenderList() {
        if (placeholderElement.value)
            placeholderElement.value.style.height = `${placeholderSize}px`
        if (pendingScrollId) {
            const key = idKeyMap.get(pendingScrollId)
            if (key !== undefined) {
                pendingScrollId = ''
                scrollingToItemKey = key
                scrollingToItemOffset = -1
                scrollingToItemTimestamp = Date.now()
                cachedSizeStart = 0
            }
        }
        if (scrollingToItemKey !== undefined) {
            const item = keyItemMap.get(scrollingToItemKey)
            if (item && item.offsetY !== scrollingToItemOffset) {
                scrollingToItemOffset = item.offsetY
                const animation = attrs['scroll-with-animation']
                const animated =
                    (animation === '' || animation === true || animation === 'true') &&
                    Date.now() - scrollingToItemTimestamp < 300
                scrollElement.value!.scrollTo({
                    top: item.offsetY,
                    behavior: animated ? 'smooth' : 'instant',
                })
                if (!animated) scrollOffset = scrollElement.value!.scrollTop
            }
        }
        itemInstanceMap.forEach((instance, key) => {
            const item = keyItemMap.get(key)
            if (item) instance.updateItemOffset(item.offsetX, item.offsetY)
        })
        const min = Math.max(0, scrollOffset - cachedSizeStart + 0.2)
        const max = scrollOffset + size + 200 - 0.2
        let low = 0
        let high = list.length
        // 使用前缀最大底边二分，保留前面仍覆盖可视区域的高条目。
        while (low < high) {
            const mid = (low + high) >>> 1
            if (list[mid].maxEndOffset < min) low = mid + 1
            else high = mid
        }
        const start = low
        high = list.length
        while (low < high) {
            const mid = (low + high) >>> 1
            if (list[mid].offsetY <= max) low = mid + 1
            else high = mid
        }
        updateRenderInfo(start, low - start)
    }

    function onScroll() {
        scrollOffset = Math.max(0, scrollElement.value!.scrollTop)
        updateRenderList()
        clearTimeout(scrollEndTimer)
        scrollEndTimer = setTimeout(onScrollEnd, 150)
    }

    function onScrollEnd() {
        clearTimeout(scrollEndTimer)
        updateRenderList()
        scrollingToItemKey = undefined
        cachedSizeStart = 200
    }

    const observer = new ResizeObserver(entries => {
        const entry = entries[entries.length - 1]
        size = entry.contentRect.height
        if (containerCrossAxisSize !== entry.contentRect.width) {
            containerCrossAxisSize = entry.contentRect.width
            updateCrossAxisMetrics()
        } else queueLayout()
    })
    onMounted(() => {
        const element = scrollElement.value!
        const style = getComputedStyle(element)
        size =
            element.clientHeight -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom)
        containerCrossAxisSize =
            element.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight)
        scrollOffset = element.scrollTop
        updateCrossAxisMetrics()
        observer.observe(element)
    })
    watch(
        [
            realCrossAxisCount,
            realMainAxisGap,
            realCrossAxisGap,
            realMaxCrossAxisExtent,
        ],
        updateCrossAxisMetrics,
    )
    watch(
        () => props.scrollIntoView,
        id => {
            pendingScrollId = id
            scrollingToItemKey = undefined
            queueLayout()
        },
    )
    onBeforeUnmount(() => {
        destroyed = true
        clearTimeout(scrollEndTimer)
        observer.disconnect()
        itemInstanceMap.clear()
    })
    defineExpose({ renderRange, updateList, updateListIds, updateRenderInfo })
</script>

<style>
    .placeholder {
        width: 1px;
        flex-shrink: 0;
    }
</style>
<!-- #endif -->
