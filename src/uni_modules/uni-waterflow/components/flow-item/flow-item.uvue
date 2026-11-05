<!-- #ifndef WEB -->
<template>
    <view :waterflow-id="waterflowId satisfies number" change:waterflow-id="recycleFlowItemCpp.setWaterflowId"
        :item-key="('' + props.itemKey) satisfies string" change:item-key="recycleFlowItemCpp.updateKey"
        :ref="recycleFlowItemCpp.setElement" class="uni-flow-item" style="position: absolute; width: 0px;">
        <slot></slot>
    </view>
</template>
<script module="recycleFlowItemCpp" lang="cpp" class-name="RecycleFlowItem" src="../../cppsdk/recycle_waterflow.h"
    namespace="recycle_waterflow"></script>
<script setup>
import { UniFlowItemElement } from '../../common/element'

defineOptions({
    name: 'flow-item',
    rootElement: {
        class: UniFlowItemElement
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
const waterflowId = inject<number>("__uni_recycle_view_id", 0);
const itemKeyRef = computed(() => '' + props.itemKey);
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
    <view ref="element" class="uni-flow-item" style="position: absolute; top: 0; left: 0; width: 0px">
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
    import { UniFlowItemElement } from '../../common/element'
    import type { FlowItemInstance, RecycleWaterflow } from '../../common/web/types'

    defineOptions({
        name: 'flow-item',
        rootElement: {
            class: UniFlowItemElement,
        },
    })
    const props = defineProps({
        itemKey: { type: [String, Number], required: true },
        itemHeight: { type: Number, default: 0 },
    })
    const waterflow = inject<RecycleWaterflow>('__uni_recycle_waterflow')!
    const element = ref<UniViewElement | null>(null)
    const itemKeyRef = computed(() => String(props.itemKey))
    let registeredKey : string | undefined
    let recycled = false
    let destroyed = false
    const item : FlowItemInstance = {
        size: -1,
        updateItemOffset(x, y) {
            if (element.value) element.value.style.translate = `${x}px ${y}px`
        },
        updateItemCrossAxisSize(width) {
            if (element.value) element.value.style.width = `${width}px`
        },
    }
    const recycleHooks = new Map<string, (() => void)[]>([
        ['brc', [recycle]],
        ['ru', [reuse]],
    ])
    provide('__uni_recycle_state_key_ref', itemKeyRef)
    provide('__uni_recycle_hooks', recycleHooks)
    const observer = new UniResizeObserver(() => measure())

    function unregister() {
        if (
            registeredKey !== undefined &&
            waterflow.itemInstanceMap.get(registeredKey) === item
        ) {
            waterflow.itemInstanceMap.delete(registeredKey)
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
            waterflow.itemInstanceMap.set(key, item)
        }
        item.updateItemCrossAxisSize(waterflow.getItemCrossAxisSize())
        item.updateItemOffset(...waterflow.getItemOffset(key))
        const rect = element.value.getBoundingClientRect()
        if (rect.width > 0) {
            item.size = rect.height
            waterflow.updateItemSize(key, item.size)
        }
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
