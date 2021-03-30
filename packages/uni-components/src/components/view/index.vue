<template>
  <uni-view
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering?hoverClass:'']"
    @touchstart="_hoverTouchStart"
    @touchend="_hoverTouchEnd"
    @touchcancel="_hoverTouchCancel"
    v-bind="$attrs"
  >
    <slot />
  </uni-view>
  <uni-view v-else v-bind="$attrs">
    <slot />
  </uni-view>
</template>

<script>
import hover from '../../mixins/hover'
export default {
  name: 'View',
  mixins: [hover],
  listeners: {
    'label-click': 'clickHandler'
  }
}
</script>
