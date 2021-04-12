<template>
  <uni-swiper-item v-bind="$attrs">
    <slot />
  </uni-swiper-item>
</template>
<script>
export default {
  name: 'SwiperItem',
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    var $el = this.$el
    $el.style.position = 'absolute'
    $el.style.width = '100%'
    $el.style.height = '100%'
    var callbacks = this.$vnode._callbacks
    if (callbacks) {
      callbacks.forEach(callback => {
        callback()
      })
    }
  }
}
</script>