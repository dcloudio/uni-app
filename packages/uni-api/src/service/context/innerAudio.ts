//#region types
export type InnerAudioContextEvent =
  | 'onCanplay'
  | 'onPlay'
  | 'onPause'
  | 'onStop'
  | 'onEnded'
  | 'onTimeUpdate'
  | 'onError'
  | 'onWaiting'
  | 'onSeeking'
  | 'onSeeked'

export type InnerAudioContextOff =
  | 'offCanplay'
  | 'offPlay'
  | 'offPause'
  | 'offStop'
  | 'offEnded'
  | 'offTimeUpdate'
  | 'offError'
  | 'offWaiting'
  | 'offSeeking'
  | 'offSeeked'

//#endregion

/**
 * 可以批量设置的监听事件
 */
export const innerAudioContextEventNames: InnerAudioContextEvent[] = [
  'onCanplay',
  'onPlay',
  'onPause',
  'onStop',
  'onEnded',
  'onTimeUpdate',
  'onError',
  'onWaiting',
  'onSeeking',
  'onSeeked',
]

export const innerAudioContextOffEventNames: InnerAudioContextOff[] = [
  'offCanplay',
  'offPlay',
  'offPause',
  'offStop',
  'offEnded',
  'offTimeUpdate',
  'offError',
  'offWaiting',
  'offSeeking',
  'offSeeked',
]
