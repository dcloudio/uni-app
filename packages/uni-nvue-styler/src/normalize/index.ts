import type { Plugin, Declaration, Helpers, Rule } from 'postcss'
import { camelize, hasOwn, isFunction, isString } from '@vue/shared'
import {
  LENGTH_REGEXP,
  SUPPORT_CSS_UNIT,
  hyphenateStyleProperty,
  isNumber,
} from '../utils'
import { normalizeMap } from './map'

const normalized = Symbol('normalized')

export interface NormalizeOptions {
  descendant?: boolean
  logLevel?: 'NOTE' | 'WARNING' | 'ERROR'
}

export function normalize(opts: NormalizeOptions = {}): Plugin {
  if (!hasOwn(opts, 'descendant')) {
    opts.descendant = false
  }
  if (!hasOwn(opts, 'logLevel')) {
    opts.logLevel = 'WARNING'
  }
  const plugin: Plugin = {
    postcssPlugin: 'nvue:normalize',
    Declaration: createDeclarationProcessor(opts),
  }
  if (__NODE_JS__) {
    plugin.Rule = createRuleProcessor(opts)
  }
  return plugin
}

function createRuleProcessor({ descendant }: NormalizeOptions) {
  return (rule: Rule, helper: Helpers) => {
    if ((rule as any)[normalized]) {
      return
    }
    const regx = descendant
      ? /^((?:(?:\.[A-Za-z0-9_\-]+)+[\+\~\> ])*)((?:\.[A-Za-z0-9_\-\:]+)+)$/
      : /^(\.)([A-Za-z0-9_\-:]+)$/

    rule.selector = rule.selectors
      .filter((selector) => {
        if (regx.test(selector)) {
          return true
        }
        rule.warn(
          helper.result,
          'ERROR: Selector `' +
            selector +
            '` is not supported. nvue only support classname selector'
        )
        return false
      })
      .join(', ')
    if (!rule.selector) {
      rule.remove()
    }
    ;(rule as any)[normalized] = true
  }
}

function createDeclarationProcessor({ logLevel }: NormalizeOptions) {
  return (decl: Declaration, helper: Helpers) => {
    if ((decl as any)[normalized]) {
      return
    }
    decl.prop = camelize(decl.prop)
    const { value, log } = normalizeDecl(decl.prop, decl.value)
    if (isString(value) || isNumber(value)) {
      decl.value = value
    }
    if (log && log.reason && helper) {
      const { reason } = log
      let needLog = false
      if (logLevel === 'NOTE') {
        needLog = true
      } else if (logLevel === 'ERROR') {
        if (reason.startsWith('ERROR:')) {
          needLog = true
        }
      } else {
        if (!reason.startsWith('NOTE:')) {
          needLog = true
        }
      }
      needLog && decl.warn(helper.result, reason)
    }
    if (value === null) {
      decl.remove()
    }
    ;(decl as any)[normalized] = true
  }
}

export function normalizeDecl(name: string, value: string) {
  let result, log
  const normalize = normalizeMap[name]

  if (isFunction(normalize)) {
    if (!isFunction(value)) {
      result = normalize(value)
    } else {
      result = { value: value }
    }
    if (result.reason) {
      log = { reason: result.reason(name, value, result.value) }
    }
  } else {
    // ensure number type, no `px`
    if (isString(value)) {
      const match = value.match(LENGTH_REGEXP)
      if (match && (!match[1] || SUPPORT_CSS_UNIT.indexOf(match[1]) === -1)) {
        value = parseFloat(value) as unknown as string
      }
    }
    result = { value: value }
    log = {
      reason:
        'WARNING: `' +
        hyphenateStyleProperty(name) +
        '` is not a standard property name (may not be supported)',
    }
  }
  return {
    value: result.value,
    log,
  }
}
