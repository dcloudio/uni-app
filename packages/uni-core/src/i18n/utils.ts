import { once } from '@dcloudio/uni-shared'

export const isEnableLocale = /*#__PURE__*/ once(
  () =>
    typeof __uniConfig !== 'undefined' &&
    __uniConfig.locales &&
    !!Object.keys(__uniConfig.locales).length
)
