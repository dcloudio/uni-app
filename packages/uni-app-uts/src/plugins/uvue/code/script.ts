import { SFCDescriptor } from '@vue/compiler-sfc'

export function genScript(
  { script }: SFCDescriptor,
  { filename }: { filename: string }
) {
  if (!script) {
    return `
export default {}
export const ${filename}Class = UTSAndroid.getKotlinClass(${filename})
`
  }
  return (
    '\n'.repeat(script.loc.start.line - 1) +
    `${script.content}
export const ${filename}Class = UTSAndroid.getKotlinClass(${filename})
`
  )
}
