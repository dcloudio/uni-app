import { extend } from '@vue/shared'

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

const EVENT_MAP = {
  onClick: '.e0',
  onChange: '.e1',
  onInput: '.e2',
  onLoad: '.e3',
  onError: '.e4',
  onTouchstart: '.e5',
  onTouchmove: '.e6',
  onTouchcancel: '.e7',
  onTouchend: '.e8',
  onLongpress: '.e9',
  onTransitionend: '.ea',
  onAnimationstart: '.eb',
  onAnimationiteration: '.ec',
  onAnimationend: '.ed',
  onTouchforcechange: '.ee',
}

const OPTIONS = [
  'Capture',
  'CaptureOnce',
  'CapturePassive',
  'CaptureOncePassive',
  'Once',
  'OncePassive',
  'Passive',
]

const BASE_ATTR_MAP = {
  class: '.c',
  style: '.s',
  'hover-class': '.h0',
  'hover-stop-propagation': '.h1',
  'hover-start-time': '.h2',
  'hover-stay-time': '.h3',
}

export const ATTR_MAP = /*#__PURE__*/ extend(
  BASE_ATTR_MAP,
  Object.keys(EVENT_MAP).reduce((res, name) => {
    const value = EVENT_MAP[name as keyof typeof EVENT_MAP]
    res[name] = value
    OPTIONS.forEach((v, i) => {
      res[name + v] = value + i
    })
    return res
  }, Object.create(null))
)

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
