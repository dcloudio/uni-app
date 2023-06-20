<template>
  <uni-resize-sensor @animationstart.once="update">
    <div @scroll="update">
      <div />
    </div>
    <div @scroll="update">
      <div />
    </div>
  </uni-resize-sensor>
</template>
<script>
const MAX = 100000

export default {
  name: 'ResizeSensor',
  props: {
    initial: {
      type: [Boolean, String],
      default: false
    }
  },
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
  activated () {
    this.reset()
  },
  methods: {
    reset: function () {
      const expand = this.$el.firstChild
      expand.scrollLeft = MAX
      expand.scrollTop = MAX
      const shrink = this.$el.lastChild
      shrink.scrollLeft = MAX
      shrink.scrollTop = MAX
    },
    update: function () {
      this.size.width = this.$el.offsetWidth
      this.size.height = this.$el.offsetHeight
      this.reset()
    }
  }
}

</script>

<style>
@keyframes once-show {
  from {
    top: 0;
  }
}
uni-resize-sensor,
uni-resize-sensor > div {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
uni-resize-sensor {
  display: block;
  z-index: -1;
  visibility: hidden;
  animation: once-show 1ms;
}
uni-resize-sensor > div > div {
  position: absolute;
  left: 0;
  top: 0;
}
uni-resize-sensor > div:first-child > div {
  width: 100000px;
  height: 100000px;
}
uni-resize-sensor > div:last-child > div {
  width: 200%;
  height: 200%;
}
</style>
