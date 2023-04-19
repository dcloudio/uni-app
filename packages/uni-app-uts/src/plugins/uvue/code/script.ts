import { SFCDescriptor } from '@vue/compiler-sfc'

export function genScript(
  { script, styles }: SFCDescriptor,
  { filename }: { filename: string }
) {
  const parentClass = filename === 'App' ? 'BaseApp' : 'BasePage'
  const stylesCode = styles.length ? genStylesCode(filename) : ''
  if (!script) {
    return `
class ${filename} extends ${parentClass} {
    ${stylesCode}
    constructor() {}
    render(ctx: ${filename}): VNode | null {
        return ${filename}Render(ctx)
    }
}
export const ${filename}Class = UTSAndroid.getKotlinClass(${filename})
`
  }
  return (
    '\n'.repeat(script.loc.start.line - 1) +
    `
class ${filename} extends ${parentClass} {
    ${stylesCode}
    constructor() {}
    render(ctx: ${filename}): VNode | null {
        return ${filename}Render(ctx)
    }

}
export const ${filename}Class = UTSAndroid.getKotlinClass(${filename})
`
  )
}

function genStylesCode(filename: string) {
  return `
static $normalizeStyle: Map<string,Map<string, Map<string, any>>> | null = null
override get $styles(): Map<string,Map<string, Map<string, any>>> {
  if (${filename}.$normalizeStyle == null) {
    ${filename}.$normalizeStyle = normalizeCssStyles(${filename}Styles, mutableListOf())
  }
  return ${filename}.$normalizeStyle!
}
`
}
