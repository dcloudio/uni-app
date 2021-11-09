import type { Plugin, PluginCreator, Rule, AtRule } from 'postcss'
import selectorParser from 'postcss-selector-parser'

const scopedPlugin: PluginCreator<string> = () => {
  return {
    postcssPlugin: 'uni-sfc-scoped',
    prepare({ processor: { plugins } }) {
      const hasVueSfcScoped = !!plugins.find(
        (plugin) => (plugin as Plugin).postcssPlugin === 'vue-sfc-scoped'
      )
      return {
        Rule(rule) {
          processRule(rule, hasVueSfcScoped)
        },
      }
    },
  }
}

const processedRules = new WeakSet<Rule>()

function processRule(rule: Rule, hasVueSfcScoped: boolean) {
  if (
    processedRules.has(rule) ||
    (rule.parent &&
      rule.parent.type === 'atrule' &&
      /-?keyframes$/.test((rule.parent as AtRule).name))
  ) {
    return
  }
  processedRules.add(rule)
  rule.selector = selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      hasVueSfcScoped
        ? rewriteDeprecatedSelector(selector)
        : rewriteSelector(selector, selectorRoot)
    })
  }).processSync(rule.selector)
}

/**
 * @param selector
 * @returns
 */
function rewriteDeprecatedSelector(selector: selectorParser.Selector) {
  const nodes: selectorParser.Node[] = []
  let deepNode: selectorParser.Pseudo | selectorParser.Combinator | undefined
  selector.each((n) => {
    if (deepNode) {
      nodes.push(n)
      selector.removeChild(n)
    } else {
      const { type, value } = n
      if (type === 'pseudo' && value === '::v-deep') {
        deepNode = n as selectorParser.Pseudo
      } else if (
        type === 'combinator' &&
        (value === '>>>' || value === '/deep/')
      ) {
        deepNode = n as selectorParser.Combinator
      }
    }
  })
  if (!deepNode) {
    return
  }
  if (deepNode.type === 'combinator') {
    const index = selector.index(deepNode)
    if (index > 0) {
      selector.insertBefore(deepNode, selectorParser.combinator({ value: ' ' }))
    }
  }
  // remove first combinator
  // ::v-deep a{color:red;} => :deep(a){color:red;}
  const firstNode = nodes[0]
  if (firstNode && firstNode.type === 'combinator' && firstNode.value === ' ') {
    nodes.shift()
  }
  selector.insertBefore(
    deepNode,
    selectorParser.pseudo({
      value: ':deep',
      nodes: [selectorParser.selector({ value: '', nodes })],
    })
  )
  selector.removeChild(deepNode)
}

function rewriteSelector(
  selector: selectorParser.Selector,
  selectorRoot: selectorParser.Root
) {
  let node: selectorParser.Node | null = null
  // find the last child node to insert attribute selector
  selector.each((n) => {
    // DEPRECATED ">>>" and "/deep/" combinator
    if (
      n.type === 'combinator' &&
      (n.value === '>>>' || n.value === '/deep/')
    ) {
      n.value = ' '
      n.spaces.before = n.spaces.after = ''
      // warn(
      //   `the >>> and /deep/ combinators have been deprecated. ` +
      //     `Use :deep() instead.`
      // )
      return false
    }

    if (n.type === 'pseudo') {
      const { value } = n
      // deep: inject [id] attribute at the node before the ::v-deep
      // combinator.
      if (value === ':deep' || value === '::v-deep') {
        if (n.nodes.length) {
          // .foo ::v-deep(.bar) -> .foo[xxxxxxx] .bar
          // replace the current node with ::v-deep's inner selector
          let last: selectorParser.Selector['nodes'][0] = n
          n.nodes[0].each((ss) => {
            selector.insertAfter(last, ss)
            last = ss
          })
          // insert a space combinator before if it doesn't already have one
          const prev = selector.at(selector.index(n) - 1)
          if (!prev || !isSpaceCombinator(prev)) {
            selector.insertAfter(
              n,
              selectorParser.combinator({
                value: ' ',
              })
            )
          }
          selector.removeChild(n)
        } else {
          // DEPRECATED usage
          // .foo ::v-deep .bar -> .foo[xxxxxxx] .bar
          // warn(
          //   `::v-deep usage as a combinator has ` +
          //     `been deprecated. Use :deep(<inner-selector>) instead.`
          // )
          const prev = selector.at(selector.index(n) - 1)
          if (prev && isSpaceCombinator(prev)) {
            selector.removeChild(prev)
          }
          selector.removeChild(n)
        }
        return false
      }

      // slot: use selector inside `::v-slotted` and inject [id + '-s']
      // instead.
      // ::v-slotted(.foo) -> .foo[xxxxxxx-s]
      if (value === ':slotted' || value === '::v-slotted') {
        rewriteSelector(n.nodes[0], selectorRoot)
        let last: selectorParser.Selector['nodes'][0] = n
        n.nodes[0].each((ss) => {
          selector.insertAfter(last, ss)
          last = ss
        })
        // selector.insertAfter(n, n.nodes[0])
        selector.removeChild(n)
        // since slotted attribute already scopes the selector there's no
        // need for the non-slot attribute.
        return false
      }

      // global: replace with inner selector and do not inject [id].
      // ::v-global(.foo) -> .foo
      if (value === ':global' || value === '::v-global') {
        selectorRoot.insertAfter(selector, n.nodes[0])
        selectorRoot.removeChild(selector)
        return false
      }
    }

    if (n.type !== 'pseudo' && n.type !== 'combinator') {
      node = n
    }
  })

  if (node) {
    ;(node as selectorParser.Node).spaces.after = ''
  } else {
    // For deep selectors & standalone pseudo selectors,
    // the attribute selectors are prepended rather than appended.
    // So all leading spaces must be eliminated to avoid problems.
    selector.first.spaces.before = ''
  }
}

function isSpaceCombinator(node: selectorParser.Node) {
  return node.type === 'combinator' && /^\s+$/.test(node.value)
}

scopedPlugin.postcss = true
export default scopedPlugin
