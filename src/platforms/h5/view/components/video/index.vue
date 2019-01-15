<template>
  <uni-video
    :id="id"
    :src="src"
    :initial-time="initialTime"
    :duration="duration"
    :controls="controls"
    :danmu-list="danmuList"
    :danmu-btn="danmuBtn"
    :enable-danmu="enableDanmu"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :page-gesture="pageGesture"
    :direction="direction"
    :show-progress="showProgress"
    :show-fullscreen-btn="showFullscreenBtn"
    :show-play-btn="showPlayBtn"
    :show-center-play-btn="showCenterPlayBtn"
    :enable-progress-gesture="enableProgressGesture"
    :object-fit="objectFit"
    :poster="poster"
    :x5-video-player-type="x5VideoPlayerType"
    :x5-video-player-fullscreen="x5VideoPlayerFullscren"
    :x5-video-orientation="x5VideoOrientation"
    v-on="$listeners"
  >
    <div
      ref="container"
      :class="{'uni-video-type-fullscreen':fullscreen,'uni-video-type-rotate-left':rotateType==='left','uni-video-type-rotate-right':rotateType==='right'}"
      :style="{width:fullscreen?width:'100%',height:fullscreen?height:'100%'}"
      class="uni-video-container"
      @click="triggerControls"
      @touchstart="touchstart($event)"
      @touchend="touchend($event)"
      @touchmove="touchmove($event)"
    >
      <video
        ref="video"
        :style="{opacity:!start?0.8:1,objectFit:objectFit}"
        :muted="muted"
        :loop="loop"
        :src="srcSync"
        :poster="poster"
        :x5-video-player-type="x5VideoPlayerType"
        :x5-video-player-fullscreen="x5VideoPlayerFullscren"
        :x5-video-orientation="x5VideoOrientation"
        class="uni-video-video"
        webkit-playsinline
        playsinline
      />
      <div
        v-show="controlsShow"
        class="uni-video-bar uni-video-bar-full"
        @click.stop>
        <div class="uni-video-controls">
          <div
            v-show="showPlayBtn"
            :class="{'uni-video-control-button-play':!playing,'uni-video-control-button-pause':playing}"
            class="uni-video-control-button"
            @click.stop="trigger"
          />
          <div class="uni-video-current-time">{{ currentTime|getTime }}</div>
          <div
            ref="progress"
            class="uni-video-progress-container"
            @click.stop="clickProgress($event)"
          >
            <div class="uni-video-progress">
              <div
                :style="{width:buffered*100+'%'}"
                class="uni-video-progress-buffered"/>
              <div
                ref="ball"
                :style="{left:progress+'%'}"
                class="uni-video-ball">
                <div class="uni-video-inner"/>
              </div>
            </div>
          </div>
          <div class="uni-video-duration">{{ (duration||durationTime)|getTime }}</div>
        </div>
        <div
          v-if="danmuBtn"
          :class="{'uni-video-danmu-button-active':enableDanmuSync}"
          class="uni-video-danmu-button"
          @click.stop="triggerDanmu"
        >弹幕</div>
        <div
          v-show="showFullscreenBtn"
          :class="{'uni-video-type-fullscreen':fullscreen}"
          class="uni-video-fullscreen"
          @click.stop="triggerFullscreen"
        />
      </div>
      <div
        v-show="start&&enableDanmuSync"
        ref="danmu"
        style="z-index: 0;"
        class="uni-video-danmu"/>
      <div
        v-if="!start"
        class="uni-video-cover"
        @click.stop>
        <div
          class="uni-video-cover-play-button"
          @click.stop="play"/>
        <p class="uni-video-cover-duration">{{ (duration||durationTime)|getTime }}</p>
      </div>
      <div
        :class="{'uni-video-toast-volume':gestureType==='volume'}"
        class="uni-video-toast">
        <div class="uni-video-toast-title">音量</div>
        <svg
          class="uni-video-toast-icon"
          width="200px"
          height="200px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"
          />
        </svg>
        <div class="uni-video-toast-value">
          <div
            :style="{width:volumeNew*100+'%'}"
            class="uni-video-toast-value-content">
            <div class="uni-video-toast-volume-grids">
              <div
                v-for="(item,index) in 10"
                :key="index"
                class="uni-video-toast-volume-grids-item"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        :class="{'uni-video-toast-progress':gestureType=='progress'}"
        class="uni-video-toast">
        <div class="uni-video-toast-title">{{ currentTimeNew|getTime }} / {{ durationTime|getTime }}</div>
      </div>
    </div>
    <div
      style="position: absolute; top: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;"
    >
      <slot/>
    </div>
  </uni-video>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'
import {
  supportsPassive
} from 'uni-shared'

const passiveOptions = supportsPassive ? {
  passive: false
} : false

const GestureType = {
  NONE: 'none',
  STOP: 'stop',
  VOLUME: 'volume',
  PROGRESS: 'progress'
}

export default {
  name: 'Video',
  filters: {
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
  },
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
    x5VideoPlayerType: {
      type: [Boolean, String],
      default: false
    },
    x5VideoPlayerFullscren: {
      type: [Boolean, String],
      default: false
    },
    x5VideoOrientation: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      start: false,
      playing: false,
      currentTime: 0,
      durationTime: 0,
      progress: 0,
      touching: false,
      enableDanmuSync: Boolean(this.enableDanmu),
      controlsVisible: true,
      fullscreen: false,
      width: '0',
      height: '0',
      fullscreenTriggering: false,
      controlsTouching: false,
      directionSync: Number(this.direction),
      touchStartOrigin: {
        x: 0,
        y: 0
      },
      gestureType: GestureType.NONE,
      currentTimeOld: 0,
      currentTimeNew: 0,
      volumeOld: null,
      volumeNew: null,
      isIOS: false,
      buffered: 0,
      rotateType: ''
    }
  },
  computed: {
    controlsShow () {
      return this.start && this.controls && this.controlsVisible
    },
    autoHideContorls () {
      return this.controlsShow && this.playing && !this.controlsTouching
    },
    srcSync () {
      return this.$getRealPath(this.src)
    }
  },
  watch: {
    enableDanmuSync (val) {
      this.$emit('update:enableDanmu', val)
    },
    autoHideContorls (val) {
      if (val) {
        this.autoHideStart()
      } else {
        this.autoHideEnd()
      }
    },
    fullscreen (val) {
      var container = this.$refs.container
      var playing = this.playing
      this.fullscreenTriggering = true
      container.remove()
      if (val) {
        this.resize()
        document.body.appendChild(container)
      } else {
        this.$el.appendChild(container)
      }
      this.$trigger('fullscreenchange', {}, {
        fullScreen: val
      })
      if (playing) {
        this.play()
      }
      setTimeout(() => {
        this.fullscreenTriggering = false
      }, 0)
    },
    direction (val) {
      this.directionSync = Number(val)
    },
    srcSync (val) {
      this.playing = false
      this.currentTime = 0
      if (val && this.autoplay) {
        this.$nextTick(() => {
          this.$refs.video.play()
        })
      }
    },
    currentTime () {
      this.updateProgress()
    },
    duration () {
      this.updateProgress()
    }
  },
  created () {
    this.otherData = {
      danmuList: [],
      danmuIndex: {
        time: 0,
        index: -1
      },
      hideTiming: null
    }
    var danmuList = this.otherData.danmuList = JSON.parse(JSON.stringify(this.danmuList || []))
    danmuList.sort(function (a, b) {
      return (a.time || 0) - (a.time || 0)
    })
    this.width = window.innerWidth + 'px'
    this.height = window.innerHeight + 'px'
  },
  mounted () {
    var self = this
    var otherData = this.otherData
    var video = this.$refs.video
    var ball = this.$refs.ball
    video.addEventListener('durationchange', function (event) {
      self.durationTime = video.duration
    })
    video.addEventListener('loadedmetadata', function (event) {
      var initialTime = Number(self.initialTime) || 0
      if (initialTime > 0) {
        video.currentTime = initialTime
      }
    })
    video.addEventListener('progress', function (event) {
      var buffered = video.buffered
      if (buffered.length) {
        self.buffered = buffered.end(buffered.length - 1) / video.duration
      }
    })
    video.addEventListener('waiting', function ($event) {
      self.$trigger('waiting', $event, {})
    })
    video.addEventListener('error', function ($event) {
      self.playing = false
      self.$trigger('error', $event, {})
    })
    video.addEventListener('play', function ($event) {
      self.start = true
      self.playing = true
      if (self.fullscreenTriggering) {
        return
      }
      self.$trigger('play', $event, {})
    })
    video.addEventListener('pause', function ($event) {
      self.playing = false
      if (self.fullscreenTriggering) {
        return
      }
      self.$trigger('pause', $event, {})
    })
    video.addEventListener('ended', function ($event) {
      self.playing = false
      self.$trigger('ended', $event, {})
    })

    video.addEventListener('timeupdate', function ($event) {
      var currentTime = self.currentTime = video.currentTime
      var duration = video.duration
      var oldDanmuIndex = otherData.danmuIndex
      var danmuIndex = {
        time: currentTime,
        index: oldDanmuIndex.index
      }
      var danmuList = otherData.danmuList
      if (currentTime > oldDanmuIndex.time) {
        for (let index = oldDanmuIndex.index + 1; index < danmuList.length; index++) {
          let element = danmuList[index]
          if (currentTime >= (element.time || 0)) {
            danmuIndex.index = index
            if (self.playing && self.enableDanmuSync) {
              self.playDanmu(element)
            }
          } else {
            break
          }
        }
      } else if (currentTime < oldDanmuIndex.time) {
        for (let index = oldDanmuIndex.index - 1; index > -1; index--) {
          let element = danmuList[index]
          if (currentTime <= (element.time || 0)) {
            danmuIndex.index = index - 1
          } else {
            break
          }
        }
      }
      otherData.danmuIndex = danmuIndex

      self.$trigger('timeupdate', $event, {
        currentTime,
        duration
      })
    })
    video.addEventListener('x5videoenterfullscreen', function ($event) {
      self.$trigger('fullscreenchange', $event, {
        fullScreen: true
      })
    })
    video.addEventListener('x5videoexitfullscreen', function ($event) {
      self.$trigger('fullscreenchange', $event, {
        fullScreen: false
      })
    })
    var originX
    var originY
    var moveOnce = true
    var originProgress
    ball.addEventListener('touchstart', function (event) {
      self.controlsTouching = true
      var toucher = self.getScreenXY(event.targetTouches[0])
      originX = toucher.pageX
      originY = toucher.pageY
      originProgress = self.progress
      moveOnce = true
      self.touching = true
      ball.addEventListener('touchmove', touchmove, passiveOptions)
    })

    function touchmove (event) {
      var toucher = self.getScreenXY(event.targetTouches[0])
      var pageX = toucher.pageX
      var pageY = toucher.pageY
      if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
        touchend()
        return
      }
      moveOnce = false
      var w = self.$refs.progress.offsetWidth
      var progress = originProgress + (pageX - originX) / w * 100
      if (progress < 0) {
        progress = 0
      } else if (progress > 100) {
        progress = 100
      }
      self.progress = progress
      event.preventDefault()
      event.stopPropagation()
    }

    function touchend (event) {
      self.controlsTouching = false
      if (self.touching) {
        ball.removeEventListener('touchmove', touchmove, passiveOptions)
        if (!moveOnce) {
          event.preventDefault()
          event.stopPropagation()
          self.seek(self.$refs.video.duration * self.progress / 100)
        }
        self.touching = false
      }
    }
    ball.addEventListener('touchend', touchend)
    ball.addEventListener('touchcancel', touchend)

    if (String(this.srcSync).length && this.autoplay) {
      video.play()
    }
  },
  beforeDestroy () {
    this.$refs.container.remove()
    clearTimeout(this.otherData.hideTiming)
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      switch (type) {
        case 'play':
          this.play()
          break
        case 'pause':
          this.pause()
          break
        case 'seek':
          this.seek(data.position)
          break
        case 'sendDanmu':
          this.sendDanmu(data)
          break
        case 'playbackRate':
          this.$refs.video.playbackRate = data.rate
          break
        case 'requestFullScreen':
          this.enterFullscreen()
          break
        case 'exitFullScreen':
          this.leaveFullscreen()
          break
      }
    },
    resize () {
      var w = window.innerWidth
      var h = window.innerHeight
      var direction = Math.abs(this.directionSync)

      if (direction === 0) {
        if (w > h) {
          this.rotateType = 'left'
        } else {
          this.rotateType = ''
        }
      } else if (direction === 90) {
        if (w > h) {
          this.rotateType = ''
        } else {
          this.rotateType = 'right'
        }
      } else {
        this.rotateType = ''
      }
      if (!this.rotateType) {
        this.width = w + 'px'
        this.height = h + 'px'
      } else {
        this.width = h + 'px'
        this.height = w + 'px'
      }
    },
    trigger () {
      if (this.playing) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.play()
      }
    },
    play () {
      this.start = true
      this.$refs.video.play()
    },
    pause () {
      this.$refs.video.pause()
    },
    seek (position) {
      position = Number(position)
      if (typeof position === 'number' && !isNaN(position)) {
        this.$refs.video.currentTime = position
      }
    },
    clickProgress (event) {
      var x = event.offsetX
      var _progress = this.$refs.progress
      var element = event.target
      while (element !== _progress) {
        x += element.offsetLeft
        element = element.parentNode
      }
      var w = _progress.offsetWidth
      var progress = 0
      if (x >= 0 && x <= w) {
        progress = x / w
        this.seek(this.$refs.video.duration * progress)
      }
    },
    triggerDanmu () {
      this.enableDanmuSync = !this.enableDanmuSync
    },
    playDanmu (danmu) {
      var p = document.createElement('p')
      p.className = 'uni-video-danmu-item'
      p.innerText = danmu.text
      var style = `bottom: ${Math.random() * 100}%;color: ${danmu.color};`
      p.setAttribute('style', style)
      this.$refs.danmu.appendChild(p)
      setTimeout(function () {
        style += 'left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);'
        p.setAttribute('style', style)
        setTimeout(function () {
          p.remove()
        }, 4000)
      }, 17)
    },
    sendDanmu (danmu) {
      var otherData = this.otherData
      otherData.danmuList.splice(otherData.danmuIndex.index + 1, 0, {
        text: String(danmu.text),
        color: danmu.color,
        time: this.$refs.video.currentTime || 0
      })
    },
    triggerFullscreen () {
      this.fullscreen = !this.fullscreen
    },
    enterFullscreen (direction) {
      var directionSync = Number(direction)
      if (!isNaN(NaN)) {
        this.directionSync = directionSync
      }
      this.fullscreen = true
    },
    leaveFullscreen () {
      this.fullscreen = false
    },
    triggerControls () {
      this.controlsVisible = !this.controlsVisible
    },
    touchstart (event) {
      var toucher = this.getScreenXY(event.targetTouches[0])
      this.touchStartOrigin = {
        x: toucher.pageX,
        y: toucher.pageY
      }
      this.gestureType = GestureType.NONE
      this.volumeOld = null
      this.currentTimeOld = this.currentTimeNew = 0
    },
    touchmove (event) {
      function stop () {
        event.stopPropagation()
        event.preventDefault()
      }
      if (this.fullscreen) {
        stop()
      }
      var gestureType = this.gestureType
      if (gestureType === GestureType.STOP) {
        return
      }
      var toucher = this.getScreenXY(event.targetTouches[0])
      var pageX = toucher.pageX
      var pageY = toucher.pageY
      var origin = this.touchStartOrigin
      if (gestureType === GestureType.PROGRESS) {
        this.changeProgress(pageX - origin.x)
      } else if (gestureType === GestureType.VOLUME) {
        this.changeVolume(pageY - origin.y)
      }
      if (gestureType !== GestureType.NONE) {
        return
      }
      if (Math.abs(pageX - origin.x) > Math.abs(pageY - origin.y)) {
        if (!this.enableProgressGesture) {
          this.gestureType = GestureType.STOP
          return
        }
        this.gestureType = GestureType.PROGRESS
        this.currentTimeOld = this.currentTimeNew = this.$refs.video.currentTime
        if (!this.fullscreen) {
          stop()
        }
      } else {
        if (!this.pageGesture) {
          this.gestureType = GestureType.STOP
          return
        }
        this.gestureType = GestureType.VOLUME
        this.volumeOld = this.$refs.video.volume
        if (!this.fullscreen) {
          stop()
        }
      }
    },
    touchend (event) {
      if (this.gestureType !== GestureType.NONE && this.gestureType !== GestureType.STOP) {
        event.stopPropagation()
        event.preventDefault()
      }
      if (this.gestureType === GestureType.PROGRESS && this.currentTimeOld !== this.currentTimeNew) {
        this.$refs.video.currentTime = this.currentTimeNew
      }
      this.gestureType = GestureType.NONE
    },
    changeProgress (x) {
      var duration = this.$refs.video.duration
      var currentTimeNew = x / 600 * duration + this.currentTimeOld
      if (currentTimeNew < 0) {
        currentTimeNew = 0
      } else if (currentTimeNew > duration) {
        currentTimeNew = duration
      }
      this.currentTimeNew = currentTimeNew
    },
    changeVolume (y) {
      var valueOld = this.volumeOld
      var value
      if (typeof valueOld === 'number') {
        value = valueOld - y / 200
        if (value < 0) {
          value = 0
        } else if (value > 1) {
          value = 1
        }
        this.$refs.video.volume = value
        this.volumeNew = value
      }
    },
    autoHideStart () {
      this.otherData.hideTiming = setTimeout(() => {
        this.controlsVisible = false
      }, 3000)
    },
    autoHideEnd () {
      var otherData = this.otherData
      if (otherData.hideTiming) {
        clearTimeout(otherData.hideTiming)
        otherData.hideTiming = null
      }
    },
    getScreenXY (dataOrigin) {
      var rotateType = this.rotateType
      if (!this.fullscreen || !rotateType) {
        return dataOrigin
      }
      var w = screen.width
      var h = screen.height
      var x = dataOrigin.pageX
      var y = dataOrigin.pageY
      var pageX
      var pageY
      if (rotateType === 'left') {
        pageX = h - y
        pageY = x
      } else {
        pageX = y
        pageY = w - x
      }
      return {
        pageX,
        pageY
      }
    },
    updateProgress () {
      if (!this.touching) {
        this.progress = this.currentTime / this.durationTime * 100
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
  background-color: black;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  object-position: inherit;
}

.uni-video-container.uni-video-type-fullscreen {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.uni-video-container.uni-video-type-fullscreen.uni-video-type-rotate-left {
  transform: translate(-50%, -50%) rotate(-90deg);
}

.uni-video-container.uni-video-type-fullscreen.uni-video-type-rotate-right {
  transform: translate(-50%, -50%) rotate(90deg);
}

.uni-video-video {
  width: 100%;
  height: 100%;
  object-position: inherit;
}

.uni-video-cover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.5);
  z-index: 1;
}

.uni-video-cover-play-button {
  width: 40px;
  height: 40px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.uni-video-cover-duration {
  color: #fff;
  font-size: 16px;
  line-height: 1;
  margin-top: 10px;
}

.uni-video-bar {
  height: 44px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  display: flex;
  align-items: center;
  align-items: center;
  padding: 0 10px;
  z-index: 0;
}

.uni-video-bar.uni-video-bar-full {
  left: 0;
}

.uni-video-controls {
  display: flex;
  display: flex;
  flex-grow: 1;
  flex-grow: 1;
  margin: 0 8.5px;
}

.uni-video-control-button {
  width: 13px;
  height: 15px;
  padding: 14.5px 12.5px 14.5px 12.5px;
  margin-left: -8.5px;
  box-sizing: content-box;
}

.uni-video-control-button::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.uni-video-control-button.uni-video-control-button-play::after,
.uni-video-cover-play-button {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg==");
}

.uni-video-control-button.uni-video-control-button-pause::after {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAFlJREFUSA3tksEKACAIQ7X//5zq98wOgQayum8QaGweHhMzG/6OujzKAymn+0LMqivu1XznWmX8/echTIyMyAgTwA72iIwwAexgj8gIE8CO3aMRbDPMaEy5BRGaKcZv8YxRAAAAAElFTkSuQmCC");
}

.uni-video-current-time,
.uni-video-duration {
  height: 14.5px;
  line-height: 14.5px;
  margin-top: 15px;
  margin-bottom: 14.5px;
  font-size: 12px;
  color: #cbcbcb;
}

.uni-video-progress-container {
  flex-grow: 2;
  flex-grow: 2;
  position: relative;
}

.uni-video-progress {
  height: 2px;
  margin: 21px 12px;
  background-color: rgba(255, 255, 255, 0.4);
  position: relative;
}

.uni-video-progress-buffered {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  transition: width 0.1s;
  background-color: rgba(255, 255, 255, 0.8);
}

.uni-video-ball {
  width: 16px;
  height: 16px;
  padding: 14px;
  position: absolute;
  top: -21px;
  box-sizing: content-box;
  left: 0%;
  margin-left: -22px;
}

.uni-video-inner {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 50%;
}

.uni-video-danmu-button {
  white-space: nowrap;
  line-height: 1;
  padding: 2px 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
  margin: 0 8.5px;
}

.uni-video-danmu-button.uni-video-danmu-button-active {
  border-color: #48c23d;
  color: #48c23d;
}

.uni-video-fullscreen {
  width: 17px;
  height: 17px;
  padding: 8.5px;
  box-sizing: content-box;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAQRJREFUWAnt1d0NwiAQB/CmS7hHX5zFxLF0Ah2hE/lg7BT4PyMJUj6Oyt299BIioZT7ARYG59wLpTXmoXOMGO/QecxtwyWW4o42AupGALkFdX1MkHxE3Q7jIbQPqNthQogpJoZkMLRlsn/gFMQEk4OoY0oQVUwNoobhQFQwgMxUKFkt0C8+Zy61d8SeR5iHWCLOwF/MCb8Tp//ex3QFsE1HlCfKFUX2OijNFMnPKD7k76YcBoL402Zh8B77+MjlXrVvwfglXA32b0MrRgxCE2nBiEJaMOIQLkYFwsGoQWoYVUgJow4pYD4Weq4ayBqfwDYQmnUK0301kITujuawu65/l2B5A4z3Qe+Ut7EBAAAAAElFTkSuQmCC");
  background-size: 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.uni-video-fullscreen.uni-video-type-fullscreen {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAABBElEQVRYhcXWwQ3CMAwF0O+qOzAKQzAAl0pMxQQwQhmGKwcERxbgc4lEVdHUbm3zJR8qJemTo6YByS3JO8kjyQbGkHQpkOz4zcmK8YQ0BWDCkOxL+UDKombMYKwfZAkmDGLFhEIsmHCIFpMC0WDSIHOYVEgNkw6pYPIhE5j/QCoYF0g7eEkPYGej+cX82x/l6aIAIOb9CcrajrjFE/IAQGP1IgIRcYVsVs32+vx+nC9nWq6dAZDhOaPHBEDGh54O4w0pa9oxEZBFmCjIBGb6Qh4JMWGiIWpMBkSFyYLMYjIhNUw7N9GQi2aQiLxJHspjV+rl1hFrRp25uV2MRGQRBsAewPUD/HhJVOOuCzwAAAAASUVORK5CYII=");
}

.uni-video-danmu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 14px;
  margin-bottom: 44px;
  font-size: 14px;
  line-height: 14px;
  overflow: visible;
}

.uni-video-danmu-item {
  line-height: 1;
  position: absolute;
  color: #ffffff;
  white-space: nowrap;
  left: 100%;
  transform: translatex(0);
  transition-property: left, transform;
  transition-duration: 3s;
  transition-timing-function: linear;
}

.uni-video-toast {
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000000;
  display: none;
}

.uni-video-toast.uni-video-toast-volume {
  width: 100px;
  height: 100px;
  display: block;
}

.uni-video-toast-volume .uni-video-toast-title {
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin-top: 10px;
  display: block;
}

.uni-video-toast-volume .uni-video-toast-icon {
  fill: #000000;
  width: 50%;
  height: 50%;
  margin-left: 25%;
  display: block;
}

.uni-video-toast-volume .uni-video-toast-value {
  width: 80px;
  height: 5px;
  margin-top: 5px;
  margin-left: 10px;
}

.uni-video-toast-volume
  .uni-video-toast-value
  > .uni-video-toast-value-content {
  overflow: hidden;
}

.uni-video-toast-volume-grids {
  width: 80px;
  height: 5px;
}

.uni-video-toast-volume-grids-item {
  float: left;
  width: 7.1px;
  height: 5px;
  background-color: #000000;
}

.uni-video-toast-volume-grids-item:not(:first-child) {
  margin-left: 1px;
}

.uni-video-toast.uni-video-toast-progress {
  display: block;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 14px;
  line-height: 18px;
  padding: 6px;
}
</style>
