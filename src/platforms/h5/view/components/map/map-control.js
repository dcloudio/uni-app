import getRealPath from 'uni-platform/helpers/get-real-path'

export default {
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    position: {
      type: Object,
      require: true
    },
    iconPath: {
      type: String,
      require: true
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      control: null
    }
  },
  watch: {
    props: function () {
      this.updateControl()
    }
  },
  mounted () {
    this.$parent.mapReady(() => {
      this.addControl()
    })
  },
  beforeDestroy () {
    this.removeControl()
  },
  methods: {
    addControl () {
      this.control = document.createElement('div')
      const style = this.control.style
      style.position = 'absolute'
      style.width = 0
      style.height = 0
      style.top = 0
      style.left = 0
      style.zIndex = 999
      const img = new Image()
      img.src = getRealPath(this.iconPath)
      img.onload = () => {
        if (this.position.width) {
          img.width = this.position.width
        }
        if (this.position.height) {
          img.height = this.position.height
        }
        const style = img.style
        style.position = 'absolute'
        style.left = (this.position.left || 0) + 'px'
        style.top = (this.position.top || 0) + 'px'
        style.maxWidth = 'initial'

        this.control.appendChild(img)
        this.$parent.$el.appendChild(this.control)
      }
      img.onclick = ($event) => {
        if (this.clickable) {
          this.$parent.$trigger('controltap', $event, {
            controlId: this.id
          })
        }
        $event.stopPropagation()
      }
    },
    updateControl () {
      this.removeControl()
      this.addControl()
    },
    removeControl () {
      if (this.control) {
        this.control.remove()
      }
    }
  },
  render () {
    return null
  }
}
