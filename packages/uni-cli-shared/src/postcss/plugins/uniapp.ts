import { extend } from '@vue/shared'
import type { Declaration, Plugin, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  COMPONENT_SELECTOR_PREFIX,
  createRpx2Unit,
  defaultRpx2Unit,
  isBuiltInComponent,
} from '@dcloudio/uni-shared'

export interface UniAppCssProcessorOptions {
  unit?: string // 目标单位，默认rem
  unitRatio?: number // 单位转换比例，默认10/320
  unitPrecision?: number // 单位精度，默认5
}

const defaultUniAppCssProcessorOptions = extend({}, defaultRpx2Unit)

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
  state: { bg: boolean },
  { rewriteTag }: TransformOptions
) {
  if (selector.type !== 'tag') {
    return
  }

  const { value } = selector
  selector.value = rewriteTag(value)
  if (value === 'page' && selector.value === 'uni-page-body') {
    state.bg = true
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
    const { rule } = require('postcss')
    origRule.after(rule({ selector: 'body' }).append(bgDecls))
  }
}

type RewriteTag = (tag: string) => string

interface TransformOptions {
  rewriteTag: RewriteTag
}

function walkRules(options: TransformOptions) {
  return (rule: Rule) => {
    const state = { bg: false }
    rule.selector = selectorParser((selectors) =>
      selectors.walk((selector) => transform(selector, state, options))
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

export function filterPrefersColorScheme(root: Root, force: boolean = false) {
  if (process.env.VUE_APP_DARK_MODE !== 'true') {
    const filePath = root.source?.input.file
    if (force || (filePath && filePath.includes('@dcloudio'))) {
      root.walkAtRules((rule) => {
        if (/prefers-color-scheme\s*:\s*dark/.test(rule.params)) {
          rule.remove()
        }
      })
    }
  }
}

const baiduTags: Record<string, string> = {
  navigator: 'nav',
}

function rewriteBaiduTags(tag: string) {
  return baiduTags[tag] || tag
}

function rewriteUniH5Tags(tag: string) {
  if (tag === 'page') {
    return 'uni-page-body'
  }
  if (isBuiltInComponent(tag)) {
    return COMPONENT_SELECTOR_PREFIX + tag
  }
  return tag
}

function rewriteUniAppTags(tag: string) {
  if (tag === 'page') {
    return 'body'
  }
  if (isBuiltInComponent(tag)) {
    return COMPONENT_SELECTOR_PREFIX + tag
  }
  return tag
}

const transforms: Record<string, RewriteTag | undefined> = {
  h5: rewriteUniH5Tags,
  app: rewriteUniAppTags,
  'app-harmony': rewriteUniAppTags,
  'mp-baidu': rewriteBaiduTags,
}

const uniapp = (opts?: UniAppCssProcessorOptions) => {
  const platform = process.env.UNI_PLATFORM
  const { unit, unitRatio, unitPrecision } = extend(
    {},
    defaultUniAppCssProcessorOptions,
    opts
  )
  const rpx2unit = createRpx2Unit(unit, unitRatio, unitPrecision)
  return {
    postcssPlugin: 'uni-app',
    prepare() {
      return {
        OnceExit(root) {
          root.walkDecls(walkDecls(rpx2unit))
          const rewriteTag = transforms[platform]
          filterPrefersColorScheme(root)
          if (rewriteTag) {
            root.walkRules(
              walkRules({
                rewriteTag,
              })
            )
          }
        },
      }
    },
  } as Plugin
}
uniapp.postcss = true
export default uniapp
