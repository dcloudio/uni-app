<template>
  <view :class="[customFullscreen?'uni-ad-custom':'',customFullscreen]" :style="style" @click="onclick">
    <uniad-plugin
      class="uniad-plugin"
      :adpid="adpid"
      :adIntervals="adIntervals"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
      @nextChannel="_onnextchannel"
      @customFullscreen="_customFullscreen"
    />
    <!-- #ifdef MP-WEIXIN -->
    <ad-custom v-if="userwx" :adIntervals="adIntervals" :unit-id="userUnitId" class="uni-ad-custom" data-com-type="wx" :class="[customFullscreen]" @load="_onmpload" @error="_onmperror"></ad-custom>
    <uniad-plugin-wx v-if="wxchannel" class="uniad-plugin-wx" :class="[customFullscreen]" data-com-type="wx" @load="_onmpload" @error="_onwxchannelerror"></uniad-plugin-wx>
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
  display: flex;
  height: 100vh;
}
.uniad-plugin {
  display: flex;
  flex: 1;
}
</style>
