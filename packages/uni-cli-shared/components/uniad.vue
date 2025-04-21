<template>
  <view @click="onclick">
    <uniad-plugin
      class="uniad-plugin"
      :adpid="adpid"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
      @nextChannel="_onnextchannel"
    />
    <!-- #ifdef MP-WEIXIN -->
    <ad-custom v-if="userwx" :unit-id="userUnitId" class="uni-ad-custom" :class="[customFullscreen]" @load="_onmpload" @error="_onmperror"></ad-custom>
    <uniad-plugin-wx v-if="wxchannel" class="uniad-plugin-wx" @load="_onmpload" @error="_onwxchannelerror"></uniad-plugin-wx>
    <!-- #endif -->
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

<style>
.uni-ad-custom-fullscreen {
  height: 100vh;
}
</style>
