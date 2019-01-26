<script>
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

    if ('attachEvent' in this.$el && !('AnimationEvent' in window)) {
      var onresizeHandler = function () {
        this.update()
        removeOnresizeEvent()
      }.bind(this)

      var removeOnresizeEvent = function () {
        this.$el.detachEvent('onresize', onresizeHandler)
        this.$off('resizeSensorBeforeDestroy', removeOnresizeEvent)
      }.bind(this)

      this.$el.attachEvent('onresize', onresizeHandler)
      this.$on('resizeSensorBeforeDestroy', removeOnresizeEvent)
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
  render: function (create) {
    return create('uni-resize-sensor', {
      on: {
        '~animationstart': this.update
      }
    }, [
      create('div', {
        on: {
          scroll: this.update
        }
      }, [
        create('div')
      ]),
      create('div', {
        on: {
          scroll: this.update
        }
      }, [
        create('div')
      ])
    ])
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
