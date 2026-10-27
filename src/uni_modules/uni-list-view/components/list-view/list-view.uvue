<template>
    <scroll-view :ref="recycleListCpp.setElement" :scroll-top="props.scrollTop" :show-scrollbar="props.showScrollbar"
        :scroll-with-animation="props.scrollWithAnimation" :type="props.type" :bounces="props.bounces"
        :android-overscroll="props.androidOverscroll" :upper-threshold="props.upperThreshold"
        :lower-threshold="props.lowerThreshold" :scroll-left="props.scrollLeft"
        :refresher-enabled="props.refresherEnabled" :refresher-threshold="props.refresherThreshold"
        :refresher-max-drag-distance="props.refresherMaxDragDistance" :refresher-background="props.refresherBackground"
        :refresher-triggered="props.refresherTriggered" :custom-nested-scroll="props.customNestedScroll"
        :nested-scroll-child="props.nestedScrollChild" :associative-container="props.associativeContainer"
        :enable-back-to-top="props.enableBackToTop" :refresher-default-style="props.refresherDefaultStyle"
        :android-scrollbar-draggable="props.androidScrollbarDraggable" :initial-scroll-bottom="_initialScrollBottom satisfies boolean"
        change:initial-scroll-bottom="recycleListCpp.setInitialScrollBottom" :scroll-anchoring="_scrollAnchoring satisfies boolean" 
        change:scroll-anchoring="recycleListCpp.setScrollAnchoring" :list-view-id="listViewId satisfies number"
        change:list-view-id="recycleListCpp.setListViewId" :list="keyList satisfies string[]"
        change:list="recycleListCpp.updateList" :scroll-into-view-key="scrollIntoViewKey satisfies string"
        change:scroll-into-view-key="recycleListCpp.setScrollIntoViewKey" :scroll-into-view-id="scrollIntoViewId satisfies string"
        change:scroll-into-view-id="recycleListCpp.setScrollIntoViewId">
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
    customNestedScroll: {
        type: [Boolean, String],
        default: false
    },
    nestedScrollChild: {
        type: String,
        default: ''
    },
    /**
     * @internal
     */
    androidScrollbarDraggable: {
        type: [Boolean, String],
        default: false
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
