<template>
  <uni-image v-on="$listeners">
    <div
      ref="content"
      :style="modeStyle" />
    <img :src="realImagePath">
    <v-uni-resize-sensor
      v-if="mode === 'widthFix'"
      ref="sensor"
      @resize="_resize" />
  </uni-image>
</template>
<script>
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
    }
  },
  data () {
    return {
      originalWidth: 0,
      originalHeight: 0,
      availHeight: '',
      sizeFixed: false
    }
  },
  computed: {
    ratio () {
      return this.originalWidth && this.originalHeight ? this.originalWidth / this.originalHeight : 0
    },
    realImagePath () {
      return this.src && this.$getRealPath(this.src)
    },
    modeStyle () {
      let size = 'auto'
      let position = ''
      let repeat = 'no-repeat'

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

      return `background-position:${position};background-size:${size};background-repeat:${repeat};`
    }
  },
  watch: {
    src (newValue, oldValue) {
      this._setContentImage()
      this._loadImage()
    },
    mode (newValue, oldValue) {
      if (oldValue === 'widthFix') {
        this.$el.style.height = this.availHeight
        this.sizeFixed = false
      }
      if (newValue === 'widthFix' && this.ratio) {
        this._fixSize()
      }
    }
  },
  mounted () {
    this.availHeight = this.$el.style.height || ''
    this._setContentImage()
    if (!this.realImagePath) {
      return
    }
    this._loadImage()
  },
  methods: {
    _resize () {
      if (this.mode === 'widthFix' && !this.sizeFixed) {
        this._fixSize()
      }
    },
    _fixSize () {
      const elWidth = this._getWidth()
      if (elWidth) {
        let height = elWidth / this.ratio
        // fix: 解决 Chrome 浏览器上某些情况下导致 1px 缝隙的问题
        if (typeof navigator && navigator.vendor === 'Google Inc.' && height > 10) {
          height = Math.round(height / 2) * 2
        }
        this.$el.style.height = height + 'px'
        this.sizeFixed = true
      }
    },
    _setContentImage () {
      this.$refs.content.style.backgroundImage = this.src ? `url("${this.realImagePath}")` : 'none'
    },
    _loadImage () {
      const _self = this
      const img = new Image()
      img.onload = function ($event) {
        _self.originalWidth = this.width
        _self.originalHeight = this.height

        if (_self.mode === 'widthFix') {
          _self._fixSize()
        }

        _self.$trigger('load', $event, {
          width: this.width,
          height: this.height
        })
      }
      img.onerror = function ($event) {
        _self.$trigger('error', $event, {
          errMsg: `GET ${_self.src} 404 (Not Found)`
        })
      }
      img.src = this.realImagePath
    },
    _getWidth () {
      const computedStyle = window.getComputedStyle(this.$el)
      const borderWidth = (parseFloat(computedStyle.borderLeftWidth, 10) || 0) + (parseFloat(computedStyle.borderRightWidth,
        10) || 0)
      const paddingWidth = (parseFloat(computedStyle.paddingLeft, 10) || 0) + (parseFloat(computedStyle.paddingRight, 10) ||
					0)
      return this.$el.offsetWidth - borderWidth - paddingWidth
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
