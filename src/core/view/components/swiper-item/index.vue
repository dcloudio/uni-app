<template>
  <uni-swiper-item v-on="$listeners">
    <slot/>
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
  watch: {
    itemId (val, oldVal) {
      this._itemIdUpdated(val, oldVal)
    }
  },
  created () {
    this._itemIdUpdated(this.itemId, this.itemId)
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
  },
  methods: {
    _itemIdUpdated (val, oldVal) {
      var $parent = this.$parent
      if ($parent && typeof $parent._itemIdUpdated === 'function') {
        $parent._itemIdUpdated(this, val, oldVal)
      }
    }
  }
}
</script>
<style>
uni-swiper-item {
  display: block;
  overflow: hidden;
  will-change: transform;
  position: absolute;
  width: 100%;
  height: 100%;
}

uni-swiper-item[hidden] {
  display: none;
}
</style>
