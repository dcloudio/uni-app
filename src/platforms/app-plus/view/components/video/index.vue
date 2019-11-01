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
  subscriber
} from 'uni-mixins'
import native from '../../mixins/native'

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
  mixins: [subscriber, native],
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
  computed: {
    attrs () {
      const obj = {}
      attrs.forEach(key => {
        let val = this.$props[key]
        val = key === 'src' ? this.$getRealPath(val) : val
        obj[key.replace(/[A-Z]/g, str => '-' + str.toLowerCase())] = val
      })
      return obj
    }
  },
  mounted () {
    const video = this.video = plus.video.createVideoPlayer('video' + Date.now(), Object.assign({}, this.attrs, this.position))
    plus.webview.currentWebview().append(video)
    if (this.hidden) {
      video.hide()
    }
    this.$watch('attrs', () => {
      this.video && this.video.setStyles(this.attrs)
    }, { deep: true })
    this.$watch('position', () => {
      this.video && this.video.setStyles(this.position)
    }, { deep: true })
    this.$watch('hidden', (val) => {
      this.video && this.video[val ? 'hide' : 'show']()
    })
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
        if (typeof data === 'object') {
          switch (type) {
            case 'seek':
              data = data.position
              break
            case 'playbackRate':
              data = data.rate
              break
          }
        }
        this.video && this.video[type](data)
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
