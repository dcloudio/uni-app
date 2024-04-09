import type { Plugin } from 'vite'
function replaceModuleExports(code: string) {
  return code.replace(/module\.exports\s*=/, 'export default ')
}
export function uniValidateFunctionPlugin(): Plugin {
  return {
    name: 'uni:cloud-vf',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('validator/validateFunction')) {
        return replaceModuleExports(code)
      }
    },
  }
}
