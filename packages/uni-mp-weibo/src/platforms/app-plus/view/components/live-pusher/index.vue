<template>
  <uni-live-pusher v-on="$listeners">
    <div
      ref="container"
      class="uni-live-pusher-container"
    />
    <div class="uni-live-pusher-slot">
      <slot />
    </div>
  </uni-live-pusher>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'
import native from '../../mixins/native'

const events = [
  'statechange',
  'netstatus',
  'error'
]

const attrs = [
  'url',
  'mode',
  'muted',
  'enableCamera',
  'autoFocus',
  'beauty',
  'whiteness',
  'aspect',
  'minBitrate'
]

export default {
  name: 'LivePusher',
  mixins: [subscriber, native],
  props: {
    id: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'SD'
    },
    muted: {
      type: [Boolean, String],
      default: false
    },
    enableCamera: {
      type: [Boolean, String],
      default: true
    },
    autoFocus: {
      type: [Boolean, String],
      default: true
    },
    beauty: {
      type: [Number, String],
      default: 0
    },
    whiteness: {
      type: [Number, String],
      default: 0
    },
    aspect: {
      type: [String],
      default: '3:2'
    },
    minBitrate: {
      type: [Number],
      default: 200
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
    this._onParentReady(() => {
      const livePusher = this.livePusher = new plus.video.LivePusher('livePusher' + Date.now(), Object.assign({}, this.attrs, this.position))
      plus.webview.currentWebview().append(livePusher)
      this.$watch('attrs', () => {
        this.livePusher && this.livePusher.setStyles(this.attrs)
      }, { deep: true })
      this.$watch('position', () => {
        this.livePusher && this.livePusher.setStyles(this.position)
      }, { deep: true })
      this.$watch('hidden', (val) => {
        const livePusher = this.livePusher
        if (livePusher) {
          // livePusher[val ? 'hide' : 'show']()
          // iOS 隐藏状态设置 setStyles 不生效
          if (!val) {
            livePusher.setStyles(this.position)
          }
        }
      })
      events.forEach(key => {
        livePusher.addEventListener(key, (e) => {
          this.$trigger(key, {}, { ...e.detail })
        })
      })
    })
  },
  beforeDestroy () {
    this.livePusher && this.livePusher.close()
    delete this.livePusher
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      this.livePusher && this.livePusher[type](data)
    }
  }
}
</script>

<style>
uni-live-pusher {
  width: 300px;
  height: 225px;
  display: inline-block;
  line-height: 0;
  overflow: hidden;
  position: relative;
}

uni-live-pusher[hidden] {
  display: none;
}

.uni-live-pusher-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: black;
}

.uni-live-pusher-slot {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}
</style>
