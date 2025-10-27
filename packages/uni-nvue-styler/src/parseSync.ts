import {
  type Declaration,
  type Helpers,
  type Message,
  type Result,
  Warning,
  type WarningOptions,
} from 'postcss'
import { expand } from './expand'
import { normalize } from './normalize'
import type { NormalizeOptions } from './utils'
import { checkTagName } from './dom2/css'

export interface ParseInlineStyleOptions extends NormalizeOptions {}

export interface ParseStaticStyleDeclarations extends NormalizeOptions {
  tagName?: string
}

class CustomDeclaration {
  constructor(
    public prop: string,
    public value: string | number,
    public important?: boolean
  ) {}
  warn(result: Result, reason: string) {
    result.warn(reason, {
      node: this as unknown as Declaration,
    })
  }
}

class CustomResult {
  messages: Message[] = []
  warn(message: string, options?: WarningOptions) {
    this.messages.push(new Warning(message, options))
  }
}

class CustomHelpers {
  result = new CustomResult() as unknown as Result
}

export function parseStaticStyleDeclarations(
  input: string,
  options: ParseStaticStyleDeclarations = {}
) {
  const styleObj = parseStringStyle(input)
  const declarations: Declaration[] = []
  Object.entries(styleObj).forEach(([key, value]) => {
    const valueString = value + ''
    const important = valueString.includes('!important')
    const decl = new CustomDeclaration(
      key,
      valueString.replace('!important', '').trim(),
      important
    ) as unknown as Declaration
    declarations.push(decl)
  })
  const helpers = new CustomHelpers() as unknown as Helpers
  const expandedDeclarations: Declaration[] = []
  const { Declaration: expandDeclaration } = expand(options)
  if (typeof expandDeclaration === 'function') {
    declarations.forEach((declaration) => {
      expandedDeclarations.push(
        ...visit(helpers, declaration, expandDeclaration)
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
        ...visit(helpers, declaration, normalizeDeclaration)
      )
    })
  } else {
    normalizedDeclarations.push(...expandedDeclarations)
  }
  if (options.tagName) {
    const { Declaration: checkTagNameDeclaration } = checkTagName(
      options.tagName
    )
    if (typeof checkTagNameDeclaration === 'function') {
      normalizedDeclarations.forEach((declaration) => {
        normalizedDeclarations.push(
          ...visit(helpers, declaration, checkTagNameDeclaration)
        )
      })
    }
  }

  return {
    decls: normalizedDeclarations,
    messages: helpers.result.messages,
  }
}

export function parseInlineStyleSync(
  input: string,
  options: ParseInlineStyleOptions = {}
) {
  const normalizedDeclarations = parseStaticStyleDeclarations(
    input,
    options
  ).decls
  const styleEntries = normalizedDeclarations.map(
    ({ prop, value }) => `[${JSON.stringify(prop)}, ${JSON.stringify(value)}]`
  )
  if (styleEntries.length === 0) {
    return
  }
  return `new Map([${styleEntries.join(', ')}])`
}

function visit(
  helpers: CustomHelpers,
  declaration: Declaration,
  transformDecl: (decl: Declaration, helper: Helpers) => void
) {
  let removed = false
  let replaced = false
  const result: Declaration[] = []
  declaration.replaceWith = function (nodes) {
    replaced = true
    result.push(
      // 需要再次封装成 CustomDeclaration，因为内部可能调用 warn
      ...((nodes as Declaration[]).map(
        (node) => new CustomDeclaration(node.prop, node.value, node.important)
      ) as Declaration[])
    )
    return this
  }
  declaration.remove = function () {
    removed = true
    return this
  }
  transformDecl(declaration, helpers as unknown as Helpers)
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
