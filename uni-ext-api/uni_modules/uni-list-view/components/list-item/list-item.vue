<!-- #ifndef WEB -->
<template>
    <view :section-id="sectionId satisfies number" change:section-id="recycleListItemCpp.setSectionId"
        :list-view-id="listViewId satisfies number" change:list-view-id="recycleListItemCpp.setListViewId"
        :item-key="('' + props.itemKey) satisfies string" change:item-key="recycleListItemCpp.updateKey"
        :ref="recycleListItemCpp.setElement" class="uni-list-item" style="position: absolute; width: 100%">
        <slot></slot>
    </view>
</template>
<script module="recycleListItemCpp" lang="cpp" class-name="RecycleListItem" src="../../cppsdk/recycle_list.h"
    namespace="recycle_list"></script>
<script setup>
import { UniListItemElement } from '../../common/element'

defineOptions({
    name: 'list-item',
    rootElement: {
        class: UniListItemElement
    }
})

const props = defineProps({
    /**
     * @internal
     */
    itemKey: {
        type: [String, Number],
        required: true,
    }
});
const listViewId = inject<number>("__uni_recycle_view_id", 0);
const sectionId = inject<number>('__uni_recycle_section_id', 0);
const itemKeyRef = computed(() => `${sectionId.value}:${props.itemKey}`);
provide('__uni_recycle_state_key_ref', itemKeyRef);

const recycleHooks = new Map<string, () => void>();
provide('__uni_recycle_hooks', recycleHooks);

defineExpose({
    recycleHooks
});
</script>
<style></style>
<!-- #endif -->
<!-- #ifdef WEB -->
<template>
    <view ref="element" class="uni-list-item" style="position: absolute; top: 0; left: 0; width: 100%">
        <slot />
    </view>
</template>

<script setup lang="ts">
    import {
        computed,
        inject,
        nextTick,
        onBeforeUnmount,
        onMounted,
        provide,
        ref,
        watch,
    } from 'vue'
    import { UniListItemElement } from '../../common/element'
    import type { ItemInstance, RecycleContainer } from '../../common/web/recycle-list'

    defineOptions({
        name: 'list-item',
        rootElement: {
            class: UniListItemElement,
        },
    })
    const props = defineProps({
        itemKey: { type: [String, Number], required: true },
    })
    const container = inject<RecycleContainer>('__uni_recycle_container')!
    const sectionId = inject<number>('__uni_recycle_section_id', 0)
    const element = ref<UniViewElement | null>(null)
    const itemKeyRef = computed(() => `${sectionId}:${props.itemKey}`)
    let registeredKey : string | undefined
    let recycled = false
    let destroyed = false
    const item : ItemInstance = {
        size: -1,
        updateItemOffset(offset) {
            if (element.value) element.value.style.translate = `0 ${offset}px`
        },
    }
    const recycleHooks = new Map<string, (() => void)[]>([
        ['brc', [recycle]],
        ['ru', [reuse]],
    ])
    provide('__uni_recycle_state_key_ref', itemKeyRef)
    provide('__uni_recycle_hooks', recycleHooks)
    const observer = new ResizeObserver(() => measure())

    function unregister() {
        if (
            registeredKey !== undefined &&
            container.store.itemInstanceMap.get(registeredKey) === item
        ) {
            container.store.itemInstanceMap.delete(registeredKey)
        }
        registeredKey = undefined
    }

    function measure() {
        if (destroyed || recycled || !element.value || !element.value.isConnected)
            return
        const key = String(props.itemKey)
        if (registeredKey !== key) {
            unregister()
            registeredKey = key
            container.store.itemInstanceMap.set(key, item)
        }
        item.updateItemOffset(container.getItemOffset(key))
        item.size = element.value.getBoundingClientRect().height
        container.updateItemSize(key, item.size)
    }

    function recycle() {
        recycled = true
        observer.disconnect()
        unregister()
    }

    function reuse() {
        recycled = false
        nextTick(() => {
            if (destroyed || recycled || !element.value) return
            observer.observe(element.value)
            measure()
        })
    }

    onMounted(reuse)
    watch(
        () => props.itemKey,
        () => measure(),
        { flush: 'post' },
    )
    onBeforeUnmount(() => {
        destroyed = true
        observer.disconnect()
        unregister()
    })
    defineExpose({ recycleHooks })
</script>
<!-- #endif -->
