<template>
  <uni-resize-sensor @animationstart.once="update">
    <div @scroll="update">
      <div></div>
    </div>
    <div @scroll="update">
      <div></div>
    </div>
  </uni-resize-sensor>
</template>

<script>
export default {
  name: 'ResizeSensor',
  props: {
    initial: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ['resize'],
  data: function () {
    return {
      size: {
        width: -1,
        height: -1
      }
    }
  },
  watch: {
    size: {
      deep: true,
      handler: function (size) {
        this.$emit('resize', Object.assign({}, size))
      }
    }
  },
  mounted: function () {
    if (this.initial === true) {
      this.$nextTick(this.update)
    }

    if (this.$el.offsetParent !== this.$el.parentNode) {
      this.$el.parentNode.style.position = 'relative'
    }

    if (!('AnimationEvent' in window)) {
      this.reset()
    }
  },
  methods: {
    reset: function () {
      var expand = this.$el.firstChild
      var shrink = this.$el.lastChild
      expand.scrollLeft = 100000
      expand.scrollTop = 100000
      shrink.scrollLeft = 100000
      shrink.scrollTop = 100000
    },
    update: function () {
      this.size.width = this.$el.offsetWidth
      this.size.height = this.$el.offsetHeight
      this.reset()
    }
  },
}
</script>