<template>
  <uni-image v-on="$listeners">
    <div
      ref="content"
      :style="style"
    />
    <v-uni-resize-sensor
      v-if="mode === 'widthFix' || mode === 'heightFix'"
      ref="sensor"
      @resize="_fixSize()"
    />
  </uni-image>
</template>
<script>
function fixNumber (number) {
  // fix: 解决 Chrome 浏览器上某些情况下导致 1px 缝隙的问题
  if (typeof navigator && navigator.vendor === 'Google Inc.' && number > 10) {
    number = Math.round(number / 2) * 2
  }
  return number
}

export default {
  name: 'Image',
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    // TODO 懒加载
    lazyLoad: {
      type: [Boolean, String],
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      originalWidth: 0,
      originalHeight: 0,
      originalStyle: { width: '', height: '' },
      contentPath: ''
    }
  },
  computed: {
    ratio () {
      return this.originalWidth && this.originalHeight ? this.originalWidth / this.originalHeight : 0
    },
    style () {
      let size = 'auto'
      let position = ''
      const repeat = 'no-repeat'

      switch (this.mode) {
        case 'aspectFit':
          size = 'contain'
          position = 'center center'
          break
        case 'aspectFill':
          size = 'cover'
          position = 'center center'
          break
        case 'widthFix':
        case 'heightFix':
          size = '100% 100%'
          break
        case 'top':
          position = 'center top'
          break
        case 'bottom':
          position = 'center bottom'
          break
        case 'center':
          position = 'center center'
          break
        case 'left':
          position = 'left center'
          break
        case 'right':
          position = 'right center'
          break
        case 'top left':
          position = 'left top'
          break
        case 'top right':
          position = 'right top'
          break
        case 'bottom left':
          position = 'left bottom'
          break
        case 'bottom right':
          position = 'right bottom'
          break
        default:
          size = '100% 100%'
          position = '0% 0%'
          break
      }

      return {
        'background-image': this.contentPath ? `url("${this.contentPath}")` : 'none',
        'background-position': position,
        'background-size': size,
        'background-repeat': repeat
      }
    }
  },
  watch: {
    src (newValue, oldValue) {
      this._loadImage()
    },
    mode (newValue, oldValue) {
      if (oldValue === 'widthFix' || oldValue === 'heightFix') {
        this._resetSize()
      }
      if (newValue === 'widthFix' || newValue === 'heightFix') {
        this._fixSize()
      }
    },
    contentPath (val) {
      if (!val && this.__img) {
        this.__img.remove()
        delete this.__img
      }
    }
  },
  mounted () {
    this.originalStyle.width = this.$el.style.width || ''
    this.originalStyle.height = this.$el.style.height || ''
    this._loadImage()
  },
  beforeDestroy () {
    this._clearImage()
  },
  methods: {
    _fixSize () {
      if (this.ratio) {
        const $el = this.$el
        if (this.mode === 'widthFix') {
          const width = $el.offsetWidth
          if (width) {
            $el.style.height = fixNumber(width / this.ratio) + 'px'
          }
        } else if (this.mode === 'heightFix') {
          const height = $el.offsetHeight
          if (height) {
            $el.style.width = fixNumber(height * this.ratio) + 'px'
          }
        }
      }
      window.dispatchEvent(new CustomEvent('updateview'))
    },
    _resetSize () {
      this.$el.style.width = this.originalStyle.width
      this.$el.style.height = this.originalStyle.height
    },
    _resetData () {
      this.originalWidth = 0
      this.originalHeight = 0
      this.contentPath = ''
    },
    _loadImage () {
      const realImagePath = this.$getRealPath(this.src)
      if (realImagePath) {
        const img = this._img = this._img || new Image()
        img.onload = $event => {
          this._img = null
          this.originalWidth = img.width
          this.originalHeight = img.height

          this._fixSize()

          this.contentPath = realImagePath
          img.draggable = this.draggable
          if (this.__img) {
            this.__img.remove()
          }
          this.__img = img
          this.$el.appendChild(img)

          this.$trigger('load', $event, {
            width: img.width,
            height: img.height
          })
        }
        img.onerror = $event => {
          this._img = null
          this._resetData()
          // 与微信小程序保持一致，保留之前样式
          // this._resetSize()
          this.$trigger('error', $event, {
            errMsg: `GET ${this.src} 404 (Not Found)`
          })
        }
        img.src = realImagePath
      } else {
        this._clearImage()
        this._resetData()
        // 与微信小程序保持一致，保留之前样式
        // this._resetSize()
      }
    },
    _clearImage () {
      const img = this._img
      if (img) {
        img.onload = null
        img.onerror = null
        this._img = null
      }
    }
  }
}
</script>
<style>
uni-image {
  width: 320px;
  height: 240px;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

uni-image[hidden] {
  display: none;
}

uni-image>div {
  width: 100%;
  height: 100%;
}

uni-image>img {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

uni-image>.uni-image-will-change {
  will-change: transform;
}
</style>
