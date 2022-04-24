<template>
  <view @click="onclick">
    <uni-ad-plugin
      class="uni-ad-plugin"
      :adpid="adpid"
      :unit-id="unitId"
      @load="_onmpload"
      @close="_onmpclose"
      @error="_onmperror"
    />
  </view>
</template>

<script>
import adMixin from './ad.mixin.mp.js'
export default {
  name: 'UniAd',
  mixins: [adMixin],
  props: {
  },
  methods: {
  }
}
</script>
