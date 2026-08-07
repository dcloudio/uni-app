import { UVUE_VAPOR_APP_EASYCOMS } from '../tagsGen'

const APP_NATIVE_TAGS = [
  'view',
  'text',
  'image',
  'scroll-view',
  'native-view',
  'nested-scroll-header',
  'nested-scroll-body',
  'rich-text-native',
  'cover-image',
  'cover-view',
]

/**
 * 可能后续会添加的tags，native或easycom
 * movable-area
 * movable-view
 * share-element
 * icon
 * animation-view
 */

export function isDom2AppNativeTag(tag: string) {
  return APP_NATIVE_TAGS.includes(tag)
}

export function isDom2VueComponentTag(tag: string) {
  return UVUE_VAPOR_APP_EASYCOMS.includes(tag)
}

export function isDom2AppVueComponentTag(tag: string) {
  return UVUE_VAPOR_APP_EASYCOMS.includes(tag)
}

export function isDom2AppUserVueComponentTag(tag: string) {
  return !isDom2AppNativeTag(tag) && !isDom2VueComponentTag(tag)
}
