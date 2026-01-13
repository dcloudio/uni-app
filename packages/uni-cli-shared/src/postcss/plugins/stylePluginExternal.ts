import type { AtRule, PluginCreator, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'

/**
 * PostCSS plugin to handle :external() pseudo-class
 * Transforms :external(.out-class) to .out-class,.out-class-external.out-class-external.out-class-external
 * to increase specificity weight while preserving the original class for selector query APIs
 *
 * Example:
 *   :external(.foo) -> .foo,.foo-external.foo-external.foo-external
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

  rule.selector = selectorParser((selectorRoot) => {
    rewriteExternalSelectors(selectorRoot)
  }).processSync(rule.selector)
}

/**
 * Rewrite :external(.class) to .class,.class-external.class-external.class-external
 * Creates two selectors: one with original class, one with -external suffixed classes for specificity
 */
function rewriteExternalSelectors(selectorRoot: selectorParser.Root) {
  const newSelectors: selectorParser.Selector[] = []

  selectorRoot.each((selector) => {
    // Check if this selector contains valid :external with class
    let hasValidExternal = false
    selector.walk((node) => {
      if (node.type === 'pseudo' && node.value === ':external') {
        const innerSelector = node.nodes?.[0] as
          | selectorParser.Selector
          | undefined
        if (
          innerSelector?.nodes?.length &&
          innerSelector.nodes[0].type === 'class'
        ) {
          hasValidExternal = true
          return false // stop walking
        }
      }
    })

    if (!hasValidExternal) {
      // Remove empty :external() without cloning
      processSelector(selector, false)
      return
    }

    // Clone the selector for the -external version
    const externalSelector = selector.clone() as selectorParser.Selector

    // Process original selector: replace :external(.foo) with .foo
    processSelector(selector, false)

    // Process cloned selector: replace :external(.foo) with .foo-external.foo-external.foo-external
    processSelector(externalSelector, true)

    // Add the external selector to be appended later
    newSelectors.push(externalSelector)
  })

  // Append all new selectors
  newSelectors.forEach((sel) => {
    selectorRoot.append(sel)
  })
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

    // Only handle simple class selector case: :external(.foo)
    const firstNode = innerSelector.nodes[0]
    if (firstNode.type === 'class') {
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
    }

    // Remove the :external pseudo
    parent.removeChild(node)
  })
}

externalPlugin.postcss = true
export default externalPlugin
