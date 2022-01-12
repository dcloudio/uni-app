import type { Plugin } from 'vite'
export function dynamicImportPolyfill(): Plugin {
  return {
    name: 'dynamic-import-polyfill',
    renderDynamicImport() {
      return {
        left: '(',
        right: ')',
      }
    },
  }
}
