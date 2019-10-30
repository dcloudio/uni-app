<template>
  <uni-video
    v-bind="attrs"
    v-on="$listeners">
    <div
      ref="container"
      class="uni-video-container" />
    <div class="uni-video-slot">
      <slot />
    </div>
  </uni-video>
</template>
<script>
import {
  subscriber,
  listeners
} from 'uni-mixins'

const methods = [
  'play',
  'pause',
  'seek',
  'sendDanmu',
  'playbackRate',
  'requestFullScreen',
  'exitFullScreen'
]

const events = [
  'play',
  'pause',
  'ended',
  'timeupdate',
  'fullscreenchange',
  'waiting',
  'error'
]

const attrs = [
  'src',
  'duration',
  'controls',
  'danmuList',
  'danmuBtn',
  'enableDanmu',
  'autoplay',
  'loop',
  'muted',
  'objectFit',
  'poster',
  'direction',
  'showProgress',
  'initialTime',
  'showFullscreenBtn',
  'pageGesture',
  'enableProgressGesture',
  'showPlayBtn',
  'showCenterPlayBtn'
]

export default {
  name: 'Video',
  mixins: [subscriber, listeners],
  props: {
    id: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    duration: {
      type: [Number, String],
      default: ''
    },
    controls: {
      type: [Boolean, String],
      default: true
    },
    danmuList: {
      type: Array,
      default () {
        return []
      }
    },
    danmuBtn: {
      type: [Boolean, String],
      default: false
    },
    enableDanmu: {
      type: [Boolean, String],
      default: false
    },
    autoplay: {
      type: [Boolean, String],
      default: false
    },
    loop: {
      type: [Boolean, String],
      default: false
    },
    muted: {
      type: [Boolean, String],
      default: false
    },
    objectFit: {
      type: String,
      default: 'contain'
    },
    poster: {
      type: String,
      default: ''
    },
    direction: {
      type: [String, Number],
      default: 360
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    initialTime: {
      type: [String, Number],
      default: 0
    },
    showFullscreenBtn: {
      type: [Boolean, String],
      default: true
    },
    pageGesture: {
      type: [Boolean, String],
      default: false
    },
    enableProgressGesture: {
      type: [Boolean, String],
      default: true
    },
    showPlayBtn: {
      type: [Boolean, String],
      default: true
    },
    showCenterPlayBtn: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      style: {
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        position: 'static'
      },
      hidden: false
    }
  },
  computed: {
    attrs () {
      const obj = {}
      attrs.forEach(key => {
        let val = this.$props[key]
        val = key === 'src' ? this.$getRealPath(val) : val
        obj[key.replace(/[A-Z]/g, (str) => {
          return '-' + str.toLowerCase()
        })] = val
      })
      return obj
    }
  },
  watch: {
    hidden (val) {
      this.video && this.video[val ? 'hide' : 'show']()
    }
  },
  listeners: {
    '@view-update': '_requestUpdate'
  },
  mounted () {
    this._updateStyle()
    const video = this.video = plus.video.createVideoPlayer('video' + Date.now(), Object.assign({}, this.attrs, this.style))
    plus.webview.currentWebview().append(video)
    if (this.hidden) {
      video.hide()
    }
    this.$watch('attrs', () => {
      this.video && this.video.setStyles(this.attrs)
    }, { deep: true })
    this.$watch('style', () => {
      this.video && this.video.setStyles(this.style)
    }, { deep: true })
    events.forEach(key => {
      video.addEventListener(key, (data = {}) => {
        this.$trigger(key, {}, data)
      })
    })
  },
  beforeDestroy () {
    this.video && this.video.close()
    delete this.video
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      if (methods.includes(type)) {
        let val
        switch (type) {
          case 'seek':
            val = data.position
            break
          case 'playbackRate':
            val = data.rate
            break
          default:
            val = data
            break
        }
        this.video && this.video[type](val)
      }
    },
    _updateStyle () {
      const rect = this.$refs.container.getBoundingClientRect()
      this.hidden = getComputedStyle(this.$el).display === 'none';
      ['top', 'left', 'width', 'height'].forEach(key => {
        let val = rect[key]
        val = key === 'top' ? val + (document.documentElement.scrollTop || document.body.scrollTop || 0) : val
        this.style[key] = val + 'px'
      })
    },
    _requestUpdate () {
      if (this._animationFrame) {
        cancelAnimationFrame(this._animationFrame)
      }
      if (this.video) {
        this._animationFrame = requestAnimationFrame(() => {
          delete this._animationFrame
          this._updateStyle()
        })
      }
    }
  }
}
</script>

<style>
uni-video {
  width: 300px;
  height: 225px;
  display: inline-block;
  line-height: 0;
  overflow: hidden;
  position: relative;
}

uni-video[hidden] {
  display: none;
}

.uni-video-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: black;
}

.uni-video-slot {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}
</style>
