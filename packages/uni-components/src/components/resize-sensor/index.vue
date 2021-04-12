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