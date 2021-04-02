import { Rule, Declaration, Plugin } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  isBuiltInComponent,
  COMPONENT_SELECTOR_PREFIX,
} from '@dcloudio/uni-shared'

interface UniAppCssProcessorOptions {
  page?: boolean
  unit: string // 目标单位，默认rem
  unitRatio: number // 单位转换比例，默认10/320
  unitPrecision: number // 单位精度，默认5
}

const defaultUniAppCssProcessorOptions = {
  page: false,
  unit: 'rem',
  unitRatio: 10 / 320,
  unitPrecision: 5,
}

function transform(selector: selectorParser.Node) {
  if (selector.type === 'tag' && isBuiltInComponent(selector.value)) {
    selector.value = COMPONENT_SELECTOR_PREFIX + selector.value
  }
}

function walkRules(opts: UniAppCssProcessorOptions) {
  return (rule: Rule) => {
    rule.selector = selectorParser((selectors) =>
      selectors.walk((selector) => transform(selector))
    ).processSync(rule.selector)
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

function walkDecls(opts: UniAppCssProcessorOptions) {
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
  const options = Object.assign(
    {},
    defaultUniAppCssProcessorOptions,
    opts || {}
  )
  return {
    postcssPlugin: 'uni-app',
    prepare() {
      return {
        OnceExit(root) {
          root.walkRules(walkRules(options))
          root.walkDecls(walkDecls(options))
        },
      }
    },
  } as Plugin
}
uniapp.postcss = true
