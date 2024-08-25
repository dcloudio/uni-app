import type { SFCDescriptor } from '@vue/compiler-sfc'

export function genScript(
  { script }: SFCDescriptor,
  { genDefaultAs }: { genDefaultAs?: string }
) {
  if (!script) {
    return genDefaultScriptCode(genDefaultAs)
  }
  return (
    '\n'.repeat(script.loc.start.line - 1) +
    `${script.content}
`
  )
}

export function genDefaultScriptCode(genDefaultAs?: string) {
  if (genDefaultAs) {
    return `const ${genDefaultAs} = defineComponent({})
export default ${genDefaultAs}`
  }
  return `
export default {}
`
}
