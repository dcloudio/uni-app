import { extend } from '@vue/shared'
import { rule, Rule, Declaration, Plugin } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  isBuiltInComponent,
  COMPONENT_SELECTOR_PREFIX,
} from '@dcloudio/uni-shared'

interface UniAppCssProcessorOptions {
  page?: string
  unit?: string // 目标单位，默认rem
  unitRatio?: number // 单位转换比例，默认10/320
  unitPrecision?: number // 单位精度，默认5
}

const defaultUniAppCssProcessorOptions = {
  page: 'body',
  unit: 'rem',
  unitRatio: 10 / 320,
  unitPrecision: 5,
}

const BG_PROPS = [
  'background',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
  'background-attachment',
]

function transform(
  selector: selectorParser.Node,
  opts: UniAppCssProcessorOptions,
  state: { bg: boolean }
) {
  if (selector.type !== 'tag') {
    return
  }
  const { value } = selector
  if (isBuiltInComponent(value)) {
    selector.value = COMPONENT_SELECTOR_PREFIX + value
  } else if (value === 'page') {
    const { page } = opts
    if (!page) {
      return
    }
    selector.value = page
    if (page !== 'body') {
      state.bg = true
    }
  }
}

function createBodyBackgroundRule(origRule: Rule) {
  const bgDecls: Declaration[] = []
  origRule.walkDecls((decl) => {
    if (BG_PROPS.indexOf(decl.prop) !== -1) {
      bgDecls.push(decl.clone())
    }
  })
  if (bgDecls.length) {
    origRule.after(rule({ selector: 'body' }).append(bgDecls))
  }
}

function walkRules(opts: UniAppCssProcessorOptions) {
  return (rule: Rule) => {
    const state = { bg: false }
    rule.selector = selectorParser((selectors) =>
      selectors.walk((selector) => transform(selector, opts, state))
    ).processSync(rule.selector)
    state.bg && createBodyBackgroundRule(rule)
  }
}

const unitRE = new RegExp(
  `"[^"]+"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px`,
  'g'
)

function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

function walkDecls(opts: Required<UniAppCssProcessorOptions>) {
  return (decl: Declaration) => {
    const { value } = decl
    if (value.indexOf('rpx') === -1 && value.indexOf('upx') === -1) {
      return
    }
    decl.value = decl.value.replace(unitRE, (m, $1) => {
      if (!$1) {
        return m
      }
      const value = toFixed(parseFloat($1) * opts.unitRatio, opts.unitPrecision)
      return value === 0 ? '0' : `${value}${opts.unit}`
    })
  }
}

export const uniapp = (opts?: UniAppCssProcessorOptions) => {
  const options = extend({}, defaultUniAppCssProcessorOptions, opts || {})
  return {
    postcssPlugin: 'uni-app',
    prepare() {
      return {
        OnceExit(root) {
          root.walkDecls(walkDecls(options))
          root.walkRules(walkRules(options))
        },
      }
    },
  } as Plugin
}
uniapp.postcss = true
