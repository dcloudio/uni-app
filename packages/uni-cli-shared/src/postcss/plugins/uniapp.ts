import { extend } from '@vue/shared'
import type { Declaration, Plugin, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import {
  COMPONENT_SELECTOR_PREFIX,
  createRpx2Unit,
  defaultRpx2Unit,
  isBuiltInComponent,
  isDom2WebVueComponentTag,
} from '@dcloudio/uni-shared'
import { BG_PROPS } from './constants'
import { adaptAlipayPageBackground } from './alipayPageBackground'
import { isUniAppXWebVapor } from '../../x'

export interface UniAppCssProcessorOptions {
  unit?: string // 目标单位，默认rem
  unitRatio?: number // 单位转换比例，默认10/320
  unitPrecision?: number // 单位精度，默认5
}

const defaultUniAppCssProcessorOptions = extend({}, defaultRpx2Unit)

function transform(
  selector: selectorParser.Node,
  state: { body: boolean },
  { rewriteTag, vapor }: TransformOptions
) {
  if (selector.type !== 'tag') {
    return
  }

  const { value } = selector
  if (vapor && value !== 'page') {
    rewriteVaporTag(selector)
    return
  }
  selector.value = rewriteTag(value)
  if (value === 'page' && selector.value === 'uni-page-body') {
    state.body = true
  }
}

function createBodyRule(origRule: Rule) {
  const bodyDecls: Declaration[] = []
  origRule.walkDecls((decl) => {
    if (BG_PROPS.indexOf(decl.prop) !== -1) {
      bodyDecls.push(decl.clone())
    }
    // css变量也要提升到body
    if (decl.prop.startsWith('--')) {
      bodyDecls.push(decl.clone())
    }
  })
  if (bodyDecls.length) {
    const { rule } = require('postcss')
    origRule.after(rule({ selector: 'body' }).append(bodyDecls))
  }
}

type RewriteTag = (tag: string) => string

interface TransformOptions {
  rewriteTag: RewriteTag
  vapor?: boolean
}

function rewriteVaporTag(selector: selectorParser.Tag) {
  // 显式命名空间属于原生 CSS，不将 svg|image 等当成 uni 组件。
  if (selector.namespace !== undefined) return
  let tag = selector.value.replace(/^v-uni-/, '')
  if (tag === 'cover-view') tag = 'view'
  if (tag === 'cover-image') tag = 'image'
  if (!isBuiltInComponent(tag) && !isDom2WebVueComponentTag(tag)) return

  let host = 'div'
  if (tag === 'text') host = 'span'
  else if (tag === 'image') host = 'img'
  else if (tag === 'canvas') host = 'canvas'
  // Button、Navigator 会使用 View 或 Text 根，切换分支后仍须匹配。
  else if (tag === 'button' || tag === 'navigator') host = ':is(div,span)'

  // 框架样式及本插件产物可能再次经过此处。统一识别紧邻的纯属性
  // :where，已有身份时只转换宿主；不推导分支、后代或否定选择器。
  const marker = `uni-${tag}`
  const next = selector.next()
  const hasMarker =
    next?.type === 'pseudo' &&
    next.value === ':where' &&
    next.nodes.length === 1 &&
    next.nodes[0].nodes.every((node) => node.type === 'attribute') &&
    next.nodes[0].nodes.some(
      (node) =>
        node.type === 'attribute' &&
        node.attribute === marker &&
        node.namespace === undefined &&
        !node.operator
    )

  // 用 div:where([uni-view]) 而不是 [uni-view]：保留原标签的 (0,0,1)
  // 优先级，避免属性选择器的 (0,1,0) 改变与 class、scoped 样式的覆盖关系。
  // :is(div,span) 同样只有标签权重；已有标识直接参与匹配，不排除复合组件根。
  const nodes = selectorParser().astSync(
    host + (hasMarker ? '' : `:where([${marker}])`)
  ).first!.nodes
  nodes[0].spaces.before = selector.spaces.before
  nodes[nodes.length - 1].spaces.after = selector.spaces.after
  selector.replaceWith(...nodes)
}

function walkRules(options: TransformOptions) {
  return (rule: Rule) => {
    const state = { body: false }
    rule.selector = selectorParser((selectors) =>
      selectors.walk((selector) => transform(selector, state, options))
    ).processSync(rule.selector)
    state.body && createBodyRule(rule)
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
          adaptAlipayPageBackground(root)
          if (rewriteTag) {
            root.walkRules(
              walkRules({
                rewriteTag,
                vapor: isUniAppXWebVapor(),
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
