import type { Declaration } from 'postcss'
import { expand } from './expand'
import { normalize } from './normalize'
import type { NormalizeOptions } from './utils'

export interface ParseInlineStyleOptions extends NormalizeOptions {}

export function parseInlineStyleSync(
  input: string,
  options: ParseInlineStyleOptions = {}
) {
  const styleObj = parseStringStyle(input)
  const declarations: Declaration[] = []
  Object.entries(styleObj).forEach(([key, value]) => {
    declarations.push({
      prop: key,
      value: value,
    } as Declaration)
  })
  const expandedDeclarations: Declaration[] = []
  const { Declaration: expandDeclaration } = expand(options)
  if (typeof expandDeclaration === 'function') {
    declarations.forEach((declaration) => {
      expandedDeclarations.push(
        ...visit(declaration, expandDeclaration as (decl: Declaration) => void)
      )
    })
  } else {
    expandedDeclarations.push(...declarations)
  }
  const normalizedDeclarations: Declaration[] = []
  const { Declaration: normalizeDeclaration } = normalize(options)
  if (typeof normalizeDeclaration === 'function') {
    expandedDeclarations.forEach((declaration) => {
      normalizedDeclarations.push(
        ...visit(
          declaration,
          normalizeDeclaration as (decl: Declaration) => void
        )
      )
    })
  } else {
    normalizedDeclarations.push(...expandedDeclarations)
  }
  const styleEntries = normalizedDeclarations.map(
    ({ prop, value }) => `['${prop}', ${JSON.stringify(value)}]`
  )
  return `new Map([${styleEntries.join(', ')}])`
}

function visit(
  declaration: Declaration,
  transformDecl: (decl: Declaration) => void
) {
  let removed = false
  let replaced = false
  const result: Declaration[] = []
  declaration.replaceWith = function (nodes) {
    replaced = true
    result.push(...(nodes as Declaration[]))
    return this
  }
  declaration.remove = function () {
    removed = true
    return this
  }
  transformDecl(declaration)
  if (!removed && !replaced) {
    result.push(declaration)
  }
  return result
}

type NormalizedStyle = Record<string, string | number>

const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:([^]+)/
const styleCommentRE = /\/\*[^]*?\*\//g

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  cssText
    .replace(styleCommentRE, '')
    .split(listDelimiterRE)
    .forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE)
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
      }
    })
  return ret
}
