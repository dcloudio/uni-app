import type { Declaration, Node, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { BG_PROPS } from './constants'

const ALIPAY_PAGE_BACKGROUND_SELECTOR = ':root'

function isCssVarDeclaration(decl: Declaration) {
  return decl.prop.startsWith('--')
}

function isDeclaration(node: Node): node is Declaration {
  return node.type === 'decl'
}

function hasCssVarDeclaration(nodes: Node[]) {
  return nodes.some((node) => {
    if (!isDeclaration(node)) {
      return false
    }
    return isCssVarDeclaration(node)
  })
}

function hasBackgroundDeclaration(nodes: Node[]) {
  return nodes.some((node) => {
    if (!isDeclaration(node)) {
      return false
    }
    return BG_PROPS.includes(node.prop)
  })
}

function isPageSelector(selector: selectorParser.Selector) {
  if (selector.nodes.some((node) => node.type === 'combinator')) {
    return false
  }
  const first = selector.nodes[0]
  return !!first && first.type === 'tag' && first.value === 'page'
}

function getPageSelectorInfo(rule: Rule) {
  try {
    const selectorRoot = selectorParser().astSync(rule.selector)
    const pageSelector = selectorRoot.nodes
      .filter(isPageSelector)
      .map((selector) => selector.toString())
      .join(', ')
    if (!pageSelector) {
      return
    }
    const nonPageSelector = selectorRoot.nodes
      .filter((selector) => !isPageSelector(selector))
      .map((selector) => selector.toString())
      .join(', ')
    return {
      pageSelector,
      nonPageSelector,
    }
  } catch {
    return
  }
}

export function createBackgroundRule(origRule: Rule, selector: string) {
  const bgDecls: Declaration[] = []
  const nodes = origRule.nodes ? [...origRule.nodes] : []
  if (!hasCssVarDeclaration(nodes) && !hasBackgroundDeclaration(nodes)) {
    return
  }

  for (const node of nodes) {
    if (node.type !== 'decl') {
      continue
    }
    if (isCssVarDeclaration(node)) {
      bgDecls.push(node.clone())
      node.remove()
      continue
    }
    if (BG_PROPS.includes(node.prop)) {
      bgDecls.push(node.clone())
      node.remove()
    }
  }

  if (!bgDecls.length) {
    return
  }
  const { rule } = require('postcss')
  const backgroundRule = rule({ selector }).append(bgDecls)
  backgroundRule.raws.before = origRule.raws.before || '\n'
  origRule.after(backgroundRule)
  if (!origRule.nodes?.length) {
    origRule.remove()
  }
}

export function adaptAlipayPageBackground(root: Root) {
  if (
    process.env.UNI_PLATFORM !== 'mp-alipay' ||
    process.env.UNI_APP_X !== 'true'
  ) {
    return
  }
  root.walkRules((rule) => {
    const pageSelectorInfo = getPageSelectorInfo(rule)
    if (!pageSelectorInfo) {
      return
    }
    const nodes = rule.nodes ? [...rule.nodes] : []
    if (!hasCssVarDeclaration(nodes) && !hasBackgroundDeclaration(nodes)) {
      return
    }
    if (pageSelectorInfo.nonPageSelector) {
      const pageRule = rule.clone({ selector: pageSelectorInfo.pageSelector })
      pageRule.raws.before = rule.raws.before || '\n'
      rule.selector = pageSelectorInfo.nonPageSelector
      rule.after(pageRule)
      createBackgroundRule(pageRule, ALIPAY_PAGE_BACKGROUND_SELECTOR)
      return
    }
    createBackgroundRule(rule, ALIPAY_PAGE_BACKGROUND_SELECTOR)
  })
}
