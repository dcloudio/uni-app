import type { Declaration, Rule } from 'postcss'
import { BG_PROPS } from './constants'

function getCssVarNames(value: string) {
  const names: string[] = []
  const cssVarRE = /var\(\s*(--[-_a-zA-Z][-_a-zA-Z0-9]*)/gi
  let match: RegExpExecArray | null
  while ((match = cssVarRE.exec(value))) {
    names.push(match[1])
  }
  return names
}

export function createH5PageBackgroundRule(origRule: Rule) {
  const declarations: Declaration[] = []
  origRule.walkDecls((decl) => {
    declarations.push(decl)
  })

  const cssVarDecls = new Map<string, Declaration>()
  const requiredCssVars = new Set<string>()

  declarations.forEach((decl) => {
    if (decl.prop.startsWith('--')) {
      cssVarDecls.set(decl.prop, decl)
    }
    if (BG_PROPS.indexOf(decl.prop) !== -1) {
      getCssVarNames(decl.value).forEach((name) => {
        requiredCssVars.add(name)
      })
    }
  })

  const pendingCssVars = [...requiredCssVars]
  for (let i = 0; i < pendingCssVars.length; i++) {
    const decl = cssVarDecls.get(pendingCssVars[i])
    if (!decl) {
      continue
    }
    getCssVarNames(decl.value).forEach((name) => {
      if (!requiredCssVars.has(name)) {
        requiredCssVars.add(name)
        pendingCssVars.push(name)
      }
    })
  }

  const bgDecls = declarations
    .filter(
      (decl) =>
        BG_PROPS.indexOf(decl.prop) !== -1 || requiredCssVars.has(decl.prop)
    )
    .map((decl) => decl.clone())

  if (bgDecls.length) {
    const { rule } = require('postcss')
    origRule.after(rule({ selector: 'body' }).append(bgDecls))
  }
}
