import type { Plugin } from 'vite'

export function uniStatusBarHeightPlugin(): Plugin {
  return {
    name: 'uni:mp-status-bar-height',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('main.uts')) {
        return
      }

      const reg =
        /(?:const|let|var)\s+(\w+)\s*=\s*createSSRApp\s*\(([^)]*)\);?/g
      let match
      let offset = 0
      let newCode = code

      while ((match = reg.exec(code)) !== null) {
        const varName = match[1]
        const insertPos = match.index + match[0].length + offset
        const insertLine = `\n${varName}.config.globalProperties.u_s_b_h = uni.getSystemInfo().statusBarHeight;\n`
        newCode =
          newCode.slice(0, insertPos) + insertLine + newCode.slice(insertPos)
        offset += insertLine.length
      }

      if (newCode !== code) {
        return {
          code: newCode,
          map: null,
        }
      }
    },
  }
}
