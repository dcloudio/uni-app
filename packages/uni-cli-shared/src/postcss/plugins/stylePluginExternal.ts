import type { AtRule, PluginCreator, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { isUniPageFile } from '../../json/pages'

/**
 * PostCSS plugin to boost specificity for page CSS
 *
 * For mini-program platforms (mp-*):
 *   .a -> page .a
 *   .b .c -> page .b .c
 *
 * This ensures page styles have higher specificity than component styles
 */
const externalPlugin: PluginCreator<void> = () => {
  return {
    postcssPlugin: 'uni-external',
    prepare() {
      const processedRules = new WeakSet<Rule>()
      let isPageFile = false

      return {
        OnceExit(root: Root) {
          // Only mini-program platforms need page selector prepend
          const platform = process.env.UNI_PLATFORM || ''
          if (!platform.startsWith('mp-')) {
            return
          }

          // Get file path from postcss source
          const filePath = root.source?.input?.file
          if (!filePath) {
            return
          }

          // Only process page files
          isPageFile = isUniPageFile(filePath)
          if (!isPageFile) {
            return
          }

          root.walkRules((rule) => {
            processRule(rule, processedRules)
          })
        },
      }
    },
  }
}

function processRule(rule: Rule, processedRules: WeakSet<Rule>) {
  // Skip already processed rules
  if (processedRules.has(rule)) {
    return
  }
  // Skip keyframes rules
  if (
    rule.parent &&
    rule.parent.type === 'atrule' &&
    /-?keyframes$/.test((rule.parent as AtRule).name)
  ) {
    return
  }
  processedRules.add(rule)

  // Prepend 'page' selector
  rule.selector = selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      prependPageSelector(selector)
    })
  }).processSync(rule.selector)
}

/**
 * Prepend 'page' selector for mini-program platforms
 * .a -> page .a
 * .b .c -> page .b .c
 */
function prependPageSelector(selector: selectorParser.Selector) {
  // Skip if selector already starts with 'page'
  const firstNode = selector.first
  if (firstNode && firstNode.type === 'tag' && firstNode.value === 'page') {
    return
  }

  // Insert 'page' tag and a combinator (space) at the beginning
  selector.prepend(selectorParser.combinator({ value: ' ' }))
  selector.prepend(selectorParser.tag({ value: 'page' }))
}

externalPlugin.postcss = true
export default externalPlugin
