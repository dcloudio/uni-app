import moduleAlias from 'module-alias'
import { resolveLib } from '../utils'

const MODULES = [
  'weex-styler',
  'weex-template-compiler',
  '@vue/component-compiler-utils',
  '@vue/component-compiler-utils/package.json',
]
export function initModuleAlias() {
  MODULES.forEach((name) => moduleAlias.addAlias(name, resolveLib(name)))
}
