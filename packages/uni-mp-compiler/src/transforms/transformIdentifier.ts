import {
  type AttributeNode,
  type ComponentNode,
  type DirectiveNode,
  ElementTypes,
  NodeTypes,
  type RootNode,
  type SimpleExpressionNode,
  type TemplateChildNode,
  baseParse,
  createCompoundExpression,
  createSimpleExpression,
  isSlotOutlet,
} from '@vue/compiler-core'
import type { ParserPlugin } from '@babel/parser'
import type { NodeTransform, TransformContext } from '../transform'
import {
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_ANIMATION,
  ATTR_SET_ELEMENT_STYLE,
  ATTR_VUE_SLOTS,
  FILTER_MODULE_NAME,
  addUniViewAutoImportFilter,
  isFilterExpr,
  rewriteExpression,
} from './utils'
import {
  createVirtualHostClass,
  findStaticClassIndex,
  isClassBinding,
  rewriteClass,
} from './transformClass'
import {
  createVirtualHostStyle,
  findStaticStyleIndex,
  isStyleBinding,
  rewriteStyle,
} from './transformStyle'
import {
  createVirtualHostHidden,
  findStaticHiddenIndex,
  isHiddenBinding,
  rewriteHidden,
} from './transformHidden'
import {
  createVirtualHostId,
  findStaticIdIndex,
  isIdBinding,
  rewriteId,
} from './transformId'
import { MERGE_PART_CLASS, TO_DISPLAY_STRING } from '../runtimeHelpers'
import { rewriteSlot } from './transformSlot'
import { rewriteVSlot } from './vSlot'
import { rewriteRef } from './transformRef'
import {
  isPropsBinding,
  rewriteBinding,
  rewritePropsBinding,
} from './transformComponent'
import {
  addPageExternalClasses,
  clearMiniProgramComponentStyleIsolation,
  findMiniProgramComponentExternalClasses,
  formatAlipayStyleIsolationClasses,
  getAlipayStyleIsolationClassMask,
  getGlobalComponentSource,
  hasExternalClasses,
  isAlipayXStyleIsolation,
  isAttributeNode,
  isDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
  isUserComponent,
  matchEasycom,
  parseExternalClasses,
  parseProgram,
  parseStyleIsolation,
  updateMiniProgramComponentExternalClasses,
  updateMiniProgramComponentStyleIsolation,
} from '@dcloudio/uni-cli-shared'
import { isUniPageFile } from '@dcloudio/uni-cli-shared'
import fs from 'fs'
import { parse as sfcParse } from '@vue/compiler-sfc'

import { rewriteId as rewriteIdX } from './transformUniElement'

// externalClasses 缓存，包含 mtime 用于检测文件变化
const UNI_APP_STYLE_CLASSES =
  process.env.UNI_APP_STYLE_ISOLATION_VERSION === '2' &&
  process.env.UNI_APP_X === 'true' &&
  process.env.UNI_PLATFORM?.startsWith('mp-')

export const transformIdentifier: NodeTransform = (node, context) => {
  return function transformIdentifier() {
    if (node.type === NodeTypes.INTERPOLATION) {
      const content = node.content
      let isFilter = isFilterExpr(content, context)
      if (!isFilter) {
        node.content = rewriteExpression(
          createCompoundExpression([
            `${context.helperString(TO_DISPLAY_STRING)}(`,
            content,
            `)`,
          ]),
          context
        )
      }
    } else if (isSlotOutlet(node)) {
      rewriteSlot(node, context)
    } else if (isElementNode(node)) {
      let hasClassBinding = false
      let hasStyleBinding = false
      let hasHiddenBinding = false
      let hasIdBinding = false

      const { props, tagType } = node
      const virtualHost = !!(
        context.miniProgram.component?.mergeVirtualHostAttributes &&
        context.rootNode === node
      )

      const isElement = tagType === ElementTypes.ELEMENT
      rewriteRef(node, context)

      if (context.isX) {
        if (virtualHost) {
          for (let i = 0; i < props.length; i++) {
            const dir = props[i]
            if (isDirectiveNode(dir)) {
              if (isIdBinding(dir)) {
                hasIdBinding = true
                rewriteId(i, dir, props, virtualHost, context, true)
              }
            }
          }
          if (!hasIdBinding) {
            hasIdBinding = true
            props.push(createVirtualHostId(props, context, true))
          }
          const staticIdIndex = findStaticIdIndex(props)
          if (staticIdIndex > -1) {
            props.splice(staticIdIndex, 1)
          }
        }
        rewriteIdX(node, context)
      }
      // 获取组件的 externalClasses，用于后续跳过已处理的绑定
      let externalClasses: string[] = []
      if (isUserComponent(node, context)) {
        externalClasses = getExternalClasses(
          node as ComponentNode,
          context.filename,
          context.expressionPlugins
        )
        // 收集页面使用的 externalClasses 信息（静态值和是否有动态绑定）
        if (
          UNI_APP_STYLE_CLASSES &&
          context.filename &&
          isUniPageFile(context.filename)
        ) {
          let hasAppAndPageStyle = false
          // 仅发行模式下检测
          if (process.env.NODE_ENV !== 'development') {
            const source = resolveSource(node as ComponentNode)
            if (source) {
              hasAppAndPageStyle = checkComponentAppAndPageIsolation(
                source,
                context
              )
            }
          }

          if (externalClasses.length > 0 || hasAppAndPageStyle) {
            collectPageExternalClasses(
              context.filename,
              node as ComponentNode,
              externalClasses,
              hasAppAndPageStyle
            )
          }
        }
        // 微信小程序不需要处理 externalClasses
        if (process.env.UNI_PLATFORM === 'mp-weixin') {
          externalClasses = []
        }
        rewriteAlipayStyleIsolationClasses(node, context)
        rewriteAlipayStaticExternalClasses(node, context, externalClasses)
        rewriteBinding(
          node as ComponentNode,
          context,
          externalClasses,
          isAlipayXStyleIsolation()
        )
      } else {
        rewriteAlipayStyleIsolationClasses(node, context)
      }

      let elementId: string = ''
      let skipIndex: number[] = []
      // 第一步：在 x 中，先处理 id 属性，用于提前获取 elementId 对应的变量名
      if (context.isX) {
        for (let i = 0; i < props.length; i++) {
          const dir = props[i]
          if (isDirectiveNode(dir)) {
            const { arg, exp } = dir
            if (arg && exp && isSimpleExpressionNode(arg)) {
              if (arg.content === 'id' || arg.content === ATTR_ELEMENT_ID) {
                dir.exp = rewriteExpression(exp, context)
                elementId = (dir.exp as SimpleExpressionNode).content
                skipIndex.push(i)
              }
            }
          }
        }
      }

      // 合并part class到class内
      if (context.isX && isElement) {
        const partProp = props.find((prop) => {
          if (isDirectiveNode(prop)) {
            const { arg } = prop
            if (arg && isSimpleExpressionNode(arg)) {
              return arg.content === 'part'
            }
          } else {
            return prop.name === 'part'
          }
        })
        if (partProp) {
          const classProp = props.find((prop) => {
            if (isDirectiveNode(prop)) {
              const { arg } = prop
              if (arg && isSimpleExpressionNode(arg)) {
                return arg.content === 'class'
              }
            } else {
              return prop.name === 'class'
            }
            return false
          })
          if (classProp == null) {
            const newClassDirExpr = rewriteExpression(
              createCompoundExpression([
                context.helperString(MERGE_PART_CLASS),
                `(`,
                isDirectiveNode(partProp)
                  ? partProp.exp!
                  : createSimpleExpression(
                      `'${partProp.value?.content || ''}'`
                    ),
                `)`,
              ]),
              context
            )
            props.push({
              type: NodeTypes.DIRECTIVE,
              name: 'bind',
              exp: newClassDirExpr,
              arg: createSimpleExpression('class', true),
              modifiers: [],
              loc: partProp.loc,
            })
            skipIndex.push(props.length - 1)
          } else if (isDirectiveNode(classProp)) {
            const originalClassExpr = classProp.exp!
            classProp.exp = rewriteExpression(
              createCompoundExpression([
                context.helperString(MERGE_PART_CLASS),
                `(`,
                isDirectiveNode(partProp)
                  ? partProp.exp!
                  : createSimpleExpression(
                      `'${partProp.value?.content || ''}'`
                    ),
                `, `,
                originalClassExpr,
                `)`,
              ]),
              context
            )
            skipIndex.push(props.indexOf(classProp))
          } else {
            const staticClass = classProp.value?.content || ''
            const newClassDirExpr = rewriteExpression(
              createCompoundExpression([
                context.helperString(MERGE_PART_CLASS),
                `(`,
                isDirectiveNode(partProp)
                  ? partProp.exp!
                  : createSimpleExpression(
                      `'${partProp.value?.content || ''}'`
                    ),
                `, '${staticClass}')`,
              ]),
              context
            )
            const classPropIndex = props.indexOf(classProp)
            props.splice(classPropIndex, 1, {
              type: NodeTypes.DIRECTIVE,
              name: 'bind',
              exp: newClassDirExpr,
              arg: createSimpleExpression('class', true),
              modifiers: [],
              loc: classProp.loc,
            })
            skipIndex.push(classPropIndex)
          }
          // part 合并后的 class 会跳过普通属性循环，需要在此补一次 SJS 展开。
          for (const index of skipIndex) {
            const prop = props[index]
            if (isDirectiveNode(prop) && isClassBinding(prop)) {
              wrapAlipayStyleIsolationClass(prop, context)
            }
          }
        }
      }

      for (let i = 0; i < props.length; i++) {
        if (context.isX) {
          // 已经处理过了
          if (skipIndex.includes(i)) {
            continue
          }
        }
        const dir = props[i]
        if (isDirectiveNode(dir)) {
          const arg = dir.arg
          if (arg) {
            // TODO 指令暂不不支持动态参数,v-bind:[arg] v-on:[event]
            if (!(isSimpleExpressionNode(arg) && arg.isStatic)) {
              // v-slot:[slotName] 支持
              if (dir.name === 'slot') {
                rewriteVSlot(dir, context)
              } else {
                props.splice(i, 1)
                i--
                continue
              }
            }
          }
          const exp = dir.exp
          if (exp) {
            if (isBuiltIn(dir)) {
              // noop
            } else if (isAlipayExternalClassBinding(dir, externalClasses)) {
              wrapAlipayExternalClass(dir, context)
            } else if (
              context.isX &&
              isAlipayXStyleIsolation() &&
              isAlipayStyleIsolationClassAttribute(node, dir)
            ) {
              wrapAlipayStyleIsolationClassAttribute(dir, context)
            } else if (isClassBinding(dir)) {
              hasClassBinding = true
              rewriteClass(i, dir, props, virtualHost, context)
              wrapAlipayStyleIsolationClass(dir, context)
            } else if (isStyleBinding(dir)) {
              hasStyleBinding = true
              rewriteStyle(i, dir, props, virtualHost, context, elementId)
            } else if (isHiddenBinding(dir)) {
              hasHiddenBinding = true
              rewriteHidden(i, dir, props, virtualHost, context)
            } else if (isIdBinding(dir)) {
              hasIdBinding = true
              rewriteId(i, dir, props, virtualHost, context)
            } else if (isPropsBinding(dir)) {
              rewritePropsBinding(dir, node, context)
            } else {
              if (
                context.isX &&
                elementId &&
                arg &&
                isSimpleExpressionNode(arg)
              ) {
                if (arg.content === ATTR_SET_ELEMENT_STYLE) {
                  dir.exp = createSimpleExpression(`$eS[${elementId}]`)
                } else if (arg.content === ATTR_SET_ELEMENT_ANIMATION) {
                  dir.exp = createSimpleExpression(`$eA[${elementId}]`)
                } else {
                  dir.exp = rewriteExpression(exp, context)
                }
              } else {
                dir.exp = rewriteExpression(exp, context)
              }
            }
          }
        }
      }
      if (virtualHost) {
        if (!hasClassBinding) {
          hasClassBinding = true
          const classProp = createVirtualHostClass(props, context)
          wrapAlipayStyleIsolationClass(classProp, context)
          props.push(classProp)
        }
        if (!hasStyleBinding) {
          hasStyleBinding = true
          props.push(createVirtualHostStyle(props, context))
        }
        if (!hasHiddenBinding) {
          hasHiddenBinding = true
          props.push(createVirtualHostHidden(props, context))
        }
        if (!hasIdBinding) {
          hasIdBinding = true
          props.push(createVirtualHostId(props, context))
        }
      }
      if (hasClassBinding) {
        const staticClassIndex = findStaticClassIndex(props)
        if (staticClassIndex > -1) {
          props.splice(staticClassIndex, 1)
        }
      }
      if (hasStyleBinding) {
        const staticStyleIndex = findStaticStyleIndex(props)
        if (staticStyleIndex > -1) {
          props.splice(staticStyleIndex, 1)
        }
      }
      if (hasHiddenBinding) {
        const staticHiddenIndex = findStaticHiddenIndex(props)
        if (staticHiddenIndex > -1) {
          props.splice(staticHiddenIndex, 1)
        }
      }
      if (hasIdBinding) {
        const staticIdIndex = findStaticIdIndex(props)
        if (staticIdIndex > -1) {
          props.splice(staticIdIndex, 1)
        }
      }
    }
  }
}

/**
 * 支付宝不支持微信的 [class] 隔离方式，仅在支付宝样式隔离 2.0 下展开普通 class。
 * 有动态 class、part 或 virtual host 时统一交给一次 SJS 处理，避免静态前缀重复生成。
 */
function rewriteAlipayStyleIsolationClasses(
  node: TemplateChildNode,
  context: TransformContext
) {
  if (
    !context.isX ||
    !isAlipayXStyleIsolation() ||
    !context.filename ||
    !isElementNode(node)
  ) {
    return
  }
  const mask = getAlipayStyleIsolationClassMask(context.filename)
  const hasRuntimeClass =
    node.props.some(
      (prop) =>
        (isDirectiveNode(prop) &&
          (isClassBinding(prop) ||
            (prop.name === 'bind' &&
              prop.arg &&
              isSimpleExpressionNode(prop.arg) &&
              prop.arg.content === 'part'))) ||
        prop.name === 'part'
    ) ||
    !!(
      context.miniProgram.component?.mergeVirtualHostAttributes &&
      context.rootNode === node
    )

  for (const prop of node.props) {
    if (isAttributeNode(prop) && prop.name === 'class' && prop.value?.content) {
      // mask 为 0 时只做保留前缀校验，实际展开留给后续合并后的动态 class。
      prop.value.content = formatAlipayStyleIsolationClasses(
        prop.value.content,
        hasRuntimeClass ? 0 : mask
      )
    } else if (
      isAttributeNode(prop) &&
      isAlipayStyleIsolationClassAttribute(node, prop) &&
      prop.value?.content &&
      !(prop.name === 'hover-class' && prop.value.content === 'none')
    ) {
      // 这些属性由小程序运行时把值作为 class 应用到真实节点，必须和普通 class 使用相同的作用域前缀。
      // hover-class 的 none 是平台控制值，不能按普通 class 展开；其他属性没有该特殊语义。
      prop.value.content = formatAlipayStyleIsolationClasses(
        prop.value.content,
        mask
      )
    }
  }
}

function wrapAlipayStyleIsolationClass(
  prop: DirectiveNode,
  context: TransformContext
) {
  if (!context.isX || !isAlipayXStyleIsolation() || !prop.exp) {
    return
  }
  addUniViewAutoImportFilter(context)
  const mask = getAlipayStyleIsolationClassMask(context.filename)
  // 先复用原有表达式重写，再在视图层调用 SJS，避免把 _ctx 等逻辑层标识符输出到模板。
  prop.exp = rewriteExpression(
    createCompoundExpression([
      createSimpleExpression(FILTER_MODULE_NAME),
      '.c(',
      prop.exp,
      `,${mask})`,
    ]),
    context
  )
}

function wrapAlipayStyleIsolationClassAttribute(
  prop: DirectiveNode,
  context: TransformContext
) {
  addUniViewAutoImportFilter(context)
  const mask = getAlipayStyleIsolationClassMask(context.filename)
  const exp = rewriteExpression(prop.exp!, context)
  const name = (prop.arg as SimpleExpressionNode).content
  const helper = name === 'hover-class' ? 'h' : 'c'
  // 动态值先复用普通属性的逻辑层变量提取，再由 SJS 展开作用域前缀；
  // 只有 hover-class 使用专用 helper 保留 none，其他原生 class 属性直接复用 uV.c。
  prop.exp = rewriteExpression(
    createCompoundExpression([
      createSimpleExpression(FILTER_MODULE_NAME),
      `.${helper}(`,
      exp,
      `,${mask})`,
    ]),
    context
  )
}

function isAlipayStyleIsolationClassAttribute(
  node: TemplateChildNode,
  prop: DirectiveNode | AttributeNode
) {
  if (!isElementNode(node) || node.tagType !== ElementTypes.ELEMENT) {
    return false
  }
  const name = isAttributeNode(prop)
    ? prop.name
    : prop.name === 'bind' &&
      prop.arg &&
      isSimpleExpressionNode(prop.arg) &&
      prop.arg.isStatic
    ? prop.arg.content
    : ''
  const matched =
    name === 'hover-class' ||
    (name === 'placeholder-class' &&
      (node.tag === 'input' || node.tag === 'textarea'))
  return matched
}

/**
 * externalClass 由子组件的静态声明确定，调用点只负责按调用方作用域展开。
 * 这里不保留原 class，防止值进入子组件普通 :class 后被错误补成子组件本地 class。
 */
function rewriteAlipayStaticExternalClasses(
  node: ComponentNode,
  context: TransformContext,
  externalClasses: string[]
) {
  if (!context.isX || !isAlipayXStyleIsolation() || !externalClasses.length) {
    return
  }
  const mask = getAlipayStyleIsolationClassMask(context.filename)
  for (const prop of node.props) {
    if (
      isAttributeNode(prop) &&
      externalClasses.includes(prop.name) &&
      prop.value?.content
    ) {
      prop.value.content = formatAlipayStyleIsolationClasses(
        prop.value.content,
        mask,
        false
      )
    }
  }
}

function isAlipayExternalClassBinding(
  prop: DirectiveNode,
  externalClasses: string[]
) {
  return (
    isAlipayXStyleIsolation() &&
    prop.name === 'bind' &&
    !!prop.arg &&
    isSimpleExpressionNode(prop.arg) &&
    prop.arg.isStatic &&
    externalClasses.includes(prop.arg.content)
  )
}

function wrapAlipayExternalClass(
  prop: DirectiveNode,
  context: TransformContext
) {
  addUniViewAutoImportFilter(context)
  const mask = getAlipayStyleIsolationClassMask(context.filename)
  const exp = rewriteExpression(prop.exp!, context)
  // 第三个参数关闭原 class 输出；uV.c 对已展开前缀保持幂等，可安全支持多级组件转发。
  prop.exp = rewriteExpression(
    createCompoundExpression([
      createSimpleExpression(FILTER_MODULE_NAME),
      '.c(',
      exp,
      `,${mask},0)`,
    ]),
    context
  )
}

const builtInProps = [ATTR_VUE_SLOTS]

function isBuiltIn({ arg, exp }: DirectiveNode) {
  return (
    arg &&
    isSimpleExpressionNode(arg) &&
    builtInProps.includes(arg.content) &&
    exp &&
    isSimpleExpressionNode(exp)
  )
}

/**
 * 获取组件的 externalClasses
 * @param source 组件文件绝对路径
 * @param babelParserPlugins babel parser 插件
 * @returns externalClasses 数组，未找到时返回 undefined
 */
function getComponentExternalClasses(
  source: string,
  parentFile: string,
  babelParserPlugins?: ParserPlugin[]
): string[] | undefined {
  if (!UNI_APP_STYLE_CLASSES) {
    return undefined
  }
  let mtime: number
  try {
    mtime = fs.statSync(source).mtimeMs
  } catch {
    return undefined
  }

  const cached = findMiniProgramComponentExternalClasses(source)
  if (cached && cached.mtime === mtime) {
    return cached.classes
  }

  let code: string
  try {
    code = fs.readFileSync(source, 'utf-8')
  } catch {
    return undefined
  }

  if (!hasExternalClasses(code) && !code.includes('styleIsolation')) {
    updateMiniProgramComponentExternalClasses(source, { mtime, classes: [] })
    return []
  }

  let scriptContent: string
  if (source) {
    const { descriptor } = sfcParse(code, { filename: source })
    scriptContent =
      descriptor.scriptSetup?.content || descriptor.script?.content || ''
  } else {
    scriptContent = code
  }

  if (
    !scriptContent ||
    (!hasExternalClasses(scriptContent) &&
      !scriptContent.includes('styleIsolation'))
  ) {
    updateMiniProgramComponentExternalClasses(source, { mtime, classes: [] })
    return []
  }
  let program
  try {
    program = parseProgram(scriptContent, source, {
      babelParserPlugins,
    })
  } catch (error) {}
  if (program) {
    // 页面解析子组件 externalClasses 时已经完成文件读取和 AST 解析，
    // 同步缓存 styleIsolation，确保后续子组件模板编译能直接得到正确的 class mask。
    const styleIsolation = parseStyleIsolation(program)
    if (styleIsolation) {
      updateMiniProgramComponentStyleIsolation(source, styleIsolation)
    } else {
      clearMiniProgramComponentStyleIsolation(source)
    }
    const classes = parseExternalClasses(program)
    updateMiniProgramComponentExternalClasses(source, { mtime, classes })
    return classes
  }
}

function getExternalClasses(
  node: ComponentNode,
  parentFile: string,
  babelParserPlugins?: ParserPlugin[]
): string[] {
  // @ts-expect-error importSource 是编译时扩展的属性
  const importSource: string | undefined = node.importSource
  if (importSource) {
    if (fs.existsSync(importSource)) {
      return (
        getComponentExternalClasses(
          importSource,
          parentFile,
          babelParserPlugins
        ) || []
      )
    }
    // 尝试添加扩展名
    for (const ext of ['.uvue', '.vue']) {
      const fullPath = importSource + ext
      if (fs.existsSync(fullPath)) {
        return (
          getComponentExternalClasses(
            fullPath,
            parentFile,
            babelParserPlugins
          ) || []
        )
      }
    }
  }

  const tag = node.tag

  const easycomSource = matchEasycom(tag)
  if (easycomSource) {
    return (
      getComponentExternalClasses(
        easycomSource,
        parentFile,
        babelParserPlugins
      ) || []
    )
  }

  const globalComponentSource = getGlobalComponentSource(tag)
  if (globalComponentSource) {
    return (
      getComponentExternalClasses(
        globalComponentSource,
        parentFile,
        babelParserPlugins
      ) || []
    )
  }

  return []
}

function resolveSource(node: ComponentNode): string | undefined {
  // @ts-expect-error importSource 是编译时扩展的属性
  const importSource: string | undefined = node.importSource
  if (importSource) {
    if (fs.existsSync(importSource)) {
      return importSource
    }
    // 尝试添加扩展名
    for (const ext of ['.uvue', '.vue']) {
      const fullPath = importSource + ext
      if (fs.existsSync(fullPath)) {
        return fullPath
      }
    }
  }

  const tag = node.tag

  const easycomSource = matchEasycom(tag)
  if (easycomSource) {
    return easycomSource
  }

  const globalComponentSource = getGlobalComponentSource(tag)
  if (globalComponentSource) {
    return globalComponentSource
  }
}

function checkComponentAppAndPageIsolation(
  source: string,
  context: TransformContext
): boolean {
  return checkRecursive(source, new Set(), context)
}

function checkRecursive(
  source: string,
  visited: Set<string>,
  context: TransformContext
): boolean {
  if (visited.has(source)) {
    return false
  }
  visited.add(source)

  try {
    const code = fs.readFileSync(source, 'utf-8')
    if (code.includes('styleIsolation') && code.includes('app-and-page')) {
      return true
    }

    const { descriptor } = sfcParse(code, { filename: source })

    const template = descriptor.template?.content || ''
    const ast = baseParse(template)

    const nodeTags = new Set<RootNode | TemplateChildNode>()
    const walk = (node: any) => {
      if (node.type === 1) {
        // Element
        nodeTags.add(node)
        node.children.forEach(walk)
      } else if (node.type === 11) {
        // For
        node.children.forEach(walk)
      } else if (node.type === 9) {
        // If
        node.branches.forEach(walk)
      }
    }
    ast.children.forEach(walk)

    for (const nodeTag of nodeTags) {
      let childSource
      if (isUserComponent(nodeTag, context)) {
        childSource = resolveSource(nodeTag)
      }

      if (childSource && fs.existsSync(childSource)) {
        if (checkRecursive(childSource, visited, context)) {
          return true
        }
      }
    }
  } catch (e) {}
  return false
}

/**
 * 收集页面使用的 externalClasses 信息
 * @param filename 页面文件路径
 * @param node 组件节点
 * @param externalClasses 组件定义的 externalClasses 数组
 */
function collectPageExternalClasses(
  filename: string,
  node: ComponentNode,
  externalClasses: string[],
  hasAppAndPageStyle: boolean = false
) {
  const staticClasses: string[] = []
  let hasDynamic = false

  for (const prop of node.props) {
    if (isAttributeNode(prop)) {
      // 静态属性，如 my-class="foo"
      if (externalClasses.includes(prop.name) && prop.value?.content) {
        // 可能有多个 class，如 my-class="foo bar"
        const classes = prop.value.content.split(/\s+/).filter(Boolean)
        staticClasses.push(...classes)
      }
    } else if (isDirectiveNode(prop) && prop.name === 'bind') {
      // 动态绑定，如 :my-class="bar"
      const { arg } = prop
      if (arg && isSimpleExpressionNode(arg) && arg.isStatic) {
        if (externalClasses.includes(arg.content)) {
          hasDynamic = true
        }
      }
    }
  }

  if (staticClasses.length > 0 || hasDynamic || hasAppAndPageStyle) {
    addPageExternalClasses(
      filename,
      staticClasses,
      hasDynamic,
      hasAppAndPageStyle
    )
  }
}
