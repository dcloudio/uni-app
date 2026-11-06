import { type Ref, watch } from 'vue'

const selectionAttribute = 'data-uni-selection-style'
const probeAttribute = 'data-uni-selection-style-probe'
const probeMarker = '--uni-selection-style-probe'
const probeColor = 'rgb(1, 2, 3)'
const probeBackgroundColor = 'rgb(4, 5, 6)'
const probeMarkerValue = '1'
const elementNodeType = 1

let seed = 0

function getSelectionSelector(root: HTMLElement) {
  let id = root.getAttribute(selectionAttribute)
  if (!id) {
    id = String(++seed)
    root.setAttribute(selectionAttribute, id)
  }
  return `[${selectionAttribute}="${id}"]`
}

function createFallbackRule() {
  return `:where([${probeAttribute}])::selection,
    :where([${probeAttribute}]) *::selection {
      ${probeMarker}: ${probeMarkerValue};
      color: ${probeColor};
      background-color: ${probeBackgroundColor};
  }`
}

function createSelectionRule(
  selector: string,
  color: string,
  backgroundColor: string
) {
  const declarations: string[] = []
  if (color) {
    declarations.push(`color: ${color};`)
  }
  if (backgroundColor) {
    declarations.push(`background-color: ${backgroundColor};`)
  }
  if (!declarations.length) {
    return ''
  }
  return `${selector}::selection,
    ${selector} *::selection {
      ${declarations.join('\n')}
    }`
}

function normalizeColor(value: string) {
  return value.replace(/\s+/g, '').toLowerCase()
}

function insertStyleElement(styleElement: HTMLStyleElement) {
  // 探针规则必须排在业务样式之前，零特异性规则才会让用户样式稳定获胜。
  document.head.insertBefore(
    styleElement,
    document.head.querySelector('style, link[rel="stylesheet"]')
  )
}

function isInternalStyleMutation(target: Node) {
  const element =
    target.nodeType === elementNodeType
      ? (target as Element)
      : target.parentElement
  return !!element?.closest('style[data-uni-selection-style-element]')
}

function resolveStyle(root: HTMLElement, styleElement: HTMLStyleElement) {
  styleElement.textContent = createFallbackRule()
  root.setAttribute(probeAttribute, '')
  let color = ''
  let backgroundColor = ''
  try {
    const computed = getComputedStyle(root, '::selection')
    // 不支持通过伪元素读取计算样式的浏览器无法区分“未设置”和默认值，
    // 此时不注入样式，避免覆盖浏览器原生选区高亮。
    if (computed.getPropertyValue(probeMarker) !== probeMarkerValue) {
      return { color, backgroundColor }
    }
    const computedColor = computed.color
    const computedBackgroundColor = computed.backgroundColor
    if (normalizeColor(computedColor) !== normalizeColor(probeColor)) {
      color = computedColor
    }
    if (
      normalizeColor(computedBackgroundColor) !==
      normalizeColor(probeBackgroundColor)
    ) {
      backgroundColor = computedBackgroundColor
    }
  } catch {
    return { color, backgroundColor }
  } finally {
    root.removeAttribute(probeAttribute)
  }
  return { color, backgroundColor }
}

function observeSelectionStyle(root: HTMLElement) {
  const styleElement = document.createElement('style')
  styleElement.setAttribute('data-uni-selection-style-element', '')
  insertStyleElement(styleElement)

  function update() {
    if (!root.isConnected) {
      return
    }
    if (!styleElement.isConnected) {
      insertStyleElement(styleElement)
    }
    const selector = getSelectionSelector(root)
    const { color, backgroundColor } = resolveStyle(root, styleElement)
    styleElement.textContent =
      createFallbackRule() +
      createSelectionRule(selector, color, backgroundColor)
  }

  const rootObserver = new MutationObserver(update)
  rootObserver.observe(root, {
    attributes: true,
    attributeFilter: ['class', 'style'],
  })

  const documentObserver = new MutationObserver(update)
  documentObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'style', 'data-theme'],
  })
  if (document.body) {
    documentObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })
  }

  const headObserver = new MutationObserver((records) => {
    if (records.some((record) => !isInternalStyleMutation(record.target))) {
      update()
    }
  })
  headObserver.observe(document.head, {
    childList: true,
    characterData: true,
    subtree: true,
  })

  const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
  if (mediaQuery) {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', update)
    } else {
      mediaQuery.addListener(update)
    }
  }
  window.addEventListener('load', update)

  update()
  return () => {
    rootObserver.disconnect()
    documentObserver.disconnect()
    headObserver.disconnect()
    if (mediaQuery) {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', update)
      } else {
        mediaQuery.removeListener(update)
      }
    }
    window.removeEventListener('load', update)
    root.removeAttribute(selectionAttribute)
    styleElement.remove()
  }
}

export function useWebSelectionStyle(rootRef: Ref<HTMLElement | null>) {
  watch(
    rootRef,
    (root, _, onCleanup) => {
      if (root) {
        onCleanup(observeSelectionStyle(root))
      }
    },
    { immediate: true, flush: 'post' }
  )
}
