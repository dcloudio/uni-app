import { SFCDescriptor } from '@vue/compiler-sfc'

export function genScript(
  { script }: SFCDescriptor,
  _options: { filename: string }
) {
  if (!script) {
    return `
export default {}
`
  }
  return (
    '\n'.repeat(script.loc.start.line - 1) +
    `${script.content}
`
  )
}
