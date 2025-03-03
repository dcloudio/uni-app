import { isHTMLTag, isSVGTag } from '@vue/shared'

export const BUILT_IN_TAG_NAMES = [
  'ad',
  'ad-content-page',
  'ad-draw',
  'audio',
  'button',
  'camera',
  'canvas',
  'checkbox',
  'checkbox-group',
  'cover-image',
  'cover-view',
  'editor',
  'form',
  'functional-page-navigator',
  'icon',
  'image',
  'input',
  'label',
  'live-player',
  'live-pusher',
  'map',
  'movable-area',
  'movable-view',
  'navigator',
  'official-account',
  'open-data',
  'picker',
  'picker-view',
  'picker-view-column',
  'progress',
  'radio',
  'radio-group',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'text',
  'textarea',
  'video',
  'view',
  'web-view',
  'location-picker',
  'location-view',
]

export const BUILT_IN_TAGS = BUILT_IN_TAG_NAMES.map((tag) => 'uni-' + tag)

export const TAGS = [
  'app',
  'layout',
  'content',
  'main',
  'top-window',
  'left-window',
  'right-window',
  'tabbar',
  'page',
  'page-head',
  'page-wrapper',
  'page-body',
  'page-refresh',
  'actionsheet',
  'modal',
  'toast',
  'resize-sensor',
  'shadow-root',
].map((tag) => 'uni-' + tag)

export const NVUE_BUILT_IN_TAGS = [
  'svg',
  'view',
  'a',
  'div',
  'img',
  'image',
  'text',
  'span',
  'input',
  'textarea',
  'spinner',
  'select',
  // slider 被自定义 u-slider 替代
  // 'slider',
  'slider-neighbor',
  'indicator',
  'canvas',
  'list',
  'cell',
  'header',
  'loading',
  'loading-indicator',
  'refresh',
  'scrollable',
  'scroller',
  'video',
  'web',
  'embed',
  'tabbar',
  'tabheader',
  'datepicker',
  'timepicker',
  'marquee',
  'countdown',
  'dc-switch',
  'waterfall',
  'richtext',
  'recycle-list',
  'u-scalable',
  'barcode',
  'gcanvas',
]

export const UVUE_BUILT_IN_TAGS = [
  'ad',
  'ad-content-page',
  'ad-draw',
  'native-view',
  'loading-indicator',
  'list-view',
  'list-item',
  'swiper',
  'swiper-item',
  'rich-text',
  'sticky-view',
  'sticky-header',
  'sticky-section',
  // 自定义
  'uni-slider',
  // 原生实现
  'button',
  'nested-scroll-header',
  'nested-scroll-body',
  'waterflow',
  'flow-item',
  'share-element',
  'cover-view',
  'cover-image',
]

export const UVUE_WEB_BUILT_IN_TAGS = [
  'list-view',
  'list-item',
  'sticky-section',
  'sticky-header',
  'cloud-db-element',
].map((tag) => 'uni-' + tag)

export const UVUE_IOS_BUILT_IN_TAGS = [
  'scroll-view',
  'web-view',
  'slider',
  'form',
  'switch',
]

export const UVUE_HARMONY_BUILT_IN_TAGS = [
  // TODO 列出完整列表
  ...BUILT_IN_TAG_NAMES,
]

export const NVUE_U_BUILT_IN_TAGS = [
  'u-text',
  'u-image',
  'u-input',
  'u-textarea',
  'u-video',
  'u-web-view',
  'u-slider',
  'u-ad',
  'u-ad-draw',
  'u-rich-text',
]

export const UNI_UI_CONFLICT_TAGS = ['list-item'].map((tag) => 'uni-' + tag)

export function isBuiltInComponent(tag: string) {
  if (UNI_UI_CONFLICT_TAGS.indexOf(tag) !== -1) {
    return false
  }
  // h5 平台会被转换为 v-uni-
  const realTag = 'uni-' + tag.replace('v-uni-', '')
  // TODO 区分x和非x
  return (
    BUILT_IN_TAGS.indexOf(realTag) !== -1 ||
    UVUE_WEB_BUILT_IN_TAGS.indexOf(realTag) !== -1
  )
}

export function isH5CustomElement(tag: string, isX = false) {
  if (isX && UVUE_WEB_BUILT_IN_TAGS.indexOf(tag) !== -1) {
    return true
  }
  return TAGS.indexOf(tag) !== -1 || BUILT_IN_TAGS.indexOf(tag) !== -1
}

export function isUniXElement(name: string) {
  return /^I?Uni.*Element(?:Impl)?$/.test(name)
}

export function isH5NativeTag(tag: string) {
  return (
    tag !== 'head' &&
    (isHTMLTag(tag) || isSVGTag(tag)) &&
    !isBuiltInComponent(tag)
  )
}

export function isAppNativeTag(tag: string) {
  return isHTMLTag(tag) || isSVGTag(tag) || isBuiltInComponent(tag)
}

const NVUE_CUSTOM_COMPONENTS = [
  'ad',
  'ad-draw',
  'button',
  'checkbox-group',
  'checkbox',
  'form',
  'icon',
  'label',
  'movable-area',
  'movable-view',
  'navigator',
  'picker',
  'progress',
  'radio-group',
  'radio',
  'rich-text',
  'swiper-item',
  'swiper',
  'switch',
  'slider',
  'picker-view',
  'picker-view-column',
]

// 内置的easycom组件
const UVUE_BUILT_IN_EASY_COMPONENTS = ['map']

export function isAppUVueBuiltInEasyComponent(tag: string) {
  return UVUE_BUILT_IN_EASY_COMPONENTS.includes(tag)
}
// 主要是指前端实现的组件列表
const UVUE_CUSTOM_COMPONENTS = [
  ...NVUE_CUSTOM_COMPONENTS,
  ...UVUE_BUILT_IN_EASY_COMPONENTS,
]

export function isAppUVueNativeTag(tag: string) {
  // 前端实现的内置组件都会注册一个根组件
  if (tag.startsWith('uni-') && tag.endsWith('-element')) {
    return true
  }
  if (UVUE_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  if (UVUE_CUSTOM_COMPONENTS.includes(tag)) {
    return false
  }
  if (isBuiltInComponent(tag)) {
    return true
  }
  // u-text,u-video...
  if (NVUE_U_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  return false
}

export function isAppIOSUVueNativeTag(tag: string) {
  // 前端实现的内置组件都会注册一个根组件
  if (tag.startsWith('uni-') && tag.endsWith('-element')) {
    return true
  }
  if (NVUE_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  if (UVUE_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  if (UVUE_IOS_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  return false
}

export function isAppHarmonyUVueNativeTag(tag: string) {
  // 前端实现的内置组件都会注册一个根组件
  if (tag.startsWith('uni-') && tag.endsWith('-element')) {
    return true
  }
  if (NVUE_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  if (UVUE_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  if (UVUE_HARMONY_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  return false
}

export function isAppNVueNativeTag(tag: string) {
  if (NVUE_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  if (NVUE_CUSTOM_COMPONENTS.includes(tag)) {
    return false
  }
  if (isBuiltInComponent(tag)) {
    return true
  }
  // u-text,u-video...
  if (NVUE_U_BUILT_IN_TAGS.includes(tag)) {
    return true
  }
  return false
}

export function isMiniProgramNativeTag(tag: string) {
  return isBuiltInComponent(tag)
}

export function isMiniProgramUVueNativeTag(tag: string) {
  // 小程序平台内置的自定义元素，会被转换为 view
  if (tag.startsWith('uni-') && tag.endsWith('-element')) {
    return true
  }
  return isBuiltInComponent(tag)
}

export function createIsCustomElement(tags: string[] = []) {
  return function isCustomElement(tag: string) {
    return tags.includes(tag)
  }
}

export function isComponentTag(tag: string) {
  return tag[0].toLowerCase() + tag.slice(1) === 'component'
}

export const COMPONENT_SELECTOR_PREFIX = 'uni-'

export const COMPONENT_PREFIX = 'v-' + COMPONENT_SELECTOR_PREFIX

export const enum SetUniElementIdTagType {
  BuiltInComponent = 1, // 如：unicloud-db
  BuiltInRootElement = 2, // 如：uni-cloud-db-element
}
