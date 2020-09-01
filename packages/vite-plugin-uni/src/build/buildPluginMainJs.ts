import { Plugin } from 'rollup'
import { getRoot, isMainJs, wrapperMainCode } from '../utils'

let transformed = false
export const buildPluginMainJs: Plugin = {
  name: 'uni:main',
  async transform(code: string, id: string) {
    if (!transformed && isMainJs(id)) {
      code = wrapperMainCode(code, getRoot(id))
      transformed = true
    }
    return { code }
  }
}
