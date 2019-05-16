import {
  initHooks
} from 'uni-wrapper/util'

import parseBasePage from '../../../mp-weixin/runtime/wrapper/page-parser'

const hooks = [
  'onBackPress',
  'onNavigationBarButtonTap',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputConfirmed',
  'onNavigationBarSearchInputClicked'
]

export default function parsePage (vuePageOptions) {
  const pageOptions = parseBasePage(vuePageOptions)

  initHooks(pageOptions.methods, hooks)

  return pageOptions
}
