<template>
  <view @click="_onclick">
    <slot :options="options" :loading="loading" :error="errorMessage" />
    <!-- #ifdef MP-WEIXIN -->
    <uniad-plugin class="uniad-plugin" :adpid="adpid" :unit-id="unitId" @load="_onmpload" @close="_onmpclose" @error="_onmperror"></uniad-plugin>
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <uniad-plugin class="uniad-plugin" :adpid="adpid" @create="_handleAdRef" @load="_onmpload" @close="_onmpclose" @error="_onmperror"></uniad-plugin>
    <!-- #endif -->
  </view>
</template>

<script>
  // #ifdef APP
  import adMixin from "./ad.mixin.app.js"
  // #endif
  // #ifdef MP-WEIXIN
  import adMixin from "./ad.mixin.mp-weixin.js"
  // #endif
  // #ifdef MP-ALIPAY
  import adMixin from "./ad.mixin.mp-alipay.js"
  // #endif

  export default {
    name: 'AdFullscreenVideo',
    mixins: [adMixin],
    props: {
      adType: {
        type: String,
        default: 'FullScreenVideo'
      }
    },
    methods: {
    }
  }
</script>
