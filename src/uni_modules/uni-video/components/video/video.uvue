<template>
  <!-- #ifndef APP-HARMONY && VUE3-VAPOR -->
  <uni-video-element
  <!-- #endif -->
  <!-- #ifdef APP-HARMONY && VUE3-VAPOR -->
  <view
  <!-- #endif -->
    class="uni-video" ref="rootRef" @click="useControlsReturn.toggleControls" @fullscreenchange="useFullScreenReturn.fullscreenchange">
    <view
      class="uni-video-container"
      ref="containerRef"
      @click="useGestureReturn.onClick"
      @touchstart="useGestureReturn.onTouchstart"
      @touchmove="useGestureReturn.onTouchmove"
      @touchend="useGestureReturn.onTouchend"
      @touchcancel="useGestureReturn.onTouchend"
    >
      <view class="uni-video-loading" style="justify-content: center;align-items: center;" v-if="props.showLoading && videoState.start && videoState.loading">
        <loading style="width: 54px; height: 54px; border-color: #d3d3d3" />
      </view>

      <native-view class="native-view-video" @init="onInit"></native-view>
      <!-- #ifdef APP-HARMONY && !VUE3-VAPOR -->
      <volume-panel v-if="inited" :volume-level="volumeState.currentVolumeLevel" :position-x="volumeState.positionX"></volume-panel>
      <!-- #endif -->

      <!-- #ifdef APP-HARMONY && !VUE3-VAPOR -->
      <view v-show="videoState.start && danmuState.enable" ref="danmuRef" class="uni-video-danmu"></view>
      <!-- #endif -->

      <!-- #ifdef APP-HARMONY && VUE3-VAPOR -->
      <Danmaku v-if="videoState.start && danmuState.enable" ref="danmakuRef"/>
      <!-- #endif -->

      <view v-if="fullscreenState.fullscreen && useControlsReturn.controlsShow.value" class="uni-video-bar_outside uni-video-title-bar_outside" @click="eventWrapper">
        <view class="uni-video-bar_container">
          <view class="uni-video-bar">
            <!-- 返回按钮 -->
            <view class="uni-video-volume-button" @click="() => useFullScreenReturn.exitFullscreen()">
              <text class="uni-icon uni-video-back-button-icon">
                {{ ICON_BACK }}
              </text>
            </view>
            <view class="uni-video-title-view">
              <text class="uni-video-title">
                {{ title }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="useControlsReturn.controlsShow.value" :class="{ 'uni-video-bar_outside': true, 'uni-video-fullscreen-bar_outside': fullscreenState.fullscreen }" @click="eventWrapper">
        <view class="uni-video-bar_container" v-if="props.showPlayBtn || props.showProgress || props.showMuteBtn || props.danmuBtn || props.showFullscreenBtn">
          <view :class="{ 'uni-video-bar': true, 'uni-video-bar_fullscreen': fullscreenState.fullscreen }">
            <view class="uni-video-controls" @click="(event : UniPointerEvent) => eventWrapper(event, useControlsReturn.controlsClick)">
              <!-- 播放按钮 -->
              <view v-if="props.showPlayBtn && !videoState.isError" class="uni-video-control-button" @click="useVideoReturn.toggle">
                <text class="uni-video-icon uni-video-control-button-icon">
                  {{ !videoState.playing ? ICON_PLAY : ICON_PAUSH }}
                </text>
              </view>

              <view v-if="props.showProgress" class="uni-video-current-time">
                <text class="uni-video-current-time-text">
                  {{ formatTime(videoState.currentTime) }}
                </text>
              </view>
              <!-- 播放 进度条 -->
              <view v-if="props.showProgress" class="uni-video-progress-container" ref="progressRef" @click="useControlsReturn.clickProgress">
                <view
                  ref="progressBarRef"
                  :class="{
                    'uni-video-progress': true,
                    'uni-video-progress-progressing': progressing
                  }"
                >
                  <view flatten class="uni-video-progress-bar-container">
                    <view flatten class="uni-video-progress-buffered" />
                    <view flatten ref="playedRef" class="uni-video-progress-played" :style="{ 'transform': `scaleX(${videoState.progress / 100})` }"/>
                  </view>
                  <view class="uni-video-ball-container" :style="{ 'transform': `translateX(${videoState.progress}%)` }">
                    <view
                      :class="{
                        'uni-video-ball': true,
                        'uni-video-ball-progressing': progressing
                      }"
                      @touchstart="useControlsReturn.onBallTouchstart"
                      @touchmove="useControlsReturn.onBallTouchmove"
                      @touchend="useControlsReturn.onBallTouchend"
                      @touchcancel="useControlsReturn.onBallTouchend"
                    >
                      <view
                        :class="{
                          'uni-video-inner': true,
                          'uni-video-ball-progressing': progressing
                        }"
                      />
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="props.showProgress" class="uni-video-duration">
                <text class="uni-video-current-time-text">
                  {{ formatTime(videoState.currentDuration) }}
                </text>
              </view>
            </view>

            <!-- 静音按钮 -->
            <view v-if="props.showMuteBtn" class="uni-video-volume-button" @click="() => useVideoReturn.mute(!useVideoReturn.muted.value)">
              <text class="uni-video-icon uni-video-volume-button-icon">
                {{ useVideoReturn.muted.value ? ICON_VOLUME_MUTE : ICON_VOLUME }}
              </text>
            </view>
            <!-- 弹幕按钮 -->
            <view v-if="props.danmuBtn" class="uni-video-danmu-button" @click="useDanmuReturn.toggleDanmu">
              <text class="uni-video-icon uni-video-danmu-button-icon">
                {{ danmuState.enable ? ICON_DANMU_ACTIVE : ICON_DANMU }}
              </text>
            </view>
            <!-- 全屏按钮 -->
            <view v-if="props.showFullscreenBtn" class="uni-video-fullscreen-btn" @click="() => useFullScreenReturn.toggleFullscreen(!fullscreenState.fullscreen)">
              <text class="uni-video-icon uni-video-fullscreen-icon">
                {{ !fullscreenState.fullscreen ? ICON_FULLSCREEN : ICON_FULLSCREEN_CLOSE }}
              </text>
            </view>
          </view>
        </view>
        <slot name="controls"></slot>
      </view>

      <view v-if="useControlsReturn.centerPlayBtnShow.value" class="uni-video-cover" @click="eventWrapper">
        <text class="uni-video-icon uni-video-cover-play-button" @click="($event : UniPointerEvent) => eventWrapper($event, useVideoReturn.play)">
          {{ ICON_PLAY }}
        </text>
      </view>

      <view v-if="gestureState.gestureType !== 'none' || volumeState.showToast" class="uni-video-loading" @click="eventWrapper">
        <view
          v-if="gestureState.gestureType === 'brightness'"
          :class="{
            'uni-video-toast-container': true,
            'uni-video-toast-container-thin': gestureState.toastThin
          }"
          :style="{ marginTop: `${safeTop + 5}px` }"
        >
          <text v-show="!gestureState.toastThin" class="uni-video-icon uni-video-toast-icon">{{ ICON_BRIGHTNESS }}</text>
          <view class="uni-video-toast-draw" :style="{ width: `${gestureState.brightnessNew * 100}%` }"></view>
        </view>

        <view
          v-if="(volumeState.showToast || gestureState.gestureType === 'volume') && fullscreenState.fullscreen"
          :class="{
            'uni-video-toast-container': true,
            'uni-video-toast-container-thin': gestureState.toastThin
          }"
          :style="{ marginTop: `${safeTop + 5}px` }"
        >
          <text
            v-if="!gestureState.toastThin && volumeState.currentVolumeLevel > 0 && (volumeState.showToast || gestureState.gestureType === 'volume')"
            class="uni-video-icon uni-video-toast-icon"
          >
            {{ ICON_VOLUME }}
          </text>
          <text v-else-if="!gestureState.toastThin" class="uni-video-icon uni-video-toast-icon">{{ ICON_VOLUME_MUTE }}</text>
          <view class="uni-video-toast-draw" :style="{ width: `${(volumeState.currentVolumeLevel / volumeState.maxVolume) * 100}%` }"></view>
        </view>
      </view>

      <view
        v-if="progressing"
        :class="{
          'uni-video-toast': true,
          'uni-video-toast-progress': progressing
        }"
      >
        <view class="uni-video-toast-title">
          <text class="uni-video-toast-title-current-time uni-video-toast-title-text">{{ formatTime(gestureState.currentTimeNew) }}</text>
          <text class="uni-video-toast-title-text">/ {{ formatTime(videoState.currentDuration) }}</text>
        </view>
      </view>

      <view class="uni-video-slots">
        <slot></slot>
      </view>
    </view>
  <!-- #ifdef APP-HARMONY && VUE3-VAPOR -->
  </view>
  <!-- #endif -->
  <!-- #ifndef APP-HARMONY && VUE3-VAPOR -->
  </uni-video-element>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { formatTime } from './utils.uts';
  import {
    UniVideoTimeUpdateEvent,
    UniVideoFullScreenChangeEvent,
    UniVideoControlsToggleEvent,
    UniVideoFullScreenClickEvent,
    UniVideoProgressEvent,
    UniVideoEvent,
    UniVideoErrorEvent,
    UniWebViewErrorEventDetail
  } from './global.uts';
  // #ifdef APP-HARMONY && VUE3-VAPOR
  import Danmaku from './danmaku.uvue';
  import { DanmakuTask, DanmakuType } from './danmakuTypes.uts'
  import { AVVolumePanelOptions } from '@/uni_modules/uni-video';
  import { UniVideoRecycleEvent, UniVideoRecycleEventDetail, UniVideoReuseEvent, UniVideoReuseEventDetail } from './global.uts'
  // #endif
  import { Video, ObjectFit, Danmu, BuilderVideoOptions, BuilderVideoParams, AudioManager, Brightness, UniVideoElement, RequestFullScreenOptions } from '@/uni_modules/uni-video';

  // #ifdef APP-HARMONY && VUE3-VAPOR
  type RecycleStateInCom = {
    isPlayed: boolean,
    /**
     * 回收时是否处于播放状态。回收时暂停状态此值为false
     */
    isPlaying: boolean
    /**
     * 回收时播放视频的进度
     */
    currentTime: number
    /**
     * 回收时播放视频的总时长
     */
    duration: number

    currentDuration: number;
    progress: number;
    buffered: number;
    pauseUpdatingCurrentTime: boolean;
    loading: boolean;
    prepared: boolean;
    isError: boolean;
  }
  const recycleState = useRecycleState<RecycleStateInCom>(() => {
    return {
      isPlayed: false,
      currentTime: 0,
      duration: 0,
      isPlaying: false,

      currentDuration: 0, // UI展示时长（优先取 props.duration）
      progress: 0,
      buffered: 0,
      pauseUpdatingCurrentTime: false,
      loading: true,
      prepared: false,
      isError: false
    }
  })
  // #endif

  function eventWrapper(event: UniPointerEvent, fn?: (event?: UniPointerEvent) => void) {
    fn?.(event);
    event.stopPropagation();
  }

  const ICON_BACK = '\uE601';
  const ICON_PLAY = '\uea24';
  const ICON_PAUSH = '\uea25';
  const ICON_DANMU = '\uea26';
  const ICON_DANMU_ACTIVE = '\uea27';
  const ICON_FULLSCREEN_CLOSE = '\uea28';
  const ICON_FULLSCREEN = '\uea29';
  const ICON_VOLUME = '\uea30';
  const ICON_VOLUME_MUTE = '\uea31';
  const ICON_BRIGHTNESS = '\uea32';

  // #ifndef APP-IOS
  defineOptions({
    name: 'video',
    // @ts-ignore
    rootElement: {
      name: 'uni-video-element',
      class: UniVideoElement
    }
  });
  // #endif

  const emit = defineEmits<{
    play: [event: UniEvent];
    pause: [event: UniEvent];
    ended: [event: UniEvent];
    waiting: [event: UniEvent];
    timeupdate: [event: UniVideoTimeUpdateEvent];
    fullscreenchange: [event: UniVideoFullScreenChangeEvent];
    error: [event: UniVideoErrorEvent];
    progress: [event: UniVideoProgressEvent];
    fullscreenclick: [event: UniVideoFullScreenClickEvent];
    controlstoggle: [event: UniVideoControlsToggleEvent];
    // #ifdef APP-HARMONY && VUE3-VAPOR
    /**
     * 组件回收时的生命周期钩子
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    recycle: [event: UniVideoRecycleEvent];
    /**
     * 组件复用时的生命周期钩子
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    reuse: [event: UniVideoReuseEvent];
    // #endif
  }>();

  const props = withDefaults(defineProps<{
    /**
     * 视频资源地址
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    src: string;
    /**
     * 指定视频长度
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    duration?: number;
    /**
     * 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    controls?: boolean;
    /**
     * 弹幕列表
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    danmuList?: Array<Danmu>;
    /**
     * 是否显示弹幕按钮，只在初始化时有效，不能动态变更
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    danmuBtn?: boolean;
    /**
     * 是否展示弹幕，只在初始化时有效，不能动态变更
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    enableDanmu?: boolean;
    /**
     * 是否自动播放
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    autoplay?: boolean;
    /**
     * 是否循环播放
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    loop?: boolean;
    /**
     * 是否静音播放
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    muted?: boolean;
    /**
     * 当视频大小与 video 容器大小不一致时，视频的表现形式。
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    objectFit: any;
    /**
     * 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    poster?: string;
    /**
     * 设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    direction?: 0 | 90 | -90;
    /**
     * 是否显示进度条
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    showProgress?: boolean;
    /**
     * 指定视频初始播放位置
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    initialTime?: number;
    /**
     * 是否显示全屏按钮
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    showFullscreenBtn?: boolean;
    /**
     * 在非全屏模式下，是否开启亮度与音量调节手势
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    pageGesture?: boolean;
    /**
     * 在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    vslideGesture?: boolean;
    /**
     * 在全屏模式下，是否开启亮度与音量调节手势
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    vslideGestureInFullscreen?: boolean;
    /**
     * 是否开启播放手势，即双击切换播放、暂停
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    enableProgressGesture?: boolean;
    /**
     * 是否显示视频底部控制栏的播放按钮
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    showPlayBtn?: boolean;
    /**
     * 是否显示视频中间的播放按钮
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    showCenterPlayBtn?: boolean;
    /**
     * 是否显示loading控件
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    showLoading?: boolean;
    /**
     * 是否显示静音按钮
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    showMuteBtn?: boolean;
    /**
     * 是否开启播放手势，即双击切换播放、暂停
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    enablePlayGesture?: boolean;
    /**
     * 视频的标题，全屏时在顶部展示
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    title?: string;
  }>(), {
    controls: true,
    autoplay: false,
    muted: false,
    objectFit: 'contain',
    loop: false,
    showProgress: true,
    showFullscreenBtn: true,
    danmuBtn: false,
    danmuList: [],
    initialTime: 0,
    enableProgressGesture: true,
    showPlayBtn: true,
    showCenterPlayBtn: true,
    showMuteBtn: false,
    enablePlayGesture: false,
    pageGesture: false,
    vslideGesture: false,
    vslideGestureInFullscreen: true,
    direction: 90,
    showLoading: true,
    enableDanmu: false
  });

  let brightness = new Brightness();
  let video: Video | null = null;
  const rootRef = ref<UniElement | null>(null);
  const containerRef = ref<UniElement | null>(null);

  const progressRef = ref<UniElement | null>(null); // 进度条 + 时间
  const progressBarRef = ref<UniElement | null>(null); // 进度条
  const playedRef = ref<UniElement | null>(null);

  const windowInfo = uni.getWindowInfo();
  const danmuRef = ref<UniElement | null>(null);
  const danmakuRef = ref<ComponentPublicInstance | null>(null);

  const safeTop = ref<number>(0);

  const options: BuilderVideoOptions = {
    src: props.src,
    previewUri: props.poster
  };

  const instance = getCurrentInstance();
  const eventSeed = instance?.uid ?? Date.now();

  let gestureState : GestureState | null = null;
  let useGestureReturn : UseGestureReturn | null = null;

  // #region useVideo
  type VideoState = {
    start: boolean;
    src: string;
    playing: boolean;
    currentTime: number;
    duration: number;
    currentDuration: number;
    progress: number;
    buffered: number;
    pauseUpdatingCurrentTime: boolean;
    loading: boolean;
    prepared: boolean;
    isError: boolean;
  }
  type UseVideoReturn = {
    state: VideoState;
    muted: Ref<boolean>;
    play: (event?: UniPointerEvent) => void;
    pause: (event?: UniPointerEvent) => void;
    toggle: (event?: UniPointerEvent) => void;
    stop: (event?: UniPointerEvent) => void;
    seek: (value: number) => void;
    playbackRate: (rate: number) => void;
    mute: (muted: boolean) => void;
  }
  function useVideo(): UseVideoReturn {
    const muted = ref<boolean>(false);
    // @ts-ignore
    const state = reactive<VideoState>({
      start: false,
      src: props.src,
      playing: false,
      currentTime: 0,
      duration: 0, // 视频文件的实际物理时长
      currentDuration: 0, // UI展示时长（优先取 props.duration）
      progress: 0,
      buffered: 0,
      pauseUpdatingCurrentTime: false,
      loading: true,
      prepared: false,
      isError: false
    });
    const play = (event ?: UniPointerEvent) => {
      if (!state.prepared) {
        state.loading = !state.isError;
      }
      state.start = true;
      video?.play();
    };
    const pause = (event ?: UniPointerEvent) => {
      video?.pause();
    };
    const toggle = (event ?: UniPointerEvent) => {
      if (state.playing) {
        pause(event);
      } else {
        play(event);
      }
    }
    const seek = (position: number) => {
      if (!isNaN(position)) {
        video?.seek(position);
      }
    }
    const stop = (event ?: UniPointerEvent) => {
      video?.stop();
    }
    const playbackRate = (rate: number) => {
      if (video != null) video!.playbackRate = rate;
    }
    const mute = (_muted: boolean) => {
      muted.value = _muted;
      if (video != null) video!.muted = _muted;
    }
    onMounted(() => {
      nextTick(() => {
        watchEffect(() => {
          muted.value = props.muted === true;
        });

        watch(
          () : string => props.src,
          (src: string) => {
            state.start = false;
            state.prepared = false;
            state.playing = false;
            state.loading = true;
            state.isError = false;
            state.currentTime = 0;
            state.duration = 0;
            state.progress = 0;
            state.buffered = 0;

            if (video != null) { video!.src = src; }
          }
        );
        watch(
          () : number => state.buffered,
          (buffered : number) => {
            // TODO buffered 鸿蒙不支持
            /* trigger('progress', {} as Event, {
            buffered,
          }) */
          }
        );
        watch(
          () : boolean => props.muted,
          (muted: boolean) => {
            mute(muted);
          }
        );
        watch(
          () : string | null => props.poster,
          (poster: string) => {
            if (video != null) { video!.poster = poster; }
          }
        );
        watch(
          () : ObjectFit => props.objectFit as ObjectFit,
          (objectFit: ObjectFit) => {
            if (video != null) { video!.objectFit = objectFit; }
          }
        );
        watch(
          () : boolean => props.autoplay,
          (autoplay: boolean) => {
            if (video != null) { video!.autoplay = autoplay; }
          }
        );
        watch(
          () : boolean => props.loop,
          (loop: boolean) => {
            if (video != null) { video!.loop = loop; }
          }
        );
        watch([() => state.duration, () => props.duration], () => {
          state.currentDuration = ((props.duration ?? 0) > 0) ? (props.duration ?? 0) : state.duration
        }, { immediate: true})
      })
    })
    return {
      state,
      play,
      pause,
      toggle,
      stop,
      seek,
      playbackRate,
      mute,
      muted
    };
  }
  const useVideoReturn = useVideo();
  const videoState = useVideoReturn.state;
  // #endregion useVideo

  // #region useFullscreen
  type FullscreenState = {
    fullscreen: boolean;
  }
  type UseFullscreenReturn = {
    state: FullscreenState;
    requestFullscreen: (options?: RequestFullScreenOptions | null) => void;
    exitFullscreen: () => void;
    toggleFullscreen: (fullscreen : boolean) => void;
    fullscreenchange: (event: UniEvent) => void;
  }
  function useFullscreen(): UseFullscreenReturn {
    const pages = getCurrentPages();
    let page = pages[pages.length - 1];
    const state = reactive<FullscreenState>({
      fullscreen: false
    });
    const requestFullscreen = (options ?: RequestFullScreenOptions | null) => {
      video?.requestFullscreen(options);
    }
    const exitFullscreen = () => {
      video?.exitFullscreen();
    }
    const toggleFullscreen = (fullscreen : boolean) => {
      if (state.fullscreen) {
        exitFullscreen();
      } else {
        requestFullscreen(null);
      }
    }
    onBeforeUnmount(exitFullscreen);
    onMounted(() => {
      nextTick(() => {
        let uniPage = rootRef.value?.uniPage
        // #ifdef APP-HARMONY && VUE3-VAPOR
        // dom2 上没有 uniPage、getPage()
        if (!uniPage) {
          uniPage = rootRef.value?.page
        }
        // #endif
        if (uniPage != null && page !== uniPage) {
          page = uniPage;
        }
      })
    });
    const fullscreenchange = (event: UniEvent) => {
      setTimeout(() => {
        containerRef.value?.getBoundingClientRectAsync()?.then((rect) => {
          // #ifdef APP-HARMONY && VUE3-VAPOR
          danmakuRef.value?.resize?.()
          // #endif
          gestureState!.containerRect.height = rect.height;
          gestureState!.containerRect.width = rect.width;
          gestureState!.containerRect.x = rect.x;
          gestureState!.containerRect.y = rect.y;

          // @ts-ignore
          state.fullscreen = page?.fullscreenElement != null;
          const isVertical = rect.height > rect.width;

          if (state.fullscreen && isVertical) {
            safeTop.value = windowInfo.statusBarHeight;
          } else {
            safeTop.value = 0;
          }

          emit('fullscreenchange', new UniVideoFullScreenChangeEvent(rootRef.value!, state.fullscreen, isVertical ? 'vertical' : 'horizontal'));
        });
      }, 500);
    }
    return {
      state,
      requestFullscreen,
      exitFullscreen,
      toggleFullscreen,
      fullscreenchange
    };
  }
  const useFullScreenReturn = useFullscreen();
  const fullscreenState = useFullScreenReturn.state;
  // #endregion useFullscreen

  // #region useVolume
  type UseVolumeReturn = {
    state: VolumeState;
    updateVolume(nextVolume: number): void;
    clearChangeShowToast(): void;
  }
  type VolumeState = {
    minVolume: number;
    maxVolume: number;
    currentVolumeLevel: number;
    showToast: boolean;
    positionX: number | null;
  }
  function useVolume(): UseVolumeReturn {
    const state = reactive<VolumeState>({
      minVolume: 0,
      maxVolume: 0,
      currentVolumeLevel: 0,
      showToast: false,
      positionX: null
    });

    let showToastTimer: number | null = null;
    function changeShowToast() {
      if (showToastTimer != null) return;
      showToastTimer = setTimeout(() => {
        state.showToast = false;
        gestureState!.toastThin = false;
        showToastTimer = null;
      }, 1000);
    }
    const clearChangeShowToast = () => {
      const timer = showToastTimer
      if (timer == null) return;
      clearTimeout(timer);
      showToastTimer = null;
    }
    function useShowToast() {
      state.showToast = true;
      clearChangeShowToast();
      changeShowToast();
      useGestureReturn!.changeToastThin();
    }

    const audioManager : AudioManager= new AudioManager((volume) => {
      if (gestureState!.gestureType === 'volume') return;
      useShowToast();
      state.currentVolumeLevel = volume;
    });
    state.minVolume = audioManager.minVolume;
    state.maxVolume = audioManager.maxVolume;
    state.currentVolumeLevel = audioManager.currentVolume;

    watchEffect(() => {
      const isFullscreen = fullscreenState.fullscreen;
      if (isFullscreen) {
        state.positionX = -100;
      } else {
        state.positionX = null;
      }
    });
    onBeforeUnmount(() => {
      audioManager?.offVolumeChange();
      state.positionX = null;
    });
    const updateVolume = (nextVolume: number) => {
      if (nextVolume > state.maxVolume) {
        nextVolume = state.maxVolume;
      }
      if (nextVolume < state.minVolume) {
        nextVolume = state.minVolume;
      }
      useShowToast();
      state.currentVolumeLevel = nextVolume;
      // #ifdef APP-HARMONY && VUE3-VAPOR
      video?.setVolume({
        volumeLevel: nextVolume,
        positionX: state.positionX
      } as AVVolumePanelOptions)
      // #endif
    }

    return {
      state,
      updateVolume,
      clearChangeShowToast
    } as UseVolumeReturn;
  }
  const useVolumeReturn = useVolume();
  const volumeState = useVolumeReturn.state;
  // #endregion useVolume

  // #region useDoubleClick
  type UseDoubleClickReturn = {
    onClick: (event: UniPointerEvent) => void;
    TIME_MAX: number;
  }
  function useDoubleClick(doubleClick: (event: UniPointerEvent) => void): UseDoubleClickReturn {
    let firstEvent: UniPointerEvent | null = null;
    let timeout: number = 0;
    const TIME_MAX = 200;
    const PAGE_MAX = 44;

    const onClick = (event: UniPointerEvent) => {
      clearTimeout(timeout);
      if (
        firstEvent != null &&
        Math.abs(event.pageX - firstEvent!.pageX) <= PAGE_MAX &&
        Math.abs(event.pageY - firstEvent!.pageY) <= PAGE_MAX &&
        event.timeStamp - firstEvent!.timeStamp <= TIME_MAX
      ) {
        doubleClick(event);
        firstEvent = null;
        return;
      }
      firstEvent = event;
      timeout = setTimeout(() => {
        firstEvent = null;
      }, TIME_MAX);
    };

    return {
      onClick,
      TIME_MAX
    };
  }
  // #endregion useDoubleClick

  // #region useControls
  let controlsState: ControlsState | null = null;
  type ControlsState = {
    seeking: boolean;
    touching: boolean;
    controlsTouching: boolean;
    toggleControlsTimer: number;
  }
  type UseControlsReturn = {
    state: ControlsState;
    clickProgress: (event: UniPointerEvent) => void;
    toggleControls: (event: UniPointerEvent) => void;
    autoHideStart: () => void;
    autoHideEnd: () => void;
    controlsClick ?: (event ?: UniPointerEvent) => void;

    centerPlayBtnShow: ComputedRef<boolean>;
    controlsShow: ComputedRef<boolean>;
    controlsVisible: Ref<boolean>;

    onBallTouchstart: (event: UniTouchEvent) => void;
    onBallTouchmove: (event: UniTouchEvent) => void;
    onBallTouchend: (event: UniTouchEvent) => void;
  }
  function useControls(seeking?: (currentTimeNew: number) => void): UseControlsReturn {
    const centerPlayBtnShow = computed(() => props.showCenterPlayBtn && !videoState.start);
    const controlsVisible = ref(true);
    const controlsShow = computed(() => !centerPlayBtnShow.value && props.controls && controlsVisible.value);

    const state = reactive<ControlsState>({
      seeking: false,
      touching: false,
      controlsTouching: false,
      toggleControlsTimer: 0
    });

    const clickProgress = (event: UniPointerEvent) => {
      if (event.target != null) {
        const clientRect = event.target.getBoundingClientRect();
        const w = clientRect.width;
        const x = event.x - clientRect.x;
        let progress = 0;
        if (x >= 0 && x <= w) {
          progress = x / w;
          useVideoReturn.seek(videoState.currentDuration * progress);
        }
      }
    }
    const controlsClick = (_ ?: UniEvent) => {
      clearTimeout(controlsState!.toggleControlsTimer);
    }
    const toggleControls = (event: UniPointerEvent) => {
      if (fullscreenState.fullscreen) {
        emit(
          'fullscreenclick',
          new UniVideoFullScreenClickEvent(rootRef.value!, event.screenX, event.screenY, gestureState!.containerRect.width, gestureState!.containerRect.height)
        );
      }
      state.toggleControlsTimer = setTimeout(() => {
        controlsVisible.value = !controlsVisible.value;
        emit('controlstoggle', new UniVideoControlsToggleEvent(rootRef.value!, controlsVisible.value));
      }, gestureState!.doubleClickTime);
    }
    let hideTiming: number = 0;
    const autoHideStart = () => {
      hideTiming = setTimeout(() => {
        controlsVisible.value = false;
      }, 3000);
    }
    const autoHideEnd = () => {
      if (hideTiming != 0) {
        clearTimeout(hideTiming);
      }
    }
    onBeforeUnmount(() => {
      if (hideTiming != 0) {
        clearTimeout(hideTiming);
      }
    });
    watch(
      () : boolean => controlsShow.value && videoState.playing && !state.controlsTouching,
      (val: boolean) => {
        if (val) {
          autoHideStart();
        } else {
          autoHideEnd();
        }
      }
    );

    let originX: number = 0;
    let originY: number = 0;
    let moveOnce = true;
    let originProgress: number = 0;
    let cachedProgressBarWidth: number = 0;

    const onBallTouchend = (event: UniTouchEvent) => {
      state.controlsTouching = false;
      if (state.touching) {
        if (!moveOnce) {
          event.stopPropagation();
          useVideoReturn.seek((videoState.currentDuration * videoState.progress) / 100);
        }
        state.touching = false;
      }
    }
    const onBallTouchmove = (event: UniTouchEvent) => {
      if (!state.touching) return;
      const toucher = event.touches[0];
      const pageX = toucher.pageX;
      const pageY = toucher.pageY;
      if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
        onBallTouchend(event);
        return;
      }
      moveOnce = false;
      let progress = originProgress + ((pageX - originX) / cachedProgressBarWidth) * 100;
      if (progress < 0) {
        progress = 0;
      } else if (progress > 100) {
        progress = 100;
      }
      videoState.progress = progress;

      seeking?.((videoState.currentDuration * progress) / 100);
      state.seeking = true;
      event.stopPropagation();
      if (!fullscreenState.fullscreen) {
        event.preventDefault();
      }
    }
    const onBallTouchstart = (event: UniTouchEvent) => {
      state.controlsTouching = true;
      const toucher = event.touches[0];
      originX = toucher.pageX;
      originY = toucher.pageY;
      originProgress = videoState.progress;
      moveOnce = true;
      state.touching = true;
      const progressEl = progressBarRef.value as UniElement
      if (progressEl != null) {
          cachedProgressBarWidth = progressEl.getBoundingClientRect().width ?? progressEl.offsetWidth;
      }
    }

    return {
      state,
      clickProgress,
      toggleControls,
      autoHideStart,
      autoHideEnd,
      controlsClick,
      centerPlayBtnShow,
      controlsShow,
      controlsVisible,
      onBallTouchstart,
      onBallTouchmove,
      onBallTouchend
    };
  }
  const useControlsReturn = useControls((currentTimeNew) => {
    gestureState!.currentTimeNew = currentTimeNew;
  });
  controlsState = useControlsReturn.state;
  // #endregion useControls

  // #region useGesture
  type VideoGestureType = 'none' | 'stop' | 'volume' | 'progress' | 'brightness';
  type GestureState = {
    seeking: boolean;
    hasSought: boolean;
    toastThin: boolean;
    gestureType: VideoGestureType;
    volumeOld: number;
    volumeNew: number;
    currentTimeOld: number;
    currentTimeNew: number;
    doubleClickTime: number;
    brightnessOld: number;
    brightnessNew: number;
    containerRect: ContainerRect;
  }
  type TouchStartOrigin = {
    x: number;
    y: number;
  }
  type UseGestureReturn = {
    state: GestureState;
    onTouchstart: (event: UniTouchEvent) => void;
    onTouchend: (event: UniTouchEvent) => void;
    onTouchmove: (event: UniTouchEvent) => void;
    onClick: (event: UniPointerEvent) => void;
    changeProgress: (x: number) => void;
    changeToastThin: () => void;
  }
  type ContainerRect = {
    width: number;
    height: number;
    x: number;
    y: number;
  }
  function useGesture(): UseGestureReturn {
    let changeToastThinTimer: number | null = null;
    const containerRect = reactive<ContainerRect>({
      width: 0,
      height: 200,
      x: 0,
      y: 0
    });
    const state = reactive<GestureState>({
      seeking: false,
      hasSought: false,
      gestureType: 'none',
      volumeOld: 0,
      volumeNew: 0,
      currentTimeOld: 0,
      currentTimeNew: 0,
      doubleClickTime: 0,
      brightnessOld: brightness.getBrightness(),
      brightnessNew: brightness.getBrightness(),
      containerRect,
      toastThin: false
    });

    const changeToastThin = () => {
      if (state.gestureType !== 'none' && changeToastThinTimer != null) return;
      changeToastThinTimer = setTimeout(() => {
        state.toastThin = true;
      }, 500);
    };

    const touchStartOrigin: TouchStartOrigin = {
      x: 0,
      y: 0
    };
    const changeProgress = (x: number) => {
      const duration = videoState.currentDuration;
      let currentTimeNew = (x / 600) * duration + state.currentTimeOld;
      if (currentTimeNew < 0) {
        currentTimeNew = 0;
      } else if (currentTimeNew > duration) {
        currentTimeNew = duration;
      }
      state.currentTimeNew = currentTimeNew;
    }
    const onTouchstart = (event: UniTouchEvent) => {
      const toucher = event.touches[0];
      touchStartOrigin.x = toucher.pageX;
      touchStartOrigin.y = toucher.pageY;
      state.gestureType = 'none';
      state.volumeOld = 0;
      event.stopPropagation();
      // state.currentTimeOld = state.currentTimeNew = 0
    }
    const onTouchmove = (event: UniTouchEvent) => {
      if (!videoState.start) return;

      function stop() {
        event.stopPropagation();
        if (!fullscreenState.fullscreen) {
          event.preventDefault();
        }
      }

      const containerCenter = (containerRect.x + containerRect.width) / 2;
      const gestureType = state.gestureType;
      if (gestureType === 'stop') {
        return;
      }

      const toucher = event.touches[0];
      const pageX = toucher.pageX;
      const pageY = toucher.pageY;
      const origin = touchStartOrigin;

      function changeVolume(y: number) {
        const valueOld = state.volumeOld;
        let value: number;
        if (typeof valueOld === 'number') {
          value = valueOld - (y / containerRect.height) * volumeState.maxVolume;
          if (value < volumeState.minVolume) {
            value = volumeState.minVolume;
          } else if (value > volumeState.maxVolume) {
            value = volumeState.maxVolume;
          }
          useVolumeReturn.updateVolume(value);
          state.volumeNew = value;
        }
      }

      function changeBrightness(y: number) {
        const valueOld = state.brightnessOld;
        let value: number;
        if (typeof valueOld === 'number') {
          value = valueOld - y / containerRect.height;
          if (value < 0) {
            value = 0;
          } else if (value > 1) {
            value = 1;
          }
          brightness.setBrightness(value);
          state.brightnessNew = value;
        }
      }

      switch (gestureType) {
        case 'progress':
          stop()
          changeProgress(pageX - origin.x);
          state.seeking = true;
          break;
        case 'volume':
          stop()
          changeVolume(pageY - origin.y);
          break;
        case 'brightness':
          stop()
          changeBrightness(pageY - origin.y);
          break;
      }

      if (gestureType !== 'none') {
        return;
      }

      const absX = Math.abs(pageX - origin.x);
      const absY = Math.abs(pageY - origin.y);

      if (absX > absY) {
        if (!props.enableProgressGesture) {
          state.gestureType = 'stop';
          return;
        }
        state.gestureType = 'progress';
        state.currentTimeOld = videoState.currentTime;
        state.currentTimeNew = videoState.currentTime;
      } else if (absX < absY) {
        if (props.pageGesture || props.vslideGesture || (fullscreenState.fullscreen && props.vslideGestureInFullscreen)) {
          if (origin.x > containerCenter) {
            changeToastThin();
            state.gestureType = 'volume';
            state.volumeOld = volumeState.currentVolumeLevel;
          } else {
            changeToastThin();
            useVolumeReturn.clearChangeShowToast();
            volumeState.showToast = false;
            state.toastThin = false;
            state.gestureType = 'brightness';
            state.brightnessOld = brightness.getBrightness();
          }
        } else {
          state.gestureType = 'stop';
        }
      }
    }
    const onTouchend = (event: UniTouchEvent) => {
      if (state.gestureType !== 'none') {
        state.hasSought = true;
        if (state.gestureType !== 'stop') {
          event.stopPropagation();
          // 全屏的时候触发过 preventDefault 后续不再触发也会拦截 click 事件
          if (!fullscreenState.fullscreen) {
            event.preventDefault();
          }
        }
      }
      if (state.gestureType === 'progress' && state.currentTimeOld !== state.currentTimeNew) {
        useVideoReturn.seek(state.currentTimeNew);
      }
      if (state.gestureType === 'volume' || state.gestureType === 'brightness') {
        if (state.gestureType === 'brightness') {
          state.toastThin = false;
        }
        clearTimeout(changeToastThinTimer!);
        changeToastThinTimer = null;
      }
      state.gestureType = 'none';
    }
    let doubleClickHandler: ((event: UniPointerEvent) => void) | null = null;

    const onClick = (event: UniPointerEvent) => {
      // NOTE 会触发父级的点击事件
      if (state.hasSought) {
        event.stopPropagation();
        state.hasSought = false;
        return;
      }

      // 如果启用了双击手势，调用双击处理函数
      if (doubleClickHandler != null) {
        doubleClickHandler(event);
      }
    }
    const getContainerRect = () => {
      containerRef.value?.getBoundingClientRectAsync()?.then((rect: DOMRect) => {
        containerRect.height = rect.height;
        containerRect.width = rect.width;
        containerRect.x = rect.x;
        containerRect.y = rect.y;
      });
    }
    onMounted(() => {
      nextTick(() => {
        getContainerRect()

        watchEffect(() => {
          if (props.enablePlayGesture) {
            const res = useDoubleClick((event : UniPointerEvent) => {
              event.stopPropagation();
              clearTimeout(controlsState!.toggleControlsTimer);
              useVideoReturn.toggle(event);
              useControlsReturn.controlsVisible.value = true;
            });
            state.doubleClickTime = res.TIME_MAX;
            doubleClickHandler = res.onClick;
          } else {
            state.doubleClickTime = 0;
            doubleClickHandler = null;
          }
        });
      });
      // 鸿蒙悬浮窗状态切换时触发
      const ON_WINDOW_STATUS_CHANGE_EVENT_NAME = `__UNIVIDEO_ON_WINDOW_STATUS_CHANGE_${eventSeed}`;
      const onWindowStatusChange = () => {
        setTimeout(getContainerRect, 200);
      };
      uni.$on(ON_WINDOW_STATUS_CHANGE_EVENT_NAME, onWindowStatusChange);
      onBeforeUnmount(() => {
        uni.$off(ON_WINDOW_STATUS_CHANGE_EVENT_NAME, onWindowStatusChange);
      });
    });

    return {
      state,
      onTouchstart,
      onTouchend,
      changeProgress,
      onTouchmove,
      onClick,
      changeToastThin
    };
  }
  useGestureReturn = useGesture();
  gestureState = useGestureReturn.state;
  // #endregion useGesture

  // #region useDanmu
  type DanmuState = {
    enable: boolean;
  }
  type UseDanmuReturn = {
    state: DanmuState;
    toggleDanmu: () => void;
    updateDanmu: () => void;
    playDanmu: (danmu: Danmu) => void;
    sendDanmu: (danmu: Danmu) => void;
  }
  function useDanmu(): UseDanmuReturn {
    const state = reactive<DanmuState>({
      enable: props.enableDanmu
    });
    watch(() => props.enableDanmu, () => {
      state.enable = props.enableDanmu
    })
    let danmuIndex = {
      time: 0,
      index: -1
    };
    const danmuList: Danmu[] = Array.isArray(props.danmuList) ? JSON.parseArray<Danmu>(JSON.stringify(props.danmuList)) ?? [] : [];
    danmuList.sort(function (a: Danmu, b: Danmu) {
      return (a.time ?? 0) - (b.time ?? 0);
    });
    const toggleDanmu = () => {
      state.enable = !state.enable as boolean;
    }
    const playDanmu = (danmu: Danmu) => {
      if (rootRef.value == null) return;

      // #ifdef VUE3-VAPOR
      if (danmu.text == null || danmu.text?.length === 0 || danmakuRef.value == null) {
        return;
      }

      danmakuRef.value.send({
        text: danmu.text,
        color: danmu.color
      } as DanmakuTask)
      return
      // #endif

      if (danmu.text == null || danmu.text?.length === 0 || danmuRef.value == null) {
        return;
      }

      // @ts-ignore
      const p = rootRef.value.uniPage.createElement('text');
      const danmuContainer = danmuRef.value as UniElement;

      (p as UniTextElement).setAnyAttribute('value', danmu.text ?? '');

      p.style.setProperty('font-size', '14px');
      p.style.setProperty('line-height', '14px');
      p.style.setProperty('position', 'absolute');
      p.style.setProperty('color', '#000');
      p.style.setProperty('white-space', 'nowrap');
      p.style.setProperty('left', '100%');
      p.style.setProperty('transform', 'translateX(0%)');
      p.style.setProperty('bottom', `${Math.random() * 100}%`);
      p.style.setProperty('color', `${danmu.color}`);

      danmuContainer.appendChild(p);
      // #ifndef APP-HARMONY
      p.animate(
        [
          { left: '100%', transform: 'translateX(0%)' },
          { left: '0%', transform: `translateX(-100%);` }
        ],
        {
          duration: 3000,
          easing: 'linear'
        }
      );
      setTimeout(function () {
        p.remove();
      }, 3000);
      // #endif
      // #ifdef APP-HARMONY
      // TODO 鸿蒙 left 动画问题导致弹幕渲染出错
      setTimeout(() => {
        const textWidth = p.getBoundingClientRect().width
        p.animate(
          [
            { transform: "translateX(0%)" },
            { transform: `translateX(-${danmuContainer.getBoundingClientRect().width + textWidth}px)` },
          ],
          {
            duration: 3000,
            easing: 'linear'
          },
        )
        setTimeout(function () {
          p.remove();
        }, 3000);
      }, 100);
      // #endif
    }
    const updateDanmu = () => {
      const currentTime = videoState.currentTime;
      const oldDanmuIndex = danmuIndex;
      const newDanmuIndex = {
        time: currentTime,
        index: oldDanmuIndex.index
      };
      if (currentTime > (oldDanmuIndex.time as number)) {
        for (let index = oldDanmuIndex.index as number + 1; index < danmuList.length; index++) {
          const element = danmuList[index];
          if (currentTime >= (element.time ?? 0)) {
            newDanmuIndex.index = index;
            if (videoState.playing && state.enable as boolean) {
              playDanmu(element);
            }
          } else {
            break;
          }
        }
      } else if (currentTime < (oldDanmuIndex.time as number)) {
        for (let index = oldDanmuIndex.index as number - 1; index > -1; index--) {
          const element = danmuList[index];
          if (currentTime <= (element.time ?? 0)) {
            newDanmuIndex.index = index - 1;
          } else {
            break;
          }
        }
      }
      danmuIndex = newDanmuIndex;
    }
    const sendDanmu = (danmu: Danmu) => {
      danmuList.splice(danmuIndex.index as number + 1, 0, {
        text: danmu.text,
        color: danmu.color,
        time: videoState.currentTime
      } as Danmu);
    }
    // 事件监听已统一在主作用域注册
    return {
      state,
      toggleDanmu,
      updateDanmu,
      playDanmu,
      sendDanmu
    };
  }
  const useDanmuReturn = useDanmu();
  const danmuState = useDanmuReturn.state;
  // #endregion useDanmu

  // #region useProgressing
  function useProgressing() {
    const progressing = computed(() => gestureState!.gestureType === 'progress' || controlsState!.touching);
    nextTick(() => {
      watch(progressing, (val: boolean) => {
        videoState.pauseUpdatingCurrentTime = val;
        controlsState!.controlsTouching = val;
        if (gestureState!.gestureType === 'progress' && val) {
          useControlsReturn.controlsVisible.value = true;
        }
      });
      watch(
        [
          () => videoState.currentTime,
          () => videoState.currentDuration
        ],
        () => {
          const currentDuration = videoState.currentDuration;
          if (currentDuration > 0) {
            videoState.progress = (videoState.currentTime / currentDuration) * 100;
          } else {
            videoState.progress = 0;
          }
        }
      );
      watch(
        () : number => gestureState!.currentTimeNew,
        (currentTimeNew: number) => {
          videoState.currentTime = currentTimeNew;
        }
      );
    })

    return progressing;
  }
  const progressing = useProgressing();
  // #endregion useProgressing

  const inited = ref<boolean>(false);
  function onInit(event: UniNativeViewInitEvent) {
    video = new Video(event.detail.element, {
      options,
      eventSeed,
      muted: props.muted,
      autoplay: props.autoplay,
      objectFit: props.objectFit as ObjectFit,
      loop: props.loop
    } as BuilderVideoParams);
    inited.value = true;
  }

  const ballTranslateX = ref<number>(0)
  const playedElScaleX = ref<number>(0)

  // 所有事件名和监听函数变量
  const ON_TIME_UPDATE_EVENT_NAME = `__UNIVIDEO_ON_TIME_UPDATE_${eventSeed}`;
  const onTimeUpdate = (time: number) => {
    if (!videoState.pauseUpdatingCurrentTime) {
      videoState.currentTime = time;
    }
    emit('timeupdate', new UniVideoTimeUpdateEvent(rootRef.value!, time, videoState.duration));
    useDanmuReturn.updateDanmu();
  };

  const ON_PLAY_EVENT_NAME = `__UNIVIDEO_ON_PLAY_${eventSeed}`;
  const onPlay = () => {
    videoState.loading = false;
    videoState.start = true;
    videoState.playing = true;
    useControlsReturn.controlsVisible.value = true;
    emit('play', new UniVideoEvent(rootRef.value!, 'play', {}));
  };

  const ON_PAUSE_EVENT_NAME = `__UNIVIDEO_ON_PAUSE_${eventSeed}`;
  const onPause = () => {
    videoState.loading = false;
    videoState.playing = false;
    useControlsReturn.controlsVisible.value = true;
    emit('pause', new UniVideoEvent(rootRef.value!, 'pause', {}));
  };

  const ON_ERROR_EVENT_NAME = `__UNIVIDEO_ON_ERROR_${eventSeed}`;
  const onError = () => {
    videoState.isError = true;
    videoState.loading = false;
    videoState.playing = false;
    useControlsReturn.controlsVisible.value = true;
    emit('error', new UniVideoErrorEvent(rootRef.value!, { errCode: 200001, errSubject: 'uni-video', errMsg: '' } as UniWebViewErrorEventDetail));
  };

  const ON_ENDED_EVENT_NAME = `__UNIVIDEO_ON_ENDED_${eventSeed}`;
  const onEnded = () => {
    videoState.loading = false;
    videoState.playing = false;
    useControlsReturn.controlsVisible.value = true;
    emit('ended', new UniVideoEvent(rootRef.value!, 'ended', {}));
  };

  const ON_PREPARED_EVENT_NAME = `__UNIVIDEO_ON_PREPARED_${eventSeed}`;
  const onPrepared = (duration: number) => {
    videoState.prepared = true;
    videoState.isError = false;
    videoState.loading = false;
    videoState.duration = duration;
    const initialTime = props.initialTime ?? 0;
    if (initialTime > 0) {
      useVideoReturn.seek(initialTime);
    } else if (typeof props.poster === 'undefined' || props.poster.length === 0) {
      video?.displayTheFirstFrame();
    }
  };

  const ON_SEND_DANMU_EVENT_NAME = `__UNIVIDEO_SEND_DANMU_${eventSeed}`;
  const onSendDanmu = (res: UTSJSONObject) => {
    useDanmuReturn.sendDanmu({
      text: res['text'] as string | null,
      color: res['color'] as string | null,
      time: res['time'] as number | null
    } as Danmu);
  };

  // 统一注册所有事件
  uni.$on(ON_TIME_UPDATE_EVENT_NAME, onTimeUpdate);
  uni.$on(ON_PLAY_EVENT_NAME, onPlay);
  uni.$on(ON_PAUSE_EVENT_NAME, onPause);
  uni.$on(ON_ERROR_EVENT_NAME, onError);
  uni.$on(ON_ENDED_EVENT_NAME, onEnded);
  uni.$on(ON_PREPARED_EVENT_NAME, onPrepared);
  uni.$on(ON_SEND_DANMU_EVENT_NAME, onSendDanmu);

  // #ifdef APP-HARMONY && VUE3-VAPOR
  onRecycle(() => {
    recycleState.value.duration = videoState.duration
    recycleState.value.currentTime = videoState.currentTime
    recycleState.value.isPlaying = videoState.playing
    recycleState.value.isPlayed = videoState.start

    // 保存回收时 video 状态
    recycleState.value.currentDuration = videoState.currentDuration
    recycleState.value.progress = videoState.progress
    recycleState.value.buffered = videoState.buffered
    recycleState.value.loading = videoState.loading
    recycleState.value.prepared = videoState.prepared
    recycleState.value.isError = videoState.isError

    if (videoState.currentTime > 0) {
      video?.seek(0)
    }

    emit('recycle', new UniVideoRecycleEvent(
      rootRef.value!,
      {
        duration: recycleState.value.duration,
        currentTime: recycleState.value.currentTime,
        isPlaying: recycleState.value.isPlaying
      } as UniVideoRecycleEventDetail
    ));
  })

  onReuse(() => {
    nextTick(() => {
      videoState.start = recycleState.value.isPlayed
      videoState.currentTime = recycleState.value.currentTime

      if (videoState.currentTime > 0) {
        video?.seek(videoState.currentTime)
      }
      // videoState.duration = recycleState.value.duration
      videoState.playing = false

      // 恢复回收时 video 状态
      // videoState.currentDuration = recycleState.value.currentDuration
      // videoState.progress = recycleState.value.progress
      // videoState.prepared = recycleState.value.prepared
      videoState.buffered = recycleState.value.buffered
      videoState.loading = recycleState.value.loading
      videoState.isError = false

      emit('reuse', new UniVideoReuseEvent(
        rootRef.value!,
        {
         duration: recycleState.value.duration,
         currentTime: recycleState.value.currentTime,
         isPlaying: recycleState.value.isPlaying
        }as UniVideoReuseEventDetail
      ));
    })
  })
  // #endif

  onBeforeUnmount(() => {
    uni.$off(ON_TIME_UPDATE_EVENT_NAME, onTimeUpdate);
    uni.$off(ON_PLAY_EVENT_NAME, onPlay);
    uni.$off(ON_PAUSE_EVENT_NAME, onPause);
    uni.$off(ON_ERROR_EVENT_NAME, onError);
    uni.$off(ON_ENDED_EVENT_NAME, onEnded);
    uni.$off(ON_PREPARED_EVENT_NAME, onPrepared);
    uni.$off(ON_SEND_DANMU_EVENT_NAME, onSendDanmu);

    // #ifdef APP-HARMONY && VUE3-VAPOR
    // vapor 模式需要主动调用
    video?.destroy()
    // #endif
  });
</script>

<style>
  .uni-video-slots {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .uni-video-icon {
    font-family: 'uni-video-icon';
    text-align: center;
  }

  .uni-icon {
    font-family: 'uni-icon';
    text-align: center;
  }

  .uni-video {
    width: 300px;
    height: 225px;
    line-height: 0;
    overflow: hidden;
    position: relative;
  }

  .uni-video-gesture-brightness,
  .uni-video-gesture-volume,
  .uni-video-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: black;
  }

  .native-view-video {
    width: 100%;
    height: 100%;
  }

  .uni-video-cover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    /* background-color: rgba(1, 1, 1, 0.5); */
    align-items: center;
    z-index: 10;
  }

  .uni-video-cover-play-button {
    width: 75px;
    height: 75px;
    line-height: 75px;
    font-size: 60px;
    color: rgba(255, 255, 255, 0.5);
    /* cursor: pointer; */
  }

  .uni-video-cover-duration {
    color: #fff;
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
  }

  .uni-video-bar_outside {
    width: 100%;
    height: 44px;
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: content-box;
    z-index: 1;
  }

  .uni-video-title-bar_outside {
    top: 0;
    padding-bottom: 15px;
    background-image: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.5));
    padding-top: var(--uni-safe-area-inset-top);
  }

  .uni-video-fullscreen-bar_outside {
    height: 60px;
    padding-top: 15px;
    padding-bottom: var(--uni-safe-area-inset-bottom);
  }

  .uni-video-bar_container {
    width: 100%;
    height: 100%;
    overflow: visible;
    padding-left: var(--uni-safe-area-inset-left);
    padding-right: var(--uni-safe-area-inset-right);
  }

  .uni-video-bar {
    width: 100%;
    height: 100%;
    padding: 0 15px;
    flex-direction: row;
    align-items: center;
    overflow: visible;
  }

  .uni-video-bar.uni-video-bar_fullscreen {
    /* 全屏时底部额外添加 padding */
    padding-bottom: 15px;
  }

  .uni-video-controls {
    height: 100%;
    margin: 0 4px;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    overflow: visible;
  }

  .uni-video-current-time,
  .uni-video-duration {
    height: 100%;
    justify-content: center;
  }

  .uni-video-current-time-text {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.5);
  }

  .uni-video-progress-container {
    height: 100%;
    flex-grow: 1;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    overflow: visible;
  }

  .uni-video-progress-bar-container {
    /* App 不支持百分比，使用一个较大的值代替 */
    border-radius: 20000px;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .uni-video-progress-played,
  .uni-video-progress-buffered {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .uni-video-progress-played {
    background-color: #ffffff;
    transform-origin: left center;
    transform: scaleX(0);
    /* #ifdef WEB */
    will-change: transform;
    /* #endif */
  }

  .uni-video-progress-buffered {
    background-color: rgba(255, 255, 255, 0.3);
    /* transition: width 0.1s; */
  }

  .uni-video-ball-container {
    width: 100%;
    height:100%;
    position: absolute;
    left:0;
    overflow: visible;
    justify-content: center;
  }

  .uni-video-ball {
    /* NOTE uni-video-ball-progressing width height */
    width: 8px;
    height: 8px;
    padding: 14px;
    box-sizing: content-box;
    margin-left: -16px;
    overflow: visible;
  }

  .uni-video-inner {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 2px #ccc;
  }

  .uni-video-ball.uni-video-ball-progressing {
    width: 16px;
    height: 16px;
  }

  .uni-video-inner.uni-video-ball-progressing {
    border-radius: 8px;
  }

  .uni-video-volume-button,
  .uni-video-danmu-button {
    width: 24px;
    height: 100%;
    justify-content: center;
    white-space: nowrap;
    margin: 0 2px;
    /* cursor: pointer; */
  }

  /* .uni-video-volume-button */ .uni-video-volume-button-icon,
  /* .uni-video-danmu-button */ .uni-video-danmu-button-icon {
    line-height: 24px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* .uni-video-volume-button */ .uni-video-volume-button-icon {
    font-size: 20px;
  }

  /* .uni-video-danmu-button */ .uni-video-danmu-button-icon {
    font-size: 24px;
  }

  .uni-video-control-button {
    width: 20px;
    height: 100%;
    justify-content: center;
    padding: 0px 16px 0px 0px;
    margin-left: -4px;
    margin-right: -6px;
    box-sizing: content-box;
    /* cursor: pointer; */
  }

  /* .uni-video-control-button */ .uni-video-control-button-icon {
    font-size: 18px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.5);
  }

  .uni-video-progress {
    width: 100%;
    /* NOTE uni-video-progress-progressing height */
    height: 4px;
    position: relative;
    /* cursor: pointer; */
    flex-direction: row;
    align-items: center;
    overflow: visible;
  }

  .uni-video-progress.uni-video-progress-progressing {
    height: 8px;
  }

  .uni-video-danmu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin-top: 14px;
    margin-bottom: 44px;
    z-index: 0;
    overflow: visible;
  }

  .uni-video-fullscreen-btn {
    width: 32px;
    height: 100%;
    justify-content: center;
    box-sizing: content-box;
    /* cursor: pointer; */
  }

  .uni-video-fullscreen-icon {
    font-size: 20px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
  }

  .uni-video-toast {
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: visible;
  }

  .uni-video-toast.uni-video-toast-progress {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    padding: 6px;
  }

  .uni-video-toast-title {
    flex-direction: row;
  }

  /* .uni-video-toast */ .uni-video-toast-title-text {
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    line-height: 24px;
  }

  /* .uni-video-toast */ .uni-video-toast-title-text.uni-video-toast-title-current-time {
    color: rgba(255, 255, 255, 0.9);
  }

  .uni-video-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    pointer-events: none;
  }

  .uni-video-back-button-icon {
    font-size: 26px;
    line-height: 26px;
    color: rgba(255, 255, 255, 0.5);
  }

  .uni-video-title-view {
    margin-left: 10px;
  }

  .uni-video-title {
    font-size: 18px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.5);
  }

  .uni-video-toast-icon {
    font-size: 20px;
    position: absolute;
    left: 10px;
    color: #222;
    z-index: 1;
  }

  .uni-video-toast-container {
    position: relative;
    flex-direction: row;
    align-items: center;
    width: 22%;
    min-width: 100px;
    max-width: 200px;
    height: 30px;
    max-height: 30px;
    min-height: 6px;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 2px #ccc;
    margin: 5px auto 0;
    border-radius: 30px;
    overflow: hidden;
    transition-property: height;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    opacity: 0.6;
  }

  .uni-video-toast-draw {
    height: 100%;
    background-color: #fff;
  }

  .uni-video-toast-container.uni-video-toast-container-thin {
    height: 6px;
  }
</style>
