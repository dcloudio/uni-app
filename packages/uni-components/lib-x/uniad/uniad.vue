<template>
  <view :class="[customFullscreen?'uni-ad-custom':'',customFullscreen]" :style="style" @click="_onclick">
    <uniad-plugin
      class="uniad-plugin"
      :adpid="adpid"
      :isUni="true"
      :unit-id="unitId"
      :adIntervals="normalizedAdIntervals"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
      @nextChannel="_onnextchannel"
      @customFullscreen="_customFullscreen"
      @halfScreenReady="_onHalfScreenReady"
      @halfScreenTap="_onHalfScreenTap"
      @halfScreenModal="_onHalfScreenModal"
    />
    <!-- #ifdef MP-WEIXIN -->
    <ad-custom v-if="userwx && !isHalfScreen" :unit-id="userUnitId" :adIntervals="normalizedAdIntervals" class="uni-ad-custom" :class="[customFullscreen]" @load="_onmpload" @error="_onmperror"></ad-custom>
    <!-- <uniad-plugin-wx v-if="wxchannel" class="uniad-plugin-wx" :class="[customFullscreen]" @load="_onmpload" @error="_onwxchannelerror"></uniad-plugin-wx> -->
    <!-- #endif -->
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
import adMixin, {
  adComponentProps,
  adComponentData,
  adComponentEmits,
  adComponentComputed
} from "../ad/ad.mixin.mp-weixin.js"
// #endif
// #ifdef MP-ALIPAY
import adMixin from "../ad/ad.mixin.mp-alipay.js"
// #endif

export default {
  name: 'Uniad',
  mixins: [adMixin],
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true
  },
  props: adComponentProps,
  emits: adComponentEmits,
  data: adComponentData,
  computed: adComponentComputed
  // #endif
}
</script>

<style>
.uni-ad-custom-fullscreen {
  display: flex;
  height: 100vh;
}
.uni-ad-custom {
  display: flex;
  flex: 1;
  width: 100%;
}
.uniad-plugin {
  display: flex;
  flex: 1;
}
</style>
