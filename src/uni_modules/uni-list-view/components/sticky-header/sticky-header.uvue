<!-- #ifndef WEB -->
<template>
    <view class="uni-sticky-header" :section-id="sectionId satisfies number" change:section-id="recycleListHeaderCpp.setSectionId"
        :ref="recycleListHeaderCpp.setElement" style="position: absolute; width: 100%; z-index: 1;">
        <slot></slot>
    </view>
</template>
<script module="recycleListHeaderCpp" lang="cpp" class-name="RecycleListHeader" src="../../cppsdk/recycle_list.h"
    namespace="recycle_list"></script>
<script setup>
import { UniStickyHeaderElement } from '../../common/element'
defineOptions({
    name: 'sticky-header',
    rootElement: {
        class: UniStickyHeaderElement,
    },
})

const sectionId = inject<number>('__uni_recycle_section_id', 0)
</script>
<style></style>
<!-- #endif -->
<!-- #ifdef WEB -->
<template>
    <view ref="element" class="uni-sticky-header" style="position: sticky; top: 0; width: 100%; z-index: 1">
        <slot />
    </view>
</template>

<script setup lang="ts">
    import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
    import { UniStickyHeaderElement } from '../../common/element'
    import type { SectionState } from '../../common/web/recycle-list'

    defineOptions({
        name: 'sticky-header',
        rootElement: {
            class: UniStickyHeaderElement,
        },
    })
    const element = ref<UniViewElement | null>(null)
    const { section, updateHeaderSize } = inject<{
        section : SectionState
        updateHeaderSize(size : number) : void
    }>('__uni_recycle_section')!
    const observer = new UniResizeObserver(entries => {
        if (element.value && element.value.isConnected) {
            updateHeaderSize(entries[entries.length - 1].borderBoxSize[0].blockSize)
        }
    })
    onMounted(() => {
        section.headerElement = element.value
        updateHeaderSize(element.value!.getBoundingClientRect().height)
        observer.observe(element.value!)
    })
    onBeforeUnmount(() => {
        observer.disconnect()
        section.headerElement = null
        updateHeaderSize(0)
    })
</script>
<!-- #endif -->
