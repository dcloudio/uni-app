import QuillClass from 'quill'
import { hyphenate } from '@vue/shared'

export default function (Quill: typeof QuillClass) {
  const { Scope, Attributor } = Quill.import('parchment')
  const text = [
    {
      name: 'lineHeight',
      scope: Scope.BLOCK,
    },
    {
      name: 'letterSpacing',
      scope: Scope.INLINE,
    },
    {
      name: 'textDecoration',
      scope: Scope.INLINE,
    },
    {
      name: 'textIndent',
      scope: Scope.BLOCK,
    },
  ]
  const result: Record<string, any> = {}
  text.forEach(({ name, scope }) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), {
      scope,
    })
  })

  return result
}
