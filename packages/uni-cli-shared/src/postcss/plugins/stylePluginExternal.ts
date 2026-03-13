import type { AtRule, PluginCreator, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { isUniPageFile } from '../../json/pages'
import { findPageExternalClasses } from '../../mp/externalClasses'

/**
 * PostCSS plugin to boost specificity for page CSS based on externalClasses usage
 *
 * For mini-program platforms (mp-*):
 *   - If page has no externalClasses usage: no transformation
 *   - If page has dynamic externalClasses: all selectors get page prefix
 *     .a -> page .a
 *   - If page has only static externalClasses: only matching selectors get page prefix
 *     .foo -> page .foo (if "foo" is in staticClasses)
 *     .bar -> .bar (unchanged, if "bar" is not in staticClasses)
 *
 * This ensures page styles have higher specificity than component styles
 * while minimizing unnecessary transformations for performance
 */
const externalPlugin: PluginCreator<void> = () => {
  return {
    postcssPlugin: 'uni-external',
    prepare() {
      const processedRules = new WeakSet<Rule>()

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
          if (!isUniPageFile(filePath)) {
            return
          }

          // Get page's externalClasses info
          const externalClassesInfo = findPageExternalClasses(filePath)

          let staticClasses = new Set<string>()
          let hasDynamic = false

          if (process.env.NODE_ENV === 'development') {
            hasDynamic = true
          } else if (externalClassesInfo) {
            staticClasses = externalClassesInfo.staticClasses
            if (
              externalClassesInfo.hasDynamic ||
              externalClassesInfo.hasAppAndPageStyle
            ) {
              hasDynamic = true
            }
          }

          // If no static classes and no dynamic, skip processing
          if (staticClasses.size === 0 && !hasDynamic) {
            return
          }

          root.walkRules((rule) => {
            processRule(rule, processedRules, staticClasses, hasDynamic)
          })
        },
      }
    },
  }
}

function processRule(
  rule: Rule,
  processedRules: WeakSet<Rule>,
  staticClasses: Set<string>,
  hasDynamic: boolean
) {
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

  // Process selector based on externalClasses info
  rule.selector = selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      if (hasDynamic) {
        // Dynamic externalClasses: prepend page to all selectors
        prependPageSelector(selector)
      } else {
        // Static only: only prepend page if selector contains any staticClasses
        if (selectorContainsClasses(selector, staticClasses)) {
          prependPageSelector(selector)
        }
      }
    })
  }).processSync(rule.selector)
}

/**
 * Check if selector contains any of the specified classes
 */
function selectorContainsClasses(
  selector: selectorParser.Selector,
  classes: Set<string>
): boolean {
  let found = false
  selector.walk((node) => {
    if (node.type === 'class' && classes.has(node.value)) {
      found = true
      return false // stop walking
    }
  })
  return found
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
