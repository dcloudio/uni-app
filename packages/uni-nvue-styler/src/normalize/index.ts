import { camelize, hasOwn, isFunction, isString } from '@vue/shared'
import type { Declaration, Helpers, Plugin, Rule } from 'postcss'
import {
  COMBINATORS_RE,
  LENGTH_REGEXP,
  type NormalizeOptions,
  SUPPORT_CSS_UNIT,
  hyphenateStyleProperty,
  isNumber,
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
    plugin.Rule = createRuleProcessor(opts)
  }
  return plugin
}

function createRuleProcessor(opts: NormalizeOptions = {}) {
  return (rule: Rule, helper: Helpers) => {
    if ((rule as any)[normalized]) {
      return
    }
    rule.selector = rule.selectors
      .map((selector) => {
        const isUvue = opts.type === 'uvue'
        if (isUvue) {
          // 特殊处理 ::v-deep 选择器 和 ::v-deep(.xxx) 写法
          const hasVDeep = selector.includes('::v-deep')
          const hasDeepMethod = selector.includes(':deep(')
          if (hasVDeep) {
            selector = selector.replace(/::v-deep/g, '')
          }
          if (hasDeepMethod) {
            selector = selector.replace(/:deep\(([^)]+)\)/g, '$1')
          }
        }
        // 移除组合符周围的空格，合并多个空格
        selector = selector
          .replace(/\s*([\+\~\>])\s*/g, '$1')
          .replace(/\s+/g, ' ')
        // 组合符号
        if (COMBINATORS_RE.test(selector)) {
          return selector
        }
        let type = opts.type || 'nvue'
        rule.warn(
          helper.result,
          'ERROR: Selector `' +
            selector +
            '` is not supported. ' +
            type +
            ' only support classname selector'
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
    if (decl.prop.startsWith('--')) {
      return
    } else {
      decl.prop = camelize(decl.prop)
    }
    const { value, log } = normalizeDecl(decl, options)
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

export function normalizeDecl(decl: Declaration, options: NormalizeOptions) {
  let { prop: name, value } = decl
  let result, log
  const normalize = getNormalizeMap(options)[name]

  if (options.type === 'uvue') {
    if (hasCssVar(value)) {
      return {
        value: normalizeCssVar(value),
        log,
      }
    }
  }

  if (isFunction(normalize)) {
    if (!isFunction(value)) {
      result = normalize(value, options, {
        atRule: decl.parent?.type === 'atrule' ? (decl.parent as any).name : '',
      })
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

function hasCssVar(value: string) {
  return value.includes('var(')
}

function normalizeCssVar(value: string) {
  return value
    .replaceAll(`var(--window-top)`, `CSS_VAR_WINDOW_TOP`)
    .replaceAll(`var(--window-bottom)`, `CSS_VAR_WINDOW_BOTTOM`)
    .replaceAll(`var(--status-bar-height)`, `CSS_VAR_STATUS_BAR_HEIGHT`)
}
