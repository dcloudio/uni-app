<template>
  <PageRefresh
    v-if="
      hasPullDownRefresh &&
      !!pageMeta &&
      (isX || !!pageMeta.enablePullDownRefresh)
    "
    ref="refreshRef"
  />
  <uni-page-wrapper ref="wrapperRef" v-bind="pageRefresh">
    <uni-page-body><slot /></uni-page-body>
    <ResizeSensor v-if="isX" @resize="resize" />
  </uni-page-wrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { ResizeSensor } from '@dcloudio/uni-components'

import { usePageMeta } from '../../setup/provide'

import PageRefresh from './page-refresh/component.vue'

import { usePageRefresh } from './page-refresh'
import { getSafeAreaInsets } from '../../../helpers/safeArea'

defineOptions({
  name: 'PageBody',
  __reserved: true,
  compatConfig: { MODE: 3 },
})

const isX = __X__
const isNodeJs = __NODE_JS__
const hasPullDownRefresh = __UNI_FEATURE_PULL_DOWN_REFRESH__
const pageMeta = hasPullDownRefresh ? usePageMeta() : null

const refreshRef = ref(null)
const wrapperRef = ref<HTMLElement | null>(null)

const _pageRefresh =
  !isNodeJs &&
  hasPullDownRefresh &&
  pageMeta &&
  (pageMeta.enablePullDownRefresh || isX)
    ? usePageRefresh(refreshRef)
    : null
const pageRefresh = ref<typeof _pageRefresh>(null)
watch(
  () => pageMeta?.enablePullDownRefresh,
  () => {
    pageRefresh.value = pageMeta?.enablePullDownRefresh ? _pageRefresh : null
  },
  {
    immediate: true,
  }
)

function resize() {
  if (!isX || isNodeJs) {
    return
  }
  const { top, left, right, bottom } = getSafeAreaInsets(wrapperRef.value!)
  const vars = {
    '--uni-safe-area-inset-top': `${top}px`,
    '--uni-safe-area-inset-left': `${left}px`,
    '--uni-safe-area-inset-right': `${right}px`,
    '--uni-safe-area-inset-bottom': `${bottom}px`,
  }
  for (const key in vars) {
    wrapperRef.value!.style.setProperty(key, vars[key])
  }
}
</script>
