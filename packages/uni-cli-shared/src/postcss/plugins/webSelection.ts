import type { AtRule, Root } from 'postcss'
import selectorParser from 'postcss-selector-parser'

const contentRoot = ':where([uni-rich-text], [uni-editor])'

// 只扩展 Web Vapor 富文本和编辑器根节点的选区，不影响同名 class 的其他节点。
// 在作用域 CSS 处理之后运行，保证作用域属性保留在组件根节点上，
// 不会被添加到富文本解析器或编辑器生成的后代节点上。
export function expandWebSelection(root: Root) {
  root.walkRules((rule) => {
    if (!/::selection/i.test(rule.selector)) return
    if (
      rule.parent?.type === 'atrule' &&
      /keyframes$/i.test((rule.parent as AtRule).name)
    ) {
      return
    }

    const additions = new Set<string>()
    selectorParser((selectors) => {
      selectors.each((selector) => {
        const nodes = selector.nodes.filter((node) => node.type !== 'comment')
        const selection = nodes[nodes.length - 1]
        if (
          selection?.type !== 'pseudo' ||
          selection.value.toLowerCase() !== '::selection'
        ) {
          return
        }
        const target = nodes[nodes.length - 2]
        // 独立选择器和通配选择器已经可以作用于内容节点，重复处理时不再扩展。
        if (
          !target ||
          target.type === 'combinator' ||
          target.type === 'universal' ||
          (target.type === 'pseudo' && target.value.startsWith('::'))
        ) {
          return
        }

        const expanded = selector.clone()
        const pseudo = expanded.at(selector.index(selection))!
        const marker = selectorParser()
          .astSync(contentRoot)
          .first!.first!.clone()
        expanded.insertBefore(pseudo, marker)
        expanded.insertBefore(pseudo, selectorParser.combinator({ value: ' ' }))
        expanded.insertBefore(pseudo, selectorParser.universal({ value: '*' }))
        additions.add(expanded.toString().trim())
      })
    }).processSync(rule.selector)
    if (!additions.size) return

    // 单独生成规则，保证不支持 :where() 的浏览器仍能使用原始规则；
    // 再次处理 CSS 时识别相邻的副本，避免重复生成。
    const selector = [...additions].join(',\n')
    const next = rule.next()
    if (
      next?.type === 'rule' &&
      next.selector === selector &&
      next.nodes.map((node) => node.toString()).join('\n') ===
        rule.nodes.map((node) => node.toString()).join('\n')
    ) {
      return
    }
    rule.cloneAfter({ selector })
  })
}
