<template>
  <uni-audio
    :id="id"
    :controls="!!controls"
    v-bind="$attrs"
  >
    <audio
      ref="audio"
      :loop="loop"
      style="display:none;"
    />
    <div class="uni-audio-default">
      <div
        :style="'background-image: url('+$getRealPath(poster)+');'"
        class="uni-audio-left"
      >
        <div
          :class="{play:!playing,pause:playing}"
          class="uni-audio-button"
          @click="trigger"
        />
      </div>
      <div class="uni-audio-right">
        <div class="uni-audio-time">
          {{ currentTime }}
        </div>
        <div class="uni-audio-info">
          <div class="uni-audio-name">
            {{ name }}
          </div>
          <div class="uni-audio-author">
            {{ author }}
          </div>
        </div>
      </div>
    </div>
  </uni-audio>
</template>

<script>
import {
  subscriber
} from '../../mixins'

export default {
  name: 'Audio',
  mixins: [subscriber],
  props: {
    id: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    loop: {
      type: [Boolean, String],
      default: false
    },
    controls: {
      type: [Boolean, String],
      default: false
    },
    poster: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      playing: false,
      currentTime: this.getTime(0)
    }
  },
  watch: {
    src (val) {
      if (this.$refs.audio) {
        this.$refs.audio.src = this.$getRealPath(val)
      }
    }
  },
  mounted () {
    const audio = this.$refs.audio
    audio.addEventListener('error', $event => {
      this.playing = false
      this.$trigger('error', $event, {})
    })
    audio.addEventListener('play', $event => {
      this.playing = true
      this.$trigger('play', $event, {})
    })
    audio.addEventListener('pause', $event => {
      this.playing = false
      this.$trigger('pause', $event, {})
    })
    audio.addEventListener('ended', $event => {
      this.playing = false
      this.$trigger('ended', $event, {})
    })
    audio.addEventListener('timeupdate', $event => {
      var currentTime = audio.currentTime
      this.currentTime = this.getTime(currentTime)
      var duration = audio.duration
      this.$trigger('timeupdate', $event, {
        currentTime,
        duration
      })
    })
    audio.src = this.$getRealPath(this.src)
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      var audio = this.$refs.audio
      switch (type) {
        case 'setSrc':
          audio.src = this.$getRealPath(data.src)
          this.$emit('update:src', data.src)
          break
        case 'play':
          audio.play()
          break
        case 'pause':
          audio.pause()
          break
        case 'seek':
          audio.currentTime = data.position
          break
      }
    },
    trigger () {
      if (this.playing) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
    },
    getTime (time) {
      var h = Math.floor(time / 3600)
      var m = Math.floor(time % 3600 / 60)
      var s = Math.floor(time % 3600 % 60)
      h = (h < 10 ? '0' : '') + h
      m = (m < 10 ? '0' : '') + m
      s = (s < 10 ? '0' : '') + s
      var str = m + ':' + s
      if (h !== '00') {
        str = h + ':' + str
      }
      return str
    }
  }
}
</script>
