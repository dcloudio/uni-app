import { Plugin } from 'rollup'

export const buildPluginDynamicImport: Plugin = {
  name: 'uni:dynamic-import-polyfill',
  renderDynamicImport() {
    return {
      left: 'dynamicImportPolyfill(',
      right: ')'
    }
  }
}
