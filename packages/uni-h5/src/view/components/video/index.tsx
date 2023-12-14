import {
  withModifiers,
  Ref,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  renderList,
  onBeforeUnmount,
} from 'vue'
import { isArray } from '@vue/shared'
import { passive } from '@dcloudio/uni-shared'
import { useI18n, initI18nVideoMsgsOnce } from '@dcloudio/uni-core'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  defineBuiltInComponent,
  useContextInfo,
  useSubscribe,
  useCustomEvent,
  EmitEvent,
  CustomEventTrigger,
  useUserAction,
  useAttrs,
} from '@dcloudio/uni-components'

type UserActionState = ReturnType<typeof useUserAction>['state']

function formatTime(val: number): string {
  val = val > 0 && val < Infinity ? val : 0
  const h = Math.floor(val / 3600)
  const m = Math.floor((val % 3600) / 60)
  const s = Math.floor((val % 3600) % 60)
  const hStr = (h < 10 ? '0' : '') + h
  const mStr = (m < 10 ? '0' : '') + m
  const sStr = (s < 10 ? '0' : '') + s
  let str = mStr + ':' + sStr
  if (hStr !== '00') {
    str = hStr + ':' + str
  }
  return str
}
type GestureType = 'none' | 'stop' | 'volume' | 'progress'
interface GestureState {
  gestureType: GestureType
  volumeOld: number
  volumeNew: number
  currentTimeOld: number
  currentTimeNew: number
}
function useGesture(
  props: {
    enableProgressGesture: boolean | string
    pageGesture: boolean | string
  },
  videoRef: Ref<HTMLVideoElement | null>,
  fullscreenState: FullscreenState
) {
  const state: GestureState = reactive({
    gestureType: 'none',
    volumeOld: 0,
    volumeNew: 0,
    currentTimeOld: 0,
    currentTimeNew: 0,
  })
  const touchStartOrigin = {
    x: 0,
    y: 0,
  }
  function onTouchstart(event: TouchEvent) {
    const toucher = event.targetTouches[0]
    touchStartOrigin.x = toucher.pageX
    touchStartOrigin.y = toucher.pageY
    state.gestureType = 'none'
    state.volumeOld = 0
    state.currentTimeOld = state.currentTimeNew = 0
  }
  function onTouchmove(event: TouchEvent) {
    function stop() {
      event.stopPropagation()
      event.preventDefault()
    }
    if (fullscreenState.fullscreen) {
      stop()
    }
    const gestureType = state.gestureType
    if (gestureType === 'stop') {
      return
    }
    const toucher = event.targetTouches[0]
    const pageX = toucher.pageX
    const pageY = toucher.pageY
    const origin = touchStartOrigin
    const video = videoRef.value as HTMLVideoElement
    if (gestureType === 'progress') {
      changeProgress(pageX - origin.x)
    } else if (gestureType === 'volume') {
      changeVolume(pageY - origin.y)
    }
    if (gestureType !== 'none') {
      return
    }
    if (Math.abs(pageX - origin.x) > Math.abs(pageY - origin.y)) {
      if (!props.enableProgressGesture) {
        state.gestureType = 'stop'
        return
      }
      state.gestureType = 'progress'
      state.currentTimeOld = state.currentTimeNew = video.currentTime
      if (!fullscreenState.fullscreen) {
        stop()
      }
    } else {
      if (!props.pageGesture) {
        state.gestureType = 'stop'
        return
      }
      state.gestureType = 'volume'
      state.volumeOld = video.volume
      if (!fullscreenState.fullscreen) {
        stop()
      }
    }
  }
  function onTouchend(event: TouchEvent) {
    const video = videoRef.value as HTMLVideoElement
    if (state.gestureType !== 'none' && state.gestureType !== 'stop') {
      event.stopPropagation()
      event.preventDefault()
    }
    if (
      state.gestureType === 'progress' &&
      state.currentTimeOld !== state.currentTimeNew
    ) {
      video.currentTime = state.currentTimeNew
    }
    state.gestureType = 'none'
  }
  function changeProgress(x: number) {
    const video = videoRef.value as HTMLVideoElement
    const duration = video.duration
    let currentTimeNew = (x / 600) * duration + state.currentTimeOld
    if (currentTimeNew < 0) {
      currentTimeNew = 0
    } else if (currentTimeNew > duration) {
      currentTimeNew = duration
    }
    state.currentTimeNew = currentTimeNew
  }
  function changeVolume(y: number) {
    const video = videoRef.value as HTMLVideoElement
    const valueOld = state.volumeOld
    let value
    if (typeof valueOld === 'number') {
      value = valueOld - y / 200
      if (value < 0) {
        value = 0
      } else if (value > 1) {
        value = 1
      }
      video.volume = value
      state.volumeNew = value
    }
  }
  return {
    state,
    onTouchstart,
    onTouchmove,
    onTouchend,
  }
}
interface FullscreenState {
  fullscreen: boolean
}
interface DocumentExt extends Document {
  webkitFullscreenElement?: any
  webkitFullscreenEnabled?: boolean
  webkitExitFullscreen: Function
}
interface HTMLElementExt extends HTMLElement {
  webkitRequestFullscreen: Function
}
interface HTMLVideoElementExt extends HTMLVideoElement {
  webkitEnterFullScreen?: Function
  webkitExitFullScreen: Function
}
function useFullscreen(
  trigger: CustomEventTrigger,
  containerRef: Ref<HTMLElement | null>,
  videoRef: Ref<HTMLVideoElement | null>,
  userActionState: UserActionState,
  rootRef: Ref<HTMLElement | null>
) {
  const state = reactive({
    fullscreen: false,
  })
  const isSafari = /^Apple/.test(navigator.vendor)
  function onFullscreenChange($event: Event, webkit: boolean) {
    if (webkit && document.fullscreenEnabled) {
      return
    }
    emitFullscreenChange(
      !!(
        document.fullscreenElement ||
        (document as DocumentExt).webkitFullscreenElement
      )
    )
  }
  function emitFullscreenChange(val: boolean) {
    state.fullscreen = val
    trigger('fullscreenchange', {} as Event, {
      fullScreen: val,
      direction: 'vertical',
    })
  }
  function toggleFullscreen(val: boolean) {
    const root = rootRef.value as HTMLElement
    const container = containerRef.value as HTMLElement
    const video = videoRef.value as HTMLVideoElementExt
    let mockFullScreen
    if (val) {
      if (
        (document.fullscreenEnabled ||
          (document as DocumentExt).webkitFullscreenEnabled) &&
        (!isSafari || userActionState.userAction)
      ) {
        ;(container as HTMLElementExt)[
          document.fullscreenEnabled
            ? 'requestFullscreen'
            : 'webkitRequestFullscreen'
        ]()
      } else if (video.webkitEnterFullScreen) {
        video.webkitEnterFullScreen()
      } else {
        mockFullScreen = true
        container.remove()
        container.classList.add('uni-video-type-fullscreen')
        document.body.appendChild(container)
      }
    } else {
      if (
        document.fullscreenEnabled ||
        (document as DocumentExt).webkitFullscreenEnabled
      ) {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else if ((document as DocumentExt).webkitFullscreenElement) {
          ;(document as DocumentExt).webkitExitFullscreen()
        }
      } else if ((video as HTMLVideoElementExt).webkitExitFullScreen) {
        ;(video as HTMLVideoElementExt).webkitExitFullScreen()
      } else {
        mockFullScreen = true
        container.remove()
        container.classList.remove('uni-video-type-fullscreen')
        root.appendChild(container)
      }
    }
    if (mockFullScreen) {
      emitFullscreenChange(val)
    }
  }
  function requestFullScreen() {
    toggleFullscreen(true)
  }
  function exitFullScreen() {
    toggleFullscreen(false)
  }
  onBeforeUnmount(exitFullScreen)
  return {
    state,
    onFullscreenChange,
    emitFullscreenChange,
    toggleFullscreen,
    requestFullScreen,
    exitFullScreen,
  }
}

interface VideoState {
  start: boolean
  src: string
  playing: boolean
  currentTime: number
  duration: number
  progress: number
  buffered: number
}
function useVideo(
  props: { src: string; initialTime: number | string },
  attrs: Data,
  trigger: CustomEventTrigger
) {
  const videoRef: Ref<HTMLVideoElement | null> = ref(null)
  const src = computed(() => getRealPath(props.src))
  const state: VideoState = reactive({
    start: false,
    src,
    playing: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    buffered: 0,
  })
  watch(
    () => src.value,
    () => {
      state.playing = false
      state.currentTime = 0
    }
  )
  watch(
    () => state.buffered,
    (buffered) => {
      trigger('progress', {} as Event, {
        buffered,
      })
    }
  )
  function onDurationChange({ target }: Event) {
    state.duration = (target as HTMLVideoElement).duration
  }
  function onLoadedMetadata($event: Event) {
    const initialTime = Number(props.initialTime) || 0
    const video = $event.target as HTMLVideoElement
    if (initialTime > 0) {
      video.currentTime = initialTime
    }
    trigger('loadedmetadata', $event, {
      width: video.videoWidth,
      height: video.videoHeight,
      duration: video.duration,
    })
    onProgress($event)
  }
  function onProgress($event: Event) {
    const video = $event.target as HTMLVideoElement
    const buffered = video.buffered
    if (buffered.length) {
      state.buffered =
        (buffered.end(buffered.length - 1) / video.duration) * 100
    }
  }
  function onWaiting($event: Event) {
    trigger('waiting', $event, {})
  }
  function onVideoError($event: Event) {
    state.playing = false
    trigger('error', $event, {})
  }
  function onPlay($event: Event) {
    state.start = true
    state.playing = true
    trigger('play', $event, {})
  }
  function onPause($event: Event) {
    state.playing = false
    trigger('pause', $event, {})
  }
  function onEnded($event: Event) {
    state.playing = false
    trigger('ended', $event, {})
  }
  function onTimeUpdate($event: Event) {
    const video = $event.target as HTMLVideoElement
    const currentTime = (state.currentTime = video.currentTime)
    trigger('timeupdate', $event, {
      currentTime,
      duration: video.duration,
    })
  }
  function toggle() {
    const video = videoRef.value as HTMLVideoElement
    if (state.playing) {
      video.pause()
    } else {
      video.play()
    }
  }
  function play() {
    const video = videoRef.value as HTMLVideoElement
    state.start = true
    video.play()
  }
  function pause() {
    const video = videoRef.value as HTMLVideoElement
    video.pause()
  }
  function seek(position: number | string) {
    const video = videoRef.value as HTMLVideoElement
    position = Number(position)
    if (typeof position === 'number' && !isNaN(position)) {
      video.currentTime = position
    }
  }
  function playbackRate(rate: number) {
    const video = videoRef.value as HTMLVideoElement
    video.playbackRate = rate
  }
  return {
    videoRef,
    state,
    play,
    pause,
    seek,
    playbackRate,
    toggle,
    onDurationChange,
    onLoadedMetadata,
    onProgress,
    onWaiting,
    onVideoError,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
  }
}

interface ControlsState {
  touching: boolean
  controlsTouching: boolean
  centerPlayBtnShow: boolean
  controlsShow: boolean
  controlsVisible: boolean
}
function useControls(
  props: { controls: any; showCenterPlayBtn: any; duration: any },
  videoState: VideoState,
  seek: Function
) {
  const progressRef: Ref<HTMLElement | null> = ref(null)
  const ballRef: Ref<HTMLElement | null> = ref(null)
  const centerPlayBtnShow = computed(
    () => props.showCenterPlayBtn && !videoState.start
  )
  const controlsVisible = ref(true)
  const controlsShow = computed(
    () => !centerPlayBtnShow.value && props.controls && controlsVisible.value
  )
  const state: ControlsState = reactive({
    touching: false,
    controlsTouching: false,
    centerPlayBtnShow,
    controlsShow,
    controlsVisible,
  })
  function clickProgress(event: Event) {
    const $progress = progressRef.value as HTMLElement
    let element = event.target as HTMLElement
    let x = (event as MouseEvent).offsetX
    while (element && element !== $progress) {
      x += element.offsetLeft
      element = element.parentNode as HTMLElement
    }
    const w = $progress.offsetWidth
    let progress = 0
    if (x >= 0 && x <= w) {
      progress = x / w
      seek(videoState.duration * progress)
    }
  }
  function toggleControls() {
    state.controlsVisible = !state.controlsVisible
  }
  let hideTiming: ReturnType<typeof setTimeout> | null
  function autoHideStart() {
    hideTiming = setTimeout(() => {
      state.controlsVisible = false
    }, 3000)
  }
  function autoHideEnd() {
    if (hideTiming) {
      clearTimeout(hideTiming)
      hideTiming = null
    }
  }
  onBeforeUnmount(() => {
    if (hideTiming) {
      clearTimeout(hideTiming)
    }
  })
  watch(
    () => state.controlsShow && videoState.playing && !state.controlsTouching,
    (val: boolean) => {
      if (val) {
        autoHideStart()
      } else {
        autoHideEnd()
      }
    }
  )
  watch(
    [
      () => videoState.currentTime,
      () => {
        props.duration
      },
    ],
    function updateProgress() {
      if (!state.touching) {
        videoState.progress =
          (videoState.currentTime / videoState.duration) * 100
      }
    }
  )
  onMounted(() => {
    const passiveOptions = passive(false)
    let originX: number
    let originY: number
    let moveOnce = true
    let originProgress: number
    const ball = ballRef.value as HTMLElement
    function touchmove(event: Event) {
      const toucher = (event as TouchEvent).targetTouches[0]
      const pageX = toucher.pageX
      const pageY = toucher.pageY
      if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
        touchend(event)
        return
      }
      moveOnce = false
      const progressEl = progressRef.value as HTMLElement
      const w = progressEl.offsetWidth
      let progress = originProgress + ((pageX - originX) / w) * 100
      if (progress < 0) {
        progress = 0
      } else if (progress > 100) {
        progress = 100
      }
      videoState.progress = progress
      event.preventDefault()
      event.stopPropagation()
    }
    function touchend(event: Event) {
      state.controlsTouching = false
      if (state.touching) {
        ball.removeEventListener(
          'touchmove',
          touchmove,
          passiveOptions as EventListenerOptions
        )
        if (!moveOnce) {
          event.preventDefault()
          event.stopPropagation()
          seek((videoState.duration * videoState.progress) / 100)
        }
        state.touching = false
      }
    }
    ball.addEventListener('touchstart', (event) => {
      state.controlsTouching = true
      const toucher = event.targetTouches[0]
      originX = toucher.pageX
      originY = toucher.pageY
      originProgress = videoState.progress
      moveOnce = true
      state.touching = true
      ball.addEventListener('touchmove', touchmove, passiveOptions)
    })
    ball.addEventListener('touchend', touchend)
    ball.addEventListener('touchcancel', touchend)
  })
  return {
    state,
    progressRef,
    ballRef,
    clickProgress,
    toggleControls,
    autoHideStart,
    autoHideEnd,
  }
}

function useDanmu(
  props: { enableDanmu: any; danmuList: any[] },
  videoState: VideoState
) {
  const danmuRef: Ref<HTMLElement | null> = ref(null)
  const state = reactive({
    enable: Boolean(props.enableDanmu),
  })
  let danmuIndex = {
    time: 0,
    index: -1,
  }
  interface Danmu {
    text: string
    color?: string
    time?: number
  }
  const danmuList: Danmu[] = isArray(props.danmuList)
    ? JSON.parse(JSON.stringify(props.danmuList))
    : []
  danmuList.sort(function (a: Danmu, b: Danmu) {
    return (a.time || 0) - (b.time || 0)
  })
  function toggleDanmu() {
    state.enable = !state.enable
  }
  function updateDanmu(event: Event) {
    const video = event.target as HTMLVideoElement
    const currentTime = video.currentTime
    const oldDanmuIndex = danmuIndex
    const newDanmuIndex = {
      time: currentTime,
      index: oldDanmuIndex.index,
    }
    if (currentTime > oldDanmuIndex.time) {
      for (
        let index = oldDanmuIndex.index + 1;
        index < danmuList.length;
        index++
      ) {
        const element = danmuList[index]
        if (currentTime >= (element.time || 0)) {
          newDanmuIndex.index = index
          if (videoState.playing && state.enable) {
            playDanmu(element)
          }
        } else {
          break
        }
      }
    } else if (currentTime < oldDanmuIndex.time) {
      for (let index = oldDanmuIndex.index - 1; index > -1; index--) {
        const element = danmuList[index]
        if (currentTime <= (element.time || 0)) {
          newDanmuIndex.index = index - 1
        } else {
          break
        }
      }
    }
    danmuIndex = newDanmuIndex
  }
  function playDanmu(danmu: Danmu) {
    const p = document.createElement('p')
    p.className = 'uni-video-danmu-item'
    p.innerText = danmu.text
    let style = `bottom: ${Math.random() * 100}%;color: ${danmu.color};`
    p.setAttribute('style', style)
    const danmuEl = danmuRef.value as HTMLElement
    danmuEl.appendChild(p)
    setTimeout(function () {
      style +=
        'left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);'
      p.setAttribute('style', style)
      setTimeout(function () {
        p.remove()
      }, 4000)
    }, 17)
  }
  function sendDanmu(danmu: Danmu) {
    danmuList.splice(danmuIndex.index + 1, 0, {
      text: String(danmu.text),
      color: danmu.color,
      time: videoState.currentTime || 0,
    })
  }
  return {
    state,
    danmuRef,
    updateDanmu,
    toggleDanmu,
    sendDanmu,
  }
}

function useContext(
  play: Function,
  pause: Function,
  seek: Function,
  sendDanmu: Function,
  playbackRate: Function,
  requestFullScreen: Function,
  exitFullScreen: Function
) {
  const methods = {
    play,
    pause,
    seek,
    sendDanmu,
    playbackRate,
    requestFullScreen,
    exitFullScreen,
  }
  const id = useContextInfo()
  useSubscribe(
    (type: string, data: any) => {
      let options
      switch (type) {
        case 'seek':
          options = data.position
          break
        case 'sendDanmu':
          options = data
          break
        case 'playbackRate':
          options = data.rate
          break
      }
      if (type in methods) {
        methods[type as keyof typeof methods](options)
      }
    },
    id,
    true
  )
}

const props = {
  id: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  duration: {
    type: [Number, String],
    default: '',
  },
  controls: {
    type: [Boolean, String],
    default: true,
  },
  danmuList: {
    type: Array,
    default() {
      return []
    },
  },
  danmuBtn: {
    type: [Boolean, String],
    default: false,
  },
  enableDanmu: {
    type: [Boolean, String],
    default: false,
  },
  autoplay: {
    type: [Boolean, String],
    default: false,
  },
  loop: {
    type: [Boolean, String],
    default: false,
  },
  muted: {
    type: [Boolean, String],
    default: false,
  },
  objectFit: {
    type: String,
    default: 'contain',
  },
  poster: {
    type: String,
    default: '',
  },
  direction: {
    type: [String, Number],
    default: '',
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
  initialTime: {
    type: [String, Number],
    default: 0,
  },
  showFullscreenBtn: {
    type: [Boolean, String],
    default: true,
  },
  pageGesture: {
    type: [Boolean, String],
    default: false,
  },
  enableProgressGesture: {
    type: [Boolean, String],
    default: true,
  },
  showPlayBtn: {
    type: [Boolean, String],
    default: true,
  },
  showCenterPlayBtn: {
    type: [Boolean, String],
    default: true,
  },
}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Video',
  props,
  emits: [
    'fullscreenchange',
    'progress',
    'loadedmetadata',
    'waiting',
    'error',
    'play',
    'pause',
    'ended',
    'timeupdate',
  ],
  setup(props, { emit, attrs, slots }) {
    const rootRef = ref(null)
    const containerRef = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const { state: userActionState } = useUserAction()
    const { $attrs: videoAttrs } = useAttrs({
      excludeListeners: true,
    })
    const { t } = useI18n()
    initI18nVideoMsgsOnce()
    const {
      videoRef,
      state: videoState,
      play,
      pause,
      seek,
      playbackRate,
      toggle,
      onDurationChange,
      onLoadedMetadata,
      onProgress,
      onWaiting,
      onVideoError,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
    } = useVideo(props, attrs, trigger)
    const {
      state: danmuState,
      danmuRef,
      updateDanmu,
      toggleDanmu,
      sendDanmu,
    } = useDanmu(props, videoState)
    const {
      state: fullscreenState,
      onFullscreenChange,
      emitFullscreenChange,
      toggleFullscreen,
      requestFullScreen,
      exitFullScreen,
    } = useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef)
    const {
      state: gestureState,
      onTouchstart,
      onTouchend,
      onTouchmove,
    } = useGesture(props, videoRef, fullscreenState)
    const {
      state: controlsState,
      progressRef,
      ballRef,
      clickProgress,
      toggleControls,
    } = useControls(props, videoState, seek)
    useContext(
      play,
      pause,
      seek,
      sendDanmu,
      playbackRate,
      requestFullScreen,
      exitFullScreen
    )

    return () => {
      return (
        <uni-video ref={rootRef} id={props.id}>
          <div
            ref={containerRef}
            class="uni-video-container"
            onTouchstart={onTouchstart}
            onTouchend={onTouchend}
            onTouchmove={onTouchmove}
            // @ts-ignore
            onFullscreenchange={withModifiers(onFullscreenChange, ['stop'])}
            onWebkitfullscreenchange={withModifiers(
              ($event: Event) => onFullscreenChange($event, true),
              ['stop']
            )}
          >
            <video
              ref={videoRef}
              // @ts-ignore
              style={{ 'object-fit': props.objectFit }}
              muted={!!props.muted}
              loop={!!props.loop}
              src={videoState.src}
              poster={props.poster}
              autoplay={!!props.autoplay}
              {...videoAttrs.value}
              class="uni-video-video"
              webkit-playsinline
              playsinline
              onClick={toggleControls}
              onDurationchange={onDurationChange}
              onLoadedmetadata={onLoadedMetadata}
              onProgress={onProgress}
              onWaiting={onWaiting}
              onError={onVideoError}
              onPlay={onPlay}
              onPause={onPause}
              onEnded={onEnded}
              onTimeupdate={(event) => {
                onTimeUpdate(event)
                updateDanmu(event)
              }}
              onWebkitbeginfullscreen={() => emitFullscreenChange(true)}
              onX5videoenterfullscreen={() => emitFullscreenChange(true)}
              onWebkitendfullscreen={() => emitFullscreenChange(false)}
              onX5videoexitfullscreen={() => emitFullscreenChange(false)}
            />
            <div
              v-show={controlsState.controlsShow}
              class="uni-video-bar uni-video-bar-full"
              onClick={withModifiers(() => {}, ['stop'])}
            >
              <div class="uni-video-controls">
                <div
                  v-show={props.showPlayBtn}
                  class={{
                    'uni-video-control-button': true,
                    'uni-video-control-button-play': !videoState.playing,
                    'uni-video-control-button-pause': videoState.playing,
                  }}
                  onClick={withModifiers(toggle, ['stop'])}
                />
                <div class="uni-video-current-time" v-show={props.showProgress}>
                  {formatTime(videoState.currentTime)}
                </div>
                <div
                  ref={progressRef}
                  class="uni-video-progress-container"
                  onClick={withModifiers(clickProgress, ['stop'])}
                  v-show={props.showProgress}
                >
                  <div class="uni-video-progress">
                    <div
                      style={{ width: videoState.buffered + '%' }}
                      class="uni-video-progress-buffered"
                    />
                    <div
                      ref={ballRef}
                      style={{ left: videoState.progress + '%' }}
                      class="uni-video-ball"
                    >
                      <div class="uni-video-inner" />
                    </div>
                  </div>
                </div>
                <div class="uni-video-duration" v-show={props.showProgress}>
                  {formatTime(Number(props.duration) || videoState.duration)}
                </div>
              </div>
              <div
                v-show={props.danmuBtn}
                class={{
                  'uni-video-danmu-button': true,
                  'uni-video-danmu-button-active': danmuState.enable,
                }}
                onClick={withModifiers(toggleDanmu, ['stop'])}
              >
                {t('uni.video.danmu')}
              </div>
              <div
                v-show={props.showFullscreenBtn}
                class={{
                  'uni-video-fullscreen': true,
                  'uni-video-type-fullscreen': fullscreenState.fullscreen,
                }}
                onClick={withModifiers(
                  () => toggleFullscreen(!fullscreenState.fullscreen),
                  ['stop']
                )}
              />
            </div>
            <div
              v-show={videoState.start && danmuState.enable}
              ref={danmuRef}
              style="z-index: 0;"
              class="uni-video-danmu"
            />
            {controlsState.centerPlayBtnShow && (
              <div
                class="uni-video-cover"
                onClick={withModifiers(() => {}, ['stop'])}
              >
                <div
                  class="uni-video-cover-play-button"
                  onClick={withModifiers(play, ['stop'])}
                />
                <p class="uni-video-cover-duration">
                  {formatTime(Number(props.duration) || videoState.duration)}
                </p>
              </div>
            )}
            <div
              class={{
                'uni-video-toast': true,
                'uni-video-toast-volume': gestureState.gestureType === 'volume',
              }}
            >
              <div class="uni-video-toast-title">{t('uni.video.volume')}</div>
              <svg
                class="uni-video-toast-icon"
                width="200px"
                height="200px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z" />
              </svg>
              <div class="uni-video-toast-value">
                <div
                  style={{ width: gestureState.volumeNew * 100 + '%' }}
                  class="uni-video-toast-value-content"
                >
                  <div class="uni-video-toast-volume-grids">
                    {renderList(10, () => (
                      <div class="uni-video-toast-volume-grids-item" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              class={{
                'uni-video-toast': true,
                'uni-video-toast-progress':
                  gestureState.gestureType === 'progress',
              }}
            >
              <div class="uni-video-toast-title">
                {formatTime(gestureState.currentTimeNew)}
                {' / '}
                {formatTime(videoState.duration)}
              </div>
            </div>
            <div class="uni-video-slots">
              {slots.default && slots.default()}
            </div>
          </div>
        </uni-video>
      )
    }
  },
})
