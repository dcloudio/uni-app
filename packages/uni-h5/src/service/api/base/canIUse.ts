import { hasOwn } from '@vue/shared'

import {
  API_CAN_I_USE,
  type API_TYPE_CAN_I_USE,
  CanIUseProtocol,
  defineSyncApi,
} from '@dcloudio/uni-api'

function cssSupports(css: string) {
  const supports = window.CSS && window.CSS.supports
  return (
    supports &&
    (supports(css) || supports.apply(window.CSS, css.split(':') as any))
  )
}

export const cssVar = __NODE_JS__ ? true : /*#__PURE__*/ cssSupports('--a:0')
export const cssEnv = __NODE_JS__
  ? true
  : /*#__PURE__*/ cssSupports('top:env(a)')
export const cssConstant = __NODE_JS__
  ? true
  : /*#__PURE__*/ cssSupports('top:constant(a)')
export const cssBackdropFilter = __NODE_JS__
  ? true
  : /*#__PURE__*/ cssSupports('backdrop-filter:blur(10px)')

const SCHEMA_CSS = {
  'css.var': cssVar,
  'css.env': cssEnv,
  'css.constant': cssConstant,
  'css.backdrop-filter': cssBackdropFilter,
}

export const canIUse = defineSyncApi<API_TYPE_CAN_I_USE>(
  API_CAN_I_USE,
  (schema: string) => {
    if (hasOwn(SCHEMA_CSS, schema)) {
      return SCHEMA_CSS[schema]
    }
    if (hasOwn(uni, schema)) {
      return true
    }
    return false
  },
  CanIUseProtocol
)
