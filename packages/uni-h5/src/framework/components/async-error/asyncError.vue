<template>
  <div class="uni-async-error" @click="reload">
    {{ t('uni.async.error') }}
  </div>
</template>

<script setup lang="ts">
import { initI18nAsyncMsgsOnce, useI18n } from '@dcloudio/uni-core'

defineOptions({
  name: 'AsyncError',
  __reserved: true,
  compatConfig: { MODE: 3 },
})

defineProps(['error'])

initI18nAsyncMsgsOnce()
const { t } = useI18n()

function reload() {
  window.location.reload()
}
</script>
