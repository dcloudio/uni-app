import type { Plugin } from 'vite'
import { UNI_MODULES_EXPORTS } from '../../constants'
import { genUniModulesExports } from '../../uni_modules'

export function uniModulesExportsPlugin({
  enable,
}: {
  enable: boolean
}): Plugin {
  return {
    name: 'uni:modules:exports',
    resolveId(id) {
      if (id === UNI_MODULES_EXPORTS) {
        return UNI_MODULES_EXPORTS
      }
    },
    load(id) {
      if (id !== UNI_MODULES_EXPORTS) {
        return
      }
      // 未启用
      if (!enable) {
        return ''
      }
      return genUniModulesExports()
    },
  }
}
