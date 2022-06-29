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
  import adMixin from "./ad.mixin.js"
  // #endif
  // #ifdef MP-WEIXIN
  import adMixin from "./ad.mixin.mp.js"
  // #endif

  export default {
    name: 'AdInterstitial',
    mixins: [adMixin],
    props: {
      adType: {
        type: String,
        default: 'Interstitial'
      }
    },
    methods: {
    }
  }
</script>
