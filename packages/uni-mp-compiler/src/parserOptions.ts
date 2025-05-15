import {
  type ElementNode,
  Namespaces,
  NodeTypes,
  type ParserOptions,
} from '@vue/compiler-core'
import { isHTMLTag, isSVGTag, isVoidTag as isVoidTagRaw } from '@vue/shared'
// import { decodeHtml } from './decodeHtml'

export const enum DOMNamespaces {
  HTML = Namespaces.HTML,
  SVG,
  MATH_ML,
}

export const parserOptions: ParserOptions = {
  isVoidTag(tag) {
    // 开启 input 标签判断，会导致 <input type="text"> 编译失败
    // 微信小程序允许 Input 嵌套其他组件 https://ask.dcloud.net.cn/question/202776
    // if (tag === 'input') {
    //   return false
    // }
    return isVoidTagRaw(tag)
  },
  isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag),
  isPreTag: (tag) => tag === 'pre',

  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag: string, parent: ElementNode | undefined): DOMNamespaces {
    let ns = parent ? parent.ns : DOMNamespaces.HTML

    if (parent && ns === DOMNamespaces.MATH_ML) {
      if (parent.tag === 'annotation-xml') {
        if (tag === 'svg') {
          return DOMNamespaces.SVG
        }
        if (
          parent.props.some(
            (a) =>
              a.type === NodeTypes.ATTRIBUTE &&
              a.name === 'encoding' &&
              a.value != null &&
              (a.value.content === 'text/html' ||
                a.value.content === 'application/xhtml+xml')
          )
        ) {
          ns = DOMNamespaces.HTML
        }
      } else if (
        /^m(?:[ions]|text)$/.test(parent.tag) &&
        tag !== 'mglyph' &&
        tag !== 'malignmark'
      ) {
        ns = DOMNamespaces.HTML
      }
    } else if (parent && ns === DOMNamespaces.SVG) {
      if (
        parent.tag === 'foreignObject' ||
        parent.tag === 'desc' ||
        parent.tag === 'title'
      ) {
        ns = DOMNamespaces.HTML
      }
    }

    if (ns === DOMNamespaces.HTML) {
      if (tag === 'svg') {
        return DOMNamespaces.SVG
      }
      if (tag === 'math') {
        return DOMNamespaces.MATH_ML
      }
    }
    return ns
  },
  parseMode: 'html',
}
