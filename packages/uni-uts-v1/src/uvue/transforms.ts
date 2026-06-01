import { existsSync, readFileSync } from 'fs-extra'
import { isAbsolute, parse as parsePath, resolve } from 'path'

import { parse } from '../../../uni-cli-shared/lib/@vue/compiler-sfc'

const {
  preprocess: preprocessHtml,
} = require('../../../uni-cli-shared/lib/preprocess')

const enum NodeTypes {
  ELEMENT = 1,
  COMMENT = 3,
  ATTRIBUTE = 6,
}

interface TemplateNode {
  type: NodeTypes
  tag?: string
  content?: string
  props?: TemplateNode[]
  children?: TemplateNode[]
  name?: string
  value?: {
    content: string
  }
  loc: {
    start: {
      line: number
      column: number
      offset: number
    }
    end: {
      line: number
      column: number
      offset: number
    }
  }
}

interface TemplateRoot extends TemplateNode {
  children: TemplateNode[]
}

export interface VueCodePosition {
  line: number
  column: number
}

export interface VueCodeEditRange {
  start: VueCodePosition
  end: VueCodePosition
  /**
   * 调用方替换时建议只移除非换行字符，用于尽量保持错误定位和调试行号不变。
   */
  preserveLineBreaks: true
  /**
   * 开始范围包含首个子节点前的缩进，调用方需要保留这段缩进，避免改变子节点格式。
   */
  preserveEndIndent?: true
}

export type VueCodeEditRangesResult = Record<string, VueCodeEditRange[]>

/**
 * 批量定位由 `#ifdef APP` 包裹的根 scroll-view 需要移除的范围。
 * 只返回需要修改的行列号，不修改文件，也不返回修改后的文件内容。
 */
export function resolveAppRootScrollViewEditRanges(
  vueFiles: string[],
  inputDir: string
): VueCodeEditRangesResult {
  const result: VueCodeEditRangesResult = {}

  vueFiles.forEach((file) => {
    const filename = resolveVueFilename(inputDir, file)
    if (!existsSync(filename)) {
      return
    }
    const content = readFileSync(filename, 'utf8')
    const ranges = resolveAppRootScrollViewEditRangesByCode(content, filename)
    if (ranges.length) {
      result[file] = ranges
    }
  })

  return result
}

function resolveVueFilename(inputDir: string, file: string) {
  if (isAbsolute(file)) {
    const root = parsePath(file).root
    // HBuilderX/uni-app 里页面路径可能写成 `/pages/a/b.uvue`，
    // 这种是项目内绝对路径，不是磁盘绝对路径，需要仍然基于 inputDir 解析。
    if (root === '/' || root === '\\') {
      return resolve(inputDir, removeLeadingRootSlash(file))
    }
    return file
  }
  return resolve(inputDir, file)
}

function removeLeadingRootSlash(file: string) {
  let index = 0
  while (file.charAt(index) === '/' || file.charAt(index) === '\\') {
    index++
  }
  return file.slice(index)
}

export function resolveAppRootScrollViewEditRangesByCode(
  code: string,
  filename: string
): VueCodeEditRange[] {
  const template = parseSfcTemplate(code, filename)
  if (!template) {
    return []
  }

  const children = template.ast.children
  if (children.length !== 3) {
    return []
  }

  const [ifdefNode, scrollViewNode, endifNode] = children
  if (
    !isAppIfdefComment(ifdefNode) ||
    !isRootScrollView(scrollViewNode) ||
    !isEndifComment(endifNode)
  ) {
    return []
  }

  // 使用项目既有的条件编译实现先跑一遍，再交给 Vue 编译器确认 APP 分支根节点。
  if (!isPreprocessedRootScrollView(template.content, filename)) {
    return []
  }

  return createRootScrollViewEditRanges(ifdefNode, scrollViewNode, endifNode)
}

function parseSfcTemplate(code: string, filename: string) {
  const { descriptor, errors } = parse(code, {
    filename,
    sourceMap: false,
  })
  if (errors.length || !descriptor.template?.ast) {
    return
  }
  return {
    content: descriptor.template.content,
    ast: descriptor.template.ast as unknown as TemplateRoot,
  }
}

function isPreprocessedRootScrollView(content: string, filename: string) {
  try {
    const preprocessed = preprocessHtml(content, createAppPreContext(), {
      type: 'html',
    })
    const template = parseSfcTemplate(
      `<template>${preprocessed}</template>`,
      filename
    )
    const root = template?.ast.children[0]
    return (
      !!root && template.ast.children.length === 1 && root.tag === 'scroll-view'
    )
  } catch (e) {
    return false
  }
}

function createAppPreContext() {
  // 这里只声明本函数需要的 APP/UVue 上下文，避免改动全局条件编译上下文。
  return {
    APP: true,
    APP_UVUE: true,
    UNI_APP_X: true,
    VUE3: true,
    VUE3_VAPOR: true,
  }
}

function isAppIfdefComment(node: TemplateNode) {
  return (
    node.type === NodeTypes.COMMENT && node.content?.trim() === '#ifdef APP'
  )
}

function isEndifComment(node: TemplateNode) {
  return node.type === NodeTypes.COMMENT && node.content?.trim() === '#endif'
}

function isRootScrollView(node: TemplateNode) {
  return (
    node.type === NodeTypes.ELEMENT &&
    node.tag === 'scroll-view' &&
    hasOnlyFlexStyle(node)
  )
}

function hasOnlyFlexStyle(node: TemplateNode) {
  if (!node.props || node.props.length !== 1) {
    return false
  }
  const style = node.props[0]
  return (
    style.type === NodeTypes.ATTRIBUTE &&
    style.name === 'style' &&
    !!style.value &&
    normalizeFlexStyle(style.value.content) === 'flex:1'
  )
}

function normalizeFlexStyle(style: string) {
  let normalized = ''
  for (let i = 0; i < style.length; i++) {
    const char = style.charAt(i)
    if (char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
      normalized += char
    }
  }
  if (normalized.endsWith(';')) {
    return normalized.slice(0, -1)
  }
  return normalized
}

function createRootScrollViewEditRanges(
  ifdefNode: TemplateNode,
  scrollViewNode: TemplateNode,
  endifNode: TemplateNode
): VueCodeEditRange[] {
  const children = scrollViewNode.children || []

  if (!children.length) {
    return [createEditRange(ifdefNode, endifNode)]
  }

  const firstChild = children[0]
  const lastChild = children[children.length - 1]

  // 兼容如下写法：条件编译分别包裹 scroll-view 的开始标签和结束标签。
  // <!-- #ifdef APP -->
  // <scroll-view style="flex:1">
  // <!-- #endif -->
  //   ...
  // <!-- #ifdef APP -->
  // </scroll-view>
  // <!-- #endif -->
  if (isEndifComment(firstChild) && isAppIfdefComment(lastChild)) {
    return [
      createEditRangeByLoc(ifdefNode.loc.start, firstChild.loc.end),
      createEditRangeByLoc(lastChild.loc.start, endifNode.loc.end),
    ]
  }

  return [
    createEditRangeByLoc(ifdefNode.loc.start, firstChild.loc.start, true),
    createEditRangeByLoc(lastChild.loc.end, endifNode.loc.end),
  ]
}

function createEditRange(startNode: TemplateNode, endNode: TemplateNode) {
  return createEditRangeByLoc(startNode.loc.start, endNode.loc.end)
}

function createEditRangeByLoc(
  start: TemplateNode['loc']['start'],
  end: TemplateNode['loc']['end'],
  preserveEndIndent = false
): VueCodeEditRange {
  const range: VueCodeEditRange = {
    start: toPosition(start),
    end: toPosition(end),
    preserveLineBreaks: true,
  }
  if (preserveEndIndent) {
    range.preserveEndIndent = true
  }
  return range
}

function toPosition(loc: TemplateNode['loc']['start']): VueCodePosition {
  return {
    line: loc.line,
    column: loc.column,
  }
}
