import subscribeApis from 'uni-api-subscribe'

import {
  pageScrollTo
} from './scroll'
import {
  loadFontFace
} from './font'

import initPlatformSubscribe from 'uni-platform/view/bridge/subscribe'

export default function initSubscribe (subscribe) {
  Object.keys(subscribeApis).forEach(name => {
    subscribe(name, subscribeApis[name])
  })

  subscribe('pageScrollTo', pageScrollTo)
  subscribe('loadFontFace', loadFontFace)

  initPlatformSubscribe(subscribe)
}
