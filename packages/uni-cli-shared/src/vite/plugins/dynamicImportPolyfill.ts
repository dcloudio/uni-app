import type { Plugin } from 'vite'

interface DynamicImportPolyfillPlugin extends Plugin {
  renderDynamicImport(): { left: string; right: string }
}

export function dynamicImportPolyfill(
  promise: boolean = false
): DynamicImportPolyfillPlugin {
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
