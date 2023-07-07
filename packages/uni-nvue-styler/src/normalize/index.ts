import type { Plugin, Declaration, Helpers, Rule } from 'postcss'
import { camelize, hasOwn, isFunction, isString } from '@vue/shared'
import {
  LENGTH_REGEXP,
  SUPPORT_CSS_UNIT,
  hyphenateStyleProperty,
  isNumber,
  COMBINATORS_RE,
  NormalizeOptions,
} from '../utils'
import { getNormalizeMap } from './map'

const normalized = Symbol('normalized')

export function normalize(opts: NormalizeOptions = {}): Plugin {
  if (!hasOwn(opts, 'logLevel')) {
    opts.logLevel = 'WARNING'
  }
  const plugin: Plugin = {
    postcssPlugin: `${opts.type || 'nvue'}:normalize`,
    Declaration: createDeclarationProcessor(opts),
  }
  if (__NODE_JS__) {
    plugin.Rule = createRuleProcessor()
  }
  return plugin
}

function createRuleProcessor() {
  return (rule: Rule, helper: Helpers) => {
    if ((rule as any)[normalized]) {
      return
    }
    rule.selector = rule.selectors
      .map((selector) => {
        selector = selector
          .replace(/\s*([\+\~\>])\s*/g, '$1')
          .replace(/\s+/, ' ')
        if (COMBINATORS_RE.test(selector)) {
          return selector
        }
        rule.warn(
          helper.result,
          'ERROR: Selector `' +
            selector +
            '` is not supported. nvue only support classname selector'
        )
        return ''
      })
      .filter(Boolean)
      .join(', ')
    if (!rule.selector) {
      rule.remove()
    }
    ;(rule as any)[normalized] = true
  }
}

function createDeclarationProcessor(options: NormalizeOptions) {
  return (decl: Declaration, helper: Helpers) => {
    if ((decl as any)[normalized]) {
      return
    }
    decl.prop = camelize(decl.prop)
    const { value, log } = normalizeDecl(decl.prop, decl.value, options)
    if (isString(value) || isNumber(value)) {
      decl.value = value
    }
    if (log && log.reason && helper) {
      const { reason } = log
      let needLog = false
      if (options.logLevel === 'NOTE') {
        needLog = true
      } else if (options.logLevel === 'ERROR') {
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

export function normalizeDecl(
  name: string,
  value: string,
  options: NormalizeOptions
) {
  let result, log
  const normalize = getNormalizeMap(options)[name]

  if (isFunction(normalize)) {
    if (!isFunction(value)) {
      result = normalize(value, options)
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
