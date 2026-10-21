<!-- #ifndef WEB -->
<template>
    <view class="uni-sticky-section" :list-view-id="listViewId satisfies number"
        change:list-view-id="recycleListSectionCpp.setListViewId" :section-id="sectionId satisfies number"
        change:section-id="recycleListSectionCpp.setSectionId" :preload="props.preload satisfies boolean"
        change:preload="recycleListSectionCpp.setPreload" :push-pinned-header="pushPinnedHeader satisfies boolean"
        change:push-pinned-header="recycleListSectionCpp.setPushPinnedHeader" :ref="recycleListSectionCpp.setElement"
        :scroll-into-view-key="scrollIntoViewKey satisfies string"
        change:scroll-into-view-key="recycleListSectionCpp.setScrollIntoViewKey" style="position: relative;"
        :style="{ overflow: props.pushPinnedHeader ? 'hidden' : 'visible' }">
        <view :style="{ overflow: props.pushPinnedHeader ? 'hidden' : 'visible' }">
            <view class="placeholder" :ref="recycleListSectionCpp.setPlaceholderElement"></view>
            <slot></slot>
        </view>
    </view>
</template>
<script module="recycleListSectionCpp" lang="cpp" class-name="RecycleListSection" src="../../cppsdk/recycle_list.h"
    namespace="recycle_list"></script>
<script setup>
import { generateUniqueId, NATIVE_CHANNEL_ACTIONS, useNativeChannelFn } from '../../common/utils'
import { UniStickySectionElement } from '../../common/element'
import type { SectionState } from '../../common/types'

const props = defineProps({
    preload: {
        type: Boolean,
        default: false
    },
    pushPinnedHeader: {
        type: Boolean,
        default: true
    }
})

defineOptions({
    name: 'sticky-section',
    rootElement: {
        class: UniStickySectionElement,
    },
})

const listViewId = inject<number>('__uni_recycle_view_id', 0)

let keyList: string[] = []
const renderRange = ref<[number, number]>([0, 0])
const sectionId = generateUniqueId()

provide('__uni_recycle_section_id', sectionId)
const sectionMap = inject<Map<number, SectionState>>('__uni_recycle_section_map', new Map<number, SectionState>())

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

function updateList(newList: string[]) {
    keyList = newList
    ensureNativeChannelFn((nativeChannelFn: Function) => {
        nativeChannelFn(NATIVE_CHANNEL_ACTIONS.SECTION_UPDATE_LIST, sectionId, newList);
    })
    updateIdKeyMap(listIds, newList)
}
let listIds: string[] = []
function updateListIds(ids: string[]) {
    listIds = ids
    updateIdKeyMap(ids, keyList)
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
function setScrollIntoViewKey(key: string) {
    scrollIntoViewKey.value = key;
}

sectionMap.set(sectionId, {
    resolveKeyById,
    setScrollIntoViewKey
})

function updateRenderInfo(renderRangeStart: number, renderRangeLength: number) {
    renderRange.value = [renderRangeStart, renderRangeLength]
}

onBeforeUnmount(() => {
    ensureNativeChannelFn((nativeChannelFn: Function) => {
        nativeChannelFn(NATIVE_CHANNEL_ACTIONS.DESTROY_SECTION, sectionId);
    })
    sectionMap.delete(sectionId);
})

defineExpose({
    updateList,
    updateListIds,
    updateRenderInfo,
    renderRange,
    setNativeChannelFn
})
</script>
<style>
.placeholder {
    width: 1px;
}
</style>
<!-- #endif -->
<!-- #ifdef WEB -->
<template>
    <view ref="element" class="uni-sticky-section" style="position: relative; overflow: visible">
        <slot />
        <view ref="placeholderElement" class="placeholder" />
    </view>
</template>

<script setup lang="ts">
    import {
        getCurrentInstance,
        inject,
        onBeforeUnmount,
        onMounted,
        provide,
        ref,
        watch,
    } from 'vue'
    import { UniStickySectionElement } from '../../common/element'
    import {
        RecycleListItemDataStore,
        type RecycleContainer,
        type RecycleList,
        type ScrollContext,
        type SectionState,
    } from '../../common/web/recycle-list'

    defineOptions({
        name: 'sticky-section',
        rootElement: {
            class: UniStickySectionElement,
        },
    })
    const props = defineProps({
        preload: { type: Boolean, default: false },
    })
    const instance = getCurrentInstance()!
    const sectionId = instance.uid
    const listView = inject<RecycleList>('__uni_recycle_list')!
    const element = ref<UniViewElement | null>(null)
    const placeholderElement = ref<UniViewElement | null>(null)
    const renderRange = ref<[number, number]>([0, 0])
    const store = new RecycleListItemDataStore()
    const idKeyMap = new Map<string, string>()
    let keys : string[] = []
    let listIds : string[] = []
    let hasSyncedDefaultItemSize = false

    const section : SectionState = {
        element: null,
        headerElement: null,
        headerSize: 0,
        placeholderSize: 0,
        offsetTop: 0,
        resolveKeyById: id => idKeyMap.get(id),
        getItemOffset,
        onScrollContextUpdate,
        applyDefaultItemSize,
    }
    listView.sectionMap.set(sectionId, section)
    provide('__uni_recycle_view_instance', instance)
    provide('__uni_recycle_section_id', sectionId)
    provide('__uni_recycle_section', { section, updateHeaderSize })
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
        keys = newList
        store.updateKeyList(newList)
        updateIdKeyMap()
        updatePlaceholderSize()
    }

    function updateListIds(ids : string[]) {
        listIds = ids
        updateIdKeyMap()
        listView.queueLayout()
    }

    function updateRenderInfo(start : number, length : number) {
        store.updateItemOffset(section.headerSize)
        if (renderRange.value[0] !== start || renderRange.value[1] !== length) {
            renderRange.value = [start, length]
        }
    }

    function updatePlaceholderSize() {
        section.placeholderSize = section.headerSize + store.contentSize
        if (placeholderElement.value)
            placeholderElement.value.style.height = `${store.contentSize}px`
        listView.queueLayout()
    }

    function updateHeaderSize(height : number) {
        if (section.headerSize === height) return
        section.headerSize = height
        updatePlaceholderSize()
    }

    function applyDefaultItemSize(height : number) {
        hasSyncedDefaultItemSize = true
        store.defaultItemSize = height
        store.rebuildItemOffsetsFrom(0)
        updatePlaceholderSize()
    }

    function updateItemSize(key : string, height : number) {
        const item = store.keyItemMap.get(key)
        if (!item || item.size === height) return
        const wasUnknown = item.size < 0
        item.size = height
        if (!hasSyncedDefaultItemSize && wasUnknown && height > 0) {
            listView.syncDefaultItemSize(height)
        } else {
            store.rebuildItemOffsetsFrom(item.index + 1)
            updatePlaceholderSize()
        }
    }

    function getItemOffset(key : string) {
        const item = store.keyItemMap.get(key)
        return item ? item.offset + section.headerSize : -1
    }

    function onScrollContextUpdate(context : ScrollContext) {
        if (!section.element || context.containerSize === 0) return
        const top = context.headerSize + section.offsetTop
        const bottom = top + section.placeholderSize
        if (
            !keys.length ||
            (!props.preload &&
                (bottom < context.renderStartOffset || top > context.renderEndOffset))
        ) {
            updateRenderInfo(0, 0)
            return
        }
        let min = Math.max(0, context.renderStartOffset - top - section.headerSize)
        let max = Math.max(0, context.renderEndOffset - top - section.headerSize)
        if (props.preload) {
            const contentHeight = store.contentSize
            min = Math.min(min, contentHeight)
            max = Math.min(max, contentHeight)
            let remaining = Math.min(contentHeight, context.containerSize) - (max - min)
            if (remaining > 0) {
                const prepend = Math.min(remaining, min)
                min -= prepend
                remaining -= prepend
                max = Math.min(contentHeight, max + remaining)
            }
        }
        if (max <= min) updateRenderInfo(0, 0)
        else updateRenderInfo(...store.getRenderRange(min, max))
    }

    onMounted(() => {
        section.element = element.value
        updatePlaceholderSize()
    })
    watch(
        () => props.preload,
        () => listView.queueLayout(),
    )
    onBeforeUnmount(() => {
        listView.sectionMap.delete(sectionId)
        store.itemInstanceMap.clear()
        listView.queueLayout()
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
