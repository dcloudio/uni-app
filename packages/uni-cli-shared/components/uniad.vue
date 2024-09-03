<template>
  <view @click="onclick">
    <uniad-plugin
      class="uniad-plugin"
      :adpid="adpid"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
    />
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
import adMixin from "./ad.mixin.mp-weixin.js"
// #endif
// #ifdef MP-ALIPAY
import adMixin from "./ad.mixin.mp-alipay.js"
// #endif
export default {
  name: 'Uniad',
  mixins: [adMixin],
  props: {
  },
  methods: {
  }
}
</script>
