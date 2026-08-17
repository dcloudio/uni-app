class UniVideoBaseEvent<T> extends UniCustomEvent<T> {
  constructor(target : UniElement, type : string, detail : T) {
    super(type, detail)
    if (this.target == null) {
      this.target = target
    }
    this.currentTarget = target
  }
}

export class UniVideoEvent extends UniVideoBaseEvent<UTSJSONObject> {
  constructor(target : UniElement, type : string) {
    super(target, type, {})
  }
}


export type UniVideoControlsToggleEventDetail = {
  /**
   * 是否显示
   */
  show : boolean
}
export class UniVideoControlsToggleEvent extends UniVideoBaseEvent<UniVideoControlsToggleEventDetail> {
  constructor(target : UniElement, show : boolean) {
    super(target, 'controlstoggle', { show } as UniVideoControlsToggleEventDetail)
  }
}


/**
 * 统一错误码
 */
export type VideoErrorCode =
  /**
   * 网络错误
   */
  100001 |
  /**
   * 内部错误
   */
  200001 |
  /**
   * SDK错误
   */
  300001
export type UniVideoErrorEventDetail = {
  errSubject : string;
  errCode : VideoErrorCode;
  errMsg : string;
}
export class UniVideoErrorEvent extends UniVideoBaseEvent<UniVideoErrorEventDetail>{
  constructor(target : UniElement, errCode : VideoErrorCode, errMsg : string) {
    super(target, 'error', {
        errSubject : 'uni-video',
        errCode,
        errMsg
    } as UniVideoErrorEventDetail)
  }
}


export type UniVideoFullScreenDirection = 'vertical' | 'horizontal'
export type UniVideoFullScreenChangeEventDetail = {
  /**
   * 是否全屏
   */
  fullScreen : boolean,
  /**
   * 横竖屏
   */
  direction : UniVideoFullScreenDirection
}
export class UniVideoFullScreenChangeEvent extends UniVideoBaseEvent<UniVideoFullScreenChangeEventDetail> {
  constructor(target : UniElement, fullScreen : boolean, direction : UniVideoFullScreenDirection = 'horizontal') {
    super(target, 'fullscreenchange', {
      fullScreen,
      direction
    } as UniVideoFullScreenChangeEventDetail)
  }
}


export type UniVideoFullScreenClickEventDetail = {
  /**
   * 点击点相对于屏幕左侧边缘的 X 轴坐标
   */
  screenX : number,
  /**
   * 点击点相对于屏幕顶部边缘的 Y 轴坐标
   */
  screenY : number,
  /**
   * 屏幕总宽度
   */
  screenWidth : number,
  /**
   * 屏幕总高度
   */
  screenHeight : number
}
export class UniVideoFullScreenClickEvent extends UniVideoBaseEvent<UniVideoFullScreenClickEventDetail> {
  constructor(target : UniElement, screenX : number, screenY : number, screenWidth : number, screenHeight : number) {
    super(target, 'fullscreenclick', {
      screenX, screenY, screenWidth, screenHeight
    } as UniVideoFullScreenClickEventDetail)
  }
}


export type UniVideoProgressEventDetail = {
  /**
   * 加载进度百分比
   */
  buffered : number
}
export class UniVideoProgressEvent extends UniVideoBaseEvent<UniVideoProgressEventDetail> {
  constructor(target : UniElement, buffered : number) {
    super(target, 'progress', {
      buffered
    } as UniVideoProgressEventDetail)
  }
}


export type UniVideoTimeUpdateEventDetail = {
  /**
   * 当前进度
   */
  currentTime : number,
  /**
   * 总进度
   */
  duration : number
}
export class UniVideoTimeUpdateEvent extends UniVideoBaseEvent<UniVideoTimeUpdateEventDetail> {
  constructor(target : UniElement, currentTime : number, duration : number) {
    super(target, 'timeupdate', {
      currentTime,
      duration
    } as UniVideoTimeUpdateEventDetail)
  }
}

// #ifdef VUE3-VAPOR
/**
 * video组件回收时的状态信息
 */
export type UniVideoRecycleEventDetail = {
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
}
/**
 * video组件回收事件
 */
export class UniVideoRecycleEvent extends UniVideoBaseEvent<UniVideoRecycleEventDetail> {
  constructor(target : UniElement, detail: UniVideoRecycleEventDetail) {
    super(target, 'recycle', detail)
  }
}

export type UniVideoReuseEventDetail = {
  /**
   * 复用时是否处于播放状态。复用时暂停状态此值为false
   */
  isPlaying: boolean
  /**
   * 复用时播放视频的进度
   */
  currentTime: number
  /**
   * 复用时播放视频的总时长
   */
  duration: number
}
/**
 * video组件复用事件
 */
export class UniVideoReuseEvent extends UniVideoBaseEvent<UniVideoReuseEventDetail> {
  constructor(target : UniElement, detail: UniVideoReuseEventDetail) {
    super(target, 'reuse', detail)
  }
}
// #endif

// #ifdef APP-ANDROID || APP-IOS
export type VideoTimeUpdateEvent = UniVideoTimeUpdateEvent
export type VideoTimeUpdateEventDetail = UniVideoTimeUpdateEventDetail
export type VideoFullScreenChangeEvent = UniVideoFullScreenChangeEvent
export type VideoFullScreenChangeEventDetail = UniVideoFullScreenChangeEventDetail
export type VideoErrorEvent = UniVideoErrorEvent
export type VideoErrorEventDetail = UniVideoErrorEventDetail
export type VideoProgressEvent = UniVideoProgressEvent
export type VideoProgressEventDetail = UniVideoProgressEventDetail
export type VideoFullScreenClickEvent = UniVideoFullScreenClickEvent
export type VideoFullScreenClickEventDetail = UniVideoFullScreenClickEventDetail
export type VideoControlsToggleEvent = UniVideoControlsToggleEvent
export type VideoControlsToggleEventDetail = UniVideoControlsToggleEventDetail
// #endif
