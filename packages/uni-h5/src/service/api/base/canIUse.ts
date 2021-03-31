import { hasOwn } from '@vue/shared'

import { CanIUseProtocol, defineSyncApi } from '@dcloudio/uni-api'

function cssSupports(css: string) {
  return window.CSS && window.CSS.supports && window.CSS.supports(css)
}

const SCHEMA_CSS = {
  'css.var': cssSupports('--a:0'),
  'css.env': cssSupports('top:env(a)'),
  'css.constant': cssSupports('top:constant(a)'),
}

export const canIUse = defineSyncApi<typeof uni.canIUse>(
  'canIUse',
  (schema: string) => {
    if (hasOwn(SCHEMA_CSS, schema)) {
      return SCHEMA_CSS[schema]
    }
    return true
  },
  CanIUseProtocol
)
