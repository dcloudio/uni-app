<template>
  <view @click="_onclick">
    <slot :options="options" :loading="loading" :error="errorMessage" />
    <!-- #ifdef MP-WEIXIN -->
    <uniad-plugin class="uniad-plugin" :adpid="adpid" :unit-id="unitId" @load="_onmpload" @close="_onmpclose" @error="_onmperror"></uniad-plugin>
    <!-- #endif -->
  </view>
</template>

<script>
  // #ifndef MP-WEIXIN
  import adMixin from "../ad/ad.mixin.js"
  // #endif
  // #ifdef MP-WEIXIN
  import adMixin from "../ad/ad.mixin.mp.js"
  // #endif

  export default {
    name: 'AdRewardedVideo',
    mixins: [adMixin],
    props: {
      adType: {
        type: String,
        default: 'RewardedVideo'
      }
    }
  }
</script>
