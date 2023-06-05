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

export const UVUE_BUILT_IN_TAGS = ['loading-indicator']

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

export function isBuiltInComponent(tag: string) {
  // h5 平台会被转换为 v-uni-
  return BUILT_IN_TAGS.indexOf('uni-' + tag.replace('v-uni-', '')) !== -1
}

export function isH5CustomElement(tag: string) {
  return TAGS.indexOf(tag) !== -1 || BUILT_IN_TAGS.indexOf(tag) !== -1
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

export function isAppUVueNativeTag(tag: string) {
  if (UVUE_BUILT_IN_TAGS.includes(tag)) {
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
