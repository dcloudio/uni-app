import type { Declaration, Node, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { BG_PROPS } from './constants'

const ALIPAY_PAGE_BACKGROUND_SELECTOR = ':root > :is(body)'

function isCssVarDeclaration(decl: Declaration) {
  return decl.prop.startsWith('--')
}

function isDeclaration(node: Node): node is Declaration {
  return node.type === 'decl'
}

function shouldMirrorCssVars(nodes: Node[]) {
  return nodes.some((node) => {
    if (!isDeclaration(node)) {
      return false
    }
    return BG_PROPS.includes(node.prop) && node.value.includes('var(')
  })
}

function isPageRule(rule: Rule) {
  try {
    const selectorRoot = selectorParser().astSync(rule.selector)
    if (selectorRoot.nodes.length !== 1) {
      return false
    }
    const selector = selectorRoot.nodes[0]
    if (selector.nodes.some((node) => node.type === 'combinator')) {
      return false
    }
    const first = selector.nodes[0]
    return !!first && first.type === 'tag' && first.value === 'page'
  } catch {
    return false
  }
}

export function createBackgroundRule(origRule: Rule, selector: string) {
  const bgDecls: Declaration[] = []
  const nodes = origRule.nodes ? [...origRule.nodes] : []
  let hasBackgroundDecl = false
  const mirrorCssVars = shouldMirrorCssVars(nodes)

  for (const node of nodes) {
    if (node.type !== 'decl') {
      continue
    }
    if (BG_PROPS.includes(node.prop)) {
      hasBackgroundDecl = true
    }
  }

  if (!hasBackgroundDecl) {
    return
  }

  for (const node of nodes) {
    if (node.type !== 'decl') {
      continue
    }
    if (BG_PROPS.includes(node.prop)) {
      bgDecls.push(node.clone())
      node.remove()
      continue
    }
    if (mirrorCssVars && isCssVarDeclaration(node)) {
      bgDecls.push(node.clone())
      node.remove()
    }
  }

  if (!bgDecls.length) {
    return
  }
  const { rule } = require('postcss')
  origRule.after(rule({ selector }).append(bgDecls))
}

export function adaptAlipayPageBackground(root: Root) {
  if (
    process.env.UNI_PLATFORM !== 'mp-alipay' ||
    process.env.UNI_APP_X !== 'true'
  ) {
    return
  }
  root.walkRules((rule) => {
    if (isPageRule(rule)) {
      createBackgroundRule(rule, ALIPAY_PAGE_BACKGROUND_SELECTOR)
    }
  })
}
