import {
  type ExtractPropTypes,
  type Ref,
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  renderList,
  watch,
  withModifiers,
} from 'vue'
import { isArray } from '@vue/shared'
import { passive } from '@dcloudio/uni-shared'
import { initI18nVideoMsgsOnce, useI18n } from '@dcloudio/uni-core'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  type CustomEventTrigger,
  type EmitEvent,
  UniElement,
  defineBuiltInComponent,
  useAttrs,
  useContextInfo,
  useCustomEvent,
  useSubscribe,
  useUserAction,
} from '@dcloudio/uni-components'

type UserActionState = ReturnType<typeof useUserAction>['state']
type HTMLRef = Ref<HTMLElement | null>

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
  seeking: boolean
  toastThin: boolean
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
    vslideGesture: boolean | string
  },
  videoRef: Ref<HTMLVideoElement | null>,
  fullscreenState: FullscreenState
) {
  const state: GestureState = reactive({
    seeking: false,
    gestureType: 'none',
    volumeOld: 0,
    volumeNew: 0,
    currentTimeOld: 0,
    currentTimeNew: 0,
    toastThin: false,
  })
  const touchStartOrigin = {
    x: 0,
    y: 0,
  }

  let changeToastThinTimer: ReturnType<typeof setTimeout> | null = null
  const changeToastThin = () => {
    if (state.gestureType !== 'none' && changeToastThinTimer != null) return
    changeToastThinTimer = setTimeout(() => {
      state.toastThin = true
    }, 500)
  }
  let showToastTimer: ReturnType<typeof setTimeout> | undefined = undefined
  function changeShowToast() {
    if (showToastTimer != undefined) return
    showToastTimer = setTimeout(() => {
      state.toastThin = false
      showToastTimer = undefined
    }, 1000)
  }
  function clearChangeShowToast() {
    clearTimeout(showToastTimer)
    showToastTimer = undefined
  }

  function onTouchstart(event: TouchEvent) {
    const toucher = event.targetTouches[0]
    touchStartOrigin.x = toucher.pageX
    touchStartOrigin.y = toucher.pageY
    state.gestureType = 'none'
    state.volumeOld = 0
    // state.currentTimeOld = state.currentTimeNew = 0
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
      state.seeking = true
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
      if (!props.pageGesture && !props.vslideGesture) {
        state.gestureType = 'stop'
        return
      }
      changeToastThin()
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
      clearChangeShowToast()
      changeShowToast()
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
  muted: boolean
  pauseUpdatingCurrentTime: boolean
}
function useVideo(props: Props, attrs: Data, trigger: CustomEventTrigger) {
  const videoRef: Ref<HTMLVideoElement | null> = ref(null)
  const src = computed(() => getRealPath(props.src))
  const muted = computed(() => props.muted === 'true' || props.muted === true)
  const state: VideoState = reactive({
    start: false,
    src,
    playing: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    buffered: 0,
    muted,
    pauseUpdatingCurrentTime: false,
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
  watch(
    () => muted.value,
    (muted) => {
      const video = videoRef.value as HTMLVideoElement
      video.muted = muted
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
    if (!state.pauseUpdatingCurrentTime) {
      state.currentTime = video.currentTime
    }
    const currentTime = video.currentTime
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
  function stop() {
    seek(0)
    pause()
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
    stop,
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
  seeking: boolean
  touching: boolean
  controlsTouching: boolean
  centerPlayBtnShow: boolean
  controlsShow: boolean
  controlsVisible: boolean
}
function useControls(
  props: { controls: any; showCenterPlayBtn: any; duration: any },
  videoState: VideoState,
  seek: Function,
  seeking?: (currentTimeNew: number) => void
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
    seeking: false,
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
      seeking?.((videoState.duration * progress) / 100)
      state.seeking = true
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

interface Danmu {
  text: string
  color?: string
  time?: number
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
  stop: Function,
  seek: Function,
  sendDanmu: Function,
  playbackRate: Function,
  requestFullScreen: Function,
  exitFullScreen: Function
) {
  const methods = {
    play,
    stop,
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

function useProgressing(
  videoState: VideoState,
  gestureState: GestureState,
  controlsState: ControlsState,
  autoHideEnd: () => void,
  autoHideStart: () => void
) {
  const progressing = computed(
    () => gestureState.gestureType === 'progress' || controlsState.touching
  )
  watch(progressing, (val) => {
    videoState.pauseUpdatingCurrentTime = val
    controlsState.controlsTouching = val
    if (gestureState.gestureType === 'progress' && val) {
      controlsState.controlsVisible = val
    }
  })
  watch(
    [
      () => videoState.currentTime,
      () => {
        props.duration
      },
    ],
    () => {
      videoState.progress = (videoState.currentTime / videoState.duration) * 100
    }
  )
  watch(
    () => gestureState.currentTimeNew,
    (currentTimeNew) => {
      videoState.currentTime = currentTimeNew
    }
  )

  return progressing
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
  vslideGesture: {
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

type Props = ExtractPropTypes<typeof props>
// 仅作实现，X项目中不会依据此类生成d.ts
export class UniVideoElement extends UniElement {}

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
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-video',
    class: UniVideoElement,
  },
  //#endif
  setup(props, { emit, attrs, slots }) {
    const rootRef: HTMLRef = ref(null)
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
      stop,
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
      autoHideEnd,
      autoHideStart,
    } = useControls(props, videoState, seek, (currentTimeNew) => {
      gestureState.currentTimeNew = currentTimeNew
    })
    useContext(
      play,
      pause,
      stop,
      seek,
      sendDanmu,
      playbackRate,
      requestFullScreen,
      exitFullScreen
    )
    const progressing = useProgressing(
      videoState,
      gestureState,
      controlsState,
      autoHideEnd,
      autoHideStart
    )

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniVideoElement
      Object.assign(rootElement, {
        play,
        pause,
        stop,
        seek,
        sendDanmu,
        playbackRate,
        requestFullScreen,
        exitFullScreen,
      })
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <uni-video ref={rootRef} id={props.id} onClick={toggleControls}>
          <div
            ref={containerRef}
            class="uni-video-container"
            onTouchstart={onTouchstart}
            onTouchend={onTouchend}
            onTouchmove={onTouchmove}
            // @ts-expect-error
            onFullscreenchange={withModifiers(onFullscreenChange, ['stop'])}
            onWebkitfullscreenchange={withModifiers(
              ($event: Event) => onFullscreenChange($event, true),
              ['stop']
            )}
          >
            <video
              ref={videoRef}
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
                    'uni-video-icon': true,
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
                  <div
                    class={{
                      'uni-video-progress': true,
                      'uni-video-progress-progressing': progressing.value,
                    }}
                  >
                    <div
                      style={{
                        width: videoState.buffered - videoState.progress + '%',
                        left: videoState.progress + '%',
                      }}
                      class="uni-video-progress-buffered"
                    />
                    <div
                      style={{ width: videoState.progress + '%' }}
                      class="uni-video-progress-played"
                    />
                    <div
                      ref={ballRef}
                      style={{ left: videoState.progress + '%' }}
                      class={{
                        'uni-video-ball': true,
                        'uni-video-ball-progressing': progressing.value,
                      }}
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
                  'uni-video-icon': true,
                  'uni-video-danmu-button': true,
                  'uni-video-danmu-button-active': danmuState.enable,
                }}
                onClick={withModifiers(toggleDanmu, ['stop'])}
              >
                {/* {t('uni.video.danmu')} */}
              </div>
              <div
                v-show={props.showFullscreenBtn}
                class={{
                  'uni-video-icon': true,
                  'uni-video-fullscreen': true,
                  'uni-video-type-fullscreen': fullscreenState.fullscreen,
                }}
                onClick={withModifiers(
                  () => toggleFullscreen(!fullscreenState.fullscreen),
                  ['stop']
                )}
              ></div>
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
                  class="uni-video-cover-play-button uni-video-icon"
                  onClick={withModifiers(play, ['stop'])}
                />
                {/* <p class="uni-video-cover-duration">
                  {formatTime(Number(props.duration) || videoState.duration)}
                </p> */}
              </div>
            )}
            <div class="uni-video-loading">
              {gestureState.gestureType === 'volume' ? (
                <div
                  class={{
                    'uni-video-toast-container': true,
                    'uni-video-toast-container-thin': gestureState.toastThin,
                  }}
                  style={{ marginTop: `5px` }}
                >
                  {!gestureState.toastThin &&
                  gestureState.volumeNew > 0 &&
                  gestureState.gestureType === 'volume' ? (
                    <text class="uni-video-icon uni-video-toast-icon">
                      {'\uea30'}
                    </text>
                  ) : (
                    !gestureState.toastThin && (
                      <text class="uni-video-icon uni-video-toast-icon">
                        {'\uea31'}
                      </text>
                    )
                  )}
                  <div
                    class="uni-video-toast-draw"
                    style={{
                      width: `${gestureState.volumeNew * 100}%`,
                    }}
                  ></div>
                </div>
              ) : null}
            </div>
            <div
              class={{
                'uni-video-toast': true,
                'uni-video-toast-progress': progressing.value,
              }}
            >
              <div class="uni-video-toast-title">
                <span class="uni-video-toast-title-current-time">
                  {formatTime(gestureState.currentTimeNew)}
                </span>
                {' / '}
                {Number(props.duration) || formatTime(videoState.duration)}
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
