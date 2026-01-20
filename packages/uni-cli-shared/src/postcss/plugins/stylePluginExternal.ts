import type { AtRule, PluginCreator, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'

/**
 * PostCSS plugin to handle :external() pseudo-class
 * Transforms :external(.out-class) into two separate rules:
 *   .out-class { ... }
 *   .out-class-external.out-class-external.out-class-external { ... }
 *
 * This preserves the original class for selector query APIs
 * while using -external suffixed classes for specificity boost
 *
 * Example:
 *   :external(.foo) { color: red; }
 *   ->
 *   .foo { color: red; }
 *   .foo-external.foo-external.foo-external { color: red; }
 */
const externalPlugin: PluginCreator<void> = () => {
  return {
    postcssPlugin: 'uni-external',
    prepare() {
      return {
        Rule(rule) {
          processRule(rule)
        },
      }
    },
  }
}

const processedRules = new WeakSet<Rule>()

function processRule(rule: Rule) {
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

  // Check if the selector contains :external
  if (!rule.selector.includes(':external')) {
    return
  }

  // Check if there are valid :external selectors with single class
  let hasValidExternal = false
  selectorParser((selectorRoot) => {
    selectorRoot.walk((node) => {
      if (node.type === 'pseudo' && node.value === ':external') {
        const innerSelector = node.nodes?.[0] as
          | selectorParser.Selector
          | undefined
        // Only consider valid if it's a single class selector
        if (
          innerSelector?.nodes?.length === 1 &&
          innerSelector.nodes[0].type === 'class'
        ) {
          hasValidExternal = true
        }
      }
    })
  }).processSync(rule.selector)

  if (!hasValidExternal) {
    // Just remove empty :external() without creating new rule
    rule.selector = selectorParser((selectorRoot) => {
      selectorRoot.each((selector) => {
        processSelector(selector, false)
      })
    }).processSync(rule.selector)
    return
  }

  // Only mp and web platforms need the -external suffix rules
  // Other platforms just remove :external() and keep original class
  const platform = process.env.UNI_PLATFORM || ''
  if (!platform.startsWith('mp-') && platform !== 'h5') {
    rule.selector = selectorParser((selectorRoot) => {
      selectorRoot.each((selector) => {
        processSelector(selector, false)
      })
    }).processSync(rule.selector)
    return
  }

  // Clone the rule for the -external version
  const externalRule = rule.clone()
  processedRules.add(externalRule)

  // Process original rule: replace :external(.foo) with .foo
  rule.selector = selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      processSelector(selector, false)
    })
  }).processSync(rule.selector)

  // Process cloned rule: replace :external(.foo) with .foo-external.foo-external.foo-external
  externalRule.selector = selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      processSelector(selector, true)
    })
  }).processSync(externalRule.selector)

  // Insert the external rule after the original rule
  rule.after(externalRule)
}

/**
 * Process a single selector, replacing :external pseudo-classes
 * @param selector - The selector to process
 * @param useExternalSuffix - If true, use -external suffix; if false, use original class
 */
function processSelector(
  selector: selectorParser.Selector,
  useExternalSuffix: boolean
) {
  // Collect all :external pseudo nodes first to avoid mutation during iteration
  const externalNodes: selectorParser.Pseudo[] = []

  selector.walk((node) => {
    if (node.type === 'pseudo' && node.value === ':external') {
      externalNodes.push(node)
    }
  })

  // Process each :external node
  externalNodes.forEach((node) => {
    const parent = node.parent as selectorParser.Selector
    if (!parent) {
      return
    }

    // Get the inner selector
    const innerSelector = node.nodes?.[0] as selectorParser.Selector | undefined
    if (
      !innerSelector ||
      !innerSelector.nodes ||
      innerSelector.nodes.length === 0
    ) {
      // No inner selector, just remove the :external
      parent.removeChild(node)
      return
    }

    // Only handle simple single class selector case: :external(.foo)
    const firstNode = innerSelector.nodes[0]
    if (innerSelector.nodes.length === 1 && firstNode.type === 'class') {
      const originalClass = firstNode.value

      if (useExternalSuffix) {
        // Add three -external suffixed classes: .foo-external.foo-external.foo-external
        for (let i = 0; i < 3; i++) {
          parent.insertBefore(
            node,
            selectorParser.className({
              value: `${originalClass}-external`,
            })
          )
        }
      } else {
        // Keep original class: .foo
        parent.insertBefore(
          node,
          selectorParser.className({
            value: originalClass,
          })
        )
      }
    } else {
      // For complex selectors like :external(.a .b), just extract the inner content
      innerSelector.nodes.forEach((innerNode) => {
        parent.insertBefore(node, innerNode.clone())
      })
    }

    // Remove the :external pseudo
    parent.removeChild(node)
  })
}

externalPlugin.postcss = true
export default externalPlugin
