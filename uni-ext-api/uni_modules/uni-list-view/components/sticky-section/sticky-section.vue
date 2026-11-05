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
