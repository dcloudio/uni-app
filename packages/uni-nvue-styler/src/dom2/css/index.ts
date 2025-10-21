import type { Plugin } from 'postcss'
import cssPropertyTags from './tags'

export function checkTagName(tagName: string): Plugin {
  const plugin: Plugin = {
    postcssPlugin: `dom2:checkTagName`,
    Declaration(decl, helper) {
      const name = (decl as any).__originalProp || decl.prop
      const tags = cssPropertyTags.get(name)
      if (!tags) {
        return
      }
      if (!tags.includes(tagName)) {
        decl.warn(
          helper.result,
          `WARNING: property \`${name}\` is only supported on \`${tags
            .map((tag) => `<${tag}>`)
            .join('|')}\``
        )
        decl.remove()
      }
    },
  }
  return plugin
}
