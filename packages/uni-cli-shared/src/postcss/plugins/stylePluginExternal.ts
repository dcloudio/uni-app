import type { AtRule, PluginCreator, Root, Rule } from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { isUniPageFile } from '../../json/pages'
import {
  findPageExternalClasses,
  isAlipayStyleIsolationClass,
  isAlipayXStyleIsolation,
} from '../../mp/externalClasses'
import { isAppVue } from '../../utils'

/**
 * 基于页面 externalClasses 使用情况提升页面样式优先级
 *
 * 小程序平台（mp-*）：
 *   - 页面没有使用 externalClasses：不做转换
 *   - 页面存在动态 externalClasses：选择器最后一个 class 追加 [class]
 *     .a -> .a[class]
 *   - 页面只有静态 externalClasses：仅命中静态 class 的选择器追加 [class]
 *     .foo -> .foo[class]（foo 在 staticClasses 中）
 *     .bar -> .bar（bar 不在 staticClasses 中）
 *
 * 追加 [class] 可以提升 class 选择器优先级，同时避免原先插入 page 带来的结构影响。
 */
const externalPlugin: PluginCreator<void> = () => {
  return {
    postcssPlugin: 'uni-external',
    prepare() {
      const processedRules = new WeakSet<Rule>()

      return {
        OnceExit(root: Root) {
          // 只有小程序平台需要处理 externalClasses 的样式优先级
          const platform = process.env.UNI_PLATFORM || ''
          if (!platform.startsWith('mp-')) {
            return
          }

          // 支付宝 ACSS 不支持 [class]，隔离 2.0 使用来源前缀完成样式命中控制。
          if (isAlipayXStyleIsolation()) {
            processAlipayStyleIsolation(root)
            return
          }

          // 从 postcss source 中获取当前样式所属文件
          const filePath = root.source?.input?.file
          if (!filePath) {
            return
          }
          // 只处理页面文件，组件文件保持原样
          if (!isUniPageFile(filePath)) {
            return
          }

          // 获取页面中收集到的 externalClasses 使用信息
          const externalClassesInfo = findPageExternalClasses(filePath)

          let staticClasses = new Set<string>()
          let hasDynamic = false

          if (process.env.NODE_ENV === 'development') {
            hasDynamic = true
          } else if (externalClassesInfo) {
            staticClasses = externalClassesInfo.staticClasses
            if (
              externalClassesInfo.hasDynamic ||
              externalClassesInfo.hasAppAndPageStyle
            ) {
              hasDynamic = true
            }
          }

          // 没有静态 class，也没有动态绑定时，直接跳过，避免无意义遍历
          if (staticClasses.size === 0 && !hasDynamic) {
            return
          }

          root.walkRules((rule) => {
            processRule(rule, processedRules, staticClasses, hasDynamic)
          })
        },
      }
    },
  }
}

/**
 * 单 class 选择器按 App、页面、组件来源改写为不同前缀；页面额外补 page 提权，
 * 从而在同名 class 下保持“页面 > 组件 > App”。复杂选择器继续遵循支付宝原生行为。
 */
function processAlipayStyleIsolation(root: Root) {
  const filePath = root.source?.input?.file
  if (!filePath) {
    return
  }
  const prefix = isAppVue(filePath)
    ? '-a-'
    : isUniPageFile(filePath)
    ? '-p-'
    : '-c-'
  const isPage = prefix === '-p-'

  root.walkRules((rule) => {
    if (
      rule.parent?.type === 'atrule' &&
      /-?keyframes$/.test((rule.parent as AtRule).name)
    ) {
      return
    }
    rule.selector = selectorParser((selectorRoot) => {
      selectorRoot.each((selector) => {
        // 所有静态 CSS class 都要校验，防止用户 class 与内部隔离键冲突。
        selector.walkClasses((classNode) => {
          if (isAlipayStyleIsolationClass(classNode.value)) {
            throw rule.error(
              `支付宝小程序样式隔离不允许 class 使用保留前缀：${classNode.value}`
            )
          }
        })
        if (selector.nodes.length !== 1 || selector.nodes[0].type !== 'class') {
          return
        }
        selector.nodes[0].value = prefix + selector.nodes[0].value
        if (isPage) {
          selector.prepend(selectorParser.combinator({ value: ' ' }))
          selector.prepend(selectorParser.tag({ value: 'page' }))
        }
      })
    }).processSync(rule.selector)
  })
}

function processRule(
  rule: Rule,
  processedRules: WeakSet<Rule>,
  staticClasses: Set<string>,
  hasDynamic: boolean
) {
  // 同一个 Rule 只处理一次，避免被重复追加 [class]
  if (processedRules.has(rule)) {
    return
  }
  // keyframes 内部的 from/to 不是普通选择器，不能处理
  if (
    rule.parent &&
    rule.parent.type === 'atrule' &&
    /-?keyframes$/.test((rule.parent as AtRule).name)
  ) {
    return
  }
  processedRules.add(rule)

  // 根据 externalClasses 情况处理选择器
  rule.selector = selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      let classNode: selectorParser.ClassName | undefined
      if (hasDynamic) {
        // 动态绑定无法提前知道具体 class，所有包含 class 的选择器都提升优先级
        classNode = findLastClassNode(selector)
      } else {
        // 静态绑定只处理命中 staticClasses 的选择器，减少无关 CSS 变更
        classNode = findLastClassNode(selector, staticClasses)
      }
      if (classNode) {
        appendClassAttribute(selector, classNode)
      }
    })
  }).processSync(rule.selector)
}

/**
 * 找到选择器最右侧的 class 节点。
 * 传入 classes 时，仅在选择器包含目标 class 后才返回最右侧 class，
 * 这样 .a .b 在命中 .a 时也能输出 .a .b[class]，符合整体提权预期。
 */
function findLastClassNode(
  selector: selectorParser.Selector,
  classes?: Set<string>
): selectorParser.ClassName | undefined {
  let lastClassNode: selectorParser.ClassName | undefined
  for (let i = selector.nodes.length - 1; i >= 0; i--) {
    const node = selector.nodes[i]
    if (node.type !== 'class') {
      continue
    }
    if (!lastClassNode) {
      lastClassNode = node
    }
    if (!classes || classes.has(node.value)) {
      return lastClassNode
    }
  }
}

/**
 * 在 class 后追加 [class] 提升优先级。
 * .a -> .a[class]
 * .a[class] -> .a[class][class]
 * .a .b -> .a .b[class]
 */
function appendClassAttribute(
  selector: selectorParser.Selector,
  classNode: selectorParser.ClassName
) {
  selector.insertAfter(
    classNode,
    selectorParser.attribute({
      attribute: 'class',
      value: undefined,
      raws: {},
    })
  )
}

externalPlugin.postcss = true
export default externalPlugin
