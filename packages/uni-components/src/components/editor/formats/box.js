import { hyphenate } from '@vue/shared'

export default function(Quill) {
  const { Scope, Attributor } = Quill.import('parchment')
  const config = {
    scope: Scope.BLOCK
  }
  const margin = [
    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight'
  ]
  const padding = [
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight'
  ]
  const result = {}
  margin.concat(padding).forEach(name => {
    result[`formats/${name}`] = new Attributor.Style(
      name,
      hyphenate(name),
      config
    )
  })

  return result
}
