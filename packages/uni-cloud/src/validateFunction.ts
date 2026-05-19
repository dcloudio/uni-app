import type { Plugin } from 'vite'
function replaceModuleExports(code: string) {
  return code.replace(/module\.exports\s*=/, 'export default ')
}
export function uniValidateFunctionPlugin(): Plugin {
  return {
    name: 'uni:cloud-vf',
    enforce: 'pre',
    transform: {
      // 仅 validator/validateFunction 需要将 CommonJS 导出改为 ESM。
      filter: { id: /validator\/validateFunction/ },
      handler(code, id) {
        if (id.includes('validator/validateFunction')) {
          return replaceModuleExports(code)
        }
      },
    },
  }
}
