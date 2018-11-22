<template>
  <uni-view
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering?hoverClass:'']"
    @touchstart="_hoverTouchStart"
    @touchend="_hoverTouchEnd"
    @touchcancel="_hoverTouchCancel"
    v-on="$listeners">
    <slot />
  </uni-view>
  <uni-view
    v-else
    v-on="$listeners">
    <slot />
  </uni-view>
</template>

<style>
	uni-view {
		display: block;
	}
</style>

<script>
import hover from 'uni-mixins/hover'
export default {
  name: 'View',
  mixins: [hover],
  listeners: {
    'label-click': 'clickHandler'
  }
}
</script>
