import { kebabCase } from 'uni-shared'

export default function (Quill) {
  const { Scope, Attributor } = Quill.import('parchment')
  const config = {
    scope: Scope.INLINE
  }
  const font = ['font', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'fontFamily']
  const result = {}
  font.forEach(name => {
    result[`formats/${name}`] = new Attributor.Style(name, kebabCase(name), config)
  })

  return result
}
