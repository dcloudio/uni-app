export const ATTR_MAP = {
  class: '.c',
  style: '.s',
}

export function encodeAttr(name: string) {
  return ATTR_MAP[name as keyof typeof ATTR_MAP] || name
}

export const ATTR_RESTORE_MAP = {
  '.c': 'class',
  '.s': 'style',
}

export function decodeAttr(name: string) {
  return ATTR_RESTORE_MAP[name as keyof typeof ATTR_RESTORE_MAP] || name
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

const COMPONENT_ARR = [
  '',
  'view',
  'image',
  'text',
  '#text',
  '#comment',
  'navigator',
  'form',
  'button',
  'input',
  'label',
  'radio',
  'checkbox',
  'checkbox-group',
  'ad',
  'audio',
  'camera',
  'canvas',
  'cover-image',
  'cover-view',
  'editor',
  'functional-page-navigator',
  'icon',
  'radio-group',
  'live-player',
  'live-pusher',
  'map',
  'movable-area',
  'movable-view',
  'official-account',
  'open-data',
  'picker',
  'picker-view',
  'picker-view-column',
  'progress',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'textarea',
  'video',
  'web-view',
]

export function decodeTag(tag: string | number) {
  return COMPONENT_ARR[tag as number] || tag
}
