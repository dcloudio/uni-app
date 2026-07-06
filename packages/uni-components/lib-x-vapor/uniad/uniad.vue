<template>
  <view @click="_onclick">
    <uniad-plugin
      class="uniad-plugin"
      :adpid="adpid"
      :isUni="true"
      :unit-id="unitId"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
      @nextChannel="_onnextchannel"
      @halfScreenReady="_onHalfScreenReady"
      @halfScreenTap="_onHalfScreenTap"
      @halfScreenModal="_onHalfScreenModal"
    />
    <!-- #ifdef MP-WEIXIN -->
    <ad-custom v-if="userwx && !isHalfScreen" :unit-id="userUnitId"></ad-custom>
    <uniad-plugin-wx v-if="wxchannel && !isHalfScreen" class="uniad-plugin-wx" @error="_onwxchannelerror"></uniad-plugin-wx>
    <!-- #endif -->
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
import adMixin, {
  adComponentProps,
  adComponentData,
  adComponentEmits
} from "../ad/ad.mixin.mp-weixin.js"
// #endif
// #ifdef MP-ALIPAY
import adMixin from "../ad/ad.mixin.mp-alipay.js"
// #endif

export default {
  name: 'Uniad',
  mixins: [adMixin],
  // #ifdef MP-WEIXIN
  props: adComponentProps,
  emits: adComponentEmits,
  data: adComponentData
  // #endif
}
</script>
