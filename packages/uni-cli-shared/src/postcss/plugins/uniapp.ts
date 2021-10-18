import { extend } from '@vue/shared'
import { rule, Rule, Declaration, Plugin } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  createRpx2Unit,
  defaultRpx2Unit,
  isBuiltInComponent,
  COMPONENT_SELECTOR_PREFIX,
} from '@dcloudio/uni-shared'

interface UniAppCssProcessorOptions {
  page?: string
  unit?: string // 目标单位，默认rem
  unitRatio?: number // 单位转换比例，默认10/320
  unitPrecision?: number // 单位精度，默认5
}

const defaultUniAppCssProcessorOptions = extend(
  {
    page: 'body',
  },
  defaultRpx2Unit
)

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
  page: string,
  state: { bg: boolean }
) {
  if (selector.type !== 'tag') {
    return
  }
  const { value } = selector
  if (isBuiltInComponent(value)) {
    selector.value = COMPONENT_SELECTOR_PREFIX + value
  } else if (value === 'page') {
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

function walkRules(page: string) {
  return (rule: Rule) => {
    const state = { bg: false }
    rule.selector = selectorParser((selectors) =>
      selectors.walk((selector) => transform(selector, page, state))
    ).processSync(rule.selector)
    state.bg && createBodyBackgroundRule(rule)
  }
}

function walkDecls(rpx2unit: ReturnType<typeof createRpx2Unit>) {
  return (decl: Declaration) => {
    const { value } = decl
    if (value.indexOf('rpx') === -1 && value.indexOf('upx') === -1) {
      return
    }
    decl.value = rpx2unit(decl.value)
  }
}

const uniapp = (opts?: UniAppCssProcessorOptions) => {
  const { page, unit, unitRatio, unitPrecision } = extend(
    {},
    defaultUniAppCssProcessorOptions,
    opts || {}
  )
  const rpx2unit = createRpx2Unit(unit, unitRatio, unitPrecision)
  return {
    postcssPlugin: 'uni-app',
    prepare() {
      return {
        OnceExit(root) {
          root.walkDecls(walkDecls(rpx2unit))
          page && root.walkRules(walkRules(page))
        },
      }
    },
  } as Plugin
}
uniapp.postcss = true
export default uniapp
