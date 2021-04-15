<template>
  <div class="uni-async-error" @click="reload">{{ $$t("uni.async.error") }}</div>
</template>
<style>
.uni-async-error {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #999;
  padding: 100px 10px;
  text-align: center;
}
</style>
<script>
import {
  useI18n,
  initI18nAsyncMsgs
} from '@dcloudio/uni-core'
/*#__PURE__*/ initI18nAsyncMsgs()
export default {
  name: 'AsyncError',
  setup() {
    const { t } = useI18n()
    return {
      $$t: t,
      reload() {
        window.location.reload()
      }
    }
  }
}
</script>
