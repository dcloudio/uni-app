export const EventOptionFlags = {
  capture: 1,
  once: 1 << 1,
  passive: 1 << 2,
}

export function encodeOptions(options?: AddEventListenerOptions) {
  let flag = 0
  if (options) {
    if (options.capture) {
      flag |= EventOptionFlags.capture
    }
    if (options.once) {
      flag |= EventOptionFlags.once
    }
    if (options.passive) {
      flag |= EventOptionFlags.passive
    }
  }
  return flag
}

export const EventModifierFlags = {
  stop: 1,
  prevent: 1 << 1,
  self: 1 << 2,
}

export function encodeModifier(modifiers: string[]) {
  let flag = 0
  if (modifiers.includes('stop')) {
    flag |= EventModifierFlags.stop
  }
  if (modifiers.includes('prevent')) {
    flag |= EventModifierFlags.prevent
  }
  if (modifiers.includes('self')) {
    flag |= EventModifierFlags.self
  }
  return flag
}

const BASE_EVENT_MAP = {
  onClick: 'a',
  onChange: 'b',
  onInput: 'c',
  onLoad: 'd',
  onError: 'e',
  onScroll: 'f',
  onTouchstart: 'g',
  onTouchmove: 'h',
  onTouchcancel: 'i',
  onTouchend: 'j',
  onLongpress: 'k',
  onTransitionend: 'l',
  onAnimationstart: 'm',
  onAnimationiteration: 'n',
  onAnimationend: 'o',
  onTouchforcechange: 'p',
}

const EVENT_OPTIONS = [
  'Capture',
  'CaptureOnce',
  'CapturePassive',
  'CaptureOncePassive',
  'Once',
  'OncePassive',
  'Passive',
]

export const EVENT_MAP = /*#__PURE__*/ (() => {
  return Object.keys(BASE_EVENT_MAP).reduce((res, name) => {
    const value = BASE_EVENT_MAP[name as keyof typeof BASE_EVENT_MAP]
    res[name] = value
    EVENT_OPTIONS.forEach((v, i) => {
      res[name + v] = value + i
    })
    return res
  }, Object.create(null))
})()

export function encodeEvent(name: string) {
  return EVENT_MAP[name as keyof typeof EVENT_MAP] || name
}

// 该代码会单独编译成一个decode js，用于开发时测试，故尽可能独立，不使用 @vue/shared 的 extend
export const ATTR_MAP = {
  class: '.c',
  style: '.s',
  'hover-class': '.h0',
  'hover-stop-propagation': '.h1',
  'hover-start-time': '.h2',
  'hover-stay-time': '.h3',
}

export function encodeAttr(name: string) {
  return ATTR_MAP[name as keyof typeof ATTR_MAP] || name
}

export const COMPONENT_MAP = {
  VIEW: 1,
  IMAGE: 2,
  TEXT: 3,
  '#text': 4,
  '#comment': 5,
  NAVIGATOR: 6,
  FORM: 7,
  BUTTON: 8,
  INPUT: 9,
  LABEL: 10,
  RADIO: 11,
  CHECKBOX: 12,
  'CHECKBOX-GROUP': 13,
  AD: 14,
  AUDIO: 15,
  CAMERA: 16,
  CANVAS: 17,
  'COVER-IMAGE': 18,
  'COVER-VIEW': 19,
  EDITOR: 20,
  'FUNCTIONAL-PAGE-NAVIGATOR': 21,
  ICON: 22,
  'RADIO-GROUP': 23,
  'LIVE-PLAYER': 24,
  'LIVE-PUSHER': 25,
  MAP: 26,
  'MOVABLE-AREA': 27,
  'MOVABLE-VIEW': 28,
  'OFFICIAL-ACCOUNT': 29,
  'OPEN-DATA': 30,
  PICKER: 31,
  'PICKER-VIEW': 32,
  'PICKER-VIEW-COLUMN': 33,
  PROGRESS: 34,
  'RICH-TEXT': 35,
  'SCROLL-VIEW': 36,
  SLIDER: 37,
  SWIPER: 38,
  'SWIPER-ITEM': 39,
  SWITCH: 40,
  TEXTAREA: 41,
  VIDEO: 42,
  'WEB-VIEW': 43,
}

export function encodeTag(tag: string) {
  return COMPONENT_MAP[tag as keyof typeof COMPONENT_MAP] || tag
}
