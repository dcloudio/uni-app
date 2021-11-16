import { isHTMLTag, isSVGTag } from '@vue/shared'

export const BUILT_IN_TAGS = [
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
].map((tag) => 'uni-' + tag)

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

export function isBuiltInComponent(tag: string) {
  return BUILT_IN_TAGS.indexOf('uni-' + tag) !== -1
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
