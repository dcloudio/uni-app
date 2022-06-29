<template>
  <view @click="onclick">
    <uniad-plugin
      class="uniad-plugin"
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
  name: 'Uniad',
  mixins: [adMixin],
  props: {
  },
  methods: {
  }
}
</script>
