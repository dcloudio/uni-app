<template>
  <view @click="onclick">
    <uniad-plugin
      class="uniad-plugin"
      :adpid="adpid"
      :unit-id="unitId"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
      @nextChannel="_onnextchannel"
    />
    <!-- #ifdef MP-WEIXIN -->
    <ad-custom v-if="userwx" :unit-id="userUnitId"></ad-custom>
    <uniad-plugin-wx v-if="wxchannel" class="uniad-plugin-wx" @error="_onwxchannelerror"></uniad-plugin-wx>
    <!-- #endif -->
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
import adMixin from "../ad/ad.mixin.mp-weixin.js"
// #endif
// #ifdef MP-ALIPAY
import adMixin from "../ad/ad.mixin.mp-alipay.js"
// #endif

export default {
  name: 'Uniad',
  mixins: [adMixin]
}
</script>
