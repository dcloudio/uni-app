import {
  INPUT_PLACEHOLDER_IMPORTANT_LAYER,
  INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX,
  type InputPlaceholderStyle,
} from '@dcloudio/uni-shared'
import { queuePostFlushCb } from 'vue'

interface StyleEntry {
  style: InputPlaceholderStyle
  count: number
  normal?: CSSStyleRule
  important?: CSSStyleRule
}

interface StyleState {
  element: HTMLStyleElement
  styles: Map<string, StyleEntry>
  dirty: Set<StyleEntry>
  freeNormal: CSSStyleRule[]
  freeImportant: CSSStyleRule[]
  important?: CSSGroupingRule
  pending: boolean
}

const documents = new WeakMap<Document, StyleState>()
// Web Vapor 调度器通过第二个参数指定优先级；-1 先于 mounted/updated。
const queueStyleFlush: (job: () => void, priority: number) => void =
  queuePostFlushCb

function update(document: Document, state: StyleState) {
  if (state.pending) return
  state.pending = true
  queueStyleFlush(() => {
    state.pending = false
    if (documents.get(document) !== state) return
    if (!state.element.isConnected)
      (document.head || document.documentElement).appendChild(state.element)
    const sheet = state.element.sheet!
    // 先回收本轮释放的槽位；空规则不参与层叠，也不需要移动其他规则的索引。
    for (const entry of state.dirty) {
      if (entry.count) continue
      for (const type of ['normal', 'important'] as const) {
        const rule = entry[type]
        if (!rule) continue
        rule.style.cssText = ''
        ;(type === 'normal' ? state.freeNormal : state.freeImportant).push(rule)
        entry[type] = undefined
      }
    }
    for (const entry of state.dirty) {
      if (!entry.count) continue
      const selector = `input:where([uni-input]).${INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX}${entry.style.key}::placeholder`
      for (const type of ['normal', 'important'] as const) {
        const declarations = entry.style[type]
        if (!declarations) continue
        const free = type === 'normal' ? state.freeNormal : state.freeImportant
        let rule = free.pop()
        if (rule) {
          rule.selectorText = selector
          rule.style.cssText = declarations
        } else {
          let parent: CSSStyleSheet | CSSGroupingRule = sheet
          if (type === 'important') {
            if (!state.important) {
              const index = sheet.insertRule(
                `@layer ${INPUT_PLACEHOLDER_IMPORTANT_LAYER}{}`,
                sheet.cssRules.length
              )
              state.important = sheet.cssRules[index] as CSSGroupingRule
            }
            parent = state.important
          }
          const index = parent.insertRule(
            `${selector}{${declarations}}`,
            parent.cssRules.length
          )
          rule = parent.cssRules[index] as CSSStyleRule
        }
        entry[type] = rule
      }
    }
    state.dirty.clear()
  }, -1)
}

// 相同 placeholder-style 按文档共享；更新只触碰变化的规则，槽位数量受峰值约束。
export function registerInputStyle(
  document: Document,
  style: InputPlaceholderStyle
) {
  if (!style.key) return () => {}
  let state = documents.get(document)
  if (!state) {
    const element = document.createElement('style')
    element.setAttribute('data-uni-input-styles', '')
    state = {
      element,
      styles: new Map(),
      dirty: new Set(),
      freeNormal: [],
      freeImportant: [],
      pending: false,
    }
    documents.set(document, state)
  }
  let entry = state.styles.get(style.key)
  if (entry) entry.count++
  else {
    entry = { style, count: 1 }
    state.styles.set(style.key, entry)
    state.dirty.add(entry)
    update(document, state)
  }
  let registered = true
  return () => {
    if (!registered) return
    registered = false
    if (--entry!.count) return
    state!.styles.delete(style.key)
    if (state!.styles.size) {
      state!.dirty.add(entry!)
      update(document, state!)
    } else {
      state!.element.remove()
      documents.delete(document)
    }
  }
}
