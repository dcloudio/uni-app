import { SFCScriptBlock } from '@vue/compiler-sfc'

export function genScript(
  script: SFCScriptBlock | null,
  { filename }: { filename: string }
) {
  const parentClass = filename === 'App' ? 'BaseApp' : 'BasePage'
  if (!script) {
    return `
class ${filename} extends ${parentClass} {
    constructor() {}
    render(ctx: ${filename}): VNode | null {
        return ${filename}Render(ctx)
    }
}
export default UTSAndroid.getKotlinClass(${filename})
`
  }
  return (
    '\n'.repeat(script.loc.start.line - 1) +
    `
class ${filename} extends ${parentClass} {
    constructor() {}
    render(ctx: ${filename}): VNode | null {
        return ${filename}Render(ctx)
    }
}
export default UTSAndroid.getKotlinClass(${filename})
`
  )
}
