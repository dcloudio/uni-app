import type { Plugin } from 'vite'
export function dynamicImportPolyfill(promise: boolean = false): Plugin {
  return {
    name: 'dynamic-import-polyfill',
    renderDynamicImport() {
      return {
        left: promise ? 'Promise.resolve(' : '(',
        right: ')',
      }
    },
  }
}
