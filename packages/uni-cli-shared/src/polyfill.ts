import { isGloballyAllowed } from '@dcloudio/uni-shared'
function polyfill() {
  const shared = require('@vue/shared')
  shared.isGloballyAllowed = isGloballyAllowed
  shared.isGloballyWhitelisted = isGloballyAllowed
}

polyfill()
