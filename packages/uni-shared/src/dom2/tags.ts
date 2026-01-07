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
]

export function isDom2AppNativeTag(tag: string) {
  return APP_NATIVE_TAGS.includes(tag)
}

const APP_VUE_COMPONENT_TAGS = [
  'swiper',
  'swiper-item',
  'match-media',
  'movable-area',
  'movable-view',
  'cover-view',
  'list-view',
  'list-item',
  'waterflow',
  'flow-item',
  'sticky-header',
  'sticky-section',
  'share-element',
  'icon',
  'rich-text',
  'progress',
  'button',
  'checkbox-group',
  'checkbox',
  'form',
  'input',
  'editor',
  'label',
  'picker',
  'picker-view',
  'picker-view-column',
  'radio-group',
  'radio',
  'slider',
  'switch',
  'textarea',
  'navigator',
  'video',
  'animation-view',
  'camera',
  'live-player',
  'live-pusher',
  'map',
  'canvas',
  'ad',
  'web-view',
  'loading',
]

export function isDom2VueComponentTag(tag: string) {
  return APP_VUE_COMPONENT_TAGS.includes(tag)
}

export function isDom2AppVueComponentTag(tag: string) {
  return APP_VUE_COMPONENT_TAGS.includes(tag)
}

export function isDom2AppUserVueComponentTag(tag: string) {
  return !isDom2AppNativeTag(tag) && !isDom2VueComponentTag(tag)
}
