<!-- #ifndef WEB -->
<template>
    <scroll-view :ref="recycleListCpp.setElement" :scroll-top="props.scrollTop" :show-scrollbar="props.showScrollbar"
        :scroll-with-animation="props.scrollWithAnimation" :type="props.type" :bounces="props.bounces"
        :android-overscroll="props.androidOverscroll" :upper-threshold="props.upperThreshold"
        :lower-threshold="props.lowerThreshold" :scroll-left="props.scrollLeft"
        :refresher-enabled="props.refresherEnabled" :refresher-threshold="props.refresherThreshold"
        :refresher-max-drag-distance="props.refresherMaxDragDistance" :refresher-background="props.refresherBackground"
        :refresher-triggered="props.refresherTriggered" :associative-container="props.associativeContainer"
        :enable-back-to-top="props.enableBackToTop" :refresher-default-style="_refresherDefaultStyle"
        :android-scrollbar-draggable="props.androidScrollbarDraggable" :android-refresher-color="_androidRefresherColor"
        :initial-scroll-bottom="_initialScrollBottom satisfies boolean" change:initial-scroll-bottom="recycleListCpp.setInitialScrollBottom" 
        :scroll-anchoring="_scrollAnchoring satisfies boolean" change:scroll-anchoring="recycleListCpp.setScrollAnchoring" 
        :list-view-id="listViewId satisfies number" change:list-view-id="recycleListCpp.setListViewId" 
        :list="keyList satisfies string[]" change:list="recycleListCpp.updateList" 
        :scroll-into-view-key="scrollIntoViewKey satisfies string" change:scroll-into-view-key="recycleListCpp.setScrollIntoViewKey" 
        :scroll-into-view-id="scrollIntoViewId satisfies string" change:scroll-into-view-id="recycleListCpp.setScrollIntoViewId">
        <view :ref="recycleListCpp.setListHeaderElement">
            <slot name="header"></slot>
        </view>
        <view>
            <view class="placeholder" :ref="recycleListCpp.setPlaceholderElement"></view>
            <slot></slot>
        </view>
        <view>
            <slot name="footer"></slot>
        </view>
        <slot name="refresher"></slot>
    </scroll-view>
</template>
<script module="recycleListCpp" lang="cpp" class-name="RecycleList" src="../../cppsdk/recycle_list.h"
    namespace="recycle_list"></script>
<script setup>
import { generateUniqueId, NATIVE_CHANNEL_ACTIONS, useNativeChannelFn } from '../../common/utils'
import { UniListViewElement } from '../../common/element'
import type { SectionState } from '../../common/types'

defineOptions({
    name: 'list-view',
    rootElement: {
        class: UniListViewElement
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
        default: ''
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
    },
    scrollAnchoring: {
        type: [Boolean, String],
        default: false
    },
    initialScrollBottom: {
        type: [Boolean, String],
        default: false
    }
})
const listViewId = generateUniqueId();

const sectionMap = new Map<number, SectionState>();
provide('__uni_recycle_view_id', listViewId);
provide('__uni_recycle_state_map', new Map<string, Map<string, unknown>>());
provide('__uni_recycle_section_map', sectionMap);

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
const keyList = shallowRef<string[]>([])
function updateList(newList: string[]) {
    keyList.value = newList
    updateIdKeyMap(listIds, newList)
}
let listIds: string[] = []
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
const scrollIntoViewKey = ref<string>('')
const scrollIntoViewId = ref<string>('')
watch(() => props.scrollIntoView, (newVal) => {
    const childItemId = resolveKeyById(newVal);
    if (childItemId) {
        scrollIntoViewKey.value = childItemId;
        return;
    } else {
        for (const sectionState of sectionMap.values()) {
            const sectionChildItemId = sectionState.resolveKeyById(newVal);
            if (sectionChildItemId) {
                sectionState.setScrollIntoViewKey(sectionChildItemId);
                return;
            }
        }
    }
    scrollIntoViewId.value = newVal;
    scrollIntoViewKey.value = '';
}, {
    immediate: true
})

const _scrollAnchoring = computed<boolean>(() => {
    return !!props.scrollAnchoring;
})
const _initialScrollBottom = computed<boolean>(() => {
    return !!props.initialScrollBottom;
})
const _refresherDefaultStyle = computed<string | null>(() => {
    return props.refresherDefaultStyle === '' ? null : props.refresherDefaultStyle;
})
const _androidRefresherColor = computed<string | null>(() => {
    return props.androidRefresherColor === '' ? null : props.androidRefresherColor;
})

const renderRange = ref<[number, number]>([0, 0]);

function updateRenderInfo(renderRangeStart: number, renderRangeEnd: number) {
    renderRange.value = [renderRangeStart, renderRangeEnd];
}

onBeforeUnmount(() => {
    ensureNativeChannelFn((nativeChannelFn: Function) => {
        nativeChannelFn(NATIVE_CHANNEL_ACTIONS.DESTROY_LIST, listViewId);
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
    <scroll-view ref="scrollElement" @scroll="onScroll">
        <view ref="headerElement">
            <slot name="header" />
        </view>
        <view ref="bodyElement" style="position: relative; overflow: visible; overflow-anchor: none">
            <view ref="placeholderElement" class="placeholder" />
            <slot />
        </view>
        <view>
            <slot name="footer" />
        </view>
        <template #refresher>
            <slot name="refresher" />
        </template>
    </scroll-view>
</template>

<script setup lang="ts">
    import {
        getCurrentInstance,
        nextTick,
        onBeforeUnmount,
        onMounted,
        provide,
        ref,
        useAttrs,
        watch,
    } from 'vue'
    import { UniListViewElement } from '../../common/element'
    import {
        RecycleListItemDataStore,
        type RecycleContainer,
        type RecycleList,
        type SectionState,
    } from '../../common/web/recycle-list'

    defineOptions({
        name: 'list-view',
        rootElement: {
            class: UniListViewElement,
        },
    })
    const props = defineProps({
        scrollIntoView: { type: String, default: '' },
        scrollAnchoring: { type: [Boolean, String], default: false },
        initialScrollBottom: { type: [Boolean, String], default: false },
    })
    const attrs = useAttrs()
    const scrollElement = ref<UniScrollViewElement | null>(null)
    const headerElement = ref<UniViewElement | null>(null)
    const bodyElement = ref<UniViewElement | null>(null)
    const placeholderElement = ref<UniViewElement | null>(null)
    const renderRange = ref<[number, number]>([0, 0])
    const store = new RecycleListItemDataStore()
    const sectionMap = new Map<number, SectionState>()
    const idKeyMap = new Map<string, string>()
    let keys : string[] = []
    let listIds : string[] = []
    let size = 0
    let headerSize = 0
    let realScrollOffset = 0
    let scrollOffset = 0
    let fastScrollOffset = 0
    let lastScrollTimestamp = 0
    let lastScrollOffset = 0
    let cachedSizeStart = 200
    let cachedSizeEnd = 200
    let scrolling = false
    let scrollEndTimer : ReturnType<typeof setTimeout> | undefined
    let queued = false
    let destroyed = false
    let listDataStatus = 0
    let maintainInitialScrollBottom = true
    let anchorKey : string | undefined
    let anchorOffset = 0
    let scrollTarget : { key : string; section ?: SectionState } | undefined
    let pendingScrollId = props.scrollIntoView
    let targetOffset = -1
    let targetStarted = 0
    let itemSizeChangedCompensation = 0
    let sizeChangeAnchorKey : string | undefined
    let sizeChangeAnchorOffset = 0

    provide('__uni_recycle_view_instance', getCurrentInstance())
    provide('__uni_recycle_state_map', new Map<string, Map<string, unknown>>())
    provide<RecycleList>('__uni_recycle_list', {
        sectionMap,
        queueLayout,
        syncDefaultItemSize,
    })
    provide<RecycleContainer>('__uni_recycle_container', {
        store,
        updateItemSize,
        getItemOffset,
    })

    function updateIdKeyMap() {
        if (listIds.length !== keys.length) return
        idKeyMap.clear()
        listIds.forEach((id, index) => {
            if (id && keys[index]) idKeyMap.set(id, keys[index])
        })
    }

    function updateList(newList : string[]) {
        if (listDataStatus === 0 && newList.length) listDataStatus = 1
        else if (listDataStatus === 1) listDataStatus = 2
        keys = newList
        store.updateKeyList(newList)
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

    function getItemOffset(key : string) {
        const item = store.keyItemMap.get(key)
        return item
            ? item.offset + fastScrollOffset - itemSizeChangedCompensation
            : -1
    }

    function updateItemSize(key : string, height : number) {
        const item = store.keyItemMap.get(key)
        if (!item || item.size === height) return
        item.size = height
        store.rebuildItemOffsetsFrom(item.index + 1)
        if (scrolling && !scrollTarget && sizeChangeAnchorKey) {
            const anchor = store.keyItemMap.get(sizeChangeAnchorKey)
            if (anchor)
                itemSizeChangedCompensation = anchor.offset - sizeChangeAnchorOffset
        }
        queueLayout()
    }

    function syncDefaultItemSize(height : number) {
        if (height > 0)
            sectionMap.forEach(section => section.applyDefaultItemSize(height))
    }

    function queueLayout() {
        if (queued || destroyed) return
        queued = true
        nextTick(() => {
            queued = false
            if (!destroyed && scrollElement.value) updateRenderList()
        })
    }

    function linkSection() {
        const sections : SectionState[] = Array.from(sectionMap.values()).filter(
            section => section.element && section.element.isConnected,
        )
        sections.sort((a, b) =>
            a.element!.compareDocumentPosition(b.element!) & 4 ? -1 : 1,
        )
        let offsetTop = 0
        sections.forEach(section => {
            section.offsetTop = offsetTop
            offsetTop += section.placeholderSize
        })
        return sections
    }

    function resolveScrollTarget(sections : SectionState[]) {
        if (!pendingScrollId) return
        const key = idKeyMap.get(pendingScrollId)
        if (key !== undefined) scrollTarget = { key }
        else {
            for (const section of sections) {
                const sectionKey = section.resolveKeyById(pendingScrollId)
                if (sectionKey !== undefined) {
                    scrollTarget = { key: sectionKey, section }
                    break
                }
                if (
                    section.element!.id === pendingScrollId ||
                    (section.headerElement && section.headerElement.id === pendingScrollId)
                ) {
                    scrollTarget = { key: '', section }
                    break
                }
            }
        }
        if (scrollTarget) {
            pendingScrollId = ''
            maintainInitialScrollBottom = false
            cachedSizeStart = 0
            targetOffset = -1
            targetStarted = Date.now()
        }
    }

    function scrollToOffset(offset : number) {
        const element = scrollElement.value!
        element.scrollTo(0, offset)
        realScrollOffset = element.scrollTop
        scrollOffset = realScrollOffset
        fastScrollOffset = 0
    }

    function updateRenderList() {
        const element = scrollElement.value!
        const sections = linkSection()
        if (placeholderElement.value)
            placeholderElement.value.style.height = `${sections.length ? 0 : store.contentSize}px`
        resolveScrollTarget(sections)
        if (scrollTarget) {
            const { key, section } = scrollTarget
            const item = store.keyItemMap.get(key)
            const offset = section
                ? section.offsetTop + (key ? section.getItemOffset(key) : 0)
                : item
                    ? item.offset
                    : -1
            if (offset >= 0 && targetOffset !== offset + headerSize) {
                targetOffset = offset + headerSize
                scrollToOffset(
                    targetOffset
                )
            }
        } else if (!sections.length && !scrolling) {
            if (
                props.initialScrollBottom &&
                maintainInitialScrollBottom &&
                listDataStatus === 1
            ) {
                scrollToOffset(
                    Math.max(element.scrollHeight, headerSize + store.contentSize) - size,
                )
            } else if (props.scrollAnchoring && anchorKey) {
                const anchor = store.keyItemMap.get(anchorKey)
                if (anchor) {
                    scrollToOffset(realScrollOffset + anchor.offset - anchorOffset)
                    anchorOffset = anchor.offset
                } else anchorKey = undefined
            }
        }
        const min = Math.max(
            0,
            scrollOffset -
            headerSize -
            cachedSizeStart +
            itemSizeChangedCompensation +
            0.2,
        )
        const max =
            scrollOffset -
            headerSize +
            size +
            cachedSizeEnd +
            itemSizeChangedCompensation -
            0.2
        store.updateItemOffset(fastScrollOffset - itemSizeChangedCompensation)
        updateRenderInfo(...store.getRenderRange(min, max))
        for (const section of sections) {
            section.onScrollContextUpdate({
                containerSize: size,
                headerSize,
                renderStartOffset: min + headerSize,
                renderEndOffset: max + headerSize,
            })
        }
        if (!scrolling) updateScrollAnchorItem()
    }

    function updateScrollAnchorItem() {
        anchorKey = undefined
        if (!props.scrollAnchoring || realScrollOffset <= 0 || sectionMap.size) return
        const offset = realScrollOffset - headerSize
        const [index] = store.getRenderRange(offset, offset)
        const item = store.list[index]
        if (item) {
            anchorKey = item.key
            anchorOffset = item.offset
        }
    }

    function onScroll(e: UniScrollEvent) {
        const element = scrollElement.value!
        const offset = Math.max(0, e.detail.scrollTop)
        if (
            offset < element.scrollHeight - size - 0.2 &&
            Math.abs(offset - realScrollOffset) > 0.2
        )
            maintainInitialScrollBottom = false
        if (!scrolling) {
            scrolling = true
            anchorKey = undefined
            const item = store.list[renderRange.value[0] + renderRange.value[1] - 1]
            sizeChangeAnchorKey = item && item.key
            sizeChangeAnchorOffset = item ? item.offset : 0
        }
        if (offset === 0 || offset >= store.contentSize - size)
            itemSizeChangedCompensation = 0
        if (offset + itemSizeChangedCompensation < 0) {
            itemSizeChangedCompensation = 0
            scrollToOffset(0)
            return
        }
        const timestamp = Date.now()
        const elapsed = timestamp - lastScrollTimestamp
        const delta = offset - lastScrollOffset
        realScrollOffset = offset
        cachedSizeStart = scrollTarget ? 0 : 200
        cachedSizeEnd = 200
        const fast =
            sectionMap.size === 0 &&
            !scrollTarget &&
            lastScrollTimestamp > 0 &&
            elapsed > 0 &&
            Math.abs(delta / elapsed) > 15 &&
            offset > 1 &&
            offset < element.scrollHeight - size - 1
        if (fast) {
            if (delta > 0) cachedSizeStart = 0
            else cachedSizeEnd = 0
            scrollOffset += Math.sign(delta) * Math.min(Math.abs(delta), 120)
            fastScrollOffset = offset - scrollOffset
        } else {
            scrollOffset = offset
            fastScrollOffset = 0
        }
        lastScrollOffset = offset
        lastScrollTimestamp = timestamp
        updateRenderList()
        clearTimeout(scrollEndTimer)
        // scroll-view 尚未要求提供 scrollend，停止滚动后仍需完成补偿和目标定位。
        scrollEndTimer = setTimeout(onScrollEnd, 150)
    }

    function onScrollEnd() {
        clearTimeout(scrollEndTimer)
        if (!scrolling) return
        scrolling = false
        if (itemSizeChangedCompensation)
            scrollToOffset(realScrollOffset + itemSizeChangedCompensation)
        itemSizeChangedCompensation = 0
        sizeChangeAnchorKey = undefined
        scrollOffset = realScrollOffset
        fastScrollOffset = 0
        lastScrollTimestamp = 0
        updateRenderList()
        scrollTarget = undefined
        cachedSizeStart = 200
        cachedSizeEnd = 200
        updateScrollAnchorItem()
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            if (entry.target === scrollElement.value) size = entry.contentRect.height
            else if (entry.target === headerElement.value)
                headerSize = entry.borderBoxSize[0].blockSize
        }
        queueLayout()
    })
    const sectionObserver = new MutationObserver(queueLayout)
    onMounted(() => {
        const element = scrollElement.value!
        size = element.clientHeight
        realScrollOffset = scrollOffset = element.scrollTop
        headerSize = headerElement.value!.getBoundingClientRect().height
        resizeObserver.observe(element)
        resizeObserver.observe(headerElement.value!)
        sectionObserver.observe(bodyElement.value!, { childList: true })
        queueLayout()
    })
    watch(
        () => props.scrollIntoView,
        id => {
            pendingScrollId = id
            scrollTarget = undefined
            queueLayout()
        },
    )
    watch(() => props.scrollAnchoring, updateScrollAnchorItem)
    watch(() => props.initialScrollBottom, queueLayout)
    onBeforeUnmount(() => {
        destroyed = true
        clearTimeout(scrollEndTimer)
        resizeObserver.disconnect()
        sectionObserver.disconnect()
        store.itemInstanceMap.clear()
        sectionMap.clear()
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
